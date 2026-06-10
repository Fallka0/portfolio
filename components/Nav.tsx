'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Sections that map to nav links, in page order.
// Active = last one whose document-top has scrolled past 38% of the viewport.
const NAV_LINKS = [
  { label: 'Work',    id: 'work'    },
  { label: 'About',   id: 'about'   },
  { label: 'Contact', id: 'contact' },
]

function getDocTop(el: HTMLElement): number {
  let top = 0, n: HTMLElement | null = el
  while (n) { top += n.offsetTop; n = n.offsetParent as HTMLElement | null }
  return top
}

export default function Nav({ mark }: { mark: string }) {
  const pathname  = usePathname()
  const isHome    = pathname === '/'
  const [active, setActive] = useState('')

  // Track which nav section occupies the viewport
  useEffect(() => {
    if (!isHome) { setActive(''); return }
    const update = () => {
      const threshold = window.scrollY + window.innerHeight * 0.38
      let cur = ''
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id)
        if (el && getDocTop(el) <= threshold) cur = id
      }
      setActive(cur)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [isHome])

  // Smooth-scroll on home, hard-navigate on sub-pages
  const goSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.href = '/'
    }
  }

  return (
    <nav className="nav">
      <div className="nav__bar">
        <a href={isHome ? '#top' : '/'} className="nav__mark" onClick={goTop}>{mark}</a>
        <div className="nav__links">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              className={active === id ? 'is-active' : ''}
              onClick={goSection(id)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
