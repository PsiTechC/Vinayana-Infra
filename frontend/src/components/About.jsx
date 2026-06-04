import Reveal from './Reveal'
import './About.css'

const PILLARS = [
  { title: 'Real Estate Development', text: 'End-to-end development of premium residential and commercial spaces.' },
  { title: 'Infrastructure Planning', text: 'Smart, future-ready infrastructure engineered for growing communities.' },
  { title: 'Construction Quality', text: 'Uncompromising standards, certified materials, and rigorous QA.' },
  { title: 'Long-Term Value', text: 'Assets designed to appreciate — built for generations, not just today.' },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__media">
          <Reveal className="about__media-main">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
              alt="Modern architecture by Vinayana Infra"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="about__media-sub" delay={0.15}>
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80"
              alt="Construction and infrastructure work"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="about__badge" delay={0.3}>
            <span className="about__badge-num">18+</span>
            <span className="about__badge-label">Years Building Trust</span>
          </Reveal>
        </div>

        <div className="about__body">
          <Reveal as="span" className="eyebrow">About Vinayana Infra</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            Engineering spaces that stand the test of time
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1}>
            Vinayana Infra Projects is a real estate and infrastructure company
            built on a simple belief — that great spaces shape better lives. We
            focus on real estate development, infrastructure planning, and
            construction quality to create assets that deliver long-term value.
          </Reveal>
          <Reveal as="p" className="about__text" delay={0.15}>
            From the first blueprint to the final handover, our integrated teams
            manage design, engineering, and execution under one roof. The result
            is dependable timelines, transparent processes, and landmarks that
            communities are proud to call their own.
          </Reveal>

          <div className="about__pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} className="about__pillar" delay={0.1 + i * 0.08}>
                <span className="about__pillar-dot" />
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
