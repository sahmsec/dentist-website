import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons.jsx'
import Logo, { LogoMark } from './Logo.jsx'
import Reveal from './Reveal.jsx'
import ContactTiles from './ContactTiles.jsx'
import { CallButton } from './Button.jsx'
import { about, contact, hours, identity, links, nav, services, social } from '../config/site.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const columnsOpen = useMinWidth('(min-width: 768px)')

  return (
    <footer className="footer">
      <ContactTiles />

      <div className="footer__main on-dark">
        <span className="footer__watermark" aria-hidden="true">
          <LogoMark size={420} tone="light" />
        </span>

        <div className="container">
          <div className="footer__cols">
            <Reveal className="footer__col footer__col--brand">
              <Logo tone="light" />
              <p className="footer__tagline">{identity.tagline}</p>
              {/* Composed from config rather than written here, so the practice
                  description only ever lives in one place. Desktop only — on a
                  phone the footer has to earn every line it takes. */}
              <p className="footer__blurb">
                {identity.title} in {contact.address.line2}. {about.lede}
              </p>
              <ul className="footer__social">
                {social.map((channel) => (
                  <li key={channel.name}>
                    <a
                      className="icon-circle icon-circle--sm footer__social-link"
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${identity.shortName} on ${channel.name}`}
                    >
                      <Icon name={channel.icon} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <FooterNav id="footer-explore" title="Explore" open={columnsOpen} delay={90}>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </FooterNav>

            <FooterNav id="footer-treatments" title="Treatments" open={columnsOpen} delay={180}>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to="/services">{service.title}</Link>
                </li>
              ))}
            </FooterNav>

            {/* Hours never collapse: on a phone "is he open right now" is one of
                the three things anyone came here to find out. */}
            <Reveal className="footer__col footer__col--hours" delay={270}>
              <h2 className="footer__heading">Chamber hours</h2>
              <ul className="footer__hours">
                {hours.rows.map((row) => (
                  <li key={row.days}>
                    <span className="footer__hours-days">{row.days}</span>
                    <span className="footer__hours-time">{row.time}</span>
                  </li>
                ))}
              </ul>
              <p className="footer__emergency">
                <Icon name="clock" size={17} />
                {hours.emergencyNote}
              </p>
              <CallButton size="sm" />
            </Reveal>
          </div>

          <div className="footer__bottom">
            <div className="footer__legal">
              <p className="footer__copy">
                © {year} {identity.name}. All rights reserved.
              </p>
              <p className="footer__credit">
                Developed by{' '}
                <a
                  href="https://sahmsec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @sahmsec
                </a>
              </p>
            </div>
            <a
              className="footer__address"
              href={links.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="mapPin" size={17} />
              {contact.address.display}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * A link column. On a phone it is a real <details> — closed, and openable with
 * no JavaScript involved. From 768px up it is the plain column it has always
 * been: the CSS forces the panel open and drops the chevron.
 */
function FooterNav({ id, title, open, delay, children }) {
  return (
    <Reveal as="nav" className="footer__col" delay={delay} aria-labelledby={id}>
      <details className="footer__acc" open={open || undefined}>
        {/* Forced open, a click would still toggle the element shut behind
            React's back — so above the breakpoint the summary stops being a
            control at all. */}
        <summary
          className="footer__acc-summary"
          onClick={(e) => open && e.preventDefault()}
        >
          <h2 className="footer__heading" id={id}>
            {title}
          </h2>
          <Icon name="chevronDown" size={18} className="footer__acc-chev" />
        </summary>
        <ul className="footer__links">{children}</ul>
      </details>
    </Reveal>
  )
}

/**
 * Matches a media query. The stylesheet already forces the accordions open on
 * desktop, so this is the belt to that pair of braces — it also pins the `open`
 * attribute for browsers that do not support ::details-content yet, where a
 * CSS-only rule would leave the columns collapsed on a 1440px screen.
 *
 * Below the breakpoint it returns false and the caller passes `undefined`, so
 * React leaves the element uncontrolled and the visitor's taps stick.
 */
function useMinWidth(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
