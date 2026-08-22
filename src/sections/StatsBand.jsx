import Photo from '../components/Photo.jsx'
import Icon from '../components/Icons.jsx'
import Reveal, { useCountUp } from '../components/Reveal.jsx'
import { CallButton } from '../components/Button.jsx'
import { contact, hours, stats } from '../config/site.js'
import './StatsBand.css'

/**
 * The photographic band: headline and chamber hours over a scrimmed photo,
 * with the four counters sitting on hairline-split columns beneath.
 *
 * Unlike the reference this band is inset inside the container and rounded on
 * all four corners, so the page background frames it rather than the band
 * running edge to edge.
 */
export default function StatsBand() {
  return (
    <section className="section stats-band on-dark" aria-labelledby="stats-band-title">
      <div className="container">
        <div className="stats-band__panel">
          <div className="stats-band__media">
            <Photo
              src="stats-band.jpg"
              alt="A patient smiling in the treatment chair at the Shyamoli chamber"
              shape="flat"
              ratio="16/9"
            />
          </div>
          <div className="stats-band__scrim" aria-hidden="true" />

          <div className="stats-band__body">
            <div className="stats-band__top">
              <Reveal className="stats-band__intro">
                <p className="eyebrow stats-band__eyebrow">Commitment to your care</p>
                <h2 id="stats-band-title" className="stats-band__title">
                  Commitment to your oral health and smile aesthetics
                </h2>
              </Reveal>

              <Reveal className="stats-band__hours" delay={120}>
                <div className="stats-band__hours-head">
                  <h3 className="stats-band__hours-title">Chamber hours</h3>
                  <span className="icon-circle icon-circle--sm stats-band__hours-badge">
                    <Icon name="shield" size={20} />
                  </span>
                </div>

                <ul className="stats-band__hours-list">
                  {hours.rows.map((row) => (
                    <li className="stats-band__hours-row" key={row.days}>
                      <span className="stats-band__days">{row.days}</span>
                      <span className="stats-band__time">{row.time}</span>
                    </li>
                  ))}
                </ul>

                <p className="stats-band__note">{hours.emergencyNote}</p>
                <CallButton size="sm" label={`Call ${contact.phone.display}`} />
              </Reveal>
            </div>

            <ul className="stats-band__stats">
              {stats.map((stat, i) => (
                <Stat key={stat.label} stat={stat} delay={i * 90} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ stat, delay }) {
  const [ref, value] = useCountUp(stat.value, { decimals: stat.decimals || 0 })
  const shown = stat.decimals ? value.toFixed(stat.decimals) : value.toLocaleString()

  return (
    <Reveal as="li" className="stats-band__stat" delay={delay}>
      <p className="stats-band__value" ref={ref}>
        {stat.prefix && <span className="stats-band__prefix">{stat.prefix}</span>}
        {shown}
        {stat.suffix && <span className="stats-band__suffix">{stat.suffix}</span>}
      </p>
      <p className="stats-band__label">{stat.label}</p>
    </Reveal>
  )
}
