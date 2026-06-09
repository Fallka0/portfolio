'use client'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll } from 'framer-motion'
import FloatingNav from '@/components/FloatingNav'
import FadeIn from '@/components/FadeIn'
import GlassButton from '@/components/GlassButton'
import SectionBadge from '@/components/SectionBadge'
import TechMarquee from '@/components/TechMarquee'
import CountUp from '@/components/CountUp'
import StarburstIcon from '@/components/StarburstIcon'
import { skills, traits } from '@/lib/data'

const MacBookShowcase = dynamic(() => import('@/components/MacBookShowcase'), { ssr: false })

export default function HomePage() {
  const preSkillsRef = useRef<HTMLDivElement>(null)
  const skillsHeadingRef = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: preSkillsRef,
    offset: ['start start', 'end center'],
  })

  return (
    <>
      <FloatingNav />

      <MacBookShowcase progress={scrollYProgress} anchorRef={skillsHeadingRef} />

      <div ref={preSkillsRef}>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col overflow-hidden pt-24 sm:pt-28">
          <div className="relative z-20 flex-1 flex flex-col justify-end max-w-[1280px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
            <FadeIn delay={0.05} y={20}>
              <p className="text-[12px] sm:text-[13px] text-[#007AFF]/85 tracking-[0.18em] uppercase mb-5 sm:mb-8 syne font-medium">
                Mykyta · Developer · Bern, CH
              </p>
            </FadeIn>
            <FadeIn delay={0.15} y={40}>
              <h1
                className="syne font-medium leading-[1.06] tracking-[-0.03em] text-[#1C1C1E] mb-8 sm:mb-10"
                style={{ fontSize: 'clamp(2.2rem, 7vw, 4.8rem)' }}
              >
                Hi, I&apos;m Mykyta —
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                building things that
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                actually ship.
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} y={20}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <GlassButton to="/projects">View my work</GlassButton>
                <div className="glass rounded-full pl-3 pr-2 py-1.5 inline-flex items-center gap-2.5">
                  <StarburstIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-[#007AFF]/75 flex-shrink-0" />
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#1C1C1E] whitespace-nowrap">
                    Seeking Apprenticeship
                  </span>
                  <span className="text-[10px] bg-[#007AFF] text-white px-2 py-0.5 rounded-full font-semibold">
                    2026
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Tech marquee */}
        <TechMarquee />
      </div>

      {/* Skills */}
      <section id="skills" className="pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="01" label="What I bring" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h2
              ref={skillsHeadingRef}
              className="syne font-medium leading-[1.08] tracking-[-0.03em] text-[#1C1C1E] mb-12 sm:mb-16 px-5 sm:px-8 lg:px-12"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.6rem)' }}
            >
              Skills &amp; strengths
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 px-5 sm:px-8 lg:px-12">
            {/* Technical bars */}
            <div className="glass rounded-3xl p-7 sm:p-8">
              <p className="text-[11px] text-[#007AFF]/75 font-medium tracking-widest uppercase mb-6">Technical</p>
              <div className="space-y-5">
                {skills.map(({ label, level }, i) => (
                  <FadeIn key={label} delay={i * 0.08} y={16}>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[14px] text-[#1C1C1E] font-medium">{label}</span>
                        <span className="text-[12px] text-[#007AFF]/75 font-medium">
                          <CountUp to={level} />%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#3C3C43]/8 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                          style={{
                            background: 'linear-gradient(90deg, #007AFF, #5AC8FA)',
                            boxShadow: '0 0 8px rgba(0,122,255,0.40)',
                          }}
                        />
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Character traits */}
            <div>
              <p className="text-[11px] text-[#007AFF]/75 font-medium tracking-widest uppercase mb-6">Character</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {traits.map(({ Icon, title, desc }, i) => (
                  <FadeIn key={title} delay={i * 0.1} y={20}>
                    <div className="glass glass-hover rounded-2xl p-5 h-full">
                      <Icon size={20} className="text-[#007AFF] mb-3" />
                      <p className="text-[14px] font-semibold text-[#1C1C1E] mb-1.5 syne">{title}</p>
                      <p className="text-[13px] leading-[1.65] text-[#3C3C43]/70">{desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          <FadeIn delay={0.4} y={20} className="flex justify-center mt-16">
            <GlassButton to="/projects">See my projects</GlassButton>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
