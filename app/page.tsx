'use client'
import { DATA } from '@/lib/data'
import { useReveal } from '@/hooks/useReveal'
import { useMotion } from '@/hooks/useMotion'
import Nav from '@/components/Nav'
import CTAFab from '@/components/CTAFab'
import Hero from '@/components/Hero'
import TechStack from '@/components/TechStack'
import Showcase from '@/components/Showcase'
import About from '@/components/About'
import HowIWork from '@/components/HowIWork'
import Contact from '@/components/Contact'

const Fade = ({ from, to }: { from: string; to: string }) => (
  <div style={{
    height: 'clamp(80px, 10vw, 160px)',
    background: `linear-gradient(to bottom, ${from}, ${to})`,
    pointerEvents: 'none',
  }} />
)

export default function Page() {
  useReveal()
  useMotion()

  return (
    <>
      <Nav mark={DATA.mark} />
      <CTAFab />
      <div id="smooth">
        <Hero
          heroLead={DATA.heroLead}
          heroRest={DATA.heroRest}
          heroLede={DATA.heroLede}
          heroMeta={DATA.heroMeta}
        />
        <main>
          <TechStack
            techLead={DATA.techLead}
            techRest={DATA.techRest}
            techNote={DATA.techNote}
            techStack={DATA.techStack}
          />
          <Showcase
            workLead={DATA.workLead}
            workRest={DATA.workRest}
            showcase={DATA.showcase}
          />
          <Fade from="var(--black)" to="var(--paper)" />
          <About
            aboutLead={DATA.aboutLead}
            aboutRest={DATA.aboutRest}
            aboutBody={DATA.aboutBody}
            stats={DATA.stats}
            languages={DATA.languages}
          />
          <Fade from="var(--paper)" to="var(--black)" />
          <HowIWork
            howLead={DATA.howLead}
            howRest={DATA.howRest}
            principles={DATA.principles}
          />
        </main>
        <Contact
          name={DATA.name}
          email={DATA.email}
          github={DATA.github}
          githubUrl={DATA.githubUrl}
          contactLead={DATA.contactLead}
          contactRest={DATA.contactRest}
          contactNote={DATA.contactNote}
        />
      </div>
    </>
  )
}
