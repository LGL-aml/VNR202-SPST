import { useCallback, useEffect, useRef, useState } from 'react'

const AUDIO_SRC = '/audio/chienthangdienbienphu.mp3'
const STORAGE_KEY = 'vnr-site-audio'

/** While true, ambient track must not auto-start / gesture-unlock. */
let cinematicAudioLock = false

/**
 * Site-wide ambient track for the header volume control.
 * Tries autoplay on first visit; if the browser blocks it, starts on the first
 * user gesture (click / tap / key / scroll) so music still feels automatic.
 * Once the user explicitly mutes, auto-start / gesture unlock never restarts it.
 */
export function useSiteAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const unlockedRef = useRef(false)
  const userDisabledRef = useRef(false)
  const removeGestureListenersRef = useRef<() => void>(() => {})

  useEffect(() => {
    let preferredOff = false
    try {
      preferredOff = localStorage.getItem(STORAGE_KEY) === 'off'
    } catch {
      /* ignore */
    }
    userDisabledRef.current = preferredOff

    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.55
    audioRef.current = audio

    if (preferredOff) {
      return () => {
        audio.pause()
        audio.src = ''
        audioRef.current = null
      }
    }

    const persistOn = () => {
      try {
        localStorage.setItem(STORAGE_KEY, 'on')
      } catch {
        /* ignore */
      }
    }

    const startPlayback = async () => {
      if (cinematicAudioLock || userDisabledRef.current) return true
      if (unlockedRef.current) return true
      try {
        await audio.play()
        unlockedRef.current = true
        setSoundEnabled(true)
        persistOn()
        return true
      } catch {
        setSoundEnabled(false)
        return false
      }
    }

    const gestureEvents = ['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'] as const

    const armGestureUnlock = () => {
      const onGesture = () => {
        void startPlayback().then((ok) => {
          if (ok) removeGestureListenersRef.current()
        })
      }
      gestureEvents.forEach((eventName) => {
        window.addEventListener(eventName, onGesture, { passive: true })
      })
      return () => {
        gestureEvents.forEach((eventName) => {
          window.removeEventListener(eventName, onGesture)
        })
      }
    }

    removeGestureListenersRef.current = () => {}

    const tryAutoplay = async () => {
      const ok = await startPlayback()
      if (!ok) {
        removeGestureListenersRef.current = armGestureUnlock()
      }
    }

    const onCanPlay = () => {
      void tryAutoplay()
    }
    audio.addEventListener('canplaythrough', onCanPlay, { once: true })
    void tryAutoplay()

    return () => {
      removeGestureListenersRef.current()
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const toggleSound = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (soundEnabled) {
      audio.pause()
      userDisabledRef.current = true
      unlockedRef.current = true
      removeGestureListenersRef.current()
      removeGestureListenersRef.current = () => {}
      setSoundEnabled(false)
      try {
        localStorage.setItem(STORAGE_KEY, 'off')
      } catch {
        /* ignore */
      }
      return
    }

    try {
      cinematicAudioLock = false
      userDisabledRef.current = false
      if (audio.paused) audio.currentTime = audio.currentTime || 0
      await audio.play()
      unlockedRef.current = true
      removeGestureListenersRef.current()
      removeGestureListenersRef.current = () => {}
      setSoundEnabled(true)
      try {
        localStorage.setItem(STORAGE_KEY, 'on')
      } catch {
        /* ignore */
      }
    } catch {
      setSoundEnabled(false)
    }
  }, [soundEnabled])

  /** Pause ambient BGM for final video — does not change user's saved preference. */
  const pauseForCinematic = useCallback(() => {
    cinematicAudioLock = true
    const audio = audioRef.current
    if (audio && !audio.paused) audio.pause()
    setSoundEnabled(false)
    removeGestureListenersRef.current()
    removeGestureListenersRef.current = () => {}
  }, [])

  /** Restore ambient BGM after cinematic if user had not muted permanently. */
  const resumeAfterCinematic = useCallback(async () => {
    cinematicAudioLock = false
    let preferredOff = false
    try {
      preferredOff = localStorage.getItem(STORAGE_KEY) === 'off'
    } catch {
      /* ignore */
    }
    if (preferredOff || userDisabledRef.current) return

    const audio = audioRef.current
    if (!audio) return
    try {
      await audio.play()
      unlockedRef.current = true
      setSoundEnabled(true)
    } catch {
      setSoundEnabled(false)
    }
  }, [])

  return { soundEnabled, toggleSound, pauseForCinematic, resumeAfterCinematic }
}
