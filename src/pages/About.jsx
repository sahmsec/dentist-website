import usePageMeta from '../lib/usePageMeta.js'
import PageTitle from '../components/PageTitle.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { about, identity } from '../config/site.js'
import './About.css'

export default function About() {
  usePageMeta({
    // His name is the brand; the suffix would only repeat it.
    title: 'Dr. Md. Arman Kayser — Oral & Dental Surgeon',
    brandSuffix: false,
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
            text="The same faces every visit, so nobody has to explain their history twice."
          />

          <ul className="about-team__grid">
            {about.team.map((member, i) => (
              <li key={member.name}>
                <Reveal
                  as="article"
                  className={`team-profile${member.lead ? ' team-profile--lead' : ''}`}
                  delay={i * 80}
                >
                  <div className="team-profile__portrait">
                    <Photo
                      src={member.image}
                      alt={`${member.name}, ${member.role} at ${identity.brandName}`}
                      shape="circle"
                      ratio="1"
                      initials={member.name
                        .replace(/^Dr\.?\s+(Md\.?\s+)?/, '')
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
                    />
                  </div>

                  <div className="team-profile__body">
                    <h3 className="team-profile__name">{member.name}</h3>
                    <p className="team-profile__role">{member.role}</p>

                    {member.credential && (
                      <p className="team-profile__credential">{member.credential}</p>
                    )}

                    {member.bio && <p className="team-profile__bio">{member.bio}</p>}
                  </div>
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
