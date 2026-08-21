import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import { renderHighlighted } from '../components/SectionHead.jsx'
import { hero, identity } from '../config/site.js'
import './Hero.css'

const STARS = [0, 1, 2, 3, 4]

export default function Hero() {
  return (
    <section className="hero" aria-label={identity.brandName}>
      <div className="hero__media">
        <Photo
          src="hero-dr-arman.jpg"
          alt="Dr. Arman Kayser at the chamber"
          ratio="16/9"
          shape="flat"
          priority
          className="hero__photo"
        />

        {/* The white circle has to stay readable over whatever photograph ends up
            here, so the left third of the frame is darkened before it lands. */}
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

      {/* Sits over the photo on desktop; below 900px it drops out of the overlay
          and the circle flows underneath as a card. */}
      <div className="hero__overlay">
        <div className="container">
          <Reveal className="hero__card">
            <div className="hero__circle">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="hero__title">
                {renderHighlighted(hero.headline, hero.highlight)}
              </h1>
              <p className="hero__lede">{hero.lede}</p>
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
