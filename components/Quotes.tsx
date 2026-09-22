import { proof } from '@/lib/site'
import { SectionHead } from './SectionHead'

/**
 * Testimonial.
 *
 * Khối này TỰ ẨN khi `proof.quotes` rỗng — và nó đang rỗng. Đó là chủ ý:
 * không có review thật thì trang không có khối review, chấm hết. Không ô
 * placeholder "khách hàng nói gì", không avatar stock, không sao vàng.
 *
 * Tối đa 6 và cắt ở đó. Trendline dựng tường 46 ảnh chụp testimonial ở kích
 * thước không đọc nổi chữ — đó là bằng chứng bằng số lượng, mà số lượng thì
 * ai cũng bịa được. Sáu cái đọc được thuyết phục hơn.
 */
const MAX = 6

export function Quotes() {
  if (proof.quotes.length === 0) return null

  return (
    <section className="sec-alt">
      <div className="wrap">
        <SectionHead
          no="07"
          tag="Users"
          meta={`${proof.quotes.length} verified`}
          title="What people who paid for it say."
        />

        <div className="quotes">
          {proof.quotes.slice(0, MAX).map((q) => (
            <figure className="quote" key={q.text}>
              <blockquote>
                <p>&ldquo;{q.text}&rdquo;</p>
              </blockquote>
              <figcaption>
                {q.who}
                {q.context ? ` · ${q.context}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
