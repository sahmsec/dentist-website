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
                  description only ever lives in one place. */}
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

            <Reveal as="nav" className="footer__col" delay={90} aria-labelledby="footer-explore">
              <h2 className="footer__heading" id="footer-explore">
                Explore
              </h2>
              <ul className="footer__links">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="nav" className="footer__col" delay={180} aria-labelledby="footer-treatments">
              <h2 className="footer__heading" id="footer-treatments">
                Treatments
              </h2>
              <ul className="footer__links">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link to="/services">{service.title}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>

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
            <p className="footer__copy">
              © {year} {identity.name}. All rights reserved.
            </p>
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
