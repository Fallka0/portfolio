'use client'
import Link from 'next/link'
import { DATA, EXTRA_PROJECTS } from '@/lib/data'
import PageShell from '@/components/PageShell'
import SectionHead from '@/components/SectionHead'
import Showcase from '@/components/Showcase'
import AnimatedTitle from '@/components/AnimatedTitle'

export default function WorkPage() {
  return (
    <PageShell>
      <section className="wrap page__hero">
        <h1 className="h-display page__title">
          <AnimatedTitle mode="fade" lead="Things I" rest=" *built.*" />
        </h1>
        <p className="page__lede">
          Two projects I learned the most from, then everything else — side builds,
          school work and experiments, oldest lessons included.
        </p>
      </section>

      {/* The showcase keeps its carousel: the screenshots are the point of it. */}
      <Showcase
        workLead={DATA.workLead}
        workRest={DATA.workRest}
        showcase={DATA.showcase}
      />

      <section className="wrap page__sec">
        <SectionHead
          label="More projects"
          title="Everything else"
          lede="Smaller builds and school projects. Each one taught me something I now use without thinking about it."
        />
        <div className="rows">
          {EXTRA_PROJECTS.map(p => (
            <article key={p.num} className="row">
              <div>
                <p className="row__num mono">{p.num} · {p.year}</p>
                <h3 className="row__name">{p.name}</h3>
                <p className="row__num mono" style={{ marginTop: 8 }}>{p.cat}</p>
              </div>
              <div className="row__body">
                <p className="row__desc">{p.desc}</p>
                <div className="row__tags">
                  {p.tags.map(t => <span key={t} className="row__tag">{t}</span>)}
                </div>
                <div className="row__links">
                  {p.github && <a href={p.github} target="_blank" rel="noopener" className="ul">GitHub ↗</a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener" className="ul">Live ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap page__sec">
        <SectionHead
          label="Next"
          title="Looking for a Praktikum from August 2027"
          lede="I finish every module and the Berufsmaturität this school year, then need a full-time placement for my final year."
        >
          <div className="row__links" style={{ marginTop: 'clamp(20px,3vh,28px)' }}>
            <Link href="/ims" className="row__cue">
              <span className="row__cue-arrow">→</span> How the IMS programme works
            </Link>
            <Link href="/contact" className="row__cue">
              <span className="row__cue-arrow">→</span> Get in touch
            </Link>
          </div>
        </SectionHead>
      </section>
    </PageShell>
  )
}
