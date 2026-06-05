import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Navbar.css'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#board' },
  { label: 'Mentors', href: '#mentors' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNav = () => setOpen(false)

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand" onClick={handleNav}>
          <img
            className="navbar__mark"
            src={scrolled ? '/assets/mark-navy.png' : '/assets/mark-white.png'}
            alt="Vinayana Infra Projects logo"
          />
          <span className="navbar__wordmark">
            Vinayana
            <em>Infra Projects</em>
          </span>
        </a>

        <nav className="navbar__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="navbar__link">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-gold navbar__cta">
          Get a Quote
        </a>

        <button
          className={`navbar__burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="navbar__mobile-link" onClick={handleNav}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-gold" onClick={handleNav}>
              Get a Quote
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
