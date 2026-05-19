import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
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
  ExternalLink,
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
  useMotionValue,
  useSpring,
  useInView,
  type MotionValue,
} from 'framer-motion'
import './index.css'

/* ══════════════════════════════════════
   AUTH
══════════════════════════════════════ */
// Change this to your preferred password.
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
   CURSOR (desktop only)
══════════════════════════════════════ */
function CustomCursor() {
  const x = useMotionValue(-120)
  const y = useMotionValue(-120)
  const ringX = useSpring(x, { damping: 22, stiffness: 280, mass: 0.6 })
  const ringY = useSpring(y, { damping: 22, stiffness: 280, mass: 0.6 })
  const [isTouch, setIsTouch] = useState(false)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setIsHover(
        el.closest('a, button, [role="button"]') !== null ||
        el.tagName === 'A' || el.tagName === 'BUTTON'
      )
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (isTouch) return null

  return (
    <>
      {/* Dot — precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ scale: isHover ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-[6px] h-[6px] rounded-full bg-violet-300"
        />
      </motion.div>
      {/* Ring — lagging */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: isHover ? 44 : 28,
            height: isHover ? 44 : 28,
            borderColor: isHover ? 'rgba(167,139,250,0.55)' : 'rgba(255,255,255,0.2)',
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
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
      {char === ' ' ? ' ' : char}
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
  const inner = (
    <span
      className={`group inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 cursor-pointer ${
        dark ? 'liquid-glass-btn text-white/80' : 'liquid-glass-btn text-white'
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
  if (to) return <Link to={to}>{inner}</Link>
  if (href)
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    )
  return (
    <button type={type ?? 'button'} onClick={onClick}>
      {inner}
    </button>
  )
}

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
   SHARED NAVBAR (secondary pages)
══════════════════════════════════════ */
function SharedNavbar() {
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

  return (
    <>
      <nav className="sticky top-0 z-40 px-4 sm:px-6 py-3 bg-[#0c0718]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center">
              <div
                className="w-9 h-9 rounded-full bg-violet-600 border border-violet-400/40 flex items-center justify-center"
                style={{ boxShadow: '0 0 18px rgba(124,58,237,0.5)' }}
              >
                <span className="text-white text-[11px] font-bold tracking-tight syne">MP</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-5">
              {links.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-[14px] transition-colors duration-300 ${
                    isActive(to)
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[13px] text-white/45">
              <Clock size={12} />
              {time}
            </span>
            {isAuth ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-[12px] text-violet-300/60 hover:text-violet-300 transition-colors duration-200"
              >
                <LogOut size={13} />
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-[12px] text-violet-300/60 hover:text-violet-300 transition-colors duration-200"
              >
                <Lock size={12} />
                Private
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden liquid-glass-btn rounded-full p-2 text-white"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-3 right-3 mb-3 rounded-2xl navbar-glass p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[13px] text-white/50">{time} Bern</span>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-white/65"
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
                className="text-[26px] font-medium syne text-white/80 hover:text-white py-1 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          {isAuth ? (
            <button
              onClick={() => { logout(); setOpen(false) }}
              className="flex items-center gap-2 text-[13px] text-violet-300/60"
            >
              <LogOut size={13} /> Sign out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[13px] text-violet-300/60"
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
    title: 'Verdant Realty',
    category: 'Full-Stack App',
    desc: 'Property portal for the Torrevieja region. Public listings with search and filtering, individual property pages with inquiry forms, and a private admin panel for managing inventory, pricing, and availability.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    href: 'https://verdant-realty.vercel.app',
    img1: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=80',
  },
  {
    num: '02',
    title: 'Tournamount',
    category: 'Platform',
    desc: 'Tournament management for gaming communities. Organizers create brackets and manage rosters across group stage, knockout, and hybrid formats. Players track standings in real time.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Framer Motion'],
    href: 'https://m294-d5ns.vercel.app',
    img1: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80',
  },
  {
    num: '03',
    title: 'Planary',
    category: 'Full-Stack App',
    desc: 'Wishlist sharing platform with a React + Vite frontend, Go backend deployed as Vercel functions, and PostgreSQL for persistent storage. Secure auth via HTTP-only cookies with a standalone dashboard.',
    tags: ['React', 'Go', 'PostgreSQL', 'Vite'],
    href: 'https://planary-wishlist.vercel.app',
    img1: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=900&q=80',
  },
  {
    num: '04',
    title: 'AutoBot Dashboard',
    category: 'Dashboard',
    desc: 'Live monitoring UI for a paper trading bot. Displays portfolio positions, broker order lifecycle, decision feed, and market context. Vercel-ready Next.js shell designed to wire into a real backend.',
    tags: ['Next.js', 'TypeScript', 'Vercel'],
    href: 'https://autobot-dashboard.vercel.app',
    img1: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    img2: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&q=80',
    img3: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=80',
  },
]

const row1Items = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'PostgreSQL', 'Go', 'Vite', 'REST APIs', 'JWT Auth']
const row2Items = ['Vercel', 'Git & GitHub', 'Docker', 'PHP', 'C#', 'Node.js', 'SQL', 'HTML & CSS', 'Responsive Design', 'Authentication', 'Chart.js']

/* ══════════════════════════════════════
   PROJECT CARD (stacking)
══════════════════════════════════════ */
function ProjectCard({ project, index, total }: { project: ProjectData; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    // Reduced from h-[85vh] → h-[60vh] for tighter spacing between cards
    <div ref={containerRef} className="h-[60vh]">
      <motion.div
        style={{ scale, position: 'sticky', top: 80 + index * 24, transformOrigin: 'top center' }}
        className="w-full rounded-[24px] sm:rounded-[32px] border border-white/8 bg-[#0d0b1e] p-4 sm:p-5 glass-card"
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <span
              className="syne font-bold text-white/10 leading-none select-none"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
            >
              {project.num}
            </span>
            <div>
              <p className="text-[10px] text-violet-300/50 tracking-widest uppercase mb-0.5">
                {project.category}
              </p>
              <p className="syne font-semibold text-white leading-tight" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.45rem)' }}>
                {project.title}
              </p>
            </div>
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 liquid-glass-btn rounded-full px-3.5 py-1.5 text-[11px] text-white/60 font-medium tracking-widest uppercase hover:text-white transition-colors duration-300"
          >
            Live <ExternalLink size={10} className="ml-0.5" />
          </a>
        </div>

        {/* Image grid */}
        <div className="flex gap-2.5 sm:gap-3" style={{ height: 'clamp(180px, 30vh, 300px)' }}>
          <div className="w-[36%] flex flex-col gap-2.5 sm:gap-3">
            <div className="flex-1 rounded-xl overflow-hidden glass-card">
              <img src={project.img1} alt="" className="w-full h-full object-cover opacity-65 hover:opacity-85 transition-opacity duration-500" loading="lazy" />
            </div>
            <div className="flex-[1.3] rounded-xl overflow-hidden glass-card">
              <img src={project.img2} alt="" className="w-full h-full object-cover opacity-65 hover:opacity-85 transition-opacity duration-500" loading="lazy" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 sm:gap-3">
            <div className="flex-1 rounded-xl overflow-hidden glass-card">
              <img src={project.img3} alt={project.title} className="w-full h-full object-cover opacity-65 hover:opacity-85 transition-opacity duration-500" loading="lazy" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[12px] leading-relaxed text-white/40 mb-2 line-clamp-2">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full glass-card text-violet-300/60">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile meta */}
        <div className="sm:hidden mt-2.5">
          <p className="text-[11px] leading-relaxed text-white/40 mb-2 line-clamp-2">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass-card text-violet-300/60">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
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
          <div key={i} className="flex-shrink-0 glass-card rounded-full px-5 py-2.5 text-[13px] font-medium text-white/50 whitespace-nowrap">
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="bg-[#0c0718] pt-16 pb-8 overflow-hidden">
      <FadeIn y={16} delay={0}>
        <p className="text-[11px] text-violet-300/35 font-medium tracking-widest uppercase text-center mb-7">
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
  const time = useClock()
  const { isAuth } = useAuth()
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '40%' })
  const handleHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setSpotlight({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` })
  }
  const navLinks = [
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col aurora-bg overflow-hidden"
        onMouseMove={handleHeroMove}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-all duration-75"
          style={{
            background: `radial-gradient(480px circle at ${spotlight.x} ${spotlight.y}, rgba(139,92,246,0.11) 0%, transparent 65%)`,
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb-1 absolute top-[12%] left-[8%] w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[110px]" />
          <div className="orb-2 absolute top-[45%] right-[3%] w-[420px] h-[420px] rounded-full bg-purple-500/14 blur-[95px]" />
          <div className="orb-3 absolute bottom-[8%] left-[38%] w-[360px] h-[360px] rounded-full bg-indigo-600/14 blur-[85px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <FadeIn delay={0} y={-20} className="relative z-20">
          <nav className="px-4 sm:px-6 pt-4 sm:pt-5">
            <div className="max-w-[1440px] mx-auto">
              <div className="navbar-glass rounded-full px-2 py-1.5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-violet-600 border border-violet-400/40 flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: '0 0 20px rgba(124,58,237,0.55)' }}
                  >
                    <span className="text-white text-[11px] font-bold tracking-tight syne">MP</span>
                  </div>
                  <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(({ label, to }) => (
                      <Link key={to} to={to} className="text-[14px] text-white/65 hover:text-white transition-colors duration-300">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <span className="hidden lg:block text-[13px] text-white/40">Open to apprenticeships</span>
                  <span className="flex items-center gap-1.5 text-[13px] text-white/50">
                    <Clock size={13} />{time} Bern
                  </span>
                  {isAuth ? (
                    <Link to="/about" className="flex items-center gap-1.5 text-[12px] text-violet-300 liquid-glass-btn rounded-full px-4 py-2">
                      <Lock size={11} /> Private view
                    </Link>
                  ) : (
                    <GlassButton to="/contact">Get in touch</GlassButton>
                  )}
                </div>
                <Link to="/projects" className="md:hidden liquid-glass-btn rounded-full px-3 py-2 text-[12px] text-white/70 font-medium">
                  Projects
                </Link>
              </div>
            </div>
          </nav>
        </FadeIn>

        <div className="relative z-20 flex-1 flex flex-col justify-end max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <FadeIn delay={0.05} y={20}>
            <p className="text-[13px] sm:text-[14px] text-violet-300/75 tracking-[0.18em] uppercase mb-5 sm:mb-8 syne">
              Mykyta · Developer · Bern, CH
            </p>
          </FadeIn>
          <FadeIn delay={0.15} y={40}>
            <h1 className="syne font-medium leading-[1.06] tracking-[-0.03em] text-white mb-8 sm:mb-10" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.8rem)' }}>
              Hi, I'm Mykyta —
              <br className="hidden sm:block" /><span className="sm:hidden"> </span>
              building things that
              <br className="hidden sm:block" /><span className="sm:hidden"> </span>
              actually ship.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <GlassButton to="/projects">View my work</GlassButton>
              <div className="group inline-flex items-center gap-2.5 glass-card rounded-2xl px-4 py-2.5 cursor-default hover:border-violet-400/28 transition-all duration-300">
                <StarburstIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-violet-400/75 flex-shrink-0" />
                <span className="text-[13px] sm:text-[14px] font-medium text-white/75">Seeking Apprenticeship</span>
                <span className="text-[10px] sm:text-[11px] bg-violet-600/70 backdrop-blur-sm border border-violet-400/30 text-white px-1.5 sm:px-2 py-0.5 rounded-full font-medium">2026</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0718] to-transparent pointer-events-none z-10" />
      </section>

      {/* ── Tech Marquee ── */}
      <TechMarquee />

      {/* ── Skills overview ── */}
      <section id="skills" className="bg-[#0e0a20] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-violet-800/10 blur-[110px]" />
        </div>
        <div className="max-w-[1440px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="01" label="What I bring" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h2 className="syne font-medium leading-[1.08] tracking-[-0.03em] text-white mb-12 sm:mb-16 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.6rem)' }}>
              Skills &amp; strengths
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 px-5 sm:px-8 lg:px-12">
            <div>
              <p className="text-[12px] text-violet-300/55 font-medium tracking-widest uppercase mb-6">Technical</p>
              <div className="space-y-5">
                {skills.map(({ label, level }, i) => (
                  <FadeIn key={label} delay={i * 0.08} y={16}>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[14px] text-white/78 font-medium">{label}</span>
                        <span className="text-[12px] text-violet-300/55"><CountUp to={level} />%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                          style={{ background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', boxShadow: '0 0 10px rgba(124,58,237,0.6)' }}
                        />
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] text-violet-300/55 font-medium tracking-widest uppercase mb-6">Character</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {traits.map(({ Icon, title, desc }, i) => (
                  <FadeIn key={title} delay={i * 0.1} y={20}>
                    <div className="glass-card rounded-2xl p-5 hover:border-violet-400/22 transition-all duration-300">
                      <Icon size={20} className="text-violet-400/75 mb-3" />
                      <p className="text-[14px] font-semibold text-white mb-1.5 syne">{title}</p>
                      <p className="text-[13px] leading-[1.65] text-white/50">{desc}</p>
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
      <SharedNavbar />
      <section className="bg-[#0c0718] pt-12 pb-8 relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-800/10 blur-[120px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="02" label="Selected work" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h1 className="syne font-medium leading-[1.08] tracking-[-0.03em] text-white mb-10 sm:mb-12 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}>
              My projects
            </h1>
          </FadeIn>
          <div className="px-5 sm:px-8 lg:px-12">
            {projects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} total={projects.length} />
            ))}
          </div>
          {/* Extra scroll room after last card */}
          <div className="h-32" />
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
      <SharedNavbar />
      <section className="bg-[#0c0718] pt-12 pb-24 relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-violet-900/10 blur-[130px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="03" label="About me" />
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h1 className="syne font-medium leading-[1.12] tracking-[-0.02em] text-white mb-12 sm:mb-16 lg:mb-20 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)' }}>
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
                <div className="aspect-[438/346] rounded-2xl overflow-hidden glass-card">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Developer at work" className="w-full h-full object-cover opacity-75" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} y={20}>
                <div className="flex flex-col items-start">
                  <AnimatedText text={ABOUT_PUBLIC} className="text-[15px] sm:text-[17px] leading-[1.75] font-light text-white/65 mb-8 max-w-xl" />
                  <GlassButton to="/contact">Let's connect</GlassButton>
                </div>
              </FadeIn>
              <FadeIn delay={0.25} x={40} y={0} className="hidden lg:block">
                <div className="aspect-[3/2] rounded-2xl overflow-hidden glass-card">
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80" alt="Code on screen" className="w-full h-full object-cover opacity-75" />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Private section */}
          <div className="px-5 sm:px-8 lg:px-12">
            <div className="border-t border-white/8 pt-12">
              {isAuth ? (
                <FadeIn delay={0} y={20}>
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-violet-600/60 border border-violet-400/30 flex items-center justify-center">
                          <Lock size={12} className="text-violet-200" />
                        </div>
                        <span className="text-[13px] text-violet-300/70 font-medium tracking-widest uppercase">Private information</span>
                      </div>
                      <button onClick={logout} className="flex items-center gap-1.5 text-[12px] text-white/30 hover:text-white/60 transition-colors">
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
                        <div key={label} className="glass-card rounded-2xl p-5 border border-violet-400/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={14} className="text-violet-400/60" />
                            <span className="text-[11px] text-violet-300/50 tracking-widest uppercase font-medium">{label}</span>
                          </div>
                          <p className="text-[14px] text-white/80 font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 glass-card rounded-2xl p-5 border border-violet-400/10">
                      <p className="text-[11px] text-violet-300/50 tracking-widest uppercase font-medium mb-3">Additional notes</p>
                      <p className="text-[14px] text-white/65 leading-relaxed">
                        Available to start an apprenticeship from August 2026. Prefer companies working with modern web stacks — React, Next.js, TypeScript, Go. Comfortable in German and English. Based in Bern; open to Bern and greater Bern region.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0} y={20}>
                  <div className="flex flex-col items-center text-center py-16">
                    <div className="w-14 h-14 rounded-full glass-card border border-violet-400/20 flex items-center justify-center mb-6">
                      <Lock size={22} className="text-violet-400/60" />
                    </div>
                    <h3 className="syne text-[1.3rem] font-semibold text-white mb-3">Private section</h3>
                    <p className="text-[14px] text-white/45 leading-relaxed max-w-sm mb-8">
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
      <SharedNavbar />
      <section className="bg-[#0e0a20] pt-12 pb-20 sm:pb-28 lg:pb-36 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-700/10 blur-[140px]" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="04" label="Get in touch" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h1 className="syne font-medium leading-[1.08] tracking-[-0.03em] text-white mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12" style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}>
              Let's work together
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <p className="text-[15px] sm:text-[17px] leading-[1.7] text-white/50 mb-10 max-w-lg font-light px-5 sm:px-8 lg:px-12">
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
                <div key={label} className="glass-card rounded-2xl p-5 group hover:border-violet-400/22 transition-all duration-300">
                  <Icon size={16} className="text-violet-400/60 mb-3" />
                  <p className="text-[11px] text-violet-300/50 tracking-widest uppercase font-medium mb-1">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[14px] text-white/70 group-hover:text-white transition-colors duration-200">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[14px] text-white/70">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Footer */}
          <div className="border-t border-white/7 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600/75 border border-violet-400/30 flex items-center justify-center" style={{ boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}>
                <span className="text-white text-[10px] font-bold syne">MP</span>
              </div>
              <span className="text-[13px] text-white/35">Mykyta Pantelei · 2026</span>
            </div>
            <Link to="/" className="text-[13px] text-white/25 hover:text-white/50 transition-colors duration-200">
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
      <SharedNavbar />
      <section className="bg-[#0c0718] min-h-[calc(100vh-64px)] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-700/12 blur-[130px]" />
        </div>

        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-sm"
        >
          <FadeIn delay={0} y={24}>
            <div className="glass-card rounded-3xl p-8 border border-white/10">
              <div className="flex justify-center mb-7">
                <div className="w-12 h-12 rounded-full bg-violet-600/70 border border-violet-400/30 flex items-center justify-center" style={{ boxShadow: '0 0 28px rgba(124,58,237,0.45)' }}>
                  <Lock size={20} className="text-white" />
                </div>
              </div>

              <h1 className="syne text-[1.5rem] font-semibold text-white text-center mb-1.5">Private access</h1>
              <p className="text-[13px] text-white/40 text-center mb-8 leading-relaxed">
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
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-violet-400/50 transition-colors duration-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12px] text-red-400/80 text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <GlassButton type="submit" className="w-full justify-center">
                  Sign in
                </GlassButton>
              </form>

              <div className="mt-6 pt-5 border-t border-white/8 text-center">
                <Link to="/about" className="text-[12px] text-white/30 hover:text-white/55 transition-colors duration-200">
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
  return (
    <HashRouter>
      <AuthProvider>
        {/* Film-grain overlay — subtle texture across all pages */}
        <div className="grain-overlay" aria-hidden="true" />
        {/* Custom cursor — desktop only */}
        <CustomCursor />
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
