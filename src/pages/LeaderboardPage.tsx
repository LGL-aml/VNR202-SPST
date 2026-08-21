import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeaderboardBoard } from '../components/game/LeaderboardBoard'
import { getLevelRoute } from '../game/room/types'
import { useGameRoom } from '../game/room/useGameRoom'
import '../components/game/gameLobby.css'
import '../styles/game.css'

export function LeaderboardPage() {
  const navigate = useNavigate()
  const { room, currentPlayer, leaderboard, roomReady, handleLeave, handleEndSession } = useGameRoom()

  useEffect(() => {
    if (!roomReady) return
    if (!room || !currentPlayer) {
      navigate('/game', { replace: true })
    }
  }, [roomReady, room, currentPlayer, navigate])

  useEffect(() => {
    if (!roomReady || !room || !currentPlayer) return
    if (room.status === 'lobby') {
      navigate('/game', { replace: true })
      return
    }
    // Players still racing should not stay on the board
    if (
      !currentPlayer.isHost &&
      room.status === 'playing' &&
      currentPlayer.finishedAt == null
    ) {
      const nextLevel = Math.min(3, (currentPlayer.completedLevel + 1) as 1 | 2 | 3) as 1 | 2 | 3
      navigate(getLevelRoute(nextLevel), { replace: true })
    }
  }, [roomReady, room, currentPlayer, navigate])

  const leave = useCallback(() => {
    void handleLeave().then(() => navigate('/game', { replace: true }))
  }, [handleLeave, navigate])

  const endSession = useCallback(() => {
    void handleEndSession().then((ok) => {
      if (ok) navigate('/game', { replace: true })
    })
  }, [handleEndSession, navigate])

  if (!roomReady || !room || !currentPlayer || !leaderboard) {
    return (
      <div className="page game-page">
        <p className="page-lead">Đang tải bảng xếp hạng...</p>
      </div>
    )
  }

  return (
    <div className="page game-page">
      <LeaderboardBoard
        board={leaderboard}
        currentPlayerId={currentPlayer.id}
        isHost={currentPlayer.isHost}
        onEndSession={currentPlayer.isHost ? endSession : undefined}
        onLeave={!currentPlayer.isHost ? leave : undefined}
      />
    </div>
  )
}
