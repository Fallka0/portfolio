'use client'
import { useEffect } from 'react'

const SECTION_IDS = ['top', 'tech', 'work', 'about', 'how', 'contact']

function getDocTop(el: HTMLElement): number {
  let top = 0; let node: HTMLElement | null = el
  while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null }
  return top
}

function c01(v: number): number { return v < 0 ? 0 : v > 1 ? 1 : v }
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t }
function easeOut(t: number): number { return Math.pow(t, 0.38) }

// Returns a clamped+eased [0,1] progress as a section's top enters from below
function entryP(bcrTop: number, vh: number, compress: number): number {
  return easeOut(c01(1 - bcrTop / (vh * compress)))
}

// Returns a clamped+eased [0,1] progress for the section being covered by the next
function recedeP(nextBcrTop: number, vh: number, compress: number): number {
  return easeOut(c01(1 - nextBcrTop / (vh * compress)))
}

// Helper: get the .sec-inner child (single animation target per section)
function inner(section: HTMLElement): HTMLElement | null {
  return section.querySelector(':scope > .sec-inner') as HTMLElement | null
}

export function useMotion() {
  useEffect(() => {
    const nav = document.querySelector('.nav')     as HTMLElement | null
    const fab = document.querySelector('.cta-fab') as HTMLElement | null
    let stPrev: number | null = null
    let raf = 0

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

      const secTop     = document.getElementById('top')
      const secTech    = document.getElementById('tech')
      const secWork    = document.getElementById('work')
      const secAbout   = document.getElementById('about')
      const secHow     = document.getElementById('how')
      const secContact = document.getElementById('contact')

      // ── Hero: scale + blur as TechStack slides in from the right ────
      if (secTop && secTech) {
        const p = recedeP(secTech.getBoundingClientRect().top, vh, 0.70)
        const el = inner(secTop)
        if (el) {
          el.style.transform = `scale(${lerp(1, 0.82, p).toFixed(4)})`
          el.style.filter    = `blur(${(p * 10).toFixed(2)}px)`
        }
      }

      // ── TechStack: SLIDE IN FROM THE RIGHT (horizontal) ─────────────
      if (secTech) {
        const el = inner(secTech)
        if (el) {
          const p = entryP(secTech.getBoundingClientRect().top, vh, 0.62)
          if (p >= 1) { el.style.transform = ''; el.style.filter = '' }
          else        { el.style.transform = `translateX(${lerp(110, 0, p).toFixed(2)}vw)` }
        }
      }

      // ── Showcase: RISE FROM BELOW (vertical + slight scale) ─────────
      if (secWork) {
        const el = inner(secWork)
        if (el) {
          const p = entryP(secWork.getBoundingClientRect().top, vh, 0.65)
          if (p >= 1) { el.style.transform = ''; el.style.filter = '' }
          else        { el.style.transform = `translateY(${lerp(70, 0, p).toFixed(1)}vh) scale(${lerp(0.92, 1, p).toFixed(4)})` }
        }
      }

      // ── About: SLIDE IN FROM THE LEFT; recede with blur ──────────────
      if (secAbout) {
        const el = inner(secAbout)
        if (el) {
          const rp = secHow ? recedeP(secHow.getBoundingClientRect().top, vh, 0.70) : 0
          if (rp > 0) {
            el.style.transform = `scale(${lerp(1, 0.82, rp).toFixed(4)})`
            el.style.filter    = `blur(${(rp * 10).toFixed(2)}px)`
          } else {
            const p = entryP(secAbout.getBoundingClientRect().top, vh, 0.62)
            if (p >= 1) { el.style.transform = ''; el.style.filter = '' }
            else        { el.style.transform = `translateX(${lerp(-110, 0, p).toFixed(2)}vw)`; el.style.filter = '' }
          }
        }
      }

      // ── Contact: CRASH ZOOM from center (scale 2.2 → 1) ────────────
      if (secContact) {
        const el = inner(secContact)
        if (el) {
          const p = entryP(secContact.getBoundingClientRect().top, vh, 0.55)
          if (p >= 1) { el.style.transform = ''; el.style.filter = '' }
          else        { el.style.transform = `scale(${lerp(2.2, 1, p).toFixed(4)})`; el.style.filter = '' }
        }
      }

      // ── HowIWork: horizontal scroll driven by vertical scroll ───────
      if (secHow && parseFloat(secHow.dataset.maxx ?? '0') > 0) {
        const maxX      = parseFloat(secHow.dataset.maxx!)
        const scrollLen = parseFloat(secHow.dataset.scrolllen ?? '0') || maxX
        const track = secHow.querySelector('.how__track')    as HTMLElement
        const fill  = secHow.querySelector('.how__bar-fill') as HTMLElement
        const sectionDocTop = parseFloat(secHow.dataset.doctop ?? '0') || getDocTop(secHow)
        const prog = c01((window.scrollY - sectionDocTop) / scrollLen)
        if (track) track.style.transform = `translate3d(${(-prog * maxX).toFixed(2)}px,0,0)`
        if (fill)  fill.style.width      = (prog * 100).toFixed(2) + '%'
        const cards = track ? track.children : []
        const vwid = window.innerWidth
        for (let i = 0; i < cards.length; i++) {
          const inr = cards[i].firstElementChild as HTMLElement
          if (!inr) continue
          const cr = cards[i].getBoundingClientRect()
          const cp = c01((vwid * 0.92 - cr.left) / (vwid * 0.40))
          inr.style.opacity   = (0.1 + 0.9 * cp).toFixed(3)
          inr.style.transform = `translate3d(0,${((1 - cp) * 40).toFixed(1)}px,0)`
        }
      }

      // ── Scroll-driven typography ────────────────────────────────────
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
            const p = c01((start - c) / (start - end))
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
