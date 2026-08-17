'use client'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [mounted, setMounted] = useState(false)

  // The server can't know the stored choice, so the icon is held back until
  // after hydration rather than rendering the wrong one and swapping it.
  useEffect(() => setMounted(true), [])

  const light = mounted && theme === 'light'

  return (
    <button
      type="button"
      className="nav__theme"
      onClick={toggle}
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      title={light ? 'Dark theme' : 'Light theme'}
    >
      <span className="nav__theme-icon" aria-hidden="true" data-ready={mounted ? '' : undefined}>
        {light ? (
          /* moon — the action, i.e. what clicking switches to */
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
            <path d="M17 12.3A7.4 7.4 0 0 1 7.7 3a7.5 7.5 0 1 0 9.3 9.3Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5"/>
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M10 1.6v2M10 16.4v2M1.6 10h2M16.4 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4"/>
            </g>
          </svg>
        )}
      </span>
    </button>
  )
}
