import { useRef, useState } from 'react'
import Photo from '../components/Photo.jsx'
import Icon from '../components/Icons.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { beforeAfter } from '../config/site.js'
import './BeforeAfter.css'

/**
 * The portfolio proper — real cases from the chamber, each one a comparison
 * slider you drag across to reveal the result.
 */
export default function BeforeAfter() {
  return (
    <section className="section before-after" aria-label="Selected work">
      <div className="container">
        <SectionHead
          align="center"
          eyebrow="Selected work"
          title="Results from the chamber"
          highlight={['Results']}
          text="A few recent cases. Every photograph is shared with the patient's consent."
        />

        <ul className="before-after__grid">
          {beforeAfter.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90}>
              <CompareCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CompareCard({ item }) {
  const [pos, setPos] = useState(50)
  const frameRef = useRef(null)
  const dragging = useRef(false)

  const setFromPointer = (clientX) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect?.width) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }

  // One pointer path covers mouse, pen and touch. Capture keeps the drag alive
  // when the finger leaves the card, and `touch-action: pan-y` in the CSS lets
  // a vertical swipe still scroll the page.
  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromPointer(e.clientX)
  }

  const onPointerMove = (e) => {
    if (dragging.current) setFromPointer(e.clientX)
  }

  const endDrag = (e) => {
    dragging.current = false
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <article className="before-after__card card">
      <div
        className="before-after__frame"
        ref={frameRef}
        style={{ '--pos': `${pos}%` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Photo
          src={item.before}
          alt={`${item.title} — before treatment`}
          ratio="4/5"
          shape="flat"
        />

        <div className="before-after__reveal">
          <Photo
            src={item.after}
            alt={`${item.title} — after treatment`}
            ratio="4/5"
            shape="flat"
          />
        </div>

        <span className="before-after__tag before-after__tag--before">Before</span>
        <span className="before-after__tag before-after__tag--after">After</span>

        {/* The same value, reachable by keyboard. Visually hidden but focusable;
            focus is drawn on the grip below via the sibling selector. */}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="sr-only before-after__range"
          aria-label={`Reveal after photo for ${item.title}`}
        />

        <span className="before-after__handle" aria-hidden="true">
          <span className="before-after__grip">
            <Icon name="chevronDown" size={15} className="before-after__chev before-after__chev--l" />
            <Icon name="chevronDown" size={15} className="before-after__chev before-after__chev--r" />
          </span>
        </span>
      </div>

      <div className="before-after__meta">
        <h3>{item.title}</h3>
        <p>{item.caption}</p>
      </div>
    </article>
  )
}
