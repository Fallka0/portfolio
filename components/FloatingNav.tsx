'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Clock, Menu, X, Lock, LogOut } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { useAuth } from '@/context/AuthContext'
import GlassButton from './GlassButton'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function FloatingNav() {
  const time = useClock()
  const { isAuth, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (to: string) => pathname === to
  const isHome = pathname === '/'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="glass-strong rounded-full pl-2 pr-2 py-1.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/" className="flex items-center">
                <div
                  className="w-9 h-9 rounded-full bg-[#007AFF] border border-[#007AFF]/40 flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 16px rgba(0,122,255,0.35)' }}
                >
                  <span className="text-white text-[11px] font-bold tracking-tight syne">MP</span>
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-1 ml-2">
                {links.map(({ label, to }) => (
                  <Link
                    key={to}
                    href={to}
                    className={`relative text-[13px] px-3 py-1.5 rounded-full transition-colors duration-300 ${
                      isActive(to)
                        ? 'text-[#1C1C1E] bg-white/45'
                        : 'text-[#3C3C43]/65 hover:text-[#1C1C1E]'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 pr-1">
              {isHome && (
                <span className="hidden lg:block text-[12px] text-[#3C3C43]/55">
                  Open to apprenticeships
                </span>
              )}
              <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#3C3C43]/55">
                <Clock size={12} />
                {time} Bern
              </span>
              {isAuth ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-[12px] text-[#007AFF]/70 hover:text-[#007AFF] transition-colors duration-200"
                >
                  <LogOut size={13} />
                  Sign out
                </button>
              ) : isHome ? (
                <GlassButton to="/contact">Get in touch</GlassButton>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-[12px] text-[#007AFF]/75 hover:text-[#007AFF] transition-colors duration-200"
                >
                  <Lock size={12} />
                  Private
                </Link>
              )}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden glass-subtle rounded-full p-2 text-[#1C1C1E]"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/25 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-3 right-3 mb-3 rounded-2xl glass-strong p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[13px] text-[#3C3C43]/60">{time} Bern</span>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center text-[#3C3C43]/65"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-1 mb-6">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                href={to}
                onClick={() => setOpen(false)}
                className="text-[26px] font-medium syne text-[#1C1C1E]/80 hover:text-[#1C1C1E] py-1 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          {isAuth ? (
            <button
              onClick={() => { logout(); setOpen(false) }}
              className="flex items-center gap-2 text-[13px] text-[#007AFF]/70"
            >
              <LogOut size={13} /> Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[13px] text-[#007AFF]/70"
            >
              <Lock size={13} /> Private access
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
