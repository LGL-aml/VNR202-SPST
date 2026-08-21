import { useEffect, useState } from 'react'
import { getSession, SESSION_EVENT, setSession, type GameSession } from './types'

export { getSession, setSession }

export function useGameSession() {
  const [session, setSessionState] = useState<GameSession | null>(() => getSession())

  useEffect(() => {
    const sync = () => setSessionState(getSession())
    window.addEventListener(SESSION_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SESSION_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return session
}
