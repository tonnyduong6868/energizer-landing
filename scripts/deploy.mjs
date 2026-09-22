/**
 * Đẩy `out/` lên nhánh `gh-pages`.
 *
 * Vì sao không dùng GitHub Actions: token `gh` của máy này chỉ có scope
 * 'gist', 'read:org', 'repo' — thiếu 'workflow', nên push một file
 * `.github/workflows/*.yml` sẽ bị từ chối thẳng. Build tay rồi đẩy bản tĩnh là
 * đường duy nhất chạy được, và cũng là cách traiga-landing đang deploy.
 *
 * Hai thứ script này lo mà đẩy tay rất dễ quên:
 *
 *   1. `.nojekyll`. GitHub Pages chạy Jekyll mặc định, mà Jekyll bỏ qua mọi
 *      thư mục bắt đầu bằng gạch dưới. Next xuất toàn bộ CSS/JS vào `_next/`.
 *      Thiếu file rỗng này thì trang lên sóng không có một dòng style nào —
 *      và nó trả 200 chứ không trả lỗi, nên nhìn log deploy không thấy gì sai.
 *
 *   2. Kiểm `basePath` trước khi đẩy. Pages phục vụ site ở /<tên-repo>/ nên
 *      bản build phải trỏ asset vào /energizer-landing/. Build nhầm ở chế độ
 *      dev (basePath rỗng) thì mọi asset 404.
 *
 *   node scripts/deploy.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'out')
const WORK = path.join(ROOT, '.gh-pages')
const BRANCH = 'gh-pages'
const EXPECTED_BASE = '/energizer-landing'

const git = (args, cwd = ROOT) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

/* ---------- 1. out/ phải tồn tại và phải là bản production ---------- */
if (!fs.existsSync(path.join(OUT, 'index.html'))) {
  console.error('Chưa có out/index.html. Chạy `npm run build` trước.')
  process.exit(1)
}

const html = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
if (!html.includes(`${EXPECTED_BASE}/_next/`)) {
  console.error(
    `out/index.html không trỏ asset vào ${EXPECTED_BASE}/_next/.\n` +
      'Bản build này sai basePath — lên Pages sẽ trắng trang. Build lại bằng `npm run build`.'
  )
  process.exit(1)
}

/* ---------- 2. Lấy remote của repo nguồn ---------- */
let remote
try {
  remote = git(['remote', 'get-url', 'origin'])
} catch {
  console.error('Chưa có remote `origin`. Tạo repo trên GitHub rồi `git remote add origin <url>`.')
  process.exit(1)
}

/* ---------- 3. Dựng thư mục làm việc riêng cho nhánh gh-pages ----------
   Không dùng `git checkout gh-pages` trong repo chính: nhánh đó chứa bản build
   với cấu trúc thư mục hoàn toàn khác source, đổi qua lại rất dễ để sót file
   lạ và commit nhầm vào main. Một clone riêng thì không có cửa nhầm. */
fs.rmSync(WORK, { recursive: true, force: true })

let fresh = false
try {
  execFileSync('git', ['clone', '--branch', BRANCH, '--single-branch', '--depth', '1', remote, WORK], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
} catch {
  // Nhánh chưa tồn tại — lần deploy đầu tiên.
  fresh = true
  fs.mkdirSync(WORK, { recursive: true })
  git(['init', '-b', BRANCH], WORK)
  git(['remote', 'add', 'origin', remote], WORK)
}

/* ---------- 4. Thay toàn bộ nội dung bằng out/ ----------
   Xoá sạch rồi chép lại, không merge. File đã gỡ khỏi trang phải biến mất khỏi
   Pages chứ không nằm lại làm URL mồ côi. `.git` giữ nguyên. */
for (const entry of fs.readdirSync(WORK)) {
  if (entry === '.git') continue
  fs.rmSync(path.join(WORK, entry), { recursive: true, force: true })
}
fs.cpSync(OUT, WORK, { recursive: true })
fs.writeFileSync(path.join(WORK, '.nojekyll'), '')

/* ---------- 5. Commit + push ---------- */
git(['add', '-A'], WORK)

const dirty = git(['status', '--porcelain'], WORK)
if (!dirty && !fresh) {
  console.log('Bản build giống hệt bản đang chạy trên Pages — không có gì để đẩy.')
  fs.rmSync(WORK, { recursive: true, force: true })
  process.exit(0)
}

const sourceSha = git(['rev-parse', '--short', 'HEAD'])
git(['commit', '-m', `deploy: bản build từ ${sourceSha}`], WORK)
execFileSync('git', ['push', '-u', 'origin', BRANCH], { cwd: WORK, stdio: 'inherit' })

fs.rmSync(WORK, { recursive: true, force: true })

const files = fs.readdirSync(OUT).length
console.log(`\nĐã đẩy ${files} mục lên ${BRANCH} (từ source ${sourceSha}).`)
console.log('Pages mất khoảng 1-2 phút để build lại.')
