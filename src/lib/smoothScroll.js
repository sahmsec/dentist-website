/**
 * Lenis configuration, in one place because three components need to agree on
 * it: the root wrapper in App, the route reset in ScrollToTop and the drawer
 * lock in Header.
 */

/* Read once. A preference change mid-session is rare enough that reacting to it
   is not worth remounting the whole tree, and Lenis reads this at construction
   anyway. */
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenisOptions = {
  /* Long enough to read as eased rather than instant, short enough that a
     deliberate flick still gets you down the page. */
  duration: prefersReducedMotion ? 0 : 1.05,

  /* The wheel is the only input we take over. `syncTouch` would put a finger
     drag through the same interpolation, and on a phone that reads as lag
     against the platform's own scrolling — which this site is built around. */
  smoothWheel: !prefersReducedMotion,
  syncTouch: false,
}

/**
 * Back to the top, however the page is scrolling.
 *
 * `lenis` may be null: under reduced motion Lenis is still mounted but inert,
 * and any caller outside the provider gets nothing — so both paths are real.
 */
export function scrollToTop(lenis, { immediate = false } = {}) {
  const jump = immediate || prefersReducedMotion

  if (lenis) {
    lenis.scrollTo(0, { immediate: jump })
    return
  }

  window.scrollTo({ top: 0, left: 0, behavior: jump ? 'instant' : 'smooth' })
}
