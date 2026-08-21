import { Link } from 'react-router-dom'
import { identity } from '../config/site.js'
import './Logo.css'

/**
 * Original brand mark for the practice: a tooth held inside a location pin,
 * with a sparkle cluster — the pin says "this is a chamber you go to", the
 * sparkle says cosmetic work. Drawn rather than imported so it inherits the
 * palette tokens and stays crisp at any size.
 *
 * `tone="light"` flips it for use on the dark footer / dark bands.
 */
export function LogoMark({ size = 44, tone = 'dark' }) {
  const shell = tone === 'light' ? 'var(--white)' : 'var(--navy)'
  const tooth = tone === 'light' ? 'var(--navy)' : 'var(--white)'

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className="logo-mark"
      aria-hidden="true"
      focusable="false"
    >
      {/* Pin body */}
      <path
        fill={shell}
        d="M24 4.5c-7.9 0-14.3 6.2-14.3 13.9 0 9.1 9.4 18.6 13.1 22a1.8 1.8 0 0 0 2.4 0c3.7-3.4 13.1-12.9 13.1-22C38.3 10.7 31.9 4.5 24 4.5Z"
      />
      {/* Tooth cut out of the pin */}
      <path
        fill={tooth}
        d="M24 12.6c-1.5-1-3.1-1.3-4.4-1-1.7.4-2.8 1.7-2.9 3.5-.1 1.8.3 3.2.7 4.7.3 1.2.5 2.4.6 3.7.1 1.3.3 2.2.8 2.8.4.6 1.1.6 1.5.1.4-.5.7-1.4.9-2.6.2-1.2.4-2 .8-2.3.4-.3 1-.3 1.4 0 .4.3.6 1.1.8 2.3.2 1.2.5 2.1.9 2.6.4.5 1.1.5 1.5-.1.5-.6.7-1.5.8-2.8.1-1.3.3-2.5.6-3.7.4-1.5.8-2.9.7-4.7-.1-1.8-1.2-3.1-2.9-3.5-1.3-.3-2.9 0-4.4 1Z"
      />
      {/* Sparkle cluster */}
      <path
        fill="var(--accent)"
        d="m37.6 8.2 1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8ZM32.4 2.6l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z"
      />
    </svg>
  )
}

export default function Logo({ tone = 'dark', size = 44, showText = true }) {
  return (
    <Link to="/" className={`logo logo--${tone}`} aria-label={`${identity.name} — home`}>
      <LogoMark size={size} tone={tone} />
      {showText && (
        <span className="logo__text">
          {/* The lockup carries the practice name; his surgical title is stated
              in the topbar, the hero and every page banner, so repeating it here
              would only make the mark too wide to sit beside the phone button. */}
          <span className="logo__name">Dr. Arman&rsquo;s</span>
          <span className="logo__sub">Dental Care</span>
        </span>
      )}
    </Link>
  )
}
