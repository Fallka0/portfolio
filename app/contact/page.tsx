'use client'
import Link from 'next/link'
import { DATA } from '@/lib/data'
import PageShell from '@/components/PageShell'
import SectionHead from '@/components/SectionHead'
import AnimatedTitle from '@/components/AnimatedTitle'

export default function ContactPage() {
  return (
    <PageShell>
      <section className="wrap page__hero">
        <span className="pill" style={{ marginBottom: 'clamp(22px,3.5vh,40px)' }}>Contact</span>
        {/* the heading is the h1; the mailto sits inside it so the page still
            has one, which an anchor-only title did not */}
        <h1 className="h-display page__title">
          <a href={`mailto:${DATA.email}`}>
            <AnimatedTitle mode="fade" lead={DATA.contactLead} rest={DATA.contactRest} />
          </a>
        </h1>
        <p className="page__lede">
          Easiest by email, and I answer everything. If you are looking at me for a
          Praktikum, the school can vouch for the programme side — details on the IMS page.
        </p>
      </section>

      <section className="wrap page__sec">
        <SectionHead label="Direct" title="Reach me">
          <div className="contact__links" style={{ marginTop: 'clamp(20px,3vh,30px)' }}>
            <a href={`mailto:${DATA.email}`} className="ul">{DATA.email}</a>
            <a href={DATA.githubUrl} target="_blank" rel="noopener" className="ul">github / {DATA.github}</a>
          </div>
        </SectionHead>
      </section>

      <section className="wrap page__sec">
        <SectionHead label="Details" title="The practical bits">
          <div className="rows" style={{ marginTop: 'clamp(24px,4vh,40px)' }}>
            {[
              { k: 'Based in',   v: DATA.location },
              { k: 'Currently',  v: 'Student at bwd Informatikmittelschule Bern' },
              { k: 'Looking for', v: 'Full-time Praktikum (5 days/week) from 1 August 2027' },
              { k: 'Languages',  v: DATA.languages.map(l => `${l.name} (${l.level})`).join(' · ') },
            ].map(r => (
              <div key={r.k} className="row">
                <p className="row__num mono">{r.k}</p>
                <p className="row__desc" style={{ color: 'var(--ink)' }}>{r.v}</p>
              </div>
            ))}
          </div>
        </SectionHead>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="Hiring"
          title="Certificates and grades"
          lede="School reports and every üK Kompetenznachweis sit behind an access code I share on request."
        >
          <div className="row__links" style={{ marginTop: 'clamp(20px,3vh,28px)' }}>
            <Link href="/grades" className="row__cue">
              <span className="row__cue-arrow">→</span> Open the grades vault
            </Link>
          </div>
        </SectionHead>
      </section>
    </PageShell>
  )
}
