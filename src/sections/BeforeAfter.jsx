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
 *
 * On a phone the three cases are a snap carrousel rather than three stacked
 * cards: stacking them cost three screens of scrolling for content most
 * visitors only glance at. The track scrolls, never the page. Above 900px the
 * same markup lays out as the desktop grid.
 */
export default function BeforeAfter() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Which case is under the middle of the track — this drives the dots. Above
  // 900px the track is a grid that never scrolls, so it simply stays at 0.
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return

    const mid = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let smallest = Infinity

    Array.from(track.children).forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid)
      if (distance < smallest) {
        smallest = distance
        nearest = i
      }
    })

    setActive((prev) => (prev === nearest ? prev : nearest))
  }

  const goTo = (i) => {
    const track = trackRef.current
    const card = track?.children[i]
    if (!card) return

    // Centre the card by hand rather than with scrollIntoView, which would also
    // drag the page vertically to bring the section into view.
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

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

        <ul className="before-after__track" ref={trackRef} onScroll={onScroll}>
          {beforeAfter.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90}>
              <CompareCard item={item} />
            </Reveal>
          ))}
        </ul>

        {/* Swiping is the obvious gesture, but the frames themselves capture
            horizontal drags for the slider — so the dots double as the way to
            reach the other cases without fighting the handle. */}
        <div className="before-after__nav">
          <p className="before-after__hint">Swipe for more cases</p>
          <div className="before-after__dots">
            {beforeAfter.map((item, i) => (
              <button
                key={item.title}
                type="button"
                className="before-after__dot"
                onClick={() => goTo(i)}
                aria-label={`Show case ${i + 1}: ${item.title}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
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
        {/* The frame owns the aspect ratio — landscape on a phone, portrait on
            the desktop grid — so both photos simply fill it. */}
        <Photo
          src={item.before}
          alt={`${item.title} — before treatment`}
          ratio="4/3"
          shape="flat"
        />

        <div className="before-after__reveal">
          <Photo
            src={item.after}
            alt={`${item.title} — after treatment`}
            ratio="4/3"
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
