import usePageMeta from '../lib/usePageMeta.js'
import PageTitle from '../components/PageTitle.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import { CallButton, WhatsAppButton } from '../components/Button.jsx'
import Process from '../sections/Process.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { services, identity } from '../config/site.js'
import './Services.css'

export default function Services() {
  usePageMeta({
    title: 'Treatments',
    description: `General dentistry, orthodontics, dental implants, cosmetic dentistry, teeth whitening and oral surgery with ${identity.name} in Shyamoli, Dhaka.`,
    path: '/services',
  })

  return (
    <>
      <PageTitle title="Treatments" breadcrumb="Services" image="titlebar-services.jpg" />

      <section className="section services-intro">
        <div className="container">
          <SectionHead
            eyebrow="What the chamber offers"
            title="Six treatments, one surgeon, one plan"
            highlight={['surgeon']}
            align="split"
            text="This page is a showcase, not a booking system. Every treatment here starts the same way — a phone call, a proper look at your teeth, and a written plan you agree to before anything begins."
          >
            <CallButton />
          </SectionHead>
        </div>
      </section>

      <section className="section section--flush-top services-detail">
        <div className="container services-detail__list">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.slug}
              id={service.slug}
              className={`svc-row${i % 2 ? ' svc-row--reverse' : ''}`}
            >
              <div className="svc-row__media">
                <Photo
                  src={service.image}
                  alt={`${service.title} at ${identity.brandName}`}
                  shape="flat"
                  ratio="4/3"
                  className="svc-row__photo"
                />
              </div>

              <div className="svc-row__copy">
                <span className="icon-circle icon-circle--accent svc-row__icon">
                  <Icon name={service.icon} size={26} />
                </span>

                <h2 className="svc-row__title">{service.title}</h2>
                <p className="svc-row__detail">{service.detail}</p>

                <ul className="svc-row__points">
                  {service.points.map((point) => (
                    <li key={point} className="svc-row__point">
                      <span className="icon-circle icon-circle--sm svc-row__check">
                        <Icon name="check" size={15} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="row svc-row__actions">
                  <CallButton size="sm" label="Ask about this treatment" />
                  <WhatsAppButton size="sm" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Process />
      <CtaBand />
    </>
  )
}
