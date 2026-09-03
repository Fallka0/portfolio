'use client'
import Link from 'next/link'

/** Contact is a route now, so this navigates instead of scrolling to a section
 *  that no longer exists on the home page. */
export default function CTAFab() {
  return (
    <Link href="/contact" className="cta-fab">
      <span className="cta-fab__dot" />Say hi
    </Link>
  )
}
