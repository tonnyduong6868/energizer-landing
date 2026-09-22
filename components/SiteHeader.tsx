import { cta, links, nav, site } from '@/lib/site'
import { PromoBar } from './PromoBar'
import { DockNav } from './DockNav'
import { Telegram } from './Icon'

/**
 * Header dính.
 *
 * Hai CTA, đúng thứ tự phễu hai tầng: Telegram free đứng trước (cửa rộng),
 * mua đứng sau (cửa hẹp). Ngược lại là mất hết người chưa sẵn sàng trả tiền.
 *
 * Trên màn hẹp nav ẩn đi và KHÔNG thay bằng hamburger. Trang một mạch dài,
 * menu chỉ là anchor cuộn — dựng thêm một cái drawer cho bảy cái neo là thêm
 * bẫy focus mà chẳng ai dùng. Thanh sticky dưới đáy đã lo phần CTA.
 */
export function SiteHeader() {
  return (
    <header className="hdr">
      {/* Dải giảm giá nằm trong cùng khối sticky, không phải một sticky thứ
          hai — xem ghi chú trong PromoBar.tsx. */}
      <PromoBar />

      <div className="wrap hdr-in">
        <a className="hdr-brand" href="#top">
          {site.short}
          <span className="hdr-ver">{site.version}</span>
        </a>

        {/* Bảy cái neo cũ, giờ chạy proximity của Animated Top Dock. Vẫn là
            thẻ <a> thật nằm sẵn trong HTML tĩnh — xem DockNav.tsx. */}
        <DockNav items={nav} label="Sections" className="hdr-dock" />

        <div className="hdr-cta">
          <a
            className="btn btn-ghost"
            href={cta(links.telegramFree, 'header')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram size={16} />
            Free channel
          </a>
          <a className="btn btn-primary" href="#pricing" data-cta="header">
            Get the licence
          </a>
        </div>
      </div>
    </header>
  )
}
