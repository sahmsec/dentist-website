import { about, contact, identity, links } from '../config/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import './AboutIntro.css'

/**
 * The Home page's introduction to Dr. Arman: his portrait on the left, the
 * short version of the About page on the right, ending on the two things a
 * visitor can actually do — read more, or ring the chamber.
 *
 * The whole section is sized to sit inside one screen, so a visitor who scrolls
 * to it sees all of it at once instead of meeting a portrait tall enough to
 * push the sentence explaining it below the fold. That budget is what the
 * portrait being a circle buys: a 3:4 photograph 512px wide is 683px tall, most
 * of a laptop screen on its own.
 *
 * On a phone the portrait shrinks again to a 92px avatar and the credentials
 * drop out — they are listed in full on the About page, and on a 390px column
 * they were a wall of text. The prose is one paragraph at every width.
 */

export default function AboutIntro() {
  return (
    <section className="section about-intro">
      <div className="container about-intro__grid">
        <Reveal className="about-intro__media">
          {/* Art-directed so no photograph appears twice in one view. On
              desktop this is the blue scrubs shot, which the hero does not use
              there — the hero is the chamber. On a phone the hero IS the scrubs
              shot, so this becomes the coat portrait instead.

              Square, because every rendering of it is a circle: cropping to
              1:1 in the file centres him in the frame, which object-position
              cannot do here — fitting a 3:4 photograph into a square box scales
              it to the width, so the horizontal is never cropped and he stayed
              off to the left however the position was set. */}
          <Photo
            src="dr-arman-portrait.jpg"
            sources={[{ media: '(max-width: 899px)', src: 'dr-arman-portrait-sm.jpg' }]}
            alt={`${identity.name}, ${identity.title}`}
            ratio="1"
            shape="media"
            className="about-intro__portrait"
          />
        </Reveal>

        <Reveal className="about-intro__content" delay={120}>
          <SectionHead eyebrow={about.eyebrow} title={about.headline} highlight={['passion']} />

          {/* One paragraph, on every screen. The second ran to three lines in
              this column and put the section 86px past a 720px window — and it
              is the About page's argument, which the button below leads to. */}
          <p className="about-intro__para">{about.body[0]}</p>

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
