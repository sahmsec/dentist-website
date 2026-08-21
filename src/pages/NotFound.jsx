import { useEffect } from 'react'
import PageTitle from '../components/PageTitle.jsx'
import Button, { CallButton } from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import { identity } from '../config/site.js'
import './NotFound.css'

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found — ${identity.brandName}`
  }, [])

  return (
    <>
      <PageTitle title="Page not found" breadcrumb="404" image="titlebar-default.jpg" />

      <section className="section not-found">
        <div className="container">
          <Reveal className="not-found__card">
            <p className="not-found__badge" aria-hidden="true">
              <span className="not-found__numeral">404</span>
            </p>

            <h2 className="not-found__title">This page has moved or never existed</h2>

            <p className="lede not-found__text">
              Sorry about that. The link you followed is out of date — but the chamber is
              still right where it was, and {identity.shortName} is a phone call away.
            </p>

            <div className="row not-found__actions">
              <Button to="/">Back to home</Button>
              <CallButton variant="navy" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
