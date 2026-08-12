'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { CASE_STUDIES, type CsSection } from '@/lib/case-studies'
import { useReveal } from '@/hooks/useReveal'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function CaseStudyPage() {
  const { slug } = useParams() as { slug: string }
  const cs = CASE_STUDIES.find(c => c.slug === slug)

  useReveal()
  useSmoothScroll()

  if (!cs) notFound()

  const other = CASE_STUDIES.find(c => c.slug !== cs.slug)

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

      <article className="section section--dark" data-theme="dark" style={{ minHeight: '100svh' }}>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <header className="cs-hero wrap reveal">
          <span className="pill" style={{ marginBottom: 'clamp(20px,3vh,32px)', display: 'inline-flex' }}>
            Case study
          </span>
          <h1 className="cs-title">{cs.name}</h1>
          <p className="cs-tagline">{cs.tagline}</p>
          <div className="cs-meta">
            {[
              { k: 'Year',     v: cs.year },
              { k: 'Role',     v: cs.role },
              { k: 'Team',     v: cs.team },
              { k: 'Duration', v: cs.duration },
            ].map(m => (
              <div key={m.k} className="cs-meta-item">
                <span className="k">{m.k}</span>
                <span className="v">{m.v}</span>
              </div>
            ))}
            {cs.url && (
              <div className="cs-meta-item">
                <span className="k">Live</span>
                <a href={cs.url} target="_blank" rel="noopener" className="v ul">
                  {cs.url.replace('https://', '')} ↗
                </a>
              </div>
            )}
          </div>
        </header>

        {/* ── Hero screenshot ───────────────────────────────────────── */}
        <div className="cs-screenshot-hero">
          <div className="wrap">
            {/* capped at the screenshots' native 1600px so they never upscale */}
            <div className="device-frame__outer" style={{ maxWidth: 1600, margin: '0 auto' }}>
              <div className="device-frame__screen">
                <img src={cs.hero} alt={cs.name + ' — main screenshot'} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              </div>
              <div className="device-frame__base" />
              <div className="device-frame__foot" />
            </div>
          </div>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div className="cs-stats-row reveal">
          {cs.stats.map(s => (
            <div key={s.v} className="cs-stat">
              <div className="cs-stat__k tnum">{s.k}</div>
              <div className="cs-stat__v">{s.v}</div>
            </div>
          ))}
        </div>

        {/* ── Overview paragraph ────────────────────────────────────── */}
        <div className="cs-body" style={{ borderBottom: '1px solid var(--ink-far)', paddingBlock: 'clamp(48px,8vh,100px)' }}>
          <p className="cs-overview reveal">{cs.overview}</p>
          <ul className="cs-tags-row reveal">
            {cs.tags.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>

        {/* ── Content sections ──────────────────────────────────────── */}
        {cs.sections.map((sec: CsSection, i: number) => (
          <div key={i} className="cs-body" style={{ borderBottom: '1px solid var(--ink-far)', paddingBlock: 'clamp(52px,9vh,110px)' }}>
            <div className="cs-section reveal">
              <div className="cs-section__label">{sec.label}</div>
              <div className="cs-section__body">
                <h2 className="cs-section__h">{sec.heading}</h2>

                {sec.body.map((p, j) => (
                  <p key={j} className="cs-body-p">{p}</p>
                ))}

                {sec.items && (
                  <div className="cs-items">
                    {sec.items.map(item => (
                      <div key={item.t} className="cs-item">
                        <div className="cs-item__t">{item.t}</div>
                        <div className="cs-item__d">{item.d}</div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.shots && (
                  <div className="cs-shots">
                    {sec.shots.map(shot => (
                      <figure key={shot.src} className="cs-shot-fig">
                        <div className="device-frame__outer">
                          <div className="device-frame__screen">
                            <img src={shot.src} alt={shot.caption} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                          </div>
                          <div className="device-frame__base" />
                        </div>
                        <figcaption className="cs-shot-caption">{shot.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {sec.list && (
                  <ul className="cs-learned">
                    {sec.list.map((l, j) => <li key={j}>{l}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── Footer nav ────────────────────────────────────────────── */}
        <div className="wrap reveal" style={{ paddingBlock: 'clamp(48px,8vh,90px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap', borderTop: '1px solid var(--ink-far)' }}>
          <Link
            href="/#work"
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink-dim)', letterSpacing: '.01em', textDecoration: 'none', transition: 'color .3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-dim)')}
          >
            ← Back to work
          </Link>
          {other && (
            <Link
              href={`/work/${other.slug}`}
              style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink-dim)', letterSpacing: '.01em', textDecoration: 'none', transition: 'color .3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-dim)')}
            >
              {other.name} case study →
            </Link>
          )}
        </div>

      </article>
    </>
  )
}
