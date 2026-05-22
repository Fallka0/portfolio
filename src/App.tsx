import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  lazy,
  Suspense,
} from 'react'
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  ArrowRight,
  Clock,
  Menu,
  X,
  GitBranch,
  Mail,
  Target,
  Zap,
  Users,
  Search,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  BookOpen,
  User,
} from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from 'framer-motion'
import Lenis from 'lenis'
import './index.css'

const MacBookShowcase = lazy(() => import('./MacBookShowcase'))

/* ══════════════════════════════════════
   AUTH
══════════════════════════════════════ */
const PRIVATE_PASSWORD = 'portfolio2025'

interface AuthCtx {
  isAuth: boolean
  login: (pw: string) => boolean
  logout: () => void
}
const AuthContext = createContext<AuthCtx>({
  isAuth: false,
  login: () => false,
  logout: () => {},
})

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(
    () => sessionStorage.getItem('__pauth') === '1'
  )
  const login = (pw: string) => {
    if (pw === PRIVATE_PASSWORD) {
      sessionStorage.setItem('__pauth', '1')
      setIsAuth(true)
      return true
    }
    return false
  }
  const logout = () => {
    sessionStorage.removeItem('__pauth')
    setIsAuth(false)
  }
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/* ══════════════════════════════════════
   COUNT-UP (scroll-triggered number)
══════════════════════════════════════ */
function CountUp({ to, duration = 1100 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setVal(Math.round(eased * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{val}</span>
}

/* ══════════════════════════════════════
   HOOKS
══════════════════════════════════════ */
function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

/* ══════════════════════════════════════
   ANIMATION COMPONENTS
══════════════════════════════════════ */
function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  x = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedChar({
  char,
  scrollYProgress,
  start,
  end,
}: {
  char: string
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

function AnimatedText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.15'],
  })
  const chars = text.split('')
  const N = chars.length
  return (
    <p ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => {
        const start = (i / N) * 0.8
        const end = Math.min(start + Math.max(1 / N, 0.1), 1)
        return (
          <AnimatedChar
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        )
      })}
    </p>
  )
}

/* ══════════════════════════════════════
   SHARED UI
══════════════════════════════════════ */
function StarburstIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  )
}

function GlassButton({
  children,
  href,
  to,
  onClick,
  className = '',
  arrow = true,
  dark = false,
  type,
}: {
  children: React.ReactNode
  href?: string
  to?: string
  onClick?: () => void
  className?: string
  arrow?: boolean
  dark?: boolean
  type?: 'button' | 'submit' | 'reset'
}) {
  const navigate = useNavigate()
  const textColor = dark ? 'text-[#3C3C43]/80' : 'text-[#1C1C1E]'

  const handleClick = () => {
    if (onClick) return onClick()
    if (to) return navigate(to)
    if (href) {
      if (href.startsWith('http')) window.open(href, '_blank', 'noopener,noreferrer')
      else window.location.href = href
    }
  }

  const padding = arrow ? 'pl-[18px] pr-[6px] py-[6px]' : 'px-5 py-2.5'

  return (
    <button
      type={type ?? 'button'}
      onClick={type === 'submit' ? undefined : handleClick}
      className={`glass-button ${padding} ${className}`}
    >
      {arrow ? (
        <span className={`group inline-flex items-center gap-2 ${textColor}`}>
          <span className="text-roll-wrap text-[13px] font-medium leading-[20px]">
            <span className="text-roll-inner">
              <span>{children}</span>
              <span>{children}</span>
            </span>
          </span>
          <span className="w-7 h-7 rounded-full bg-[#007AFF] border border-[#007AFF]/40 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0">
            <ArrowRight size={13} className="text-white" />
          </span>
        </span>
      ) : (
        <span className={`text-[13px] font-medium whitespace-nowrap ${textColor}`}>{children}</span>
      )}
    </button>
  )
}

function SectionBadge({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#007AFF] border border-[#007AFF]/30 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
        {num}
      </span>
      <span className="glass-subtle text-[12px] sm:text-[13px] font-medium rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[#3C3C43]/65">
        {label}
      </span>
    </div>
  )
}

/* ══════════════════════════════════════
   FLOATING NAV (all pages)
══════════════════════════════════════ */
function FloatingNav() {
  const time = useClock()
  const { isAuth, logout } = useAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  const isActive = (to: string) => location.pathname === to
  const isHome = location.pathname === '/'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="glass-strong rounded-full pl-2 pr-2 py-1.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/" className="flex items-center">
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
                    to={to}
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
                <span className="hidden lg:block text-[12px] text-[#3C3C43]/55">Open to apprenticeships</span>
              )}
              <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#3C3C43]/55">
                <Clock size={12} />{time} Bern
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
                  to="/login"
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

      {/* Mobile sheet */}
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
                to={to}
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
              to="/login"
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

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const skills = [
  { label: 'TypeScript / JavaScript', level: 85 },
  { label: 'React & Next.js', level: 82 },
  { label: 'HTML & CSS / Tailwind', level: 90 },
  { label: 'Go & REST APIs', level: 65 },
  { label: 'Supabase & PostgreSQL', level: 70 },
  { label: 'Git & Version Control', level: 85 },
]

const traits = [
  { Icon: Target, title: 'Goal-oriented', desc: 'I set clear targets and work systematically to reach them.' },
  { Icon: Zap, title: 'Fast learner', desc: 'New technologies, frameworks, and concepts — I pick them up quickly.' },
  { Icon: Users, title: 'Team player', desc: 'Collaborative, communicative, and dependable in group settings.' },
  { Icon: Search, title: 'Detail-focused', desc: 'I care about quality — from code structure to the final pixel.' },
]

interface ProjectData {
  num: string
  title: string
  category: string
  desc: string
  tags: string[]
  href: string
  img1: string
  img2: string
  img3: string
}

const projects: ProjectData[] = [
  {
    num: '01',
    title: 'Planary',
    category: 'Full-Stack App',
    desc: 'Wishlist sharing platform with a React + Vite frontend, Go backend deployed as Vercel functions, and PostgreSQL for persistent storage. Secure auth via HTTP-only cookies with a standalone dashboard.',
    tags: ['React', 'Go', 'PostgreSQL', 'Vite'],
    href: 'https://planary.ch',
    img1: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=900&q=80',
  },
  {
    num: '02',
    title: 'Milla Homes',
    category: 'Full-Stack App',
    desc: 'Boutique real estate portal with public listings, search and filtering, individual property pages with inquiry forms, and a private admin panel for managing inventory, pricing, and availability.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    href: 'https://milla-homes.com',
    img1: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=80',
  },
  {
    num: '03',
    title: 'FreakDeck',
    category: 'Hardware + Desktop',
    desc: 'Custom hardware macro pad with a desktop companion app. Map physical buttons to apps, URLs, and folders, control and sync system volume, and push the current "now playing" track back to the device — Arduino firmware paired with a packaged Python desktop client.',
    tags: ['Python', 'Arduino', 'C++'],
    href: 'https://github.com/Fallka0/FreakDeck',
    img1: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80',
  },
]

const row1Items = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'PostgreSQL', 'Go', 'Vite', 'REST APIs', 'JWT Auth']
const row2Items = ['Vercel', 'Git & GitHub', 'Docker', 'PHP', 'C#', 'Node.js', 'SQL', 'HTML & CSS', 'Responsive Design', 'Authentication', 'Chart.js']

/* ══════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════ */
function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const reverse = index % 2 === 1
  return (
    <FadeIn delay={index * 0.06} y={40}>
      <article className="mb-8 sm:mb-12 flex justify-center">
        <div
          className={`glass-strong glass-hover rounded-[32px] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10 items-center p-6 sm:p-8 ${
            reverse ? 'lg:[&>:first-child]:order-2' : ''
          }`}
          style={{ width: 'min(1100px, calc(100vw - 40px))' }}
        >
          {/* Image collage */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2.5 sm:gap-3 h-[260px] sm:h-[340px] lg:h-[380px]">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/40">
              <img
                src={project.img3}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden ring-1 ring-white/40">
              <img
                src={project.img1}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden ring-1 ring-white/40">
              <img
                src={project.img2}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <span
                className="syne font-bold leading-none select-none text-transparent bg-clip-text"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  backgroundImage:
                    'linear-gradient(135deg, rgba(0,122,255,0.65) 0%, rgba(88,86,214,0.40) 100%)',
                }}
              >
                {project.num}
              </span>
              <span className="text-[11px] text-[#007AFF]/80 tracking-[0.18em] uppercase font-semibold">
                {project.category}
              </span>
            </div>

            <h3
              className="syne font-medium text-[#1C1C1E] mb-3 tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}
            >
              {project.title}
            </h3>

            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#3C3C43]/72 mb-6">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-7">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="glass-subtle text-[11px] px-3 py-1 rounded-full text-[#007AFF] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            <div>
              <GlassButton href={project.href}>
                {project.href.includes('github.com') ? 'View on GitHub' : 'Visit live site'}
              </GlassButton>
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

/* ══════════════════════════════════════
   TECH MARQUEE
══════════════════════════════════════ */
function TechMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handle = () => {
      if (!sectionRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const renderRow = (items: string[], right: boolean) => {
    const tx = right ? offset - 200 : -(offset - 200)
    return (
      <div
        className="flex gap-3 py-1.5"
        style={{ transform: `translateX(${tx}px)`, willChange: 'transform' }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0 glass-subtle rounded-full px-5 py-2.5 text-[13px] font-medium text-[#3C3C43]/75 whitespace-nowrap">
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="pt-16 pb-8 overflow-hidden">
      <FadeIn y={16} delay={0}>
        <p className="text-[11px] text-[#007AFF]/65 font-medium tracking-widest uppercase text-center mb-7">
          Technologies I work with
        </p>
      </FadeIn>
      <div className="space-y-3">
        {renderRow(row1Items, true)}
        {renderRow(row2Items, false)}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   PAGE: HOME
══════════════════════════════════════ */
function HomePage() {
  const preSkillsRef = useRef<HTMLDivElement>(null)
  const skillsHeadingRef = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: preSkillsRef,
    offset: ['start start', 'end center'],
  })

  return (
    <>
      <FloatingNav />

      {/* ── Floating 3D MacBook (right of hero → parks beside skills heading) ── */}
      <Suspense fallback={null}>
        <MacBookShowcase progress={scrollYProgress} anchorRef={skillsHeadingRef} />
      </Suspense>

      <div ref={preSkillsRef}>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden pt-24 sm:pt-28">

        <div className="relative z-20 flex-1 flex flex-col justify-end max-w-[1280px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <FadeIn delay={0.05} y={20}>
            <p className="text-[12px] sm:text-[13px] text-[#007AFF]/85 tracking-[0.18em] uppercase mb-5 sm:mb-8 syne font-medium">
              Mykyta · Developer · Bern, CH
            </p>
          </FadeIn>
          <FadeIn delay={0.15} y={40}>
            <h1 className="syne font-medium leading-[1.06] tracking-[-0.03em] text-[#1C1C1E] mb-8 sm:mb-10" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.8rem)' }}>
              Hi, I'm Mykyta —
              <br className="hidden sm:block" /><span className="sm:hidden"> </span>
              building things that
              <br className="hidden sm:block" /><span className="sm:hidden"> </span>
              actually ship.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4">
              <GlassButton to="/projects">View my work</GlassButton>
              <div className="glass rounded-full pl-3 pr-2 py-1.5 inline-flex items-center gap-2.5">
                <StarburstIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-[#007AFF]/75 flex-shrink-0" />
                <span className="text-[12px] sm:text-[13px] font-medium text-[#1C1C1E] whitespace-nowrap">Seeking Apprenticeship</span>
                <span className="text-[10px] bg-[#007AFF] text-white px-2 py-0.5 rounded-full font-semibold">2026</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Tech Marquee ── */}
      <TechMarquee />
      </div>

      {/* ── Skills overview ── */}
      <section id="skills" className="pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="01" label="What I bring" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h2 ref={skillsHeadingRef} className="syne font-medium leading-[1.08] tracking-[-0.03em] text-[#1C1C1E] mb-12 sm:mb-16 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.6rem)' }}>
              Skills &amp; strengths
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 px-5 sm:px-8 lg:px-12">
            <div className="glass rounded-3xl p-7 sm:p-8">
              <p className="text-[11px] text-[#007AFF]/75 font-medium tracking-widest uppercase mb-6">Technical</p>
              <div className="space-y-5">
                {skills.map(({ label, level }, i) => (
                  <FadeIn key={label} delay={i * 0.08} y={16}>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[14px] text-[#1C1C1E] font-medium">{label}</span>
                        <span className="text-[12px] text-[#007AFF]/75 font-medium"><CountUp to={level} />%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#3C3C43]/8 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                          style={{ background: 'linear-gradient(90deg, #007AFF, #5AC8FA)', boxShadow: '0 0 8px rgba(0,122,255,0.40)' }}
                        />
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

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

/* ══════════════════════════════════════
   PAGE: PROJECTS
══════════════════════════════════════ */
function ProjectsPage() {
  return (
    <>
      <FloatingNav />
      <section className="pt-28 pb-8 relative overflow-hidden min-h-screen">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="02" label="Selected work" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h1 className="syne font-medium leading-[1.08] tracking-[-0.03em] text-[#1C1C1E] mb-10 sm:mb-12 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}>
              My projects
            </h1>
          </FadeIn>
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} />
            ))}
          </div>
          <div className="h-20" />
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════
   PAGE: ABOUT
══════════════════════════════════════ */
const ABOUT_PUBLIC =
  "I'm Mykyta — an ambitious apprentice based in Bern, building full-stack applications across TypeScript, Go, and SQL. I ship clean, performant products: property portals, tournament platforms, and trading dashboards. Motivated, reliable, and ready to grow fast inside a great team."

function AboutPage() {
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
            <h1 className="syne font-medium leading-[1.12] tracking-[-0.02em] text-[#1C1C1E] mb-12 sm:mb-16 lg:mb-20 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)' }}>
              Motivated &amp; technical —
              <br className="hidden sm:block" />
              passionate about building things
              <br className="hidden sm:block" />
              that actually work.
            </h1>
          </FadeIn>

          {/* Public bio */}
          <div className="px-5 sm:px-8 lg:px-12 mb-16 sm:mb-20">
            <div className="lg:grid lg:grid-cols-[26%_1fr_46%] lg:gap-8 lg:items-end">
              <FadeIn delay={0.15} x={-40} y={0} className="hidden lg:block">
                <div className="aspect-[438/346] rounded-2xl overflow-hidden ring-1 ring-white/45">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Developer at work" className="w-full h-full object-cover opacity-90" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} y={20}>
                <div className="flex flex-col items-start">
                  <AnimatedText text={ABOUT_PUBLIC} className="text-[15px] sm:text-[17px] leading-[1.75] font-light text-[#3C3C43] mb-8 max-w-xl" />
                  <GlassButton to="/contact">Let's connect</GlassButton>
                </div>
              </FadeIn>
              <FadeIn delay={0.25} x={40} y={0} className="hidden lg:block">
                <div className="aspect-[3/2] rounded-2xl overflow-hidden ring-1 ring-white/45">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80" alt="Code on screen" className="w-full h-full object-cover opacity-90" />
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
                        <span className="text-[12px] text-[#007AFF]/80 font-medium tracking-widest uppercase">Private information</span>
                      </div>
                      <button onClick={logout} className="flex items-center gap-1.5 text-[12px] text-[#3C3C43]/50 hover:text-[#3C3C43]/80 transition-colors">
                        <LogOut size={12} /> Sign out
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { Icon: Phone, label: 'Phone', value: '+41 79 000 00 00' },
                        { Icon: Mail, label: 'Email', value: 'mykytapantelei@gmail.com' },
                        { Icon: MapPin, label: 'Location', value: 'Bern, Switzerland' },
                        { Icon: BookOpen, label: 'School', value: 'Berufsfachschule Bern' },
                        { Icon: User, label: 'Salary expectation', value: 'CHF 800–1 000 / month' },
                        { Icon: GitBranch, label: 'Reference', value: 'Available on request' },
                      ].map(({ Icon, label, value }) => (
                        <div key={label} className="glass glass-hover rounded-2xl p-5 h-full">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={14} className="text-[#007AFF]" />
                            <span className="text-[11px] text-[#007AFF]/75 tracking-widest uppercase font-medium">{label}</span>
                          </div>
                          <p className="text-[14px] text-[#1C1C1E] font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 glass rounded-2xl p-5">
                      <p className="text-[11px] text-[#007AFF]/75 tracking-widest uppercase font-medium mb-3">Additional notes</p>
                      <p className="text-[14px] text-[#3C3C43] leading-relaxed">
                        Available to start an apprenticeship from August 2026. Prefer companies working with modern web stacks — React, Next.js, TypeScript, Go. Comfortable in German and English. Based in Bern; open to Bern and greater Bern region.
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
                    <h3 className="syne text-[1.3rem] font-semibold text-[#1C1C1E] mb-3">Private section</h3>
                    <p className="text-[14px] text-[#3C3C43]/65 leading-relaxed max-w-sm mb-8">
                      Contact details, salary expectations, and school information are protected. Sign in to view them.
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

/* ══════════════════════════════════════
   PAGE: CONTACT
══════════════════════════════════════ */
function ContactPage() {
  return (
    <>
      <FloatingNav />
      <section className="pt-28 pb-20 sm:pb-28 lg:pb-36 relative overflow-hidden min-h-screen">

        <div className="max-w-[1280px] mx-auto relative z-10">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="04" label="Get in touch" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h1 className="syne font-medium leading-[1.08] tracking-[-0.03em] text-[#1C1C1E] mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}>
              Let's work together
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <p className="text-[15px] sm:text-[17px] leading-[1.7] text-[#3C3C43]/70 mb-10 max-w-lg font-light px-5 sm:px-8 lg:px-12">
              I'm actively seeking apprenticeship opportunities where I can grow, contribute, and build real things. If you think I'd be a good fit, I'd love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-col sm:flex-row gap-4 mb-20 px-5 sm:px-8 lg:px-12">
              <GlassButton href="mailto:mykytapantelei@gmail.com">Send me an email</GlassButton>
              <GlassButton href="https://linkedin.com" dark>LinkedIn</GlassButton>
              <GlassButton href="https://github.com/Fallka0" dark>
                <span className="flex items-center gap-2"><GitBranch size={14} /> GitHub</span>
              </GlassButton>
            </div>
          </FadeIn>

          {/* Contact cards */}
          <FadeIn delay={0.4} y={20}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-5 sm:px-8 lg:px-12 mb-16">
              {[
                { Icon: Mail, label: 'Email', value: 'mykytapantelei@gmail.com', href: 'mailto:mykytapantelei@gmail.com' },
                { Icon: GitBranch, label: 'GitHub', value: 'github.com/Fallka0', href: 'https://github.com/Fallka0' },
                { Icon: MapPin, label: 'Location', value: 'Bern, Switzerland', href: undefined },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="glass glass-hover rounded-2xl p-5 group h-full">
                  <Icon size={16} className="text-[#007AFF] mb-3" />
                  <p className="text-[11px] text-[#007AFF]/75 tracking-widest uppercase font-medium mb-1">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[14px] text-[#3C3C43] group-hover:text-[#1C1C1E] transition-colors duration-200">
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
              <div className="w-8 h-8 rounded-full bg-[#007AFF] border border-[#007AFF]/30 flex items-center justify-center" style={{ boxShadow: '0 0 12px rgba(0,122,255,0.25)' }}>
                <span className="text-white text-[10px] font-bold syne">MP</span>
              </div>
              <span className="text-[13px] text-[#3C3C43]/60">Mykyta Pantelei · 2026</span>
            </div>
            <Link to="/" className="text-[13px] text-[#3C3C43]/45 hover:text-[#3C3C43]/70 transition-colors duration-200">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

/* ══════════════════════════════════════
   PAGE: LOGIN
══════════════════════════════════════ */
function LoginPage() {
  const { isAuth, login } = useAuth()
  const navigate = useNavigate()
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (isAuth) navigate('/about', { replace: true })
  }, [isAuth, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(pw)) {
      navigate('/about')
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
                <div className="w-12 h-12 rounded-full bg-[#007AFF] border border-[#007AFF]/30 flex items-center justify-center" style={{ boxShadow: '0 0 22px rgba(0,122,255,0.30)' }}>
                  <Lock size={20} className="text-white" />
                </div>
              </div>

              <h1 className="syne text-[1.5rem] font-semibold text-[#1C1C1E] text-center mb-1.5">Private access</h1>
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
                <Link to="/about" className="text-[12px] text-[#3C3C43]/50 hover:text-[#3C3C43]/70 transition-colors duration-200">
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

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}
