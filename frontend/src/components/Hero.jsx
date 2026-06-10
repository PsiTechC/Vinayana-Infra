import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

// Background video carousel — clips crossfade one into the next.
const VIDEOS = ['/assets/hero-1', '/assets/hero-2', '/assets/hero-3', '/assets/hero-4']

// Phones get the static poster only — the carousel videos (1.6 MB+) never
// load there, which is the single biggest mobile-LCP/Speed-Index win.
const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

export default function Hero() {
  // Soft parallax on the background driven by scroll
  const [offset, setOffset] = useState(0)
  const heroRef = useRef(null)

  // Decide once on mount whether this is a phone (poster-only) or desktop (video).
  const [useVideo, setUseVideo] = useState(() => !isMobileViewport())

  // Hold video loading/playback until after the first paint so the hero text
  // and poster settle first — avoids the big MP4 starving the critical path.
  const [videoStarted, setVideoStarted] = useState(false)

  // Background video carousel state
  const [active, setActive] = useState(0)
  const videoRefs = useRef([])
  const next = () => setActive((a) => (a + 1) % VIDEOS.length)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < window.innerHeight) setOffset(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Re-evaluate on resize/orientation change so a rotated tablet still behaves.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const sync = () => setUseVideo(!mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Kick off video loading only after the hero has had a chance to paint.
  useEffect(() => {
    if (!useVideo) return
    const idle =
      window.requestIdleCallback || ((cb) => window.setTimeout(cb, 200))
    const id = idle(() => setVideoStarted(true))
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [useVideo])

  // Play only the active clip; reset + pause the others. Gated on videoStarted.
  // preload="none" means each clip only fetches once we load()+play() it.
  useEffect(() => {
    if (!useVideo || !videoStarted) return
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        if (!v.currentSrc) v.load() // pick up the just-mounted <source>
        v.currentTime = 0
        const p = v.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active, useVideo, videoStarted])

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Parallax background video carousel — clips crossfade, poster covers load */}
      <div
        className="hero__bg"
        style={{ transform: `translateY(${offset * 0.35}px) scale(1.08)` }}
      >
        {useVideo ? (
          VIDEOS.map((src, i) => (
            <video
              key={src}
              ref={(el) => (videoRefs.current[i] = el)}
              className={`hero__video ${i === active ? 'is-active' : ''}`}
              muted
              playsInline
              preload="none"
              poster={`${src}.jpg`}
              onEnded={i === active ? next : undefined}
            >
              {videoStarted && <source src={`${src}.mp4`} type="video/mp4" />}
            </video>
          ))
        ) : (
          /* Phones: static poster only — no video downloads on the critical path */
          <img
            className="hero__video is-active"
            src="/assets/hero-1.jpg"
            alt=""
            fetchPriority="high"
          />
        )}
      </div>
      <div className="hero__overlay" />

      {/* Carousel indicators — only meaningful when the video carousel runs */}
      {useVideo && (
        <div className="hero__dots">
          {VIDEOS.map((src, i) => (
            <button
              key={src}
              className={`hero__dot ${i === active ? 'is-active' : ''}`}
              aria-label={`Show background clip ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}

      <div className="container hero__content">
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Real Estate · Infrastructure · Development
        </motion.span>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__title-brand">Vinayana Infra Projects</span>
          Building Landmarks.
          <br />
          <span className="hero__title-accent">Creating Futures.</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Vinayana Infra Projects delivers modern real estate and infrastructure
          solutions with quality, trust, and innovation.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
        >
          <a href="#services" className="btn btn-gold">
            Explore Projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline-light">
            Contact Us
          </a>
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span></span>
      </a>
    </section>
  )
}
