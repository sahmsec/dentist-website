import usePageMeta from '../lib/usePageMeta.js'
import PageTitle from '../components/PageTitle.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import Button, { CallButton, WhatsAppButton } from '../components/Button.jsx'
import { contact, hours, identity, links } from '../config/site.js'
import './Contact.css'

/**
 * The number is printed once here, and once is the point: it was on screen
 * eight times. The channel cards restated the dial panel beside them, the page
 * added a tile strip the footer already renders under every page, and both
 * listed WhatsApp on the same digits as the phone.
 *
 * What is left is the number, two ways to start, when the chamber is open, and
 * where it is.
 */

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

          {/* Hours sit beside the number rather than in a section below it:
              "can I ring them now" is the same question as "what do I ring". */}
          <Reveal className="card contact-hours" delay={90}>
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
          </Reveal>
        </div>
      </section>

      {/* Full width, now the hours have moved up. The map is the one thing on
          this page worth being large — it is the only answer here a visitor
          cannot get from the header. */}
      <section className="section section--white section--curve-bottom contact-where">
        <div className="container">
          <Reveal className="contact-where__head">
            <div className="contact-where__place">
              <p className="eyebrow">Where to find us</p>
              <address className="contact-where__address">
                {contact.address.line1}, {contact.address.line2}
              </address>
            </div>

            <Button href={links.maps} variant="navy" size="sm" icon="mapPin">
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
    </>
  )
}
