import usePageMeta from '../lib/usePageMeta.js'
import PageTitle from '../components/PageTitle.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ContactTiles from '../components/ContactTiles.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import Button, { CallButton, WhatsAppButton } from '../components/Button.jsx'
import { contact, hours, identity, links } from '../config/site.js'
import './Contact.css'

/* Three ways to reach the chamber, in the order the practice prefers them. */
const channels = [
  {
    icon: 'phone',
    label: 'Call the chamber',
    value: contact.phone.display,
    href: links.tel,
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: contact.whatsapp.display,
    href: links.whatsapp,
    external: true,
  },
  // Only listed when a real inbox exists; see contact.email in site.js.
  ...(contact.email
    ? [{ icon: 'mail', label: 'Email', value: contact.email.display, href: links.mailto }]
    : []),
]

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description: `Call ${contact.phone.display} to book with ${identity.name}. Chamber at ${contact.address.display}. Appointments are taken by phone and WhatsApp.`,
    path: '/contact',
  })

  return (
    <>
      {/* The reception is the subject here, not a texture, and the band's own
          4.2:1 crop cut the desk off the bottom of it — so the whole
          photograph is fitted into the band instead. */}
      <PageTitle title="Contact" breadcrumb="Contact" image="titlebar-contact.jpg" whole />

      <section className="section contact-reach">
        <div className="container contact-reach__grid">
          <div className="contact-reach__intro">
            <SectionHead
              eyebrow="Get in touch"
              title="Reach out for the best treatment"
              highlight={['best']}
              text="Appointments are taken by phone — it is faster than a form and you speak to someone who can actually find you a slot."
            />

            <Reveal className="contact-reach__dial" delay={120}>
              <p className="contact-reach__dial-label">{contact.phone.label}</p>

              <a className="contact-reach__number" href={links.tel}>
                <span className="icon-circle icon-circle--accent contact-reach__number-icon">
                  <Icon name="phone" size={22} />
                </span>
                {contact.phone.display}
              </a>

              <div className="row contact-reach__actions">
                <CallButton />
                <WhatsAppButton />
              </div>
            </Reveal>
          </div>

          <ul className="contact-reach__cards">
            {channels.map((channel, i) => (
              <li key={channel.label}>
                <Reveal
                  as="a"
                  className="card contact-card"
                  delay={i * 90}
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className="icon-circle contact-card__icon">
                    <Icon name={channel.icon} size={24} />
                  </span>
                  <h3 className="contact-card__label">{channel.label}</h3>
                  <span className="contact-card__value">
                    {channel.value}
                    {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white section--curve-bottom contact-detail">
        <div className="container contact-detail__grid">
          <Reveal className="card contact-hours">
            <span className="icon-circle contact-hours__icon">
              <Icon name="clock" size={24} />
            </span>

            <h2 className="contact-hours__title">Chamber hours</h2>

            <ul className="contact-hours__rows">
              {hours.rows.map((row) => (
                <li key={row.days} className="contact-hours__row">
                  <span className="contact-hours__days">{row.days}</span>
                  <span className="contact-hours__time">{row.time}</span>
                </li>
              ))}
            </ul>

            <p className="contact-hours__note">
              <Icon name="phone" size={17} />
              {hours.emergencyNote}
            </p>

            <div className="contact-hours__address">
              <span className="icon-circle icon-circle--sm contact-hours__address-icon">
                <Icon name="mapPin" size={18} />
              </span>
              <address className="contact-hours__address-text">
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.country}
              </address>
            </div>

            <Button href={links.maps} variant="ghost" size="sm" icon="mapPin">
              Get directions
            </Button>
          </Reveal>

          <Reveal className="contact-map" delay={120}>
            <iframe
              src={contact.address.embedUrl}
              title="Map showing the chamber location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="100%"
            />
          </Reveal>
        </div>
      </section>

      <ContactTiles background="surface" />
    </>
  )
}
