import { NavLink } from 'react-router-dom'
import { Icon } from '../common/Icon'

type SidebarProps = {
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
  onToggleCollapsed: () => void
}

const navItems = [
  { to: '/', icon: 'flag', label: 'Bắt đầu', end: true },
  { to: '/theory', icon: 'menu_book', label: 'Lý thuyết' },
  { to: '/game', icon: 'sports_esports', label: 'Trò chơi' },
]

export function Sidebar({ collapsed, mobileOpen, onCloseMobile, onToggleCollapsed }: SidebarProps) {
  return (
    <>
      <button
        aria-label="Đóng menu"
        className={`sidebar-backdrop ${mobileOpen ? 'is-visible' : ''}`}
        onClick={onCloseMobile}
        type="button"
      />
      <aside className={`app-sidebar ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`}>
        <div className="app-sidebar__identity">
          <span className="app-sidebar__period">1951–1954</span>
          <strong>Dấu Ấn Điện Biên</strong>
          <small>Hành trình lịch sử tương tác</small>
        </div>
        <nav aria-label="Điều hướng bên" className="app-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              end={item.end}
              key={item.to}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              to={item.to}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="app-sidebar__secondary">
          <button title={collapsed ? 'Cài đặt' : undefined} type="button">
            <Icon name="settings" />
            <span>Cài đặt</span>
          </button>
          <button title={collapsed ? 'Trợ giúp' : undefined} type="button">
            <Icon name="help" />
            <span>Trợ giúp</span>
          </button>
        </div>
        <button
          aria-label={collapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
          className="app-sidebar__collapse"
          onClick={onToggleCollapsed}
          type="button"
        >
          <Icon name={collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'} />
          <span>{collapsed ? 'Mở rộng' : 'Thu gọn'}</span>
        </button>
      </aside>
    </>
  )
}

