import { Target, Zap, Users, Search, type LucideIcon } from 'lucide-react'

export const skills = [
  { label: 'TypeScript / JavaScript', level: 85 },
  { label: 'React & Next.js', level: 82 },
  { label: 'HTML & CSS / Tailwind', level: 90 },
  { label: 'Go & REST APIs', level: 65 },
  { label: 'Supabase & PostgreSQL', level: 70 },
  { label: 'Git & Version Control', level: 85 },
]

export const traits: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Target, title: 'Goal-oriented', desc: 'I set clear targets and work systematically to reach them.' },
  { Icon: Zap, title: 'Fast learner', desc: 'New technologies, frameworks, and concepts — I pick them up quickly.' },
  { Icon: Users, title: 'Team player', desc: 'Collaborative, communicative, and dependable in group settings.' },
  { Icon: Search, title: 'Detail-focused', desc: 'I care about quality — from code structure to the final pixel.' },
]

export interface ProjectData {
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

export const projects: ProjectData[] = [
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

export const row1Items = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'PostgreSQL', 'Go', 'Vite', 'REST APIs', 'JWT Auth']
export const row2Items = ['Vercel', 'Git & GitHub', 'Docker', 'PHP', 'C#', 'Node.js', 'SQL', 'HTML & CSS', 'Responsive Design', 'Authentication', 'Chart.js']
