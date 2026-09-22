# Thanh toán Energizer trên Whop

Trang này là source of truth cho phần thu tiền + giao hàng. Chốt ngày 22/09/2026
sau khi đọc chính sách của Polar, Creem, Paddle, Gumroad và Whop.

## Vì sao là Whop, không phải Polar hay Creem

Polar và Creem đều **có Việt Nam** trong danh sách payout, phí lại rẻ hơn Whop.
Nhưng cả hai cấm đúng loại sản phẩm này:

- **Polar** — Acceptable Use Policy (hiệu lực 25/03/2026), mục Prohibited Products:
  *"financial trading, trading bots, brokerage, or investment advisory services
  (including insights platforms)"* và *"financial advice content or services
  related to … trading signals, or investment strategies"*.
- **Creem** — Prohibited: *"Trading and investment tools and services that enable
  or facilitate trade execution or automation"*. Nhóm không tự động hoá chỉ nằm ở
  Restricted, và muốn duyệt phải nộp lịch sử payment processor cũ + tỉ lệ
  chargeback + *"an established and proven track record"* — Energizer chưa bán
  ngày nào nên không có gì để nộp.
- **Paddle** — trang supported-countries không liệt kê Việt Nam.
- **Gumroad** — không cấm indicator, nhưng 10%/đơn và không tự cấp quyền Telegram.

Whop: Việt Nam không nằm trong sanctioned-countries list (list này áp cho cả
seller lẫn buyer), prohibited list không đụng tới indicator cho trader (chỉ cấm
prop firm, unregistered financial services, bán crypto), và Whop tự quản quyền
Telegram/Discord theo trạng thái đơn.

## Hai điều Whop KHÔNG làm — biết trước rồi hẵng bán

### Whop không nhận offer vô thời hạn

Không phải chuyện kiêng một từ. Seller Terms (hiệu lực 28/07/2026) viết thẳng:

> All Products must have specific access periods, durations, and delivery
> mechanisms disclosed to the Buyer at the time of purchase. You may not offer or
> list "lifetime," "perpetual," or indefinite-access Products.

Nên Energizer bán trên Whop **bắt buộc** có thời hạn. Đang để **3 năm**
(`TERM_YEARS` trong `lib/site.ts`, một chỗ duy nhất — `planName`, `includes` và
FAQ đều đọc từ đó). Đổi số ở đó là cả trang đổi theo.

Không cần hỏi support chuyện này; điều khoản đã dứt khoát, mà bán thứ bị cấm nằm
ở nhóm vi phạm **non-correctable**: khoá tài khoản, giữ tiền, kháng cáo hiếm khi
được chấp nhận.

### Whop không lo thuế hộ (trừ khi trả thêm 2%)

Đây là khác biệt lớn nhất so với Polar/Creem. Seller Terms:

> Whop acts as merchant of record **for the purpose of card network rules and
> payment settlement only** … You are the supplier of the Products for all other
> purposes, **including for value-added tax, sales tax**, consumer protection, and
> content licensing.

Bán quốc tế mà không bật gì thêm thì nghĩa vụ VAT/sales tax là của anh, không
phải của Whop. Whop có bán riêng dịch vụ **Tax and remittance: +2%/giao dịch**
(chỉ tính khi thực sự thu thuế). Với tệp khách EU/UK thì nên bật.

### Phí thật (docs.whop.com/fees)

| Khoản | Mức |
|---|---|
| Card processing | 2.7% + $0.30 |
| Thẻ quốc tế | +1.5% |
| Có quy đổi tiền tệ | +1% |
| Tax and remittance (tuỳ chọn) | +2% |
| Billing / Orchestration (tuỳ chọn) | +0.5% / +0.8% |

Đơn $97 từ khách nước ngoài, bật thuế: ~2.7 + 1.5 + 2 = **6.2% + $0.30 ≈ $6.3**,
còn về ~$90.7. Không phải 3% như đồn — nhưng vẫn rẻ hơn Gumroad 10% ($9.70).

### Reserve với tài khoản mới

Whop và đối tác tài chính có quyền giữ **tới 100%** số dư khi tài khoản mới, chưa
có lịch sử giao dịch, hoặc tỉ lệ dispute/refund cao. Đừng lên kế hoạch tiêu số
tiền của tháng đầu.

## Việc phải làm trước khi mở bán

### 1. Tạo product + plan

- Product: `Smart Money Energizer`
- Plan: one-time, $97 USD
- **Access period: 3 years** — Whop bắt phải khai, và con số này phải khớp
  `TERM_YEARS` trong `lib/site.ts`. Lệch nhau là mô tả sai, Whop gỡ listing.
- **Bật custom checkout field, required:**
  - key: `tradingview_username`
  - label: `Your TradingView username`
  - Ghi hint: `Exactly as it appears on your TradingView profile — not your email.`

Thiếu field này thì mỗi đơn phải email hỏi lại username. Đó là chỗ rơi khách
nhiều nhất trong cả luồng.

### 2. Nội dung nộp cho Whop review

Whop review ở các mốc: tạo tài khoản, list lên marketplace, đơn đầu, payout đầu.
Mô tả phải khớp với những gì trang landing nói — họ có đọc.

> Smart Money Energizer is a chart analysis indicator for TradingView. It is an
> invite-only Pine Script that draws structure, liquidity and session levels on
> the user's own chart and assigns each setup a 0–100 score from seven
> confluence factors.
>
> It does not connect to a broker, does not hold customer funds, and does not
> place, route or manage any order. It is not a signal service and not a managed
> account. The buyer runs it on their own TradingView account, on their own
> charts, and makes their own decisions.
>
> The script can emit JSON webhook alerts. Those alerts are data — the buyer
> chooses where to route them. Nothing in the product executes a trade.
>
> Delivery: the buyer supplies their TradingView username at checkout, and we
> grant access to the invite-only script on that account, plus access to a
> private Telegram group.

Hai điều **không** được làm trong lúc review:

- Đừng để `proof.shots` / `proof.quotes` có ảnh lãi hay testimonial chưa kiểm
  chứng được. Whop yêu cầu earnings claims phải substantiated, testimonial phải
  phản ánh kết quả thực tế và ghi rõ khi kết quả là ngoại lệ.
- Đừng nhắc tới MT5 Expert Advisor như thứ bán kèm. Đó là sản phẩm riêng, và nó
  *có* thực thi lệnh — trộn vào mô tả là tự đẩy mình sang nhóm khác.

### 4. Nối Telegram VIP

Dùng Telegram integration của Whop trỏ vào nhóm VIP — Whop tự mời khi đơn active
và tự kick khi refund. Không tự phát link mời thủ công: link phát tay không thu
hồi được, refund xong khách vẫn ở trong nhóm.

### 5. Cấp quyền TradingView

Không có API chính thức cho invite-only access, chỉ có UI *Manage access*. Ở
volume hiện tại thì làm tay.

- Đặt post-checkout message trên Whop: **"Access is granted within 12 hours."**
  Đừng để khách tưởng instant rồi đi mở dispute sau 20 phút — dispute rate là
  thứ Whop theo dõi và siết tài khoản.
- Muốn tự động về sau: dùng driver CDP sẵn có trong `D:\ZynAlgo\.deploy\`
  (xem `AGENTS.md` mục 4). Là vùng xám ToS của TradingView, cân nhắc trước khi bật.

### 6. Thay link vào trang

Sửa `lib/site.ts`:

- `links.checkout` — URL plan thật của Whop
- `links.telegramFree`, `links.telegramVip` — vẫn đang `REPLACE_ME`

`cta()` gắn `utm_medium=<vị trí nút>` vào URL. Kiểm Whop có giữ query string
không — trang là export tĩnh, không có analytics, nên UTM đọc ở phía Whop hiện là
cách duy nhất biết nút nào ra đơn.

Banner đỏ ở footer tự tắt khi hết `REPLACE_ME`. Đừng gỡ nó bằng tay.

## Hoàn tiền

Trang hứa 14 ngày, không điều kiện (`pricing.guarantee`). Giữ đúng lời đó: refund
trên Whop sẽ tự thu quyền Telegram, nhưng **quyền TradingView phải tự gỡ tay** —
thêm bước đó vào quy trình, nếu không sẽ tồn một đống người đã hoàn tiền mà vẫn
dùng được script.
