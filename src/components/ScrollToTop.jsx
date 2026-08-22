import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

import Icon from './Icons.jsx'
import { scrollToTop } from '../lib/smoothScroll.js'
import './ScrollToTop.css'

/* How far down the page the back-to-top button earns its place. */
const SHOW_AFTER = 500

/**
 * Router pages keep the scroll position of the page you left, so navigating
 * from the bottom of Services to Contact would land you mid-page. This puts
 * every route change back at the top.
 *
 * Immediate, not animated: a new page should already be at its start, and
 * watching the old one glide upwards first is a page-load's worth of waiting
 * for something the visitor did not ask to see.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    scrollToTop(lenis, { immediate: true })
  }, [pathname, lenis])

  return null
}

/** The floating return-to-top control, above the phone call bar on mobile. */
export function BackToTop() {
  const [shown, setShown] = useState(false)
  const lenis = useLenis()

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

  /* Hands the journey to Lenis so it eases the same way a wheel scroll does,
     rather than the browser's own smooth scroll fighting it for the scroll
     position. scrollToTop falls back to the native call and honours the
     reduced-motion preference either way. */
  const toTop = () => scrollToTop(lenis)

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
