import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HistoryImage } from '../../data/history'

gsap.registerPlugin(ScrollTrigger)

type StickyVictoryCardsProps = {
  cards: HistoryImage[]
}

/**
 * Skiper17-inspired sticky stack. Images keep native aspect ratio + rounded corners.
 * One shared caption appears after the stack finishes — no per-card text overlap.
 */
export function StickyVictoryCards({ cards }: StickyVictoryCardsProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const headRef = useRef<HTMLElement>(null)
  const finalCaptionRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || cards.length < 2) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      if (finalCaptionRef.current) finalCaptionRef.current.style.opacity = '1'
      return
    }

    const ctx = gsap.context(() => {
      const els = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (els.length < 2) return

      const head = headRef.current
      const finalCaption = finalCaptionRef.current

      gsap.set(els[0], { yPercent: 0, scale: 1, rotation: 0, zIndex: 1 })
      for (let i = 1; i < els.length; i += 1) {
        gsap.set(els[i], { yPercent: 108, scale: 1, rotation: 0, zIndex: i + 1 })
      }
      if (finalCaption) gsap.set(finalCaption, { opacity: 0, y: 10 })
      if (head) gsap.set(head, { opacity: 1 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector('.lp-sticky-cards__stage'),
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * (els.length - 1) * 0.82)}`,
          pin: true,
          scrub: 0.35,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // Fade intro copy early so the stack takes focus
      if (head) {
        timeline.to(head, { opacity: 0.28, duration: 0.45, ease: 'none' }, 0)
      }

      for (let i = 0; i < els.length - 1; i += 1) {
        timeline.to(
          els[i],
          {
            scale: 0.72,
            rotation: 4.5,
            duration: 1,
            ease: 'none',
          },
          i,
        )
        timeline.to(
          els[i + 1],
          {
            yPercent: 0,
            duration: 1,
            ease: 'none',
          },
          i,
        )
      }

      // After last card lands: hide intro, show shared caption
      if (head) {
        timeline.to(head, { opacity: 0, duration: 0.35, ease: 'none' }, els.length - 1.15)
      }
      if (finalCaption) {
        timeline.to(finalCaption, { opacity: 1, y: 0, duration: 0.4, ease: 'none' }, els.length - 1.05)
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh())
      ro.observe(root)

      return () => {
        ro.disconnect()
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    }, root)

    return () => ctx.revert()
  }, [cards.length])

  return (
    <div className="lp-sticky-cards" ref={rootRef}>
      <div className="lp-sticky-cards__stage">
        <header className="lp-sticky-cards__head" ref={headRef}>
          <div className="lp-victory__dates">
            <p>13.03.1954</p>
            <span aria-hidden="true">↓</span>
            <p className="lp-victory__days">56 NGÀY ĐÊM</p>
            <span aria-hidden="true">↓</span>
            <p>07.05.1954</p>
          </div>
          <p className="lp-victory__stack-label">Ăn mừng chiến thắng Điện Biên Phủ</p>
        </header>

        <div className="lp-sticky-cards__frame">
          {cards.map((card, index) => (
            <div
              className="lp-sticky-cards__card"
              key={card.src}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
            >
              <img alt={card.alt} loading={index === 0 ? 'eager' : 'lazy'} src={card.src} />
            </div>
          ))}
        </div>

        <p className="lp-sticky-cards__final-caption" ref={finalCaptionRef}>
          07.05.1954 — chiến thắng Điện Biên Phủ
        </p>
      </div>
    </div>
  )
}
