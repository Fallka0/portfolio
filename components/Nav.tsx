'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

/**
 * Every link is a route. About stays a section of the home page and is reached
 * by the mark on the left — mixing one anchor in among four routes was what
 * made the bar read oddly, and it lit the About dot for the whole rest of the
 * page once you had scrolled past that section.
 */
const NAV_LINKS = [
  { label: 'Work',    href: '/work'    },
  { label: 'IMS',     href: '/ims'     },
  { label: 'Grades',  href: '/grades'  },
  { label: 'Contact', href: '/contact' },
]

export default function Nav({ mark }: { mark: string }) {
  const pathname = usePathname()
  const isHome   = pathname === '/'

  const goTop = (e: React.MouseEvent) => {
    if (!isHome) return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <div className="nav__bar">
        <Link href="/" className="nav__mark" onClick={goTop} aria-label="Home">{mark}</Link>
        <div className="nav__links">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href || pathname.startsWith(l.href + '/') ? 'is-active' : ''}
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
