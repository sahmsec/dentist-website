import { useEffect } from 'react'
import { identity } from '../config/site.js'

/**
 * Sets the document title and meta description for the page that calls it.
 *
 * Nothing is restored on unmount: every route calls this on mount, so the next
 * page overwrites both values before anyone can read a stale one.
 *
 *   usePageMeta({ title: 'Contact', description: '…' })   → "Contact — Dr. Arman's Dental Care"
 *   usePageMeta({ title: null, description: '…' })        → identity.metaTitle verbatim
 */
export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    // Suffix with the practice name, not the person's — the site is titled
    // after the practice and every tab should read the same way.
    document.title = title ? `${title} — ${identity.brandName}` : identity.metaTitle

    if (!description) return

    // index.html ships the tag, but create it if a future template drops it.
    let tag = document.head.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
}

export default usePageMeta
