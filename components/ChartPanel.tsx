import { confluences } from '@/lib/site'

/**
 * Panel minh hoạ — hình duy nhất của trang cho tới khi có ảnh chụp thật.
 *
 * ĐÂY LÀ HÌNH VẼ, KHÔNG PHẢI ẢNH CHỤP, KHÔNG PHẢI BACKTEST.
 * Caption dưới ô nói đúng như vậy bằng tiếng Anh, và nó không được xoá. Bịa
 * một đường equity hay một bảng thống kê win-rate thì vừa sai luật quảng cáo
 * vừa là thứ đầu tiên khách có kinh nghiệm soi ra.
 *
 * Cái nó được phép làm: vẽ lại ĐÚNG những gì indicator thật vẽ ra chart —
 * hộp killzone, một cú quét thanh khoản, một nến displacement để lại FVG
 * khung lớn, rồi bộ entry/SL/TP. Cả bốn thứ đó có thật trong Pine source và
 * ba cái đầu là ba confluence có tên trong khối 03; chỉ dàn nến là sinh ra.
 *
 * Dữ liệu nến sinh bằng LCG seed cố định nên mọi lần build ra đúng một hình.
 * Không `Math.random()`, không `Date` — nếu không thì mỗi lần build lại là một
 * diff khác nhau trên nhánh gh-pages mà chẳng ai đổi gì.
 *
 * Server Component thuần: SVG nằm sẵn trong HTML tĩnh, không JS, không CLS.
 */

/* ── kích thước khung ─────────────────────────────────────────────────── */
const W = 980
const H = 380
const L = 18 /* lề trái  */
const R = 96 /* lề phải — chừa chỗ cho nhãn ENTRY / SL / TP */
const T = 16
const B = 26

/* ── kịch bản: killzone → quét đáy → displacement → đảo chiều lên ─────── */
const N = 46
const KZ_A = 11 /* hộp killzone bao từ nến này…  */
const KZ_B = 21 /* …tới nến này                  */
const SWEEP = 15 /* nến quét đáy giả              */
const DISP = 21 /* nến displacement              */
const FVG_A = 20 /* FVG là khoảng trống giữa đỉnh nến này… */
const FVG_B = 22 /* …và đáy nến này                        */
const FVG_TO = 34 /* hộp FVG chỉ kéo tới đây, không đè lên vùng entry */
const ENTRY_FROM = 30 /* các mức giá chỉ kẻ từ nến này sang phải */

type Bar = { o: number; h: number; l: number; c: number }

function buildBars(): Bar[] {
  let seed = 20260922
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)

  const bars: Bar[] = []
  let p = 100
  for (let i = 0; i < N; i++) {
    const drift =
      i === DISP
        ? 8.2 /* cú displacement — chính nó để lại khoảng trống FVG */
        : i === SWEEP
          ? -2.1
          : i < SWEEP
            ? -0.85
            : i < 19
              ? 0.5
              : i < 23
                ? 1.8
                : 1.15
    const o = p
    const c = p + drift + (rnd() - 0.5) * 3.4
    /* Nến displacement phải gần như không có bóng, nếu không cái bóng của nó
       lấp mất chính khoảng trống mà nó vừa tạo ra. */
    const wick = i === DISP ? 0.25 : 0.6 + rnd() * 2.2
    const h = Math.max(o, c) + wick
    const l = Math.min(o, c) - (i === SWEEP ? 4.4 : wick)
    bars.push({ o, h, l, c })
    p = c
  }
  return bars
}

const bars = buildBars()

const entry = bars[N - 1].c
/**
 * SL đặt dưới swing gần nhất, KHÔNG phải dưới cái đáy sweep cách đó 30 nến.
 * Lấy đáy xa thì R quá lớn, TP3 vọt lên trời và cả dàn nến bị nén thành một
 * vệt mỏng ở đáy khung — đã vẽ nhầm đúng như thế một lần.
 */
const sl = Math.min(...bars.slice(-8).map((b) => b.l)) - 0.4
const risk = entry - sl
const tps = [1, 2, 3].map((m) => entry + risk * m)

/* Thang giá phải bao cả SL lẫn TP3, không chỉ bao nến — nếu không thì nhãn
   TP nằm ngoài viewBox và bị cắt mất. */
const lo = Math.min(...bars.map((b) => b.l), sl) - 2
const hi = Math.max(...bars.map((b) => b.h), tps[2]) + 2

const y = (v: number) => T + ((hi - v) / (hi - lo)) * (H - T - B)
const step = (W - L - R) / N
const cw = Math.max(4, step * 0.58)
const x = (i: number) => L + step * i + step / 2

const swLow = bars[SWEEP].l
const gapTop = bars[FVG_A].h
const gapBot = bars[FVG_B].l
const hasGap = gapBot > gapTop
const xFrom = x(ENTRY_FROM)
const xTo = W - R + 4

/* Điểm thưởng lấy thẳng từ lib/site.ts. Gõ tay vào đây thì đến lúc chỉnh
   trọng số trong Pine, con số trên hình sẽ lệch với con số ở khối 03. */
const bonus = (name: string) => confluences.factors.find((f) => f.name === name)?.bonus

const MONO = 'var(--f-mono)'
const LABEL = { fontFamily: MONO } as const

export function ChartPanel() {
  const levels: Array<{ v: number; label: string; color: string; dash?: string }> = [
    { v: entry, label: 'ENTRY', color: 'var(--ink)' },
    { v: sl, label: 'SL', color: 'var(--bear)', dash: '3 3' },
    ...tps.map((v, i) => ({
      v,
      label: `TP${i + 1}`,
      color: 'var(--bull)',
      dash: '3 3',
    })),
  ]

  return (
    <svg
      className="panel-svg"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="chartpanel-title"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="chartpanel-title">
        Illustration of the on-chart panel: a killzone window, a liquidity sweep, a
        displacement candle leaving a higher-timeframe fair value gap, and the resulting
        entry with stop loss and three take-profit levels.
      </title>

      {/* lưới */}
      {[0, 1, 2, 3, 4].map((g) => {
        const yy = T + ((H - T - B) / 4) * g
        return (
          <line
            key={g}
            x1={L}
            y1={yy}
            x2={W - R}
            y2={yy}
            style={{ stroke: 'var(--c-grid)' }}
            strokeWidth={1}
          />
        )
      })}

      {/* hộp killzone — dải đứng, lấp đúng khoảng trống trên-trái của khung */}
      <rect
        x={x(KZ_A) - step / 2}
        y={T}
        width={x(KZ_B) - x(KZ_A) + step}
        height={H - T - B}
        style={{ fill: 'var(--chg)' }}
        opacity={0.055}
      />
      <line
        x1={x(KZ_A) - step / 2}
        y1={T}
        x2={x(KZ_A) - step / 2}
        y2={H - B}
        style={{ stroke: 'var(--chg)' }}
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.55}
      />
      <line
        x1={x(KZ_B) + step / 2}
        y1={T}
        x2={x(KZ_B) + step / 2}
        y2={H - B}
        style={{ stroke: 'var(--chg)' }}
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.55}
      />
      <text
        x={x(KZ_A) - step / 2 + 8}
        y={T + 18}
        style={{ ...LABEL, fill: 'var(--chg)' }}
        fontSize={11}
        letterSpacing="0.08em"
      >
        NY KILLZONE +{bonus('Killzone')}
      </text>

      {/* FVG khung lớn — khoảng trống do chính nến displacement để lại */}
      {hasGap && (
        <>
          <rect
            x={x(FVG_A) - cw}
            y={y(gapBot)}
            width={x(FVG_TO) - (x(FVG_A) - cw)}
            height={Math.abs(y(gapTop) - y(gapBot))}
            style={{ fill: 'var(--chg)' }}
            opacity={0.2}
          />
          <text
            x={x(FVG_TO) - 4}
            y={(y(gapTop) + y(gapBot)) / 2 + 4}
            textAnchor="end"
            style={{ ...LABEL, fill: 'var(--chg)' }}
            fontSize={11}
            letterSpacing="0.06em"
          >
            HTF FVG +{bonus('HTF FVG Mitigation')}
          </text>
        </>
      )}

      {/* nến */}
      {bars.map((b, i) => {
        const color = b.c >= b.o ? 'var(--bull)' : 'var(--bear)'
        return (
          <g key={i}>
            <line
              x1={x(i)}
              y1={y(b.h)}
              x2={x(i)}
              y2={y(b.l)}
              style={{ stroke: color }}
              strokeWidth={1.2}
            />
            <rect
              x={x(i) - cw / 2}
              y={y(Math.max(b.o, b.c))}
              width={cw}
              height={Math.max(1.4, Math.abs(y(b.o) - y(b.c)))}
              style={{ fill: color }}
            />
          </g>
        )
      })}

      {/* quét thanh khoản — cái đáy giả ở nến SWEEP */}
      <line
        x1={L}
        y1={y(swLow)}
        x2={W - R}
        y2={y(swLow)}
        style={{ stroke: 'var(--bear)' }}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.85}
      />
      <text
        x={L + 5}
        y={y(swLow) + 14}
        style={{ ...LABEL, fill: 'var(--bear)' }}
        fontSize={11}
        letterSpacing="0.06em"
      >
        SWEEP +{bonus('Liquidity Sweep')}
      </text>

      {/* vùng lãi / vùng lỗ */}
      <rect
        x={xFrom}
        y={y(tps[2])}
        width={xTo - xFrom}
        height={y(entry) - y(tps[2])}
        style={{ fill: 'var(--bull)' }}
        opacity={0.07}
      />
      <rect
        x={xFrom}
        y={y(entry)}
        width={xTo - xFrom}
        height={y(sl) - y(entry)}
        style={{ fill: 'var(--bear)' }}
        opacity={0.07}
      />

      {/* các mức */}
      {levels.map((lv) => (
        <g key={lv.label}>
          <line
            x1={xFrom}
            y1={y(lv.v)}
            x2={xTo}
            y2={y(lv.v)}
            style={{ stroke: lv.color }}
            strokeWidth={1}
            strokeDasharray={lv.dash}
            opacity={0.9}
          />
          <text
            x={xTo + 6}
            y={y(lv.v) + 4}
            style={{ ...LABEL, fill: lv.color }}
            fontSize={11}
          >
            {lv.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
