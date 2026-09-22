/**
 * Đầu khối đánh số.
 *
 * Trang dài 11 khối. Không có mốc thì cuộn tới giữa là mất phương hướng,
 * không biết còn bao nhiêu nữa — đúng vấn đề của Trendline ở chiều cao
 * 11.777px. Đánh số từng khối cho người đọc biết mình đang ở đâu.
 *
 * `no` và `meta` đều là chữ trang trí nên `aria-hidden`: screen reader đọc
 * thẳng tiêu đề <h2> bên dưới, không phải nghe "không hai gạch bảy".
 */
export function SectionHead({ no, tag, meta }: { no: string; tag: string; meta?: string }) {
  return (
    <header className="sh">
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
    </header>
  )
}
