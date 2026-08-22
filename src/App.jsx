import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileCallBar from './components/MobileCallBar.jsx'
import ScrollToTop, { BackToTop } from './components/ScrollToTop.jsx'
import { lenisOptions } from './lib/smoothScroll.js'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    /* `root` drives the document scroll rather than a wrapper element, so the
       sticky header, the reveal observers and the back-to-top button all keep
       working off ordinary scroll events. */
    <ReactLenis root options={lenisOptions}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollToTop />
      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Fixed call / WhatsApp bar — phones only. The whole point of the site is
          that a patient can dial without hunting for the number. */}
      <MobileCallBar />
      <BackToTop />
    </ReactLenis>
  )
}
