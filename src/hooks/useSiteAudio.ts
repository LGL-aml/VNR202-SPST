import { useCallback, useEffect, useRef, useState } from 'react'

const AUDIO_SRC = '/audio/chienthangdienbienphu.mp3'
const STORAGE_KEY = 'vnr-site-audio'

/**
 * Site-wide ambient track for the header volume control.
 * Tries autoplay on first visit; if the browser blocks it, starts on the first
 * user gesture (click / tap / key / scroll) so music still feels automatic.
 */
export function useSiteAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const unlockedRef = useRef(false)

  useEffect(() => {
    let preferredOff = false
    try {
      preferredOff = localStorage.getItem(STORAGE_KEY) === 'off'
    } catch {
      /* ignore */
    }

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
          if (ok) removeGestureListeners()
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

    let removeGestureListeners = () => {}

    const tryAutoplay = async () => {
      const ok = await startPlayback()
      if (!ok) {
        removeGestureListeners = armGestureUnlock()
      }
    }

    // Start as soon as the file can play; also try immediately
    const onCanPlay = () => {
      void tryAutoplay()
    }
    audio.addEventListener('canplaythrough', onCanPlay, { once: true })
    void tryAutoplay()

    return () => {
      removeGestureListeners()
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
      unlockedRef.current = false
      setSoundEnabled(false)
      try {
        localStorage.setItem(STORAGE_KEY, 'off')
      } catch {
        /* ignore */
      }
      return
    }

    try {
      if (audio.paused) audio.currentTime = audio.currentTime || 0
      await audio.play()
      unlockedRef.current = true
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
