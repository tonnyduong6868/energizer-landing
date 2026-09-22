import { cta, links, pricing, promo, promoSaving } from '@/lib/site'
import { Countdown } from './Countdown'

/**
 * Dải giảm giá trên cùng.
 *
 * Nằm BÊN TRONG `<header className="hdr">` chứ không phải một phần tử sticky
 * riêng. Hai thứ cùng dính ở `top: 0` thì phải tự tính chiều cao của cái trên
 * để đặt `top` cho cái dưới — mà chiều cao đó đổi theo độ dài chữ và theo
 * breakpoint, nên kiểu gì cũng có một khổ màn hình bị chồng. Gói chung một
 * khối sticky thì trình duyệt tự lo.
 *
 * Hai bản chữ, không phải một bản co giãn: màn rộng đọc đủ ba mệnh đề, màn
 * hẹp chỉ còn mệnh đề đắt nhất. Nhồi cả ba vào 390px thì nó xuống ba dòng và
 * đẩy header cao gần bằng một phần tư màn hình.
 *
 * KHÔNG có đồng hồ đếm ngược ở đây. Ngày là thật nên ghi ngày; đếm từng giây
 * là kỹ thuật gây áp lực chứ không thêm một thông tin nào.
 */
export function PromoBar() {
  if (!promo.enabled) return null

  const { nextAmount, untilLabel } = promo.launch

  return (
    <div className="promo">
      <a className="wrap promo-in" href="#pricing" data-cta="promo">
        <span className="promo-badge">
          &minus;{promoSaving.percent}%
        </span>

        <span className="promo-long">
          <b>Launch price {pricing.symbol}{pricing.amount}</b> until {untilLabel} &mdash;
          then {pricing.symbol}{nextAmount}.
          {promo.crypto.percent > 0 && (
            <> Pay in crypto and take another {promo.crypto.percent}% off.</>
          )}
        </span>

        <span className="promo-short">
          <b>{pricing.symbol}{pricing.amount}</b> until {untilLabel} · then{' '}
          {pricing.symbol}{nextAmount}
        </span>

        {/* Đồng hồ thế chỗ "See pricing →": cùng một góc phải, và nó là
            thông tin, còn mũi tên chỉ nhắc lại rằng cả dải là một cái
            link. Khi không đếm (tắt cờ, hoặc reduced-motion) thì mũi tên
            quay lại — CSS lo, xem .promo-go. */}
        <Countdown className="cd-bar" />
        <span className="promo-go" aria-hidden="true">
          See pricing →
        </span>
      </a>
    </div>
  )
}

/**
 * Khối giảm giá trong thẻ giá ở khối 08 — chỗ quyết định thật sự xảy ra.
 *
 * Ở đây được phép dài hơn dải trên cùng: người đọc tới được đây là đang cân
 * con số, nên ba dòng cụ thể có ích hơn một khẩu hiệu.
 */
export function PromoPrice() {
  if (!promo.enabled) return null

  const { nextAmount, untilLabel } = promo.launch

  return (
    <div className="promo-card">
      <p className="promo-card-h">
        <span className="promo-badge">&minus;{promoSaving.percent}%</span>
        Launch price, ends {untilLabel}
      </p>

      {/* Ở đây đồng hồ được phép to hơn trên dải: người đọc tới thẻ giá là
          đang cân con số, không phải đang lướt qua. */}
      <Countdown className="cd-lg" />

      <ul className="promo-rows">
        <li>
          <span>Today</span>
          <b>
            {pricing.symbol}
            {pricing.amount}
          </b>
        </li>
        {promo.crypto.percent > 0 && (
          <li>
            <span>Paid in crypto &minus;{promo.crypto.percent}%</span>
            <b className="is-best">
              {pricing.symbol}
              {promoSaving.crypto}
            </b>
          </li>
        )}
        <li className="is-after">
          <span>From {untilLabel}</span>
          <b>
            {pricing.symbol}
            {nextAmount}
          </b>
        </li>
      </ul>

      {promo.stackableCode && (
        <p className="promo-card-n">
          Got a support code? It stacks on top of the crypto discount at checkout.{' '}
          <a href={cta(links.support, 'pricing')}>Ask for one</a> before you pay.
        </p>
      )}
    </div>
  )
}
