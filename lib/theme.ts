'use client'
import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

export const THEME_KEY = 'theme'
const EVENT = 'themechange'

/** Inlined in <head> so the attribute is set before first paint — without it
 *  the page renders dark, then snaps to light once React hydrates. Kept as a
 *  string here so the layout and this module can't drift apart. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`

function subscribe(cb: () => void): () => void {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)   // follow the choice across tabs
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

/** The DOM attribute is the single source of truth: the inline script sets it
 *  before React exists, so reading it back beats mirroring it into state. */
function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function getServerSnapshot(): Theme {
  return 'dark'
}

export function setTheme(next: Theme): void {
  document.documentElement.setAttribute('data-theme', next)
  try { localStorage.setItem(THEME_KEY, next) } catch { /* private mode */ }
  window.dispatchEvent(new Event(EVENT))
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { theme, toggle: () => setTheme(theme === 'light' ? 'dark' : 'light') }
}
