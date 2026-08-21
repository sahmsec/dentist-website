import { Link } from 'react-router-dom'
import { services } from '../config/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import './ServicesGrid.css'

/**
 * The treatment grid. Pass `limit` to show a teaser row on Home; leave it off
 * and the whole list renders, which is what the Services page wants.
 */
export default function ServicesGrid({ limit }) {
  const shown = limit ? services.slice(0, limit) : services

  // The aside link only earns its place when the grid is holding some back.
  const hasMore = shown.length < services.length

  return (
    <section className="section services-grid">
      <div className="container">
        <SectionHead
          className="services-grid__head"
          align="split"
          eyebrow="What I treat"
          title="Practice areas and expertise"
          text="Everything from a routine scaling to full implant work, carried out in one chamber in Shyamoli — each treatment planned, explained and costed before anything begins."
        >
          {hasMore && (
            <Button to="/services" variant="ghost">
              All treatments
            </Button>
          )}
        </SectionHead>

        <div className="grid grid--4 services-grid__list">
          {shown.map((service, i) => (
            <Reveal className="services-grid__item" key={service.slug} delay={i * 90}>
              {/* The whole card is the link, so the hover target matches what
                  the lift makes it look like. Title and summary stay first in
                  the DOM — on a phone the grid areas move the photo to the left
                  of them, which is a purely visual reorder the single focus
                  stop cannot get out of step with. */}
              <Link to="/services" className="card card--drop card--hover service-card">
                <div className="service-card__text">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__summary">{service.summary}</p>
                </div>

                <div className="service-card__media">
                  <Photo
                    src={service.image}
                    alt={`${service.title} at the Shyamoli chamber`}
                    ratio="1/1"
                    shape="circle"
                  />
                  <span
                    className="icon-circle icon-circle--accent service-card__badge"
                    aria-hidden="true"
                  >
                    <Icon name={service.icon} size={26} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
