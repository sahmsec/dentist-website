import { useEffect, useState } from 'react'
import Icon from '../components/Icons.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { testimonials } from '../config/site.js'
import './Testimonials.css'

/* Kept in step with the identical breakpoint in Testimonials.css — the CSS owns
   the slide geometry, this owns how far the track is allowed to travel. */
const TWO_UP = '(min-width: 900px)'

const STARS = [0, 1, 2, 3, 4]

export default function Testimonials() {
  const [perView, setPerView] = useState(1)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia(TWO_UP)
    const apply = (e) => setPerView(e.matches ? 2 : 1)
    apply(mq)
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const count = testimonials.length
  const maxIndex = Math.max(0, count - perView)

  // Going from one card to two shortens the track; without this the slider can
  // be left parked past its own last position.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const go = (next) => setIndex(Math.min(Math.max(next, 0), maxIndex))

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(index - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(index + 1)
    }
  }

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="testimonials__panel on-dark">
          <SectionHead
            align="center"
            eyebrow="Patient stories"
            title="What patients say after their visit"
            highlight={['patients']}
          />

          <Reveal
            className="testimonials__slider"
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <div className="testimonials__viewport" aria-live="polite">
              <div className="testimonials__track" style={{ '--index': index }}>
                {testimonials.map((item, i) => {
                  const visible = i >= index && i < index + perView
                  return (
                    <div
                      key={item.name}
                      className="testimonials__slide"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Testimonial ${i + 1} of ${count}`}
                      aria-hidden={visible ? undefined : true}
                    >
                      <figure className="testimonial-card">
                        <Icon name="quote" size={34} className="testimonial-card__glyph" />

                        <span
                          className="testimonial-card__stars"
                          role="img"
                          aria-label="Rated 5 out of 5"
                        >
                          {STARS.map((s) => (
                            <Icon key={s} name="star" size={16} />
                          ))}
                        </span>

                        <blockquote className="testimonial-card__quote">{item.quote}</blockquote>

                        <hr className="hairline testimonial-card__rule" />

                        <figcaption className="testimonial-card__person">
                          <Photo
                            className="testimonial-card__avatar"
                            src={`patient-${i + 1}.jpg`}
                            alt={`${item.name}, patient at the chamber`}
                            shape="circle"
                            ratio="1"
                          />
                          <span>
                            <span className="testimonial-card__name">{item.name}</span>
                            <span className="testimonial-card__context">{item.context}</span>
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="testimonials__controls">
              <button
                type="button"
                className="testimonials__arrow"
                onClick={() => go(index - 1)}
                disabled={index === 0}
                aria-label="Previous testimonial"
              >
                <Icon name="arrowLeft" size={20} />
              </button>

              <div className="testimonials__dots">
                {Array.from({ length: maxIndex + 1 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="testimonials__dot"
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index ? 'true' : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                className="testimonials__arrow"
                onClick={() => go(index + 1)}
                disabled={index === maxIndex}
                aria-label="Next testimonial"
              >
                <Icon name="arrowRight" size={20} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
