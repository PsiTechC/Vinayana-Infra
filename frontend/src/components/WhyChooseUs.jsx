import Reveal from './Reveal'
import './WhyChooseUs.css'

const REASONS = [
  {
    title: 'Quality Construction',
    text: 'Certified materials and rigorous quality control at every stage of the build.',
    icon: 'M12 2l3 6 6 1-4.5 4.5 1 6L12 17l-5.5 2.5 1-6L3 9l6-1 3-6z',
  },
  {
    title: 'Transparent Process',
    text: 'Clear pricing, honest timelines, and regular updates — no hidden surprises.',
    icon: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 9a3 3 0 100 6 3 3 0 000-6z',
  },
  {
    title: 'Modern Design',
    text: 'Contemporary architecture that blends aesthetics with everyday functionality.',
    icon: 'M3 21v-4l11-11 4 4L7 21H3zM14 6l4 4M3 3h6M3 3v6',
  },
  {
    title: 'Timely Delivery',
    text: 'Disciplined project management that puts your handover date front and centre.',
    icon: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Trusted Team',
    text: 'Seasoned architects, engineers, and craftsmen committed to your vision.',
    icon: 'M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 20v-2a4 4 0 00-3-3.87M16 3.5a3.5 3.5 0 010 6.8',
  },
  {
    title: 'Sustainable Planning',
    text: 'Eco-conscious materials and energy-smart design for a greener tomorrow.',
    icon: 'M12 22c5-3 8-7 8-12a8 8 0 00-8-8 8 8 0 00-8 8c0 5 3 9 8 12zM12 22V11M12 11c-2 0-3.5-1.5-3.5-3.5M12 11c2 0 3.5-1.2 3.5-3',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section why" id="why">
      <div className="why__bg" aria-hidden="true" />
      <div className="container">
        <div className="section-head center">
          <Reveal as="span" className="eyebrow" style={{ color: 'var(--gold-soft)' }}>
            Why Choose Us
          </Reveal>
          <Reveal as="h2" className="section-title why__title" delay={0.05}>
            Built on trust. Driven by excellence.
          </Reveal>
          <Reveal as="p" className="section-lead why__lead" delay={0.1} style={{ margin: '0 auto' }}>
            Six promises that make Vinayana Infra the partner of choice for
            developers, investors, and families alike.
          </Reveal>
        </div>

        <div className="why__grid">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} className="why-card" delay={(i % 3) * 0.08}>
              <div className="why-card__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d={r.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
