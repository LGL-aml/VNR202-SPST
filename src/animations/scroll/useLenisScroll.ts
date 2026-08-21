import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function getLenis() {
  return lenisInstance
}

export function scrollToSection(target: string | HTMLElement, options?: { offset?: number; duration?: number }) {
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!element) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const offset = options?.offset ?? -24
  const lenis = lenisInstance

  if (lenis && !reducedMotion) {
    lenis.scrollTo(element, {
      offset,
      duration: options?.duration ?? 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    return
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({
    top,
    behavior: reducedMotion ? 'auto' : 'smooth',
  })
}

export function scrollToTop(options?: { duration?: number }) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lenis = lenisInstance

  if (lenis && !reducedMotion) {
    lenis.scrollTo(0, {
      duration: options?.duration ?? 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    return
  }

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? 'auto' : 'smooth',
  })
}

export function useLenisScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      ScrollTrigger.config({ ignoreMobileResize: true })
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}
