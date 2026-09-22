'use client'

/**
 * Ranh giới client cho `AnimatedTopDock` của `@designcodeio/threeui`.
 *
 * Cả repo này không có file nào gắn `'use client'` — mọi component đều là
 * Server Component, chữ khách đọc nằm sẵn trong HTML gốc. Đây là ngoại lệ
 * duy nhất, và là ngoại lệ bắt buộc: package build ra không kèm directive
 * `'use client'`, trong khi `AnimatedTopDock.js` import `useRef`/`useState`/
 * `useEffect` ngay dòng 2. Import thẳng từ Server Component là hỏng lúc build.
 *
 * File này chỉ re-export, KHÔNG bọc thêm logic, không đặt lại giá trị mặc
 * định, không sửa prop. Renderer giữ nguyên hành vi tác giả viết; phần mình
 * chạm vào chỉ là cái vỏ host bên ngoài.
 */

export { AnimatedTopDock } from '@designcodeio/threeui'
