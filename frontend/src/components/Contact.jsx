import { useState } from 'react'
import Reveal from './Reveal'
import './Contact.css'

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' }

const INFO = [
  {
    label: 'Call Us',
    value: '+91 22 3521 6910',
    href: 'tel:+912235216910',
    icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z',
  },
  {
    label: 'Email Us',
    value: 'info@vinayanainfra.com',
    href: 'mailto:info@vinayanainfra.com',
    icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM2 7l10 6 10-6',
  },
  {
    label: 'Visit Us',
    value: 'Vinayana Infra Projects Pvt Ltd, 401, 4th Floor, Sai Samarth Business Park, Deonar, Chembur, Mumbai 400088',
    href: 'https://www.google.com/maps/search/?api=1&query=Sai+Samarth+Business+Park+Deonar+Chembur+Mumbai+400088',
    icon: 'M12 21s-7-6.3-7-11a7 7 0 0114 0c0 4.7-7 11-7 11zM12 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
  },
]

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus({ state: 'success', msg: data.message || 'Thank you! We will be in touch shortly.' })
      setForm(INITIAL)
    } catch (err) {
      setStatus({ state: 'error', msg: err.message || 'Unable to send. Please try again.' })
    }
  }

  return (
    <section className="section section-alt contact" id="contact">
      <div className="container">
        <div className="section-head center">
          <Reveal as="span" className="eyebrow">Get In Touch</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            Let's build something remarkable
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1} style={{ margin: '0 auto' }}>
            Have a project in mind or a question for our team? Reach out — we
            typically respond within one business day.
          </Reveal>
        </div>

        <div className="contact__grid">
          <Reveal className="contact__info">
            {INFO.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact__info-card"
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="contact__info-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d={item.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <em>{item.value}</em>
                </span>
              </a>
            ))}

            <div className="contact__map">
              {/* Google Map placeholder */}
              <iframe
                title="Vinayana Infra office location"
                src="https://www.google.com/maps?q=Sai%20Samarth%20Business%20Park%2C%20Deonar%2C%20Chembur%2C%20Mumbai%20400088&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal className="contact__form-wrap" delay={0.12}>
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@email.com" required />
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" value={form.subject} onChange={onChange} placeholder="Project enquiry" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={onChange} placeholder="Tell us about your project..." required />
              </div>

              <button className="btn btn-primary contact__submit" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? 'Sending…' : 'Send Message'}
                {status.state !== 'loading' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {status.state === 'success' && <p className="contact__note is-success">{status.msg}</p>}
              {status.state === 'error' && <p className="contact__note is-error">{status.msg}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
