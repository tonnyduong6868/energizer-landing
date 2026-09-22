import type { Metadata } from 'next'
import { AnimatedTopDock } from '@/components/TopDock'

/**
 * Trang xem thử Animated Top Dock — KHÔNG phải trang bán hàng.
 *
 * Vì sao để riêng một route thay vì thay `SiteHeader`: nhãn các mục khoá
 * cứng trong `AnimatedTopDock.js`, không có prop `items`. Mỗi biến thể một
 * bộ nhãn riêng — sable là SYSTEM/METHOD/WORK/ACCESS/NOTES, modern là
 * Lumina/Product/Solutions/Docs/Pricing/Changelog, retro là
 * SYSTEM/FILES/NET/DISK/HELP/RUN, glass là Aperture/Overview/Studio/Library/
 * Motion/Labs. Toàn bộ là `<button>` đổi state nội bộ (chỉ logo của modern
 * và glass là `<a>`), không có cái nào là link neo. Nav thật của trang có
 * 7 mục và phải nhảy tới từng section. Muốn dùng làm nav thật thì phải fork
 * component — mà fork đúng là thứ skill cấm: không được sửa/rút gọn GLSL,
 * render pass, geometry hay interaction state của bản gốc.
 *
 * Thêm một lý do nữa: dock kéo theo Three.js r128. Tài sản của trang bán là
 * "mọi chữ khách đọc đều nằm sẵn trong HTML gốc" — không đổi nó lấy một
 * thanh nav đẹp.
 *
 * CSS import ngay trong route này chứ không phải `app/layout.tsx`, nên
 * 72 KB style của thư viện chỉ nằm trong chunk của `/dock`, trang chủ không
 * gánh. Đã kiểm `style.css`: 479 selector, 0 selector toàn cục (không có
 * `html`, `body`, `*`, `:root` hay selector thẻ trần) — nhập vào không đụng
 * tới `globals.css`.
 */
import '@designcodeio/threeui/style.css'

export const metadata: Metadata = {
  title: 'Animated Top Dock — preview',
  // Trang nội bộ. Đừng để nó lọt vào kết quả tìm kiếm cạnh trang bán.
  robots: { index: false, follow: false },
}

/**
 * `ANIMATED_TOP_DOCK_VARIANTS` chỉ có trong
 * `lib-dist/shaders/animated-top-dock/AnimatedTopDock.d.ts`, mà export map
 * của package không mở đường tới `./shaders/*` (chỉ có `.`, `./style.css`,
 * `./components/*`, `./assets/*`). Nên liệt kê lại ở đây, đúng y bản gốc.
 */
const VARIANTS = [
  {
    id: 'sable' as const,
    note: 'Thanh nav nhỏ giữa trên. Không có canvas — tất cả là DOM + CSS, proximity chạy bằng JS.',
  },
  {
    id: 'modern' as const,
    note: 'Thanh rộng full-width kèm hero. Cũng không có canvas, nền aurora là CSS gradient.',
  },
  {
    id: 'retro' as const,
    note: 'Canvas WebGL1, GLSL viết tay, ordered dither 8×8. Không qua Three.js.',
  },
  {
    id: 'glass' as const,
    note: 'Canvas WebGL2 qua Three.js r128 (alias three128). Rail dọc bên trái, không phải thanh trên.',
  },
]

export default function DockPreviewPage() {
  return (
    <main id="main" style={{ padding: '48px 24px 96px', maxWidth: 1180, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, margin: '0 0 8px' }}>Animated Top Dock — preview</h1>
      <p style={{ margin: '0 0 40px', maxWidth: 640, opacity: 0.7, lineHeight: 1.6 }}>
        Bản gốc từ <code>@designcodeio/threeui</code>, không sửa renderer. Rê chuột ngang
        thanh nav để thấy hiệu ứng proximity, hoặc bấm Tab để duyệt bằng bàn phím. Bốn
        biến thể dưới đây chạy bốn đường vẽ khác nhau.
      </p>

      {VARIANTS.map((v) => (
        <section key={v.id} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            {v.id}
          </h2>
          <p style={{ margin: '0 0 12px', fontSize: 13, opacity: 0.6 }}>{v.note}</p>
          {/*
            Component là `width:100%; height:100%` nên bắt buộc phải có cha
            có kích thước thật, nếu không nó cao 0px và canvas không vẽ gì.
            `overflow:hidden` đã nằm sẵn trong CSS của thư viện.
          */}
          <div style={{ height: 420, borderRadius: 14, overflow: 'hidden' }}>
            <AnimatedTopDock variant={v.id} />
          </div>
        </section>
      ))}
    </main>
  )
}
