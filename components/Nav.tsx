'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

/**
 * Links are routes now that Work, Grades and Contact are their own pages.
 * `section` marks the ones that are still anchors on the home page, which is
 * the only place scroll position can decide what's active.
 */
const NAV_LINKS: { label: string; href: string; section?: string }[] = [
  { label: 'Work',    href: '/work'    },
  { label: 'About',   href: '/#about', section: 'about' },
  { label: 'IMS',     href: '/ims'     },
  { label: 'Grades',  href: '/grades'  },
  { label: 'Contact', href: '/contact' },
]

function getDocTop(el: HTMLElement): number {
  let top = 0, n: HTMLElement | null = el
  while (n) { top += n.offsetTop; n = n.offsetParent as HTMLElement | null }
  return top
}

export default function Nav({ mark }: { mark: string }) {
  const pathname = usePathname()
  const isHome   = pathname === '/'
  const [scrolled, setScrolled] = useState('')

  // Section tracking only means anything on the home page; every other route
  // takes its highlight from the URL, which cannot change under a scroll.
  useEffect(() => {
    if (!isHome) { setScrolled(''); return }
    const anchors = NAV_LINKS.filter(l => l.section)
    const update = () => {
      const threshold = window.scrollY + window.innerHeight * 0.38
      let cur = ''
      for (const { section } of anchors) {
        const el = document.getElementById(section!)
        if (el && getDocTop(el) <= threshold) cur = section!
      }
      setScrolled(cur)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [isHome])

  const isActive = (l: { href: string; section?: string }) => {
    if (l.section) return isHome && scrolled === l.section
    return pathname === l.href || pathname.startsWith(l.href + '/')
  }

  // On the home page an anchor link should glide rather than jump; everywhere
  // else it is a real navigation and Link handles it.
  const goSection = (id: string) => (e: React.MouseEvent) => {
    if (!isHome) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goTop = (e: React.MouseEvent) => {
    if (!isHome) return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <div className="nav__bar">
        <Link href="/" className="nav__mark" onClick={goTop}>{mark}</Link>
        <div className="nav__links">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l) ? 'is-active' : ''}
              onClick={l.section ? goSection(l.section) : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
