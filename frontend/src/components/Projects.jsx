import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import './Projects.css'

// Fallback data — used if the backend API is unavailable.
const FALLBACK = [
  {
    title: 'Aurum Business Park',
    location: 'Hinjewadi, Pune',
    status: 'Completed',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Metro Connect Flyover',
    location: 'Outer Ring Road, Hyderabad',
    status: 'Completed',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1473042904451-00171c69419d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The Coronet Villas',
    location: 'New Town, Kolkata',
    status: 'Completed',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
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
