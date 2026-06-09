import AnimatedTitle from './AnimatedTitle'
import ScrollStatement from './ScrollStatement'

interface Props {
  aboutLead: string; aboutRest: string; aboutBody: string[]
  stats: { k: string; v: string }[]
  languages: { name: string; level: string }[]
}

export default function About({ aboutLead, aboutRest, aboutBody, stats, languages }: Props) {
  const statement = (aboutLead + aboutRest).replace(/\s+/g, ' ').trim()
  return (
    <section className="section section--light sec" data-theme="light" id="about">
      <div className="wrap">
        <h2 className="h-section about__statement">
          <ScrollStatement text={statement} mode="rise" />
        </h2>
        <div className="about__grid">
          <div className="about__body reveal">
            {aboutBody.map((t, i) => <p key={i}>{t}</p>)}
            <div className="about__stats">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="tnum k">{s.k}</div>
                  <div className="v">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about__services reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
            <div className="svc svc--head">
              <span className="svc__nm">Languages</span>
              <span className="svc__no">Level</span>
            </div>
            {languages.map((l, i) => (
              <div key={i} className="svc">
                <span className="svc__nm">{l.name}</span>
                <span className="svc__no">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
