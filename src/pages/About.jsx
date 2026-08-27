import usePageMeta from '../lib/usePageMeta.js'
import PageTitle from '../components/PageTitle.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import { LogoMark } from '../components/Logo.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { about, identity } from '../config/site.js'
import './About.css'

export default function About() {
  usePageMeta({
    title: 'About the practice & the team',
    description: `${about.practice.body[0]} ${about.body[0]}`,
    path: '/about',
  })

  return (
    <>
      <PageTitle title="About the practice" breadcrumb="About" image="titlebar-about.jpg" />

      {/* The clinic first. A patient books with the practice, walks into the
          practice and reviews the practice — Dr. Arman is the founder and the
          name over the door, but he is a section of this page, not the whole
          of it. His story follows directly below. */}
      <section className="section section--white section--curve-bottom about-practice">
        <div className="container">
          <SectionHead
            eyebrow={about.practice.eyebrow}
            title={about.practice.headline}
            highlight={['Shyamoli']}
            align="split"
            text={about.practice.body[0]}
          />

          <div className="about-practice__body">
            {about.practice.body.slice(1).map((paragraph, i) => (
              <Reveal as="p" key={paragraph.slice(0, 32)} delay={i * 90}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-bio">
        <div className="container about-bio__grid">
          <Reveal className="about-bio__media">
            <Photo
              src="dr-arman-about.jpg"
              alt={`${identity.name}, ${identity.title} and founder of ${identity.brandName}`}
              shape="media"
              ratio="1"
            />
          </Reveal>

          <Reveal className="about-bio__copy" delay={120}>
            <p className="eyebrow">The founder</p>
            <h2>{about.team[0].name}</h2>
            <p className="lede about-bio__lede">{about.team[0].credential}</p>
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
                  className={`team-profile${member.lead ? ' team-profile--lead on-dark' : ''}`}
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
                    {member.lead && <p className="eyebrow team-profile__flag">Founder</p>}

                    <h3 className="team-profile__name">{member.name}</h3>
                    <p className="team-profile__role">{member.role}</p>

                    {member.credential && (
                      <p className="team-profile__credential">{member.credential}</p>
                    )}

                    {member.bio && <p className="team-profile__bio">{member.bio}</p>}
                  </div>

                  {/* Same watermark the pillars band uses, at the same opacity —
                      it is what stops a large flat panel reading as a blank. */}
                  {member.lead && (
                    <span className="team-profile__watermark" aria-hidden="true">
                      <LogoMark size={230} tone="light" />
                    </span>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Shown by role, not by name. Three faces in a row rather than three
              more profile rows: without a name or a paragraph there is nothing
              for a full-width card to hold, and an empty one reads as missing
              rather than deliberate. */}
          <Reveal className="about-support" delay={120}>
            <div className="about-support__head">
              <h3 className="about-support__title">{about.support.title}</h3>
              <p className="about-support__text">{about.support.text}</p>
            </div>

            <ul className="about-support__grid">
              {about.support.people.map((person) => (
                <li className="support-card" key={person.image}>
                  <div className="support-card__portrait">
                    <Photo
                      src={person.image}
                      alt={`A ${person.role.toLowerCase()} at ${identity.brandName}`}
                      shape="circle"
                      ratio="1"
                    />
                  </div>
                  <p className="support-card__role">{person.role}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
