import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import './Projects.css'

// Fallback data — used if the backend API is unavailable.
const FALLBACK = [
  {
    title: 'Vinayana Skyline Residences',
    location: 'Sector 84, Gurugram',
    status: 'Ongoing',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Greenfield Township Phase II',
    location: 'Sarjapur, Bengaluru',
    status: 'Ongoing',
    category: 'Land Development',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Vinayana Trade Centre',
    location: 'Vesu, Surat',
    status: 'Ongoing',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK)

  useEffect(() => {
    let cancelled = false
    fetch('/api/projects')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setProjects(data)
      })
      .catch(() => {}) // keep fallback silently
    return () => { cancelled = true }
  }, [])

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-head">
          <Reveal as="span" className="eyebrow">Featured Projects</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            Landmarks that define skylines
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1}>
            A selection of our residential, commercial, and infrastructure
            developments across the country.
          </Reveal>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} className="project-card" delay={(i % 3) * 0.1}>
              <div className="project-card__media">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="project-card__cat">{p.category}</span>
              </div>
              <div className="project-card__body">
                <h3>{p.title}</h3>
                <p className="project-card__loc">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-6.3-7-11a7 7 0 0114 0c0 4.7-7 11-7 11z" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {p.location}
                </p>
              </div>
              <span className="project-card__view">
                View Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
