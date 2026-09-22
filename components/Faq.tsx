import { faq } from '@/lib/site'
import { SectionHead } from './SectionHead'

/**
 * FAQ bằng <details>/<summary> thuần.
 *
 * Không JS, không state, không aria-expanded phải tự quản. Trình duyệt lo
 * sẵn bàn phím, screen reader và trạng thái đóng/mở — mọi accordion tự viết
 * đều là một cơ hội làm hỏng những thứ đó.
 *
 * Câu đầu tiên trả lời "có phải subscription không" và nó nói KHÔNG. Trang
 * này được phép nói câu đó vì phía sau thật sự không có OTO $79/mo nào. Đây
 * chính là chỗ Trendline và Scalper tự mâu thuẫn: cả hai đều hứa "no
 * recurring fees, ever" rồi đẩy VIP $79/tháng ngay sau thanh toán.
 */
export function Faq() {
  return (
    <section className="sec-alt" id="faq">
      <div className="wrap">
        <SectionHead
          no="09"
          tag="FAQ"
          meta={`${faq.length} questions`}
          title="Questions worth asking before you pay."
        />

        <div className="faq">
          {faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
