import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import './Board.css'

const TEAM = [
  {
    name: 'Vijay Kumar',
    role: 'Founder',
    photo: null,
    initials: 'VK',
    short: "Founder of Vinayana Infra Projects, driving the company's vision, strategy, and long-term growth.",
    bio: [],
    domains: [],
    linkedin: '#',
  },
  {
    name: 'Chirag Daxini',
    role: 'Co-Founder',
    photo: '/assets/director1.png',
    initials: 'CD',
    short:
      '25+ years in Banking & Financial Services — retail, MSME & SME lending, real estate and project finance, and high-performing team building.',
    bio: [
      'A seasoned banking and financial services professional with 25+ years of experience across Retail, MSME, and SME Lending. He brings extensive expertise in Sales, Credit Underwriting, Collections, SARFAESI Matters, Legal & Judicial Processes, Portfolio Management, and Structured Lending Solutions.',
      'Throughout his career, he has successfully led business development initiatives, managed credit portfolios, and worked closely with banks, NBFCs, financial institutions, and government agencies. His strong understanding of credit risk, debt syndication, debt restructuring, real estate finance, project finance, and NPA management has enabled him to deliver sustainable growth and improve portfolio performance.',
      'Known for his leadership, relationship management, and strategic approach, he has a proven track record of building high-performing teams, strengthening client relationships, and driving business excellence through practical and result-oriented financial solutions.',
    ],
    domains: [
      'Sales', 'Credit', 'Collections', 'SARFAESI', 'Legal Due Diligence',
      'Debt Structuring & Advisory', 'Retail / MSME / SME Lending', 'Real Estate Finance',
      'Project Funding', 'Stress Account Restructuring', 'Business Development',
      'Client & Regulatory Relationship Management', 'Team & Channel Management',
      'Financial Products & Instruments', 'Fund-Based & Non-Fund-Based Finance',
      'Private Equity', 'NPA Management', 'Asset-Based Funding',
      'Collection & Judiciary Procedures', 'Cost Control & Time Management',
    ],
    linkedin: '#',
  },
  {
    name: 'Shailesh Sharma',
    role: 'Director',
    photo: '/assets/shailesh.jpeg',
    initials: 'SS',
    short: 'Director overseeing business operations and strategic execution across the company’s projects.',
    bio: [
      'A seasoned leader with extensive expertise in financial management, risk mitigation, and regulatory compliance, he plays a vital role in strengthening the organization’s financial stability and long-term growth. He provides strategic oversight across recovery operations, legal coordination, and stakeholder engagement, ensuring that business objectives are achieved with integrity and accountability.',
      'Known for his results-driven approach and strong leadership, he has consistently contributed to reducing financial risk, enhancing operational efficiency, and building lasting trust among clients, partners, and stakeholders.',
    ],
    domains: [],
    linkedin: '#',
  },
  {
    name: 'Mukesh Kumar',
    role: 'Director',
    photo: '/assets/mukesh.jpeg',
    initials: 'MK',
    short: 'A law graduate with over a decade in the finance sector. From Jaunpur, he brings a strong understanding of financial industries.',
    bio: [],
    domains: [],
    linkedin: '#',
  },
  {
    name: 'Rishu V Jaiswal',
    role: 'Director',
    photo: '/assets/Rishu.jpg',
    initials: 'RJ',
    short: 'A pharmacy professional with hands-on experience across hospital operations, pharmaceutical manufacturing, and quality management.',
    bio: [
      'Mr. Rishu Jaiswal is a dedicated pharmacy professional currently pursuing his Master of Pharmacy (M.Pharm) and building a strong career in the healthcare and pharmaceutical sectors. With academic training in pharmacy and hands-on industry experience, he has developed expertise in hospital operations, patient care, pharmaceutical manufacturing, and quality management.',
      'He has gained valuable practical exposure through his work at Dr. SPM Civil Hospital, Lucknow, Lok Bandhu Shri Raj Narayan Combined Hospital, and Synokem Pharmaceuticals Ltd., where he contributed to emergency patient care, hospital administration, production processes, quality assurance (QA), quality control (QC), and compliance with Good Manufacturing Practices (GMP). These experiences have strengthened his technical knowledge, problem-solving abilities, and commitment to maintaining high standards of healthcare and pharmaceutical excellence.',
      'Alongside his professional experience, Mr. Jaiswal has demonstrated leadership and communication skills through his role as a college coordinator and event anchor. Passionate about continuous learning and professional growth, he is committed to contributing effectively to the advancement of healthcare services and the pharmaceutical industry.',
    ],
    domains: [
      'Hospital Operations', 'Patient Care', 'Emergency Care',
      'Hospital Administration', 'Pharmaceutical Manufacturing', 'Production Processes',
      'Quality Management', 'Quality Assurance (QA)', 'Quality Control (QC)',
      'GMP Compliance', 'Leadership', 'Communication',
    ],
    linkedin: '#',
  },
  {
    name: 'Suresh Yadav',
    role: 'Head – Projects',
    photo: '/assets/suresh.jpeg',
    initials: 'SY',
    short: 'Head of Projects, leading on-ground delivery, scheduling, and execution quality from start to handover.',
    bio: [
      'Mr. Suresh R Yadav brings more than 25 years of rich experience in project coordination and execution. He worked with Hilton Builders & Developers Pvt Ltd for 5 years and for more than 20 years with Jangid Homes Pvt Ltd, where he took care of complete project coordination from scratch to the documentation stage along with securing all necessary departmental permissions.',
      'He specialises in SRA Projects and has successfully handled multiple projects across his career.',
    ],
    domains: [],
    linkedin: '#',
  },
  {
    name: 'Ar. Chetan Limbachiya',
    role: 'Head Architect',
    photo: '/assets/chetan.jpeg',
    initials: 'CL',
    short: 'Head Architect shaping the design vision, space planning, and architectural excellence of every project.',
    bio: [
      'Ar. Chetan Limbachiya is a highly experienced architect and design leader with over 20 years of expertise in architecture, interior design, and master planning. As the Principal Architect of CLA Architects, he has successfully led the design and execution of a diverse portfolio of projects, including luxury residences, commercial developments, educational institutions, industrial facilities, resorts, villas, and large-scale master-planned communities.',
      'Known for his innovative approach and attention to detail, he combines functionality, sustainability, and aesthetics to create spaces that are both inspiring and practical. Under his leadership, CLA Architects has built a reputation for delivering high-quality architectural solutions that meet client objectives while maintaining design excellence and project efficiency.',
      'With a strong focus on client collaboration, technical precision, and creative problem-solving, Ar. Limbachiya continues to shape distinctive environments that enhance the way people live, work, and interact.',
    ],
    domains: [],
    linkedin: '#',
  },
]

const MENTORS = [
  {
    name: 'Sh. S. N. Joshi, IAS',
    role: 'Mentor · Retired IAS',
    photo: '/assets/director2.jpeg',
    focus: '50% 30%',
    initials: 'SJ',
    short:
      'Senior IAS administrator with 40+ years in general administration, infrastructure development, and large-scale project planning across Government of Rajasthan & India.',
    bio: [
      'Sh. S. N. Joshi is a senior administrative and technical professional with over four decades of experience in General Administration, Project Planning, Infrastructure Development, Quality Management, Operations and Maintenance, Procurement and Technical Support.',
      'He has served in senior roles across the Government of Rajasthan and Government of India, working with departments such as PWD, RSEB, PHED, Rajasthan Housing Board, JDA, Bridge Corporation, RSRDC, DDA and NHAI. His experience includes handling roads, bridges, flyovers, buildings, multi-storey projects, malls and large infrastructure works from planning and tendering to execution, commissioning and maintenance.',
      'Post-retirement, he has supported reputed builders and developers in Jaipur, bringing strong expertise in government liaisoning, vendor management, machinery procurement, manpower handling, stakeholder coordination and cost-controlled project delivery.',
      'Known for his practical approach, communication skills and problem-solving abilities, he brings strong administrative insight and technical experience to infrastructure and real estate development.',
    ],
    domains: [
      'General Administration', 'Project Planning', 'Construction Management',
      'Roads & Bridges', 'Infrastructure Development', 'Quality Management',
      'Operations & Maintenance', 'Procurement', 'Vendor Management',
      'Government Liaisoning', 'Manpower Management', 'Technical Support',
      'Cost Control',
    ],
    linkedin: '#',
  },
  {
    name: 'Sh. Sushil Kumar Relan',
    role: 'Mentor · Banking & Finance',
    photo: '/assets/mentor2.jpeg',
    focus: '50% 22%',
    initials: 'SR',
    short:
      'Veteran banker — Non-Executive Director at Pratyancha Financial Services and former Deputy General Manager, State Bank of India.',
    bio: [
      'Sh. Sushil Kumar Relan is a seasoned banking and finance professional who currently serves as Non-Executive Director at Pratyancha Financial Services Limited, an RBI-registered non-banking finance company focused on microfinance and allied financial services.',
      'He brings the depth of a long banking career, including a senior role as Deputy General Manager at the State Bank of India, with strong expertise across credit, institutional lending and financial services.',
      'As a mentor to Vinayana Infra Projects, he lends his financial acumen and institutional experience to guide prudent growth, funding strategy and governance.',
    ],
    domains: [
      'Banking', 'Microfinance', 'Credit & Lending', 'Institutional Finance',
      'Financial Services', 'Governance', 'Funding Strategy',
    ],
    linkedin: '#',
  },
]

function SocialIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.46 4.46-2.46C21.4 7.74 24 10.1 24 14.6V24h-5v-8.4c0-2-.04-4.57-2.79-4.57-2.79 0-3.21 2.18-3.21 4.43V24h-5V8z" />
    </svg>
  )
}

function Chevron({ dir = 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={dir === 'left' ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Avatar({ d, className = '' }) {
  return d.photo ? (
    <img
      className={`director-photo-img ${className}`}
      src={d.photo}
      alt={d.name}
      loading="lazy"
      style={d.focus ? { objectPosition: d.focus } : undefined}
    />
  ) : (
    <span className="director-card__initials">{d.initials}</span>
  )
}

function PersonCard({ d, delay, onView, plain = false, ariaHidden = false }) {
  const hasProfile = d.bio.length > 0
  const inner = (
    <>
      <div className={`director-card__photo ${d.photo ? 'has-img' : ''}`}>
        <Avatar d={d} />
      </div>
      <h3>{d.name}</h3>
      <span className="director-card__role">{d.role}</span>
      <p>{d.short}</p>

      <div className="director-card__actions">
        {hasProfile && (
          <button className="director-card__profile-btn" onClick={onView}>
            View Full Profile
          </button>
        )}
        <a href={d.linkedin} className="director-card__social" aria-label={`${d.name} on LinkedIn`}>
          <SocialIcon />
        </a>
      </div>
    </>
  )

  // Inside the auto-scrolling marquee we render a plain card (no scroll-reveal,
  // so duplicated/off-screen copies stay visible as they slide into view).
  if (plain) {
    return (
      <div className="director-card" aria-hidden={ariaHidden || undefined}>
        {inner}
      </div>
    )
  }

  return (
    <Reveal className="director-card" delay={delay}>
      {inner}
    </Reveal>
  )
}

export default function Board() {
  const [open, setOpen] = useState(null)
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const posRef = useRef(0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Auto-scroll the team row + zoom whichever card is nearest the centre.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const speed = 0.35 // px per frame (~21px/s — slow, gentle glide)
    posRef.current = el.scrollLeft

    const cards = [...el.querySelectorAll('.director-card')]
    let centers = cards.map((c) => c.offsetLeft + c.offsetWidth / 2)
    const recalc = () => { centers = cards.map((c) => c.offsetLeft + c.offsetWidth / 2) }
    window.addEventListener('resize', recalc)

    // Centre-focus effect: the card nearest the viewport centre scales up and
    // lifts, side cards tilt away in 3-D (coverflow) and dim like a spotlight.
    const applyFocus = () => {
      const mid = el.scrollLeft + el.clientWidth / 2
      const range = el.clientWidth * 0.46 // how far the effect reaches
      cards.forEach((c, i) => {
        const off = (centers[i] - mid) / range // signed: <0 left, >0 right
        const t = Math.max(0, 1 - Math.abs(off)) // 1 at centre → 0 at edge
        const e = t * t * (3 - 2 * t) // smoothstep for a soft peak
        const lift = -16 * e
        const scale = 1 + 0.1 * e
        const tilt = -Math.max(-1, Math.min(1, off)) * (1 - e) * 8 // deg, subtle
        c.style.transform =
          `perspective(1600px) translateY(${lift.toFixed(1)}px) ` +
          `rotateY(${tilt.toFixed(1)}deg) scale(${scale.toFixed(3)})`
        // barely any dim — upcoming/outgoing cards stay almost fully clear
        c.style.opacity = (0.96 + 0.04 * e).toFixed(3)
        c.style.zIndex = String(Math.round(e * 10))
        c.style.boxShadow = e > 0.03
          ? `0 ${(20 * e + 6).toFixed(0)}px ${(46 * e + 14).toFixed(0)}px rgba(6,26,48,${(0.14 * e + 0.04).toFixed(3)})`
          : ''
      })
    }

    const tick = () => {
      if (!pausedRef.current) {
        // accumulate in a float — scrollLeft floors sub-pixel writes, so
        // adding 0.35 directly to it would never move the row
        posRef.current += speed
        const half = el.scrollWidth / 2
        if (half > 0 && posRef.current >= half) posRef.current -= half
        el.scrollLeft = posRef.current
      }
      applyFocus()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recalc)
    }
  }, [])

  // Manual nudge via the arrows. Pause the auto-scroll briefly so the browser's
  // smooth scroll isn't overwritten by the animation frame loop.
  const resumeRef = useRef(null)
  const nudge = (dir) => {
    const el = trackRef.current
    if (!el) return
    const half = el.scrollWidth / 2
    if (dir < 0 && el.scrollLeft < 360) el.scrollLeft += half
    pausedRef.current = true
    el.scrollBy({ left: dir * 360, behavior: 'smooth' })
    clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => {
      posRef.current = el.scrollLeft // resync after the manual scroll
      pausedRef.current = false
    }, 800)
  }

  return (
    <>
      {/* ---------- Our Team ---------- */}
      <section className="section section-alt board" id="board">
        <div className="container">
          <div className="section-head center">
            <Reveal as="span" className="eyebrow">Leadership</Reveal>
            <Reveal as="h2" className="section-title" delay={0.05}>
              Our Team
            </Reveal>
            <Reveal as="p" className="section-lead" delay={0.1} style={{ margin: '0 auto' }}>
              The founders and leaders whose collective experience shapes every
              Vinayana Infra landmark.
            </Reveal>
          </div>

          <div className="board__carousel">
            <button
              type="button"
              className="board__arrow board__arrow--prev"
              onClick={() => nudge(-1)}
              aria-label="Scroll team left"
            >
              <Chevron dir="left" />
            </button>

            <div
              className="board__marquee"
              ref={trackRef}
              onMouseEnter={() => { pausedRef.current = true }}
              onMouseLeave={() => { pausedRef.current = false }}
            >
              <div className="board__marquee-track">
                {/* two copies of the team make the loop seamless */}
                {[...TEAM, ...TEAM].map((d, i) => (
                  <PersonCard
                    key={i}
                    d={d}
                    plain
                    ariaHidden={i >= TEAM.length}
                    onView={() => setOpen(d)}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="board__arrow board__arrow--next"
              onClick={() => nudge(1)}
              aria-label="Scroll team right"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Our Mentors ---------- */}
      <section className="section board board--mentors" id="mentors">
        <div className="container">
          <div className="section-head center">
            <Reveal as="span" className="eyebrow">Guidance</Reveal>
            <Reveal as="h2" className="section-title" delay={0.05}>
              Our Mentors
            </Reveal>
            <Reveal as="p" className="section-lead" delay={0.1} style={{ margin: '0 auto' }}>
              Distinguished advisors whose decades of administrative, technical and
              financial wisdom guide our journey.
            </Reveal>
          </div>

          <div className="board__grid board__grid--mentors">
            {MENTORS.map((d, i) => (
              <PersonCard key={d.name} d={d} delay={i * 0.1} onView={() => setOpen(d)} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Profile modal ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="director-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="director-modal"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="director-modal__close" onClick={() => setOpen(null)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <div className="director-modal__head">
                <div className={`director-modal__photo ${open.photo ? 'has-img' : ''}`}>
                  <Avatar d={open} />
                </div>
                <div className="director-modal__id">
                  <h3>{open.name}</h3>
                  <span className="director-card__role">{open.role}</span>
                  <a href={open.linkedin} className="director-modal__linkedin" aria-label={`${open.name} on LinkedIn`}>
                    <SocialIcon /> Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="director-modal__body">
                {open.bio.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
