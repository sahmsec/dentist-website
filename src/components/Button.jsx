import { Link } from 'react-router-dom'
import Icon from './Icons.jsx'
import { links, contact, hero } from '../config/site.js'

/**
 * The one button in this design language: a pill with a circular arrow badge.
 * Renders as <a>, <Link> or <button> depending on what it is pointing at, so
 * callers never have to pick the element themselves.
 *
 *   <Button href={links.tel} icon="phone">Call the chamber</Button>
 *   <Button to="/services" variant="navy">All services</Button>
 *   <Button onClick={…} variant="ghost" size="sm">Filter</Button>
 */
export default function Button({
  children,
  href,
  to,
  onClick,
  variant = 'accent',
  size,
  icon = 'arrowUpRight',
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    variant !== 'accent' && `btn--${variant}`,
    size && `btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="btn__icon">
        <Icon name={icon} size={size === 'sm' ? 17 : 19} />
      </span>
      <span>{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href) {
    // Only outbound http(s) links need the new tab and the rel guard;
    // tel:, mailto: and in-page anchors must open in place.
    const external = /^https?:/i.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {inner}
    </button>
  )
}

/**
 * The primary conversion action of the whole site. Every "book an appointment"
 * on every page is this component, so the number can only ever be wrong in one
 * place — src/config/site.js.
 */
export function CallButton({ label = hero.primaryCta, variant = 'accent', size, className }) {
  return (
    <Button
      href={links.tel}
      icon="phone"
      variant={variant}
      size={size}
      className={className}
      aria-label={`Call ${contact.phone.display} to book an appointment`}
    >
      {label}
    </Button>
  )
}

/** Secondary action — opens WhatsApp with the enquiry already typed out. */
export function WhatsAppButton({ label = 'WhatsApp us', variant = 'ghost', size, className }) {
  return (
    <Button
      href={links.whatsapp}
      icon="whatsapp"
      variant={variant}
      size={size}
      className={className}
      aria-label={`Message ${contact.whatsapp.display} on WhatsApp`}
    >
      {label}
    </Button>
  )
}
