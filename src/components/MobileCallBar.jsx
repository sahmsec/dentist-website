import { useEffect } from 'react'
import Icon from './Icons.jsx'
import { contact, links } from '../config/site.js'
import './MobileCallBar.css'

/**
 * On a phone the whole point of the site is one tap away at all times. Two
 * equal halves pinned to the bottom edge, hidden entirely from 768px up where
 * the header CTA and the contact row already carry the number.
 *
 * The bar is fixed, so it would otherwise cover the end of the footer. Rather
 * than a spacer element that the layout has to remember to place, the component
 * flags <body> and MobileCallBar.css reserves exactly the bar's height — height
 * plus the home-indicator inset — for as long as the bar is mounted.
 */
export default function MobileCallBar() {
  useEffect(() => {
    document.body.classList.add('has-call-bar')
    return () => document.body.classList.remove('has-call-bar')
  }, [])

  return (
    <nav className="call-bar" aria-label="Quick contact">
      <a
        className="call-bar__action call-bar__action--call"
        href={links.tel}
        aria-label={`Call the chamber on ${contact.phone.display}`}
      >
        <Icon name="phone" size={20} />
        <span>Call now</span>
      </a>
      <a
        className="call-bar__action call-bar__action--whatsapp"
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message the chamber on WhatsApp at ${contact.whatsapp.display}`}
      >
        <Icon name="whatsapp" size={20} />
        <span>WhatsApp</span>
      </a>
    </nav>
  )
}
