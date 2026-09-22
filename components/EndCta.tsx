import { cta, links, pricing } from '@/lib/site'
import { Telegram } from './Icon'

/**
 * CTA cuối, vẫn kép.
 *
 * Giữ nguyên thứ tự của hero: cửa free trước, cửa trả tiền sau. Người đọc
 * tới được đây mà chưa bấm mua thì gần như chắc chắn chưa sẵn sàng trả tiền
 * hôm nay — ép thêm một nút mua nữa không đổi được điều đó, nhưng một nút
 * vào channel thì giữ được họ.
 */
export function EndCta() {
  return (
    <section className="endcta">
      <div className="wrap">
        <h2>You do not have to believe any of this.</h2>
        <p>
          Join the channel. Watch the engine score setups in public for a week &mdash;
          the ones that worked and the ones that did not. If it earns the {pricing.symbol}
          {pricing.amount}, it will be obvious. If it does not, you spent nothing.
        </p>

        <div className="endcta-row">
          <a
            className="btn btn-primary btn-lg"
            href={cta(links.telegramFree, 'endcta')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram size={18} />
            Join the free channel
          </a>
          <a className="btn btn-ghost btn-lg" href={cta(links.checkout, 'endcta')}>
            Get the licence · {pricing.symbol}
            {pricing.amount}
          </a>
        </div>
      </div>
    </section>
  )
}
