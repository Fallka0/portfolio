'use client'
import { useEffect } from 'react'

// The home page's own sections, in order. Work, Grades and Contact are their
// own routes now and never appear here; the per-section effects below still
// guard on the element existing, so this list is the single source of truth.
const SECTION_IDS = ['top', 'tech', 'about', 'how', 'more']

function getDocTop(el: HTMLElement): number {
  let top = 0; let node: HTMLElement | null = el
  while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null }
  return top
}

function c01(v: number): number { return v < 0 ? 0 : v > 1 ? 1 : v }
function lerp(a: number, b: number, t: number): number { return a + (b - a) * t }
function easeOut(t: number): number { return Math.pow(t, 0.38) }

// LINEAR clamped [0,1] progress as a section's top enters from below.
// Linear keeps the traveling clip-path edge visible across the whole entry.
function entryP(bcrTop: number, vh: number, compress: number): number {
  return c01(1 - bcrTop / (vh * compress))
}

// Eased [0,1] progress for the section being covered by the next (recede/depth).
function recedeP(nextBcrTop: number, vh: number, compress: number): number {
  return easeOut(c01(1 - nextBcrTop / (vh * compress)))
}

// Helper: get the .sec-inner child (single animation target per section)
function inner(section: HTMLElement): HTMLElement | null {
  return section.querySelector(':scope > .sec-inner') as HTMLElement | null
}

// Flags the HowIWork card nearest the middle of the viewport as `.is-active`,
// so the lit panel follows the scroll instead of the pointer. The axis is read
// off the cards themselves rather than a breakpoint: they sit side by side
// while the track scrubs horizontally and stack on phones, and reduced-motion
// keeps the horizontal layout without the scrub. Cards fully off screen never
// win, so nothing stays lit once the section scrolls away.
function markActive(track: HTMLElement, vh: number): void {
  const cards = track.children
  if (!cards.length) return
  const horizontal = cards.length < 2 ||
    Math.abs(cards[1].getBoundingClientRect().top - cards[0].getBoundingClientRect().top) < 1
  const vw = window.innerWidth
  const size = horizontal ? vw : vh
  let best = -1
  let bestDist = Infinity
  for (let i = 0; i < cards.length; i++) {
    const r = cards[i].getBoundingClientRect()
    // Both axes: the pinned section sits far down the document while the page
    // is at the top, where every card is still on-screen *horizontally*.
    if (r.right <= 0 || r.left >= vw || r.bottom <= 0 || r.top >= vh) continue
    const mid = horizontal ? (r.left + r.right) / 2 : (r.top + r.bottom) / 2
    const dist = Math.abs(mid - size / 2)
    if (dist < bestDist) { bestDist = dist; best = i }
  }
  for (let i = 0; i < cards.length; i++) {
    const inr = cards[i].firstElementChild as HTMLElement | null
    if (inr) inr.classList.toggle('is-active', i === best)
  }
}

export function useMotion() {
  useEffect(() => {
    const nav = document.querySelector('.nav')     as HTMLElement | null
    const fab = document.querySelector('.cta-fab') as HTMLElement | null
    let stPrev: number | null = null
    let raf = 0

    // A sticky cover-stack section pins at top:0, so any content taller than the
    // viewport has its overflow stranded below the fold (unreachable — scrolling
    // just advances the cover animation). For those sections we drop the pin and
    // let them scroll normally, so the whole section can be read. Sections that
    // fit keep the sticky cover effect. Re-evaluated whenever size/content change.
    const measureFit = () => {
      const vh = window.innerHeight
      for (const id of SECTION_IDS) {
        const s = document.getElementById(id)
        if (!s) continue
        const el = inner(s)
        // No .sec-inner means HowIWork, which drives its own height in JS —
        // measuring it here would un-pin the section it deliberately pins.
        if (!el) continue
        // Count the section's own top padding. Pinned at top:0, content clears
        // the fold only if paddingTop + content does, and leaving the padding
        // out is what let the TechStack overflow unnoticed — `.sec` contributes
        // ~120px there, so a section measuring 728px was really 850px tall in a
        // 810px viewport. Bottom padding stays out: it is a decorative tail, and
        // the far larger [data-scroll="1"] padding would otherwise feed back
        // into the next measurement.
        const padTop = parseFloat(getComputedStyle(s).paddingTop) || 0
        const content = padTop + el.scrollHeight
        // 5px of slack rather than none: Hero, Vault and Contact size their
        // inner to exactly 100svh, so they land on `total === vh` and would
        // flip on sub-pixel rounding. They fill the viewport with nothing to
        // spare, so scrolling is the safe side to round to.
        const tall = content > vh - 5
        const want = tall ? '1' : '0'
        if (s.dataset.scroll !== want) {
          s.dataset.scroll = want
          // inline position beats the per-id `position: sticky` CSS rule
          s.style.position = tall ? 'relative' : ''
          // overflow:hidden clips absolute children (tooltips) and is only needed
          // for the pin/clip-path reveal; clear it once the section scrolls freely.
          s.style.overflow = tall ? 'visible' : ''
          if (tall) { el.style.clipPath = ''; el.style.transform = ''; el.style.filter = '' }
        }
      }
    }

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
      // Phones get the "lite" treatment: no per-frame clip-path/scale/blur.
      // Those effects re-rasterize whole sections every frame, which stutters
      // badly on mobile GPUs (blur especially), and mid-animation transforms
      // are what iOS touch-panning could sneak into sideways. The sticky
      // cover-stack alone carries the design on small screens.
      const lite = window.innerWidth < 760
      if (nav) nav.classList.toggle('is-light', lightAt(48))
      if (fab) {
        fab.classList.toggle('is-light', lightAt(vh - 48))
        // hide once the contact section is mostly on screen — the FAB's target
        const c = document.getElementById('contact')
        if (c) fab.classList.toggle('is-hidden', c.getBoundingClientRect().top < vh * 0.55)
      }

      const secTop   = document.getElementById('top')
      const secTech  = document.getElementById('tech')
      const secAbout = document.getElementById('about')
      const secHow   = document.getElementById('how')
      const secMore  = document.getElementById('more')

      // ── Hero: depth-recede (scale down + blur) as TechStack masks in ─
      if (secTop && secTech && secTop.dataset.scroll !== '1') {
        const p = recedeP(secTech.getBoundingClientRect().top, vh, 0.85)
        const el = inner(secTop)
        if (el) {
          el.style.transform = `scale(${lerp(1, 0.86, p).toFixed(4)}) translateY(${lerp(0, -6, p).toFixed(1)}vh)`
          el.style.filter    = lite ? '' : `blur(${(p * 9).toFixed(2)}px)`
        }
      }

      // ── TechStack: IRIS / circle aperture grows from a point ────────
      if (secTech) {
        const el = inner(secTech)
        if (el) {
          const p = entryP(secTech.getBoundingClientRect().top, vh, 0.92)
          if (lite || p >= 1) { el.style.clipPath = ''; el.style.transform = ''; el.style.filter = '' }
          else {
            el.style.clipPath  = `circle(${(p * p * 75).toFixed(2)}vmax at 50% 44%)`
            el.style.transform = `scale(${lerp(1.12, 1, easeOut(p)).toFixed(4)})`
            el.style.filter    = ''
          }
        }
      }

      // ── About: DIAGONAL SWEEP reveal; depth-recede as HowIWork masks in
      if (secAbout) {
        const el = inner(secAbout)
        if (el) {
          // when About scrolls (tall), never recede it — keep content readable
          const rp = (secAbout.dataset.scroll !== '1' && secHow)
            ? recedeP(secHow.getBoundingClientRect().top, vh, 0.85) : 0
          if (rp > 0) {
            el.style.clipPath  = ''
            el.style.transform = `scale(${lerp(1, 0.86, rp).toFixed(4)}) translateY(${lerp(0, -6, rp).toFixed(1)}vh)`
            el.style.filter    = lite ? '' : `blur(${(rp * 9).toFixed(2)}px)`
          } else {
            const p = entryP(secAbout.getBoundingClientRect().top, vh, 0.92)
            if (lite || p >= 1) { el.style.clipPath = ''; el.style.transform = ''; el.style.filter = '' }
            else {
              // slanted edge travels across from top-left to bottom-right
              const q = lerp(-60, 170, p)
              el.style.clipPath  = `polygon(0% 0%, ${q.toFixed(2)}% 0%, ${(q - 60).toFixed(2)}% 100%, 0% 100%)`
              el.style.transform = `scale(${lerp(1.05, 1, easeOut(p)).toFixed(4)})`
              el.style.filter    = ''
            }
          }
        }
      }

      // ── Elsewhere: RISING BLIND — wipes up from the bottom edge ──────
      //    Inherited from the old Contact section, which now closes the home
      //    page as the links-out block instead.
      if (secMore) {
        const el = inner(secMore)
        if (el) {
          const p = entryP(secMore.getBoundingClientRect().top, vh, 0.92)
          if (lite || p >= 1) { el.style.clipPath = ''; el.style.transform = ''; el.style.filter = '' }
          else {
            el.style.clipPath  = `inset(${lerp(100, 0, p).toFixed(2)}% 0% 0% 0%)`
            el.style.transform = `translateY(${lerp(10, 0, easeOut(p)).toFixed(2)}vh)`
            el.style.filter    = ''
          }
        }
      }

      // ── HowIWork: horizontal scroll driven by vertical scroll ───────
      if (secHow) {
        const maxX  = parseFloat(secHow.dataset.maxx ?? '0')
        const track = secHow.querySelector('.how__track') as HTMLElement | null
        if (track && maxX > 0) {
          const scrollLen = parseFloat(secHow.dataset.scrolllen ?? '0') || maxX
          const fill  = secHow.querySelector('.how__bar-fill') as HTMLElement
          const sectionDocTop = parseFloat(secHow.dataset.doctop ?? '0') || getDocTop(secHow)
          const prog = c01((window.scrollY - sectionDocTop) / scrollLen)
          track.style.transform = `translate3d(${(-prog * maxX).toFixed(2)}px,0,0)`
          if (fill) fill.style.width = (prog * 100).toFixed(2) + '%'
          const cards = track.children
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
        // Runs in every layout mode, including the stacked phone list and the
        // reduced-motion fallback, which never enter the scrub branch above.
        if (track) markActive(track, vh)
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
    const onResize = () => { measureFit(); onScroll() }
    measureFit()
    fx()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // catches content-driven height changes (font load, Vault unlock, width reflow)
    const ro = new ResizeObserver(() => { measureFit(); onScroll() })
    SECTION_IDS.forEach(id => { const s = document.getElementById(id); if (s) ro.observe(s) })
    if (document.fonts?.ready) document.fonts.ready.then(() => { measureFit(); onScroll() })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [])
}
