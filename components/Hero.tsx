import { links, pricing, proof, site, specs } from '@/lib/site'
import { Telegram } from './Icon'

/**
 * Hero.
 *
 * Ba quyết định, mỗi cái sửa một lỗi cụ thể của hai funnel cũ:
 *
 * 1. CTA kép. Trendline và Scalper chỉ có một cửa — mua hoặc biến mất — nên
 *    100% người chưa sẵn sàng trả tiền bị mất trắng. Ở đây nút chính là vào
 *    Telegram free.
 *
 * 2. Dải spec thay cho "8,900+ traders · 4.8★". Bốn con số ở đây đều đếm
 *    được từ source code và ai cũng kiểm lại được. Không neo giá, không đếm
 *    ngược, không toast "ai đó vừa mua".
 *
 * 3. Ảnh chart có width/height cứng. Trendline có 58 ảnh không khai kích
 *    thước, đó là nguyên nhân trực tiếp gây CLS. Khi chưa có ảnh thật thì
 *    hiện ô rỗng ghi rõ cần chụp gì — thà để trống còn hơn mượn ảnh của
 *    người khác.
 */
export function Hero() {
  const shot = proof.shots[0]

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">
            TradingView · Pine v6 · {site.version}
          </p>

          <h1>
            One score.
            <br />
            Not <em>twelve opinions</em>.
          </h1>

          <p className="hero-lede">
            Twelve indicators disagreeing is not confluence, it is noise with a
            committee. The Energizer scores every setup <strong>0&ndash;100</strong> from
            trend, momentum and volatility &mdash; then seven Smart Money confluences
            adjust that one number instead of starting a second argument.
          </p>

          <div className="hero-cta">
            <a
              className="btn btn-primary btn-lg"
              href={links.telegramFree}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Telegram size={18} />
              Watch it work — free channel
            </a>
            <a className="btn btn-ghost btn-lg" href="#pricing">
              Get the licence · {pricing.symbol}
              {pricing.amount}
            </a>
          </div>

          {/* Không có dấu `·` ngăn giữa ba mệnh đề. Đã thử: dấu ngăn phải là
              flex item riêng, nên khi hàng xuống dòng nó bị bỏ lại lủng lẳng ở
              cuối dòng — đo được ở mọi bề ngang ≥1024px và 561–700px, tức là
              gần hết các khổ màn thật. Ba mệnh đề xếp dọc thì tự tách ý rồi. */}
          <p className="hero-sub">
            <span>
              <b>No card</b> for the channel
            </span>
            <span>
              <b>One payment</b>, no subscription
            </span>
            <span>
              <b>{pricing.guarantee.days}-day</b> refund, no questions
            </span>
          </p>

          <ul className="specs">
            {specs.map((s) => (
              <li className="spec" key={s.label}>
                <div className="spec-v">{s.value}</div>
                <div className="spec-l">{s.label}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {shot ? (
            <figure className="shot">
              {/* width/height bắt buộc — thiếu là layout nhảy khi ảnh tải xong. */}
              <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} />
              <figcaption className="shot-cap">{shot.caption}</figcaption>
            </figure>
          ) : (
            <div className="shot-empty">
              <p>
                <b>Chart screenshot goes here</b>
                Bỏ ảnh vào public/assets/shots/ rồi khai trong proof.shots
                <br />
                Nên chụp: dashboard HUD + một lệnh đang sống
                <br />
                có SL / TP1 / TP2 / TP3 và điểm số hiện rõ
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
