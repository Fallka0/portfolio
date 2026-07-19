'use client'
import { useEffect, useRef, useState } from 'react'
import AnimatedTitle from './AnimatedTitle'
import { TECH_CONFIG } from '@/lib/data'

function TechItem({ name }: { name: string }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPointer = useRef('mouse')

  // Mouse: open on hover with a grace period before closing.
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setOpen(true)
  }
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    leaveTimer.current = setTimeout(() => setOpen(false), 320)
  }
  // Touch/pen: tap toggles the popover instead.
  const onPointerDown = (e: React.PointerEvent) => { lastPointer.current = e.pointerType }
  const onClick = () => { if (lastPointer.current !== 'mouse') setOpen(o => !o) }

  // Close an open popover when tapping anywhere outside it.
  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const cfg = TECH_CONFIG[name] || {}
  const iconUrl = cfg.icon ? `https://cdn.simpleicons.org/${cfg.icon}/ffffff` : null
  const projs = cfg.projects || []

  return (
    <span ref={rootRef} className="tech__flip-wrap" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onPointerDown={onPointerDown} onClick={onClick}>
      <span className="tech__flip">
        <span className="tech__flip-front tech__item">{name}</span>
        <span className="tech__flip-back">
          {iconUrl
            ? <img src={iconUrl} alt={name} width={30} height={30} loading="lazy"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            : <span className="tech__flip-fallback">{name}</span>}
        </span>
      </span>
      {projs.length > 0 && (
        <div className={'tech__item-projs' + (open ? ' is-open' : '')}>
          <span className="tech__projs-label mono">Used in</span>
          {projs.map(p => (
            <a key={p.url} className="tech__proj-link" href={p.url} target="_blank" rel="noopener noreferrer">
              {p.name}<span> ↗</span>
            </a>
          ))}
        </div>
      )}
    </span>
  )
}

interface Props {
  techLead: string; techRest: string; techNote: string
  techStack: { cat: string; items: string[] }[]
}

export default function TechStack({ techLead, techRest, techNote, techStack }: Props) {
  return (
    <section className="section section--dark sec sec-cover" data-theme="dark" id="tech">
      <div className="sec-inner">
      <div className="wrap tech__head">
        <h2 className="h-section tech__headline">
          <AnimatedTitle mode="fade" lead={techLead} rest={techRest} />
        </h2>
        <p className="tech__note reveal">{techNote}</p>
      </div>
      <div className="tech__rows">
        {techStack.map((group, i) => (
          <div key={group.cat} className="tech__row reveal" style={{ '--d': (i * 55) + 'ms' } as React.CSSProperties}>
            <span className="tech__row-cat mono">{group.cat}</span>
            <div className="tech__row-body">
              <div className="tech__row-items">
                {group.items.map(item => <TechItem key={item} name={item} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
