'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface Row   { k: string; v: string }
interface Group { label: string; rows: Row[] }
interface Doc {
  id: string
  title: string
  kind: string
  issuer: string
  date: string
  grade: string
  gradeNote: string
  summary: string
  note?: string
  groups: Group[]
}
interface Value { t: string; d: string }

interface Props {
  values: Value[]
  docs:   Doc[]
}

export default function Vault({ values, docs }: Props) {
  const [unlocked, setUnlocked] = useState(false)
  const [error,    setError]    = useState('')
  const [shake,    setShake]    = useState(false)
  const [busy,     setBusy]     = useState(false)
  const [openId,   setOpenId]   = useState<string | null>(null)
  const [mounted,  setMounted]  = useState(false)
  const inputRef   = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const sheetRef   = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  const open = docs.find(d => d.id === openId) ?? null

  const attempt = async () => {
    if (busy) return
    const code = (inputRef.current?.value ?? '').trim()
    setBusy(true)
    try {
      // The code is checked on the server: this response is the only thing that
      // can unlock the section, and the document route re-checks the cookie it
      // sets, so nothing here is bypassable from devtools.
      const res = await fetch('/api/vault/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (res.ok) {
        setUnlocked(true); setError('')
        return
      }
      setError(
        res.status === 429  ? 'Too many attempts. Try again later.' :
        res.status === 503  ? 'The vault is not configured yet.' :
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

  const close = useCallback(() => setOpenId(null), [])

  // Escape closes the enlarged card, and the page behind it stops scrolling so
  // the sticky section stack can't slide around underneath the overlay. The
  // lock goes on <html>: it already sets `overflow-x: clip`, which stops the
  // browser propagating <body>'s overflow to the viewport, so locking the body
  // would silently do nothing here.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      root.style.overflow = prev
    }
  }, [open, close])

  // useSmoothScroll turns wheel events into window.scrollTo calls, and a
  // programmatic scroll sails straight past `overflow: hidden` — so the lock
  // above only covers touch, keyboard and the scrollbar. That hook ignores
  // events already default-prevented, which is the hook this relies on: cancel
  // the event, then hand the delta to the sheet when the pointer is over it.
  useEffect(() => {
    if (!open) return
    const el = overlayRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const sheet = sheetRef.current
      if (!sheet || !(e.target instanceof Node) || !sheet.contains(e.target)) return
      let d = e.deltaY
      if (e.deltaMode === 1) d *= 16                      // deltas in lines
      else if (e.deltaMode === 2) d *= window.innerHeight  // deltas in pages
      sheet.scrollTop += d
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

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
                disabled={busy}
                onKeyDown={e => e.key === 'Enter' && attempt()}
              />
              <button className="vault__btn" onClick={attempt} disabled={busy}>
                {busy ? 'Checking…' : 'Unlock →'}
              </button>
            </div>
            {error && <p className="vault__errmsg">{error}</p>}
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
              <div className="vault__col-head">
                <p className="vault__label mono">Documents</p>
                {docs.length > 1 && (
                  /* A plain link, not a fetch: the response carries
                     Content-Disposition: attachment, so the browser saves it
                     without JS and right-click/keyboard behave normally. */
                  <a className="vault__all" href="/api/vault/archive">
                    <span className="vault__all-icon" aria-hidden="true">↓</span>
                    Download all ({docs.length})
                  </a>
                )}
              </div>
              <div className="vault__docs">
                {docs.length === 0
                  ? <p className="vault__empty">Certificates will appear here once uploaded.</p>
                  : docs.map(d => (
                      <button
                        key={d.id}
                        type="button"
                        className="vault__card"
                        onClick={() => setOpenId(d.id)}
                        aria-haspopup="dialog"
                      >
                        <span className="vault__card-top">
                          <span className="vault__card-kind mono">{d.kind}</span>
                          <span className="vault__card-grade tnum">{d.grade}</span>
                        </span>
                        <span className="vault__card-title">{d.title}</span>
                        <span className="vault__card-meta">{d.issuer} · {d.date}</span>
                        <span className="vault__card-cue" aria-hidden="true">Open ↗</span>
                      </button>
                    ))
                }
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── ENLARGED CARD ────────────────────────────────────────────────
          Portalled to <body>: #vault is a sticky section with its own z-index,
          which makes it a stacking context — inside it no z-index can climb
          over the fixed nav, so the dialog rendered underneath the navbar. */}
      {mounted && open && createPortal(
        <div className="vault__overlay" ref={overlayRef} onClick={close}>
          <div
            className="vault__sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} — ${open.issuer}`}
            onClick={e => e.stopPropagation()}
          >
            <button className="vault__close" onClick={close} aria-label="Close">×</button>

            <p className="vault__sheet-kind mono">{open.kind}</p>
            <h3 className="vault__sheet-title">{open.title}</h3>
            <p className="vault__sheet-meta">{open.issuer} · {open.date}</p>

            <div className="vault__sheet-grade">
              <span className="vault__sheet-num tnum">{open.grade}</span>
              <span className="vault__sheet-lab mono">{open.gradeNote}</span>
            </div>

            <p className="vault__sheet-sum">{open.summary}</p>
            {open.note && <blockquote className="vault__sheet-note">{open.note}</blockquote>}

            {open.groups.map((g, i) => (
              <div key={i} className="vault__grp">
                <p className="vault__grp-label mono">{g.label}</p>
                <ul className="vault__grades">
                  {g.rows.map((r, j) => (
                    <li key={j} className="vault__grade-row">
                      <span className="vault__grade-k">{r.k}</span>
                      <span className="vault__grade-v tnum">{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Hits the gated route — a signed-in session is required, and the
                browser saves the PDF straight from the response. */}
            <a className="vault__get" href={`/api/vault/doc/${open.id}`}>
              <span className="vault__get-arrow" aria-hidden="true">↓</span>
              Download PDF
            </a>
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}
