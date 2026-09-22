# Smart Money Energizer — landing

Trang bán [Smart Money Energizer v1.1](https://tonnyduong6868.github.io/energizer-landing/), indicator Pine v6 cho TradingView.

Next.js 16, `output: 'export'` — build ra HTML tĩnh, không cần server. Toàn bộ trang là Server Component, không có `'use client'` ở đâu, nên mọi chữ khách đọc đều nằm sẵn trong HTML gốc.

---

## Còn phải điền trước khi chạy quảng cáo

Trang tự in một banner đỏ ở footer khi mấy chỗ này chưa xong. **Đừng gỡ banner đó** — nó là cái chốt duy nhất chặn việc vô tình đẩy link chết ra quảng cáo.

| Sửa ở | Đang là | Cần |
|---|---|---|
| `lib/site.ts` → `links.telegramFree` | `REPLACE_ME_free_channel` | link channel Telegram công khai |
| `lib/site.ts` → `links.telegramVip` | `REPLACE_ME_vip_group` | link group VIP |
| `lib/site.ts` → `links.checkout` | `REPLACE_ME_energizer_checkout` | trang thanh toán Stripe/GHL |
| `lib/site.ts` → `proof.shots` | `[]` | ảnh chart thật, bỏ vào `public/assets/shots/`, khai kèm `w`/`h` |
| `lib/site.ts` → `proof.quotes` | `[]` | testimonial thật, tối đa 6 |
| `lib/site.ts` → `community.memberCount` | `0` | số member thật + `asOf` là ngày đọc số |

Mảng nào để rỗng thì component tự ẩn khối đó. Trang vẫn chạy đúng khi chưa điền gì — đó là cách để không bao giờ lỡ ship social proof bịa.

---

## Luật của repo này

1. **`lib/site.ts` là nguồn sự thật duy nhất.** Mọi con số và mọi câu khách đọc nằm ở đó; component chỉ lo cách bày. Đổi giá hay đổi link thì sửa đúng một chỗ.
2. **Không con số nào được viết ra nếu không truy được về nguồn.** Thông số kỹ thuật đọc thẳng từ `Smart Money Energizer v1.1.pine`, có ghi số dòng trong comment.
3. **Không đếm ngược, không "còn 3 suất", không toast "ai đó vừa mua".** Không phải vì khó làm — vì nó là rủi ro pháp lý (FTC Act §5, EU UCPD Annex I).
4. **Ảnh phải khai `width`/`height`.** Thiếu là layout nhảy khi ảnh tải xong.

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

`scripts/deploy.mjs` lo phần còn lại. Hai thứ nó làm mà dễ quên nếu đẩy tay:

- Tạo `.nojekyll`. Không có file này thì Jekyll nuốt sạch thư mục `_next/` (tên bắt đầu bằng gạch dưới) và trang lên sóng không có CSS lẫn JS.
- Giữ `basePath` `/energizer-landing/`. Pages phục vụ site trong thư mục con nên bỏ basePath là mọi asset 404. Gắn tên miền riêng thì build lại với `NEXT_PUBLIC_BASE_PATH="" npm run build`.

## QA trước khi đẩy

Bộ script ở `D:\ZynAlgo\.deploy\lp-*.mjs` lái Comet qua CDP để soi trang. Luôn soi **bản production** dựng từ `out/`, không soi `next dev` — overlay của dev đè lên sticky CTA và báo hydration mismatch giả do extension trình duyệt.
