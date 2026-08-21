import Reveal from '../components/Reveal.jsx'
// Aliased: a local binding called `process` shadows the global the bundler
// rewrites, which is a trap nobody needs.
import { process as journey } from '../config/site.js'
import './Process.css'

export default function Process() {
  const last = journey.length - 1

  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="process__head">
          <span className="process__rule" aria-hidden="true" />
          <h2 id="process-title" className="eyebrow eyebrow--bare process__eyebrow">
            The patient journey
          </h2>
          <span className="process__rule" aria-hidden="true" />
        </Reveal>

        <ol className="process__grid">
          {journey.map((step, i) => (
            <Reveal as="li" className="process__step" key={step.step} delay={i * 110}>
              <div className="process__badge">
                {/* Three quarters of the ring, rotated so the gap opens top-left. */}
                <svg className="process__ring" viewBox="0 0 108 108" aria-hidden="true" focusable="false">
                  <circle
                    cx="54"
                    cy="54"
                    r="52.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="247 83"
                    transform="rotate(-90 54 54)"
                  />
                </svg>
                <span className="process__num">{step.step}</span>
              </div>

              <h3 className="process__title">{step.title}</h3>
              <p className="process__text">{step.text}</p>

              {i < last && (
                <svg
                  className="process__connector"
                  viewBox="0 0 72 12"
                  aria-hidden="true"
                  focusable="false"
                >
                  <g fill="currentColor">
                    <circle cx="3" cy="6" r="1.4" />
                    <circle cx="12" cy="6" r="1.4" />
                    <circle cx="21" cy="6" r="1.4" />
                    <circle cx="30" cy="6" r="1.4" />
                    <circle cx="39" cy="6" r="1.4" />
                    <circle cx="48" cy="6" r="1.4" />
                  </g>
                  <path
                    d="M57 2.2 62.6 6 57 9.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
