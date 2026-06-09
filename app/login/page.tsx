'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import FloatingNav from '@/components/FloatingNav'
import FadeIn from '@/components/FadeIn'
import GlassButton from '@/components/GlassButton'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const { isAuth, login } = useAuth()
  const router = useRouter()
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (isAuth) router.replace('/about')
  }, [isAuth, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(pw)) {
      router.push('/about')
    } else {
      setError('Incorrect password.')
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setPw('')
    }
  }

  return (
    <>
      <FloatingNav />
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 flex justify-center"
        >
          <FadeIn delay={0} y={24}>
            <div
              className="glass-strong rounded-[28px] p-8"
              style={{ width: 'min(380px, calc(100vw - 32px))' }}
            >
              <div className="flex justify-center mb-7">
                <div
                  className="w-12 h-12 rounded-full bg-[#007AFF] border border-[#007AFF]/30 flex items-center justify-center"
                  style={{ boxShadow: '0 0 22px rgba(0,122,255,0.30)' }}
                >
                  <Lock size={20} className="text-white" />
                </div>
              </div>

              <h1 className="syne text-[1.5rem] font-semibold text-[#1C1C1E] text-center mb-1.5">
                Private access
              </h1>
              <p className="text-[13px] text-[#3C3C43]/65 text-center mb-8 leading-relaxed">
                Enter the password to view contact details and personal information.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={pw}
                    onChange={(e) => { setPw(e.target.value); setError('') }}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full bg-white/40 border border-white/55 rounded-xl px-4 py-3 text-[14px] text-[#1C1C1E] placeholder-[#3C3C43]/35 focus:outline-none focus:border-[#007AFF]/60 focus:bg-white/60 transition-all duration-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3C3C43]/45 hover:text-[#3C3C43]/70 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12px] text-[#FF3B30]/90 text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <GlassButton type="submit" className="w-full justify-center">
                  Sign in
                </GlassButton>
              </form>

              <div className="mt-6 pt-5 border-t border-[#3C3C43]/12 text-center">
                <Link
                  href="/about"
                  className="text-[12px] text-[#3C3C43]/50 hover:text-[#3C3C43]/70 transition-colors duration-200"
                >
                  Continue without signing in
                </Link>
              </div>
            </div>
          </FadeIn>
        </motion.div>
      </section>
    </>
  )
}
