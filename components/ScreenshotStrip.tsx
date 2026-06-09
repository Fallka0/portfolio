'use client'

const IMGS = [
  '/media/safari-dashboard.png',
  '/media/safari-milla-home.png',
  '/media/safari-tournamount.png',
  '/media/safari-milla-listings.png',
  '/media/safari-wishlist.png',
  '/media/safari-milla-admin.png',
  '/media/safari-auth.png',
]

export default function ScreenshotStrip({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...IMGS, ...IMGS]
  return (
    <div className="sc-strip" aria-hidden="true">
      <div className={`sc-strip__track${reverse ? ' sc-strip__track--rev' : ''}`}>
        {doubled.map((src, i) => (
          <div key={i} className="sc-strip__item">
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}
