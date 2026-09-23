import { proof } from '@/lib/site'

/**
 * Bật video demo ở Hero — đoạn JS thứ hai của cả trang, cùng khuôn với
 * CountdownScript: ES5 viết tay, nhét thẳng vào <body>, không qua
 * `next/script` (ở `output: 'export'` thì `next/script` kéo runtime của Next
 * vào chỉ để quản vòng đời của một thẻ <video> — không đáng).
 *
 * Vì sao `autoPlay` KHÔNG nằm trên thẻ trong JSX:
 *
 * · `prefers-reduced-motion`. Autoplay là thuộc tính HTML, CSS không tắt được
 *   nó. Cách duy nhất để tôn trọng thật sự là đừng gắn, rồi tự gọi play().
 *   Ai bật reduced-motion sẽ thấy đúng khung `poster` — một ảnh tĩnh của
 *   chính video, cùng tỉ lệ, nên không có gì nhảy và không có gì bị ẩn.
 *   Đúng luật 1 của khối reduced-motion trong globals.css.
 *
 * · Tắt JS cũng rơi về đúng khung poster đó. Không có nhánh nào dẫn tới ô trống.
 *
 * Dừng khi cuộn khỏi màn hình: video 20 giây lặp vô hạn mà chạy ngầm suốt
 * phiên thì đốt pin máy khách cho một thứ không ai đang nhìn. Trình duyệt
 * không có IntersectionObserver thì cứ phát — mất pin còn hơn mất nội dung.
 */
export function DemoPlayScript() {
  if (!proof.demo) return null

  const js = `(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var v=document.querySelector('[data-demo]');if(!v||!v.play)return;
v.muted=true;v.loop=true;v.setAttribute('playsinline','');
function go(){var p=v.play();if(p&&p.catch)p.catch(function(){})}
if(!window.IntersectionObserver){go();return}
new IntersectionObserver(function(e){
e[0].isIntersecting?go():v.pause()
},{threshold:0.15}).observe(v);
})()`

  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
