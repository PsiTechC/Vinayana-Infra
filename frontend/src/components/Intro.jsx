import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './Intro.css'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Cinematic brand intro: the logo zooms OUT from a large, soft-blurred state
 * and settles to centre, a gold rule draws beneath it with the tagline, then
 * the white curtain lifts to reveal the hero. Plays once, click-to-skip,
 * and is bypassed entirely for users who prefer reduced motion.
 */
export default function Intro({ onClose }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.style.overflow = 'hidden'

    const close = setTimeout(onClose, reduce ? 200 : 2700)
    return () => {
      clearTimeout(close)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="intro"
      onClick={onClose}
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.05, ease: EASE }}
    >
      {/* soft brand glow behind the mark */}
      <motion.div
        className="intro__glow"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      <div className="intro__center">
        <motion.img
          src="/assets/logo-navy.png"
          alt="Vinayana Infra Projects"
          className="intro__logo"
          initial={{ scale: 2.3, opacity: 0, filter: 'blur(12px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.35, ease: EASE }}
        />

        <motion.span
          className="intro__line"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 230, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
        />

        <motion.p
          className="intro__tagline"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35, ease: EASE }}
        >
          Building Landmarks. Creating Futures.
        </motion.p>
      </div>

      <motion.span
        className="intro__skip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        Click to skip
      </motion.span>
    </motion.div>
  )
}
