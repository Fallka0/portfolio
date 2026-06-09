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

export default function Page() {
  useReveal()
  useMotion()

  return (
    <>
      <Nav mark={DATA.mark} />
      <CTAFab />
      <div id="smooth">
        <Hero
          role={DATA.role}
          location={DATA.location}
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
        </main>
        <Contact
          name={DATA.name}
          email={DATA.email}
          github={DATA.github}
          githubUrl={DATA.githubUrl}
          location={DATA.location}
          contactLead={DATA.contactLead}
          contactRest={DATA.contactRest}
          contactNote={DATA.contactNote}
        />
      </div>
    </>
  )
}
