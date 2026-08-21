import { Link } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import '../styles/cinematic.css'

const completionLevels = [
  { number: '01', concept: 'Nhận biết & hiểu', title: 'Giải mã đường lối 1951', key: 'vnr-game-v2-level-1' },
  { number: '02', concept: 'Phân loại & liên kết', title: 'Xây dựng thế trận', key: 'vnr-game-v2-level-2' },
  { number: '03', concept: 'Củng cố', title: 'Giải mã Điện Biên Phủ', key: 'vnr-game-v2-level-3' },
]

export function CompletedPage() {
  const levels = completionLevels.map((level) => ({
    ...level,
    complete: localStorage.getItem(level.key) === 'complete',
  }))

  return (
    <div className="completed-page">
      <section className="paper-card completed-dossier">
        <span className="stamp">Hoàn tất</span>
        <header>
          <p className="page-kicker">Hồ sơ hành trình</p>
          <h1>Hành trình 1951–1954</h1>
          <p>Từ đường lối, thế trận và những quyết định chiến lược đến Chiến thắng Điện Biên Phủ.</p>
        </header>
        <div className="completed-grid">
          {levels.map((level) => (
            <article className={level.complete ? 'is-complete' : ''} key={level.number}>
              <strong>{level.number}</strong>
              <span>{level.concept}</span>
              <h2>{level.title}</h2>
              <Icon name={level.complete ? 'check_circle' : 'radio_button_unchecked'} filled={level.complete} />
            </article>
          ))}
        </div>
        <div className="completed-actions">
          <Link className="button button--secondary" to="/theory"><Icon name="menu_book" /> Xem lại lý thuyết</Link>
          <Link className="button" to="/game"><Icon name="replay" /> Chơi lại</Link>
          <Link className="button button--secondary" to="/"><Icon name="home" /> Về trang chủ</Link>
        </div>
      </section>
    </div>
  )
}
