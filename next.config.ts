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
}

export default nextConfig
