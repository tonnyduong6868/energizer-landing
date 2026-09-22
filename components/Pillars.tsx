import { pillars, proof } from '@/lib/site'
import { SectionHead } from './SectionHead'

/**
 * Bốn trụ — lấy nguyên văn từ header của file .pine (dòng 12-25).
 *
 * Cố ý không viết lại thành ngôn ngữ marketing: bản mô tả trong source đã
 * chính xác và cụ thể hơn bất cứ thứ gì tôi nghĩ ra, và giữ nguyên chữ nghĩa
 * đó nghĩa là trang bán hàng nói cùng một ngôn ngữ với phần mềm. Khách mua
 * xong mở indicator lên sẽ thấy đúng những chữ họ vừa đọc.
 */
export function Pillars() {
  const shot = proof.shots[1]

  return (
    <section>
      <div className="wrap">
        <SectionHead no="02" tag="What it does" meta="four jobs, one script" />

        <h2 className="h2">A single-chart Smart Money terminal.</h2>
        <p className="lede" style={{ marginTop: 'var(--s5)' }}>
          Not a signal service, not a bot. One script that sees the structure, scores
          the setup, weighs the context, and draws the trade.
        </p>

        <ul className="pillars">
          {pillars.map((p, i) => (
            <li className="pillar" key={p.key}>
              <div className="pillar-n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3>{p.label}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'var(--s7)' }}>
          {shot ? (
            <figure className="shot">
              <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} />
              <figcaption className="shot-cap">{shot.caption}</figcaption>
            </figure>
          ) : (
            <div className="shot-empty">
              <p>
                <b>Wide chart screenshot</b>
                Nên chụp: Chart Density = Balanced, có HTF projection
                <br />
                + killzone box + một FVG được tô, trên khung H1
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
