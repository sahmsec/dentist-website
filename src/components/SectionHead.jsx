import Reveal from './Reveal.jsx'

/**
 * Eyebrow pill + headline (+ optional supporting copy or action), in the three
 * arrangements the reference layout uses:
 *
 *   align="left"    stacked left, copy underneath
 *   align="center"  stacked centre, capped width
 *   align="split"   headline left, copy right, baselines aligned
 */
export default function SectionHead({
  eyebrow,
  title,
  highlight = [],
  text,
  align = 'left',
  as: Heading = 'h2',
  children,
  className = '',
}) {
  const variant =
    align === 'center' ? 'section-head--center' : align === 'split' ? 'section-head--split' : ''

  const headline = (
    <Heading>{highlight.length ? renderHighlighted(title, highlight) : title}</Heading>
  )

  if (align === 'split') {
    return (
      <Reveal className={`section-head ${variant} ${className}`.trim()}>
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {headline}
        </div>
        <div className="section-head__aside">
          {text && <p className="lede">{text}</p>}
          {children}
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal className={`section-head ${variant} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {headline}
      {text && <p className="lede">{text}</p>}
      {children}
    </Reveal>
  )
}

/**
 * Wraps any word listed in `highlight` in an accent-coloured span, so the
 * emphasis in a headline is data in site.js rather than markup in a component.
 * Matching is case-insensitive and ignores trailing punctuation.
 */
export function renderHighlighted(text, highlight) {
  if (!highlight?.length) return text
  const wanted = new Set(highlight.map((w) => w.toLowerCase()))

  return text.split(/(\s+)/).map((chunk, i) => {
    const bare = chunk.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, '')
    return wanted.has(bare) ? (
      <span className="hl" key={i}>
        {chunk}
      </span>
    ) : (
      chunk
    )
  })
}
