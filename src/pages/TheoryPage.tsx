import { Link } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { theoryChapters } from '../data/theoryChapters'
import '../styles/pages.css'

export function TheoryPage() {
  return (
    <div className="page theory-page">
      <header className="section-header">
        <div>
          <p className="page-kicker"><Icon name="folder_special" /> Hồ sơ mật – Cấp độ 1</p>
          <h1 className="page-heading">Lý thuyết</h1>
          <p className="page-lead">Ba chuyên đề nối liền đường lối năm 1951, thế trận Đông – Xuân và Chiến thắng Điện Biên Phủ.</p>
        </div>
        <span className="stamp">Tư liệu lưu trữ</span>
      </header>

      <section aria-label="Danh sách chương" className="chapter-grid">
        {theoryChapters.map((chapter) => (
          <article className="paper-card chapter-card" key={chapter.slug}>
            <div className="chapter-card__meta">
              <span>Chương {chapter.number}</span>
              <strong>{chapter.period}</strong>
            </div>
            <h2>{chapter.title}</h2>
            <p>{chapter.summary}</p>
            <img alt={chapter.imageAlt} src={chapter.image} />
            <Link className="button" to={`/theory/${chapter.slug}`}>
              Đọc nội dung <Icon name="arrow_forward" />
            </Link>
          </article>
        ))}
      </section>

      <div className="theory-cta">
        <p>Đã nắm rõ đường lối, thế trận và quyết định chiến lược?</p>
        <Link className="button" to="/game"><Icon name="sports_esports" /> Bắt đầu trò chơi</Link>
      </div>
    </div>
  )
}
