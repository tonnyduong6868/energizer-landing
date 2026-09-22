'use client'

import { useEffect, useState } from 'react'
// Alias trỏ thẳng một file trong node_modules — xem ghi chú ở next.config.ts.
import { StreamConvergenceBackground } from '@threeui/stream-convergence'

/**
 * Nền động của trang — biến thể `stream-convergence` của Portal Field.
 *
 * Renderer là của tác giả, không viết lại một dòng: WebGL1 thô, vertex +
 * fragment shader viết tay, một quad 6 đỉnh, `u_time` chạy theo
 * `requestAnimationFrame`. Component gốc tự lo resize (ResizeObserver),
 * tự dừng rAF khi cuộn khỏi khung nhìn (IntersectionObserver) và khi
 * `document.hidden`, tự `deleteBuffer/deleteShader/deleteProgram` lúc
 * unmount. Không có gì để mình làm tốt hơn ở đó nên mình không đụng vào.
 *
 * Vì sao là biến thể này chứ không phải portal-field / flow-field /
 * cloud-field: ba cái kia không phải component, chúng là `<iframe sandbox>`
 * nhúng nguyên một trang HTML kéo three.js r134 + GSAP + Tailwind CDN +
 * Iconify + Google Fonts từ CDN bên thứ ba mỗi lượt khách; flow-field còn
 * nhả beacon Cloudflare Insights, cloud-field còn hotlink hai ảnh JPEG từ
 * bucket Supabase của ThreeUI. Trang này cố ý để `analytics.provider:
 * 'none'` và bán cho khách EU — nhét tracker bên thứ ba vào là tự phá cái
 * quyết định đó. `stream-convergence` tự chứa, không gọi ra ngoài byte nào.
 *
 * ── HAI PHẠM VI, HAI BỀ RỘNG CỘT ──
 *
 * Nền này sống ở lề, không sống sau chữ. Cột chữ ở Hero và cột nội dung ở
 * phần còn lại rộng khác nhau, nên mỗi chỗ một mask (số đo ở globals.css):
 *
 *   <HeroField/>  — absolute trong `.hero`, chừa ±340px, bật từ 900px.
 *   <PageField/>  — fixed sau cả trang, chừa ±590px, bật từ 1440px.
 *
 * Hai canvas chứ không phải một, vì một mask `linear-gradient` không thể
 * vừa hẹp ở khúc Hero vừa rộng ở khúc dưới. Cái giá là hai WebGL context —
 * chấp nhận được (trần trình duyệt ~16) và hầu như chỉ một cái chạy tại
 * một thời điểm: IntersectionObserver của thư viện tự dừng rAF của
 * HeroField ngay khi cuộn qua khỏi hero.
 *
 * Hai lớp không cộng chồng lên nhau: `.hero` có nền đục nên nó che
 * PageField ở khúc trên, rồi nhạt dần ở đáy để không để lại đường cắt
 * ngang khi cuộn (xem `.hero` trong globals.css).
 *
 * ── Hai thứ phải vá ở ranh giới host, không phải trong renderer ──
 *
 * 1. `prefers-reduced-motion`. Component gốc KHÔNG kiểm. Nó vốn là nền cho
 *    trang demo hiệu ứng, ở đó chuyển động chính là nội dung. Ở đây nó là
 *    trang trí sau chữ bán hàng, nên phải tôn trọng thiết lập của người
 *    dùng — và tôn trọng bằng cách KHÔNG MOUNT, chứ không phải `display:
 *    none`: ẩn đi thì rAF vẫn quay và pin vẫn hết.
 *
 *    Cùng lý do đó, khung hẹp cũng không mount. Dưới ngưỡng thì không còn
 *    lề nào để chiếm — đo ở 390px: chữ hero chạy 23..367 trên khung 390,
 *    tức sát mép. Để mask nuốt nó đi thì trông vẫn đúng nhưng canvas vẫn
 *    vẽ và rAF vẫn quay trên đúng loại máy chạy bằng pin.
 *
 * 2. Render phía server. Đây là `output: 'export'`, HTML sinh sẵn lúc build.
 *    Nếu render thẳng thì thẻ <canvas> rỗng nằm trong HTML tĩnh rồi mới
 *    hydrate — và `matchMedia` không tồn tại lúc build nên bản tĩnh không
 *    thể biết người dùng có tắt chuyển động hay không. Mount sau
 *    `useEffect` giải quyết cả hai: HTML tĩnh không có canvas nào, trang
 *    vẫn đọc được khi JS hỏng hoặc chưa tải, và quyết định bật/tắt xảy ra
 *    trên máy khách nơi có đủ thông tin.
 *
 * Bảng màu gốc của shader là violet-indigo (`color.r += wave*1.2`,
 * `g*0.5`, `b*1.8`) — chọi thẳng với tông hổ phách #ffb020 của trang. Không
 * sửa GLSL để đổi màu; `hue`/`saturation`/`brightness`/`opacity` là prop
 * công khai, tác giả cài sẵn thành filter CSS trên chính thẻ canvas. Giá
 * trị dưới đây đo từ pixel thật, không ước lượng — xem ghi chú từng dòng.
 */

/**
 * Đúng `STREAM_CONVERGENCE_DEFAULTS`, trừ `saturation`. `opacity` không nằm ở
 * đây vì hai lớp cần hai giá trị khác nhau — xem từng export.
 *
 * `scale` giữ nguyên 1. Đã thử nâng lên 1.8–2.4 để kéo phần sáng giữa canvas
 * ra tới mép: có sáng thật, nhưng prop này là `transform: scale()` trên thẻ
 * canvas nên nó phóng to luôn khoảng cách giữa các vân. Đếm theo shader
 * (`sin(y*6 + …)`, chu kỳ 2π/6 trong toạ độ p): dải trái ở 1512px cắt qua
 * 1,6 chu kỳ khi scale = 1, còn 0,68 chu kỳ khi scale = 2,4 — tức có lúc
 * trong dải không còn vân nào, nền nhấp nháy tắt/bật theo thời gian.
 */
const FIELD = {
  speed: 1,
  fidelity: 0.5,
  scale: 1,

  // Bẹp bảng màu violet-indigo về độ sáng thuần. Nhuộm lại sang hổ phách ở
  // wrapper trong globals.css — ở đó filter ăn vào KẾT QUẢ đã hợp nhất, nên
  // ba dải đỏ/lục/lam ra cùng một sắc; nhuộm trên canvas thì mỗi dải lệch
  // một kiểu vì chúng nằm ở ba vị trí khác nhau.
  saturation: 0,
}

/**
 * Gác chung cho cả hai lớp. Trả về false ở lần render đầu của CẢ server lẫn
 * client nên markup hai bên khớp nhau — không có hydration mismatch.
 */
function useFieldGate(minWidth: number) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(
      `(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`,
    )
    const sync = () => setOn(mq.matches)
    sync()
    // Đổi thiết lập hoặc kéo nhỏ cửa sổ giữa chừng thì gỡ canvas ra ngay —
    // component gốc tự deleteBuffer/deleteProgram lúc unmount, rAF dừng hẳn.
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [minWidth])

  return on
}

/** Lớp trong `.hero`. 900px: ở đó mask còn chừa 30px dải sáng mỗi bên. */
export function HeroField() {
  const on = useFieldGate(900)
  if (!on) return null
  return (
    <div className="hero-field" aria-hidden="true">
      {/* 0.42 là trần đo được, không phải con số cho đẹp mắt. */}
      <StreamConvergenceBackground {...FIELD} opacity={0.42} />
    </div>
  )
}

/**
 * Lớp sau cả trang.
 *
 * 1440px là chỗ dải sáng bắt đầu đủ chỗ để thành hình. Lề mỗi bên bằng
 * (khung nhìn − 1180)/2, mà 1180 là `max-width` của `.wrap` nên nó không co
 * theo khung — đây vốn là hiệu ứng của màn rộng, không có cách nào làm nó
 * hợp với màn hẹp. Đã thử 1280: lề còn 43px và nằm trọn trong khúc chuyển
 * của mask, nên thay vì ba dải sáng thì chỉ thấy mẩu vụn của một dải — đọc
 * ra như vệt bẩn ở mép màn chứ không ra chủ ý. Ở 1440 thì có ~42px đậm
 * cộng 80px chuyển, đủ để nhận ra là dải sáng.
 *
 * Dưới ngưỡng này trang vẫn có nền động ở Hero (từ 900px) — cột chữ hero
 * hẹp hơn nhiều nên ở đó còn lề.
 */
export function PageField() {
  const on = useFieldGate(1440)
  if (!on) return null
  return (
    <div className="page-field" aria-hidden="true">
      {/* Sáng hơn Hero, và đây là lý do đo được chứ không phải gu.
          Ban đầu để chung 0.42 với Hero thì ở 1440–1600 nhìn như không có gì.
          Không phải do vignette: shader tối dần theo `exp(-0.8·|uv·2−1|)`, tính
          ra dải Hero trung bình 0,46 còn dải trang 0,41 — lệch 12%, không đáng
          kể. Khác nhau ở BỀ RỘNG: 1512px cho dải trang 86px đậm, trong khi dải
          Hero rộng 328px. Cùng độ sáng mỗi điểm nhưng ít hơn bốn lần diện tích
          thì mắt không bắt được, nên phải bù bằng opacity.

          Bù được vì mask đã chặn hẳn: nó giữ alpha = 0 suốt ±590px mà đoạn chữ
          lộ ra rộng nhất chỉ tới ±558px, dư 32px. Alpha nhân với 0 vẫn là 0 —
          nâng opacity không đụng được tới độ tương phản của bất kỳ chữ nào.
          Đã chạy lại phép quét toàn trang ở 1512 và 1920 để xác nhận. */}
      <StreamConvergenceBackground {...FIELD} opacity={0.78} />
    </div>
  )
}
