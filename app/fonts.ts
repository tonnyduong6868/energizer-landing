import { Inter, JetBrains_Mono } from 'next/font/google'

/**
 * Hai font, đúng hai vai.
 *
 * Inter cho phần đọc — DB của ui-ux-pro-max trả về Inter cho đúng hồ sơ này
 * ("dark, cinematic, technical, precision · best for fintech/trading, AI
 * dashboards, developer tools"), nên đây là lựa chọn có căn cứ chứ không phải
 * gu cá nhân.
 *
 * JetBrains Mono cho MỌI THỨ LÀ SỐ: điểm 0-100, bonus confluence, giá, spec.
 * Lý do không phải thẩm mỹ — sản phẩm này là một cái HUD đọc số, và chữ mono
 * căn cột đều nên hàng số không nhảy khi giá trị đổi. Trang bán hàng phải
 * trông giống thứ nó đang bán.
 *
 * Chỉ nạp weight thực sự dùng. Mỗi weight thừa là một file font tải về không
 * ai nhìn thấy.
 */

export const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

export const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-mono',
})

export const fontClassNames = [sans.variable, mono.variable].join(' ')
