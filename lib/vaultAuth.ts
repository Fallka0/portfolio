import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Server-side gate for the vault documents.
 *
 * The old check compared the code in the browser against NEXT_PUBLIC_VAULT_PASS,
 * which ships inside the JS bundle — the code was readable by anyone who opened
 * devtools, and the PDFs would have been fetchable straight from /public with no
 * check at all. The code now lives in VAULT_PASS (server only, never sent to the
 * client) and the files sit outside /public, reachable only through a route that
 * demands the session cookie this module issues.
 */

export const VAULT_COOKIE = 'vault_session'

const TTL_MS = 12 * 60 * 60 * 1000

/** The signing key is derived from the code itself, so there is no second secret
 *  to configure — and rotating the code invalidates every issued session. */
function signingKey(): string | null {
  const pass = process.env.VAULT_PASS
  return pass ? pass : null
}

export function isConfigured(): boolean {
  return signingKey() !== null
}

function sign(value: string, key: string): string {
  return createHmac('sha256', key).update(value).digest('hex')
}

/** Length-independent comparison — timingSafeEqual throws on a length mismatch,
 *  which would itself leak the length of the expected value. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  // Hash both sides so the comparison is always over equal-length buffers.
  const ah = createHmac('sha256', 'cmp').update(ab).digest()
  const bh = createHmac('sha256', 'cmp').update(bb).digest()
  return timingSafeEqual(ah, bh)
}

export function checkCode(input: string): boolean {
  const key = signingKey()
  if (!key) return false
  return safeEqual(input, key)
}

export function issueToken(): string {
  const key = signingKey()!
  const exp = String(Date.now() + TTL_MS)
  return `${exp}.${sign(exp, key)}`
}

export function verifyToken(token: string | undefined): boolean {
  const key = signingKey()
  if (!key || !token) return false
  const dot = token.indexOf('.')
  if (dot < 1) return false
  const exp = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expMs = Number(exp)
  if (!Number.isFinite(expMs) || expMs < Date.now()) return false
  return safeEqual(sig, sign(exp, key))
}

export const SESSION_MAX_AGE = TTL_MS / 1000
