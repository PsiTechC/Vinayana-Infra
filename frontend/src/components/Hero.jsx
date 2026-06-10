import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

// Background video carousel — clips crossfade one into the next.
const VIDEOS = ['/assets/hero-1', '/assets/hero-2', '/assets/hero-3', '/assets/hero-4']

export default function Hero() {
  // Soft parallax on the background driven by scroll
  const [offset, setOffset] = useState(0)
  const heroRef = useRef(null)

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

  // Play only the active clip; reset + pause the others.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.currentTime = 0
        const p = v.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active])

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Parallax background video carousel — clips crossfade, poster covers load */}
      <div
        className="hero__bg"
        style={{ transform: `translateY(${offset * 0.35}px) scale(1.08)` }}
      >
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => (videoRefs.current[i] = el)}
            className={`hero__video ${i === active ? 'is-active' : ''}`}
            muted
            playsInline
            preload={i === active ? 'auto' : 'none'}
            autoPlay={i === 0}
            poster={`${src}.jpg`}
            onEnded={i === active ? next : undefined}
          >
            <source src={`${src}.mp4`} type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="hero__overlay" />

      {/* Carousel indicators */}
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
