import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { CallButton, WhatsAppButton } from '../components/Button.jsx'
import { renderHighlighted } from '../components/SectionHead.jsx'
import { hero, identity } from '../config/site.js'
import './Hero.css'

const STARS = [0, 1, 2, 3, 4]

export default function Hero() {
  return (
    <section className="hero" aria-label={identity.brandName}>
      <div className="hero__media">
        {/* The chamber, not the dentist. He appears four times further down —
            introduction, both why-us panes and the About page — so the hero
            carries the room instead, as the reference layout does. Decorative,
            hence the empty alt: the headline beside it says what this is. */}
        <Photo
          src="hero-clinic.jpg"
          alt=""
          ratio="1200/806"
          shape="flat"
          priority
          className="hero__photo"
        />

        {/* Two jobs at two sizes: on a phone it grounds the card against the
            photo's lower edge, on desktop it darkens the left third so the
            white circle stays readable over whatever photograph lands here. */}
        <span className="hero__scrim" aria-hidden="true" />

        <div className="hero__rating">
          <span className="hero__stars" role="img" aria-label="Rated 4.9 out of 5">
            {STARS.map((i) => (
              <Icon key={i} name="star" size={15} />
            ))}
          </span>
          <p className="hero__rating-line">
            <span className="hero__score">4.9</span>
            <span className="hero__rating-label">Patients recommend {identity.shortName}</span>
          </p>
        </div>
      </div>

      {/* On a phone this is a card that climbs back over the photo's lower
          third; from 900px up it becomes the circle overlaid on the band. */}
      <div className="hero__overlay">
        <div className="container">
          <Reveal className="hero__card">
            <div className="hero__circle">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="hero__title">
                {renderHighlighted(hero.headline, hero.highlight)}
              </h1>
              <p className="hero__lede">{hero.lede}</p>

              {/* Phones only. The whole point of the page is that a patient can
                  dial from the first screen without scrolling or hunting. */}
              <div className="hero__actions">
                <CallButton />
                <WhatsAppButton variant="ghost" />
              </div>
            </div>

            <Link className="hero__badge" to="/about">
              <span className="hero__badge-label">{hero.secondaryCta}</span>
              <Icon name="arrowUpRight" size={18} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
