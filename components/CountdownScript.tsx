import { promo, promoDeadlineMs } from '@/lib/site'

/**
 * Bộ đếm — đoạn JS duy nhất của cả trang.
 *
 * Viết tay bằng ES5 và nhét thẳng vào <body> chứ không qua `next/script`:
 * ở chế độ `output: 'export'` thì `next/script` vẫn kéo runtime của Next
 * vào để quản lý vòng đời, tức là đánh đổi 40 dòng lấy vài chục KB. Đây là
 * một cái đồng hồ, nó không cần vòng đời.
 *
 * `promoDeadlineMs` được nội suy lúc build nên client không phải parse
 * chuỗi ngày — và quan trọng hơn, mốc là một CON SỐ nén sẵn, không thể
 * tính lệch theo máy khách.
 *
 * Hai nhánh thoát, cả hai đều gỡ khuyến mãi xuống chứ không để nó đứng:
 *
 * · Hết hạn → đặt `data-promo="ended"` lên <html>, CSS ẩn toàn bộ phần
 *   giảm giá. Trang trở lại đúng trang $97 bình thường. Đây là điều khiến
 *   cái đồng hồ này hợp pháp: lời hứa "sau ngày X giá lên" không bao giờ
 *   còn hiển thị sau ngày X, kể cả khi không ai kịp build lại trang.
 *
 * · `prefers-reduced-motion` → không đếm, không hiện đồng hồ, giữ nguyên
 *   dòng chữ ghi ngày. WCAG 2.2.2 nói về nội dung tự cập nhật; đồng hồ có
 *   thể viện ngoại lệ "thời gian thực", nhưng đi vay ngoại lệ cho thứ mà
 *   bản chữ đã nói đủ thì không đáng.
 */
export function CountdownScript() {
  if (!promo.enabled || !promo.countdown) return null

  const js = `(function(){
var END=${promoDeadlineMs},root=document.documentElement;
function done(){root.setAttribute('data-promo','ended')}
if(END-Date.now()<=0){done();return}
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var n=document.querySelectorAll('[data-cd]');if(!n.length)return;
function p(v){return v<10?'0'+v:''+v}
var id=setInterval(tick,1000);tick();
function tick(){
var ms=END-Date.now();
if(ms<=0){clearInterval(id);done();return}
var s=Math.floor(ms/1000),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),
m=Math.floor(s%3600/60),x=s%60;
var a=d>0?[d,'d',h,'h',m,'m']:[h,'h',m,'m',x,'s'];
for(var i=0;i<n.length;i++){var u=n[i].children;
for(var j=0;j<3;j++){u[j].firstChild.textContent=p(a[j*2]);u[j].lastChild.textContent=a[j*2+1]}
n[i].setAttribute('data-cd','live')}
}
})()`

  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
