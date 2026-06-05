import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Board from './components/Board'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Thin gold reading-progress bar pinned to the top of the viewport
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight)
      setPct(Math.min(scrolled * 100, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--gold), var(--gold-soft))',
        zIndex: 1100,
        transition: 'width 0.1s linear',
      }}
    />
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!introDone && <Intro key="intro" onClose={() => setIntroDone(true)} />}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Board />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
