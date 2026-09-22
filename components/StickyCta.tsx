import { cta, links, pricing, promo } from '@/lib/site'
import { Telegram } from './Icon'

/**
 * Thanh CTA dính, CHỈ trên màn hẹp.
 *
 * Trendline để sticky bar đè lên chart trong hero ngay màn đầu trên
 * desktop — thứ đầu tiên khách thấy là một thanh quảng cáo che mất chính cái
 * sản phẩm đang bán. Ở đây thanh này nằm dưới đáy, chỉ hiện dưới 880px, và
 * `body` được chừa `padding-bottom` trong globals.css nên nó không bao giờ
 * che mất nội dung cuối trang hay footer.
 *
 * Không có `position: fixed` nào trên desktop. Header sticky đã đủ.
 */
export function StickyCta() {
  return (
    <div className="sticky">
      <a
        className="btn btn-ghost"
        href={cta(links.telegramFree, 'sticky')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Telegram size={16} />
        Free channel
      </a>
      <a className="btn btn-primary" href="#pricing" data-cta="sticky">
        Get it · {pricing.symbol}
        {pricing.amount}
        {/* Giá cũ thì không có, nhưng giá SAU thì có thật — gạch ngang con số
            sắp tới, không phải con số đã qua. Đọc được trong 44px chiều cao
            của thanh sticky mà vẫn nói đúng chiều của việc tăng giá. */}
        {promo.enabled && (
          <s className="sticky-next">
            {pricing.symbol}
            {promo.launch.nextAmount}
          </s>
        )}
      </a>
    </div>
  )
}
