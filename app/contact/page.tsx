'use client'
import Link from 'next/link'
import { Mail, GitBranch, MapPin } from 'lucide-react'
import FloatingNav from '@/components/FloatingNav'
import FadeIn from '@/components/FadeIn'
import SectionBadge from '@/components/SectionBadge'
import GlassButton from '@/components/GlassButton'

const contactCards = [
  { Icon: Mail, label: 'Email', value: 'mykytapantelei@gmail.com', href: 'mailto:mykytapantelei@gmail.com' },
  { Icon: GitBranch, label: 'GitHub', value: 'github.com/Fallka0', href: 'https://github.com/Fallka0' },
  { Icon: MapPin, label: 'Location', value: 'Bern, Switzerland', href: undefined },
]

export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <section className="pt-28 pb-20 sm:pb-28 lg:pb-36 relative overflow-hidden min-h-screen">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="04" label="Get in touch" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h1
              className="syne font-medium leading-[1.08] tracking-[-0.03em] text-[#1C1C1E] mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12"
              style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
            >
              Let&apos;s work together
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <p className="text-[15px] sm:text-[17px] leading-[1.7] text-[#3C3C43]/70 mb-10 max-w-lg font-light px-5 sm:px-8 lg:px-12">
              I&apos;m actively seeking apprenticeship opportunities where I can grow, contribute, and
              build real things. If you think I&apos;d be a good fit, I&apos;d love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-col sm:flex-row gap-4 mb-20 px-5 sm:px-8 lg:px-12">
              <GlassButton href="mailto:mykytapantelei@gmail.com">Send me an email</GlassButton>
              <GlassButton href="https://linkedin.com" dark>LinkedIn</GlassButton>
              <GlassButton href="https://github.com/Fallka0" dark>
                <span className="flex items-center gap-2">
                  <GitBranch size={14} /> GitHub
                </span>
              </GlassButton>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} y={20}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-5 sm:px-8 lg:px-12 mb-16">
              {contactCards.map(({ Icon, label, value, href }) => (
                <div key={label} className="glass glass-hover rounded-2xl p-5 group h-full">
                  <Icon size={16} className="text-[#007AFF] mb-3" />
                  <p className="text-[11px] text-[#007AFF]/75 tracking-widest uppercase font-medium mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#3C3C43] group-hover:text-[#1C1C1E] transition-colors duration-200"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[14px] text-[#3C3C43]">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Footer */}
          <div className="border-t border-[#3C3C43]/12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full bg-[#007AFF] border border-[#007AFF]/30 flex items-center justify-center"
                style={{ boxShadow: '0 0 12px rgba(0,122,255,0.25)' }}
              >
                <span className="text-white text-[10px] font-bold syne">MP</span>
              </div>
              <span className="text-[13px] text-[#3C3C43]/60">Mykyta Pantelei · 2026</span>
            </div>
            <Link
              href="/"
              className="text-[13px] text-[#3C3C43]/45 hover:text-[#3C3C43]/70 transition-colors duration-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
