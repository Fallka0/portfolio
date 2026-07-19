'use client'
import Link from 'next/link'
import { EXTRA_PROJECTS } from '@/lib/data'
import AnimatedTitle from '@/components/AnimatedTitle'
import { useReveal } from '@/hooks/useReveal'

export default function ProjectsPage() {
  useReveal()

  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <div className="nav__bar">
          <Link href="/" className="nav__mark" style={{ textDecoration: 'none' }}>MP</Link>
          <div className="nav__links">
            <Link href="/">Home</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="section section--dark" data-theme="dark" style={{ minHeight: '100svh', paddingTop: 'clamp(100px,14vh,160px)', paddingBottom: 'clamp(80px,14vh,160px)' }}>
        <div className="wrap">

          {/* Header */}
          <span className="pill reveal" style={{ marginBottom: 'clamp(26px,4vh,46px)' }}>All projects</span>
          <h1 className="h-display reveal" style={{ fontSize: 'clamp(40px,7vw,100px)', maxWidth: '14ch', marginBottom: 'clamp(60px,12vh,140px)', lineHeight: '0.95' }}>
            <AnimatedTitle mode="fade" lead="More" rest=" work." />
          </h1>

          {/* Project list */}
          <div style={{ borderTop: '1px solid var(--ink-far)' }}>
            {EXTRA_PROJECTS.map((p, i) => (
              <article
                key={p.num}
                className="reveal proj"
                style={{ '--d': `${i * 55}ms` } as React.CSSProperties}
              >
                <span className="mono proj__num">{p.num}</span>

                <div>
                  {/* Name row */}
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: 'clamp(16px,2.5vh,28px)' }}>
                    <h2 style={{ fontSize: 'clamp(28px,4vw,64px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1, color: 'var(--ink)' }}>
                      {p.live ? (
                        <a href={p.live} target="_blank" rel="noopener" className="ul" style={{ color: 'inherit' }}>{p.name}</a>
                      ) : (
                        <a href={p.github} target="_blank" rel="noopener" className="ul" style={{ color: 'inherit' }}>{p.name}</a>
                      )}
                    </h2>
                    <div className="proj__meta">
                      <span className="proj__cat">{p.cat}</span>
                      <span className="proj__year">{p.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 'clamp(15px,1.35vw,18px)', color: 'var(--ink-dim)', lineHeight: 1.6, maxWidth: '56ch', marginBottom: 'clamp(20px,3vh,30px)' }}>
                    {p.desc}
                  </p>

                  {/* Tags + links */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 20px' }}>
                    <ul className="project__tags" style={{ margin: 0 }}>
                      {p.tags.map(t => <li key={t}>{t}</li>)}
                    </ul>
                    <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto' }}>
                      <a href={p.github} target="_blank" rel="noopener" className="ul" style={{ fontSize: '13px', color: 'var(--ink-dim)', letterSpacing: '.02em' }}>GitHub ↗</a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener" className="ul" style={{ fontSize: '13px', color: 'var(--ink-dim)', letterSpacing: '.02em' }}>Live ↗</a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Back */}
          <div style={{ marginTop: 'clamp(50px,9vh,90px)', paddingTop: '24px', borderTop: '1px solid var(--ink-far)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--ink-dim)', letterSpacing: '.02em', transition: 'color .3s', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-dim)')}
            >← Back to home</Link>
            <span style={{ fontSize: '12px', color: 'var(--ink-far)' }}>github.com/Fallka0</span>
          </div>
        </div>
      </div>
    </>
  )
}
