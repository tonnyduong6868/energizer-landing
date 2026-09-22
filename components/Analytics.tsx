import { analytics, analyticsReady } from '@/lib/site'

/**
 * Đo lường — tự tắt hoàn toàn khi chưa cấu hình.
 *
 * Trả về `null` khi `analyticsReady` sai, nghĩa là HTML xuất ra không có
 * một byte nào của phần này. Trang giữ nguyên trạng thái zero-JS cho tới
 * đúng lúc anh điền domain vào `lib/site.ts`.
 *
 * Không dùng `next/script`: ở `output: 'export'` nó vẫn kéo runtime của
 * Next vào để quản vòng đời, đổi 1KB lấy vài chục KB. Thẻ <script defer>
 * thuần làm đúng việc cần làm — tải sau khi parse xong HTML, chạy trước
 * DOMContentLoaded, không chặn render.
 *
 * ĐO GÌ, VÀ VÌ SAO ĐỦ
 *
 * Trang có hai loại nút, và cả hai đều là bước phễu cần biết:
 *
 * 1. Nút RA NGOÀI — checkout Whop, channel Telegram. Đây là chỗ tiền đi
 *    qua. Plausible bắt tự động qua bản `script.outbound-links.js`, không
 *    cần thêm code. Umami cũng tự bắt outbound. Không phải viết gì.
 *
 * 2. Nút NỘI BỘ trỏ `#pricing` — header, hero, khối 05, sticky đáy, và
 *    banner giảm giá trên cùng. Không có script nào tự bắt được loại này
 *    vì nó không rời trang. Nhưng đây mới đúng là câu hỏi đang treo: bốn
 *    chỗ đặt banner vừa thêm, chỗ nào thật sự đẩy người xuống bảng giá?
 *    Nên có thêm một listener uỷ quyền ~6 dòng ở dưới, đọc `data-cta` trên
 *    thẻ <a> và bắn một sự kiện mang tên chỗ đặt.
 *
 * Listener đó cố ý CHỈ nghe `a[data-cta][href^="#"]`. Nếu nghe cả nút ra
 * ngoài thì mỗi cú bấm đếm hai lần — một lần bởi plugin outbound, một lần
 * bởi listener — và số liệu sai gấp đôi còn tệ hơn không có số liệu.
 *
 * Cloudflare không có API sự kiện tuỳ ý nên chỉ đếm lượt xem; listener bỏ
 * qua, không giả vờ đo được thứ nó không đo được.
 */
export function Analytics() {
  if (!analyticsReady) return null

  return (
    <>
      {analytics.provider === 'plausible' && (
        <script
          defer
          data-domain={analytics.plausibleDomain}
          src={`${analytics.plausibleHost}/js/script.outbound-links.js`}
        />
      )}

      {analytics.provider === 'umami' && (
        <script
          defer
          data-website-id={analytics.umamiWebsiteId}
          src={analytics.umamiSrc}
        />
      )}

      {analytics.provider === 'cloudflare' && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: analytics.cloudflareToken })}
        />
      )}

      {(analytics.provider === 'plausible' || analytics.provider === 'umami') && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('click',function(e){
var a=e.target&&e.target.closest&&e.target.closest('a[data-cta][href^="#"]');
if(!a)return;var p={place:a.getAttribute('data-cta'),to:a.getAttribute('href')};
if(window.plausible)plausible('CTA',{props:p});
else if(window.umami)umami.track('CTA',p);
})`,
          }}
        />
      )}
    </>
  )
}
