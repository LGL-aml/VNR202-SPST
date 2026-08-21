import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTop, useLenisScroll } from '../animations/scroll/useLenisScroll'
import { historicalTimeline } from '../data/history'
import { LandingHero } from '../components/landing/LandingHero'
import { LandingIntro } from '../components/landing/LandingIntro'
import { YearTimeline } from '../components/landing/YearTimeline'
import { YearSection } from '../components/landing/YearSection'
import { StrategicMap1953 } from '../components/landing/StrategicMap1953'
import { LandingVictory, LandingConclusion } from '../components/landing/LandingVictory'
import '../components/landing/landing.css'

gsap.registerPlugin(ScrollTrigger)

const YEAR_IDS = historicalTimeline.map((entry) => entry.year)

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { state } = useLocation()
  const navigate = useNavigate()
  const [activeYear, setActiveYear] = useState('1951')
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [timelineOnDark, setTimelineOnDark] = useState(false)

  useLenisScroll(true)

  useEffect(() => {
    const smoothTop = Boolean(state && typeof state === 'object' && 'smoothTop' in state && state.smoothTop)
    if (!smoothTop) return
    const timer = window.setTimeout(() => {
      scrollToTop({ duration: 1.4 })
      navigate('.', { replace: true, state: null })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [state, navigate])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const heroReveals = root.querySelectorAll('.lp-hero .lp-reveal')
      gsap.fromTo(
        heroReveals,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reducedMotion ? 0.01 : 1,
          stagger: reducedMotion ? 0 : 0.12,
          ease: 'power3.out',
          delay: reducedMotion ? 0 : 0.15,
        },
      )

      if (!reducedMotion) {
        gsap.to('.lp-hero__map-lines', {
          backgroundPosition: '120% 40%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.lp-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      ScrollTrigger.create({
        trigger: '.lp-hero',
        start: 'bottom 75%',
        onEnter: () => setTimelineVisible(true),
        onLeaveBack: () => setTimelineVisible(false),
      })

      root.querySelectorAll('.lp-reveal').forEach((el) => {
        if (el.closest('.lp-hero')) return
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: reducedMotion ? 0.01 : 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      root.querySelectorAll('.lp-archival').forEach((img) => {
        gsap.fromTo(
          img,
          { filter: 'grayscale(0.85) sepia(0.18) contrast(1.05)', scale: 1.06 },
          {
            filter: 'grayscale(0.25) sepia(0.08) contrast(1.02)',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              end: 'top 35%',
              scrub: true,
            },
          },
        )
      })

      const routes = root.querySelectorAll('.lp-route')
      routes.forEach((route, index) => {
        const path = route as SVGPathElement
        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.lp-strategy',
            start: `top ${70 - index * 8}%`,
            end: 'center center',
            scrub: true,
          },
        })
      })

      const progress = root.querySelector('.lp-timeline__progress')
      if (progress) {
        const isMobile = window.matchMedia('(max-width: 980px)').matches
        gsap.fromTo(
          progress,
          isMobile ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(isMobile ? { scaleX: 1 } : { scaleY: 1 }),
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      }

      YEAR_IDS.forEach((year) => {
        const section = root.querySelector(`#year-${year}`)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveYear(year),
          onEnterBack: () => setActiveYear(year),
        })
      })

      ScrollTrigger.create({
        trigger: '#victory',
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          setActiveYear('1954')
          setTimelineOnDark(true)
        },
        onEnterBack: () => {
          setActiveYear('1954')
          setTimelineOnDark(true)
        },
        onLeave: () => setTimelineOnDark(false),
        onLeaveBack: () => setTimelineOnDark(false),
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="landing-page" ref={rootRef}>
      <YearTimeline
        activeYear={activeYear}
        onDark={timelineOnDark}
        visible={timelineVisible}
        years={YEAR_IDS}
      />
      <LandingHero />
      <LandingIntro />
      {historicalTimeline.map((entry, index) => (
        <div key={entry.id}>
          <YearSection entry={entry} index={index} />
          {entry.year === '1953' && <StrategicMap1953 />}
        </div>
      ))}
      <LandingVictory />
      <LandingConclusion />
    </div>
  )
}
