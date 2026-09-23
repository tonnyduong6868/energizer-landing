# Smart Money Energizer — landing

Trang bán [Smart Money Energizer v1.2](https://tonnyduong6868.github.io/energizer-landing/), indicator Pine v6 cho TradingView.

> Số phiên bản ở đây, ở `site.version`, ở mọi chú thích "Nguồn:" trong `lib/site.ts` và ở `og.png` phải trỏ về **cùng một file `.pine`**. Đã lệch một lần: trang bán v1.2 trong khi `specs` còn in số dòng của v1.1 và thẻ OG còn ghi "v1.1". Đổi phiên bản là quét lại cả bốn chỗ — `og.png` thì đã tự đọc `site.version` nên chỉ cần chạy lại `node scripts/make-assets.mjs`.

Next.js 16, `output: 'export'` — build ra HTML tĩnh, không cần server. Toàn bộ trang là Server Component, không có `'use client'` ở đâu, nên mọi chữ khách đọc đều nằm sẵn trong HTML gốc.

---

## Còn phải điền trước khi chạy quảng cáo

Chạy `npm run dev` thì footer tự in một banner đỏ liệt kê những chỗ chưa xong. **Đừng gỡ banner đó** — nó là cái chốt duy nhất chặn việc vô tình đẩy link chết ra quảng cáo. Banner nằm sau `showDevWarnings` nên **không hiện trên bản production**: muốn biết còn `REPLACE_ME` hay không thì đọc `lib/site.ts`, đừng nhìn trang live.

| Sửa ở | Đang là | Cần |
|---|---|---|
| `lib/site.ts` → `links.telegramVip` | `REPLACE_ME_vip_group` | link group VIP — **group mới, rỗng**, Whop là admin |
| `lib/site.ts` → `media` | 5/10 ô còn `fill: null` | ảnh/video thật vào `public/assets/`, khai kèm `w`/`h` đo từ file |
| `lib/site.ts` → `proof.quotes` | `[]` | testimonial thật, tối đa 6 |
| `lib/site.ts` → `community.memberCount` | `0` | số member thật + `asOf` là ngày đọc số |
| `lib/site.ts` → `analytics.provider` | `'none'` | chọn `plausible`/`umami`/`cloudflare` — chưa chọn là bán mù |

Đã xong (22/09/2026): `links.checkout` trỏ Whop thật, `links.telegramFree` trỏ channel công khai `Energizer Signals` (`t.me/Energizer_SignalsBot`).

**Username kết thúc bằng "Bot" nhưng đó là channel, không phải bot.** Kiểm bằng `t.me/s/<username>` — chỉ channel công khai mới render trang đó. Hệ quả: `TELEGRAM_IS_BOT` trong `lib/site.ts` phải giữ `false`, vì `?start=` chỉ có tác dụng với bot thật. Đổi username sang tên không có chữ "Bot" thì sửa `links.telegramFree` cùng lúc — link cũ chết ngay.

Mảng nào để rỗng thì component tự ẩn khối đó. Trang vẫn chạy đúng khi chưa điền gì — đó là cách để không bao giờ lỡ ship social proof bịa.

### Năm ô `media` còn rỗng

Ô media có **tên**, không đánh số — `<Media slot="pain-chop" />`. Trước đây là `proof.shots[0..n]`, và khi Hero đổi sang video thì ảnh ở `[0]` trôi sang nhầm khối mà build vẫn xanh. Thêm chỗ đặt ảnh mới = thêm một khoá trong `media`, TypeScript chặn nếu gõ sai tên.

| Ô | Cần gì | Chặn ở |
|---|---|---|
| `density-move` | video 8–12s kéo Chart Density từ Clean lên Full rồi về, **cùng chart cùng khung giờ** | không gì — **đây là tài sản thuyết phục nhất còn thiếu của cả trang** |
| `pain-chop` | vùng đi ngang, sideway lockout bật, panel đứng im khi giá quét hai chiều | không gì |
| `telegram-signal` | một bài trong channel free, kèm lý do chấm điểm + một bài tín hiệu trượt | không gì — channel đã public |
| `honest-source` | Pine Editor mở khối changelog v1.2, **chụp cả số dòng** | không gì |
| `pricing-delivery` | mục Invite-only scripts của TradingView có Energizer trong đó | **Gate 1** — chưa publish thì chưa có ảnh thật, và dựng ảnh giả cho mục này đúng nghĩa là quảng cáo sai |

Ô rỗng in `brief` ra làm phiếu nhắc việc và chỉ ở dev.

---

## Luật của repo này

1. **`lib/site.ts` là nguồn sự thật duy nhất.** Mọi con số và mọi câu khách đọc nằm ở đó; component chỉ lo cách bày. Đổi giá hay đổi link thì sửa đúng một chỗ.
2. **Không con số nào được viết ra nếu không truy được về nguồn.** Thông số kỹ thuật đọc thẳng từ `Smart Money Energizer v1.2.pine`, có ghi số dòng trong comment. Số dòng dịch theo từng bản — đổi phiên bản là quét lại mọi chú thích "Nguồn:".
3. **Không "còn 3 suất", không toast "ai đó vừa mua", không giá neo gạch ngang** (`pricing.anchor` là `null` vì sản phẩm chưa bán ngày nào ở mức khác). Không phải vì khó làm — vì nó là rủi ro pháp lý (FTC Act §5, EU UCPD Annex I).
4. **Đồng hồ đếm ngược: có đúng một kiểu.** Nó đếm tới `promo.launch.deadlineUtc`, một mốc có thật mà tới ngày đó giá **sẽ tăng lên $147 thật**; về 0 là trang tự gỡ cả phần giảm giá xuống, không đứng ở 00:00:00, không quay vòng. `launch.confirmed`/`crypto.confirmed` là chữ ký xác nhận mốc đó đã chốt — cả hai đang `true`. Quyết định không tăng giá nữa thì **tắt banner TRƯỚC ngày đó**, đừng để nó trôi qua.
5. **Ảnh phải khai `width`/`height`, và khai ĐÚNG.** Thiếu là layout nhảy khi ảnh tải xong; khai sai thì cũng nhảy y hệt mà lại không nhìn ra — đã dính đúng một lần (`h: 362` cho một ảnh cao 342). `scripts/deploy.mjs` §3 đọc header từng file ảnh trong `out/` và chặn bản build nào khai lệch.

---

## Chạy

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # xuất ra out/
```

## Deploy lên GitHub Pages

Pages đang lấy nhánh `gh-pages`, thư mục gốc. Token `gh` hiện thiếu scope `workflow` nên **không dùng GitHub Actions** — build tay rồi đẩy `out/` lên nhánh đó:

```bash
npm run build
npm run deploy
```

`scripts/deploy.mjs` lo phần còn lại. Những thứ nó làm mà đẩy tay rất dễ quên:

- Tạo `.nojekyll`. Không có file này thì Jekyll nuốt sạch thư mục `_next/` (tên bắt đầu bằng gạch dưới) và trang lên sóng không có CSS lẫn JS.
- Giữ `basePath` `/energizer-landing/`. Pages phục vụ site trong thư mục con nên bỏ basePath là mọi asset 404. Gắn tên miền riêng thì build lại với `NEXT_PUBLIC_BASE_PATH="" npm run build`.
- Chặn ghi chú nội bộ rò ra: quét MỌI `.html` sắp đẩy, hỏng nếu còn dấu `devwarn` **hoặc** còn bất kỳ ký tự tiếng Việt nào. Đã thủng hai lần nên có hai lưới — lưới tiếng Việt là lưới thật, vì nó không cần ai nhớ gắn dấu.
- Đối chiếu `width`/`height` của mọi `<img>`/`<video>` với header của chính file ảnh trong `out/`.
- Gỡ route chỉ-để-nghịch (`/dock/`) khỏi bản đẩy — xem `DEV_ONLY_ROUTES`.

Script cũng từ chối chạy khi cây làm việc còn thay đổi chưa commit: commit `gh-pages` ghi SHA của source sinh ra nó, cây bẩn thì cái SHA đó nói dối.

## QA trước khi đẩy

Bộ script ở `D:\Energizer\qa-landing\lp-*.mjs` lái Comet qua CDP để soi trang. Luôn soi **bản production** dựng từ `out/`, không soi `next dev` — overlay của dev đè lên sticky CTA và báo hydration mismatch giả do extension trình duyệt.

```bash
npm run build
npx serve out -l 4180            # hoặc bất cứ static server nào
node ../qa-landing/lp-field.mjs    http://127.0.0.1:4180/energizer-landing/   # nền động: chạm=0
node ../qa-landing/lp-contrast.mjs http://127.0.0.1:4180/energizer-landing/   # tương phản: rớt=0
```

Hai script hỏi hai câu khác nhau và **không thay thế được cho nhau**: `lp-field.mjs` hỏi *nền động có phủ lên chữ không* (nó coi field là trắng tinh), `lp-contrast.mjs` hỏi *chữ trên nền tĩnh có đủ tương phản WCAG AA không* (nó gỡ hẳn field ra trước khi đo). Trộn vào một phép đo thì một dòng rớt mà không biết phải sửa màu hay sửa mask.

Cả hai đều in tiêu chí đậu và trả exit code, nên cắm vào script được. Nền tĩnh hiện ở `rớt=0` cho cả 1512px lẫn 390px — đổi `--ink-3`, `--tile*` hay nền khối promo thì chạy lại.
