import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './FinalCinematic.css'

const VICTORY_VIDEO =
  'https://res.cloudinary.com/dxkvlbzzu/video/upload/v1787339706/ctdbp_ipopum.mp4'
const VICTORY_BG = '/background_chienthangdbp.png'

type FinalCinematicProps = {
  finishLabel: string
  onFinished: () => void
}

type Phase = 'video' | 'victory'

export function FinalCinematic({ finishLabel, onFinished }: FinalCinematicProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const blurVideoRef = useRef<HTMLVideoElement>(null)
  const victoryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)
  const endedRef = useRef(false)
  const [phase, setPhase] = useState<Phase>('video')

  const goToVictory = useCallback(() => {
    if (endedRef.current) return
    endedRef.current = true

    videoRef.current?.pause()
    blurVideoRef.current?.pause()

    localStorage.setItem('vnr-final', 'complete')
    setPhase('victory')
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const blur = blurVideoRef.current
    if (!video || phase !== 'video') return

    const tryPlay = async () => {
      try {
        video.muted = false
        await video.play()
      } catch {
        try {
          video.muted = true
          await video.play()
        } catch {
          /* browser blocked — user can skip */
        }
      }

      if (blur) {
        blur.muted = true
        try {
          blur.currentTime = video.currentTime || 0
          await blur.play()
        } catch {
          /* ignore */
        }
      }
    }

    void tryPlay()
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
      {phase === 'video' && (
        <div className="fc__stage">
          <video
            aria-hidden="true"
            autoPlay
            className="fc__video fc__video--blur"
            muted
            playsInline
            preload="auto"
            ref={blurVideoRef}
            src={VICTORY_VIDEO}
          />
          <video
            autoPlay
            className="fc__video fc__video--main"
            onEnded={goToVictory}
            playsInline
            preload="auto"
            ref={videoRef}
            src={VICTORY_VIDEO}
          />
          <div aria-hidden="true" className="fc__video-veil" />
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
