'use client'

const TEXT = 'MYKYTA PANTELEI · DEVELOPER · BERN · 2026 · '

export default function MarqueeBand({ reverse = false }: { reverse?: boolean }) {
  const content = TEXT.repeat(14)
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className={`marquee-track${reverse ? ' marquee-track--rev' : ''}`}>
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  )
}
