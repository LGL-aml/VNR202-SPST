import { useEffect, useState, type MouseEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { getLenis, scrollToTop } from '../../animations/scroll/useLenisScroll'

type HeaderProps = {
  menuAvailable: boolean
  mobileMenuOpen: boolean
  soundEnabled: boolean
  onToggleMenu: () => void
  onToggleSound: () => void
}

export function Header({ menuAvailable, mobileMenuOpen, soundEnabled, onToggleMenu, onToggleSound }: HeaderProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }

    setScrolled(false)

    const update = () => {
      const lenis = getLenis()
      const y = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY
      setScrolled(y > 48)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    let unsubscribe: (() => void) | undefined
    const timer = window.setInterval(() => {
      const lenis = getLenis()
      if (!lenis) return
      lenis.on('scroll', update)
      unsubscribe = () => lenis.off('scroll', update)
      window.clearInterval(timer)
    }, 80)

    return () => {
      window.removeEventListener('scroll', update)
      window.clearInterval(timer)
      unsubscribe?.()
    }
  }, [isHome, pathname])

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault()
      scrollToTop({ duration: 1.4 })
      return
    }
    event.preventDefault()
    navigate('/', { state: { smoothTop: true } })
  }

  const headerClass = [
    'app-header',
    isHome && !scrolled ? 'is-transparent' : '',
    isHome && scrolled ? 'is-solid' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <Link className="app-header__brand" onClick={handleBrandClick} to="/">
        <span className="app-header__brand-mark">Dấu Ấn</span>
        <span className="app-header__brand-name">Điện Biên</span>
      </Link>
      <nav aria-label="Điều hướng chính" className="app-header__nav">
        <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} end to="/">
          Trang chủ
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} to="/theory">
          Lý thuyết
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} to="/game">
          Trò chơi
        </NavLink>
      </nav>
      <div className="app-header__actions">
        <button aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'} onClick={onToggleSound} type="button">
          <Icon name={soundEnabled ? 'volume_up' : 'volume_off'} />
        </button>
        {menuAvailable && (
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            className="app-header__menu"
            onClick={onToggleMenu}
            type="button"
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
          </button>
        )}
      </div>
    </header>
  )
}
