'use client'
import { useEffect } from 'react'

const SECTION_IDS = ['top', 'tech', 'work', 'about', 'how', 'contact']

function getDocTop(el: HTMLElement): number {
  let top = 0; let node: HTMLElement | null = el
  while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null }
  return top
}

export function useMotion() {
  useEffect(() => {
    const nav = document.querySelector('.nav')     as HTMLElement | null
    const fab = document.querySelector('.cta-fab') as HTMLElement | null
    let stPrev: number | null = null
    let raf = 0

    // Return whether the topmost section at viewport-y is light-themed
    const lightAt = (y: number): boolean => {
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const s = document.getElementById(SECTION_IDS[i])
        if (!s) continue
        const r = s.getBoundingClientRect()
        if (r.top <= y && r.bottom >= y) return s.dataset.theme === 'light'
      }
      return false
    }

    const fx = () => {
      const vh = window.innerHeight
      if (nav) nav.classList.toggle('is-light', lightAt(48))
      if (fab) fab.classList.toggle('is-light', lightAt(vh - 48))

      // Horizontal "How I work" — CSS sticky pins the section; drive the track via scrollY
      const how = document.getElementById('how')
      if (how && parseFloat(how.dataset.maxx ?? '0') > 0) {
        const maxX      = parseFloat(how.dataset.maxx!)
        const scrollLen = parseFloat(how.dataset.scrolllen ?? '0') || maxX
        const track = how.querySelector('.how__track')    as HTMLElement
        const fill  = how.querySelector('.how__bar-fill') as HTMLElement
        const sectionDocTop = getDocTop(how)
        const prog = Math.min(Math.max((window.scrollY - sectionDocTop) / scrollLen, 0), 1)
        if (track) track.style.transform = `translate3d(${(-prog * maxX).toFixed(2)}px,0,0)`
        if (fill)  fill.style.width      = (prog * 100).toFixed(2) + '%'
        const cards = track ? track.children : []
        const vwid = window.innerWidth
        for (let i = 0; i < cards.length; i++) {
          const inr = cards[i].firstElementChild as HTMLElement
          if (!inr) continue
          const cr = cards[i].getBoundingClientRect()
          const cp = Math.min(Math.max((vwid * 0.92 - cr.left) / (vwid * 0.40), 0), 1)
          inr.style.opacity   = (0.1 + 0.9 * cp).toFixed(3)
          inr.style.transform = `translate3d(0,${((1 - cp) * 40).toFixed(1)}px,0)`
        }
      }

      // Scroll-driven typography
      const stEl = document.querySelector('[data-scrolltype]') as HTMLElement
      if (stEl) {
        const mode  = stEl.getAttribute('data-scrolltype')
        const words = stEl.querySelectorAll('.styword') as NodeListOf<HTMLElement>
        const box   = stEl.getBoundingClientRect()
        const onScreen = box.bottom > -120 && box.top < vh + 120
        if (mode === 'skew' && onScreen) {
          const now = box.top; const vel = stPrev == null ? 0 : stPrev - now; stPrev = now
          stEl.style.transform = `skewX(${Math.max(-9, Math.min(9, vel * 0.32)).toFixed(2)}deg)`
        } else if (onScreen) {
          stEl.style.transform = ''
          const start = vh * 0.86, end = vh * 0.40
          words.forEach(w => {
            const r = w.getBoundingClientRect(); const c = r.top + r.height / 2
            const p = Math.min(Math.max((start - c) / (start - end), 0), 1)
            if (mode === 'reveal') { w.style.opacity = (0.22 + 0.78 * p).toFixed(3); w.style.filter = ''; w.style.transform = '' }
            else if (mode === 'blur') { w.style.opacity = (0.2 + 0.8 * p).toFixed(3); w.style.filter = `blur(${((1 - p) * 7).toFixed(2)}px)`; w.style.transform = '' }
            else if (mode === 'rise') { w.style.opacity = p.toFixed(3); w.style.filter = ''; w.style.transform = `translateY(${((1 - p) * 22).toFixed(1)}px)` }
          })
        }
      }
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; fx() }) }
    fx()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
