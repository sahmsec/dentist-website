/**
 * Icon set — every icon in the site is authored here on a single 24×24 grid at
 * 1.7 stroke, so the dental-specific glyphs sit at the same optical weight as
 * the interface ones. Nothing is imported from an icon package, which keeps the
 * stroke language consistent and the bundle free of a third-party dependency.
 *
 * Usage:  <Icon name="tooth" size={28} />
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* ── Dental ──────────────────────────────────────────────────────────────── */

const Tooth = (
  <path
    {...stroke}
    d="M12 4.2c-1.5-1-3-1.4-4.4-1.1C5.7 3.5 4.4 5 4.2 7c-.2 2 .3 3.6.8 5.4.4 1.4.6 2.8.7 4.3.1 1.5.4 2.6.9 3.3.5.7 1.3.8 1.8.2.5-.6.8-1.6 1-3 .2-1.4.5-2.3 1-2.7.4-.4 1.2-.4 1.6 0 .5.4.8 1.3 1 2.7.2 1.4.5 2.4 1 3 .5.6 1.3.5 1.8-.2.5-.7.8-1.8.9-3.3.1-1.5.3-2.9.7-4.3.5-1.8 1-3.4.8-5.4-.2-2-1.5-3.5-3.4-3.9-1.4-.3-2.9.1-4.4 1.1Z"
  />
)

const Braces = (
  <g {...stroke}>
    <path d="M3 8.5c0-1.4 1.1-2.5 2.5-2.5h13c1.4 0 2.5 1.1 2.5 2.5v7c0 1.4-1.1 2.5-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-7Z" />
    <path d="M3 12h18M8.5 6v12M15.5 6v12" />
  </g>
)

const Implant = (
  <g {...stroke}>
    <path d="M12 2.6c-1.9 0-3.4 1.5-3.4 3.4 0 1.2.5 2 1 2.8.4.6.7 1.1.7 1.7h3.4c0-.6.3-1.1.7-1.7.5-.8 1-1.6 1-2.8 0-1.9-1.5-3.4-3.4-3.4Z" />
    <path d="M10.3 12.2h3.4M10.1 15h3.8M10.4 17.8h3.2M12 10.5V21" />
  </g>
)

const Sparkle = (
  <g {...stroke}>
    <path d="M12 3.2 13.6 8 18 9.6 13.6 11.2 12 16l-1.6-4.8L6 9.6 10.4 8 12 3.2Z" />
    <path d="M18.4 15.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2ZM5.6 3.4l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4L3.7 5.3l1.4-.5.5-1.4Z" />
  </g>
)

const Whitening = (
  <g {...stroke}>
    <path d="M12 5.4c-1.3-.9-2.6-1.2-3.8-1-1.6.3-2.8 1.6-3 3.3-.1 1.7.3 3.1.7 4.6.3 1.2.5 2.4.6 3.7.1 1.3.4 2.2.8 2.8.5.6 1.2.7 1.6.2.4-.5.7-1.4.9-2.6.2-1.2.4-2 .8-2.3.4-.4 1-.4 1.4 0" />
    <path d="M15.2 12.1c.4 0 .7.2 1 .5.4.4.6 1.1.8 2.3.2 1.2.4 2.1.9 2.6.4.5 1.1.4 1.6-.2.4-.6.7-1.5.8-2.8.1-1.3.2-2.5.6-3.7" />
    <path d="M17.6 4.2l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" />
  </g>
)

const Surgery = (
  <g {...stroke}>
    <path d="M4 20.2 14.4 9.8" />
    <path d="M13.2 8.6 17 4.8a2.7 2.7 0 0 1 3.8 0 2.7 2.7 0 0 1 0 3.8l-3.8 3.8" />
    <path d="M14.4 9.8 17 12.4" />
    <circle cx="5.2" cy="19" r="1.6" />
  </g>
)

const ShieldTooth = (
  <g {...stroke}>
    <path d="M12 2.8 4.8 5.6v5.6c0 4.3 3 8.3 7.2 9.9 4.2-1.6 7.2-5.6 7.2-9.9V5.6L12 2.8Z" />
    <path d="M12 8.2c-.8-.6-1.7-.8-2.4-.5-.9.3-1.4 1.1-1.4 2.1 0 .9.3 1.6.5 2.4.2.7.3 1.4.3 2 0 .6.2 1 .5 1.2.3.2.6.1.8-.2.2-.3.3-.8.4-1.4.1-.6.3-1 .6-1.2.3-.2.7-.2 1 0 .3.2.5.6.6 1.2.1.6.2 1.1.4 1.4.2.3.5.4.8.2.3-.2.5-.6.5-1.2 0-.6.1-1.3.3-2 .2-.8.5-1.5.5-2.4 0-1-.5-1.8-1.4-2.1-.7-.3-1.6-.1-2.4.5Z" />
  </g>
)

const Smile = (
  <g {...stroke}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M8.4 13.6c.9 1.7 2.2 2.5 3.6 2.5s2.7-.8 3.6-2.5" />
    <path d="M9 9.4h.01M15 9.4h.01" strokeWidth="2.2" />
  </g>
)

/* ── Interface ───────────────────────────────────────────────────────────── */

const Phone = (
  <path
    {...stroke}
    d="M6.3 3.4h3l1.5 3.8-1.9 1.1a11.6 11.6 0 0 0 5.4 5.4l1.1-1.9 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A16.4 16.4 0 0 1 4.5 5.4a1.8 1.8 0 0 1 1.8-2Z"
  />
)

const Mail = (
  <g {...stroke}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
    <path d="m3.4 6.6 7.4 5.4c.7.5 1.7.5 2.4 0l7.4-5.4" />
  </g>
)

const MapPin = (
  <g {...stroke}>
    <path d="M12 21.4c4-4 6.4-7.1 6.4-10.2a6.4 6.4 0 1 0-12.8 0c0 3.1 2.4 6.2 6.4 10.2Z" />
    <circle cx="12" cy="11" r="2.4" />
  </g>
)

const Clock = (
  <g {...stroke}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M12 6.8V12l3.4 2" />
  </g>
)

const ArrowUpRight = <path {...stroke} d="M7.5 16.5 16.5 7.5M8.6 7.5h7.9v7.9" />
const ArrowRight = <path {...stroke} d="M4.5 12h15M13.5 6l6 6-6 6" />
const ArrowLeft = <path {...stroke} d="M19.5 12h-15M10.5 6l-6 6 6 6" />
const ArrowUp = <path {...stroke} d="M12 19.5v-15M6 10.5l6-6 6 6" />
const Check = <path {...stroke} d="m5 12.6 4.4 4.4L19 7.4" />
const ChevronDown = <path {...stroke} d="m6.5 9.5 5.5 5.5 5.5-5.5" />
const Plus = <path {...stroke} d="M12 5v14M5 12h14" />
const Minus = <path {...stroke} d="M5 12h14" />
const Menu = <path {...stroke} d="M3.5 7h17M3.5 12h17M3.5 17h17" />
const Close = <path {...stroke} d="M6 6l12 12M18 6 6 18" />

const Star = (
  <path
    fill="currentColor"
    d="m12 3.4 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.5l5.8-.8L12 3.4Z"
  />
)

const Quote = (
  <path
    fill="currentColor"
    d="M9.4 5.6c-3 1.4-4.8 4-4.8 7.4v5.4h6.4v-6.6H7.6c0-2 .8-3.3 2.6-4.2l-.8-2ZM19 5.6c-3 1.4-4.8 4-4.8 7.4v5.4h6.4v-6.6h-3.4c0-2 .8-3.3 2.6-4.2l-.8-2Z"
  />
)

/* ── Social — brand marks are filled, matching how they appear elsewhere ──── */

const Facebook = (
  <path
    fill="currentColor"
    d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.4 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.7V13h2.7v8h3.2Z"
  />
)

const Instagram = (
  <g {...stroke}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
  </g>
)

const Youtube = (
  <g>
    <rect {...stroke} x="2.4" y="5.4" width="19.2" height="13.2" rx="4" />
    <path fill="currentColor" d="M10.2 8.9v6.2l5.4-3.1-5.4-3.1Z" />
  </g>
)

const Whatsapp = (
  <path
    fill="currentColor"
    d="M12 2.4a9.5 9.5 0 0 0-8.2 14.3L2.4 21.6l5-1.3A9.5 9.5 0 1 0 12 2.4Zm0 1.8a7.7 7.7 0 1 1-3.9 14.35l-.35-.2-2.95.77.79-2.88-.22-.36A7.7 7.7 0 0 1 12 4.2Zm-3.35 3.6c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.75 2.78 4.3 3.79 2.12.84 2.55.67 3.01.63.46-.04 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.1-.23-.17-.48-.29-.25-.13-1.49-.73-1.72-.82-.23-.08-.4-.12-.57.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.51.11-.11.25-.29.38-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.48-.4-.42-.55-.43h-.47Z"
  />
)

const registry = {
  tooth: Tooth,
  braces: Braces,
  implant: Implant,
  sparkle: Sparkle,
  whitening: Whitening,
  surgery: Surgery,
  shield: ShieldTooth,
  smile: Smile,
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  clock: Clock,
  arrowUpRight: ArrowUpRight,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUp: ArrowUp,
  check: Check,
  chevronDown: ChevronDown,
  plus: Plus,
  minus: Minus,
  menu: Menu,
  close: Close,
  star: Star,
  quote: Quote,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  whatsapp: Whatsapp,
}

export default function Icon({ name, size = 24, className, ...rest }) {
  const glyph = registry[name]
  if (!glyph) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}

export const iconNames = Object.keys(registry)
