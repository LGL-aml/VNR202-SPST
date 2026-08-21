import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api, type Id } from '../../convex'
import {
  getLevelRoute,
  getSession,
  setSession,
  type GameRoom,
  type GameSession,
  type RoomPlayer,
} from './types'

/** Pull a short user-facing message out of Convex / JS error dumps. */
function getUserErrorMessage(err: unknown, fallback: string) {
  const raw =
    err instanceof Error
      ? err.message
      : typeof err === 'string'
        ? err
        : fallback

  // Convex wraps: "... Uncaught Error: <message>\n    at handler ..."
  const uncaught = raw.match(/Uncaught Error:\s*(.+?)(?:\n|$)/i)
  if (uncaught?.[1]) return uncaught[1].trim()

  // Or: "... Error: <message> at handler"
  const plain = raw.match(/Error:\s*([^\n]+?)(?:\s+at\s|\n|$)/i)
  if (plain?.[1] && !plain[1].includes('[CONVEX')) return plain[1].trim()

  // Already a short message (no Convex prefix)
  if (!raw.includes('[CONVEX') && raw.length < 160) return raw.trim()

  return fallback
}

function mapPlayer(doc: {
  _id: Id<'players'>
  name: string
  isHost: boolean
  completedLevel: 0 | 1 | 2 | 3
  finishedAt?: number
}): RoomPlayer {
  return {
    id: doc._id,
    name: doc.name,
    isHost: doc.isHost,
    completedLevel: doc.completedLevel,
    finishedAt: doc.finishedAt ?? null,
  }
}

export function useGameRoom() {
  const [session, setSessionState] = useState<GameSession | null>(() => getSession())
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const createRoomMutation = useMutation(api.rooms.create)
  const joinRoomMutation = useMutation(api.rooms.join)
  const leaveRoomMutation = useMutation(api.rooms.leave)
  const endSessionMutation = useMutation(api.rooms.endSession)
  const startRoomMutation = useMutation(api.rooms.start)
  const markCompleteMutation = useMutation(api.rooms.markLevelComplete)

  const roomDoc = useQuery(api.rooms.get, session ? { roomId: session.roomId } : 'skip')
  const playersDoc = useQuery(api.rooms.getPlayers, session ? { roomId: session.roomId } : 'skip')
  const currentPlayerDoc = useQuery(
    api.rooms.getPlayer,
    session ? { playerId: session.playerId } : 'skip',
  )
  const leaderboard = useQuery(
    api.rooms.getLeaderboard,
    session ? { roomId: session.roomId } : 'skip',
  )

  const roomReady = !session || (roomDoc !== undefined && currentPlayerDoc !== undefined)

  // Clear stale session if room/player disappeared (e.g. host ended session)
  useEffect(() => {
    if (!session || !roomReady) return
    if (roomDoc === null || currentPlayerDoc === null) {
      setSession(null)
      setSessionState(null)
    }
  }, [session, roomReady, roomDoc, currentPlayerDoc])

  const players: RoomPlayer[] = useMemo(
    () => (playersDoc ?? []).map(mapPlayer),
    [playersDoc],
  )

  const currentPlayer: RoomPlayer | null = currentPlayerDoc ? mapPlayer(currentPlayerDoc) : null

  const room: GameRoom | null =
    roomDoc && session
      ? {
          id: roomDoc._id,
          code: roomDoc.code,
          status: roomDoc.status,
          startedAt: roomDoc.startedAt ?? null,
          players,
        }
      : null

  const clearLocalSession = useCallback(() => {
    setSession(null)
    setSessionState(null)
    setError(null)
  }, [])

  const handleCreate = useCallback(
    async (name: string, password: string) => {
      try {
        setLoading(true)
        setError(null)
        const result = await createRoomMutation({ hostName: name, password })
        const next: GameSession = {
          roomId: result.roomId,
          playerId: result.playerId,
          code: result.code,
        }
        setSession(next)
        setSessionState(next)
      } catch (err) {
        setError(getUserErrorMessage(err, 'Không thể tạo phòng'))
      } finally {
        setLoading(false)
      }
    },
    [createRoomMutation],
  )

  const handleJoin = useCallback(
    async (code: string, name: string) => {
      try {
        setLoading(true)
        setError(null)
        const result = await joinRoomMutation({ code, name })
        const next: GameSession = {
          roomId: result.roomId,
          playerId: result.playerId,
          code: result.code,
        }
        setSession(next)
        setSessionState(next)
      } catch (err) {
        setError(getUserErrorMessage(err, 'Không thể tham gia phòng'))
      } finally {
        setLoading(false)
      }
    },
    [joinRoomMutation],
  )

  const handleLeave = useCallback(async () => {
    if (session) {
      try {
        await leaveRoomMutation({ playerId: session.playerId })
      } catch {
        // best-effort
      }
    }
    clearLocalSession()
  }, [leaveRoomMutation, session, clearLocalSession])

  const handleEndSession = useCallback(async () => {
    if (!session) return false
    try {
      await endSessionMutation({ roomId: session.roomId, playerId: session.playerId })
      clearLocalSession()
      return true
    } catch (err) {
      setError(getUserErrorMessage(err, 'Không thể kết thúc phiên'))
      return false
    }
  }, [session, endSessionMutation, clearLocalSession])

  const handleStart = useCallback(async () => {
    if (!session) return false
    try {
      setError(null)
      await startRoomMutation({ roomId: session.roomId, playerId: session.playerId })
      return true
    } catch (err) {
      setError(getUserErrorMessage(err, 'Không thể bắt đầu'))
      return false
    }
  }, [session, startRoomMutation])

  const handleCompleteLevel = useCallback(
    async (level: 1 | 2 | 3) => {
      if (!session) return { ok: false as const, finished: false, raceClosed: false }
      try {
        const result = await markCompleteMutation({ playerId: session.playerId, level })
        return {
          ok: true as const,
          finished: Boolean(result.finished),
          raceClosed: Boolean(result.raceClosed),
        }
      } catch (err) {
        setError(getUserErrorMessage(err, 'Không thể báo hoàn thành'))
        return { ok: false as const, finished: false, raceClosed: false }
      }
    },
    [session, markCompleteMutation],
  )

  return {
    session,
    room,
    currentPlayer,
    players,
    leaderboard,
    roomReady,
    error,
    loading,
    setError,
    handleCreate,
    handleJoin,
    handleLeave,
    handleEndSession,
    handleStart,
    handleCompleteLevel,
    getLevelRoute,
  }
}
