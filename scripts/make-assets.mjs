/**
 * Sinh bộ asset tĩnh cho trang: og.png (1200x630), logo-256.png, favicon.ico.
 *
 * Vì sao phải có: cả zynalgo.net/zynalgotrendline lẫn /scalper-pro-v4--m2 đều
 * thiếu og:image. Funnel sống bằng paid social + Discord mà link dán ra không
 * có thẻ ảnh thì mất click mỗi ngày. Trang này không được phép lặp lại lỗi đó.
 *
 * Cách làm: render HTML bằng Comet qua CDP rồi chụp. Không cần thư viện ảnh,
 * không cần font cài thêm — dùng font hệ thống nên kết quả ổn định offline.
 *
 *   node scripts/make-assets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, '..', 'public', 'assets')
fs.mkdirSync(OUT, { recursive: true })

const PUPPETEER =
  'file:///C:/Users/Tonnyduong/.claude/plugins/cache/claude-plugins-official/chrome-devtools-mcp/1.6.0/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js'
const COMET_USER_DATA =
  'C:/Users/Tonnyduong/AppData/Local/Perplexity/Comet/User Data'

// Bảy yếu tố confluence — số lấy nguyên từ Smart Money Energizer v1.1.pine,
// dòng 164-178. Không làm tròn, không tô hồng.
const FACTORS = [
  ['LIQ SWEEP', 12],
  ['KILLZONE', 10],
  ['HTF FVG', 10],
  ['DISPLACEMENT', 8],
  ['OPENING GAP', 8],
  ['MTF ALIGN', 8],
  ['OPEN SWEEP', 6],
]
const MAX = 12

const CSS = `
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#05070D;color:#F4F6FB;
    font-family:"Segoe UI Variable Display","Segoe UI",system-ui,sans-serif;
    -webkit-font-smoothing:antialiased}
  .mono{font-family:"Cascadia Mono",Consolas,"Courier New",monospace}
`

const ogHtml = `<!doctype html><meta charset="utf-8"><style>${CSS}
  .card{width:1200px;height:630px;position:relative;overflow:hidden;
    padding:60px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .glow{position:absolute;width:900px;height:900px;right:-260px;top:-380px;
    border-radius:50%;background:radial-gradient(circle,rgba(255,176,32,.20),transparent 62%)}
  .grid{position:absolute;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
    background-size:60px 60px}
  .in{position:relative}
  .brand{display:flex;align-items:center;gap:12px;
    font-size:15px;font-weight:700;letter-spacing:.22em;color:#8A93A6}
  .pip{width:10px;height:10px;border-radius:2px;background:#FFB020;
    box-shadow:0 0 18px rgba(255,176,32,.8)}
  h1{font-size:74px;line-height:.98;letter-spacing:-.035em;font-weight:700;margin-top:24px}
  h1 em{font-style:normal;color:#FFB020}
  .sub{margin-top:20px;font-size:22px;line-height:1.42;color:#A8B0C0;max-width:34ch}
  .row{display:flex;align-items:flex-end;justify-content:space-between;gap:56px}
  .chips{display:flex;gap:10px}
  .chip{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.035);
    border-radius:8px;padding:11px 15px;font-size:15px;letter-spacing:.06em;color:#C6CCDA;white-space:nowrap}
  .chip b{color:#FFB020;font-weight:700}
  .bars{display:flex;align-items:flex-end;gap:13px;height:152px}
  .b{width:46px;display:flex;flex-direction:column;align-items:center;gap:9px}
  .bar{width:100%;border-radius:5px 5px 2px 2px;
    background:linear-gradient(180deg,#FFB020,rgba(255,176,32,.32));
    box-shadow:0 0 26px rgba(255,176,32,.20)}
  .v{font-size:16px;font-weight:700;color:#FFB020}
  .cap{margin-top:16px;text-align:right;font-size:14px;letter-spacing:.11em;color:#6E7688}
  .cap b{color:#C6CCDA}
</style>
<div class="card">
  <div class="glow"></div><div class="grid"></div>
  <div class="in">
    <div class="brand"><span class="pip"></span>ZYNALGO &nbsp;·&nbsp; SMART MONEY ENERGIZER &nbsp;·&nbsp; v1.1</div>
    <h1>One score.<br><em>Not twelve opinions.</em></h1>
    <div class="sub">Seven Smart Money confluences, resolved into one number on one chart.</div>
  </div>
  <div class="in row">
    <div class="chips">
      <div class="chip mono"><b>7</b> CONFLUENCES</div>
      <div class="chip mono"><b>0&ndash;100</b> SCORE</div>
      <div class="chip mono"><b>235</b> INPUTS</div>
      <div class="chip mono"><b>1</b> CHART</div>
    </div>
    <div>
      <div class="bars">
        ${FACTORS.map(
          ([, v]) =>
            `<div class="b"><span class="v mono">+${v}</span>` +
            `<div class="bar" style="height:${Math.round((v / MAX) * 118)}px"></div></div>`
        ).join('')}
      </div>
      <div class="cap mono">CONFLUENCE BONUS &nbsp;·&nbsp; COMBINED CAP <b>+30</b></div>
    </div>
  </div>
</div>`

const markHtml = (size) => `<!doctype html><meta charset="utf-8"><style>${CSS}
  .m{width:${size}px;height:${size}px;position:relative;display:grid;place-items:center;
     background:radial-gradient(circle at 50% 22%,#141A28,#05070D 72%)}
  svg{width:${Math.round(size * 0.62)}px;height:${Math.round(size * 0.62)}px;display:block}
</style>
<div class="m">
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- tia sét = "energize", nét dày để còn đọc được ở 16px -->
    <path d="M58 6 L22 56 h22 L40 94 L78 42 H56 Z" fill="#FFB020"/>
  </svg>
</div>`

/* ---------- PNG -> ICO (ICO cho phép nhúng thẳng payload PNG) ---------- */
function pngToIco(pngBuffers) {
  const head = Buffer.alloc(6)
  head.writeUInt16LE(0, 0)
  head.writeUInt16LE(1, 2) // 1 = icon
  head.writeUInt16LE(pngBuffers.length, 4)
  let offset = 6 + 16 * pngBuffers.length
  const dirs = []
  for (const { size, buf } of pngBuffers) {
    const d = Buffer.alloc(16)
    d.writeUInt8(size >= 256 ? 0 : size, 0)
    d.writeUInt8(size >= 256 ? 0 : size, 1)
    d.writeUInt8(0, 2)
    d.writeUInt8(0, 3)
    d.writeUInt16LE(1, 4)
    d.writeUInt16LE(32, 6)
    d.writeUInt32LE(buf.length, 8)
    d.writeUInt32LE(offset, 12)
    offset += buf.length
    dirs.push(d)
  }
  return Buffer.concat([head, ...dirs, ...pngBuffers.map((p) => p.buf)])
}

/* ---------- SVG favicon: nét đậm để đọc được ở 16px ---------- */
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#05070D"/>
  <path d="M58 14 L26 58 h20 L42 86 L74 42 H54 Z" fill="#FFB020"/>
</svg>
`

const wsFile = fs
  .readFileSync(path.join(COMET_USER_DATA, 'DevToolsActivePort'), 'utf8')
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean)

const puppeteer = await import(PUPPETEER)
const browser = await puppeteer.default.connect({
  browserWSEndpoint: `ws://127.0.0.1:${wsFile[0]}${wsFile[1]}`,
  protocolTimeout: 90000,
  defaultViewport: null,
})

async function shoot(html, w, h) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 350))
  const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: w, height: h } })
  await page.close()
  return Buffer.from(buf)
}

const og = await shoot(ogHtml, 1200, 630)
fs.writeFileSync(path.join(OUT, 'og.png'), og)

const logo = await shoot(markHtml(256), 256, 256)
fs.writeFileSync(path.join(OUT, 'logo-256.png'), logo)

const ico48 = await shoot(markHtml(48), 48, 48)
const ico32 = await shoot(markHtml(32), 32, 32)
const ico16 = await shoot(markHtml(16), 16, 16)
fs.writeFileSync(
  path.join(OUT, 'favicon.ico'),
  pngToIco([
    { size: 16, buf: ico16 },
    { size: 32, buf: ico32 },
    { size: 48, buf: ico48 },
  ])
)

fs.writeFileSync(path.join(OUT, 'icon.svg'), ICON_SVG)
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true })

await browser.disconnect()

for (const f of ['og.png', 'logo-256.png', 'favicon.ico', 'icon.svg']) {
  const s = fs.statSync(path.join(OUT, f))
  console.log(`${f.padEnd(16)} ${String(s.size).padStart(7)} bytes`)
}
