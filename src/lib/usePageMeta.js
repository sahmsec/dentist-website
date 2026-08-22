import { useEffect } from 'react'
import { identity, site } from '../config/site.js'

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
 */
export function usePageMeta({ title, description, path } = {}) {
  useEffect(() => {
    // Suffix with the practice name, not the person's — the site is titled
    // after the practice and every tab should read the same way.
    const full = title ? `${title} — ${identity.brandName}` : identity.metaTitle
    document.title = full

    const url = path ? new URL(path, site.url).href : site.url

    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
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
