'use client'
import Link from 'next/link'
import { DATA } from '@/lib/data'
import PageShell from '@/components/PageShell'
import SectionHead from '@/components/SectionHead'
import AnimatedTitle from '@/components/AnimatedTitle'

const STAGES = [
  {
    num: 'Years 1–3',
    when: '2024 – 2027',
    name: 'School, modules and Berufsmaturität',
    desc: 'Full-time at the IMS in Bern. All Berufsfachschule modules and the überbetriebliche Kurse (üK) are completed here, alongside the Berufsmaturität Wirtschaft. By the end of this school year every module and the BM are finished.',
  },
  {
    num: 'Year 4',
    when: 'from 1 August 2027',
    name: 'Full-time Praktikum',
    desc: 'Five days a week in a host company for the whole year. The school part is already done, so this year is about real project work and being part of a professional team rather than splitting time with classes.',
  },
  {
    num: 'Finish',
    when: 'during year 4',
    name: 'IPA — Individuelle Praktische Arbeit',
    desc: 'The final practical assignment, carried out and assessed inside the host company. Passing it completes the Informatiker EFZ Applikationsentwicklung qualification. Many IPA candidates sign their first employment contract with the company that hosted them.',
  },
]

export default function ImsPage() {
  return (
    <PageShell>
      <section className="wrap page__hero">
        <span className="pill" style={{ marginBottom: 'clamp(22px,3.5vh,40px)' }}>Ausbildungsüberblick</span>
        <h1 className="h-display page__title">
          <AnimatedTitle mode="fade" lead="How the" rest=" *IMS* programme works." />
        </h1>
        <p className="page__lede">
          If you have not hired from an Informatikmittelschule before, this is the short
          version of what the qualification is, how the four years are split, and what
          taking on a Praktikant actually involves.
        </p>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="The programme"
          title="A school-based route to the same EFZ"
          lede="The Informatikmittelschule Bern is part of bwd Bern and trains, on behalf of the Kanton Bern, for the Informatiker/in EFZ qualification in the Applikationsentwicklung specialisation — including the Berufsmaturität Wirtschaft."
        >
          <p className="row__desc" style={{ marginTop: 'clamp(14px,2vh,20px)' }}>
            It runs as a <strong style={{ color: 'var(--ink)' }}>schulisch organisierte Grundbildung (SOG)</strong>:
            the school-organised variant of an apprenticeship. The classroom and module
            work happens first and in full, and the company year comes at the end. The
            certificate at the end is the ordinary federal EFZ — the same one a
            company-based apprentice earns, reached in a different order.
          </p>
        </SectionHead>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="Structure"
          title="Three years of school, then a year in a company"
        />
        <div className="rows">
          {STAGES.map(s => (
            <article key={s.num} className="row">
              <div>
                <p className="row__num mono">{s.when}</p>
                <h3 className="row__name">{s.num}</h3>
              </div>
              <div className="row__body">
                <p className="row__desc" style={{ color: 'var(--ink)', fontWeight: 600 }}>{s.name}</p>
                <p className="row__desc">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="For a host company"
          title="What you would be taking on"
          lede="A Praktikant in this programme arrives with the theory finished, not alongside it."
        >
          <div className="rows" style={{ marginTop: 'clamp(24px,4vh,40px)' }}>
            {[
              { k: 'No school days', v: 'Five days a week in the company for the full year — no day release, no block courses to plan around.' },
              { k: 'Modules done', v: 'Every Berufsfachschule and üK module is completed before the Praktikum starts, including the Berufsmaturität.' },
              { k: 'One clear deliverable', v: 'The IPA is scoped and assessed within the company, so the year has a concrete result rather than an open-ended placement.' },
              { k: 'A hiring look', v: 'A year is long enough to know whether someone fits the team before either side commits to anything permanent.' },
            ].map(r => (
              <div key={r.k} className="row">
                <p className="row__num mono">{r.k}</p>
                <p className="row__desc">{r.v}</p>
              </div>
            ))}
          </div>
        </SectionHead>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="Where I am"
          title="Third year, looking for the placement"
          lede={`I am ${DATA.name}, in the third year at the IMS in class IM24A. All modules and the Berufsmaturität finish this school year, and I am looking for the full-time Praktikum starting 1 August 2027.`}
        >
          <div className="row__links" style={{ marginTop: 'clamp(20px,3vh,28px)' }}>
            <Link href="/work" className="row__cue">
              <span className="row__cue-arrow">→</span> See what I have built
            </Link>
            <Link href="/grades" className="row__cue">
              <span className="row__cue-arrow">→</span> Grades and certificates
            </Link>
            <Link href="/contact" className="row__cue">
              <span className="row__cue-arrow">→</span> Get in touch
            </Link>
          </div>
        </SectionHead>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="Verify"
          title="Ask the school directly"
          lede="You do not have to take any of this from me. The IMS school leadership will talk through the conditions, the contract and what the company commits to."
        >
          <div className="rows" style={{ marginTop: 'clamp(24px,4vh,40px)' }}>
            <div className="row">
              <p className="row__num mono">School</p>
              <div className="row__body">
                <p className="row__desc" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                  Michael Peter — Schulleiter IMS
                </p>
                <p className="row__desc">bwd Bern, Informatikmittelschule · Papiermühlestrasse 65, 3014 Bern</p>
                <div className="row__links">
                  <a href="mailto:michael.peter@bwdbern.ch" className="ul">michael.peter@bwdbern.ch</a>
                  <a href="tel:+41313301990" className="ul">031 330 19 90</a>
                  <a href="https://www.bwdbern.ch" target="_blank" rel="noopener" className="ul">bwdbern.ch ↗</a>
                </div>
              </div>
            </div>
          </div>
        </SectionHead>
      </section>
    </PageShell>
  )
}
