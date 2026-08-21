import { useNavigate } from 'react-router-dom'
import { FinalCinematic } from '../components/cinematic/FinalCinematic'
import { LEADERBOARD_ROUTE } from '../game/room/types'
import { useGameRoom } from '../game/room/useGameRoom'

export function FinalCinematicPage() {
  const navigate = useNavigate()
  const { room, currentPlayer } = useGameRoom()
  const inRoom = Boolean(room && currentPlayer && !currentPlayer.isHost)
  const finishTo = inRoom ? LEADERBOARD_ROUTE : '/completed'
  const finishLabel = inRoom ? 'Xem bảng xếp hạng' : 'Hoàn thành hành trình'

  return (
    <FinalCinematic
      finishLabel={finishLabel}
      onFinished={() => {
        navigate(finishTo, { replace: true })
      }}
    />
  )
}
