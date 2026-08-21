import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardSortGame } from '../components/game/CardSortGame'
import { GameHeader } from '../components/game/GameHeader'
import { GameOverOverlay } from '../components/game/LeaderboardBoard'
import { RoomBanner } from '../components/game/RoomBanner'
import { RoomLevelComplete } from '../components/game/RoomLevelComplete'
import { LEADERBOARD_ROUTE } from '../game/room/types'
import { useGameRoom } from '../game/room/useGameRoom'
import '../components/game/gameLobby.css'
import '../styles/game.css'

export function Level2Page() {
  const navigate = useNavigate()
  const { room, currentPlayer, handleCompleteLevel, handleLeave } = useGameRoom()
  const inRoom = Boolean(room && currentPlayer && !currentPlayer.isHost && room.status !== 'lobby')
  const showGameOver =
    room?.status === 'results' && currentPlayer && !currentPlayer.isHost && currentPlayer.finishedAt == null

  const leave = useCallback(() => {
    void handleLeave().then(() => navigate('/game', { replace: true }))
  }, [handleLeave, navigate])

  return (
    <div className="page game-page game-page--wide">
      {showGameOver && (
        <GameOverOverlay onGoToBoard={() => navigate(LEADERBOARD_ROUTE, { replace: true })} />
      )}
      {inRoom && room && currentPlayer && (
        <RoomBanner
          currentLevel={2}
          currentPlayer={currentPlayer}
          onLeave={leave}
          room={room}
        />
      )}
      <GameHeader
        concept="Phân loại & liên kết"
        level="Màn 02"
        progress="12 thẻ / 4 nhóm"
        subtitle="Phân loại các quyết định và hoạt động để tái hiện thế chủ động Đông – Xuân 1953–1954."
        title="Xây dựng thế trận"
      />
      <CardSortGame
        completeActions={
          inRoom && room && currentPlayer && !showGameOver ? (
            <RoomLevelComplete
              currentPlayer={currentPlayer}
              description="Xác định đúng hướng → tổ chức thực hiện → tạo thế → huy động hậu phương."
              embedded
              level={2}
              onMarkComplete={() => handleCompleteLevel(2)}
              room={room}
              title="Thế trận đã hoàn chỉnh"
            />
          ) : undefined
        }
      />
    </div>
  )
}
