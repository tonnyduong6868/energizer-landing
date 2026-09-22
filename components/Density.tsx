import { density, styles, proof } from '@/lib/site'
import { SectionHead } from './SectionHead'

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
  const shot = proof.shots[2]

  return (
    <section id="density">
      <div className="wrap">
        <SectionHead no="04" tag="Density" meta="235 inputs · two that matter first" />

        <h2 className="h2">
          Every SMC tool dies the same way:
          <br />
          you turn it all on and cannot see price.
        </h2>
        <p className="lede" style={{ marginTop: 'var(--s5)' }}>
          So the amount of ink the script is allowed to spend is one input, at the top
          of the list. Every drawing block reads it. There is no combination of
          settings that ends with fifteen price tags stacked over the candles.
        </p>

        <ul className="preset-grid">
          {density.map((d) => (
            <li
              className={`preset${'isDefault' in d && d.isDefault ? ' is-default' : ''}`}
              key={d.name}
            >
              <div className="preset-n">{d.name}</div>
              <p className="preset-d">{d.body}</p>
              {'isDefault' in d && d.isDefault && (
                <span className="preset-tag">Ships as default</span>
              )}
            </li>
          ))}
        </ul>

        <h3 className="h3" style={{ marginTop: 'var(--s8)' }}>
          The other input that does most of the work
        </h3>
        <p className="lede" style={{ marginTop: 'var(--s3)' }}>
          Trading Style switches the entire EMA stack, which is what every trend
          trigger reads. You are not rebuilding the script to go from scalping to
          swing &mdash; you are changing one dropdown.
        </p>

        <ul className="style-row">
          {styles.map((s) => (
            <li className="style-chip" key={s.name}>
              <b>{s.name}</b>
              <span>{s.emas}</span>
            </li>
          ))}
        </ul>

        <p className="lede" style={{ marginTop: 'var(--s6)', fontSize: 15 }}>
          The remaining inputs are already set to something sensible, and every single
          one carries a tooltip that says what it does and what it breaks. You are
          never guessing what a switch is for.
        </p>

        <div style={{ marginTop: 'var(--s7)' }}>
          {shot ? (
            <figure className="shot">
              <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} />
              <figcaption className="shot-cap">{shot.caption}</figcaption>
            </figure>
          ) : (
            <div className="shot-empty">
              <p>
                <b>Ảnh so sánh Clean vs Full</b>
                Cùng một chart, cùng khung giờ, chỉ đổi Chart Density.
                <br />
                Đây là ảnh thuyết phục nhất của cả trang — nó cho thấy
                <br />
                thứ mà chữ nghĩa không nói được.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
