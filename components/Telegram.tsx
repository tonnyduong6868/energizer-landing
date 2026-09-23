import { community, cta, links } from '@/lib/site'
import { Media } from './Media'
import { SectionHead } from './SectionHead'
import { Check, Dash, Telegram as TgIcon } from './Icon'

/**
 * Hai tầng Telegram — khối chiến lược của cả trang.
 *
 * Hai funnel đem ra đối chiếu chỉ có một cửa: mua hoặc biến mất. Nghĩa là
 * mọi người chưa sẵn sàng trả tiền hôm nay đều mất trắng, không để lại gì.
 * Channel free giữ nhóm đó lại và biến họ thành khán giả — rồi bán sau.
 *
 * Bảng so sánh cố ý lặp lại ba dòng đầu ở CẢ HAI cột thay vì chỉ liệt kê cái
 * thêm ở cột VIP. Thấy rõ "free có thật, không phải mồi nhử" thì tỉ lệ bấm
 * vào cao hơn, và nó cũng đúng.
 *
 * Số member: chỉ hiện khi có số THẬT kèm ngày. DB của ui-ux-pro-max ở pattern
 * `community-forum-landing` ghi thẳng: "Show member and activity counts only
 * when current, verified, and dated". Chưa có thì khối này im lặng.
 */
export function TelegramTiers() {
  const showCount = community.memberCount > 0 && community.asOf !== ''

  return (
    <section className="sec-alt" id="telegram">
      <div className="wrap">
        <SectionHead
          no="05"
          tag="Telegram"
          meta="two doors · one is free"
          title="Watch it work for a week before you spend anything."
          lede={
            <>
              You should not have to trust a sales page. The public channel posts
              sample signals as they fire, with the reasoning behind the score &mdash;
              including the ones that did not work. Join, watch, decide later.
            </>
          }
        />

        <div className="tiers">
          {community.tiers.map((t) => {
            const primary = 'isPrimary' in t && t.isPrimary
            return (
              <div className={`tier${primary ? ' is-primary' : ''}`} key={t.key}>
                <div className="tier-n">{t.name}</div>
                <div className="tier-p">{t.price}</div>
                <p className="tier-s">{t.sub}</p>

                <ul className="tier-rows">
                  {t.rows.map((r) => (
                    <li className={`tier-row${r.has ? '' : ' is-off'}`} key={r.label}>
                      <span style={{ flex: 'none', marginTop: 3 }}>
                        {r.has ? (
                          <Check size={16} title="Included" />
                        ) : (
                          <Dash size={16} title="Not included" />
                        )}
                      </span>
                      <span>{r.label}</span>
                    </li>
                  ))}
                </ul>

                {t.key === 'free' ? (
                  <a
                    className="btn btn-primary btn-block"
                    href={cta(t.href, 'telegram')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TgIcon size={17} />
                    {t.cta}
                  </a>
                ) : (
                  <a className="btn btn-ghost btn-block" href="#pricing" data-cta="telegram">
                    {t.cta}
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* Khối này bảo người đọc "vào xem một tuần rồi hẵng quyết" mà chưa
            cho thấy một bài đăng nào trông ra sao. Channel đã live và public
            nên ô này chụp được ngay, không chờ gate nào. */}
        <Media slot="telegram-signal" gap="var(--s5)" className="shot is-narrow" />

        {showCount && (
          <p className="member-line">
            {community.memberCount.toLocaleString('en-US')} members in the public
            channel as of {community.asOf}.
          </p>
        )}

        <p className="lede" style={{ marginTop: 'var(--s5)', fontSize: 14 }}>
          The VIP group is part of the licence. It is not a monthly add-on, and there
          is no tier above it to be sold later. Link arrives by email when your licence
          goes active &mdash; or ask in the{' '}
          <a href={links.support} style={{ color: 'var(--chg)' }}>
            free channel
          </a>{' '}
          if it does not.
        </p>
      </div>
    </section>
  )
}
