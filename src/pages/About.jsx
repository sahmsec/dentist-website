import usePageMeta from '../lib/usePageMeta.js'
import PageTitle from '../components/PageTitle.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { about, identity, links, social } from '../config/site.js'
import './About.css'

export default function About() {
  usePageMeta({
    title: `About ${identity.shortName}`,
    description: about.body[0],
    path: '/about',
  })

  return (
    <>
      <PageTitle title="About Dr. Arman" breadcrumb="About" image="titlebar-about.jpg" />

      <section className="section section--white section--curve-bottom about-bio">
        <div className="container about-bio__grid">
          <Reveal className="about-bio__media">
            <Photo
              src="dr-arman-about.jpg"
              alt={`${identity.name}, ${identity.title}, in the Shyamoli chamber`}
              shape="media"
              ratio="3/4"
            />
          </Reveal>

          <Reveal className="about-bio__copy" delay={120}>
            <p className="eyebrow">{about.eyebrow}</p>
            <h2>{about.headline}</h2>
            <p className="lede about-bio__lede">{about.lede}</p>
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section about-cred">
        <div className="container">
          <SectionHead
            eyebrow="Training & expertise"
            title="Surgical training behind every treatment"
            highlight={['Surgical']}
            align="split"
            text="One surgeon accountable from diagnosis through to follow-up — which is why the difficult cases stay in the chamber instead of being referred on."
          />

          <ul className="grid grid--2 about-cred__grid">
            {about.credentials.map((credential, i) => (
              <li key={credential.title}>
                <Reveal className="card about-cred__card" delay={i * 90}>
                  <span className="icon-circle about-cred__icon">
                    <Icon name="shield" size={24} />
                  </span>
                  <span className="about-cred__text">
                    <span className="about-cred__title">{credential.title}</span>
                    <span className="about-cred__org">{credential.org}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-team">
        <div className="container">
          <SectionHead
            eyebrow="Who you will meet"
            title="The chamber team"
            align="center"
            text="Small on purpose. The same faces every visit, so nobody has to explain their history twice."
          />

          <ul className="about-team__grid">
            {about.team.map((member, i) => (
              <li key={member.name}>
                <Reveal
                  as="article"
                  className={`team-card${member.lead ? ' team-card--lead' : ''}`}
                  delay={i * 90}
                >
                  <div className="team-card__portrait">
                    <Photo
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      shape="circle"
                      ratio="1"
                    />
                  </div>

                  <div className="team-card__body">
                    <p className="team-card__role">{member.role}</p>
                    <h3 className="team-card__name">{member.name}</h3>

                    <ul className="team-card__social">
                      {social.map((channel) => (
                        <li key={channel.name}>
                          <a
                            href={channel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${identity.brandName} on ${channel.name}`}
                          >
                            <Icon name={channel.icon} size={15} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* The whole strip is the link for the lead, not just the
                      label — it reads as one bar, so tapping anywhere on it
                      should dial rather than only the 128px of text. */}
                  {member.lead ? (
                    <a className="team-card__strip team-card__strip--link" href={links.tel}>
                      <span className="icon-circle icon-circle--sm team-card__strip-icon">
                        <Icon name="phone" size={16} />
                      </span>
                      <span className="team-card__strip-label">Call the chamber</span>
                    </a>
                  ) : (
                    <div className="team-card__strip">
                      <span className="icon-circle icon-circle--sm team-card__strip-icon">
                        <Icon name="tooth" size={16} />
                      </span>
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
