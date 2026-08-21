import Icon from '../components/Icons.jsx'
import Reveal from '../components/Reveal.jsx'
import { CallButton } from '../components/Button.jsx'
import { LogoMark } from '../components/Logo.jsx'
import { contact, pillars } from '../config/site.js'
import './Pillars.css'

export default function Pillars() {
  return (
    <section className="pillars" aria-labelledby="pillars-title">
      {/* The band breaks out of the container so it runs edge to edge and its
          deep bottom curve reads; the copy inside stays on the shared grid. */}
      <div className="pillars__band band band--accent">
        <div className="container pillars__inner">
          <Reveal className="pillars__intro">
            <h2 className="pillars__title" id="pillars-title">
              Your dental health is our passion
            </h2>
            <p className="pillars__sub">Let us make your smile your best feature.</p>
            <CallButton variant="navy" label={`Call ${contact.phone.display}`} />
          </Reveal>

          <ul className="pillars__list">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} className="pillars__item" delay={i * 90}>
                <span className="icon-circle">
                  <Icon name={p.icon} size={26} />
                </span>
                <h3 className="pillars__item-title">{p.title}</h3>
                <p className="pillars__item-text">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <span className="pillars__watermark" aria-hidden="true">
          <LogoMark size={260} />
        </span>
      </div>
    </section>
  )
}
