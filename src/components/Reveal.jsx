import { useEffect, useRef, useState } from 'react'

/**
 * Scroll reveal. The reference theme fades sections up as they enter view; this
 * reproduces that with one IntersectionObserver per element and no library.
 *
 * It observes once and disconnects — a revealed section stays revealed rather
 * than re-animating when you scroll back up, which is what the reference does
 * and what reads as calm rather than twitchy.
 *
 *   <Reveal delay={120}><ServiceCard … /></Reveal>
 *   <Reveal as="section" className="section">…</Reveal>
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect the OS setting rather than animating and hoping.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      // Fire a little before the element reaches the fold so the motion has
      // finished by the time it is properly in view.
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Counts a number up when it scrolls into view — used by the stats band.
 * Returns [ref, displayValue].
 */
export function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          // Ease-out cubic: fast off the mark, settles gently on the number.
          const eased = 1 - Math.pow(1 - t, 3)
          // Rounding to whole numbers turned a 4.9 rating into 5, which is a
          // different claim, so the caller says how many decimals to keep.
          const f = Math.pow(10, decimals)
          setValue(Math.round(target * eased * f) / f)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration, decimals])

  return [ref, value]
}
