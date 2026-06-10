import './Footer.css'

const QUICK = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#board' },
  { label: 'Our Mentors', href: '#mentors' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  'Real Estate Development',
  'Infrastructure Projects',
  'Residential Projects',
  'Commercial Projects',
  'Land Development',
]

const SOCIALS = [
  { label: 'LinkedIn', path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.46 4.46-2.46C21.4 7.74 24 10.1 24 14.6V24h-5v-8.4c0-2-.04-4.57-2.79-4.57-2.79 0-3.21 2.18-3.21 4.43V24h-5V8z' },
  { label: 'Instagram', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 01-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.8 5.8 0 002.12-1.38c.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.8 5.8 0 00-1.38-2.12A5.8 5.8 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.4-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z' },
  { label: 'Facebook', path: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <img src="/assets/logo-mark.png" alt="Vinayana Infra Projects" />
          </a>
          <div className="footer__brand-body">
            <p>
              Building landmarks and creating futures through modern real estate
              and infrastructure solutions — driven by quality, trust, and
              innovation.
            </p>
            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__col">
          <h3>Quick Links</h3>
          <ul>
            {QUICK.map((q) => (
              <li key={q.href}><a href={q.href}>{q.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>Our Services</h3>
          <ul>
            {SERVICES.map((s) => (
              <li key={s}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul className="footer__contact">
            <li>Vinayana Infra Projects Pvt Ltd,<br />401, 4th Floor, Sai Samarth Business Park,<br />Deonar, Chembur, Mumbai 400088</li>
            <li><a href="tel:+912235216910">+91 22 3521 6910</a></li>
            <li><a href="mailto:info@vinayanainfra.com">info@vinayanainfra.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {new Date().getFullYear()} Vinayana Infra Projects. All rights reserved.</p>
          <p className="footer__bar-links">
            <a href="#">Privacy Policy</a>
            <span>·</span>
            <a href="#">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
