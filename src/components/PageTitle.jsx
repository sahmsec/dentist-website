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
 *
 * `whole` fits the entire photograph into the band instead of filling it, for
 * the pages where the picture is the subject and cropping it loses the point.
 * The band keeps its usual height either way — a banner tall enough to hold a
 * 2:1 photograph edge to edge is most of a laptop screen, which is a hero, not
 * a page title. A blurred copy of the same file fills the width behind it, so
 * the bar still reads as one photograph rather than a picture on a navy slab.
 *
 *   <PageTitle … image="titlebar-contact.jpg" whole />
 */
export default function PageTitle({ title, breadcrumb, image, eyebrow, whole = false }) {
  return (
    <header className={`page-title on-dark${whole ? ' page-title--whole' : ''}`}>
      {/* Decorative background: the heading beside it already names the page. */}
      <div className="page-title__media" aria-hidden="true">
        {whole && (
          /* Same file, so it is already in cache — no second request. */
          <Photo src={image} alt="" ratio="21/9" shape="flat" className="page-title__wash" priority />
        )}
        {/* ratio="auto" in whole mode, so the element box takes the file's own
            shape. Photo writes the ratio as an inline style, which beats the
            stylesheet — left at 21/9 the box stays wider than the picture and
            `contain` letterboxes it inside its own element, putting a seam
            where the paint stops rather than at the edge of the bar. */}
        <Photo
          src={image}
          alt=""
          ratio={whole ? 'auto' : '21/9'}
          shape="flat"
          className="page-title__photo"
          priority
        />
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
