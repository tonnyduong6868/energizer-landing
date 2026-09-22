import type { Metadata, Viewport } from 'next'
import { fontClassNames } from './fonts'
import { asset, site, pricing } from '@/lib/site'
import { CountdownScript } from '@/components/CountdownScript'
import { Analytics } from '@/components/Analytics'
import { PageField } from '@/components/AmbientField'
/* Nav header chạy hiệu ứng của Animated Top Dock nên cần stylesheet gốc của
   thư viện. Nhập nguyên bản, không cắt tỉa: đã kiểm 479 selector và KHÔNG
   có selector toàn cục nào (`html`, `body`, `*`, `:root`, thẻ trần) nên nó
   không đụng tới globals.css. Giá phải trả: ~27 KB gzip, trong đó phần lớn
   là font ThreeUI Fragment Mono nhúng base64 mà thanh nav dùng. */
import '@designcodeio/threeui/style.css'
import './globals.css'

/**
 * Metadata đầy đủ — đây là chỗ hai funnel đem ra đối chiếu hỏng nặng nhất.
 *
 * Cả hai (GoHighLevel, soi 09/2026) đều KHÔNG có
 * meta description và KHÔNG có og:image. Dán link lên Facebook, Telegram,
 * Discord hay X đều ra preview trống. Với funnel sống bằng paid social thì
 * đó là tiền chảy ra mỗi ngày vì một thẻ meta thiếu.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} ${site.version} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
  icons: {
    // icons đi thẳng ra thẻ <link> nên phải tự thêm basePath.
    icon: [
      { url: asset('/assets/favicon.ico'), sizes: 'any' },
      { url: asset('/assets/icon.svg'), type: 'image/svg+xml' },
    ],
    apple: asset('/assets/logo-256.png'),
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} ${site.version} — ${site.tagline}`,
    description:
      'A single-chart Smart Money terminal for TradingView. Every setup scored ' +
      `0-100, seven ICT confluences capped at +30. ${pricing.symbol}${pricing.amount} once, ` +
      'no subscription. Free Telegram channel — watch it work before you pay.',
    // metadataBase đã chứa basePath rồi, thêm asset() nữa là lặp đường dẫn.
    images: [{ url: '/assets/og.png', width: 1200, height: 630, alt: site.name }],
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} ${site.version}`,
    description: site.tagline,
    images: ['/assets/og.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#07070A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        {/* Bỏ qua phần đầu trang bằng bàn phím. Một dòng, và nó là khác biệt
            giữa trang dùng được và trang không dùng được bằng Tab. */}
        <a className="skip" href="#main">
          Skip to content
        </a>

        {/* Nền động phủ cả trang. `position: fixed` + `z-index: -1` nên nó
            nằm dưới mọi thứ không định vị, tức chữ và tile đều đè lên; đặt
            ở đây chứ không trong <main> vì nó bám khung nhìn, không bám
            luồng. Một canvas duy nhất cho toàn trang — xem AmbientField.tsx
            về việc vì sao Hero lại có lớp riêng. */}
        <PageField />

        {children}

        {/* Cuối <body>: markup đã có sẵn khi script chạy nên không cần
            DOMContentLoaded, và không chặn paint. */}
        <CountdownScript />
        {/* In ra rỗng khi chưa cấu hình provider — xem lib/site.ts. */}
        <Analytics />
      </body>
    </html>
  )
}
