import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../common/Icon'

const AUTO_MS = 5000

type AutoContinueProps = {
  to: string
  label: string
  /** Called once before navigating (e.g. mark level complete). Return false to cancel auto-nav. */
  onBeforeNavigate?: () => Promise<boolean> | boolean
}

/** Button + 5s auto-advance after a level (or cinematic) completes. */
export function AutoContinue({ to, label, onBeforeNavigate }: AutoContinueProps) {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(Math.ceil(AUTO_MS / 1000))
  const [busy, setBusy] = useState(false)
  const goingRef = useRef(false)

  const go = async () => {
    if (goingRef.current) return
    goingRef.current = true
    setBusy(true)
    if (onBeforeNavigate) {
      const ok = await onBeforeNavigate()
      if (!ok) {
        goingRef.current = false
        setBusy(false)
        return
      }
    }
    navigate(to)
  }

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1))
    }, 1000)
    const timer = window.setTimeout(() => {
      void go()
    }, AUTO_MS)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(timer)
    }
    // Mount-once auto advance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="auto-continue">
      <p className="auto-continue__countdown" aria-live="polite">
        Tự chuyển sau <strong>{seconds}s</strong>
      </p>
      <button className="button" disabled={busy} onClick={() => void go()} type="button">
        {label} <Icon name="arrow_forward" />
      </button>
    </div>
  )
}
