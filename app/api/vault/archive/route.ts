import { readFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { hasValidSession } from '@/lib/vaultAuth'
import { VAULT_FILES } from '@/lib/vaultDocs'
import { buildZip, type ZipEntry } from '@/lib/zip'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DOCS_DIR = path.join(process.cwd(), 'private', 'docs')
const ARCHIVE_NAME = 'Pantelei_Mykyta_Dokumente.zip'

export async function GET(req: Request) {
  // Same answer as the single-document route: no session, nothing to see.
  if (!hasValidSession(req)) return new NextResponse('Not found', { status: 404 })

  const entries: ZipEntry[] = []
  for (const { file, download } of Object.values(VAULT_FILES)) {
    try {
      entries.push({ name: download, data: await readFile(path.join(DOCS_DIR, file)) })
    } catch {
      // One unreadable file shouldn't cost the caller the other seven, but a
      // silently short archive is worse than none — fail the whole request.
      return new NextResponse('Archive unavailable', { status: 500 })
    }
  }
  if (entries.length === 0) return new NextResponse('Not found', { status: 404 })

  const zip = buildZip(entries)
  return new NextResponse(new Uint8Array(zip), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${ARCHIVE_NAME}"`,
      'Content-Length': String(zip.byteLength),
      'Cache-Control': 'private, no-store',
    },
  })
}
