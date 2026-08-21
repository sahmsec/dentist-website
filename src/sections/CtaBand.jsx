import { CallButton, WhatsAppButton } from '../components/Button.jsx'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { contact, links } from '../config/site.js'
import './CtaBand.css'

const AVATARS = [1, 2, 3]
const STARS = [0, 1, 2, 3, 4]

export default function CtaBand() {
  return (
    <section className="cta-band">
      {/* Edge to edge with the deep bottom curve, like every other band on the
          page; the container inside keeps the copy on the shared grid. */}
      <div className="cta-band__band band band--accent">
        <svg className="cta-band__watermark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 9.5c-3-2-6.2-2.7-8.9-2.1-3.5.8-5.7 3.5-6 7.2-.3 3.7.6 6.6 1.5 9.6.7 2.5 1 5 1.2 7.6.2 2.6.7 4.5 1.6 5.7.9 1.2 2.3 1.1 3.1.2.9-1 1.5-2.9 1.9-5.3.4-2.4.8-4.1 1.6-4.8.8-.7 2.2-.7 3 0 .8.7 1.2 2.4 1.6 4.8.4 2.4 1 4.3 1.9 5.3.8.9 2.2 1 3.1-.2.9-1.2 1.4-3.1 1.6-5.7.2-2.6.5-5.1 1.2-7.6.9-3 1.8-5.9 1.5-9.6-.3-3.7-2.5-6.4-6-7.2-2.7-.6-5.9.1-8.9 2.1Z" />
            <path d="M13.6 15.4c.2-2.3 1.6-3.8 3.9-4.2" />
            <path d="M24 13.8v8.4" />
          </g>
        </svg>

        <Reveal className="container cta-band__inner">
          {/* Decorative — the rating and the line beneath it carry the meaning,
              so the stack itself is kept out of the accessibility tree. */}
          <div className="cta-band__rating">
            <div className="cta-band__avatars" aria-hidden="true">
              {AVATARS.map((n) => (
                <Photo
                  key={n}
                  className="cta-band__avatar"
                  src={`patient-${n}.jpg`}
                  alt="Patient of the chamber"
                  shape="circle"
                  ratio="1"
                />
              ))}
            </div>

            <p className="cta-band__score">
              <span className="cta-band__score-value">4.9</span>
              <span className="cta-band__stars" role="img" aria-label="Rated 4.9 out of 5">
                {STARS.map((s) => (
                  <Icon key={s} name="star" size={16} />
                ))}
              </span>
            </p>

            <p className="cta-band__note">Rated by patients across Shyamoli</p>
          </div>

          <div className="cta-band__message">
            <p className="cta-band__eyebrow">Your comfort comes first</p>
            <h2 className="cta-band__title">Let us make your smile your best feature</h2>
          </div>

          <div className="cta-band__actions">
            <CallButton variant="navy" label="Book an appointment" />
            <WhatsAppButton variant="white" size="sm" />
            <a className="cta-band__phone" href={links.tel}>
              {contact.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
