import { promo } from '@/lib/site'

/**
 * Đồng hồ đếm ngược tới mốc tăng giá.
 *
 * Đây là thứ DUY NHẤT trên trang cần JavaScript. Cả site là Server
 * Component xuất tĩnh, nên nó không phải component `'use client'` — làm thế
 * là kéo cả React runtime vào để hiển thị ba con số. Thay vào đó markup do
 * server in ra, còn một đoạn script thuần ~40 dòng trong <body> lo phần
 * đếm. Không hydrate, không bundle, không thay đổi gì với phần còn lại.
 *
 * Ba thứ trong markup này là cố ý:
 *
 * 1. `data-cd` rỗng lúc đầu, script mới đặt thành "live". CSS giấu đồng hồ
 *    cho tới lúc đó. Máy không chạy JS thì không thấy "-- d -- h -- m"
 *    đứng chết — nó chỉ thấy dòng chữ ghi rõ ngày, vẫn đủ nghĩa.
 * 2. `aria-hidden` trên phần số. Một vùng tự cập nhật mỗi giây mà để trình
 *    đọc màn hình đọc thì nó nhai lại con số liên tục, đè lên mọi thứ
 *    khác. Ngày tháng đã nằm trong câu chữ ngay cạnh — đó mới là bản dành
 *    cho trình đọc.
 * 3. Ô placeholder là hai gạch chứ không phải "00". "00" trong nửa giây
 *    trước khi script chạy đọc như "đã hết hạn".
 *
 * `suppressHydrationWarning` KHÔNG phải để bịt cảnh báo cho yên chuyện.
 * Trang không có component `'use client'` nào nhưng Next vẫn hydrate cái
 * vỏ, và script chạy cuối <body> xong trước lúc đó. React thấy chữ trên
 * DOM khác chữ nó in ra từ server, ném lỗi #418 rồi dựng LẠI đúng bản của
 * server — tức là xoá sạch con số vừa đếm, mỗi lần tải một lần. Cờ này nói
 * với React rằng ba ô số là vùng do script làm chủ, đừng đối chiếu. Đây
 * đúng là ca dùng mà React ghi trong tài liệu: dấu thời gian.
 */
export function Countdown({ className = '' }: { className?: string }) {
  if (!promo.enabled || !promo.countdown) return null

  return (
    <span
      className={`cd ${className}`.trim()}
      data-cd=""
      aria-hidden="true"
      suppressHydrationWarning
    >
      {/* Ba ô, KHÔNG gắn nhãn cứng ở đây: script đổi cả số lẫn đơn vị. Còn
          hơn một ngày thì là d/h/m, dưới một ngày tụt xuống h/m/s. Đếm
          từng giây khi còn ba tuần thì chỉ tổ trông như funnel dỏm. */}
      <span className="cd-u">
        <b suppressHydrationWarning>&ndash;&ndash;</b>
        <i suppressHydrationWarning>d</i>
      </span>
      <span className="cd-u">
        <b suppressHydrationWarning>&ndash;&ndash;</b>
        <i suppressHydrationWarning>h</i>
      </span>
      <span className="cd-u">
        <b suppressHydrationWarning>&ndash;&ndash;</b>
        <i suppressHydrationWarning>m</i>
      </span>
    </span>
  )
}
