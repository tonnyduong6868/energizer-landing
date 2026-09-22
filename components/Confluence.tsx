import { confluences } from '@/lib/site'
import { SectionHead } from './SectionHead'

/**
 * Bảy confluence factor, hiện đúng trọng số thật.
 *
 * Thanh bar không phải trang trí. Nó cho thấy Liquidity Sweep (+12) nặng gấp
 * đôi Open-Price Sweep (+6) — tức là engine có quan điểm về việc bằng chứng
 * nào đáng tin hơn, chứ không cộng đều cho đủ bảy cái.
 *
 * Bar dài theo tỉ lệ với factor cao nhất, không theo cap. Lấy cap làm mẫu số
 * thì cái +12 chỉ chiếm 40% chiều rộng và cả bảy thanh trông đều lè tè như
 * nhau — đúng cái ấn tượng ngược lại với điều cần nói.
 */
export function Confluence() {
  const max = Math.max(...confluences.factors.map((f) => f.bonus))

  return (
    <section className="sec-alt" id="confluence">
      <div className="wrap">
        <SectionHead
          no="03"
          tag="Confluence"
          meta={`7 factors · capped at +${confluences.cap}`}
        />

        <h2 className="h2">Context does not sit in a second panel.</h2>
        <p className="lede" style={{ marginTop: 'var(--s5)' }}>
          Most SMC tools show you the context and leave you to reconcile it with your
          entry signal by eye. Here the context <em>is</em> the score. Each factor
          below adds its points to the same 0&ndash;100 number &mdash; and can be turned
          into a hard gate that blocks the signal outright when the context is missing.
        </p>

        <ul className="conf-list">
          {confluences.factors.map((f) => (
            <li className="conf" key={f.name}>
              <span className="conf-b">+{f.bonus}</span>
              <span className="conf-n">{f.name}</span>
              <p className="conf-p">{f.body}</p>
              {/* Bar thuần trang trí — số +N ngay bên trên đã nói hết. */}
              <span className="conf-bar" aria-hidden="true">
                <i style={{ width: `${(f.bonus / max) * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>

        <p className="conf-cap">
          Seven factors. Combined ceiling: <b>+{confluences.cap}</b>. Stacking
          confluences cannot quietly inflate every setup into a 95 &mdash; the cap is in
          the source specifically to stop that. More evidence widens the base, it does
          not raise the roof.
        </p>
      </div>
    </section>
  )
}
