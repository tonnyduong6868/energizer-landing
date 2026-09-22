import {
  analyticsMissing,
  cta,
  hasPlaceholderLinks,
  hasUnconfirmedPromo,
  links,
  nav,
  promo,
  proof,
  site,
} from '@/lib/site'

/**
 * Footer + disclaimer.
 *
 * Disclaimer viết đầy đủ chứ không giấu. Scalper làm phần này tốt hơn hẳn
 * Trendline (có trademark notice, có earnings disclaimer) và đó là thứ đáng
 * học lại — với sản phẩm tài chính thì disclaimer không phải thủ tục, nó là
 * thứ đứng giữa anh và một khiếu nại.
 *
 * Trên cùng là một danh sách "chưa xong", chỉ hiện những dòng còn thiếu và
 * biến mất hẳn khi hết. Cố ý để nó nằm TRÊN TRANG chứ không phải warning
 * trong console — console thì không ai mở, còn cái này thì không thể ship
 * mà không thấy.
 *
 * Hai mức, và phân biệt hai mức là quan trọng:
 *
 * · ĐỎ  — chặn. Ship ra là mất tiền hoặc dính pháp lý ngay.
 * · VÀNG — nhắc. Trang vẫn bán được, nhưng anh đang bán mù.
 *
 * Trước đây mỗi cảnh báo là một hộp đỏ riêng xếp chồng lên nhau. Ba hộp đỏ
 * cạnh nhau thì mắt ngừng đọc từ hộp thứ hai, và cái chặn thật lẫn với cái
 * chỉ nhắc. Gom thành một danh sách có phân cấp thì mỗi dòng còn giữ được
 * trọng lượng của nó.
 */
export function SiteFooter() {
  const year = 2026

  const blockers = [
    hasPlaceholderLinks && (
      <li key="links">
        <code>lib/site.ts</code> còn link placeholder (<code>REPLACE_ME</code>).
        Sửa <code>links</code> trước khi chạy quảng cáo — khách bấm vào rơi
        thẳng vào trang 404 và mất luôn.
      </li>
    ),
    hasUnconfirmedPromo && (
      <li key="promo">
        Banner giảm giá {promo.countdown && 'kèm đồng hồ đếm ngược '}đang chạy
        mà chưa ai xác nhận. Đặt <code>promo.launch.confirmed</code> = true khi
        đã CHỐT là ngày {promo.launch.untilLabel} giá lên thật{' '}
        {promo.launch.nextAmount}$, và <code>promo.crypto.confirmed</code> = true
        khi checkout thật sự nhận crypto. Treo lời hứa rồi không làm là rơi
        đúng FTC Act §5 và UCPD Annex I §7 — nặng hơn hẳn việc không có banner.
      </li>
    ),
  ].filter(Boolean)

  const notes = [
    analyticsMissing && (
      <li key="analytics">
        Chưa gắn đo lường. Bốn chỗ đặt banner và cái đồng hồ đếm ngược hiện
        không có cách nào biết là có tác dụng hay không — mọi chỉnh sửa sau
        đây đều là đoán. Chọn <code>analytics.provider</code> trong{' '}
        <code>lib/site.ts</code> là xong, không phải sửa code.
      </li>
    ),
    proof.shots.length === 0 && (
      <li key="shots">
        <code>proof.shots</code> rỗng nên khối ảnh chart tự ẩn. Trang đang mô
        tả một công cụ trực quan mà không cho xem nó trông thế nào.
      </li>
    ),
    proof.quotes.length === 0 && (
      <li key="quotes">
        <code>proof.quotes</code> rỗng nên khối nhận xét tự ẩn. Để rỗng còn
        hơn bịa — nhưng đây là chỗ trống thật, không phải chỗ đã xong.
      </li>
    ),
  ].filter(Boolean)

  return (
    <footer className="ftr">
      <div className="wrap">
        {blockers.length > 0 && (
          <div className="devwarn" role="alert">
            <b>⚠ Chặn — sửa trước khi đẩy traffic vào</b>
            <ul>{blockers}</ul>
          </div>
        )}

        {notes.length > 0 && (
          <div className="devwarn is-soft">
            <b>Còn thiếu — không chặn, nhưng đang bán mù</b>
            <ul>{notes}</ul>
          </div>
        )}

        <div className="ftr-grid">
          <div>
            <div style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {site.name} <span style={{ color: 'var(--chg)' }}>{site.version}</span>
            </div>
            <p style={{ marginTop: 'var(--s3)', fontSize: 14, color: 'var(--ink-2)', maxWidth: '44ch' }}>
              {site.tagline} A single-chart Smart Money terminal for TradingView.
            </p>
          </div>

          <div>
            <h4>On this page</h4>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={links.telegramFree} target="_blank" rel="noopener noreferrer">
                  Free Telegram channel
                </a>
              </li>
              <li>
                <a href={links.support}>Email support</a>
              </li>
              <li>
                <a href={cta(links.checkout, 'footer')}>Checkout</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="disclaimer">
          <p>
            <strong>Risk disclaimer.</strong> Trading leveraged instruments carries a
            high level of risk and can result in the loss of all of your capital. Past
            performance of any tool, signal or method does not indicate future results.
            Nothing on this page is financial, investment or tax advice, and nothing
            here is a recommendation to buy or sell any instrument. You are responsible
            for every order you place.
          </p>
          <p>
            <strong>What this product is.</strong> {site.name} is a technical analysis
            indicator for the TradingView platform. It does not place orders, hold
            funds, or manage an account. It scores setups from price data and draws
            them on a chart. We do not publish backtest equity curves, because you
            cannot verify ours and we cannot verify anyone else&rsquo;s &mdash; the
            script ships with a rolling profit factor so you can measure it on your own
            chart instead.
          </p>
          <p>
            <strong>Trademarks.</strong> TradingView is a trademark of TradingView,
            Inc. MetaTrader is a trademark of MetaQuotes Ltd. Telegram is a trademark
            of Telegram Messenger Inc. This product is not affiliated with, endorsed
            by, or sponsored by any of them. Portions of the source derive from the
            ICT toolkit &ldquo;Miaomiao + GBT&rdquo; (c) Khanhss, used under MPL-2.0.
          </p>
          <p style={{ color: 'var(--ink-3)', marginTop: 'var(--s5)' }}>
            &copy; {year} ZynAlgo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
