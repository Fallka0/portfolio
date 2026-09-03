import Link from 'next/link'
import { DATA } from '@/lib/data'

/** Shared across every route. The home page used to end on the Contact
 *  section, which is a page of its own now, so each route needs its own way
 *  out. */
export default function SiteFooter() {
  return (
    <footer className="sfoot">
      <div className="wrap sfoot__in">
        <div className="sfoot__brand">
          <Link href="/" className="sfoot__mark">{DATA.mark}</Link>
          <p className="sfoot__line">{DATA.name} · {DATA.location}</p>
        </div>

        <nav className="sfoot__cols" aria-label="Footer">
          <div className="sfoot__col">
            <p className="sfoot__label mono">Pages</p>
            <Link href="/work">Work</Link>
            <Link href="/#about">About</Link>
            <Link href="/ims">IMS Bern</Link>
          </div>
          <div className="sfoot__col">
            <p className="sfoot__label mono">Elsewhere</p>
            <a href={DATA.githubUrl} target="_blank" rel="noopener">GitHub</a>
            <Link href="/grades">Grades</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
      </div>
      <div className="wrap">
        <div className="foot-rule sfoot__rule">
          <span>© {new Date().getFullYear()} {DATA.name}</span>
          <a href={`mailto:${DATA.email}`} className="ul">{DATA.email}</a>
        </div>
      </div>
    </footer>
  )
}
