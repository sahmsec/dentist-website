import { about, contact, identity, links, stats } from '../config/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import './AboutIntro.css'

/**
 * The Home page's introduction to Dr. Arman: a photo composition on the left,
 * the short version of the About page on the right, ending on the two things a
 * visitor can actually do — read more, or ring the chamber.
 */

// The badge over the portrait reuses the years-in-practice stat, so the number
// is never maintained in two places.
const experience = stats[0]

export default function AboutIntro() {
  return (
    <section className="section about-intro">
      <div className="container about-intro__grid">
        <Reveal className="about-intro__media">
          <Photo
            src="dr-arman-portrait.jpg"
            alt={`${identity.name}, ${identity.title}`}
            ratio="3/4"
            shape="media"
            className="about-intro__portrait"
          />

          <p className="about-intro__badge">
            <span className="about-intro__badge-value">
              {experience.value}
              {experience.suffix}
            </span>
            <span className="about-intro__badge-label">{experience.label}</span>
          </p>

          <div className="about-intro__inset">
            <Photo
              src="chamber-interior.jpg"
              alt="Inside the chamber, set up for a consultation"
              ratio="1/1"
              shape="lg"
            />
          </div>
        </Reveal>

        <Reveal className="about-intro__content" delay={120}>
          <SectionHead eyebrow={about.eyebrow} title={about.headline} highlight={['passion']} />

          <p className="lede about-intro__lede">{about.lede}</p>

          {about.body.slice(0, 2).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <ul className="about-intro__checks">
            {about.credentials.map((credential) => (
              <li className="about-intro__check" key={credential.title}>
                <span className="icon-circle about-intro__check-icon" aria-hidden="true">
                  <Icon name="check" size={16} />
                </span>
                {credential.title}
              </li>
            ))}
          </ul>

          <div className="about-intro__actions">
            <Button to="/about" variant="navy">
              More about Dr. Arman
            </Button>

            <p className="about-intro__phone">
              <span className="icon-circle about-intro__phone-icon" aria-hidden="true">
                <Icon name="phone" size={20} />
              </span>
              <span>
                <span className="about-intro__phone-label">{contact.phone.label}</span>
                <a className="about-intro__phone-number" href={links.tel}>
                  {contact.phone.display}
                </a>
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
