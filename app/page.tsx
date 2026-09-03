'use client'
import Link from 'next/link'
import { DATA } from '@/lib/data'
import { useReveal } from '@/hooks/useReveal'
import { useMotion } from '@/hooks/useMotion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Nav from '@/components/Nav'
import CTAFab from '@/components/CTAFab'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'
import TechStack from '@/components/TechStack'
import About from '@/components/About'
import HowIWork from '@/components/HowIWork'

/** Where the sections that left the home page went. */
const ROUTES = [
  { href: '/work',    num: '01', name: 'Work',     line: 'Two projects I learned the most from, plus everything else I have built.' },
  { href: '/ims',     num: '02', name: 'IMS Bern', line: 'How the programme works, and what hosting a Praktikant actually involves.' },
  { href: '/grades',  num: '03', name: 'Grades',   line: 'School reports and üK certificates, behind an access code.' },
  { href: '/contact', num: '04', name: 'Contact',  line: 'Email, GitHub, and the practical details.' },
]

export default function Page() {
  useReveal()
  useMotion()
  useSmoothScroll()

  return (
    <>
      <Nav mark={DATA.mark} />
      <CTAFab />
      {/* #smooth is what scopes the sticky cover-stack — the same section
          components render as plain documents on their own routes. */}
      <div id="smooth">
        <Hero
          heroLead={DATA.heroLead}
          heroRest={DATA.heroRest}
          heroMeta={DATA.heroMeta}
        />
        <TechStack
          techLead={DATA.techLead}
          techRest={DATA.techRest}
          techStack={DATA.techStack}
        />
        <About
          aboutLead={DATA.aboutLead}
          aboutRest={DATA.aboutRest}
          aboutBody={DATA.aboutBody}
          stats={DATA.stats}
          languages={DATA.languages}
        />
        <HowIWork
          howLead={DATA.howLead}
          howRest={DATA.howRest}
          principles={DATA.principles}
        />

        {/* The way on from a landing page: the nav alone would leave the end of
            the scroll with nowhere to go. */}
        <section className="section section--dark sec" data-theme="dark" id="more">
          <div className="wrap sec-inner">
            <p className="shead__label mono" style={{ marginBottom: 'clamp(20px,3vh,32px)' }}>/ Elsewhere</p>
            <div className="rows" style={{ marginTop: 0 }}>
              {ROUTES.map(r => (
                <Link key={r.href} href={r.href} className="row">
                  <div>
                    <p className="row__num mono">{r.num}</p>
                    <h3 className="row__name">{r.name}</h3>
                  </div>
                  <div className="row__body">
                    <p className="row__desc">{r.line}</p>
                    <span className="row__cue">
                      <span className="row__cue-arrow">→</span> Open {r.name.toLowerCase()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
