'use client'
import Link from 'next/link'
import { Lock, LogOut, Phone, Mail, MapPin, BookOpen, User, GitBranch } from 'lucide-react'
import FloatingNav from '@/components/FloatingNav'
import FadeIn from '@/components/FadeIn'
import SectionBadge from '@/components/SectionBadge'
import GlassButton from '@/components/GlassButton'
import AnimatedText from '@/components/AnimatedText'
import { useAuth } from '@/context/AuthContext'

const ABOUT_PUBLIC =
  "I'm Mykyta — an ambitious apprentice based in Bern, building full-stack applications across TypeScript, Go, and SQL. I ship clean, performant products: property portals, tournament platforms, and trading dashboards. Motivated, reliable, and ready to grow fast inside a great team."

const privateCards = [
  { Icon: Phone, label: 'Phone', value: '+41 79 000 00 00' },
  { Icon: Mail, label: 'Email', value: 'mykytapantelei@gmail.com' },
  { Icon: MapPin, label: 'Location', value: 'Bern, Switzerland' },
  { Icon: BookOpen, label: 'School', value: 'Berufsfachschule Bern' },
  { Icon: User, label: 'Salary expectation', value: 'CHF 800–1 000 / month' },
  { Icon: GitBranch, label: 'Reference', value: 'Available on request' },
]

export default function AboutPage() {
  const { isAuth, logout } = useAuth()

  return (
    <>
      <FloatingNav />
      <section className="pt-28 pb-24 relative overflow-hidden min-h-screen">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="03" label="About me" />
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h1
              className="syne font-medium leading-[1.12] tracking-[-0.02em] text-[#1C1C1E] mb-12 sm:mb-16 lg:mb-20 px-5 sm:px-8 lg:px-12"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)' }}
            >
              Motivated &amp; technical —
              <br className="hidden sm:block" />
              passionate about building things
              <br className="hidden sm:block" />
              that actually work.
            </h1>
          </FadeIn>

          {/* Bio */}
          <div className="px-5 sm:px-8 lg:px-12 mb-16 sm:mb-20">
            <div className="lg:grid lg:grid-cols-[26%_1fr_46%] lg:gap-8 lg:items-end">
              <FadeIn delay={0.15} x={-40} y={0} className="hidden lg:block">
                <div className="aspect-[438/346] rounded-2xl overflow-hidden ring-1 ring-white/45">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                    alt="Developer at work"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} y={20}>
                <div className="flex flex-col items-start">
                  <AnimatedText
                    text={ABOUT_PUBLIC}
                    className="text-[15px] sm:text-[17px] leading-[1.75] font-light text-[#3C3C43] mb-8 max-w-xl"
                  />
                  <GlassButton to="/contact">Let&apos;s connect</GlassButton>
                </div>
              </FadeIn>
              <FadeIn delay={0.25} x={40} y={0} className="hidden lg:block">
                <div className="aspect-[3/2] rounded-2xl overflow-hidden ring-1 ring-white/45">
                  <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
                    alt="Code on screen"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Private section */}
          <div className="px-5 sm:px-8 lg:px-12">
            <div className="border-t border-[#3C3C43]/12 pt-12">
              {isAuth ? (
                <FadeIn delay={0} y={20}>
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#007AFF] border border-[#007AFF]/30 flex items-center justify-center">
                          <Lock size={12} className="text-white" />
                        </div>
                        <span className="text-[12px] text-[#007AFF]/80 font-medium tracking-widest uppercase">
                          Private information
                        </span>
                      </div>
                      <button
                        onClick={logout}
                        className="flex items-center gap-1.5 text-[12px] text-[#3C3C43]/50 hover:text-[#3C3C43]/80 transition-colors"
                      >
                        <LogOut size={12} /> Sign out
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {privateCards.map(({ Icon, label, value }) => (
                        <div key={label} className="glass glass-hover rounded-2xl p-5 h-full">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={14} className="text-[#007AFF]" />
                            <span className="text-[11px] text-[#007AFF]/75 tracking-widest uppercase font-medium">
                              {label}
                            </span>
                          </div>
                          <p className="text-[14px] text-[#1C1C1E] font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 glass rounded-2xl p-5">
                      <p className="text-[11px] text-[#007AFF]/75 tracking-widest uppercase font-medium mb-3">
                        Additional notes
                      </p>
                      <p className="text-[14px] text-[#3C3C43] leading-relaxed">
                        Available to start an apprenticeship from August 2026. Prefer companies working with
                        modern web stacks — React, Next.js, TypeScript, Go. Comfortable in German and
                        English. Based in Bern; open to Bern and greater Bern region.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0} y={20}>
                  <div className="flex flex-col items-center text-center py-16">
                    <div className="w-14 h-14 rounded-full glass-subtle border border-[#007AFF]/25 flex items-center justify-center mb-6">
                      <Lock size={22} className="text-[#007AFF]" />
                    </div>
                    <h3 className="syne text-[1.3rem] font-semibold text-[#1C1C1E] mb-3">
                      Private section
                    </h3>
                    <p className="text-[14px] text-[#3C3C43]/65 leading-relaxed max-w-sm mb-8">
                      Contact details, salary expectations, and school information are protected. Sign in
                      to view them.
                    </p>
                    <GlassButton to="/login">Sign in</GlassButton>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
