import { useEffect, useRef, useState, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../common/Icon'

const AUTO_MS = 5000

type AutoContinueProps = {
  to: string
  label: string
  /** Optional side-effect before navigate. Never blocks navigation. */
  onBeforeNavigate?: () => void
}

/** Button + 5s auto-advance after a level (or cinematic) completes. */
export function AutoContinue({ to, label, onBeforeNavigate }: AutoContinueProps) {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(Math.ceil(AUTO_MS / 1000))
  const [busy, setBusy] = useState(false)
  const goingRef = useRef(false)

  const go = () => {
    if (goingRef.current) return
    goingRef.current = true
    setBusy(true)
    try {
      onBeforeNavigate?.()
    } catch {
      /* ignore side-effect errors */
    }
    startTransition(() => {
      navigate(to)
    })
  }

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1))
    }, 1000)
    const timer = window.setTimeout(() => {
      go()
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
      <button className="button" disabled={busy} onClick={go} type="button">
        {label} <Icon name="arrow_forward" />
      </button>
    </div>
  )
}
