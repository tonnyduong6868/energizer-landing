'use client'

import { useEffect, useRef } from 'react'
// Alias, không phải package ảo — trỏ thẳng vào file controller trong
// node_modules. Khai báo ở next.config.ts (turbopack.resolveAlias) và
// tsconfig.json (paths); export map của package không mở `./shaders/*`.
import { createTopDockController } from '@threeui/top-dock-controller'

/**
 * Nhóm link chạy hiệu ứng proximity của Animated Top Dock.
 *
 * KHÔNG fork component. `AnimatedTopDock` không có prop `items` — nhãn
 * SYSTEM/METHOD/WORK/ACCESS/NOTES nằm cứng trong bundle và các mục là
 * `<button>` đổi state nội bộ, nên bê nguyên nó lên trang bán là gắn một
 * thanh nav bấm không đi đâu.
 *
 * Nhưng `createTopDockController` hoàn toàn generic: nó nhận một phần tử
 * root, tự tìm mọi `[data-dock-item]` bên trong, đo kích thước gốc rồi chạy
 * spring. Nó không biết và không cần biết các mục đó là thẻ gì. Nên ở đây
 * mình dựng markup của riêng mình bằng đúng class của thư viện, đặt
 * `data-dock-item` lên từng `<a href>` thật, rồi gọi thẳng controller gốc.
 * Toàn bộ vật lý — proximity 122, spring 0.19, damping 0.70, đo lại khi font
 * load xong, ngắt khi `prefers-reduced-motion` hoặc con trỏ không mịn — là
 * code tác giả viết, không sửa một dòng.
 *
 * Biến thể tương đương ở đây là `sable`: không canvas, không WebGL. Hai
 * module vẽ (`glassParticleField` dùng Three.js r128, `retroPixelField` dùng
 * WebGL1) được `AnimatedTopDock.js` import ĐỘNG và chỉ khi variant là
 * glass/retro, nên đường này không kéo theo gì cả.
 *
 * Progressive enhancement: mọi thẻ `<a>` đã nằm sẵn trong HTML tĩnh. Tắt JS
 * thì mất hiệu ứng phình, link vẫn nhảy đúng chỗ.
 */

/** Đúng `ANIMATED_TOP_DOCK_DEFAULTS` — phần mà biến thể sable dùng tới. */
const BASE = {
  proximity: 122,
  spring: 0.19,
  damping: 0.7,
  widthGrowth: 17,
  heightGrowth: 16,
  drop: 3.5,
}

const OPTIONS = {
  /**
   * Hàng ngang (nav header). Nguyên si giá trị tác giả.
   * `AnimatedTopDock.js`: distribute chỉ bật cho retro, lockTrack chỉ cho
   * modern — sable là false cả hai.
   */
  x: { ...BASE, axis: 'x' as const, distribute: false, lockTrack: false },

  /**
   * Cột dọc (hai danh sách footer). Trục 'y' của controller nở CHIỀU CAO
   * item và dịch translateX:
   *
   *   style.height = baseHeight + heightGrowth * a
   *   style.transform = translateX(a * drop)
   *
   * Ở bản gốc trục 'y' chỉ dùng cho rail của biến thể glass, và rail đó nằm
   * trong khung cao cố định nên nở bao nhiêu cũng không ảnh hưởng ai. Footer
   * thì là flow layout: 7 link cùng nở 16px là cả khối disclaimer bên dưới
   * nhảy lên nhảy xuống theo con trỏ. Nên `heightGrowth: 0` — bỏ đúng cái
   * trục gây reflow, giữ lại trục không gây reflow (transform không reflow),
   * và bù bằng `drop` lớn hơn để cú trượt còn nhìn thấy được.
   *
   * `proximity` phải co theo. 122px là bán kính tác giả chọn cho một hàng
   * ngang item rộng 94px — mỗi bên chỉ với tới khoảng một mục. Dựng đứng
   * thì bước nhảy còn 34px (cao 32 + gap 2), cùng bán kính đó phủ 5 mục một
   * lúc: rê chuột vào là cả cột sáng lên, không còn là con trỏ chỉ vào đâu.
   * 42 ≈ 122 × 34/97 — giữ đúng tỉ lệ "bao nhiêu hàng xóm nằm trong vùng
   * ảnh hưởng" của bản gốc, chỉ đổi đơn vị đo.
   *
   * Cả ba đều là prop công khai có trong `ANIMATED_TOP_DOCK_DEFAULTS`, đổi
   * giá trị là dùng API chứ không phải sửa thư viện. Spring 0.19 và
   * damping 0.70 — tức là cảm giác của cú nảy — giữ nguyên.
   */
  y: {
    ...BASE,
    proximity: 42,
    heightGrowth: 0,
    drop: 10,
    axis: 'y' as const,
    distribute: false,
    lockTrack: false,
  },
}

export type DockItem = {
  readonly href: string
  readonly label: string
  /** Mở tab mới + rel an toàn. Dùng cho link rời khỏi trang. */
  readonly external?: boolean
}

type DockNavProps = {
  items: ReadonlyArray<DockItem>
  /** Tên vùng cho trình đọc màn hình. Bắt buộc — trang có nhiều nav. */
  label: string
  axis?: 'x' | 'y'
  /** Class của vỏ host, để CSS gỡ phần định vị demo của thư viện. */
  className?: string
}

export function DockNav({ items, label, axis = 'x', className }: DockNavProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Controller trả về hàm huỷ: gỡ listener, dừng rAF, ngắt ResizeObserver.
    return createTopDockController(ref.current, () => OPTIONS[axis])
  }, [axis])

  return (
    <nav
      ref={ref}
      className={`animated-top-dock__nav${className ? ` ${className}` : ''}`}
      aria-label={label}
      // Controller ghi đè hai thuộc tính này ngay khi khởi tạo. Đặt sẵn giá
      // trị tĩnh để HTML lúc chưa hydrate không lệch với lúc đã hydrate.
      data-dock-state="static"
      data-dock-max="0.00"
    >
      {items.map((n) => (
        <a
          key={n.href}
          className="animated-top-dock__item animated-top-dock__link"
          data-dock-item
          href={n.href}
          {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
        >
          {n.label}
        </a>
      ))}
    </nav>
  )
}
