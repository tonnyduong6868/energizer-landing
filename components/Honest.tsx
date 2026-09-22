import { transparency } from '@/lib/site'
import { SectionHead } from './SectionHead'

/**
 * Khối tin cậy chính. Đây là thứ THAY CHỖ cho đếm ngược giả và toast
 * "Sofia M. from Madrid vừa mua 4 phút trước".
 *
 * Lý do nó mạnh hơn: không ai bịa được loại bằng chứng này. Một đối thủ có
 * thể chép mọi con số trên trang trong mười phút, nhưng không chép được một
 * lời tự khai rằng thống kê phiên bản trước của chính mình bị thổi phồng —
 * vì để nói được câu đó thì phải thật sự đã tìm ra và đã sửa.
 *
 * Nội dung lấy nguyên văn changelog trong `Smart Money Energizer v1.1.pine`
 * dòng 31-42. Khách mua xong mở source ra đối chiếu được từng chữ.
 */
export function Honest() {
  const { changelog, honest } = transparency

  return (
    <section id="honest">
      <div className="wrap">
        <SectionHead
          no="06"
          tag="Straight answers"
          meta="the part nobody puts on a sales page"
          title="No countdown. No fake buyer popups. Here is why."
          lede={
            <>
              A timer that resets at midnight and a toast announcing a stranger in
              Madrid are not persuasion techniques, they are claims &mdash; and they
              are false ones. You are a trader. You notice. So instead, four things
              that are true and checkable.
            </>
          }
        />

        <article className="changelog">
          <h3>{changelog.title}</h3>
          <p>{changelog.body}</p>
          <p>{changelog.fix}</p>
          <p className="note">{changelog.note}</p>
        </article>

        <div className="honest-grid">
          {honest.map((h) => (
            <article className="honest" key={h.title}>
              <h4>{h.title}</h4>
              <p>{h.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
