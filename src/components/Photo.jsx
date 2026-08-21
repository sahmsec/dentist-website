import { useState } from 'react'
import Icon from './Icons.jsx'
import './Photo.css'

/**
 * Every photograph on the site goes through here.
 *
 * Photos live in /public/images/. Until a file is dropped in, the <img> fails to
 * load and this swaps in a branded panel instead, so a half-filled image folder
 * never breaks the layout.
 *
 * The fallback is designed to be presentable, not a placeholder-looking hole:
 *   icon="tooth"      draws that glyph, so a service card without a photograph
 *                     still says what it is
 *   initials="NJ"     draws a monogram, used for people we have no portrait of.
 *                     Preferable to a stock face — it reads as deliberate and
 *                     does not put an invented person on a real practice's site.
 * The filename is printed on the panel in dev only, as a hint to whoever is
 * filling the folder; production shows a clean panel.
 *
 *   <Photo src="service-general.jpg" alt="…" ratio="4/3" icon="tooth" />
 */
export default function Photo({
  src,
  alt = '',
  ratio = '4/3',
  className = '',
  shape = '',
  icon,
  initials,
  loading = 'lazy',
  sizes,
  priority = false,
  objectPosition,
}) {
  const [failed, setFailed] = useState(false)
  const url = src ? `/images/${src}` : null

  // A stable hue per filename, so sibling panels in a grid differ from each
  // other instead of reading as one flat block of colour.
  const seed = [...(src || initials || 'x')].reduce((a, c) => a + c.charCodeAt(0), 0)
  const drift = (seed % 5) * 6 - 12

  const classes = ['photo', shape && `photo--${shape}`, className].filter(Boolean).join(' ')

  if (!url || failed) {
    // alt="" is a deliberate statement that the image carries no meaning, so the
    // panel must stay out of the accessibility tree too.
    const decorative = alt === ''

    return (
      <div
        className={`${classes} photo--empty`}
        style={{ aspectRatio: ratio, '--drift': `${drift}deg` }}
        {...(decorative ? { 'aria-hidden': 'true' } : { role: 'img', 'aria-label': alt })}
      >
        {initials ? (
          <span className="photo__initials">{initials}</span>
        ) : icon ? (
          <span className="photo__glyph">
            <Icon name={icon} size={64} />
          </span>
        ) : (
          <svg className="photo__watermark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M24 9.5c-3-2-6.2-2.7-8.9-2.1-3.5.8-5.7 3.5-6 7.2-.3 3.7.6 6.6 1.5 9.6.7 2.5 1 5 1.2 7.6.2 2.6.7 4.5 1.6 5.7.9 1.2 2.3 1.1 3.1.2.9-1 1.5-2.9 1.9-5.3.4-2.4.8-4.1 1.6-4.8.8-.7 2.2-.7 3 0 .8.7 1.2 2.4 1.6 4.8.4 2.4 1 4.3 1.9 5.3.8.9 2.2 1 3.1-.2.9-1.2 1.4-3.1 1.6-5.7.2-2.6.5-5.1 1.2-7.6.9-3 1.8-5.9 1.5-9.6-.3-3.7-2.5-6.4-6-7.2-2.7-.6-5.9.1-8.9 2.1Z"
            />
          </svg>
        )}

        {import.meta.env.DEV && src && <span className="photo__slot">{src}</span>}
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      className={classes}
      style={{ aspectRatio: ratio, objectPosition }}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
