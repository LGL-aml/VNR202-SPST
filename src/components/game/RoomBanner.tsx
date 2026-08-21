import { Icon } from '../common/Icon'
import type { GameRoom, RoomPlayer } from '../../game/room/types'

type RoomBannerProps = {
  room: GameRoom
  currentLevel: 1 | 2 | 3
  currentPlayer: RoomPlayer
  onLeave: () => void
}

const VISIBLE_CAP = 10

export function RoomBanner({ room, currentLevel, currentPlayer, onLeave }: RoomBannerProps) {
  const contestants = room.players.filter((p) => !p.isHost)
  const doneCount = contestants.filter((p) => p.completedLevel >= currentLevel).length
  const finishers = contestants.filter((p) => p.finishedAt != null).length
  const visible = contestants.slice(0, VISIBLE_CAP)
  const hidden = Math.max(0, contestants.length - VISIBLE_CAP)

  return (
    <aside className="room-banner" aria-label="Trạng thái phòng">
      <div className="room-banner__meta">
        <span>
          Phòng <strong>{room.code}</strong>
        </span>
        <span>Màn 0{currentLevel} / 03</span>
        <span>{currentPlayer.name}</span>
        <span>
          Màn này {doneCount}/{contestants.length}
        </span>
        <span>
          Về đích {finishers}/{contestants.length}
        </span>
      </div>
      <div className="room-banner__row">
        <div className="room-banner__players">
          {visible.map((player) => {
            const done = player.completedLevel >= currentLevel
            return (
              <span className={done ? 'is-done' : ''} key={player.id}>
                {done ? <Icon name="check" /> : <Icon name="schedule" />}
                {player.name}
              </span>
            )
          })}
          {hidden > 0 && <span>+{hidden} người</span>}
        </div>
        <button className="button button--secondary room-banner__leave" onClick={onLeave} type="button">
          <Icon name="logout" /> Thoát phòng
        </button>
      </div>
    </aside>
  )
}
