/**
 * NGUỒN SỰ THẬT DUY NHẤT cho toàn trang.
 *
 * Mọi con số, mọi câu chữ khách đọc được đều nằm ở file này. Component chỉ lo
 * cách bày, không chứa nội dung. Sửa giá hay đổi link Telegram thì sửa đúng
 * một chỗ ở đây.
 *
 * LUẬT CỦA FILE NÀY — đừng phá:
 *
 * 1. Không con số nào được viết ra nếu không truy được về nguồn thật. Mọi
 *    thông số kỹ thuật bên dưới đều đọc từ `D:\ZynAlgo\Smart Money Energizer
 *    v1.1.pine` và `energizer-ea/ZynAlgoEnergizerEA.mq5`, có ghi số dòng.
 * 2. Mảng nào chưa có dữ liệu thật thì để RỖNG. Component tự ẩn khối đó. Trang
 *    vẫn chạy đúng khi chưa điền gì — đây là cách duy nhất để không bao giờ
 *    vô tình ship social proof bịa.
 * 3. Không đếm ngược, không "còn 3 suất", không toast "ai đó vừa mua". Hai
 *    funnel zynalgo.net hiện tại đang làm cả ba thứ đó và nó là rủi ro pháp lý
 *    (FTC Act §5, EU UCPD Annex I) chứ không phải kỹ thuật bán hàng.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Đường dẫn file trong public/ — tự gắn basePath của GitHub Pages. */
export const asset = (path: string) => `${BASE_PATH}${path}`

export const site = {
  name: 'Smart Money Energizer',
  short: 'Energizer',
  version: 'v1.1',
  tagline: 'One score. Not twelve opinions.',
  description:
    'A single-chart Smart Money terminal for TradingView. Trend, momentum and ' +
    'volatility score every setup 0-100, and seven ICT confluences energize that ' +
    'one number — so context and trigger stop being two separate arguments.',
  url: 'https://tonnyduong6868.github.io/energizer-landing/',
  locale: 'en_US',
} as const

/* ══════════════════════════════════════════════════════════════════════
   LINK — PHẢI SỬA TRƯỚC KHI CHẠY QUẢNG CÁO

   Bốn giá trị dưới đây đang là placeholder. Khách bấm vào sẽ rơi vào trang
   404 và mất luôn. Component <SiteFooter> in cảnh báo đỏ ngay trên trang khi
   `telegramFree` vẫn còn chứa chữ "REPLACE", nên không thể quên lặng lẽ.
   ══════════════════════════════════════════════════════════════════════ */
export const links = {
  /** Channel công khai — CTA chính của cả trang. */
  telegramFree: 'https://t.me/REPLACE_ME_free_channel',
  /** Nhóm VIP — chỉ người đã mua. Link này gửi trong email sau thanh toán. */
  telegramVip: 'https://t.me/REPLACE_ME_vip_group',
  /** Trang thanh toán. Trỏ vào Stripe/GHL checkout của Energizer. */
  checkout: 'https://zynalgo.com/REPLACE_ME_energizer_checkout',
  /** Hỏi trước khi mua. */
  support: 'mailto:support@zynalgo.com',
} as const

/** True khi còn placeholder — dùng để in cảnh báo lúc dev. */
export const hasPlaceholderLinks = Object.values(links).some((v) =>
  v.includes('REPLACE_ME'),
)

/* ══════════════════════════════════════════════════════════════════════
   GIÁ
   ══════════════════════════════════════════════════════════════════════ */
export const pricing = {
  amount: 97,
  currency: 'USD',
  symbol: '$',
  planName: 'Lifetime licence',

  /**
   * KHÔNG có giá neo (`was $197`).
   *
   * Neo giá chỉ hợp pháp và chỉ còn tác dụng khi sản phẩm THẬT SỰ từng bán ở
   * mức đó. Energizer chưa bán ngày nào, nên mọi con số gạch ngang đều là bịa.
   * Nếu sau này anh tăng lên $197 thật thì lúc đó mới bật `anchor` lên — và
   * lúc đó nó là sự thật kiểm chứng được.
   */
  anchor: null as number | null,

  includes: [
    'Smart Money Energizer v1.1 — invite-only script on TradingView',
    'Every future v1.x update, automatically, at no extra cost',
    'Use it on your own TradingView account, on any chart, any symbol',
    'JSON webhook alerts — pipe signals into Telegram, Discord or your own bot',
    'Access to the VIP Telegram group for as long as the licence lives',
  ],

  excludes: [
    'A TradingView plan — the script needs at least a paid tier to run alerts',
    'A broker account, a VPS, or anything that places orders for you',
    'The MT5 Expert Advisor — that is a separate product, sold separately',
  ],

  guarantee: {
    days: 14,
    /**
     * Một chính sách hoàn tiền, viết một lần, không mâu thuẫn ở chỗ nào khác
     * trên trang. Trendline hứa 7 ngày còn Scalper ghi "all sales are final" —
     * cùng một pháp nhân, hai lời hứa ngược nhau. Đừng lặp lại lỗi đó.
     */
    text:
      'Ask for a refund within 14 days and you get it. No form, no "let us ' +
      'win you back" call. Email support, say the word refund, done.',
  },
} as const

/* ══════════════════════════════════════════════════════════════════════
   THÔNG SỐ KỸ THUẬT — tất cả đọc từ source, có ghi chỗ lấy
   ══════════════════════════════════════════════════════════════════════ */

/**
 * Bảy confluence factor và đúng số điểm của chúng.
 * Nguồn: `Smart Money Energizer v1.1.pine` dòng 161 và 166-178.
 *
 * Con số quan trọng nhất ở đây không phải các bonus — mà là `cap`. Bảy yếu tố
 * cộng lại tối đa vẫn chỉ +30. Đó là thứ phân biệt một engine chấm điểm thật
 * với một cái máy cộng điểm cho tới khi mọi setup đều 95/100.
 */
export const confluences = {
  cap: 30,
  factors: [
    {
      name: 'Liquidity Sweep',
      bonus: 12,
      body: 'Price ran the last swing pivot and closed back inside. Stops taken, then rejected.',
    },
    {
      name: 'Killzone',
      bonus: 10,
      body: 'The setup landed inside the London / New York window. Reads the raw session clock, so hiding the boxes never changes a signal.',
    },
    {
      name: 'HTF FVG Mitigation',
      bonus: 10,
      body: 'Price returned into the most recent higher-timeframe fair value gap and respected it instead of closing through.',
    },
    {
      name: 'Displacement / FVG',
      bonus: 8,
      body: 'A three-bar imbalance left behind by an aggressive move.',
    },
    {
      name: 'Opening Gap Reaction',
      bonus: 8,
      body: 'Price traded into the live NDOG / NWOG and held the correct side of its midpoint. A gap narrower than one ATR counts as no gap — that keeps 24h markets from collecting this bonus every single bar.',
    },
    {
      name: 'MTF Alignment',
      bonus: 8,
      body: 'Higher timeframes agree with the direction. Only counts once you switch the filter on, so the confluence count never means two different things.',
    },
    {
      name: 'Open-Price Sweep',
      bonus: 6,
      body: 'Price ran one of the five session open levels (00:00 / 08:00 / 09:00 / 10:00 / 11:00) and closed back through it.',
    },
  ],
} as const

/**
 * Ba preset Trading Style. Nguồn: dòng 90 của file .pine.
 * Đây là input đầu tiên trong QUICK START và là thứ đổi nhiều nhất trong script.
 */
export const styles = [
  { name: 'Scalping', emas: '9 / 21 / 136' },
  { name: 'Intraday', emas: '20 / 50 / 200', isDefault: true },
  { name: 'Swing', emas: '34 / 68 / 136' },
] as const

/**
 * Chart Density — bốn preset. Nguồn: dòng 92.
 *
 * Đây là điểm bán hàng thật nhất của sản phẩm và gần như không indicator nào
 * khác có. Mọi công cụ SMC đều chết vì cùng một lý do: bật hết tính năng lên
 * thì chart không đọc được nữa. Đây là cái núm giải quyết chuyện đó.
 */
export const density = [
  {
    name: 'Clean',
    body: 'One live panel. No price tags. Tiny signal labels.',
  },
  {
    name: 'Balanced',
    body: 'Three panels, tags on the newest trade only, small signal labels.',
    isDefault: true,
  },
  {
    name: 'Full',
    body: 'Everything, for reviewing history on a wide screen.',
  },
  {
    name: 'Custom',
    body: 'Hands control back to the individual counters. Nothing is capped.',
  },
] as const

/** Bốn nhóm năng lực, lấy nguyên từ header của file .pine (dòng 12-25). */
export const pillars = [
  {
    key: 'see',
    label: 'See the market',
    body: 'HTF candle projection, Killzones, Opening Gaps (NWOG / NDOG), Open Price levels, FVG and Volume Imbalance, Day Separator, Daily Divider.',
  },
  {
    key: 'read',
    label: 'Read the market',
    body: 'A trend / momentum / volatility engine scores every setup 0-100, with sideway lockouts and anti-flip logic so it stops arguing with itself in chop.',
  },
  {
    key: 'energize',
    label: 'Energize the edge',
    body: 'Killzone timing, liquidity sweeps and displacement imbalances feed back into that score — and can gate it outright — so context and trigger are one number, not two opinions.',
  },
  {
    key: 'trade',
    label: 'Trade the market',
    body: 'ATR stop, TP1 / TP2 / TP3 projection, live R:R boxes, a rolling profit factor, and JSON webhook alerts.',
  },
] as const

/**
 * Con số kỹ thuật kiểm chứng được. Không phải con số marketing.
 * `wc -l` trên file .pine = 3366; `grep -c 'input\.'` = 235.
 */
export const specs = [
  { value: '3,366', label: 'lines of Pine v6' },
  { value: '235', label: 'inputs, every one with a tooltip' },
  { value: '0-100', label: 'score on every setup' },
  { value: '7', label: 'Smart Money confluences' },
] as const

/* ══════════════════════════════════════════════════════════════════════
   MINH BẠCH — khối tin cậy chính của trang

   Đây là thứ thay chỗ cho đếm ngược giả và toast "Sofia M. from Madrid vừa
   mua". Nó hiệu quả hơn, và nó đúng.
   ══════════════════════════════════════════════════════════════════════ */
export const transparency = {
  /**
   * Bug profit factor của v1.0 — lấy nguyên văn từ changelog trong file .pine
   * (dòng 31-42). Tự khai một lỗi mình đã tự tìm ra và tự sửa là bằng chứng
   * mạnh hơn mọi review 5 sao, vì không ai bịa được loại bằng chứng này.
   */
  changelog: {
    title: 'We inflated our own stats. Then we fixed it.',
    body:
      'In v1.0 the rolling Profit Factor booked TP1, TP2 and TP3 of the same ' +
      'trade as three separate winners. One 3R trade counted as +1R, +2R and ' +
      '+3R across three "trades". Trades replaced by an opposite signal, and ' +
      'trades that never resolved, vanished from the statistics entirely.',
    fix:
      'In v1.1 one closed trade produces exactly one record, at the R it ' +
      'actually finished on. Replaced and unresolved trades are closed at ' +
      'market and booked. Breakeven counts as half a win, not a full one.',
    note:
      'Which means the profit factor you see in v1.1 is lower than the one ' +
      'v1.0 showed you. That is the point.',
  },

  /** Những điều nói thẳng, không cần dữ liệu khách hàng để nói được. */
  honest: [
    {
      title: 'This does not predict anything',
      body:
        'It scores the evidence in front of it. A 90 is a setup with a lot ' +
        'going for it, not a setup that is going to win. Nothing on a chart ' +
        'knows the future, and anything that tells you otherwise is selling ' +
        'you something worse than an indicator.',
    },
    {
      title: 'No backtest screenshot on this page',
      body:
        'Every indicator sales page shows a curve going up. You cannot verify ' +
        'any of them, and neither can we. So instead: the script ships with a ' +
        'rolling profit factor that runs on YOUR chart, YOUR symbol, YOUR ' +
        'settings. Judge it there.',
    },
    {
      title: 'Signals do not repaint. The HTF FVG is built from closed bars only',
      body:
        'That is a design constraint written into the source, not a promise ' +
        'in a FAQ. The higher-timeframe fair value gap that feeds the score ' +
        'reads closed HTF bars exclusively.',
    },
    {
      title: 'Seven confluences, capped at +30',
      body:
        'Stacking confluences cannot quietly inflate every score past the ' +
        'ceiling. We built the cap in specifically so that adding more ' +
        'evidence widens the base without turning every setup into a 95.',
    },
  ],
} as const

/* ══════════════════════════════════════════════════════════════════════
   TELEGRAM — hai tầng

   Đây là khác biệt lớn nhất so với hai funnel cũ: chúng chỉ có một cửa (mua
   hoặc biến mất), nên 100% người chưa sẵn sàng mua bị mất trắng. Channel free
   giữ lại nhóm đó.
   ══════════════════════════════════════════════════════════════════════ */
export const community = {
  /**
   * SỐ MEMBER THẬT — để 0 cho tới khi anh đọc số thật từ Telegram.
   *
   * DB của skill ui-ux-pro-max ghi rõ ở pattern `community-forum-landing`:
   * "Show member and activity counts only when current, verified, and dated".
   * Nên chỗ này có `asOf` bắt buộc. Component ẩn cả dòng nếu count = 0.
   */
  memberCount: 0,
  asOf: '', // ví dụ: '22 Sep 2026'

  tiers: [
    {
      key: 'free',
      name: 'Public channel',
      price: 'Free',
      sub: 'No purchase. No email. Just join.',
      cta: 'Join the free channel',
      href: links.telegramFree,
      rows: [
        { label: 'Sample signals, posted live', has: true },
        { label: 'Weekly chart breakdowns — why a setup scored what it scored', has: true },
        { label: 'Release notes when the script updates', has: true },
        { label: 'Every signal the engine fires, in real time', has: false },
        { label: 'Your own charts reviewed', has: false },
        { label: 'Settings help for your symbol and session', has: false },
        { label: 'Direct line for bugs and feature requests', has: false },
      ],
    },
    {
      key: 'vip',
      name: 'VIP group',
      price: 'Included with the licence',
      sub: 'Opens the moment your licence is active.',
      cta: 'Get the licence',
      href: links.checkout,
      isPrimary: true,
      rows: [
        { label: 'Sample signals, posted live', has: true },
        { label: 'Weekly chart breakdowns — why a setup scored what it scored', has: true },
        { label: 'Release notes when the script updates', has: true },
        { label: 'Every signal the engine fires, in real time', has: true },
        { label: 'Your own charts reviewed', has: true },
        { label: 'Settings help for your symbol and session', has: true },
        { label: 'Direct line for bugs and feature requests', has: true },
      ],
    },
  ],
} as const

/* ══════════════════════════════════════════════════════════════════════
   BẰNG CHỨNG — tất cả RỖNG cho tới khi có thật
   ══════════════════════════════════════════════════════════════════════ */
export const proof = {
  /**
   * Ảnh chụp chart. Bỏ file vào `public/assets/shots/` rồi khai ở đây.
   * `alt` bắt buộc và phải mô tả cái đang thấy, không phải "chart screenshot".
   * `w`/`h` bắt buộc — thiếu là gây CLS, đúng lỗi Trendline đang mắc với 58 ảnh.
   */
  shots: [] as { src: string; alt: string; w: number; h: number; caption: string }[],

  /**
   * Testimonial THẬT. Tối đa 6 — đọc được 6 cái tốt hơn tường 46 ảnh mờ như
   * Trendline đang làm. `who` phải là người có thật; nếu chỉ có tên viết tắt
   * thì ghi viết tắt, đừng chế họ tên đầy đủ cho đẹp.
   */
  quotes: [] as { text: string; who: string; context?: string }[],
} as const

/* ══════════════════════════════════════════════════════════════════════
   FAQ — xử lý phản đối, viết thẳng
   ══════════════════════════════════════════════════════════════════════ */
export const faq = [
  {
    q: 'Is this a subscription?',
    a: `No. ${pricing.symbol}${pricing.amount} once, and the licence does not expire. We do not store your card for later and there is no renewal to cancel. The VIP Telegram group is part of the licence, not a separate monthly fee.`,
  },
  {
    q: 'Do the signals repaint?',
    a: 'No. Signals confirm on bar close, and the higher-timeframe fair value gap that feeds the score is built from closed HTF bars only. That is written into the source as a constraint, not bolted on as a claim.',
  },
  {
    q: 'What do I need to run it?',
    a: 'TradingView. The script is invite-only, so send your TradingView username after purchase and it appears in your Invite-only scripts list. Webhook alerts need at least a paid TradingView tier — that is their limit, not ours.',
  },
  {
    q: 'Which markets and timeframes?',
    a: 'Anything TradingView charts. The Trading Style preset switches the whole EMA stack for you — Scalping 9/21/136, Intraday 20/50/200, Swing 34/68/136 — so the same script works from the 1-minute to the daily without you rebuilding it.',
  },
  {
    q: '235 inputs sounds like a lot. Do I have to learn all of them?',
    a: 'No. Two inputs sit at the top under QUICK START and do most of the work: Trading Style and Chart Density. Everything below them is already set to a sensible default, and every single input has a tooltip explaining what it does and what breaks if you change it.',
  },
  {
    q: 'Will it place trades for me?',
    a: 'Not on its own. It fires JSON webhook alerts containing symbol, action, entry, stop, three targets, score, timeframe and ATR — so you can route them into Telegram, Discord, or an execution bot. There is a separate MT5 Expert Advisor that consumes them, sold separately.',
  },
  {
    q: 'Can I see it before I pay?',
    a: 'Join the free Telegram channel. Sample signals get posted there live, along with the reasoning behind the score. Watch it for a week before you spend anything.',
  },
  {
    q: 'What if it is not for me?',
    a: pricing.guarantee.text,
  },
] as const

/** Thứ tự khớp đúng thứ tự khối trên trang. */
export const nav = [
  { href: '#engine', label: 'The engine' },
  { href: '#confluence', label: 'Confluence' },
  { href: '#density', label: 'Density' },
  { href: '#telegram', label: 'Telegram' },
  { href: '#honest', label: 'Straight answers' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
] as const
