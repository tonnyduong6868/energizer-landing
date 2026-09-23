import { cta, density, links, pricing, styles } from '@/lib/site'
import { Media } from './Media'
import { SectionHead } from './SectionHead'
import { Telegram } from './Icon'

/**
 * Chart Density — điểm bán hàng thật nhất của sản phẩm.
 *
 * Mọi công cụ SMC đều chết vì cùng một lý do: bật hết tính năng thì chart
 * không đọc được nữa. Gần như không đối thủ nào giải quyết chuyện này bằng
 * một cái núm duy nhất, nên đây là khối xứng đáng đứng riêng chứ không nhét
 * chung vào danh sách tính năng.
 *
 * Cũng là khối trả lời sẵn phản đối "235 input thì học bao giờ xong" — hai
 * input đầu tiên làm gần hết việc.
 */
export function Density() {
  return (
    <section id="density">
      <div className="wrap">
        <SectionHead
          no="04"
          tag="Density"
          meta="235 inputs · two that matter first"
          title={
            <>
              Every SMC tool dies the same way:
              <br />
              you turn it all on and cannot see price.
            </>
          }
          lede="So the amount of ink the script is allowed to spend is one input, at the top of the list. Every drawing block reads it. There is no combination of settings that ends with fifteen price tags stacked over the candles."
        />

        <ul className="preset-grid">
          {density.map((d) => (
            <li
              className={`preset${'isDefault' in d && d.isDefault ? ' is-default' : ''}`}
              key={d.name}
            >
              {/* Tag đứng TRƯỚC tên, và luôn render kể cả khi rỗng: ô nào
                  cũng chừa đúng một dòng ở trên nên bốn cái tên thẳng hàng. */}
              <span className="preset-tag">
                {'isDefault' in d && d.isDefault ? 'Ships as default' : ' '}
              </span>
              <div className="preset-n">{d.name}</div>
              <p className="preset-d">{d.body}</p>
            </li>
          ))}
        </ul>

        {/* Cùng nhịp hai cột như SectionHead: tiêu đề trái, giải thích phải. */}
        <div className="sh-row" style={{ marginTop: 'var(--s7)' }}>
          <h3 className="h3">The other input that does most of the work</h3>
          <p className="lede">
            Trading Style switches the entire EMA stack, which is what every trend
            trigger reads. You are not rebuilding the script to go from scalping to
            swing &mdash; you are changing one dropdown.
          </p>
        </div>

        <ul className="style-row">
          {styles.map((s) => (
            <li className="style-chip" key={s.name}>
              <b>{s.name}</b>
              <span>{s.emas}</span>
            </li>
          ))}
        </ul>

        <p className="lede" style={{ marginTop: 'var(--s5)', fontSize: 14.5 }}>
          The remaining inputs are already set to something sensible, and every single
          one carries a tooltip that says what it does and what it breaks. You are
          never guessing what a switch is for.
        </p>

        <Media slot="density-compare" gap="var(--s5)" />

        {/* Video kéo núm density đứng NGAY TRƯỚC cta-strip, vì câu đầu tiên
            của cta-strip là "Watching it move on a live chart says more than
            this paragraph does" — nó phải đọc như chú thích cho thứ vừa xem,
            không phải như một lời hứa suông. Ô còn rỗng: xem `media` trong
            lib/site.ts. */}
        <Media slot="density-move" gap="var(--s5)" />

        {/* Nút giữa trang, đặt ở ĐÂY chứ không phải chỗ khác.
            Đây là điểm người đọc vừa hiểu ra thứ phân biệt sản phẩm này với
            mọi công cụ SMC khác — giữa hero và bảng giá có gần 4.000px, để
            trống cả quãng đó là bắt người đã bị thuyết phục phải đi tìm nút. */}
        <div className="cta-strip">
          <p>
            Chart Density is one dropdown. Watching it move on a live chart says
            more than this paragraph does.
          </p>
          <div className="cta-strip-row">
            <a
              className="btn btn-primary"
              href={cta(links.telegramFree, 'density')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Telegram size={17} />
              Watch it work — free channel
            </a>
            <a className="btn btn-ghost" href="#pricing" data-cta="density">
              Get the licence · {pricing.symbol}
              {pricing.amount}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
