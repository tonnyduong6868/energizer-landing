import type { NextConfig } from 'next'

/**
 * GitHub Pages phục vụ site ở /<tên-repo>/ nên bản build cần basePath.
 * Giữ nguyên cách làm của traiga-landing-next: production tự mặc định đúng
 * đường dẫn Pages, `next dev` vẫn chạy ở gốc localhost.
 *
 * Gắn tên miền riêng thì ghi đè khi build:
 *   NEXT_PUBLIC_BASE_PATH="" npm run build
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? '/energizer-landing' : '')

const nextConfig: NextConfig = {
  // Xuất HTML tĩnh vào out/ — deploy thẳng lên GitHub Pages, không cần server.
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,

  // Đẩy cùng giá trị vào bundle để asset() trong lib/site.ts không lệch.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // GitHub Pages không chạy được image optimizer của Next.
  images: { unoptimized: true },

  // Sinh out/index.html thay vì out.html.
  trailingSlash: true,

  /**
   * Nav header dùng `createTopDockController` của @designcodeio/threeui —
   * vật lý proximity gốc, không viết lại (xem components/DockNav.tsx).
   *
   * Package chỉ mở export map cho `.`, `./style.css`, `./components/*` và
   * `./assets/*`; module controller nằm trong `./shaders/*` nên import
   * thẳng bị chặn. Alias ở đây là cách lấy đúng file tác giả build ra mà
   * không phải copy nó vào repo — copy là mở đường cho bản copy trôi lệch
   * khỏi package lúc nâng phiên bản mà không ai biết.
   *
   * Nâng @designcodeio/threeui mà build gãy ở dòng này thì nghĩa là upstream
   * đã dời file — đi tìm đường mới, đừng gỡ alias.
   */
  turbopack: {
    resolveAlias: {
      '@threeui/top-dock-controller':
        './node_modules/@designcodeio/threeui/lib-dist/shaders/animated-top-dock/topDockController.js',
      /**
       * Nền động của trang. Cái này KHÁC controller ở trên: package mở export root
       * cho `StreamConvergenceBackground`, nên về lý là import thẳng
       * `@designcodeio/threeui` được. Không làm vậy vì root là barrel
       * re-export cho hơn 40 hiệu ứng; tree-shaking mà hụt một nhánh là
       * trang bán hàng gánh cả thư viện. Trỏ đúng một file thì không có gì
       * để hụt — nó chỉ kéo theo streamConvergenceShaders.js.
       */
      '@threeui/stream-convergence':
        './node_modules/@designcodeio/threeui/lib-dist/shaders/stream-convergence/StreamConvergenceBackground.js',
    },
  },
}

export default nextConfig
