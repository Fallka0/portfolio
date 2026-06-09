import AnimatedTitle from './AnimatedTitle'

interface Meta { k: string; v: string }
interface Props {
  role: string; location: string
  heroLead: string; heroRest: string; heroLede: string; heroMeta: Meta[]
}

export default function Hero({ role, location, heroLead, heroRest, heroLede, heroMeta }: Props) {
  return (
    <header className="section section--dark" data-theme="dark" id="top">
      <div className="hero wrap">
        <span className="pill hero__label reveal">{role} — {location}</span>
        <h1 className="h-display hero__title">
          <AnimatedTitle mode="fade" lead={heroLead} rest={heroRest} />
        </h1>
        <div className="hero__foot reveal" style={{ '--d': '220ms' } as React.CSSProperties}>
          <p className="hero__lede">{heroLede}</p>
          <div className="hero__meta">
            {heroMeta.map((m, i) => (
              <div key={i}><span className="k">{m.k}</span><span className="v">{m.v}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="scrollcue"><span>Scroll</span><i /></div>
    </header>
  )
}
