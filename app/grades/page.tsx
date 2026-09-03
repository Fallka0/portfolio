import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { DATA } from '@/lib/data'
import { VAULT_COOKIE, verifyToken } from '@/lib/vaultAuth'
import PageShell from '@/components/PageShell'
import SectionHead from '@/components/SectionHead'
import VaultLock from '@/components/VaultLock'
import VaultDocs from '@/components/VaultDocs'

// Reads a cookie, so it can never be prerendered.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Grades — Mykyta Pantelei',
  // The documents are gated, and the page should not turn up in a search index.
  robots: { index: false, follow: false },
}

export default async function GradesPage() {
  // Gating on the server means an unlocked visitor is never sent the document
  // list at all — as a client component it had to ship the markup and hide it,
  // and a returning visitor with a live session had to re-enter the code.
  const jar = await cookies()
  const unlocked = verifyToken(jar.get(VAULT_COOKIE)?.value)

  return (
    <PageShell>
      <section className="wrap page__hero">
        <h1 className="h-display page__title">School reports &amp; certificates</h1>
        <p className="page__lede">
          Every semester report and üK Kompetenznachweis from the apprenticeship,
          {unlocked ? ' with the full grade breakdown and the original PDFs.'
                    : ' behind an access code I share on request.'}
        </p>
      </section>

      <section className="wrap page__sec">
        {unlocked ? (
          <VaultDocs values={DATA.vaultValues} docs={DATA.vaultDocs} />
        ) : (
          <div className="grades__gate">
            <VaultLock />
          </div>
        )}
      </section>

      {!unlocked && (
        <section className="wrap page__sec">
          <SectionHead
            label="No code?"
            title="Ask and I'll send one"
            lede="The documents carry personal details, so they are not public. Email me and you get the code the same day."
          >
            <div className="row__links" style={{ marginTop: 'clamp(20px,3vh,28px)' }}>
              <a href={`mailto:${DATA.email}`} className="row__cue">
                <span className="row__cue-arrow">→</span> {DATA.email}
              </a>
            </div>
          </SectionHead>
        </section>
      )}
    </PageShell>
  )
}
