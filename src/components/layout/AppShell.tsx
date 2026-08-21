import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'convex/react'
import { api } from '../../convex'
import { getLenis } from '../../animations/scroll/useLenisScroll'
import { useGameSession, setSession } from '../../game/room/session'
import { LEADERBOARD_ROUTE } from '../../game/room/types'
import { useSiteAudio } from '../../hooks/useSiteAudio'
import { Footer } from './Footer'
import { Header } from './Header'
import './layout.css'

export function AppShell() {
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  const session = useGameSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { soundEnabled, toggleSound } = useSiteAudio()
  const isHome = pathname === '/'
  const isTheory = pathname.startsWith('/theory')
  const isGame = pathname.startsWith('/game')
  const isImmersive = isHome || isTheory || isGame || pathname === '/final' || pathname === '/completed'

  const room = useQuery(api.rooms.get, session ? { roomId: session.roomId } : 'skip')
  const player = useQuery(api.rooms.getPlayer, session ? { playerId: session.playerId } : 'skip')

  useEffect(() => {
    setMobileOpen(false)
    const smoothTop = Boolean(state && typeof state === 'object' && 'smoothTop' in state && state.smoothTop)
    if (pathname === '/' && smoothTop) return

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, state])

  // Host ended session / room wiped → everyone back to lobby
  useEffect(() => {
    if (!session) return
    if (room !== null) return
    setSession(null)
    if (pathname.startsWith('/game') || pathname === '/final') {
      navigate('/game', { replace: true })
    }
  }, [session, room, pathname, navigate])

  // Host monitors on leaderboard; never play levels
  useEffect(() => {
    if (!room || !player || !player.isHost) return
    if (room.status !== 'playing' && room.status !== 'results') return
    if (pathname === LEADERBOARD_ROUTE) return
    if (pathname.startsWith('/game/level-') || pathname === '/final' || pathname === '/game') {
      navigate(LEADERBOARD_ROUTE, { replace: true })
    }
  }, [room, player, pathname, navigate])

  // Players: when game starts from lobby page, jump into level 1
  useEffect(() => {
    if (!room || !player || player.isHost) return
    if (room.status !== 'playing') return
    if (pathname !== '/game') return
    navigate('/game/level-1', { replace: true })
  }, [room, player, pathname, navigate])

  return (
    <div
      className={[
        'app-shell',
        isImmersive ? 'is-immersive' : '',
        isHome ? 'is-home' : '',
        isTheory ? 'is-theory' : '',
        isGame ? 'is-game' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Header
        menuAvailable={false}
        mobileMenuOpen={mobileOpen}
        onToggleMenu={() => setMobileOpen((current) => !current)}
        onToggleSound={() => {
          void toggleSound()
        }}
        soundEnabled={soundEnabled}
      />
      <main className="app-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
