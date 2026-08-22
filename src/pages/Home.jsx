import usePageMeta from '../lib/usePageMeta.js'
import { identity, sections } from '../config/site.js'

import Hero from '../sections/Hero.jsx'
import Pillars from '../sections/Pillars.jsx'
import AboutIntro from '../sections/AboutIntro.jsx'
import Chamber from '../sections/Chamber.jsx'
import ServicesGrid from '../sections/ServicesGrid.jsx'
import WhyPanel from '../sections/WhyPanel.jsx'
import Process from '../sections/Process.jsx'
import StatsBand from '../sections/StatsBand.jsx'
import BeforeAfter from '../sections/BeforeAfter.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import CtaBand from '../sections/CtaBand.jsx'

export default function Home() {
  // The landing page keeps the site-level title; every other route renames it.
  usePageMeta({ title: null, description: identity.metaDescription, path: '/' })

  return (
    <>
      <Hero />
      <Pillars />
      {/* Phones only, and ahead of the introduction: on a phone the hero is Dr.
          Arman, so the room is the next thing a patient wants — not a second
          photograph of the same person. On desktop the hero is already the
          room, so this is hidden there and the introduction follows directly. */}
      <Chamber />
      <AboutIntro />
      {/* Four of the six treatments here; the Services page carries all of them. */}
      <ServicesGrid limit={4} />
      <WhyPanel />
      {/* Process is the last light block before the stats band, so it is the one
          that curves down over it. White rather than the page surface: the curve
          is only visible where the block contrasts with what sits behind it, and
          --surface is exactly the body colour. */}
      <div className="section--white section--curve-bottom">
        <Process />
      </div>
      <StatsBand />
      {/* Hidden via the flag in site.js, not removed — the component, its styles
          and its captions are all still here for when real cases exist. */}
      {sections.beforeAfter && <BeforeAfter />}
      {sections.testimonials && <Testimonials />}
      <CtaBand />
    </>
  )
}
