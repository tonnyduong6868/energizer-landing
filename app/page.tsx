import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/components/Hero'
import { Pain } from '@/components/Pain'
import { Pillars } from '@/components/Pillars'
import { Confluence } from '@/components/Confluence'
import { Density } from '@/components/Density'
import { TelegramTiers } from '@/components/Telegram'
import { Honest } from '@/components/Honest'
import { Quotes } from '@/components/Quotes'
import { Pricing } from '@/components/Pricing'
import { Faq } from '@/components/Faq'
import { EndCta } from '@/components/EndCta'
import { SiteFooter } from '@/components/SiteFooter'
import { StickyCta } from '@/components/StickyCta'
import { MediaPlayScript } from '@/components/Media'
import { faq, pricing, site } from '@/lib/site'

/**
 * Thứ tự khối — và vì sao là thứ tự này.
 *
 * Bám pattern `hero-testimonials-cta` + `comparison-table-cta` từ DB của
 * ui-ux-pro-max, nhưng chèn thêm hai khối mà không pattern nào có sẵn:
 *
 *   05 Telegram  đặt TRƯỚC giá, không phải sau. Người đọc gặp cửa miễn phí
 *                khi còn đang cân nhắc, chứ không phải sau khi đã từ chối trả
 *                tiền. Đây là toàn bộ lý do trang này tồn tại.
 *
 *   06 Honest    đặt NGAY TRƯỚC giá. Chỗ này ở mọi funnel khác là chỗ đặt
 *                đồng hồ đếm ngược. Thay bằng phần tự khai lỗi thống kê của
 *                chính mình — cùng vị trí, ngược hoàn toàn về cơ chế: giảm
 *                rủi ro cảm nhận thay vì tăng áp lực thời gian.
 *
 * Toàn bộ trang là Server Component, không có 'use client' ở đâu. Nghĩa là
 * mọi chữ khách đọc đều nằm trong HTML gốc. Scalper dựng features, bảng so
 * sánh, thẻ giá và FAQ bằng 28 lệnh `innerHTML` phía client — tắt JS là trang
 * trắng, và crawler yếu cũng thấy y như vậy.
 */
export default function Page() {
  // JSON-LD: Product + FAQPage. Không con số nào ở đây không có trên trang —
  // schema mâu thuẫn với nội dung hiện lên là lý do bị gỡ rich result.
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: `${site.name} ${site.version}`,
        description: site.description,
        brand: { '@type': 'Brand', name: site.name },
        offers: {
          '@type': 'Offer',
          price: String(pricing.amount),
          priceCurrency: pricing.currency,
          availability: 'https://schema.org/InStock',
          url: site.url,
        },
        // KHÔNG khai aggregateRating. Chưa có review thật thì khai là bịa, và
        // Google phạt rich result sai nặng hơn là không có rich result.
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <SiteHeader />

      <main id="main">
        <Hero />
        <Pain />
        <Pillars />
        <Confluence />
        <Density />
        <TelegramTiers />
        <Honest />
        <Quotes />
        <Pricing />
        <Faq />
        <EndCta />
      </main>

      <SiteFooter />
      <StickyCta />

      {/* Sau </main>, và chỉ MỘT bản cho cả trang. Script quét
          `querySelectorAll` một lần lúc parser đọc tới nó, nên đặt trong Hero
          thì mọi video nằm dưới hero vẫn chưa vào DOM và sẽ không bao giờ
          được gắn observer — im lặng, không lỗi. Xem Media.tsx. */}
      <MediaPlayScript />
    </>
  )
}
