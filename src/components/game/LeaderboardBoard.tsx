import { useEffect, useRef, useState } from 'react'
import { Icon } from '../common/Icon'
import { formatElapsed } from '../../game/room/types'
import type { useGameRoom } from '../../game/room/useGameRoom'

type LeaderboardData = NonNullable<ReturnType<typeof useGameRoom>['leaderboard']>

type LeaderboardBoardProps = {
  board: LeaderboardData
  isHost: boolean
  currentPlayerId?: string
  onEndSession?: () => void
  onLeave?: () => void
}

function medalLabel(rank: number) {
  if (rank === 1) return 'Hạng nhất'
  if (rank === 2) return 'Hạng nhì'
  return 'Hạng ba'
}

export function LeaderboardBoard({
  board,
  isHost,
  currentPlayerId,
  onEndSession,
  onLeave,
}: LeaderboardBoardProps) {
  const prevPlaces = useRef<Map<string, number>>(new Map())
  const [flashIds, setFlashIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    const nextFlash = new Set<string>()
    for (const entry of board.entries) {
      const prev = prevPlaces.current.get(entry.id)
      if (prev != null && prev !== entry.place) {
        nextFlash.add(entry.id)
      }
      prevPlaces.current.set(entry.id, entry.place)
    }
    if (nextFlash.size === 0) return
    setFlashIds(nextFlash)
    const timer = window.setTimeout(() => setFlashIds(new Set()), 900)
    return () => window.clearTimeout(timer)
  }, [board.entries])

  const finishedCount = board.entries.filter((e) => e.finishedAt != null).length

  return (
    <div className="leaderboard">
      <header className="leaderboard__hero">
        <p className="page-kicker">Phòng {board.room.code}</p>
        <h1>{board.raceClosed ? 'Vinh danh Top 3' : 'Bảng xếp hạng trực tiếp'}</h1>
        <p>
          {isHost
            ? board.raceClosed
              ? 'Đã đủ Top 3 về đích. Bạn có thể kết thúc phiên chơi.'
              : 'Theo dõi tiến trình người chơi. Ai hoàn thành 3 màn nhanh nhất sẽ dẫn đầu.'
            : board.raceClosed
              ? 'Cuộc đua đã khép lại. Dưới đây là những người về đích nhanh nhất.'
              : 'Hoàn thành 3 màn càng nhanh càng tốt để vào Top 3.'}
        </p>
        <div className="leaderboard__stats">
          <span>
            Hoàn thành: <strong>{finishedCount}</strong>/{board.entries.length}
          </span>
          <span>
            Đóng Top: <strong>{board.closeAt}</strong> người
          </span>
          <span className={board.raceClosed ? 'is-closed' : ''}>
            {board.raceClosed ? 'Đã khóa Top 3' : 'Đang đua'}
          </span>
        </div>
      </header>

      {board.top3.length > 0 && (
        <section className="leaderboard__podium" aria-label="Top 3">
          {[1, 0, 2].map((slot) => {
            const entry = board.top3[slot]
            if (!entry) {
              return (
                <article className={`podium-slot podium-slot--${slot + 1} is-empty`} key={`empty-${slot}`}>
                  <span className="podium-slot__rank">{slot + 1}</span>
                  <strong>Đang chờ...</strong>
                </article>
              )
            }
            return (
              <article
                className={`podium-slot podium-slot--${entry.rank} ${flashIds.has(entry.id) ? 'is-flash' : ''}`}
                key={entry.id}
              >
                <span className="podium-slot__rank">{entry.rank}</span>
                <small>{medalLabel(entry.rank)}</small>
                <strong>{entry.name}</strong>
                <em>{formatElapsed(entry.elapsedMs)}</em>
              </article>
            )
          })}
        </section>
      )}

      <section className="paper-card leaderboard__table" aria-label="Danh sách người chơi">
        <div className="leaderboard__table-head">
          <span>#</span>
          <span>Người chơi</span>
          <span>Tiến độ</span>
          <span>Thời gian</span>
        </div>
        <ul>
          {board.entries.map((entry) => {
            const isYou = entry.id === currentPlayerId
            return (
              <li
                className={[
                  entry.isTop3 ? 'is-top' : '',
                  isYou ? 'is-you' : '',
                  flashIds.has(entry.id) ? 'is-flash' : '',
                  entry.finishedAt != null ? 'is-done' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={entry.id}
                style={{ order: entry.place }}
              >
                <span className="leaderboard__place">{entry.place}</span>
                <strong>
                  {entry.name}
                  {isYou && <em>Bạn</em>}
                </strong>
                <span className="leaderboard__level">
                  {entry.finishedAt != null ? 'Về đích' : `Màn ${entry.completedLevel}/3`}
                </span>
                <span className="leaderboard__time mono-label">{formatElapsed(entry.elapsedMs)}</span>
              </li>
            )
          })}
        </ul>
        {board.entries.length === 0 && <p className="leaderboard__empty">Chưa có người chơi trong phòng.</p>}
      </section>

      <div className="leaderboard__actions">
        {isHost && onEndSession && (
          <button className="button" onClick={onEndSession} type="button">
            <Icon name="stop_circle" /> Kết thúc phiên chơi
          </button>
        )}
        {!isHost && onLeave && (
          <button className="button button--secondary" onClick={onLeave} type="button">
            <Icon name="logout" /> Thoát phòng
          </button>
        )}
      </div>
    </div>
  )
}

type GameOverOverlayProps = {
  onGoToBoard: () => void
}

/** Shown to unfinished players when Top 3 is locked; auto-redirects after 3s */
export function GameOverOverlay({ onGoToBoard }: GameOverOverlayProps) {
  const [seconds, setSeconds] = useState(3)

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1))
    }, 1000)
    const go = window.setTimeout(onGoToBoard, 3000)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(go)
    }
  }, [onGoToBoard])

  return (
    <div className="game-over-overlay" role="alertdialog" aria-modal="true" aria-labelledby="game-over-title">
      <div className="game-over-overlay__panel paper-card">
        <p className="page-kicker">Kết thúc cuộc đua</p>
        <h2 id="game-over-title">Game Over</h2>
        <p>Đã đủ Top 3 người về đích nhanh nhất. Bạn sẽ được chuyển tới bảng vinh danh.</p>
        <p className="game-over-overlay__countdown">Chuyển sau {seconds}s...</p>
        <button className="button" onClick={onGoToBoard} type="button">
          Xem bảng xếp hạng <Icon name="emoji_events" />
        </button>
      </div>
    </div>
  )
}

type RoomSessionBarProps = {
  code: string
  isHost: boolean
  playerName: string
  onLeave: () => void
  onEndSession?: () => void
}

export function RoomSessionBar({ code, isHost, playerName, onLeave, onEndSession }: RoomSessionBarProps) {
  return (
    <div className="room-session-bar">
      <div className="room-session-bar__meta">
        <span>
          Phòng <strong>{code}</strong>
        </span>
        <span>
          {isHost ? 'Chủ phòng' : 'Người chơi'}: {playerName}
        </span>
      </div>
      <div className="room-session-bar__actions">
        {isHost && onEndSession ? (
          <button className="button button--secondary" onClick={onEndSession} type="button">
            <Icon name="stop_circle" /> Kết thúc phiên
          </button>
        ) : (
          <button className="button button--secondary" onClick={onLeave} type="button">
            <Icon name="logout" /> Thoát phòng
          </button>
        )}
      </div>
    </div>
  )
}
