'use client'
export default function CTAFab() {
  const go = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <a href="#contact" className="cta-fab" onClick={go}>
      <span className="cta-fab__dot" />Say hi
    </a>
  )
}
