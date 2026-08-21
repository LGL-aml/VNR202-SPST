import { type DragEvent, type ReactNode, useEffect, useMemo, useState } from 'react'
import { level2Cards } from '../../data/level2Cards'
import { level2Categories } from '../../data/level2Categories'
import type { SortCard } from '../../data/gameTypes'
import { prefetchLevel3 } from '../../game/prefetchRoutes'
import { AutoContinue } from './AutoContinue'
import { Icon } from '../common/Icon'

type SortStatus = 'idle' | 'partial' | 'correct'
type Assignments = Record<string, string>

const initialOrder = ['G', 'A', 'K', 'D', 'H', 'C', 'J', 'F', 'B', 'L', 'E', 'I']

type CardSortGameProps = {
  completeActions?: ReactNode
}

export function CardSortGame({ completeActions }: CardSortGameProps) {
  const [assignments, setAssignments] = useState<Assignments>({})
  const [lockedIds, setLockedIds] = useState<Set<string>>(() => new Set())
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [status, setStatus] = useState<SortStatus>('idle')
  const cardsById = useMemo(() => new Map(level2Cards.map((card) => [card.id, card])), [])
  const assignedCount = Object.keys(assignments).length
  const complete = lockedIds.size === level2Cards.length

  const placeCard = (cardId: string, categoryId: string) => {
    if (lockedIds.has(cardId) || complete) return
    setAssignments((current) => ({ ...current, [cardId]: categoryId }))
    setSelectedCardId(null)
    setStatus('idle')
  }

  const returnCard = (cardId: string) => {
    if (lockedIds.has(cardId) || complete) return
    setAssignments((current) => {
      const next = { ...current }
      delete next[cardId]
      return next
    })
    setSelectedCardId(cardId)
    setStatus('idle')
  }

  const handleDragStart = (event: DragEvent, cardId: string) => {
    event.dataTransfer.setData('text/plain', cardId)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (event: DragEvent, categoryId: string) => {
    event.preventDefault()
    const cardId = event.dataTransfer.getData('text/plain')
    if (cardsById.has(cardId)) placeCard(cardId, categoryId)
  }

  // Auto-confirm when every card is placed
  useEffect(() => {
    if (complete) return
    if (Object.keys(assignments).length !== level2Cards.length) return

    const correctCards = level2Cards.filter((card) => assignments[card.id] === card.categoryId)
    const nextLocked = new Set(correctCards.map((card) => card.id))
    setLockedIds(nextLocked)

    if (nextLocked.size === level2Cards.length) {
      setStatus('correct')
      localStorage.setItem('vnr-game-v2-level-2', 'complete')
      prefetchLevel3()
      return
    }

    setAssignments(Object.fromEntries(correctCards.map((card) => [card.id, card.categoryId])))
    setStatus('partial')
  }, [assignments, complete])

  const resetUnlocked = () => {
    setAssignments(Object.fromEntries([...lockedIds].map((id) => [id, cardsById.get(id)!.categoryId])))
    setSelectedCardId(null)
    setStatus('idle')
  }

  const renderChip = (card: SortCard) => {
    const locked = lockedIds.has(card.id)
    return (
      <button
        aria-label={`${card.label}${locked ? ' đã khóa đúng' : ''}`}
        className={`sort-chip ${selectedCardId === card.id ? 'is-selected' : ''} ${locked ? 'is-locked' : ''}`}
        disabled={locked}
        draggable={!locked && !complete}
        key={card.id}
        onClick={() => returnCard(card.id)}
        onDragStart={(event) => handleDragStart(event, card.id)}
        title={locked ? 'Đã khóa đúng' : 'Chạm để trả về hồ sơ chưa phân loại'}
        type="button"
      >
        <strong>{card.label}</strong>
        {locked && <Icon name="lock" />}
      </button>
    )
  }

  const renderPoolCard = (card: SortCard) => (
    <div
      className={`sort-pool-card-wrap ${selectedCardId === card.id ? 'is-selected' : ''}`}
      key={card.id}
    >
      <button
        aria-describedby={`sort-preview-${card.id}`}
        aria-pressed={selectedCardId === card.id}
        className={`sort-pool-card ${selectedCardId === card.id ? 'is-selected' : ''}`}
        draggable={!complete}
        onClick={() => setSelectedCardId(card.id)}
        onDragStart={(event) => handleDragStart(event, card.id)}
        type="button"
      >
        <span className="sort-pool-card__id">{card.id}</span>
        <strong>{card.label}</strong>
      </button>
      <div className="sort-pool-card__preview" id={`sort-preview-${card.id}`} role="tooltip">
        <span className="sort-pool-card__preview-label">{card.label}</span>
        <p>{card.content}</p>
      </div>
    </div>
  )

  if (complete) {
    return (
      <section className="paper-card sort-complete" aria-live="polite">
        <p className="page-kicker">Thế trận đã hoàn chỉnh</p>
        <div className="strategy-progression">
          {level2Categories.map((category, index) => (
            <div key={category.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{category.progression}</strong>
              {index < level2Categories.length - 1 && (
                <em className="strategy-progression__arrow" aria-hidden="true" title="Bước tiếp">
                  ↓
                </em>
              )}
            </div>
          ))}
        </div>
        <h2>Xác định đúng hướng → tổ chức thực hiện → tạo thế → huy động hậu phương.</h2>
        {completeActions ?? (
          <AutoContinue label="Màn tiếp theo" to="/game/level-3" />
        )}
      </section>
    )
  }

  const poolCards = initialOrder.map((id) => cardsById.get(id)!).filter((card) => !assignments[card.id])

  return (
    <div className="card-sort-game">
      <div className="sort-progress">
        <span>Đã xếp {assignedCount} / 12 thẻ</span>
        <span>{lockedIds.size} thẻ đã khóa đúng</span>
      </div>

      <div className="sort-board">
        <section className="sort-categories" aria-label="Bốn nhóm phân loại">
          {level2Categories.map((category) => {
            const categoryCards = level2Cards.filter((card) => assignments[card.id] === category.id)
            return (
              <article
                className={`sort-category ${selectedCardId ? 'can-receive' : ''}`}
                key={category.id}
                onClick={() => {
                  if (selectedCardId) placeCard(selectedCardId, category.id)
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, category.id)}
              >
                <header>
                  <h2>{category.label}</h2>
                  <span>{categoryCards.length} / 3</span>
                </header>
                <p className="sort-category__hint">
                  {selectedCardId
                    ? `Chạm để đặt ${selectedCardId}`
                    : 'Kéo thẻ vào đây'}
                </p>
                <div className="sort-category__cards">
                  {categoryCards.map((card) => renderChip(card))}
                </div>
              </article>
            )
          })}
        </section>

        <aside className="paper-card sort-pool" aria-labelledby="sort-pool-title">
          <div className="event-pool__heading">
            <div>
              <p className="page-kicker">Tài liệu chưa phân loại</p>
              <h2 id="sort-pool-title">Hồ sơ Đông – Xuân</h2>
            </div>
            <button className="button button--secondary" onClick={resetUnlocked} type="button">
              <Icon name="restart_alt" /> Xếp lại
            </button>
          </div>
          <p className="sort-pool__hint">
            Di chuột vào thẻ để đọc nội dung. Kéo sang trái hoặc chọn thẻ rồi chạm nhóm. Đủ 12 thẻ sẽ tự xác nhận.
          </p>
          <div className="sort-pool__grid">
            {poolCards.length > 0 ? (
              poolCards.map((card) => renderPoolCard(card))
            ) : (
              <p className="sort-pool__empty">Đang xác nhận phân loại...</p>
            )}
          </div>
        </aside>
      </div>

      {status === 'partial' && (
        <div className="status-message status-message--error" aria-live="polite">
          Các thẻ đúng đã được khóa. {level2Cards.length - lockedIds.size} thẻ chưa đúng đã trở về hồ sơ để bạn phân loại lại.
        </div>
      )}
    </div>
  )
}
