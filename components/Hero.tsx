import { cta, hasMedia, links, pricing, promo, promoSaving, site, specs } from '@/lib/site'
import { ChartPanel } from './ChartPanel'
import { HeroField } from './AmbientField'
import { Media } from './Media'
import { Telegram } from './Icon'

/**
 * Hero.
 *
 * Bốn quyết định, mỗi cái sửa một lỗi cụ thể:
 *
 * 1. CTA kép. Trendline và Scalper chỉ có một cửa — mua hoặc biến mất — nên
 *    100% người chưa sẵn sàng trả tiền bị mất trắng. Ở đây nút chính là vào
 *    Telegram free.
 *
 * 2. Dải spec thay cho "8,900+ traders · 4.8★". Bốn con số ở đây đều đếm
 *    được từ source code và ai cũng kiểm lại được. Không neo giá, không đếm
 *    ngược, không toast "ai đó vừa mua".
 *
 * 3. Một cột căn giữa, không phải hai cột. Bản trước chia 1.05fr/1fr và nhét
 *    một ô gạch đứt cao 320px vào cột phải — tức nửa màn hình đầu tiên của
 *    trang bán hàng là một cái hộp rỗng.
 *
 * 4. Có hình. <ChartPanel> vẽ lại đúng cấu trúc mà indicator in ra chart.
 *    Nó là HÌNH MINH HOẠ và caption nói rõ thế; nó là tầng CUỐI, nhường chỗ
 *    ngay khi ô `hero` hoặc `hero-still` có thật. Thà vẽ sơ đồ của chính
 *    mình còn hơn mượn ảnh của người khác, và hơn hẳn để trống.
 */
export function Hero() {
  /* Ba tầng rơi, xét theo thứ tự: video → ảnh tĩnh → sơ đồ minh hoạ. Tầng
     nào cũng đứng một mình được nên không tổ hợp nào ra ô trống. Dùng
     `hasMedia` chứ không ngó `media[...].fill` trực tiếp, vì ở dev phiếu
     nhắc việc cũng tính là "ô này có cái để hiện". */
  const hasVideo = hasMedia('hero')
  const hasStill = hasMedia('hero-still')

  return (
    <>
      <section className="hero" id="top">
        {/* Lớp dưới cùng CỦA HERO — không phải của trang; lớp phủ cả trang
            là <PageField/> trong app/layout.tsx, và `.hero` có nền đục nên
            nó che lớp kia ở khúc này. Chỉ xuất hiện sau hydrate và chỉ khi
            người dùng không tắt chuyển động — HTML tĩnh không có thẻ canvas
            nào, xem AmbientField.tsx. Vầng sáng hổ phách `.hero::before`
            nằm ĐÈ LÊN nó, chữ nằm trên cùng. */}
        <HeroField />

        <div className="wrap hero-grid">
          <p className="eyebrow">TradingView · Pine v6 · {site.version}</p>

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

          {/* Dòng chọn lọc đứng TRƯỚC nút, không phải sau. Đọc xong mới bấm
              thì nó còn tác dụng; đặt dưới nút thì người bấm đã bấm rồi. */}
          <p className="hero-for">{site.audience}</p>

          <div className="hero-cta">
            <a
              className="btn btn-primary btn-lg"
              href={cta(links.telegramFree, 'hero')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Telegram size={18} />
              Watch it work — free channel
            </a>
            <a className="btn btn-ghost btn-lg" href="#pricing" data-cta="hero">
              Get the licence · {pricing.symbol}
              {pricing.amount}
            </a>
          </div>

          {/* Không có dấu `·` ngăn giữa ba mệnh đề. Đã thử: dấu ngăn phải là
              flex item riêng, nên khi hàng xuống dòng nó bị bỏ lại lủng lẳng ở
              cuối dòng. Ba mệnh đề cách nhau 32px thì tự tách ý rồi. */}
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

          {/* Giảm giá đứng SAU ba mệnh đề trấn an, không đứng trước. Lời đầu
              tiên của một trang bán hàng mà đã là "giảm giá" thì phần còn lại
              đọc như quảng cáo; để nó ở đây thì nó là thông tin bổ sung cho
              người đã bị thuyết phục. */}
          {promo.enabled && (
            <p className="hero-promo">
              <span className="promo-badge">&minus;{promoSaving.percent}%</span>
              <span>
                {pricing.symbol}
                {pricing.amount} is the launch price and it holds until{' '}
                <b>{promo.launch.untilLabel}</b>. After that it is {pricing.symbol}
                {promo.launch.nextAmount}
                {promo.crypto.percent > 0 && (
                  <>
                    . Paying in crypto takes another {promo.crypto.percent}% off, so{' '}
                    {pricing.symbol}
                    {promoSaving.crypto} today
                  </>
                )}
                .
              </span>
            </p>
          )}
        </div>
      </section>

      <div className="wrap bento">
        {hasVideo ? (
          <Media slot="hero" className="tile bento-wide shot" />
        ) : hasStill ? (
          <Media slot="hero-still" className="tile bento-wide shot" priority />
        ) : (
          <div className="tile bento-wide">
            <div className="panel-bar">
              <span className="panel-live">● LIVE</span>
              <span>XAUUSD · 15M</span>
              <span>NY KILLZONE</span>
              <span className="panel-score">SCORE 87 / 100 · LONG</span>
            </div>
            <ChartPanel />
            <p className="panel-cap">
              Illustration of the on-chart panel — not a backtest, not a track record.
            </p>
          </div>
        )}

        <ul className="specs">
          {specs.map((s) => (
            <li className="spec" key={s.label}>
              <div className="spec-v">{s.value}</div>
              <div className="spec-l">{s.label}</div>
            </li>
          ))}
        </ul>

      </div>
    </>
  )
}
