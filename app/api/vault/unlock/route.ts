import { NextResponse } from 'next/server'
import { VAULT_COOKIE, SESSION_MAX_AGE, checkCode, isConfigured, issueToken } from '@/lib/vaultAuth'

export const runtime = 'nodejs'
// The response depends on a cookie and a secret, so it must never be cached.
export const dynamic = 'force-dynamic'

/** Brute-force friction. Serverless means this map is per-instance rather than
 *  global, so treat it as a speed bump on top of a long code, not a real limit. */
const attempts = new Map<string, { n: number; until: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 10

function clientKey(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd ? fwd.split(',')[0].trim() : 'unknown'
}

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, reason: 'unconfigured' },
      { status: 503 },
    )
  }

  const key = clientKey(req)
  const now = Date.now()
  const rec = attempts.get(key)
  if (rec && rec.until > now && rec.n >= MAX_ATTEMPTS) {
    return NextResponse.json({ ok: false, reason: 'throttled' }, { status: 429 })
  }

  let code = ''
  try {
    const body = await req.json()
    code = typeof body?.code === 'string' ? body.code : ''
  } catch {
    code = ''
  }

  if (!checkCode(code)) {
    const next = rec && rec.until > now ? { n: rec.n + 1, until: rec.until } : { n: 1, until: now + WINDOW_MS }
    attempts.set(key, next)
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 401 })
  }

  attempts.delete(key)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(VAULT_COOKIE, issueToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
