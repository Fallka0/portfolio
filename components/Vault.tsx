'use client'
import { useState, useRef } from 'react'

interface Cert  { name: string; file: string }
interface Value { t: string; d: string }

interface Props {
  values: Value[]
  certs:  Cert[]
}

export default function Vault({ values, certs }: Props) {
  const [unlocked, setUnlocked] = useState(false)
  const [error,    setError]    = useState(false)
  const [shake,    setShake]    = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const attempt = () => {
    const val  = (inputRef.current?.value ?? '').trim()
    const pass = process.env.NEXT_PUBLIC_VAULT_PASS ?? ''
    if (pass && val === pass) {
      setUnlocked(true); setError(false)
    } else {
      setError(true); setShake(true)
      setTimeout(() => setShake(false), 500)
      if (inputRef.current) { inputRef.current.value = ''; inputRef.current.focus() }
    }
  }

  return (
    <section className="section section--dark vault sec-cover" data-theme="dark" id="vault">
      <div className="wrap sec-inner vault__inner">

        {!unlocked ? (
          /* ── LOCKED ──────────────────────────────────────────────── */
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
                onKeyDown={e => e.key === 'Enter' && attempt()}
              />
              <button className="vault__btn" onClick={attempt}>Unlock →</button>
            </div>
            {error && <p className="vault__errmsg">Wrong code. Try again.</p>}
          </div>

        ) : (
          /* ── UNLOCKED ────────────────────────────────────────────── */
          <div className="vault__open">
            <div className="vault__col">
              <p className="vault__label mono">What matters to me</p>
              <ul className="vault__list">
                {values.map((v, i) => (
                  <li key={i} className="vault__item">
                    <strong className="vault__it">{v.t}</strong>
                    <span className="vault__id">{v.d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="vault__col">
              <p className="vault__label mono">Documents</p>
              <div className="vault__docs">
                {certs.length === 0
                  ? <p className="vault__empty">Certificates will appear here once uploaded.</p>
                  : certs.map((c, i) => (
                      <a key={i} className="vault__dl" href={c.file} download>
                        <span className="vault__dl-arrow">↓</span>
                        <span className="vault__dl-name">{c.name}</span>
                      </a>
                    ))
                }
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
