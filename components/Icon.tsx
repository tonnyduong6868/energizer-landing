/**
 * Icon SVG inline.
 *
 * Không dùng emoji làm icon — luật của ui-ux-pro-max, và lý do rất thực tế:
 * emoji phụ thuộc font hệ điều hành, mỗi máy hiện một kiểu, không nhận màu
 * từ design token. Trang này có nền tối nên emoji ✅ ❌ sẽ tự mang nền trắng
 * của nó vào.
 *
 * Mặc định `aria-hidden` vì mọi icon ở đây đều đi kèm chữ đọc được ngay bên
 * cạnh. Chỗ nào icon đứng một mình mang nghĩa thì truyền `title` vào.
 */
type Props = { size?: number; title?: string; className?: string }

function base({ size = 18, title, className }: Props) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    className,
    // Icon đi kèm chữ thì ẩn khỏi screen reader; có title thì phơi ra.
    'aria-hidden': title ? undefined : (true as const),
    role: title ? ('img' as const) : undefined,
  }
}

export function Check(p: Props) {
  return (
    <svg {...base(p)} stroke="var(--bull)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      {p.title && <title>{p.title}</title>}
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function Cross(p: Props) {
  return (
    <svg {...base(p)} stroke="var(--bear)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      {p.title && <title>{p.title}</title>}
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/** Dấu trừ — "tầng này không có", khác hẳn "cái này sai". */
export function Dash(p: Props) {
  return (
    <svg {...base(p)} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      {p.title && <title>{p.title}</title>}
      <path d="M6 12h12" />
    </svg>
  )
}

export function Arrow(p: Props) {
  return (
    <svg {...base(p)} stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      {p.title && <title>{p.title}</title>}
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Telegram(p: Props) {
  return (
    <svg {...base(p)} fill="currentColor">
      {p.title && <title>{p.title}</title>}
      <path d="M21.8 4.3 18.9 19c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.5.5-.9.5l.3-4.6 8.3-7.5c.4-.3-.1-.5-.6-.2L7.4 13.2l-4.4-1.4c-1-.3-1-1 .2-1.4l17.2-6.6c.8-.3 1.5.2 1.4 1.5Z" />
    </svg>
  )
}

/** Chấm đầu dòng cho cột "cách cũ" — trung tính, không phải dấu X. */
export function Dot(p: Props) {
  return (
    <svg {...base(p)} fill="currentColor">
      {p.title && <title>{p.title}</title>}
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  )
}
