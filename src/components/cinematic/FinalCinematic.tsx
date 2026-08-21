import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './FinalCinematic.css'

export const VICTORY_VIDEO =
  'https://res.cloudinary.com/dxkvlbzzu/video/upload/v1787339706/ctdbp_ipopum.mp4'
const VICTORY_BG = '/background_chienthangdbp.png'

type FinalCinematicProps = {
  finishLabel: string
  onFinished: () => void
}

type Phase = 'bridge' | 'video' | 'victory'

export function FinalCinematic({ finishLabel, onFinished }: FinalCinematicProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)
  const bridgeTitleRef = useRef<HTMLParagraphElement>(null)
  const bridgeLineRef = useRef<HTMLSpanElement>(null)
  const victoryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)
  const endedRef = useRef(false)
  const [phase, setPhase] = useState<Phase>('bridge')
  const [videoReady, setVideoReady] = useState(false)

  const goToVictory = useCallback(() => {
    if (endedRef.current) return
    endedRef.current = true
    videoRef.current?.pause()
    localStorage.setItem('vnr-final', 'complete')
    setPhase('victory')
  }, [])

  // Cinematic bridge while chunk/video warm up — then mount the player.
  useEffect(() => {
    if (phase !== 'bridge') return
    const root = bridgeRef.current
    const title = bridgeTitleRef.current
    const line = bridgeLineRef.current
    if (!root || !title || !line) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set([title, line], { opacity: 0, y: reduced ? 0 : 16 })
      gsap.set(root, { opacity: 1 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => setPhase('video'),
      })

      tl.to(title, { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.85 }, 0.15)
        .fromTo(
          line,
          { opacity: 0, scaleX: 0.2 },
          { opacity: 1, scaleX: 1, duration: reduced ? 0.01 : 0.7 },
          '-=0.35',
        )
        .to({}, { duration: reduced ? 0.05 : 0.55 })
        .to([title, line], { opacity: 0, duration: reduced ? 0.01 : 0.45 }, '+=0.15')
    }, root)

    return () => ctx.revert()
  }, [phase])

  // Play as soon as the single video can start (preload began after L3 win).
  useEffect(() => {
    if (phase !== 'video') return
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const tryPlay = async () => {
      if (cancelled) return
      setVideoReady(true)
      try {
        video.muted = false
        await video.play()
      } catch {
        try {
          video.muted = true
          await video.play()
        } catch {
          /* user can skip */
        }
      }
    }

    if (video.readyState >= 2) {
      void tryPlay()
    } else {
      const onReady = () => {
        void tryPlay()
      }
      video.addEventListener('canplay', onReady, { once: true })
      video.load()
      return () => {
        cancelled = true
        video.removeEventListener('canplay', onReady)
      }
    }

    return () => {
      cancelled = true
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'victory') return
    const root = victoryRef.current
    const title = titleRef.current
    const date = dateRef.current
    const action = actionRef.current
    if (!root || !title || !date || !action) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set([title, date, action], { opacity: 0, y: reduced ? 0 : 28 })
      gsap.set(root, { opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.to(root, { opacity: 1, duration: reduced ? 0.01 : 1.1 })
        .to(title, { opacity: 1, y: 0, duration: reduced ? 0.01 : 1.15 }, '-=0.35')
        .to(date, { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.9 }, '-=0.55')
        .to(action, { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.75 }, '-=0.35')
    }, root)

    return () => ctx.revert()
  }, [phase])

  return (
    <div aria-label="Đoạn kết Chiến thắng Điện Biên Phủ" className="fc">
      {phase === 'bridge' && (
        <div className="fc__bridge" ref={bridgeRef}>
          <div
            aria-hidden="true"
            className="fc__bridge-bg"
            style={{ backgroundImage: `url(${VICTORY_BG})` }}
          />
          <div aria-hidden="true" className="fc__bridge-veil" />
          <p className="fc__bridge-title" ref={bridgeTitleRef}>
            1951 — 1954
          </p>
          <span aria-hidden="true" className="fc__bridge-line" ref={bridgeLineRef} />
          <p className="fc__bridge-sub">Hành trình đến Điện Biên Phủ</p>
        </div>
      )}

      {phase === 'video' && (
        <div className={`fc__stage ${videoReady ? 'is-ready' : ''}`}>
          <div
            aria-hidden="true"
            className="fc__video-blur"
            style={{ backgroundImage: `url(${VICTORY_BG})` }}
          />
          <video
            className="fc__video fc__video--main"
            onEnded={goToVictory}
            playsInline
            preload="auto"
            ref={videoRef}
            src={VICTORY_VIDEO}
          />
          <div aria-hidden="true" className="fc__video-veil" />
          {!videoReady && (
            <div className="fc__buffer" aria-live="polite">
              <span className="fc__buffer-pulse" />
              <p>Đang mở thước phim…</p>
            </div>
          )}
          <button className="fc__skip" onClick={goToVictory} type="button">
            Bỏ qua
          </button>
        </div>
      )}

      {phase === 'victory' && (
        <div
          className="fc__victory"
          ref={victoryRef}
          style={{ backgroundImage: `url(${VICTORY_BG})` }}
        >
          <div aria-hidden="true" className="fc__victory-veil" />
          <div aria-hidden="true" className="fc__victory-grain" />
          <div className="fc__victory-copy">
            <h1 className="fc__victory-title" ref={titleRef}>
              Chiến thắng
              <br />
              Điện Biên Phủ
            </h1>
            <p className="fc__victory-date" ref={dateRef}>
              07/05/1954
            </p>
            <div className="fc__victory-action" ref={actionRef}>
              <button className="button" onClick={onFinished} type="button">
                {finishLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
