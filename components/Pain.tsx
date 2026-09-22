import { SectionHead } from './SectionHead'
import { Check, Dot } from './Icon'

/**
 * Vấn đề → giải pháp, hai cột.
 *
 * Cột trái KHÔNG dùng dấu X đỏ. Người đọc đang tự nhận mình ở cột đó — dán
 * bảy dấu X vào mặt họ là chê khách, không phải chẩn đoán. Chấm tròn trung
 * tính mô tả hiện trạng; chỉ cột phải mới có dấu tích.
 */
const before = [
  'Four indicators say buy, two say sell, and you pick the ones you already agreed with.',
  'You add an SMC toolkit. Now the chart has so much on it you cannot see price.',
  'The setup looked perfect. It was 03:00 and nothing was moving. You did not check.',
  'You take TP1, the rest runs without you, and your journal calls it a win.',
  'Sideways chop flips your signal every third bar and you keep taking them.',
]

const after = [
  'One number, 0-100, from trend, momentum and volatility. You argue with one thing.',
  'A single Chart Density knob caps how much ink the script may spend. Clean means clean.',
  'Killzone timing is worth +10 into the score. Off-session setups score lower on their own.',
  'TP1, TP2 and TP3 are projected on entry and the stats book the R you actually finished on.',
  'Sideway lockouts and anti-flip logic stop the engine changing its mind inside chop.',
]

export function Pain() {
  return (
    <section className="sec-alt" id="engine">
      <div className="wrap">
        <SectionHead
          no="01"
          tag="The problem"
          meta="why confluence usually fails"
          title={
            <>
              Adding indicators does not add confluence.
              <br />
              It adds arguments.
            </>
          }
          lede={
            <>
              Every one of them is right sometimes. That is the trap &mdash; you can
              always find the two that agree with what you already want to do.
            </>
          }
        />

        <div className="pain-grid">
          <div className="pain-col is-bad">
            <p className="pain-head">How it usually goes</p>
            {before.map((t) => (
              <div className="pain-li" key={t}>
                <span className="pain-ic" style={{ color: 'var(--ink-3)' }}>
                  <Dot size={16} />
                </span>
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="pain-col is-good">
            <p className="pain-head">What the Energizer does instead</p>
            {after.map((t) => (
              <div className="pain-li" key={t}>
                <span className="pain-ic">
                  <Check size={16} />
                </span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
