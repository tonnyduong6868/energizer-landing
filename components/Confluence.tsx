import type { CSSProperties } from 'react'

import { confluences } from '@/lib/site'
import { SectionHead } from './SectionHead'

/**
 * Bảy confluence factor, hiện đúng trọng số thật.
 *
 * Bố cục: một vòng tròn bên trái, danh sách bên phải, gói trong MỘT ô.
 * Bản trước là bảy card xếp dọc cao gần 1.400px — bảy lần lặp đúng một hình
 * dạng, mà nội dung thì chỉ khác nhau ở con số đầu dòng.
 *
 * Vòng và danh sách nói hai chuyện khác nhau nên phải có hai hình thức:
 *  · vòng nói CÁI TRẦN — hai factor nặng nhất đã chiếm phần lớn +30, phần
 *    xám còn lại là tất cả những gì năm cái kia cộng thêm được.
 *  · danh sách nói TRỌNG SỐ — Liquidity Sweep (+12) nặng gấp đôi Open-Price
 *    Sweep (+6), tức engine có quan điểm về việc bằng chứng nào đáng tin hơn
 *    chứ không cộng đều cho đủ bảy cái.
 *
 * Bar dài theo tỉ lệ với factor cao nhất, không theo cap. Lấy cap làm mẫu số
 * thì cái +12 chỉ chiếm 40% chiều rộng và cả bảy thanh trông đều lè tè như
 * nhau — đúng cái ấn tượng ngược lại với điều cần nói.
 */
export function Confluence() {
  const { factors, cap } = confluences
  const max = Math.max(...factors.map((f) => f.bonus))

  /* Hai cung của vòng, tính từ dữ liệu thật. Gõ cứng 40%/73% vào CSS thì đến
     lúc chỉnh trọng số trong Pine, vòng sẽ nói dối. */
  const a = (factors[0].bonus / cap) * 100
  const b = ((factors[0].bonus + factors[1].bonus) / cap) * 100

  return (
    <section className="sec-alt" id="confluence">
      <div className="wrap">
        <SectionHead
          no="03"
          tag="Confluence"
          meta={`${factors.length} factors · capped at +${cap}`}
          title="Context does not sit in a second panel."
          lede={
            <>
              Most SMC tools show you the context and leave you to reconcile it with
              your entry signal by eye. Here the context <em>is</em> the score. Each
              factor below adds its points to the same 0&ndash;100 number &mdash; and
              can be turned into a hard gate that blocks the signal outright when the
              context is missing.
            </>
          }
        />

        <div className="conf-wrap">
          {/* Vòng + đoạn giải thích đứng CHUNG cột trái và dính khi cuộn.
              Để vòng một mình thì cột trái cao 230px cạnh danh sách cao 900px
              — lại đúng khoảng trống mà cả bản dựng này đang đi vá. */}
          <div className="conf-side">
            <div
              className="conf-dial"
              style={{ '--conf-a': `${a}%`, '--conf-b': `${b}%` } as CSSProperties}
            >
              <div className="conf-ring" aria-hidden="true" />
              <div className="conf-dial-c">
                <b>+{cap}</b>
                <span>Combined cap</span>
              </div>
            </div>

            <p className="conf-cap">
              {factors.length} factors. Combined ceiling: <b>+{cap}</b>. Stacking
              confluences cannot quietly inflate every setup into a 95 &mdash; the cap
              is in the source specifically to stop that. More evidence widens the
              base, it does not raise the roof.
            </p>
          </div>

          <ul className="conf-list">
            {factors.map((f) => (
              <li className="conf" key={f.name}>
                <span className="conf-b">+{f.bonus}</span>
                <span className="conf-n">{f.name}</span>
                <p className="conf-p">{f.body}</p>
                {/* Bar thuần trang trí — số +N ngay bên trên đã nói hết. */}
                <span className="conf-bar" aria-hidden="true">
                  <i style={{ width: `${(f.bonus / max) * 100}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
