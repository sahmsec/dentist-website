import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Icon from './Icons.jsx'
import './ScrollToTop.css'

/* How far down the page the back-to-top button earns its place. */
const SHOW_AFTER = 500

/**
 * Router pages keep the scroll position of the page you left, so navigating
 * from the bottom of Services to Contact would land you mid-page. This puts
 * every route change back at the top.
 *
 * 'instant' rather than 'auto': base.css sets scroll-behavior:smooth on <html>,
 * and 'auto' defers to that — the whole page would glide up on every click.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

/** The floating return-to-top control, above the phone call bar on mobile. */
export function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setShown(window.scrollY > SHOW_AFTER)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top ${shown ? 'is-shown' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
    >
      <Icon name="arrowUp" size={20} />
    </button>
  )
}
