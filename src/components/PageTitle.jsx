import { Link } from 'react-router-dom'
import Photo from './Photo.jsx'
import Reveal from './Reveal.jsx'
import { identity } from '../config/site.js'
import './PageTitle.css'

/**
 * The banner every inner page opens with: full-bleed photograph, navy scrim,
 * white page title and a breadcrumb pill, cut off at the bottom with the deep
 * curve the rest of the layout uses.
 *
 *   <PageTitle title="Contact us" breadcrumb="Contact" image="titlebar-contact.jpg" />
 *
 * The scrim runs left-to-right rather than top-to-bottom because the text sits
 * bottom-left — that keeps the copy legible while leaving the right-hand side
 * of whatever photo is dropped in almost untouched.
 */
export default function PageTitle({ title, breadcrumb, image, eyebrow }) {
  return (
    <header className="page-title on-dark">
      {/* Decorative background: the heading beside it already names the page. */}
      <div className="page-title__media" aria-hidden="true">
        <Photo src={image} alt="" ratio="21/9" shape="flat" className="page-title__photo" priority />
      </div>
      <div className="page-title__scrim" aria-hidden="true" />

      <Reveal className="container page-title__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-title__heading">{title}</h1>

        <nav aria-label="Breadcrumb">
          <ol className="page-title__crumbs">
            <li>
              <Link to="/" className="page-title__crumb-link">
                {identity.shortName}
              </Link>
            </li>
            <li className="page-title__crumb-current" aria-current="page">
              {breadcrumb || title}
            </li>
          </ol>
        </nav>
      </Reveal>
    </header>
  )
}
