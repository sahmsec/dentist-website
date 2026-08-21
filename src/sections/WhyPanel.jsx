import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { CallButton } from '../components/Button.jsx'
import { identity, reasons } from '../config/site.js'
import './WhyPanel.css'

/* A three-pane tab block needs width it does not have on a phone, so the same
   four reasons render as an accordion below this breakpoint. Kept in step with
   the identical query in WhyPanel.css. */
const PANES = '(min-width: 900px)'

/**
 * Why patients choose the chamber.
 *
 * Phone: an accordion — one reason open at a time, the photo dropped entirely.
 * 900px and up: the yellow tab rail, white detail pane and full-bleed portrait.
 *
 * The two are different interaction patterns, not one set of markup restyled,
 * so only one of them is ever in the DOM. That keeps `role="tab"` off a control
 * that behaves like a disclosure, and vice versa.
 */
export default function WhyPanel() {
  const [openIndex, setOpenIndex] = useState(0)
  const isWide = useMediaQuery(PANES)

  return (
    <section className="section why-panel">
      <div className="container">
        <SectionHead
          align="center"
          eyebrow="Why patients choose this chamber"
          title="Committed to exceptional, patient-centred care"
          highlight={['patient-centred']}
        />

        {isWide ? (
          // The accordion may have everything collapsed; a tablist may not.
          <WhyTabs activeIndex={Math.max(openIndex, 0)} onSelect={setOpenIndex} />
        ) : (
          <WhyAccordion openIndex={openIndex} onToggle={setOpenIndex} />
        )}
      </div>
    </section>
  )
}

/* ── Phone: accordion ──────────────────────────────────────────────────────── */
function WhyAccordion({ openIndex, onToggle }) {
  return (
    <Reveal className="why-panel__block why-panel__block--acc" delay={120}>
      <div className="why-panel__acc">
        {reasons.map((reason, i) => {
          const open = i === openIndex
          return (
            <div className="why-panel__acc-item" key={reason.key}>
              <h3 className="why-panel__acc-heading">
                <button
                  type="button"
                  id={`why-acc-${reason.key}`}
                  aria-controls={`why-acc-panel-${reason.key}`}
                  aria-expanded={open}
                  className={`why-panel__acc-trigger ${open ? 'is-open' : ''}`.trim()}
                  onClick={() => onToggle(open ? -1 : i)}
                >
                  <span>{reason.tab}</span>
                  <span className="why-panel__acc-chevron" aria-hidden="true">
                    <Icon name="chevronDown" size={18} />
                  </span>
                </button>
              </h3>

              {/* `hidden`, not a collapsed height — a closed panel is out of the
                  tab order and out of the accessibility tree entirely. */}
              <div
                className="why-panel__acc-panel"
                id={`why-acc-panel-${reason.key}`}
                role="region"
                aria-labelledby={`why-acc-${reason.key}`}
                hidden={!open}
              >
                <h4 className="why-panel__acc-title">{reason.title}</h4>
                <p className="why-panel__acc-text">{reason.text}</p>
                <ul className="why-panel__checks">
                  {reason.checks.map((check) => (
                    <li className="why-panel__check" key={check}>
                      <span className="why-panel__check-icon">
                        <Icon name="check" size={14} />
                      </span>
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      {/* No call button here: below 768px the fixed MobileCallBar already puts
          the number on screen permanently, so an inline one is 60px of
          duplicate chrome between the reader and the next section. */}
    </Reveal>
  )
}

/* ── 900px and up: the original three-pane tab block ───────────────────────── */
function WhyTabs({ activeIndex, onSelect }) {
  const tabRefs = useRef([])
  const active = reasons[activeIndex]

  // Selection follows focus, which is the expected behaviour for a tablist
  // whose panels are already loaded.
  const onKeyDown = (event, index) => {
    const last = reasons.length - 1
    let next = null

    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    if (next === null) return

    event.preventDefault()
    onSelect(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Reveal className="why-panel__block" delay={120}>
      <div className="why-panel__rail">
        <Icon name="tooth" size={320} className="why-panel__watermark" />

        <div
          className="why-panel__tabs"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Reasons patients choose this chamber"
        >
          {reasons.map((reason, i) => (
            <button
              key={reason.key}
              ref={(node) => {
                tabRefs.current[i] = node
              }}
              type="button"
              role="tab"
              id={`why-tab-${reason.key}`}
              aria-controls={`why-pane-${reason.key}`}
              aria-selected={i === activeIndex}
              tabIndex={i === activeIndex ? 0 : -1}
              className={`why-panel__tab ${i === activeIndex ? 'is-active' : ''}`.trim()}
              onClick={() => onSelect(i)}
              onKeyDown={(event) => onKeyDown(event, i)}
            >
              <span>{reason.tab}</span>
              <span className="why-panel__tab-badge">
                <Icon name="arrowRight" size={18} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="why-panel__body">
        {reasons.map((reason, i) => (
          <div
            key={reason.key}
            className="why-panel__pane"
            role="tabpanel"
            id={`why-pane-${reason.key}`}
            aria-labelledby={`why-tab-${reason.key}`}
            hidden={i !== activeIndex}
          >
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
            <hr className="hairline why-panel__rule" />
            <ul className="why-panel__checks">
              {reason.checks.map((check) => (
                <li className="why-panel__check" key={check}>
                  <span className="why-panel__check-icon">
                    <Icon name="check" size={14} />
                  </span>
                  {check}
                </li>
              ))}
            </ul>
            <CallButton size="sm" className="why-panel__cta" />
          </div>
        ))}
      </div>

      <div className="why-panel__media">
        <Photo
          key={active.key}
          src={active.image}
          alt={`${identity.name} — ${active.tab.toLowerCase()}`}
          ratio="3/4"
          shape="flat"
          className="why-panel__photo"
        />
      </div>
    </Reveal>
  )
}

/* No SSR here, so the first paint can already be the right layout rather than
   the desktop one swapping out a frame later. */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const apply = (event) => setMatches(event.matches)
    apply(mq)
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [query])

  return matches
}
