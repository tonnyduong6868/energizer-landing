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

/**
 * Route chỉ để nghịch, không đẩy lên Pages.
 *
 * `app/dock/` là trang thử Animated Top Dock: chú thích toàn tiếng Việt,
 * dựng để soi hiệu ứng chứ không phải để bán. `output: 'export'` thì mọi
 * route trong `app/` đều thành file tĩnh, không có cách nào loại lúc build —
 * nên loại ở đây, ngay trước khi đẩy. Không xoá gì trong `out/`, chỉ không
 * chép sang bản phát hành.
 *
 * Xoá tên khỏi danh sách này là tự nhận trang đó đã sẵn sàng cho khách đọc.
 */
const DEV_ONLY_ROUTES = ['dock']

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

/* ---------- 2. Không được còn ghi chú nội bộ trong bản build ----------
   Đã xảy ra thật, HAI LẦN. Lần đầu: hai hộp cảnh báo ở <SiteFooter> render vô
   điều kiện, lọt vào `out/` và sống trên Pages, nói cho khách nghe rằng trang
   có link hỏng và đồng hồ đếm ngược chưa ai xác nhận. Vá xong thì hôm sau lộ
   tiếp khối `shot-empty` ở <Hero> — cùng lỗi, khác component, và nằm ngay
   dưới hero nên còn dễ đọc hơn.

   Nên ở đây có hai lưới, và lưới thứ hai mới là lưới thật:

   a) `devwarn` — dấu quy ước (`data-devwarn`) trên mọi khối ghi chú. Bắt
      nhanh, nhưng chỉ bắt được khối mà người viết NHỚ gắn dấu. Chính chỗ đó
      đã thủng một lần.

   b) Chữ tiếng Việt. Trang này bán cho khách quốc tế, toàn bộ nội dung hiển
      thị là tiếng Anh — nên một ký tự có dấu trong HTML gần như chắc chắn là
      ghi chú nội bộ rò ra, bất kể nó nằm trong component nào và có gắn dấu
      hay không. Lưới này không cần ai nhớ gì cả.

   Quét MỌI file .html sắp đẩy, không riêng index. Lần thủng thứ hai nằm ở
   một component giữa trang; lần sau có thể nằm ở một route khác. */

/* Ký tự chỉ có trong tiếng Việt (ă â đ ê ô ơ ư + nguyên âm mang thanh). Cố ý
   KHÔNG bắt é/à/ü… vì tiếng Anh có thể mượn từ nước ngoài; những chữ dưới đây
   thì không. */
const VN = /[ăâđêôơưĂÂĐÊÔƠƯáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/

/** Mọi .html trong out/, trừ các route dev sẽ không được đẩy. */
const htmlFiles = []
const walk = (dir, rel = '') => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relPath = rel ? `${rel}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (rel === '' && DEV_ONLY_ROUTES.includes(entry.name)) continue
      walk(path.join(dir, entry.name), relPath)
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(relPath)
    }
  }
}
walk(OUT)

let leaked = false
for (const rel of htmlFiles) {
  const body = fs.readFileSync(path.join(OUT, rel), 'utf8')
  const chunks = body.split(/(?=<)/).filter((c) => VN.test(c))
  const tagged = body.includes('devwarn')
  if (!chunks.length && !tagged) continue

  leaked = true
  const what = [tagged && 'khối mang dấu `devwarn`', chunks.length && 'chữ tiếng Việt']
    .filter(Boolean)
    .join(' và ')
  console.error(`out/${rel} còn ${what}:`)
  for (const chunk of chunks.slice(0, 5)) {
    console.error('    ' + chunk.replace(/\s+/g, ' ').trim().slice(0, 130))
  }
}

if (leaked) {
  console.error('\nĐó là ghi chú nội bộ — ship ra là khách quốc tế đọc được.')
  console.error('Bọc khối đó bằng `showDevWarnings` (lib/site.ts) và gắn `data-devwarn`,')
  console.error('rồi build lại KHÔNG kèm NEXT_PUBLIC_DEV_WARNINGS=1: `npm run build`.')
  process.exit(1)
}

/* ---------- 3. Source phải sạch ----------
   Commit gh-pages ghi lại SHA của source sinh ra nó. Nếu cây làm việc còn thay
   đổi chưa commit thì cái SHA đó nói dối: nó trỏ về commit CŨ HƠN thứ vừa lên
   sóng, và sau này truy "bản đang chạy dựng từ đâu" sẽ ra sai chỗ. */
if (git(['status', '--porcelain'])) {
  console.error('Cây làm việc còn thay đổi chưa commit.')
  console.error('Commit vào `main` trước rồi hãy deploy — nếu không, SHA ghi trong')
  console.error('commit gh-pages sẽ trỏ về bản source cũ hơn thứ vừa lên sóng.')
  process.exit(1)
}

/* ---------- 4. Lấy remote của repo nguồn ---------- */
let remote
try {
  remote = git(['remote', 'get-url', 'origin'])
} catch {
  console.error('Chưa có remote `origin`. Tạo repo trên GitHub rồi `git remote add origin <url>`.')
  process.exit(1)
}

/* ---------- 5. Dựng thư mục làm việc riêng cho nhánh gh-pages ----------
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

/* ---------- 6. Thay toàn bộ nội dung bằng out/ ----------
   Xoá sạch rồi chép lại, không merge. File đã gỡ khỏi trang phải biến mất khỏi
   Pages chứ không nằm lại làm URL mồ côi. `.git` giữ nguyên. */
for (const entry of fs.readdirSync(WORK)) {
  if (entry === '.git') continue
  fs.rmSync(path.join(WORK, entry), { recursive: true, force: true })
}
fs.cpSync(OUT, WORK, { recursive: true })

/* Gỡ route chỉ-để-nghịch. In ra tên từng cái: cắt im lặng thì lần sau đọc log
   sẽ tưởng đã đẩy đủ, mà thật ra thiếu. */
for (const route of DEV_ONLY_ROUTES) {
  const dir = path.join(WORK, route)
  if (!fs.existsSync(dir)) continue
  fs.rmSync(dir, { recursive: true, force: true })
  console.log(`Bỏ route dev khỏi bản đẩy: /${route}/ (xem DEV_ONLY_ROUTES trong deploy.mjs).`)
}

fs.writeFileSync(path.join(WORK, '.nojekyll'), '')

/* ---------- 7. Commit + push ---------- */
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
