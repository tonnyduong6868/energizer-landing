import { pillars } from '@/lib/site'
import { Media } from './Media'
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
  return (
    <section>
      <div className="wrap">
        <SectionHead
          no="02"
          tag="What it does"
          meta="four jobs, one script"
          title="A single-chart Smart Money terminal."
          lede="Not a signal service, not a bot. One script that sees the structure, scores the setup, weighs the context, and draws the trade."
        />

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

        <Media slot="pillars-wide" gap="var(--gap)" />
      </div>
    </section>
  )
}
