import { useEffect, useRef } from 'react'
import { getNextAfterLevel, type GameRoom, type RoomPlayer } from '../../game/room/types'
import { prefetchFinalCinematic, prefetchLevel3 } from '../../game/prefetchRoutes'
import { AutoContinue } from './AutoContinue'

type RoomLevelCompleteProps = {
  room: GameRoom
  currentPlayer: RoomPlayer
  level: 1 | 2 | 3
  title: string
  description: string
  onMarkComplete: () => Promise<{ ok: boolean; finished: boolean; raceClosed: boolean }>
  embedded?: boolean
}

export function RoomLevelComplete({
  room,
  currentPlayer,
  level,
  title,
  description,
  onMarkComplete,
  embedded = false,
}: RoomLevelCompleteProps) {
  const alreadyDone = currentPlayer.completedLevel >= level
  const contestants = room.players.filter((p) => !p.isHost)
  const doneCount = contestants.filter((p) => p.completedLevel >= level).length
  const next = getNextAfterLevel(level)
  const markedRef = useRef(alreadyDone)

  // Mark complete as soon as the success UI appears — do not block navigation later.
  useEffect(() => {
    if (markedRef.current) return
    markedRef.current = true
    void onMarkComplete()
  }, [onMarkComplete])

  // Prefetch the next heavy route while the 5s countdown runs.
  useEffect(() => {
    if (level === 2) prefetchLevel3()
    if (level === 3) prefetchFinalCinematic()
  }, [level])

  const sync = (
    <div className="room-complete-sync">
      <p>
        Trong phòng: <strong>{alreadyDone ? doneCount : Math.min(doneCount + 1, contestants.length)}</strong>
        /{contestants.length} người đã xong màn này.
      </p>
      <AutoContinue label={level === 3 ? 'Xem đoạn kết' : 'Màn tiếp theo'} to={next} />
    </div>
  )

  if (embedded) return sync

  return (
    <div className="game-complete-panel">
      <p className="page-kicker">Hoàn thành Màn 0{level}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      {sync}
    </div>
  )
}
