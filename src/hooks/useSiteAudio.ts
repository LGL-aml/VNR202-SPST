import { useCallback, useEffect, useRef, useState } from 'react'

const AUDIO_SRC = '/audio/chienthangdienbienphu.mp3'
const STORAGE_KEY = 'vnr-site-audio'

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
      // User muted explicitly — treat as settled so gesture handlers detach.
      if (userDisabledRef.current) return true
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

    // Start as soon as the file can play; also try immediately
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
      // Keep unlocked so residual gesture handlers cannot call play() again;
      // also detach them immediately.
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

  return { soundEnabled, toggleSound }
}
