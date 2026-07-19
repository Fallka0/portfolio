'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import AnimatedTitle from './AnimatedTitle'

// map project key → case study slug (only projects that have one)
const CS_SLUGS: Record<string, string> = {
  planary: 'planary',
  milla:   'milla-homes',
}

interface Slide { p: string; screen: string; url: string; safari: string; phone: string | null }
interface Project { name: string; site: string; line: string; tags: string[] }
interface Props {
  workLead: string; workRest: string
  showcase: {
    duration: number
    projects: Record<string, Project>
    slides: Slide[]
  }
}

export default function Showcase({ workLead, workRest, showcase }: Props) {
  const { slides, projects, duration } = showcase
  const n = slides.length
  const [index, setIndex]   = useState(0)
  const [cycle, setCycle]   = useState(0)
  const [inView, setInView] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const advance = () => { setIndex(i => (i + 1) % n); setCycle(c => c + 1) }
  const prev    = () => { setIndex(i => (i - 1 + n) % n); setCycle(c => c + 1) }
  const next    = () => { setIndex(i => (i + 1) % n);     setCycle(c => c + 1) }
  const jump = (i: number) => { if (i === index) return; setIndex(i); setCycle(c => c + 1) }

  const cur  = slides[index]
  const proj = projects[cur.p]

  return (
    <section className="section section--dark sec sec-cover" data-theme="dark" id="work">
      <div className="wrap sec-inner">
        <div className="work__head">
          <h2 className="h-section sec__title">
            <AnimatedTitle mode="fade" lead={workLead} rest={workRest} />
          </h2>
        </div>

        <div className="sc">
          {/* Info panel */}
          <div className="sc__info reveal">
            <div className="sc__fade" key={cur.p + index}>
              <span className="sc__count mono">
                {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
              <h3 className="h-section sc__name">
                <a href={'https://' + proj.site} target="_blank" rel="noopener" className="sc__name-link ul">
                  {proj.name}
                </a>
              </h3>
              <p className="sc__line">{proj.line}</p>
              <div className="sc__screen">
                <span className="sc__screen-nm">{cur.screen}</span>
                <a className="sc__url ul" href={'https://' + cur.url} target="_blank" rel="noopener">
                  {cur.url} ↗
                </a>
              </div>
              <ul className="project__tags">
                {proj.tags.map((t, i) => <li key={i}>{t}</li>)}
              </ul>

              {CS_SLUGS[cur.p] && (
                <Link href={`/work/${CS_SLUGS[cur.p]}`} className="sc__cs-link">
                  Case study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 7h9M7.5 3l4 4-4 4" />
                  </svg>
                </Link>
              )}
            </div>

            <div className="sc__arrows">
              <button onClick={prev} className="sc__arrow" aria-label="Previous project">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 3L5 8l5 5" />
                </svg>
              </button>
              <button onClick={next} className="sc__arrow" aria-label="Next project">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Device — laptop frame on desktop; phone frame on mobile when the
              slide has a portrait screenshot, laptop otherwise */}
          <div className={'sc__stage' + (cur.phone ? ' sc__stage--phone' : '')} ref={stageRef}>
            <div className="device-frame__outer">
              <div className="device-frame__screen">
                {slides.map((s, i) => (
                  <div
                    key={i}
                    className="device-frame__slide"
                    style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                  >
                    <img src={s.safari} alt={projects[s.p].name + ' — ' + s.screen} loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="device-frame__base" />
              <div className="device-frame__foot" />
            </div>

            <div className="phone-frame">
              <div className="phone-frame__screen">
                {slides.map((s, i) => s.phone && (
                  <div
                    key={i}
                    className="device-frame__slide"
                    style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                  >
                    <img src={s.phone} alt={projects[s.p].name + ' — ' + s.screen + ' (mobile)'} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bars" role="tablist" aria-label="Projects">
              {slides.map((s, i) => (
                <button
                  key={i}
                  className={'bar' + (i < index ? ' is-done' : '') + (i === index ? ' is-active' : '')}
                  style={{ '--dur': duration + 'ms', animationPlayState: inView ? 'running' : 'paused' } as React.CSSProperties}
                  onClick={() => jump(i)}
                  aria-label={projects[s.p].name + ' — ' + s.screen}
                  aria-selected={i === index}
                >
                  <span
                    className="bar__fill"
                    key={i === index ? 'a' + cycle : 's' + i}
                    style={{ animationPlayState: inView ? 'running' : 'paused' }}
                    onAnimationEnd={i === index ? advance : undefined}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* More projects link */}
        <div className="reveal" style={{ marginTop: 'clamp(48px,8vh,90px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', paddingTop: '28px', borderTop: '1px solid var(--ink-far)' }}>
          <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--ink)', letterSpacing: '.01em', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity .3s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            More projects <span style={{ display: 'inline-block', transition: 'transform .3s' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
