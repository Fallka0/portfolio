'use client'
import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .mask')
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
    els.forEach(el => io.observe(el))
    const fb = setTimeout(() => document.documentElement.classList.add('reveal-fallback'), 2800)
    return () => { io.disconnect(); clearTimeout(fb) }
  })
}
