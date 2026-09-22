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

## Tài khoản và ID thật

| Thứ | Giá trị |
|---|---|
| Business | `Tonny` — `biz_Lw9wcksNcymj8n` |
| Store slug | `tonny-f2cd` (auto sinh, xấu — đổi được ở Settings) |
| Product | `Smart Money Energizer` — `prod_VHwQkeR9slUqI` |
| Product slug | `smart-money-energizer` |

## Việc phải làm trước khi mở bán

### 1. Tạo product + plan — ĐÃ XONG 22/09/2026

- Plan: **one-time, $97 USD**
- **Auto-expire access: 1095 ngày (3 năm)** — Whop chỉ có preset tới "After one
  year", phải chọn *Custom days*. Con số này phải khớp `TERM_YEARS` trong
  `lib/site.ts`. Lệch nhau là mô tả sai, Whop gỡ listing.
- **Ask questions before checkout: bật, bắt buộc (ô `Optional` để trống)**
  - Title: `Your TradingView username`
  - Placeholder: `Exactly as on your TradingView profile — not your email`
- Purchase button text: `Get access`

Thiếu field username thì mỗi đơn phải email hỏi lại. Đó là chỗ rơi khách nhiều
nhất trong cả luồng.

#### Ba mặc định của Whop đã TẮT — đừng vô tình bật lại

Whop bật sẵn ba thứ khi tạo product, cả ba đều ngược với cách trang landing được
dựng:

- **Show discount 20%** (Product settings → Growth tools). Nó tự vẽ giá gạch
  `$121.25` cạnh `$97` — một mức giá chưa từng bán. Trang landing để
  `pricing.anchor: null` đúng vì lý do này (FTC Act §5, EU UCPD Annex I về giá
  tham chiếu bịa).
- **Show member count**. Đang 0 người; hiện ra chỉ hại.
- **Affiliate rate 30%**. Mặc định này ăn $29.10/đơn. Cộng ~6% phí Whop thì $97
  chỉ còn ~$61. Bật lại chỉ khi thực sự muốn chạy affiliate, và tự chọn mức.

### 2. Nội dung nộp cho Whop review — ĐÃ XONG 22/09/2026

Whop review ở các mốc: tạo tài khoản, list lên marketplace, đơn đầu, payout đầu.
Mô tả phải khớp với những gì trang landing nói — họ có đọc.

#### Bẫy: ô description tối đa 1500 ký tự, và UI nuốt lỗi

Server trả `422 unprocessable_entity` — *"Shortened description is too long
(maximum is 1500 characters)"* — nhưng dashboard **không hiện toast gì cả**. Bấm
Save trông y như thành công, nội dung không đổi. Bản đầu dài 1592 ký tự nên mất
ba lượt mới tìm ra. Đếm ký tự trước khi dán.

Hai mẹo kiểm chứng, vì đọc `textarea.value` sau reload luôn ra 0 (editor chưa
hydrate — đừng kết luận save hỏng từ đó):

- Sự thật duy nhất là trang public `https://whop.com/tonny-f2cd/smart-money-energizer/`,
  fetch rồi tìm chuỗi.
- Gõ vào textarea bằng `mcp__comet__fill` **không vào state React**. Dùng native
  setter + dispatch `input`/`change` (`AGENTS.md` mục 4). Nhanh hơn `type_text`
  rất nhiều — 1700 ký tự gõ phím quá 120 giây.

Khi UI không chịu bắn mutation nữa thì phát lại thẳng
`POST /api/graphql/coreCreateOrUpdateAccessPass` bằng `fetch` trong tab đang đăng
nhập. Đây là mutation **duy nhất** lưu cả accessPass lẫn plans. Header bắt buộc:
`x-whop-id: biz_…`, `x-whop-force-new-permission-system: true`,
`x-whop-app-name: web`, `x-whop-api-proxy-key: test`. Bắt payload thật từ tab
DevTools một lần rồi chỉ đổi field cần đổi — gửi thiếu field là xoá field đó.

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
> Access period: 3 years from activation, one-time payment, no renewal.
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

### 3. Hai tầng Telegram

**Tầng free — channel + discussion group.** Chốt 22/09/2026. Telegram **không
chuyển group thành channel được** (cũng không có chiều ngược lại); thứ duy nhất
nó tự chuyển là group thường → supergroup. Nên cấu trúc là:

```
[Channel công khai: Energizer]   ← landing trỏ vào đây
  tín hiệu mẫu · chart breakdown · release notes · chỉ admin đăng
        │ Discussion group
        ▼
[Only trade Nasdaq — 133 người]  ← giữ nguyên, mỗi bài mở 1 luồng chat
```

Được cả ba: giữ 133 người sẵn có, khách lạ vào thấy nội dung sạch chứ không
rơi giữa một cuộc chat đang dở, và chữ "channel" đang nằm ở 13 chỗ trong
`components/` thành đúng nghĩa — khỏi sửa copy.

Channel đã tạo và đã Public 22/09/2026: **Energizer Signals**, `-1003474460136`,
`https://t.me/Energizer_SignalsBot`. Link vĩnh viễn, không revoke được, search
ra được — đã thay cho invite link `t.me/+…` ban đầu.

**Username kết thúc bằng "Bot" nhưng đây là channel, không phải bot.** Kiểm
bằng `t.me/s/<username>`: chỉ channel công khai mới render được trang đó (trang
bot thì không). Hệ quả cho code: `TELEGRAM_IS_BOT` trong `lib/site.ts` phải giữ
`false` — `?start=` chỉ có tác dụng với bot thật.

Tên này gây hiểu nhầm: khách thấy `@…Bot` sẽ tưởng là bot để nhắn tin. Đổi
username không mất gì, tên cũ được thả ra. Dò lại 22/09/2026, còn trống:
`energizersignals` · `smartmoneyenergizer` · `smenergizer` · `energizerscore` ·
`theenergizer` · `energizerhq`.

Cách dò: fetch `https://t.me/<name>` rồi tìm class `tgme_page_title`. Có class
đó là đã có người lấy. Kiểm lại phương pháp bằng `durov` và `telegram` trước
khi tin kết quả "trống" — trang rỗng và trang lỗi nhìn giống nhau.

Lưu ý tên nhóm `Only trade Nasdaq` lệch với lời hứa "any chart, any symbol" của
trang. Channel mới nên đặt tên theo sản phẩm, không theo một thị trường.

**Tầng VIP.**

Dùng Telegram integration của Whop trỏ vào nhóm VIP — Whop tự mời khi đơn active
và tự kick khi refund. Không tự phát link mời thủ công: link phát tay không thu
hồi được, refund xong khách vẫn ở trong nhóm.

### 4. Cấp quyền TradingView

Không có API chính thức cho invite-only access, chỉ có UI *Manage access*. Ở
volume hiện tại thì làm tay.

- Đặt post-checkout message trên Whop: **"Access is granted within 12 hours."**
  Đừng để khách tưởng instant rồi đi mở dispute sau 20 phút — dispute rate là
  thứ Whop theo dõi và siết tài khoản.
- Muốn tự động về sau: dùng driver CDP sẵn có trong `D:\ZynAlgo\.deploy\`
  (xem `AGENTS.md` mục 4). Là vùng xám ToS của TradingView, cân nhắc trước khi bật.

### 5. Thay link vào trang

`links.checkout` trong `lib/site.ts` đã trỏ vào
`https://whop.com/tonny-f2cd/smart-money-energizer/` (22/09/2026). Đã kiểm: Whop
**giữ nguyên query string**, không redirect, không cắt — nên `utm_medium=<vị trí
nút>` do `cta()` gắn vào đọc được ở phía Whop. Trang là export tĩnh, không có
analytics, nên đó là cách duy nhất biết nút nào ra đơn.

`tonny-f2cd` là store slug auto sinh. Đổi nó ở Settings là link trên trang chết —
sửa cả hai cùng lúc.

`links.telegramFree` đã trỏ channel công khai `https://t.me/Energizer_SignalsBot`.
Còn `links.telegramVip` vẫn đang `REPLACE_ME`.

Banner đỏ ở footer tự tắt khi hết `REPLACE_ME`. Đừng gỡ nó bằng tay.

## Hoàn tiền

Trang hứa 14 ngày, không điều kiện (`pricing.guarantee`). Giữ đúng lời đó: refund
trên Whop sẽ tự thu quyền Telegram, nhưng **quyền TradingView phải tự gỡ tay** —
thêm bước đó vào quy trình, nếu không sẽ tồn một đống người đã hoàn tiền mà vẫn
dùng được script.

Seller Terms: refund hợp lệ được hoàn **nguyên giá, kể cả phần phí Whop đã thu** —
tức mỗi đơn bị hoàn là anh mất luôn ~$6 phí của đơn đó. Và chargeback thì anh chịu
toàn bộ chi phí. Dispute rate cao dẫn tới reserve và siết tài khoản, nên thà hoàn
tiền sớm và gọn còn hơn để khách đi khiếu nại ngân hàng.

## Còn treo

- `links.telegramVip` vẫn là `REPLACE_ME` — phải có nhóm VIP thật (group mới,
  rỗng, Whop là admin) trước, rồi mới nối được integration ở mục 3.
- Đổi username channel cho khỏi bị tưởng là bot — xem danh sách còn trống ở mục 3.
  Đổi xong nhớ sửa `links.telegramFree` cùng lúc, link cũ chết ngay.
- Chưa đặt post-checkout message **"Access is granted within 12 hours."**
- Chưa quyết có bật Tax and remittance (+2%) hay không. Dashboard đang nhắc
  *"Add your VAT registrations"* cho UK/EU — phụ thuộc tệp khách thật.
- Store slug `tonny-f2cd` auto sinh, đổi được ở Settings. Đổi thì sửa luôn
  `links.checkout`.
