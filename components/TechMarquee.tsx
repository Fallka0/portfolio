'use client'
import { useRef, useState, useEffect } from 'react'
import FadeIn from './FadeIn'
import { row1Items, row2Items } from '@/lib/data'

export default function TechMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handle = () => {
      if (!sectionRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const renderRow = (items: string[], right: boolean) => {
    const tx = right ? offset - 200 : -(offset - 200)
    return (
      <div
        className="flex gap-3 py-1.5"
        style={{ transform: `translateX(${tx}px)`, willChange: 'transform' }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 glass-subtle rounded-full px-5 py-2.5 text-[13px] font-medium text-[#3C3C43]/75 whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="pt-16 pb-8 overflow-hidden">
      <FadeIn y={16} delay={0}>
        <p className="text-[11px] text-[#007AFF]/65 font-medium tracking-widest uppercase text-center mb-7">
          Technologies I work with
        </p>
      </FadeIn>
      <div className="space-y-3">
        {renderRow(row1Items, true)}
        {renderRow(row2Items, false)}
      </div>
    </section>
  )
}
