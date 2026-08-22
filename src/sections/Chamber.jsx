import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { contact, hours, links } from '../config/site.js'
import './Chamber.css'

/**
 * The chamber itself, on phones only.
 *
 * On desktop the hero already is the chamber, so a second look at the same room
 * would be the same photograph twice on one screen. On a phone the hero is Dr.
 * Arman, which means the room had nowhere to appear — it was reduced to a
 * thumbnail tucked into the corner of another photograph, which is no way to
 * show someone where they are about to sit.
 *
 * Full width, with the address and directions attached, because "what does it
 * look like" and "where is it" are the same question for a patient deciding
 * whether to go.
 */
export default function Chamber() {
  return (
    <section className="section chamber" aria-labelledby="chamber-title">
      <div className="container">
        <Reveal className="chamber__head">
          <p className="eyebrow">The chamber</p>
          <h2 className="chamber__title" id="chamber-title">
            Where you will be treated
          </h2>
        </Reveal>

        <Reveal className="chamber__frame" delay={90}>
          <Photo
            src="chamber-wide.jpg"
            alt="The treatment room at the Shyamoli chamber, with two dental chairs"
            ratio="1400/709"
            shape="flat"
            className="chamber__photo"
          />
        </Reveal>

        <Reveal className="chamber__meta" delay={150}>
          <p className="chamber__address">
            <span className="icon-circle icon-circle--sm chamber__icon">
              <Icon name="mapPin" size={17} />
            </span>
            <span>
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </span>
          </p>

          <p className="chamber__hours">
            <span className="icon-circle icon-circle--sm chamber__icon">
              <Icon name="clock" size={17} />
            </span>
            <span>
              {hours.rows[0].days}
              <br />
              {hours.rows[0].time}
            </span>
          </p>

          <Button href={links.maps} variant="ghost" size="sm" icon="mapPin">
            Get directions
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
