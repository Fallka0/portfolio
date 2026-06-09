'use client'
export default function Nav({ mark }: { mark: string }) {
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav className="nav">
      <div className="nav__bar">
        <a href="#top" className="nav__mark" onClick={go('top')}>{mark}</a>
        <div className="nav__links">
          <a href="#work"    onClick={go('work')}>Work</a>
          <a href="#about"   onClick={go('about')}>About</a>
          <a href="#contact" onClick={go('contact')}>Contact</a>
        </div>
      </div>
    </nav>
  )
}
