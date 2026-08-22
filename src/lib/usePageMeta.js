import { useEffect } from 'react'
import { identity, site } from '../config/site.js'

/* The card image a shared link renders. Relative in the served HTML, absolute
   here — several scrapers will not resolve a relative og:image against the page
   and simply drop the picture. */
const OG_IMAGE = '/images/og-cover.jpg'

/**
 * Per-route metadata for a single-page app.
 *
 * A crawler that renders JavaScript reads whatever is in <head> after the route
 * mounts, so each page has to set its own. index.html carries the home page's
 * values as the served default, which is what a non-rendering crawler and most
 * link previews will see.
 *
 *   usePageMeta({ title: 'Contact', description: '…', path: '/contact' })
 *   usePageMeta({ title: null, ... })   → the site title verbatim, for home
 *
 * Sets: <title>, description, canonical, and the Open Graph and Twitter tags
 * that decide what a shared link looks like.
 *
 * Absolute URLs come from `site.url` when a domain is configured and from the
 * live origin when it is not, so a preview deployment shares as itself. A
 * hard-coded domain made every shared link resolve somewhere that did not
 * exist yet — the card was unclickable.
 */
export function usePageMeta({ title, description, path } = {}) {
  useEffect(() => {
    // Suffix with the practice name, not the person's — the site is titled
    // after the practice and every tab should read the same way.
    const full = title ? `${title} — ${identity.brandName}` : identity.metaTitle
    document.title = full

    const origin = site.url || window.location.origin
    const url = new URL(path || '/', origin).href

    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', new URL(OG_IMAGE, origin).href)
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', new URL(OG_IMAGE, origin).href)
  }, [title, description, path])
}

/** Creates the tag if the template does not already carry it. */
function setMeta(attr, key, content) {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export default usePageMeta
