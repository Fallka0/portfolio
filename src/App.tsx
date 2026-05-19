import { useState, useEffect } from 'react'
import { ArrowRight, Clock, Menu, X, GitBranch, ExternalLink, Mail, Link } from 'lucide-react'
import './index.css'

/* ── Live Clock (Zurich / CET) ── */
function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
      })
      setTime(t)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/* ── Starburst SVG ── */
function StarburstIcon({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  )
}

/* ── Liquid Glass CTA Button ── */
function GlassButton({
  children,
  href,
  onClick,
  className = '',
  arrow = true,
  dark = false,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  arrow?: boolean
  dark?: boolean
}) {
  const inner = (
    <span
      className={`group inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 cursor-pointer ${
        dark
          ? 'liquid-glass-btn text-white/80'
          : 'liquid-glass-btn text-white'
      } ${className}`}
    >
      {arrow ? (
        <>
          <span className="text-roll-wrap text-[13px] font-medium leading-[20px]">
            <span className="text-roll-inner">
              <span>{children}</span>
              <span>{children}</span>
            </span>
          </span>
          <span className="w-7 h-7 rounded-full bg-violet-600/50 border border-violet-400/40 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0 backdrop-blur-sm">
            <ArrowRight size={13} className="text-white/90" />
          </span>
        </>
      ) : (
        <span className="text-[13px] font-medium px-1">{children}</span>
      )}
    </span>
  )

  if (href) return <a href={href}>{inner}</a>
  return <button onClick={onClick}>{inner}</button>
}

/* ── Section Badge ── */
function SectionBadge({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-violet-600/70 backdrop-blur-sm border border-violet-400/30 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
        {num}
      </span>
      <span className="text-[12px] sm:text-[13px] font-medium border border-white/12 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-white/60 glass-card">
        {label}
      </span>
    </div>
  )
}

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function Hero({ onMenuOpen }: { onMenuOpen: () => void }) {
  const time = useClock()
  const navLinks = ['Projects', 'About', 'Skills', 'Contact']

  return (
    <section className="relative min-h-screen flex flex-col aurora-bg overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute top-[12%] left-[8%] w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[110px]" />
        <div className="orb-2 absolute top-[45%] right-[3%] w-[420px] h-[420px] rounded-full bg-purple-500/14 blur-[95px]" />
        <div className="orb-3 absolute bottom-[8%] left-[38%] w-[360px] h-[360px] rounded-full bg-indigo-600/14 blur-[85px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 px-4 sm:px-6 pt-4 sm:pt-5">
        <div className="max-w-[1440px] mx-auto">
          <div className="navbar-glass rounded-full px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-violet-600 border border-violet-400/40 flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 20px rgba(124,58,237,0.55)' }}
              >
                <span className="text-white text-[11px] font-bold tracking-tight syne">AX</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="text-[14px] text-white/65 hover:text-white transition-colors duration-300"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <span className="hidden lg:block text-[13px] text-white/45">
                Open to apprenticeships
              </span>
              <span className="flex items-center gap-1.5 text-[13px] text-white/55">
                <Clock size={13} />
                {time} in Zurich
              </span>
              <GlassButton href="#contact">Get in touch</GlassButton>
            </div>

            <button
              onClick={onMenuOpen}
              className="md:hidden liquid-glass-btn rounded-full p-2 text-white"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero copy */}
      <div className="relative z-20 flex-1 flex flex-col justify-end max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
        <p className="text-[13px] sm:text-[14px] text-violet-300/75 tracking-[0.18em] uppercase mb-5 sm:mb-8 syne fade-up">
          Apprentice · Developer · Creator
        </p>
        <h1
          className="syne font-medium leading-[1.06] tracking-[-0.03em] text-white mb-8 sm:mb-10 fade-up fade-up-delay-1"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 4.8rem)' }}
        >
          Crafting digital experiences
          <br className="hidden sm:block" /><span className="sm:hidden"> </span>
          that stand out — ready
          <br className="hidden sm:block" /><span className="sm:hidden"> </span>
          to learn, build &amp; grow.
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 fade-up fade-up-delay-2">
          <GlassButton href="#projects">View my work</GlassButton>

          <div className="group inline-flex items-center gap-2.5 glass-card rounded-2xl px-4 py-2.5 cursor-default hover:border-violet-400/28 transition-all duration-300">
            <StarburstIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-violet-400/75 flex-shrink-0" />
            <span className="text-[13px] sm:text-[14px] font-medium text-white/75">
              Seeking Apprenticeship
            </span>
            <span
              className="text-[10px] sm:text-[11px] bg-violet-600/70 backdrop-blur-sm border border-violet-400/30 text-white px-1.5 sm:px-2 py-0.5 rounded-full font-medium"
            >
              2025
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0718] to-transparent pointer-events-none z-10" />
    </section>
  )
}

/* ══════════════════════════════════════
   ABOUT
══════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="bg-[#0c0718] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-violet-900/10 blur-[130px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto">
        <SectionBadge num="1" label="About me" />

        <h2
          className="syne font-medium leading-[1.12] tracking-[-0.02em] text-white mb-12 sm:mb-16 lg:mb-24 px-5 sm:px-8 lg:px-12"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)' }}
        >
          Motivated &amp; technical —
          <br className="hidden sm:block" />
          passionate about building things
          <br className="hidden sm:block" />
          that actually work.
        </h2>

        {/* Mobile/tablet */}
        <div className="lg:hidden px-5 sm:px-8">
          <p className="text-[15px] sm:text-[17px] leading-[1.7] font-light text-white/65 mb-7 max-w-xl">
            I'm an ambitious apprentice with a drive to create clean, performant, and thoughtful digital products. I bring reliability, curiosity, and a hands-on mindset to every project — always eager to learn from experienced teams and contribute from day one.
          </p>
          <GlassButton href="#contact" className="mb-10">Start a conversation</GlassButton>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10">
            <div className="sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl overflow-hidden glass-card">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Developer at work"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
            <div className="sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl overflow-hidden glass-card">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
                alt="Code on screen"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
          </div>
        </div>

        {/* Desktop 3-col */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
          <div className="self-end aspect-[438/346] rounded-2xl overflow-hidden glass-card">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
              alt="Developer at work"
              className="w-full h-full object-cover opacity-75"
            />
          </div>
          <div className="self-start flex flex-col items-start pb-4">
            <p className="text-[16px] leading-[1.75] font-light text-white/65 mb-8">
              Motivated &amp; reliable — I show up,<br />
              put in the work, and grow fast.<br />
              Technical skills across front-end<br />
              and back-end development.
            </p>
            <GlassButton href="#contact">Let's connect</GlassButton>
          </div>
          <div className="self-end aspect-[3/2] rounded-2xl overflow-hidden glass-card">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
              alt="Code on screen"
              className="w-full h-full object-cover opacity-75"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SKILLS
══════════════════════════════════════ */
const skills = [
  { label: 'JavaScript / TypeScript', level: 80 },
  { label: 'React & Modern Frameworks', level: 75 },
  { label: 'HTML & CSS / Tailwind', level: 88 },
  { label: 'Node.js & REST APIs', level: 68 },
  { label: 'Git & Version Control', level: 82 },
  { label: 'UI/UX Thinking', level: 72 },
]

const traits = [
  { icon: '🎯', title: 'Goal-oriented', desc: 'I set clear targets and work systematically to reach them.' },
  { icon: '⚡', title: 'Fast learner', desc: 'New technologies, frameworks, and concepts — I pick them up quickly.' },
  { icon: '🤝', title: 'Team player', desc: 'Collaborative, communicative, and dependable in group settings.' },
  { icon: '🔍', title: 'Detail-focused', desc: 'I care about quality — from code structure to the final pixel.' },
]

function Skills() {
  return (
    <section id="skills" className="bg-[#0e0a20] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-violet-800/10 blur-[110px]" />
      </div>
      <div className="max-w-[1440px] mx-auto">
        <SectionBadge num="2" label="What I bring" />
        <h2
          className="syne font-medium leading-[1.08] tracking-[-0.03em] text-white mb-12 sm:mb-16 px-5 sm:px-8 lg:px-12"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3.6rem)' }}
        >
          Skills &amp; strengths
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 px-5 sm:px-8 lg:px-12">
          {/* Technical */}
          <div>
            <p className="text-[12px] text-violet-300/55 font-medium tracking-widest uppercase mb-6">Technical</p>
            <div className="space-y-5">
              {skills.map(({ label, level }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] text-white/78 font-medium">{label}</span>
                    <span className="text-[12px] text-violet-300/55">{level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${level}%`,
                        background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                        boxShadow: '0 0 10px rgba(124,58,237,0.6)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Character traits */}
          <div>
            <p className="text-[12px] text-violet-300/55 font-medium tracking-widest uppercase mb-6">Character</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traits.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="glass-card rounded-2xl p-5 hover:border-violet-400/22 transition-all duration-300 group"
                >
                  <span className="text-2xl mb-3 block">{icon}</span>
                  <p className="text-[14px] font-semibold text-white mb-1.5 syne">{title}</p>
                  <p className="text-[13px] leading-[1.65] text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   PROJECTS
══════════════════════════════════════ */
const projects = [
  {
    title: 'Portfolio Site',
    desc: 'Personal portfolio built with React, TypeScript & Tailwind — clean UI, smooth animations, glassmorphism aesthetics.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    bg: '#12082a',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80',
  },
  {
    title: 'Task Manager App',
    desc: 'Full-stack productivity app with real-time sync, drag-and-drop boards, and user authentication.',
    tags: ['Node.js', 'React', 'PostgreSQL'],
    bg: '#0d1530',
    img: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&q=80',
  },
  {
    title: 'Weather Dashboard',
    desc: 'Live weather visualisation pulling from multiple APIs with custom charting and location search.',
    tags: ['JavaScript', 'REST API', 'Chart.js'],
    bg: '#0f1a20',
    img: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=900&q=80',
  },
  {
    title: 'E-Commerce Concept',
    desc: 'Modern storefront UI/UX concept with product filtering, cart, and checkout flow.',
    tags: ['React', 'CSS', 'UX Design'],
    bg: '#150e28',
    img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=900&q=80',
  },
]

function Projects() {
  return (
    <section id="projects" className="bg-[#0c0718] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-800/10 blur-[120px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto">
        <SectionBadge num="3" label="Selected projects" />
        <h2
          className="syne font-medium leading-[1.08] tracking-[-0.03em] text-white mb-10 sm:mb-14 lg:mb-16 px-5 sm:px-8 lg:px-12"
          style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
        >
          My projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          {projects.map((p) => (
            <div key={p.title} className="group">
              <div
                className="aspect-[329/246] rounded-2xl overflow-hidden cursor-pointer relative"
                style={{ background: p.bg }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                {/* Hover expand pill */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 h-9 w-9 group-hover:w-[145px] transition-all duration-300 ease-in-out liquid-glass-btn rounded-full overflow-hidden">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-[13px] font-medium text-white pl-3 whitespace-nowrap">
                      View project
                    </span>
                    <span className="w-7 h-7 rounded-full bg-violet-600/50 border border-violet-400/40 flex items-center justify-center ml-auto mr-1 flex-shrink-0">
                      <ExternalLink size={12} className="text-white/90" />
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full glass-card text-white/65">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[13px] sm:text-[14px] text-white/48 mt-4 leading-relaxed">{p.desc}</p>
              <p className="text-[14px] sm:text-[15px] font-semibold text-white mt-1 syne">{p.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="bg-[#0e0a20] pt-16 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-36 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-700/10 blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <SectionBadge num="4" label="Get in touch" />
        <h2
          className="syne font-medium leading-[1.08] tracking-[-0.03em] text-white mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12"
          style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
        >
          Let's work together
        </h2>
        <p className="text-[15px] sm:text-[17px] leading-[1.7] text-white/50 mb-10 max-w-lg font-light px-5 sm:px-8 lg:px-12">
          I'm actively seeking apprenticeship opportunities where I can grow, contribute, and build real things. If you think I'd be a good fit, I'd love to hear from you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 px-5 sm:px-8 lg:px-12">
          <GlassButton href="mailto:hello@example.com">Send me an email</GlassButton>
          <GlassButton href="https://linkedin.com" dark>
            <span className="flex items-center gap-2">
              <Link size={14} />
              LinkedIn
            </span>
          </GlassButton>
          <GlassButton href="https://github.com" dark>
            <span className="flex items-center gap-2">
              <GitBranch size={14} />
              GitHub
            </span>
          </GlassButton>
        </div>

        {/* Footer */}
        <div className="border-t border-white/7 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full bg-violet-600/75 border border-violet-400/30 flex items-center justify-center"
              style={{ boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}
            >
              <span className="text-white text-[10px] font-bold syne">AX</span>
            </div>
            <span className="text-[13px] text-white/35">Apprentice Portfolio · 2025</span>
          </div>
          <span className="text-[13px] text-white/28 flex items-center gap-1.5">
            <Mail size={12} />
            hello@example.com
          </span>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const time = useClock()
  const links = ['Projects', 'About', 'Skills', 'Contact']

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute bottom-0 left-3 right-3 mb-3 rounded-2xl navbar-glass p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="flex items-center gap-1.5 text-[13px] text-white/55">
            <Clock size={13} />
            {time} Zurich
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-white/65"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-1 mb-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={onClose}
              className="text-[28px] sm:text-[32px] font-medium syne text-white/80 hover:text-white py-1 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <GlassButton href="#contact" onClick={onClose}>
          Start a conversation
        </GlassButton>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <Hero onMenuOpen={() => setMenuOpen(true)} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
