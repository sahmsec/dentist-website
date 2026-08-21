import { useState } from 'react'
import './Photo.css'

/**
 * Every photograph on the site goes through here.
 *
 * Photos live in /public/images/. Until a file is dropped in, the <img> fails
 * to load and this swaps in a branded placeholder — a palette gradient with the
 * tooth watermark and the slot's own filename printed on it. That means the
 * layout is never broken by a missing asset, and whoever is filling the folder
 * can see on the page exactly which filename each slot wants.
 *
 *   <Photo src="service-general.jpg" alt="…" ratio="4/3" />
 *
 * Replacing a placeholder is just: save the photo as that filename. No code
 * change, no rebuild step beyond the dev server picking the file up.
 */
export default function Photo({
  src,
  alt = '',
  ratio = '4/3',
  className = '',
  shape = '',
  loading = 'lazy',
  sizes,
  priority = false,
}) {
  const [failed, setFailed] = useState(false)
  const url = src ? `/images/${src}` : null

  // A stable hue per filename, so sibling placeholders in a grid differ from
  // each other instead of reading as one flat block of colour.
  const seed = [...(src || 'x')].reduce((a, c) => a + c.charCodeAt(0), 0)
  const drift = (seed % 5) * 6 - 12

  const classes = ['photo', shape && `photo--${shape}`, className].filter(Boolean).join(' ')

  if (!url || failed) {
    // alt="" is a deliberate statement that the image carries no meaning, so
    // the placeholder must stay out of the accessibility tree too — otherwise
    // every empty slot announces itself while the photos are still missing.
    const decorative = alt === ''

    return (
      <div
        className={`${classes} photo--empty`}
        style={{ aspectRatio: ratio, '--drift': `${drift}deg` }}
        {...(decorative ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': alt })}
      >
        <svg className="photo__watermark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M24 9.5c-3-2-6.2-2.7-8.9-2.1-3.5.8-5.7 3.5-6 7.2-.3 3.7.6 6.6 1.5 9.6.7 2.5 1 5 1.2 7.6.2 2.6.7 4.5 1.6 5.7.9 1.2 2.3 1.1 3.1.2.9-1 1.5-2.9 1.9-5.3.4-2.4.8-4.1 1.6-4.8.8-.7 2.2-.7 3 0 .8.7 1.2 2.4 1.6 4.8.4 2.4 1 4.3 1.9 5.3.8.9 2.2 1 3.1-.2.9-1.2 1.4-3.1 1.6-5.7.2-2.6.5-5.1 1.2-7.6.9-3 1.8-5.9 1.5-9.6-.3-3.7-2.5-6.4-6-7.2-2.7-.6-5.9.1-8.9 2.1Z"
          />
        </svg>
        {src && <span className="photo__slot">{src}</span>}
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      className={classes}
      style={{ aspectRatio: ratio }}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
