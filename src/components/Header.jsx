import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

import Icon from './Icons.jsx'
import Logo from './Logo.jsx'
import { CallButton, WhatsAppButton } from './Button.jsx'
import { nav, social, contact, links } from '../config/site.js'
import './Header.css'

/* How far the page has to move before the nav row detaches and pins itself. */
const STICK_AT = 120

/* The three topbar blocks. The drawer reuses the same list on small screens,
   where the topbar itself is hidden. */
const infoBlocks = [
  { key: 'phone', icon: 'phone', label: contact.phone.label, value: contact.phone.display, href: links.tel },
  ...(contact.email
    ? [{ key: 'email', icon: 'mail', label: 'Email Address', value: contact.email.display, href: links.mailto }]
    : []),
  {
    key: 'address',
    icon: 'mapPin',
    label: 'Chamber Address',
    value: contact.address.display,
    href: links.maps,
    external: true,
  },
]

function InfoBlock({ item }) {
  return (
    <a
      className={`header__info header__info--${item.key}`}
      href={item.href}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="icon-circle icon-circle--sm">
        <Icon name={item.icon} size={18} />
      </span>
      <span className="header__info-text">
        <span className="header__info-label">{item.label}</span>
        <span className="header__info-value">{item.value}</span>
      </span>
    </a>
  )
}

function SocialRow({ className }) {
  return (
    <div className={className}>
      {social.map((s) => (
        <a
          key={s.name}
          className="header__social"
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
        >
          <Icon name={s.icon} size={15} />
        </a>
      ))}
    </div>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [stuck, setStuck] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  const [open, setOpen] = useState(false)

  const barRef = useRef(null)
  const drawerRef = useRef(null)
  const burgerRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      // One state write per painted frame, however many scroll events fire.
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setStuck(window.scrollY > STICK_AT)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // a reload part-way down the page should start already pinned
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Measured only while the bar is still in flow — once it is fixed it has
  // shrunk to --nav-h-sticky, which is not the gap the spacer has to fill.
  useLayoutEffect(() => {
    if (stuck) return
    const measure = () => barRef.current && setBarHeight(barRef.current.offsetHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [stuck])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }

    // The drawer only exists below 992px; if the window grows past that the
    // toggle that opened it is gone, so close it rather than strand it open.
    const wide = window.matchMedia('(min-width: 992px)')
    const onWiden = (e) => e.matches && setOpen(false)

    /* Both locks are needed. `overflow: hidden` stops the native scroll a
       finger drag produces; lenis.stop() stops the wheel, which Lenis handles
       itself and which the overflow rule therefore cannot reach. */
    const scrollLock = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    drawerRef.current?.focus()

    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWiden)
    return () => {
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWiden)
      document.body.style.overflow = scrollLock
      lenis?.start()
    }
  }, [open, lenis])

  return (
    <header className="header">
      <div className="header__top">
        <div className="container header__top-inner">
          <Logo />
          <div className="header__info-row">
            {infoBlocks.map((item) => (
              <InfoBlock key={item.key} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div ref={barRef} className={`header__bar ${stuck ? 'is-stuck' : ''}`}>
        <div className="container header__bar-inner">
          <div className="header__logo">
            <Logo size={38} />
          </div>

          <nav className="header__menu" aria-label="Primary">
            <ul className="header__menu-list">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <SocialRow className="header__socials" />

            <CallButton label="Book Appointment" className="header__cta" />

            <a
              className="header__call"
              href={links.tel}
              aria-label={`Call ${contact.phone.display} to book an appointment`}
            >
              <Icon name="phone" size={19} />
            </a>

            <button
              ref={burgerRef}
              type="button"
              className="header__burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-drawer"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Fills the hole the nav row leaves behind when it goes fixed. */}
      <div className="header__spacer" style={{ height: stuck ? barHeight : 0 }} aria-hidden="true" />

      <div
        className={`header__backdrop ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        id="site-drawer"
        ref={drawerRef}
        tabIndex={-1}
        className={`header__drawer ${open ? 'is-open' : ''}`}
      >
        <button
          type="button"
          className="header__drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <Icon name="close" size={20} />
        </button>

        <nav className="header__drawer-nav" aria-label="Mobile">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `header__drawer-link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <hr className="hairline" />

        <div className="header__drawer-info">
          {infoBlocks.map((item) => (
            <InfoBlock key={item.key} item={item} />
          ))}
        </div>

        <div className="header__drawer-cta">
          <CallButton label="Book Appointment" />
          <WhatsAppButton />
        </div>

        <SocialRow className="header__drawer-social" />
      </div>
    </header>
  )
}
