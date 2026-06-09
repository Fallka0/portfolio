'use client'
import { useEffect } from 'react'
import AnimatedTitle from './AnimatedTitle'

interface Principle { t: string; d: string }
interface Props { howLead: string; howRest: string; principles: Principle[] }

export default function HowIWork({ howLead, howRest, principles }: Props) {
  const n = principles.length

  useEffect(() => {
    const how = document.getElementById('how')
    if (!how) return
    const wrap  = how.querySelector('.how__viewport') as HTMLElement
    const track = how.querySelector('.how__track') as HTMLElement
    const pin   = how.querySelector('.how__pin') as HTMLElement
    const fill  = how.querySelector('.how__bar-fill') as HTMLElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    const reset = () => {
      how.dataset.maxx = '0'
      how.style.height = ''
      if (pin)   { pin.style.transform = ''; }
      if (track) { track.style.transform = '' }
      if (fill)  { fill.style.width = '' }
      Array.from(track.children).forEach(c => {
        const inr = c.firstElementChild as HTMLElement
        if (inr) { inr.style.opacity = ''; inr.style.transform = '' }
      })
    }

    const measure = () => {
      if (reduce || window.innerWidth < 760) { reset(); return }
      const maxX = Math.max(0, track.scrollWidth - wrap.clientWidth)
      how.dataset.maxx      = String(maxX)
      how.dataset.scrolllen = String(maxX)
      how.style.height = (window.innerHeight + maxX) + 'px'
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track); ro.observe(wrap)
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 400)
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t) }
  }, [n])

  return (
    <section className="section section--dark how" data-theme="dark" id="how">
      <div className="how__pin">
        <div className="how__head">
          <div className="how__head-l">
            <h2 className="h-section how__title">
              <AnimatedTitle mode="fade" lead={howLead} rest={howRest} />
            </h2>
          </div>
          <span className="how__hint">Scroll <i className="how__hint-arrow">→</i></span>
        </div>
        <div className="how__viewport">
          <div className="how__track">
            {principles.map((p, i) => (
              <article key={i} className="how__card">
                <div className="how__card-in">
                  <span className="how__num mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="how__t">{p.t}</h3>
                  <p className="how__d">{p.d}</p>
                  <span className="how__idx mono">{i + 1} / {n}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="how__bar"><span className="how__bar-fill" /></div>
      </div>
    </section>
  )
}
