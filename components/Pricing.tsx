import { cta, faq, links, priceBlockers, pricing } from '@/lib/site'
import { PromoPrice } from './PromoBar'
import { Media } from './Media'
import { SectionHead } from './SectionHead'
import { Check, Dash } from './Icon'

/**
 * Giá — một tầng, hai cột.
 *
 * Trái: cái nhận được và cái KHÔNG nhận được. Phải: con số, nút, bảo đảm —
 * và cột phải dính (`position: sticky`) nên khi khách đọc hết danh sách bên
 * trái, nút mua vẫn nằm trong tầm mắt. Bản trước dồn tất cả vào một cột
 * 560px căn giữa cao ~900px: phải cuộn hết hai màn mới thấy nút.
 *
 * Bốn thứ cố ý KHÔNG có ở đây:
 *
 * 1. Giá neo gạch ngang. Energizer chưa bán ngày nào ở mức nào khác, nên mọi
 *    con số gạch ngang đều là bịa. `pricing.anchor` đang null; nếu sau này
 *    tăng giá thật thì bật lên, lúc đó nó là sự thật.
 * 2. Value stack "$1,480 giá trị". Cộng giá tưởng tượng của từng phần rồi
 *    khoe tổng là cùng một trò với giá neo, chỉ dài dòng hơn.
 * 3. Đếm ngược. Không có.
 * 4. Nhiều tier. Một sản phẩm, một giá, không phải chọn.
 *
 * Và một thứ cố ý CÓ: danh sách "không bao gồm". Nói trước cái mình không
 * làm được thì khách không mua nhầm kỳ vọng, và refund giảm.
 *
 * Hai câu FAQ nặng nhất được LẶP LẠI ngay dưới thẻ giá. Chúng vẫn nằm
 * nguyên ở khối 09 phía dưới, nhưng bắt người đang cầm sẵn quyết định phải
 * cuộn thêm một khối nữa mới biết "có phải trả hằng tháng không" là chỗ rơi
 * không cần thiết. Chữ lấy thẳng từ mảng `faq` nên không bao giờ lệch nhau —
 * sửa một chỗ, hai chỗ cùng đổi.
 */

export function Pricing() {
  const blockers = priceBlockers.map((q) => faq.find((f) => f.q === q)).filter(
    (f): f is (typeof faq)[number] => Boolean(f),
  )

  return (
    <section id="pricing">
      <div className="wrap">
        <SectionHead
          no="08"
          tag="Pricing"
          meta="one price · one payment"
          title={
            <>
              {pricing.symbol}
              {pricing.amount} once. That is the whole offer.
            </>
          }
        />

        <div className="price-grid">
          <div className="price-card">
            <ul className="price-list" style={{ marginTop: 0 }}>
              {pricing.includes.map((t) => (
                <li className="price-li" key={t}>
                  <span style={{ flex: 'none', marginTop: 2, color: 'var(--bull)' }}>
                    <Check size={17} title="Included" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="price-div" />

            <p
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
                marginBottom: 'var(--s4)',
              }}
            >
              Not included — saying so up front
            </p>
            <ul className="price-list" style={{ marginTop: 0 }}>
              {pricing.excludes.map((t) => (
                <li className="price-li is-off" key={t}>
                  <span style={{ flex: 'none', marginTop: 2 }}>
                    <Dash size={17} title="Not included" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="price-div" />

            <dl className="price-obj">
              {blockers.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="price-buy">
            <div className="price-amt">
              <span className="cur">{pricing.symbol}</span>
              <span className="num">{pricing.amount}</span>
              <span className="per">
                once · {pricing.currency}
              </span>
            </div>
            <PromoPrice />

            <p className="price-sub">
              {pricing.planName} &mdash; no renewal, no upgrade tier, no order bump at
              checkout.
            </p>

            <a
              className="btn btn-primary btn-lg btn-block"
              href={cta(links.checkout, 'pricing')}
              style={{ marginTop: 'var(--s5)' }}
            >
              Get the licence &mdash; {pricing.symbol}
              {pricing.amount}
            </a>
            {/* Checkout KHÔNG hỏi số điện thoại. Cả hai funnel cũ bắt nhập phone
                cho một sản phẩm digital $37 — mỗi ô thừa là một lần rơi. */}
            <span className="btn-note">Email only. We do not ask for a phone number.</span>

            <div className="price-div" />

            <p className="price-guarantee">
              <b>{pricing.guarantee.days}-day refund.</b> {pricing.guarantee.text}
            </p>

            <p style={{ marginTop: 'var(--s4)', fontSize: 13.5, color: 'var(--ink-2)' }}>
              Not ready? The{' '}
              <a
                href={cta(links.telegramFree, 'pricing')}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--chg)',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                free channel
              </a>{' '}
              costs nothing and does not ask for an email.
            </p>
          </div>
        </div>

        {/* Câu chưa ai trả lời trên trang: trả tiền xong thì CÁI GÌ đến. Ô
            này chặn ở Gate 1 — chưa publish script thì chưa có ảnh thật, và
            dựng ảnh cho đúng mục này thì đúng nghĩa quảng cáo sai. */}
        <Media slot="pricing-delivery" gap="var(--s6)" className="shot is-narrow" />
      </div>
    </section>
  )
}
