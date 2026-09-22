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
 *    thông số kỹ thuật bên dưới đều đọc từ `../indicator/Smart Money Energizer
 *    v1.1.pine` và `../energizer-ea/EnergizerEA.mq5`, có ghi số dòng.
 * 2. Mảng nào chưa có dữ liệu thật thì để RỖNG. Component tự ẩn khối đó. Trang
 *    vẫn chạy đúng khi chưa điền gì — đây là cách duy nhất để không bao giờ
 *    vô tình ship social proof bịa.
 * 3. Không "còn 3 suất", không toast "ai đó vừa mua". Hai funnel đem ra đối
 *    chiếu đang làm cả hai thứ đó và nó là rủi ro pháp lý (FTC Act §5,
 *    EU UCPD Annex I) chứ không phải kỹ thuật bán hàng.
 *    Đồng hồ đếm ngược thì CÓ, nhưng chỉ ở đúng một dạng — ba ràng buộc bắt
 *    buộc ghi trong khối GIẢM GIÁ bên dưới. Cái bị phạt là đếm ngược giả
 *    (reset theo khách, về 0 mà giá không đổi), không phải đếm ngược.
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

  /**
   * Dòng chọn lọc đối tượng, đứng ngay trên CTA của hero.
   *
   * Làm hai việc cùng lúc: người hợp thấy trang viết cho đúng mình, người
   * không hợp rời đi trước khi tốn thêm thời gian của cả hai bên. Vế "not a
   * signal service, not a bot" là vế đuổi bớt — và nó đúng: script vẽ lên
   * chart và bắn webhook, nó không quản lệnh hộ ai.
   */
  audience:
    'For ICT / Smart Money traders who chart on TradingView — scalping, ' +
    'intraday or swing. Not a signal service, not a bot.',
} as const

/* ══════════════════════════════════════════════════════════════════════
   LINK — PHẢI SỬA TRƯỚC KHI CHẠY QUẢNG CÁO

   `checkout` đã trỏ vào Whop thật (22/09/2026). Hai link Telegram vẫn là
   placeholder: khách bấm vào rơi vào 404 và mất luôn. Component <SiteFooter>
   in cảnh báo đỏ ngay trên trang khi còn chữ "REPLACE", nên không quên lặng lẽ.
   ══════════════════════════════════════════════════════════════════════ */
/**
 * Channel công khai — dùng ở HAI chỗ (`telegramFree` và `support`) nên tách ra
 * hằng, đổi một lần là đổi cả hai.
 */
const TELEGRAM_FREE = 'https://t.me/Energizer_SignalsBot'

export const links = {
  /**
   * CTA chính của cả trang — channel công khai `Energizer Signals`
   * (`-1003474460136`, Public từ 22/09/2026). Link vĩnh viễn, không revoke
   * được, lại search ra được trên Telegram — nên đã bỏ invite link `t.me/+…`.
   *
   * Username **kết thúc bằng "Bot" nhưng đây KHÔNG phải bot**, mà là channel.
   * Đã kiểm bằng `t.me/s/Energizer_SignalsBot`: chỉ channel công khai mới
   * render được trang đó. Vì vậy `TELEGRAM_IS_BOT` bên dưới phải giữ `false`
   * — đừng thấy chữ "Bot" mà bật lên, `?start=` với channel là vô nghĩa.
   */
  telegramFree: TELEGRAM_FREE,
  /** Nhóm VIP — chỉ người đã mua. Link này gửi trong email sau thanh toán. */
  telegramVip: 'https://t.me/REPLACE_ME_vip_group',
  /**
   * Trang thanh toán — Whop `prod_VHwQkeR9slUqI` (xem `docs/whop-setup.md`).
   *
   * Plan đã bật checkout field bắt buộc "Your TradingView username"; thiếu nó
   * thì mỗi đơn phải email hỏi lại — chỗ rơi khách nhiều nhất trong cả luồng.
   *
   * Whop giữ nguyên query string (kiểm 22/09/2026: không redirect, không cắt),
   * nên UTM do `cta()` gắn vào đọc được ở phía Whop. `tonny-f2cd` là store slug
   * auto sinh — đổi slug ở Settings là link này chết, sửa cả hai cùng lúc.
   */
  checkout: 'https://whop.com/tonny-f2cd/smart-money-energizer/',
  /**
   * Hỏi trước khi mua. **Không còn email.**
   *
   * Địa chỉ cũ `support@zynalgo.com` gỡ 22/09/2026 (sản phẩm cá nhân, không
   * phải của ZynAlgo). Tonny chốt bỏ hẳn email, dồn về Telegram — nên key này
   * trỏ vào cùng channel với `telegramFree`.
   *
   * ⚠ LỖ HỔNG ĐÃ BIẾT: channel Telegram là broadcast MỘT CHIỀU, khách không
   * nhắn vào được; Whop chỉ mở chat SAU khi mua. Tức hiện tại **không có đường
   * liên hệ nào trước khi mua**. Cách sửa rẻ nhất: gắn một discussion group
   * vào channel (Telegram: Manage Channel → Discussion), lúc đó khách bình
   * luận được và link này thành đường hai chiều thật. Trước khi chạy quảng cáo
   * phải xử lý, nhất là vì khối GIẢM GIÁ đang mời khách "xin mã" trước khi trả
   * tiền.
   */
  support: TELEGRAM_FREE,
} as const

/** True khi còn placeholder — dùng để in cảnh báo lúc dev. */
export const hasPlaceholderLinks = Object.values(links).some((v) =>
  v.includes('REPLACE_ME'),
)

/**
 * Công tắc chung cho mọi khối ghi chú nội bộ trên trang.
 *
 * Trang này cố ý in phần "chưa xong" ra GIỮA TRANG chứ không vào console —
 * console thì không ai mở. Đổi lại, nó chỉ an toàn khi có đúng một công tắc,
 * và công tắc đó phải nằm ở đây.
 *
 * ⚠ Đã mất bò hai lần. Ngày 22/09/2026 phát hiện hai hộp cảnh báo ở
 * `<SiteFooter>` render vô điều kiện, sống trên GitHub Pages, nói với khách
 * quốc tế bằng tiếng Việt rằng trang có link hỏng và đồng hồ đếm ngược chưa
 * ai xác nhận. Vá xong thì hôm sau lộ tiếp khối `shot-empty` ở `<Hero>` —
 * cùng một loại lỗi, khác component, và nó nằm NGAY DƯỚI hero nên còn dễ
 * đọc hơn cái ở footer. Bài học: đừng để mỗi component tự quyết.
 *
 * Vì sao không chặn bằng mỗi `NODE_ENV`: quy trình QA của dự án soi bản
 * PRODUCTION chứ không soi `next dev` (dev overlay đè lên sticky CTA). Chặn
 * cứng theo NODE_ENV là đúng lúc QA thì lại không còn cảnh báo nào để đọc.
 * Nên có thêm cửa mở tay:
 *
 *   NEXT_PUBLIC_DEV_WARNINGS=1 npm run build
 *
 * Quy ước bắt buộc cho khối mới: gắn `data-devwarn` lên phần tử ngoài cùng.
 * `scripts/deploy.mjs` từ chối đẩy bản build nào còn chữ `devwarn`, nên dù
 * ai bật nhầm cờ thì nó cũng không lên sóng được. Attribute chứ không phải
 * class, để lưới bắt được cả khối có class riêng như `shot-empty`.
 */
export const showDevWarnings =
  process.env.NEXT_PUBLIC_DEV_WARNINGS === '1' || process.env.NODE_ENV !== 'production'

/**
 * Mọi chỗ đặt nút trên trang. Thêm nút mới thì thêm tên vào đây.
 *
 * Đây cũng là từ vựng dùng cho `data-cta` trên các nút nội bộ trỏ
 * `#pricing` — giữ chung một bộ tên để báo cáo UTM (nút ra ngoài) và báo
 * cáo sự kiện (nút nội bộ) đọc được cạnh nhau, không phải dịch tên.
 */
export type CtaPlace =
  | 'header'
  | 'hero'
  | 'density'
  | 'telegram'
  | 'pricing'
  | 'faq'
  | 'endcta'
  | 'sticky'
  | 'promo'
  | 'footer'

/**
 * Bật lên khi `telegramFree` trỏ vào MỘT BOT chứ không phải một channel.
 *
 * `t.me/<channel>` nuốt sạch query string — gắn UTM vào chỉ làm URL bẩn mà
 * không ai đọc được gì. `t.me/<bot>?start=hero` thì Telegram giao nguyên
 * chuỗi `hero` cho bot ở lệnh /start đầu tiên, nên anh biết nút nào mang
 * người tới, và quan trọng hơn: anh có user ID để nhắn lại. Channel thì
 * không — người vào rồi im lặng là mất trắng, không có cách nào chạm lại.
 */
const TELEGRAM_IS_BOT = false

/**
 * Gắn nguồn vào link ra ngoài.
 *
 * Trang là export tĩnh, không có analytics chạy trong trình duyệt, nên đây
 * là cách duy nhất hiện tại để biết nút nào có người bấm: đọc UTM ở phía
 * checkout. Không đo thì mọi chỉnh sửa sau này đều là đoán.
 */
export function cta(href: string, place: CtaPlace): string {
  if (href.startsWith('mailto:') || href.startsWith('#')) return href
  if (href.includes('t.me/')) return TELEGRAM_IS_BOT ? `${href}?start=${place}` : href
  const sep = href.includes('?') ? '&' : '?'
  return `${href}${sep}utm_source=landing&utm_medium=${place}&utm_campaign=energizer-${site.version}`
}

/* ══════════════════════════════════════════════════════════════════════
   ĐO LƯỜNG

   Không đo thì mọi chỉnh sửa sau này đều là đoán. Trang này vừa được thêm
   bốn chỗ đặt banner giảm giá và một đồng hồ đếm ngược — câu hỏi "chúng nó
   có tác dụng gì không" hiện tại KHÔNG có cách nào trả lời.

   Vì sao không dùng Google Analytics: GA4 đặt cookie, nên trang phải có
   banner xin phép cookie để hợp GDPR/ePrivacy. Banner đó che nội dung ngay
   lần tải đầu và tự nó là một chỗ rơi khách. Ba lựa chọn dưới đây đều không
   cookie, không dấu vân tay thiết bị, nên không cần banner.

   Mặc định là `'none'` và khi ở `'none'` thì component <Analytics /> in ra
   ĐÚNG KHÔNG GÌ CẢ — không thẻ script, không request, trang vẫn zero-JS như
   trước. Bật lên là sửa đúng hai dòng ở đây, không phải sửa code.
   ══════════════════════════════════════════════════════════════════════ */

type AnalyticsProvider = 'none' | 'plausible' | 'umami' | 'cloudflare'

export const analytics: {
  provider: AnalyticsProvider
  plausibleDomain: string
  plausibleHost: string
  umamiWebsiteId: string
  umamiSrc: string
  cloudflareToken: string
} = {
  /**
   * · 'plausible'  — ~1KB, $9/tháng, hoặc tự host miễn phí. Dễ đọc nhất.
   * · 'umami'      — ~2KB, bản cloud có gói free, tự host cũng được.
   * · 'cloudflare' — miễn phí hoàn toàn, nhưng KHÔNG đo được sự kiện bấm nút,
   *                  chỉ đếm lượt xem. Với trang này thì hơi phí.
   */
  provider: 'none',

  /** Plausible: đúng domain đã khai trong dashboard, không có https://. */
  plausibleDomain: 'tonnyduong6868.github.io',
  /** Đổi khi tự host. Để nguyên nếu dùng plausible.io. */
  plausibleHost: 'https://plausible.io',

  /** Umami: lấy cả hai ở tab Settings → Websites → Edit → Tracking code. */
  umamiWebsiteId: '',
  umamiSrc: '',

  /** Cloudflare Web Analytics: token trong đoạn snippet nó đưa. */
  cloudflareToken: '',
}

/**
 * True khi provider đã được chọn VÀ đã điền đủ thông tin nó cần.
 *
 * Tách riêng khỏi `provider !== 'none'` là có lý do: chọn 'plausible' mà
 * quên điền domain thì script vẫn tải nhưng mọi lượt xem rơi vào hư không,
 * và đó là kiểu hỏng tệ nhất — trông như đang đo.
 */
export const analyticsReady =
  (analytics.provider === 'plausible' && analytics.plausibleDomain !== '') ||
  (analytics.provider === 'umami' &&
    analytics.umamiWebsiteId !== '' &&
    analytics.umamiSrc !== '') ||
  (analytics.provider === 'cloudflare' && analytics.cloudflareToken !== '')

/**
 * True khi chưa gắn gì. Footer in một dòng nhắc màu vàng — nhắc, không chặn.
 */
export const analyticsMissing = analytics.provider === 'none' || !analyticsReady

/* ══════════════════════════════════════════════════════════════════════
   GIÁ
   ══════════════════════════════════════════════════════════════════════ */

/** Một chỗ duy nhất định thời hạn licence. Mọi câu chữ bên dưới đọc từ đây. */
const TERM_YEARS = 3

export const pricing = {
  amount: 97,
  currency: 'USD',
  symbol: '$',
  /**
   * Licence CÓ thời hạn, và thời hạn phải ghi ra. Đừng bỏ con số đi.
   *
   * Whop Seller Terms (hiệu lực 28/07/2026) viết thẳng: "All Products must have
   * specific access periods, durations, and delivery mechanisms disclosed to the
   * Buyer at the time of purchase. You may not offer or list 'lifetime,'
   * 'perpetual,' or indefinite-access Products."
   *
   * Nên đây không phải chuyện tránh một từ — offer vô thời hạn tự nó bị cấm.
   * Bán thứ bị cấm nằm ở nhóm vi phạm non-correctable: khoá tài khoản, giữ tiền,
   * kháng cáo hiếm khi được chấp nhận.
   */
  planName: `${TERM_YEARS}-year licence`,
  termYears: TERM_YEARS,

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
    `Every v1.x update released during the ${TERM_YEARS} years, at no extra cost`,
    'Use it on your own TradingView account, on any chart, any symbol',
    'JSON webhook alerts — pipe signals into Telegram, Discord or your own bot',
    `Access to the VIP Telegram group for the full ${TERM_YEARS} years`,
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
   GIẢM GIÁ

   Hai đòn bẩy, và CHỈ hai. Cả hai đều mô tả một chính sách có thật, không
   cái nào cần tới một con số gạch ngang bịa ra:

   1. `launch` — giá ra mắt sẽ TĂNG THẬT vào một ngày cụ thể. Hợp pháp vì
      nó là lời hứa về tương lai, không phải lời khai về quá khứ. Điều kiện
      duy nhất: ngày đó tới thì giá phải lên thật. Không lên mà vẫn treo
      banner sang tháng sau là rơi đúng vào FTC Act §5 và UCPD Annex I §7.

   2. `crypto` — trả bằng crypto bớt 10%. Đây là mô tả cách thanh toán, phí
      xử lý thấp hơn thì chia lại cho khách. Không dính gì tới giá neo.

   VẪN KHÔNG CÓ, và đừng thêm vào:
   · `pricing.anchor` gạch ngang — Energizer chưa bán ngày nào ở mức khác.

   ĐỒNG HỒ ĐẾM NGƯỢC — có, nhưng chỉ đúng một kiểu

   Cái mà cơ quan quản lý phạt không phải "đếm ngược", mà là đếm ngược
   GIẢ: đồng hồ reset theo từng khách, đồng hồ evergreen chạy theo lần
   truy cập đầu, đồng hồ về 0 rồi giá vẫn y nguyên. Đếm tới một mốc có
   thật, giống nhau với mọi người, và về 0 thì trang tự đổi — đó là thông
   tin, không phải thủ thuật.

   Ba ràng buộc dưới đây là điều kiện để giữ nó, không phải gợi ý:

   1. Mốc là MỘT hằng số UTC nén sẵn vào bundle (`deadlineUtc`). Không
      localStorage, không cookie, không tính từ lần ghé đầu. Hai người mở
      trang cùng lúc ở hai châu lục thấy cùng một con số.
   2. Về 0 là trang tự gỡ toàn bộ phần giảm giá xuống — không đứng ở
      00:00:00, không quay vòng. Trang lành lại thành trang $97 bình
      thường kể cả khi không ai kịp build lại.
   3. Mốc đó phải là sự thật. Chừng nào `launch.confirmed` còn `false`,
      đồng hồ này đang đếm tới một ngày chưa ai chốt — và đếm ngược làm
      lời hứa đó to hơn hẳn so với một dòng chữ.
   ══════════════════════════════════════════════════════════════════════ */
export const promo = {
  enabled: true,

  launch: {
    /** Giá sau khi hết đợt ra mắt. */
    nextAmount: 147,
    /** Ngày giá tăng. ISO để máy đọc, `label` để người đọc. */
    until: '2026-10-15',
    untilLabel: '15 Oct 2026',
    /**
     * Mốc đồng hồ đếm ngược, UTC tuyệt đối. Cố ý KHÔNG suy ra từ `until`:
     * hết ngày 15/10 theo múi giờ nào là một quyết định kinh doanh, để nó
     * ngầm định thì mỗi người đọc code hiểu một kiểu. UTC vì sản phẩm bán
     * toàn cầu — chọn múi giờ Việt Nam thì khách Mỹ mất thêm nửa ngày mà
     * không biết vì sao.
     */
    deadlineUtc: '2026-10-15T23:59:59Z',
    /**
     * Tonny bật `true` khi đã CHỐT là sẽ tăng giá thật vào đúng ngày trên.
     * Còn `false` thì banner vẫn hiện nhưng footer in cảnh báo đỏ — cùng cơ
     * chế với link REPLACE_ME, vì cùng một loại rủi ro: một lời hứa chưa ai
     * xác nhận mà đã nằm trên trang bán hàng.
     */
    confirmed: false,
  },

  crypto: {
    percent: 10,
    /**
     * Phải đúng là checkout của Energizer nhận crypto. Playbook CSKH đang
     * áp mức này cho sản phẩm khác — không mặc nhiên suy ra cho cái này.
     */
    confirmed: false,
  },

  /** Mã giảm giá riêng do support cấp, cộng dồn với crypto. Không in mã ra trang. */
  stackableCode: true,

  /** Tắt riêng đồng hồ mà vẫn giữ banner chữ. Đọc ba ràng buộc ở đầu khối. */
  countdown: true,
} as const

/**
 * Mốc đếm ngược quy ra epoch ms, tính lúc BUILD.
 *
 * `Date.parse` một chuỗi hằng là thuần tuý, không phải `Date.now()` — nó
 * cho cùng một số ở mọi lần build, nên không vi phạm luật "không dùng giờ
 * hệ thống lúc render" mà ChartPanel đang theo.
 */
export const promoDeadlineMs = Date.parse(promo.launch.deadlineUtc)

/** Giá sau khi hết đợt ra mắt trừ đi giá hiện tại, làm tròn % theo giá SAU. */
export const promoSaving = {
  amount: promo.launch.nextAmount - pricing.amount,
  percent: Math.round(
    ((promo.launch.nextAmount - pricing.amount) / promo.launch.nextAmount) * 100,
  ),
  /** Giá thực trả khi thanh toán bằng crypto, 2 số lẻ. */
  crypto: ((pricing.amount * (100 - promo.crypto.percent)) / 100).toFixed(2),
}

/** True khi còn lời hứa giảm giá chưa ai xác nhận là thật. */
export const hasUnconfirmedPromo =
  promo.enabled && (!promo.launch.confirmed || !promo.crypto.confirmed)

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
      // "Public" là chữ đúng từ 22/09/2026 — channel đã Public, đọc được
      // toàn bộ bài ở `t.me/s/Energizer_SignalsBot` mà không cần join. Đó
      // mới là thứ đỡ được câu "phải tin trang bán hàng": khách kiểm trước,
      // vào sau. Nếu có ngày channel quay lại Private thì đổi chữ này cùng
      // lúc với `links.telegramFree`, đừng để lệch.
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
    a: `No. ${pricing.symbol}${pricing.amount} paid once, and the licence runs ${pricing.termYears} years from the day it is activated. Nothing renews, no card is kept on file, and there is nothing to cancel. The VIP Telegram group runs with the licence — it is not a separate monthly fee.`,
  },
  {
    q: 'Do the signals repaint?',
    a: 'No. Signals confirm on bar close, and the higher-timeframe fair value gap that feeds the score is built from closed HTF bars only. That is written into the source as a constraint, not bolted on as a claim.',
  },
  {
    q: 'What do I need to run it?',
    a: 'TradingView. The script is invite-only, so checkout asks for your TradingView username and it appears in your Invite-only scripts list once access is granted. Webhook alerts need at least a paid TradingView tier — that is their limit, not ours.',
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
    /**
     * Câu này BẮT BUỘC phải có.
     *
     * Trang nói "trả một lần", "không gia hạn", "không có gì để huỷ" — ba
     * câu đó đọc rời nhau thì nghe như vô thời hạn. Người đọc kỹ sẽ tự hỏi
     * "vậy hết 3 năm thì sao", và nếu trang không trả lời thì họ tự điền một
     * câu trả lời, thường là câu xấu nhất. Whop cũng bắt phải công bố rõ
     * access period tại thời điểm mua (xem chú thích ở `pricing.planName`).
     *
     * Câu cuối cố tình KHÔNG hứa giá gia hạn. Chưa ai quyết giá đó, nên viết
     * ra bất cứ con số nào cũng là bịa — và nói thẳng "chúng tôi chưa biết"
     * đáng tin hơn một lời hứa không ai đứng ra bảo đảm.
     *
     * Đứng ở ĐÂY chứ không phải đầu mảng. Hai câu trong `priceBlockers` bị
     * đẩy xuống cuối, nên câu nào đứng đầu mảng sẽ thành câu FAQ đầu tiên và
     * mở sẵn — mở khối FAQ bằng "hết hạn thì sao" là tự dắt người đọc vào
     * viễn cảnh mất quyền dùng trước cả khi họ mua. Ở vị trí này nó nằm ngay
     * cạnh câu hoàn tiền và câu "có phải thuê bao không", đúng cụm điều
     * khoản, và ai đọc tới đó là đang cân nhắc thật.
     */
    q: `What happens when the ${TERM_YEARS} years are up?`,
    a: `Access to the invite-only script and to the VIP group ends, and that is the whole of it. Nothing charges you: there is no card on file and no auto-renew, so the licence just stops on its own. If you still want the tool at that point you buy it again at whatever it costs then. We are not quoting you a renewal price today, because nobody has decided one yet and a made-up number is worth nothing to you.`,
  },
  {
    q: 'What if it is not for me?',
    a: pricing.guarantee.text,
  },
] as const

/**
 * Hai câu chặn tay trên nút mua, được LẶP LẠI ngay dưới thẻ giá.
 *
 * Khớp theo `q` nên đổi chữ ở mảng `faq` là khối dưới thẻ giá biến mất —
 * cố ý, thà mất còn hơn hiện hai câu trả lời khác nhau cho cùng một câu hỏi.
 * Khối 09 tự đẩy hai câu này xuống cuối danh sách: hai bản giống hệt nhau
 * cách nhau 200px thì cái thứ hai chỉ làm người đọc tưởng mình cuộn nhầm.
 */
export const priceBlockers = [
  'Is this a subscription?',
  'What do I need to run it?',
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
