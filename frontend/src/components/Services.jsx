import Reveal from './Reveal'
import './Services.css'

const SERVICES = [
  {
    title: 'Real Estate Development',
    text: 'Premium developments from land acquisition to handover, crafted for modern living and lasting value.',
    icon: 'M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01',
  },
  {
    title: 'Infrastructure Projects',
    text: 'Roads, utilities, and public works engineered for resilience, scale, and long-term community growth.',
    icon: 'M2 20h20M4 20V8l4-3 4 3v12M14 20v-7l3-2 3 2v7M8 11h0M8 15h0',
  },
  {
    title: 'Residential Projects',
    text: 'Thoughtfully designed homes and apartments that balance comfort, aesthetics, and functionality.',
    icon: 'M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10',
  },
  {
    title: 'Commercial Projects',
    text: 'Offices, retail, and mixed-use spaces built to elevate business and maximize footfall.',
    icon: 'M4 21V5a2 2 0 012-2h6a2 2 0 012 2v16M14 9h4a2 2 0 012 2v10M7 7h0M7 11h0M7 15h0M11 7h0M11 11h0M11 15h0',
  },
  {
    title: 'Land Development',
    text: 'Strategic parcelling, plotting, and site readiness that unlock the true potential of every plot.',
    icon: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6M9 3v15M15 6v15',
  },
  {
    title: 'Project Planning & Execution',
    text: 'Integrated planning, scheduling, and on-ground delivery — on time, on budget, every time.',
    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  },
]

export default function Services() {
  return (
    <section className="section section-alt services" id="services">
      <div className="container">
        <div className="section-head center">
          <Reveal as="span" className="eyebrow">What We Do</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            A full spectrum of building expertise
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1} style={{ margin: '0 auto' }}>
            From concept to completion, our services cover every stage of real
            estate and infrastructure delivery.
          </Reveal>
        </div>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} className="service-card" delay={(i % 3) * 0.1}>
              <div className="service-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d={s.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="service-card__link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="service-card__index">0{i + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
