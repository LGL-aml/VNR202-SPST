import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { AutoContinue } from '../components/game/AutoContinue'
import { LEADERBOARD_ROUTE } from '../game/room/types'
import { useGameRoom } from '../game/room/useGameRoom'
import '../styles/cinematic.css'

const phaseNames = ['Quyết định', 'Hậu phương', 'Phương châm', '56 ngày đêm', 'Chiến thắng']
const phaseDuration = 6200

export function FinalCinematicPage() {
  const navigate = useNavigate()
  const { room, currentPlayer } = useGameRoom()
  const [phase, setPhase] = useState(0)
  const inRoom = Boolean(room && currentPlayer && !currentPlayer.isHost)
  const finishTo = inRoom ? LEADERBOARD_ROUTE : '/completed'

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || phase >= phaseNames.length - 1) return
    const timer = window.setTimeout(() => setPhase((current) => current + 1), phaseDuration)
    return () => window.clearTimeout(timer)
  }, [phase])

  const finish = () => {
    localStorage.setItem('vnr-final', 'complete')
    navigate(finishTo)
  }

  return (
    <div className="cinematic-page">
      <div className="cinematic-grain" />
      <nav className="cinematic-progress" aria-label={`Cảnh ${phase + 1} trên ${phaseNames.length}`}>
        {phaseNames.map((name, index) => (
          <button
            aria-current={index === phase ? 'step' : undefined}
            aria-label={`Chuyển đến cảnh ${name}`}
            className={index === phase ? 'is-active' : index < phase ? 'is-past' : ''}
            key={name}
            onClick={() => setPhase(index)}
            type="button"
          ><span>{index + 1}</span><small>{name}</small></button>
        ))}
      </nav>

      <div className="cinematic-stage" aria-live="polite">
        <section className={`cinematic-phase ${phase === 0 ? 'is-active' : ''}`} aria-hidden={phase !== 0}>
          <div className="decision-map" aria-hidden="true">
            <svg viewBox="0 0 600 420">
              <path d="M80 100Q200 20 310 105T550 100M30 250Q170 160 300 240T590 220" />
              <circle cx="355" cy="235" r="92" />
              <circle className="decision-map__point" cx="355" cy="235" r="9" />
              <text x="355" y="220">Điện Biên Phủ</text>
            </svg>
          </div>
          <p className="cinematic-kicker">Bộ Chính trị / 06.12.1953</p>
          <h1>Mở chiến dịch</h1>
          <p>Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ, giao Đại tướng Võ Nguyên Giáp làm Tư lệnh kiêm Bí thư Đảng ủy chiến dịch.</p>
        </section>

        <section className={`cinematic-phase ${phase === 1 ? 'is-active' : ''}`} aria-hidden={phase !== 1}>
          <div className="logistics-map" aria-hidden="true">
            <svg viewBox="0 0 700 470">
              <g className="logistics-routes">
                <path d="M80 80L350 235" /><path d="M620 80L350 235" />
                <path d="M80 390L350 235" /><path d="M620 390L350 235" />
              </g>
              <circle cx="350" cy="235" r="18" />
              <text x="350" y="275">Điện Biên Phủ</text>
              <text x="75" y="68">Dân công</text><text x="625" y="68">Lương thực</text>
              <text x="75" y="420">Đạn dược</text><text x="625" y="420">Vũ khí</text>
            </svg>
          </div>
          <p className="cinematic-kicker">Hậu phương hướng ra tiền tuyến</p>
          <h1>Cả nước cho chiến dịch</h1>
          <p>Ủy ban chi viện tiền tuyến và Hội đồng cung cấp mặt trận ở Trung ương, địa phương tổ chức nhân lực, lương thực, đạn dược, vũ khí và phương tiện cho Điện Biên Phủ.</p>
        </section>

        <section className={`cinematic-phase ${phase === 2 ? 'is-active' : ''}`} aria-hidden={phase !== 2}>
          <p className="cinematic-kicker">Phương châm tác chiến</p>
          <h1 className="cinematic-principle"><span>Đánh chắc</span><i>—</i><span>Tiến chắc</span></h1>
          <p>Phương châm tác chiến được xác định là “đánh chắc, tiến chắc”, “đánh chắc thắng”.</p>
          <div className="cinematic-lines" aria-hidden="true"><i /><i /><i /></div>
        </section>

        <section className={`cinematic-phase ${phase === 3 ? 'is-active' : ''}`} aria-hidden={phase !== 3}>
          <div className="campaign-card paper-card">
            <p className="cinematic-kicker">13.03 — 07.05.1954</p>
            <h1 className="campaign-duration">56 ngày đêm</h1>
            <div className="campaign-waves"><span>Đợt 1</span><span>Đợt 2</span><span>Đợt 3</span></div>
            <svg aria-hidden="true" viewBox="0 0 500 240">
              <circle cx="250" cy="120" r="8" />
              <path d="M150 35Q250 0 350 35" />
              <path d="M90 65Q150 120 90 185M410 65Q350 120 410 185" />
              <path d="M150 205Q250 240 350 205" />
              <circle className="campaign-ring" cx="250" cy="120" r="100" />
            </svg>
            <p>Qua ba đợt tiến công lớn, quân ta từng bước tiêu diệt các cứ điểm và tiến vào trung tâm Mường Thanh.</p>
          </div>
        </section>

        <section className={`cinematic-phase cinematic-finale ${phase === 4 ? 'is-active' : ''}`} aria-hidden={phase !== 4}>
          <p className="cinematic-time">17 giờ 30</p>
          <p className="cinematic-date">07.05.1954</p>
          <h1>Chiến thắng Điện Biên Phủ</h1>
          <p>Quân ta đánh chiếm hầm chỉ huy, bắt sống tướng Christian de Castries cùng Bộ chỉ huy tập đoàn cứ điểm. Chiến dịch Điện Biên Phủ kết thúc thắng lợi.</p>
        </section>
      </div>

      <div className="cinematic-controls">
        {phase < phaseNames.length - 1 && (
          <button className="button button--secondary" onClick={finish} type="button">
            Bỏ qua đoạn phim
          </button>
        )}
        {phase < phaseNames.length - 1 ? (
          <button className="button" onClick={() => setPhase((current) => current + 1)} type="button">
            Cảnh tiếp theo <Icon name="arrow_forward" />
          </button>
        ) : (
          <AutoContinue
            label={inRoom ? 'Xem bảng xếp hạng' : 'Hoàn thành hành trình'}
            onBeforeNavigate={() => {
              localStorage.setItem('vnr-final', 'complete')
              return true
            }}
            to={finishTo}
          />
        )}
      </div>
    </div>
  )
}
