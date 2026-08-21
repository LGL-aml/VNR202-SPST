import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { LEVEL_META, LEADERBOARD_ROUTE, getLevelRoute } from '../game/room/types'
import { useGameRoom } from '../game/room/useGameRoom'
import '../styles/pages.css'
import '../components/game/gameLobby.css'

function LobbyView({
  error,
  loading,
  onCreate,
  onJoin,
}: {
  error: string | null
  loading: boolean
  onCreate: (name: string, password: string) => void
  onJoin: (code: string, name: string) => void
}) {
  const [hostName, setHostName] = useState('')
  const [hostPassword, setHostPassword] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [joinName, setJoinName] = useState('')
  const [showRules, setShowRules] = useState(false)

  return (
    <div className="game-lobby">
      <header className="game-lobby__hero">
        <p className="page-kicker">Hành trình 1951–1954</p>
        <h1 className="page-heading">
          Trò chơi <span>tương tác</span>
        </h1>
        <p className="page-lead">
          Tạo phòng hoặc tham gia bằng mã — cùng vượt qua 3 màn lịch sử.
        </p>
        <button className="game-lobby__rules-toggle" onClick={() => setShowRules(true)} type="button">
          <Icon name="menu_book" /> Thể lệ trò chơi
        </button>
      </header>

      

      {error && <div className="game-lobby__error">{error}</div>}

      <div className="game-lobby__cards">
        <article className="game-lobby__card game-lobby__card--host">
          <div className="game-lobby__card-icon">
            <Icon name="tv" />
          </div>
          <h2>Bạn là chủ phòng?</h2>
          <p>Tạo phòng mới (cần mật khẩu admin), chia sẻ mã và theo dõi bảng xếp hạng — admin không chơi.</p>
          <input
            autoComplete="off"
            onChange={(e) => setHostName(e.target.value)}
            placeholder="Tên của bạn"
            type="text"
            value={hostName}
          />
          <input
            autoComplete="new-password"
            onChange={(e) => setHostPassword(e.target.value)}
            placeholder="Mật khẩu tạo phòng"
            type="password"
            value={hostPassword}
          />
          <button
            className="button"
            disabled={!hostName.trim() || !hostPassword.trim() || loading}
            onClick={() => onCreate(hostName.trim(), hostPassword)}
            type="button"
          >
            <Icon name="add_circle" /> {loading ? 'Đang tạo...' : 'Tạo phòng mới'}
          </button>
        </article>

        <article className="game-lobby__card game-lobby__card--join">
          <div className="game-lobby__card-icon game-lobby__card-icon--accent">
            <Icon name="group" />
          </div>
          <h2>Bạn là người chơi?</h2>
          <p>Nhập mã phòng từ chủ phòng để tham gia. Mỗi phòng tối đa 40 người chơi.</p>
          <input
            inputMode="numeric"
            onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="Nhập mã phòng"
            type="text"
            value={joinCode}
          />
          <input
            autoComplete="off"
            onChange={(e) => setJoinName(e.target.value)}
            placeholder="Tên của bạn"
            type="text"
            value={joinName}
          />
          <button
            className="button button--secondary"
            disabled={!joinCode.trim() || !joinName.trim() || loading}
            onClick={() => onJoin(joinCode.trim(), joinName.trim())}
            type="button"
          >
            <Icon name="login" /> {loading ? 'Đang tham gia...' : 'Tham gia ngay'}
          </button>
        </article>
      </div>

      <section className="game-lobby__intro" aria-label="Giới thiệu 3 màn chơi">
        <div className="game-lobby__intro-head">
          <h2>Từ Đại hội II đến Điện Biên Phủ</h2>
        </div>
        <div className="game-lobby__levels">
          {LEVEL_META.map((item) => (
            <article key={item.level}>
              <span className="mono-label">Màn 0{item.level}</span>
              <strong>{item.title}</strong>
              <small>{item.concept}</small>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {showRules && (
        <div className="game-rules" role="dialog" aria-modal="true" aria-labelledby="game-rules-title">
          <div className="game-rules__panel">
            <header className="game-rules__header">
              <h2 id="game-rules-title">
                <Icon name="menu_book" /> Thể lệ trò chơi
              </h2>
              <button aria-label="Đóng thể lệ" onClick={() => setShowRules(false)} type="button">
                <Icon name="close" />
              </button>
            </header>
            <div className="game-rules__body">
              <section>
                <h3>1. Tạo / tham gia phòng</h3>
                <p>
                  Chủ phòng nhập tên và mật khẩu admin để tạo mã phòng 5 số. Người chơi khác nhập mã + tên để vào
                  phòng chờ (tối đa 40 người).
                </p>
              </section>
              <section>
                <h3>2. Đua về đích Top 3</h3>
                <p>
                  Chủ phòng bắt đầu rồi theo dõi bảng xếp hạng (không chơi). Người chơi tự vượt 3 màn càng nhanh càng
                  tốt. Ba người hoàn thành đủ 3 màn nhanh nhất vào Top 3; các người còn lại nhận Game Over.
                </p>
              </section>
              <section>
                <h3>3. Vinh danh &amp; kết thúc</h3>
                <p>
                  Sau đoạn phim kết (hoặc bỏ qua), người về đích xem bảng vinh danh. Chủ phòng có thể kết thúc phiên
                  bất cứ lúc nào để đưa mọi người về trang trò chơi.
                </p>
              </section>
              <section>
                <h3>4. Ba màn chơi</h3>
                <ul>
                  {LEVEL_META.map((item) => (
                    <li key={item.level}>
                      <strong>Màn 0{item.level} — {item.title}:</strong> {item.summary}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <footer className="game-rules__footer">
              <button className="button" onClick={() => setShowRules(false)} type="button">
                Đã hiểu, sẵn sàng!
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

function WaitingRoomView({
  code,
  players,
  isHost,
  onStart,
  onLeave,
}: {
  code: string
  players: { id: string; name: string; isHost: boolean }[]
  isHost: boolean
  onStart: () => void
  onLeave: () => void
}) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="game-waiting">
      <div className="game-waiting__panel paper-card">
        <header className="game-waiting__header">
          <h1>Phòng chờ</h1>
          <p>Chia sẻ mã phòng để mời bạn bè · tối đa 40 người</p>
        </header>

        <div className="game-waiting__code">
          <span className="game-waiting__code-value">{code}</span>
          <button aria-label="Sao chép mã phòng" onClick={copyCode} type="button">
            <Icon name={copied ? 'check' : 'content_copy'} />
          </button>
        </div>

        <div className="game-waiting__players">
          <h2>
            <Icon name="group" /> Người chơi ({players.length}/40)
          </h2>
          <ul className="game-waiting__list">
            {players.map((player) => (
              <li key={player.id}>
                <span className={`game-waiting__avatar ${player.isHost ? 'is-host' : ''}`}>
                  {player.name.charAt(0).toUpperCase()}
                </span>
                <strong>{player.name}</strong>
                {player.isHost && <em>Chủ phòng</em>}
              </li>
            ))}
          </ul>
        </div>

        <div className="game-waiting__actions">
          {isHost ? (
            <button className="button" onClick={onStart} type="button">
              <Icon name="bolt" /> Bắt đầu trò chơi
            </button>
          ) : (
            <p className="game-waiting__wait">Đang chờ chủ phòng bắt đầu...</p>
          )}
          <button className="button button--secondary" onClick={onLeave} type="button">
            <Icon name="logout" /> {isHost ? 'Kết thúc phiên / Hủy phòng' : 'Thoát phòng'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function GameSelectPage() {
  const navigate = useNavigate()
  const {
    room,
    currentPlayer,
    roomReady,
    error,
    loading,
    handleCreate,
    handleJoin,
    handleLeave,
    handleStart,
  } = useGameRoom()

  // Stale session after room wipe → stay on lobby UI
  useEffect(() => {
    if (!roomReady) return
    if (!room || !currentPlayer) return
    if (room.status === 'lobby') return
    if (currentPlayer.isHost) {
      navigate(LEADERBOARD_ROUTE, { replace: true })
      return
    }
    if (room.status === 'results' || currentPlayer.finishedAt != null) {
      navigate(LEADERBOARD_ROUTE, { replace: true })
      return
    }
    navigate(getLevelRoute(1), { replace: true })
  }, [roomReady, room, currentPlayer, navigate])

  if (!roomReady) {
    return (
      <div className="game-lobby">
        <p className="page-lead">Đang kết nối phòng chơi...</p>
      </div>
    )
  }

  if (room && currentPlayer && room.status === 'lobby') {
    return (
      <WaitingRoomView
        code={room.code}
        isHost={currentPlayer.isHost}
        onLeave={() => {
          void handleLeave()
        }}
        onStart={() => {
          void handleStart().then((ok) => {
            if (ok) navigate(currentPlayer.isHost ? LEADERBOARD_ROUTE : getLevelRoute(1))
          })
        }}
        players={room.players}
      />
    )
  }

  return (
    <LobbyView
      error={error}
      loading={loading}
      onCreate={(name, password) => {
        void handleCreate(name, password)
      }}
      onJoin={(code, name) => {
        void handleJoin(code, name)
      }}
    />
  )
}
