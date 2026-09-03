'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

/**
 * The access-code form. On success it refreshes the route rather than flipping
 * local state: /grades decides what to render from the session cookie on the
 * server, so the server is what has to look again.
 */
export default function VaultLock() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [busy,  setBusy]  = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const attempt = async () => {
    if (busy) return
    const code = (inputRef.current?.value ?? '').trim()
    setBusy(true)
    try {
      // The code is checked on the server: this response is the only thing that
      // can unlock the page, and the document routes re-check the cookie it
      // sets, so nothing here is bypassable from devtools.
      const res = await fetch('/api/vault/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (res.ok) { setError(''); router.refresh(); return }
      setError(
        res.status === 429 ? 'Too many attempts. Try again later.' :
        res.status === 503 ? 'The vault is not configured yet.' :
                             'Wrong code. Try again.',
      )
    } catch {
      setError('Could not reach the server. Try again.')
    } finally {
      setBusy(false)
    }
    setShake(true)
    setTimeout(() => setShake(false), 500)
    if (inputRef.current) { inputRef.current.value = ''; inputRef.current.focus() }
  }

  return (
    <div className={`vault__locked${shake ? ' vault--shake' : ''}`}>
      <div className="vault__lock">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="20" width="24" height="16" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M14 20v-6a6 6 0 0 1 12 0v6" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="28" r="2" fill="currentColor"/>
        </svg>
      </div>
      <h2 className="vault__head">Hiring managers &amp; recruiters</h2>
      <div className={`vault__form${error ? ' vault--err' : ''}`}>
        <input
          ref={inputRef}
          type="password"
          className="vault__input"
          placeholder="Access code"
          autoComplete="off"
          disabled={busy}
          onKeyDown={e => e.key === 'Enter' && attempt()}
        />
        <button className="vault__btn" onClick={attempt} disabled={busy}>
          {busy ? 'Checking…' : 'Unlock →'}
        </button>
      </div>
      {error && <p className="vault__errmsg">{error}</p>}
    </div>
  )
}
