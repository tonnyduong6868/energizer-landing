import { links, nav, site } from '@/lib/site'
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
      <div className="wrap hdr-in">
        <a className="hdr-brand" href="#top">
          {site.short}
          <span className="hdr-ver">{site.version}</span>
        </a>

        <nav className="hdr-nav" aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hdr-cta">
          <a
            className="btn btn-ghost"
            href={links.telegramFree}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram size={16} />
            Free channel
          </a>
          <a className="btn btn-primary" href="#pricing">
            Get the licence
          </a>
        </div>
      </div>
    </header>
  )
}
