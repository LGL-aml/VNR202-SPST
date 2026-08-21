import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CodedPuzzle } from '../components/game/CodedPuzzle'
import { GameHeader } from '../components/game/GameHeader'
import { AutoContinue } from '../components/game/AutoContinue'
import { GameOverOverlay } from '../components/game/LeaderboardBoard'
import { RoomBanner } from '../components/game/RoomBanner'
import { RoomLevelComplete } from '../components/game/RoomLevelComplete'
import { Icon } from '../components/common/Icon'
import { level3Questions } from '../data/level3Questions'
import { LEADERBOARD_ROUTE } from '../game/room/types'
import { useGameRoom } from '../game/room/useGameRoom'
import '../components/game/gameLobby.css'
import '../styles/game.css'

type PuzzleAnswers = Record<string, string>

export function Level3Page() {
  const navigate = useNavigate()
  const { room, currentPlayer, handleCompleteLevel, handleLeave } = useGameRoom()
  const inRoom = Boolean(room && currentPlayer && !currentPlayer.isHost && room.status !== 'lobby')
  const showGameOver =
    room?.status === 'results' && currentPlayer && !currentPlayer.isHost && currentPlayer.finishedAt == null
  const [answers, setAnswers] = useState<PuzzleAnswers>({})
  const [score, setScore] = useState<number | null>(null)
  const answeredCount = Object.keys(answers).length
  const allAnswered = level3Questions.every((question) => answers[question.id])
  const revealedCodes = useMemo(() => {
    if (score === null) return new Set<string>()
    return new Set(
      level3Questions
        .filter((question) => answers[question.id] === question.correctAnswer)
        .map((question) => `${question.id}${question.correctAnswer}`),
    )
  }, [answers, score])

  const leave = useCallback(() => {
    void handleLeave().then(() => navigate('/game', { replace: true }))
  }, [handleLeave, navigate])

  const submitAnswers = () => {
    if (!allAnswered || showGameOver) return
    const nextScore = level3Questions.filter((question) => answers[question.id] === question.correctAnswer).length
    setScore(nextScore)
    if (nextScore === 5) localStorage.setItem('vnr-game-v2-level-3', 'complete')
  }

  const retry = () => {
    setAnswers({})
    setScore(null)
  }

  return (
    <div className="page game-page">
      {showGameOver && (
        <GameOverOverlay onGoToBoard={() => navigate(LEADERBOARD_ROUTE, { replace: true })} />
      )}
      {inRoom && room && currentPlayer && (
        <RoomBanner
          currentLevel={3}
          currentPlayer={currentPlayer}
          onLeave={leave}
          room={room}
        />
      )}
      <GameHeader
        concept="Củng cố"
        level="Màn 03"
        progress={`Đã trả lời ${answeredCount} / 5`}
        subtitle="Trả lời đúng cả 5 câu để hiện đủ hình hầm Điện Biên Phủ và hoàn thành màn."
        title="Giải mã Điện Biên Phủ"
      />

      <div className="puzzle-layout">
        <section className="paper-card puzzle-layout__visual">
          <CodedPuzzle complete={score === 5} revealedCodes={revealedCodes} />
          {score !== null && (
            <div className={`puzzle-result ${score === 5 ? 'is-perfect' : ''}`} aria-live="polite">
              <strong>{score} / 5 câu chính xác</strong>
              <span>
                {score === 5
                  ? 'Hình hầm Điện Biên Phủ đã hiện đủ — chiến thắng được giải mã'
                  : `${score * 20}% bức tranh đã được giải mã. Cần đúng 5/5 để hiện đủ hình.`}
              </span>
            </div>
          )}
        </section>

        <section className="paper-card puzzle-questions" aria-labelledby="puzzle-question-title">
          <div className="question-panel__meta"><h2 id="puzzle-question-title">Hồ sơ Điện Biên Phủ</h2><span>Đã trả lời {answeredCount} / 5</span></div>
          <div className="puzzle-questions__scroll">
            {level3Questions.map((question) => (
              <fieldset disabled={score !== null || Boolean(showGameOver)} key={question.id}>
                <legend><span>{question.id}</span>{question.question}</legend>
                {question.answers.map((answer) => (
                  <label className={answers[question.id] === answer.id ? 'is-selected' : ''} key={answer.id}>
                    <input
                      checked={answers[question.id] === answer.id}
                      name={`puzzle-${question.id}`}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: answer.id }))}
                      type="radio"
                    />
                    <span><strong>{answer.id}.</strong> {answer.label}</span>
                  </label>
                ))}
              </fieldset>
            ))}
          </div>

          {score !== null && (
            <div className={`status-message ${score === 5 ? 'status-message--success' : 'status-message--error'}`}>
              {score < 5 &&
                'Bạn cần trả lời đúng cả 5 câu để hiện đủ hình hầm Điện Biên Phủ và qua màn. Hãy xem lại hồ sơ chiến dịch rồi thử lại.'}
              {score === 5 && 'Bức tranh hầm Điện Biên Phủ đã được giải mã hoàn chỉnh. Bạn có thể tiếp tục.'}
            </div>
          )}

          <div className="question-panel__actions puzzle-actions">
            {score === null && (
              <button className="button" disabled={!allAnswered || Boolean(showGameOver)} onClick={submitAnswers} type="button">
                <Icon name="fact_check" /> Xác nhận đáp án
              </button>
            )}
            {score !== null && score < 5 && (
              <button className="button" onClick={retry} type="button">
                <Icon name="restart_alt" /> Thử lại
              </button>
            )}
            {score === 5 && inRoom && room && currentPlayer && !showGameOver && (
              <RoomLevelComplete
                currentPlayer={currentPlayer}
                description="Sau 56 ngày đêm, chiến thắng Điện Biên Phủ tạo bước ngoặt quyết định cho cuộc kháng chiến."
                embedded
                level={3}
                onMarkComplete={() => handleCompleteLevel(3)}
                room={room}
                title="Điện Biên Phủ đã được giải mã"
              />
            )}
            {score === 5 && !inRoom && <AutoContinue label="Xem đoạn kết" to="/final" />}
          </div>
        </section>
      </div>
    </div>
  )
}
