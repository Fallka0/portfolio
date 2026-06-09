'use client'
import { Fragment, useRef, useState, useEffect } from 'react'

const STEP: Record<string, number> = { rise: 55, fade: 60, blur: 75, wipe: 70 }

interface Props { lead: string; rest: string; className?: string; mode?: string }
interface Token { word: string; em: boolean }

function parse(text: string): Token[] {
  const tokens: Token[] = []
  const re = /\*([^*]+)\*|(\S+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m[1]) {
      m[1].split(/\s+/).filter(Boolean).forEach(w => tokens.push({ word: w, em: true }))
    } else if (m[2]) {
      tokens.push({ word: m[2], em: false })
    }
  }
  return tokens
}

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
  const tokens = parse(`${lead} ${rest}`.trim())

  return (
    <span ref={ref} className={`atitle${shown ? ' in' : ''}${className ? ' ' + className : ''}`} data-anim={mode}>
      {tokens.map((tok, i) => (
        <Fragment key={i}>
          <span className="aword">
            <span
              className={`aword__in${tok.em ? ' aword__in--em' : ''}`}
              style={{ '--wd': (i * step) + 'ms' } as React.CSSProperties}
            >
              {tok.word}
            </span>
          </span>
          {' '}
        </Fragment>
      ))}
    </span>
  )
}
