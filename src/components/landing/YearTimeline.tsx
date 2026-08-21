import type { MouseEvent } from 'react'
import { scrollToSection } from '../../animations/scroll/useLenisScroll'

type YearTimelineProps = {
  activeYear: string
  years: string[]
  visible: boolean
  onDark?: boolean
}

export function YearTimeline({ activeYear, years, visible, onDark = false }: YearTimelineProps) {
  const handleYearClick = (event: MouseEvent<HTMLAnchorElement>, year: string) => {
    event.preventDefault()
    scrollToSection(`#year-${year}`, { offset: -32, duration: 1.4 })
  }

  return (
    <nav
      aria-hidden={!visible}
      aria-label="Timeline năm"
      className={`lp-timeline ${visible ? 'is-visible' : 'is-hidden'} ${onDark ? 'is-on-dark' : ''}`}
    >
      <div className="lp-timeline__track" aria-hidden="true">
        <div className="lp-timeline__progress" />
      </div>
      <ol className="lp-timeline__list">
        {years.map((year) => (
          <li className={activeYear === year ? 'is-active' : ''} key={year}>
            <a
              href={`#year-${year}`}
              onClick={(event) => handleYearClick(event, year)}
              tabIndex={visible ? 0 : -1}
            >
              <span className="lp-timeline__dot" />
              <span className="lp-timeline__year">{year}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
