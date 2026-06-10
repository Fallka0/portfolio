'use client'
import AnimatedTitle from './AnimatedTitle'

interface Props {
  name: string; email: string; github: string; githubUrl: string
  contactLead: string; contactRest: string; contactNote: string
}

export default function Contact({ name, email, github, githubUrl, contactLead, contactRest, contactNote }: Props) {

  return (
    <section className="section section--dark contact sec-cover" data-theme="dark" id="contact">
      <div className="wrap sec-inner">
        <a href={`mailto:${email}`} className="h-display contact__big" style={{ marginTop: '22px', display: 'block' }}>
          <AnimatedTitle mode="fade" lead={contactLead} rest={contactRest} />
        </a>
        <p className="contact__note reveal" style={{ '--d': '120ms' } as React.CSSProperties}>{contactNote}</p>
        <div className="contact__row">
          <div className="contact__links reveal">
            <a href={`mailto:${email}`} className="ul">{email}</a>
            <a href={githubUrl} target="_blank" rel="noopener" className="ul">github / {github}</a>
          </div>
        </div>
        <div className="foot-rule contact__foot reveal">
          <span>© {new Date().getFullYear()} {name}</span>
        </div>
      </div>
    </section>
  )
}
