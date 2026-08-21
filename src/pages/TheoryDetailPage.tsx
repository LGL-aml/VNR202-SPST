import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { theoryChapters } from '../data/theoryChapters'
import '../styles/pages.css'

export function TheoryDetailPage() {
  const { chapter: slug } = useParams()
  const chapterIndex = theoryChapters.findIndex((item) => item.slug === slug)

  if (chapterIndex < 0) return <Navigate replace to="/theory" />

  const chapter = theoryChapters[chapterIndex]
  const nextChapter = theoryChapters[chapterIndex + 1]

  return (
    <article className="page theory-detail">
      <header className="theory-detail__header">
        <div>
          <p className="page-kicker">Chương {chapter.number}</p>
          <h1 className="page-heading">{chapter.period}</h1>
          <h2>{chapter.title}</h2>
        </div>
        <span className="stamp">Mật kết</span>
      </header>

      <div className="theory-detail__grid">
        <div className="theory-detail__main">
          <section className="fact-grid" aria-label="Thông tin cơ bản">
            <div className="paper-card fact-card">
              <h3>Thông tin cơ bản</h3>
              <dl>
                {chapter.facts.map((fact) => (
                  <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                ))}
              </dl>
            </div>
            <figure className="paper-card archive-image">
              <img alt={chapter.imageAlt} src={chapter.image} />
              <figcaption>{chapter.imageAlt}</figcaption>
            </figure>
          </section>

          <nav aria-label="Mục lục chương" className="paper-card theory-toc">
            <span className="mono-label">Mục lục hồ sơ</span>
            <ol>
              {chapter.sections.map((section, index) => (
                <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>
              ))}
            </ol>
          </nav>

          <div className="historical-copy">
            {chapter.sections.map((section, index) => (
              <section className="historical-section" id={section.id} key={section.id}>
                <header>
                  <span>Mục {String(index + 1).padStart(2, '0')}</span>
                  <h3>{section.title}</h3>
                </header>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.highlights && (
                  <ul aria-label={`Từ khóa ${section.title}`} className="historical-highlights">
                    {section.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="paper-card key-points">
            <h3><Icon name="policy" /> Những điểm cần ghi nhớ</h3>
            {chapter.keyPoints.map((point) => (
              <div key={point.title}><h4>{point.title}</h4><p>{point.body}</p></div>
            ))}
          </section>
        </div>

        <aside className="theory-detail__aside">
          <div className="paper-card map-brief">
            <span className="mono-label">{chapter.documentLabel}</span>
            <img alt={chapter.imageAlt} src={chapter.image} />
            <strong><Icon name="location_on" filled /> {chapter.period}</strong>
          </div>
          <div className="paper-card timeline-brief">
            <span className="stamp">Tuyệt mật</span>
            <h3>Dấu mốc chính</h3>
            {chapter.facts.map((fact, index) => (
              <div className="timeline-brief__item" key={fact.label}>
                <i className={index === 0 ? 'is-active' : ''} />
                <span>{fact.label}</span><strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <footer className="theory-detail__actions">
        <Link className="button button--secondary" to="/theory"><Icon name="arrow_back" /> Danh sách chương</Link>
        <Link className="button" to={nextChapter ? `/theory/${nextChapter.slug}` : '/game'}>
          {nextChapter ? 'Chương tiếp theo' : 'Bắt đầu trò chơi'} <Icon name="arrow_forward" />
        </Link>
      </footer>
    </article>
  )
}
