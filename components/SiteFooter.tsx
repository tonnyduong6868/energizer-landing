import { hasPlaceholderLinks, hasUnconfirmedPromo, links, nav, promo, site } from '@/lib/site'

/**
 * Footer + disclaimer.
 *
 * Disclaimer viết đầy đủ chứ không giấu. Scalper làm phần này tốt hơn hẳn
 * Trendline (có trademark notice, có earnings disclaimer) và đó là thứ đáng
 * học lại — với sản phẩm tài chính thì disclaimer không phải thủ tục, nó là
 * thứ đứng giữa anh và một khiếu nại.
 *
 * Khối cảnh báo đỏ chỉ hiện khi link vẫn còn placeholder. Cố ý để nó hiện
 * TRÊN TRANG chứ không phải warning trong console — console thì không ai mở,
 * còn cái này thì không thể ship mà không thấy.
 */
export function SiteFooter() {
  const year = 2026

  return (
    <footer className="ftr">
      <div className="wrap">
        {hasPlaceholderLinks && (
          <div className="devwarn" role="alert">
            ⚠ lib/site.ts còn link placeholder (REPLACE_ME). Sửa `links` trước khi
            chạy quảng cáo — khách bấm vào sẽ rơi vào trang 404.
          </div>
        )}

        {hasUnconfirmedPromo && (
          <div className="devwarn" role="alert">
            ⚠ Banner giảm giá đang chạy mà chưa ai xác nhận. Đặt
            {' '}<code>promo.launch.confirmed</code> = true khi đã CHỐT là ngày{' '}
            {promo.launch.untilLabel} giá lên thật {promo.launch.nextAmount}$, và
            {' '}<code>promo.crypto.confirmed</code> = true khi checkout của Energizer
            thật sự nhận crypto. Treo lời hứa rồi không làm là rơi đúng FTC Act §5
            và UCPD Annex I §7 — nặng hơn hẳn việc không có banner.
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
                <a href={links.checkout}>Checkout</a>
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
