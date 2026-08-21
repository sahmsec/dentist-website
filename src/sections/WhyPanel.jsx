import { useRef, useState } from 'react'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { CallButton } from '../components/Button.jsx'
import { identity, reasons } from '../config/site.js'
import './WhyPanel.css'

/**
 * The three-pane feature block: a yellow tab rail, a white detail pane and a
 * full-bleed portrait, all inside one deeply rounded, clipped card.
 *
 * All four panels stay in the DOM and the inactive ones are `hidden`, so every
 * tab's `aria-controls` resolves to a real element. Swapping tabs restarts the
 * cross-fade because a panel returning from display:none replays its animation.
 */
export default function WhyPanel() {
  const [activeIndex, setActiveIndex] = useState(0)
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
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="section why-panel">
      <div className="container">
        <SectionHead
          align="center"
          eyebrow="Why patients choose this chamber"
          title="Committed to exceptional, patient-centred care"
          highlight={['patient-centred']}
        />

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
                  onClick={() => setActiveIndex(i)}
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
      </div>
    </section>
  )
}
