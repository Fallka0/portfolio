'use client'
import { useState, useEffect } from 'react'
import AnimatedTitle from './AnimatedTitle'

interface Props {
  name: string; email: string; github: string; githubUrl: string; location: string
  contactLead: string; contactRest: string; contactNote: string
}

export default function Contact({ name, email, github, githubUrl, location, contactLead, contactRest, contactNote }: Props) {
  const [t, setT] = useState('')
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' }))
    tick(); const id = setInterval(tick, 10000); return () => clearInterval(id)
  }, [])

  return (
    <section className="section section--dark contact" data-theme="dark" id="contact">
      <div className="wrap">
        <span className="pill reveal">Contact</span>
        <a href={`mailto:${email}`} className="h-display contact__big" style={{ marginTop: '22px', display: 'block' }}>
          <AnimatedTitle mode="fade" lead={contactLead} rest={contactRest} />
        </a>
        <p className="contact__note reveal" style={{ '--d': '120ms' } as React.CSSProperties}>{contactNote}</p>
        <div className="contact__row">
          <div className="contact__links reveal">
            <a href={`mailto:${email}`} className="ul">{email}</a>
            <a href={githubUrl} target="_blank" rel="noopener" className="ul">github / {github}</a>
          </div>
          <div className="contact__meta reveal" style={{ '--d': '90ms' } as React.CSSProperties}>
            <div><span className="k">Location</span><span className="v">{location} · {t}</span></div>
          </div>
        </div>
        <div className="foot-rule reveal">
          <span>© {new Date().getFullYear()} {name}</span>
          <span>Built from scratch</span>
        </div>
      </div>
    </section>
  )
}
