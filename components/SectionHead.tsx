import type { ReactNode } from 'react'

/**
 * Đầu khối đánh số + tiêu đề hai cột.
 *
 * Trang dài 11 khối. Không có mốc thì cuộn tới giữa là mất phương hướng,
 * không biết còn bao nhiêu nữa — đúng vấn đề của Trendline ở chiều cao
 * 11.777px. Đánh số từng khối cho người đọc biết mình đang ở đâu.
 *
 * `title` + `lede` nằm HAI CỘT trên màn rộng. Xếp dọc thì H2 chỉ ăn 24ch và
 * lede 66ch, tức nửa phải của mọi khối bỏ trống — đúng cái cảm giác "trống
 * trơn" mà bản trước bị chê. Hai cột vừa lấp chỗ đó vừa cắt ~80px mỗi khối.
 *
 * Hai prop này là tuỳ chọn: khối nào cần bố cục tiêu đề riêng (Pricing) thì
 * cứ bỏ trống và tự dựng.
 *
 * `no` và `meta` đều là chữ trang trí nên `aria-hidden`: screen reader đọc
 * thẳng tiêu đề <h2> bên dưới, không phải nghe "không hai gạch bảy".
 */
export function SectionHead({
  no,
  tag,
  meta,
  title,
  lede,
}: {
  no: string
  tag: string
  meta?: string
  title?: ReactNode
  lede?: ReactNode
}) {
  return (
    <header className="sh-block">
      <div className="sh">
        <div className="sh-pill">
          <span className="sh-no" aria-hidden="true">
            {no}
          </span>
          <span className="sh-tag">{tag}</span>
        </div>
        <div className="sh-rule" aria-hidden="true" />
        {meta && (
          <span className="sh-meta" aria-hidden="true">
            {meta}
          </span>
        )}
      </div>

      {title && (
        <div className={`sh-row${lede ? '' : ' is-solo'}`}>
          <h2 className="h2">{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
      )}
    </header>
  )
}
