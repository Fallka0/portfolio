'use client'
import { DATA } from '@/lib/data'
import { useReveal } from '@/hooks/useReveal'
import { useMotion } from '@/hooks/useMotion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Nav from '@/components/Nav'
import CTAFab from '@/components/CTAFab'
import Hero from '@/components/Hero'
import TechStack from '@/components/TechStack'
import Showcase from '@/components/Showcase'
import About from '@/components/About'
import HowIWork from '@/components/HowIWork'
import Vault from '@/components/Vault'
import Contact from '@/components/Contact'

export default function Page() {
  useReveal()
  useMotion()
  useSmoothScroll()

  return (
    <>
      <Nav mark={DATA.mark} />
      <CTAFab />
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
        <Vault
          values={DATA.vaultValues}
          docs={DATA.vaultDocs}
        />
        <Contact
          name={DATA.name}
          email={DATA.email}
          github={DATA.github}
          githubUrl={DATA.githubUrl}
          contactLead={DATA.contactLead}
          contactRest={DATA.contactRest}
        />
      </div>
    </>
  )
}
