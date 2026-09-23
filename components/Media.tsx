import type { CSSProperties } from 'react'

import {
  hasMedia,
  media,
  type MediaImage,
  type MediaSlotName,
  type MediaVideo,
} from '@/lib/site'

/**
 * Một ô ảnh/video trên trang. Xem `media` trong lib/site.ts để biết có
 * những ô nào và mỗi ô cần chụp gì.
 *
 * Trước đây Hero, Pillars và Density mỗi chỗ tự dựng lấy <figure> + nhánh
 * dự phòng của riêng nó. Ba bản sao đã kịp lệch nhau — Hero có ba tầng rơi,
 * hai chỗ kia có hai, và chỉ Hero mới tắt được ô nhắc việc đúng cách. Gom về
 * một chỗ thì thêm ô mới là một dòng, và không chỗ nào lệch được nữa.
 *
 * Ô rỗng ở bản production render ra ĐÚNG KHÔNG GÌ CẢ — kể cả thẻ bọc, kể cả
 * khoảng cách. Thẻ bọc `marginTop` nằm bên trong component chính là vì thế:
 * để ngoài thì mỗi khối gọi lại phải tự nhớ tắt nó, và đó là cách bản trước
 * để lọt mấy cái div rỗng đội khoảng trắng.
 */
export function Media({
  slot,
  gap,
  className = 'shot',
  priority = false,
}: {
  slot: MediaSlotName
  /** Khoảng cách với khối ở trên. Bỏ trống thì không sinh thẻ bọc. */
  gap?: string
  /** Đè class của <figure>. Hero cần `tile bento-wide shot`. */
  className?: string
  /** Ảnh nằm trên màn hình đầu — tắt lazy-load. Chỉ Hero dùng. */
  priority?: boolean
}) {
  if (!hasMedia(slot)) return null

  const { title, brief, fill } = media[slot]

  const body = fill ? (
    <figure className={className}>
      {fill.kind === 'image' ? (
        <Img fill={fill} priority={priority} />
      ) : (
        <Vid fill={fill} />
      )}
      <figcaption className="shot-cap">{fill.caption}</figcaption>
    </figure>
  ) : (
    /* Phiếu nhắc việc — tiếng Việt, chỉ sống ở dev. `data-devwarn` là dấu
       để scripts/deploy.mjs từ chối bản build nào còn sót nó. */
    <div className="shot-empty" data-devwarn>
      <b>{title}</b>
      {brief}
    </div>
  )

  return gap ? <div style={{ marginTop: gap } as CSSProperties}>{body}</div> : body
}

function Img({ fill, priority }: { fill: MediaImage; priority: boolean }) {
  return (
    <img
      src={fill.src}
      alt={fill.alt}
      width={fill.w}
      height={fill.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

/**
 * `autoPlay` CỐ Ý VẮNG MẶT khỏi thẻ — <MediaPlayScript/> mới là thứ gọi
 * play(), và nó chỉ gọi khi `prefers-reduced-motion` tắt. Autoplay là thuộc
 * tính HTML, CSS không tắt được nó, nên cách duy nhất để tôn trọng thật sự
 * là đừng gắn. Ai bật reduced-motion, hoặc tắt JS, dừng lại ở khung `poster`
 * — cùng tỉ lệ nên không có gì nhảy, và không có gì bị giấu đi.
 */
function Vid({ fill }: { fill: MediaVideo }) {
  return (
    <video
      data-autoplay=""
      poster={fill.poster}
      width={fill.w}
      height={fill.h}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={fill.alt}
    >
      <source src={fill.webm} type="video/webm" />
      <source src={fill.mp4} type="video/mp4" />
    </video>
  )
}

/**
 * Bật mọi video trên trang. Đoạn JS thứ hai của cả trang, cùng khuôn với
 * CountdownScript: ES5 viết tay, nhét thẳng vào <body>, không qua
 * `next/script` (ở `output: 'export'` thì `next/script` kéo cả runtime của
 * Next vào chỉ để quản vòng đời vài thẻ <video> — không đáng).
 *
 * `querySelectorAll`, KHÔNG phải `querySelector`. Bản đầu chỉ lấy một thẻ vì
 * lúc đó trang chỉ có một video; thêm cái thứ hai là nó nằm im mãi mãi mà
 * không báo lỗi gì. Đây đúng là loại hỏng mà `media` ở trên sinh ra để tránh.
 *
 * Dừng khi cuộn khỏi màn hình: video lặp vô hạn chạy ngầm suốt phiên thì đốt
 * pin máy khách cho thứ không ai đang nhìn. `rootMargin` thay cho `threshold`
 * vì ngưỡng theo tỉ lệ phụ thuộc chiều cao phần tử — video cao hơn màn hình
 * thì không bao giờ đạt nổi 15%. Lề theo % chiều cao viewport thì không.
 *
 * Trình duyệt không có IntersectionObserver thì cứ phát hết — tốn pin còn
 * hơn mất nội dung.
 */
export function MediaPlayScript() {
  const hasVideo = Object.values(media).some((m) => m.fill?.kind === 'video')
  if (!hasVideo) return null

  const js = `(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var vs=document.querySelectorAll('video[data-autoplay]');if(!vs.length)return;
function go(v){v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){})}
var i;
if(!window.IntersectionObserver){for(i=0;i<vs.length;i++)go(vs[i]);return}
var io=new IntersectionObserver(function(es){
for(var k=0;k<es.length;k++){es[k].isIntersecting?go(es[k].target):es[k].target.pause()}
},{rootMargin:'-15% 0px'});
for(i=0;i<vs.length;i++)io.observe(vs[i]);
})()`

  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
