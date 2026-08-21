import type { Id } from '../../convex'

export type RoomStatus = 'lobby' | 'playing' | 'results'

export type RoomPlayer = {
  id: string
  name: string
  isHost: boolean
  completedLevel: 0 | 1 | 2 | 3
  finishedAt: number | null
}

export type GameRoom = {
  id: string
  code: string
  status: RoomStatus
  startedAt: number | null
  players: RoomPlayer[]
}

export type GameSession = {
  roomId: Id<'rooms'>
  playerId: Id<'players'>
  code: string
}

export const SESSION_STORAGE_KEY = 'vnr-game-session'
export const SESSION_EVENT = 'vnr-game-session-change'

export const LEVEL_ROUTES = {
  1: '/game/level-1',
  2: '/game/level-2',
  3: '/game/level-3',
} as const

export const LEADERBOARD_ROUTE = '/game/leaderboard'

export const LEVEL_META = [
  {
    level: 1 as const,
    title: 'Giải mã đường lối 1951',
    concept: 'Nhận biết & hiểu',
    summary: 'Hoàn thiện sơ đồ Đại hội II và Chính cương 1951 qua câu hỏi tương tác.',
  },
  {
    level: 2 as const,
    title: 'Xây dựng thế trận',
    concept: 'Phân loại & liên kết',
    summary: 'Phân loại quyết định Đông – Xuân 1953–1954 để dựng thế chủ động.',
  },
  {
    level: 3 as const,
    title: 'Giải mã Điện Biên Phủ',
    concept: 'Củng cố',
    summary: 'Trả lời đúng để hoàn thiện bức tranh chiến thắng Điện Biên Phủ.',
  },
]

export function getLevelRoute(level: 1 | 2 | 3) {
  return LEVEL_ROUTES[level]
}

/** Next route after completing a level in race mode */
export function getNextAfterLevel(level: 1 | 2 | 3) {
  if (level === 1) return '/game/level-2'
  if (level === 2) return '/game/level-3'
  return '/final'
}

export function getSession(): GameSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as GameSession) : null
  } catch {
    return null
  }
}

export function setSession(session: GameSession | null) {
  if (!session) {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  } else {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  }
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export function formatElapsed(ms: number | null | undefined) {
  if (ms == null || ms < 0) return '—'
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
