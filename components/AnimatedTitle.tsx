'use client'
import { useRef, useState, useEffect } from 'react'

const STEP: Record<string, number> = { rise: 55, fade: 60, blur: 75, wipe: 70 }

interface Props { lead: string; rest: string; className?: string; mode?: string }

export default function AnimatedTitle({ lead, rest, className = '', mode = 'fade' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    setShown(false)
    const el = ref.current
    if (!el) return
    let t: ReturnType<typeof setTimeout>
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { t = setTimeout(() => setShown(true), 40); io.disconnect() } })
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [mode])

  const step = STEP[mode] || 60
  let idx = 0
  const words = (txt: string, dim: boolean) =>
    txt.trim().split(/\s+/).filter(Boolean).map((w, i) => {
      const d = (idx++ * step) + 'ms'
      return (
        <span key={(dim ? 'r' : 'l') + i} className={'aword' + (dim ? ' aword--dim' : '')}>
          <span className="aword__in" style={{ '--wd': d } as React.CSSProperties}>{w}</span>
        </span>
      )
    })

  return (
    <span ref={ref} className={`atitle${shown ? ' in' : ''}${className ? ' ' + className : ''}`} data-anim={mode}>
      {words(lead, false)}{' '}{words(rest, true)}
    </span>
  )
}
