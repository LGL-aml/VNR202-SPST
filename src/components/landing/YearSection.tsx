import type { HistoryYear } from '../../data/history'

type YearSectionProps = {
  entry: HistoryYear
  index: number
}

export function YearSection({ entry, index }: YearSectionProps) {
  const isOdd = index % 2 === 1
  const primary = entry.images[0]
  const secondary = entry.images[1]
  const tertiary = entry.images[2]

  return (
    <section
      className={`lp-year lp-year--${entry.year} ${isOdd ? 'is-reversed' : ''}`}
      data-year={entry.year}
      id={`year-${entry.year}`}
    >
      <div className="lp-year__meta">
        <p className="lp-year__num lp-reveal">{entry.year}</p>
        {entry.date && <p className="lp-year__date lp-reveal">{entry.date}</p>}
        <h2 className="lp-year__title lp-reveal">{entry.title}</h2>
        {entry.subtitle && <p className="lp-year__subtitle lp-reveal">{entry.subtitle}</p>}
        <p className="lp-year__summary lp-reveal">{entry.summary}</p>
        <ul className="lp-year__points">
          {entry.points.map((point) => (
            <li className="lp-reveal" key={point}>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="lp-year__visuals">
        {primary && (
          <figure className="lp-year__photo lp-year__photo--primary lp-reveal">
            <img alt={primary.alt} className="lp-archival" loading="lazy" src={primary.src} />
            <figcaption>{primary.caption}</figcaption>
          </figure>
        )}
        {secondary && (
          <figure className="lp-year__photo lp-year__photo--secondary lp-reveal">
            <img alt={secondary.alt} className="lp-archival" loading="lazy" src={secondary.src} />
            <figcaption>{secondary.caption}</figcaption>
          </figure>
        )}
        {entry.mapSrc && (
          <figure className="lp-year__map lp-reveal">
            <img alt={`Bản đồ ${entry.title}`} className="lp-archival" loading="lazy" src={entry.mapSrc} />
            <figcaption>Bản đồ chiến dịch</figcaption>
          </figure>
        )}
        {tertiary && (
          <figure className="lp-year__photo lp-year__photo--tertiary lp-reveal">
            <img alt={tertiary.alt} className="lp-archival" loading="lazy" src={tertiary.src} />
            <figcaption>{tertiary.caption}</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
