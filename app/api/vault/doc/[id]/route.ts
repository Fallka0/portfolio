import { readFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { hasValidSession } from '@/lib/vaultAuth'
import { VAULT_FILES } from '@/lib/vaultDocs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DOCS_DIR = path.join(process.cwd(), 'private', 'docs')

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const entry = VAULT_FILES[id]
  // Unknown id and missing session both answer 404, so an unauthenticated
  // caller cannot use the status code to enumerate which documents exist.
  if (!entry) return new NextResponse('Not found', { status: 404 })

  if (!hasValidSession(req)) return new NextResponse('Not found', { status: 404 })

  let data: Buffer
  try {
    data = await readFile(path.join(DOCS_DIR, entry.file))
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }

  return new NextResponse(new Uint8Array(data), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${entry.download}"`,
      'Content-Length': String(data.byteLength),
      // Gated content must not linger in shared caches.
      'Cache-Control': 'private, no-store',
    },
  })
}
