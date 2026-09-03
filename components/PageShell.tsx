'use client'
import { DATA } from '@/lib/data'
import Nav from './Nav'
import SiteFooter from './SiteFooter'
import { useReveal } from '@/hooks/useReveal'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

/**
 * Chrome for every route except the home page. Sub-pages used to hand-roll
 * their own nav markup, which is why they never picked up the theme toggle;
 * routing through the real Nav keeps them in step from here on.
 *
 * Deliberately no useMotion: that hook drives the home page's sticky
 * cover-stack and expects its exact section ids.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  useReveal()
  useSmoothScroll()

  return (
    <>
      <Nav mark={DATA.mark} />
      <main className="page">{children}</main>
      <SiteFooter />
    </>
  )
}
