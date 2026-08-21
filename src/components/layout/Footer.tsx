import { Link, useLocation } from 'react-router-dom'
import { siteBrand } from '../../data/history'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__mark">{siteBrand.name}</p>
          <p className="site-footer__tagline">{siteBrand.tagline}</p>
          <p className="site-footer__period">{siteBrand.period}</p>
        </div>

        <nav aria-label="Liên kết chân trang" className="site-footer__nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/theory">Lý thuyết</Link>
          <Link to="/game">Trò chơi</Link>
        </nav>

        <div className="site-footer__copy">
          <p className="site-footer__desc">Sản phẩm sáng tạo học tập lịch sử Đảng</p>
          <p className="site-footer__desc">Giai đoạn kháng chiến chống thực dân Pháp 1951-1954.</p>
          <p className="site-footer__legal">
            © {new Date().getFullYear()} {siteBrand.name}. Tư liệu mang tính giáo dục.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function Footer() {
  const { pathname } = useLocation()

  // Hide site footer on active gameplay / race screens
  if (
    pathname.startsWith('/game/level-') ||
    pathname === '/game/leaderboard' ||
    pathname === '/final'
  ) {
    return null
  }

  return <SiteFooter />
}
