import Icon from './Icons.jsx'
import Reveal from './Reveal.jsx'
import { contact, links } from '../config/site.js'
import './ContactTiles.css'

/**
 * The click-to-call row that sits above the footer. Every tile is an <a>
 * because every one of them is a live action — there is no decorative entry
 * here, which is why the row doubles as the conversion strip on every page.
 *
 *   <ContactTiles />                    on white
 *   <ContactTiles background="surface" />  on the page background
 */
const tiles = [
  { icon: 'phone', label: 'Call the chamber', value: contact.phone.display, href: links.tel },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: contact.whatsapp.display,
    href: links.whatsapp,
    external: true,
  },
  // Omitted entirely when no inbox is configured, rather than shown dead.
  ...(contact.email ? [{ icon: 'mail', label: 'Email', value: contact.email.display, href: links.mailto }] : []),
  {
    icon: 'mapPin',
    label: 'Chamber address',
    value: contact.address.display,
    href: links.maps,
    external: true,
  },
]

export default function ContactTiles({ background = 'white', className = '' }) {
  return (
    <section
      className={`contact-tiles contact-tiles--${background} ${className}`.trim()}
      aria-label="Ways to reach the chamber"
    >
      <div className="container">
        <div className="contact-tiles__grid">
          {tiles.map((tile, i) => (
            <Reveal
              as="a"
              key={tile.label}
              className="contact-tiles__item"
              delay={i * 90}
              href={tile.href}
              {...(tile.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="icon-tile contact-tiles__icon">
                <Icon name={tile.icon} size={26} />
              </span>
              <span className="contact-tiles__text">
                <span className="contact-tiles__label">{tile.label}</span>
                <span className="contact-tiles__value">
                  {tile.value}
                  {tile.external && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
