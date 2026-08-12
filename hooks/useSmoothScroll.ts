'use client'
import { useEffect } from 'react'

// Time constant of the glide, in ms. Lower = snappier, higher = floatier.
const TAU = 105
// How far one wheel notch travels, relative to the browser's own step.
const STRENGTH = 1.1

/**
 * Wheel-driven smooth scrolling for pointer devices.
 *
 * This moves the *window* toward a target position rather than transforming a
 * wrapper element, which matters here: the whole design is a stack of
 * `position: sticky` sections, and a transformed scroll container silently
 * breaks sticky. Reading window.scrollY also keeps useMotion's scroll-driven
 * effects (and the HowIWork horizontal track) accurate for free.
 *
 * Touch devices are deliberately left on native scrolling — momentum scrolling
 * is already smooth there, and intercepting it is exactly what makes phones
 * feel laggy.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const fine   = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let last = 0
    let target = 0
    let current = 0
    let running = false

    const limit = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const stop = () => {
      running = false
      if (raf) { cancelAnimationFrame(raf); raf = 0 }
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)   // clamp so tab-switch stalls don't jump
      last = now
      // Frame-rate independent exponential approach: the same glide on 60Hz and 120Hz.
      current += (target - current) * (1 - Math.exp(-dt / TAU))
      if (Math.abs(target - current) < 0.5) {
        current = target
        window.scrollTo({ top: current, behavior: 'instant' as ScrollBehavior })
        stop()
        return
      }
      window.scrollTo({ top: current, behavior: 'instant' as ScrollBehavior })
      raf = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      if (!fine.matches || reduce.matches) return
      if (e.ctrlKey || e.metaKey) return          // pinch-zoom / browser zoom
      if (e.defaultPrevented) return

      let d = e.deltaY
      if (e.deltaMode === 1) d *= 16                    // deltas in lines
      else if (e.deltaMode === 2) d *= window.innerHeight // deltas in pages

      // Starting a fresh gesture re-syncs to wherever the page actually is, so
      // keyboard, scrollbar and anchor-link scrolls are never fought over.
      if (!running) {
        current = window.scrollY
        target = current
        last = performance.now()
        running = true
      }
      const next = Math.min(limit(), Math.max(0, target + d * STRENGTH))
      if (next === target) return                 // already pinned at an edge
      e.preventDefault()
      target = next
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // Any other way of moving the page (nav links, keyboard, scrollbar drag,
    // resize) should win outright rather than be dragged back by an in-flight
    // glide — pointerdown covers the nav links and the "Say hi" button, which
    // scroll with scrollIntoView({ behavior: 'smooth' }).
    const stopIt = () => stop()

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', stopIt)
    window.addEventListener('pointerdown', stopIt, { passive: true })
    window.addEventListener('touchstart', stopIt, { passive: true })
    window.addEventListener('resize', stopIt)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', stopIt)
      window.removeEventListener('pointerdown', stopIt)
      window.removeEventListener('touchstart', stopIt)
      window.removeEventListener('resize', stopIt)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
