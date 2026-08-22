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
        {/* Two different photographs, not two crops of one.

            Desktop gets the room: the band is wide, the circle card sits in the
            left third and a scene fills the rest, which is what the reference
            layout does.

            A phone gets him. The band there is a portrait window barely wider
            than the card, and an empty room in it reads as stock — it could be
            any clinic. This is a portfolio for one dentist, so the small screen
            leads with his face and his name badge. The browser downloads only
            the one it matches. */}
        <Photo
          src="hero-clinic.jpg"
          sources={[{ media: '(max-width: 899px)', src: 'hero-mobile.jpg' }]}
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
