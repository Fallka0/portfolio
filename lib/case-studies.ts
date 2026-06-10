export interface CsItem  { t: string; d: string }
export interface CsShot  { src: string; caption: string }

export interface CsSection {
  label:   string
  heading: string
  body:    string[]
  items?:  CsItem[]
  shots?:  CsShot[]
  list?:   string[]
}

export interface CaseStudy {
  slug:     string
  name:     string
  year:     string
  role:     string
  team:     string
  duration: string
  status:   'Live' | 'In progress' | 'Archived'
  url?:     string
  tagline:  string
  tags:     string[]
  overview: string
  hero:     string
  stats:    { k: string; v: string }[]
  sections: CsSection[]
}

export const CASE_STUDIES: CaseStudy[] = [

  // PLANARY
  {
    slug:     'planary',
    name:     'Planary',
    year:     '2024 – ongoing',
    role:     'Full-stack developer',
    team:     '3 classmates',
    duration: '6 months to first launch',
    status:   'Live',
    url:      'https://planary.ch',
    tagline:  "A platform my classmates and I built because school projects don't teach you to actually ship.",
    tags:     ['React', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'WebSockets'],
    overview: "Planary started as an honest answer to a frustration: school projects let you coast. You write code, demo it once, and nobody is accountable for what happens next. We wanted to know what real shipping feels like — where users notice when it breaks. The answer was to build a platform, put it on a real domain, and use it ourselves.",
    hero: '/media/safari-dashboard.png',
    stats: [
      { k: '4',   v: 'sub-apps shipped' },
      { k: '3',   v: 'person team' },
      { k: '6mo', v: 'idea to live' },
    ],
    sections: [
      {
        label:   'The problem',
        heading: "School builds don't hold you accountable.",
        body: [
          "You can fake progress in a school project. Miss a sprint, catch up the night before the demo, collect the grade. Nothing actually has to run tomorrow — so most of it doesn't. We kept finishing projects that were technically complete but practically useless, software that existed only long enough to be assessed.",
          "We wanted to break that pattern. The rule: everything goes on a real domain and real users — us — rely on it. If the auth service goes down, nobody logs in. That kind of pressure doesn't exist in a classroom. So we manufactured it.",
        ],
      },
      {
        label:   'Approach',
        heading: 'One auth layer. Four real products.',
        body: [
          "Rather than a single app, we decided to build a platform: a shared identity layer that any sub-app could plug into, then stack real tools on top. Each sub-app had to solve a problem we actually had, so we'd be honest users ourselves and notice when something broke or annoyed us.",
          "We chose Go for the backend — none of us had used it seriously before. That was intentional. Learning a new language under real delivery pressure is very different from learning it in tutorials, and we wanted the hard version.",
        ],
      },
      {
        label:   'What I built',
        heading: 'Four sub-apps, one sign-on.',
        body: [
          'Each sub-app is independently deployed but shares the same auth context. Log in once at auth.planary.ch and your session carries across all apps automatically.',
        ],
        items: [
          { t: 'Auth',        d: 'Single sign-on service across all sub-apps. JWT with refresh tokens, cross-subdomain cookie propagation, and a centralised user store. Any new sub-app gets authentication for free.' },
          { t: 'Dashboard',   d: 'The hub after login. Aggregates recent activity, links to all sub-apps, shows quick stats. The front door of the platform.' },
          { t: 'Tournamount', d: 'Tournament bracket manager. Create brackets, seed participants, record results. Matches update in real-time via WebSockets — built for and used in our class gaming sessions.' },
          { t: 'Wishlist',    d: 'Collaborative wishlist with real-time sync. Multiple users, shared lists, live updates. Built to stop us sending Amazon links over Discord.' },
        ],
        shots: [
          { src: '/media/safari-tournamount.png', caption: 'Tournamount — live bracket updates via WebSockets' },
          { src: '/media/safari-wishlist.png',    caption: 'Wishlist — real-time collaborative lists' },
        ],
      },
      {
        label:   'Technical decisions',
        heading: 'Why these tools.',
        body: [
          'Every major decision was made deliberately, usually after trying the obvious thing first and finding it wanting.',
        ],
        items: [
          { t: 'Go on the backend', d: "Wanted explicit error handling and compile-time guarantees after fighting JavaScript's permissiveness. Go's goroutine model turned out to be a natural fit for WebSocket fan-out — each connection gets a goroutine, channels handle broadcast." },
          { t: 'Redis pub/sub',     d: 'Real-time updates go through Redis pub/sub channels keyed by resource ID. WebSocket handlers subscribe on connection and unsubscribe on close. Clean separation between transport and storage.' },
          { t: 'PostgreSQL',        d: 'Tournament brackets are relational by nature — rounds, matches, participants, outcomes with foreign key chains. Tried to model this with Redis alone first. Gave up quickly. Postgres was the right call from the start.' },
          { t: 'Docker Compose',    d: "Local dev must match production exactly. We've had zero works-on-my-machine incidents since we standardised on Compose for every service from day one." },
        ],
      },
      {
        label:   'What I learned',
        heading: 'The honest retrospective.',
        body: [],
        list: [
          'Distributed auth has more edge cases than you expect. Concurrent refresh token requests, cross-subdomain cookie propagation, and logging out everywhere are each simple in isolation — together they multiply.',
          "Go's concurrency model changed how I think about concurrent code. Goroutines are cheap; the mental model of ownership via channels is cleaner and more explicit than I expected from a systems language.",
          'Team velocity is not linear. Three people communicating poorly ship slower than one person. We got much better at short async decisions and not blocking on full consensus for small choices.',
          'Ship the ugly version. The embarrassing build we had at week two was the most useful thing we made. Actually using it ourselves shaped everything that came after it — far more than any planning session did.',
        ],
      },
    ],
  },

  // MILLA HOMES
  {
    slug:     'milla-homes',
    name:     'Milla Homes',
    year:     '2024',
    role:     'Solo developer & designer',
    team:     'Just me',
    duration: '~6 weeks',
    status:   'Live',
    url:      'https://milla-homes.com',
    tagline:  'A real-estate portal I gave myself one rule to build: make it actually professional.',
    tags:     ['Next.js', 'TypeScript', 'Supabase', 'ISR', 'i18n', 'SEO'],
    overview: "Milla Homes is a property portal I designed and built solo for a real-estate agency. Most property sites in Switzerland are functional and forgettable — dense, slow, built without much thought for the person searching for a home. I wanted to prove one developer, working carefully, could ship something genuinely professional. One self-imposed rule: every design decision comes from a written system, not from intuition in the moment.",
    hero: '/media/safari-milla-home.png',
    stats: [
      { k: '1',   v: 'developer (me)' },
      { k: '3',   v: 'languages' },
      { k: '~6w', v: 'design to launch' },
    ],
    sections: [
      {
        label:   'The problem',
        heading: 'Swiss property sites are functional and forgettable.',
        body: [
          "Browse real-estate portals in Switzerland and most feel like database dumps with a stylesheet. Dense listing grids, inconsistent spacing, property photos in random aspect ratios, and no apparent thought for how someone actually searches for a home. The technical bar is low; the design bar is lower.",
          "I wanted to see what a single developer with a real design process could ship in a constrained timeframe. The brief I set: strict design system before any code, multilingual from day one — Switzerland has four language regions — and a CMS so the client can update listings without ever calling a developer.",
        ],
      },
      {
        label:   'Approach',
        heading: 'Figma first. Always.',
        body: [
          'I spent the first week entirely in Figma: typography scale (two typefaces, six sizes), spacing system on an 8px grid, every component variant — property card, filter pill, photo gallery, nav states. No VS Code until the system was done.',
          "The rule held throughout: if a decision isn't in the design system, it doesn't go in the product. This felt slow at first. By week three, every new page took half the time because every decision had already been made. Design systems pay for themselves.",
        ],
      },
      {
        label:   'What I built',
        heading: 'Listings, search, three languages, and an admin that actually gets used.',
        body: [
          'Four distinct surfaces, each with different requirements and different users.',
        ],
        items: [
          { t: 'Property listings',    d: 'Filterable by type (sale / rent), price range, and location. Built with ISR — pages pre-rendered at deploy, revalidated automatically when the admin saves a new or edited listing.' },
          { t: 'Property detail',      d: 'Photo gallery with lazy loading, full specs, location, and a contact form that routes enquiries directly to the agent. Structured data (RealEstateAgent + Product schema) baked in for SEO.' },
          { t: 'Multilingual routing', d: 'German, English, and French. Language auto-detected on first visit, switchable via nav at any point. Each locale has its own URL path and its own sitemap entry for indexing.' },
          { t: 'Admin panel',          d: 'Protected by Supabase Auth. Create, edit, and archive listings. Upload and reorder photos via Supabase Storage. View and respond to inbound enquiries. Zero developer involvement for content.' },
        ],
        shots: [
          { src: '/media/safari-milla-listings.png', caption: 'Listings — filter by type, price, location' },
          { src: '/media/safari-milla-admin.png',    caption: 'Admin — manage listings and enquiries' },
        ],
      },
      {
        label:   'Technical decisions',
        heading: 'Why these tools.',
        body: [
          'A handful of architectural choices defined the whole project.',
        ],
        items: [
          { t: 'Next.js + ISR', d: 'Property pages need fast reads for users and search engines, but listings update infrequently. ISR with revalidatePath on admin save is exactly what this pattern was designed for.' },
          { t: 'Supabase',      d: 'One platform for PostgreSQL (listings data), Storage (property photos), and Auth (admin access). Row-level security means the public API literally cannot write — only the authenticated admin role can.' },
          { t: 'next-intl',     d: 'i18n in the App Router has real gotchas with server/client component boundaries and serialisation. next-intl handles these cleanly and generates per-locale static paths at build time.' },
          { t: 'Vercel',        d: 'ISR pages served from the edge cache globally. Deploy previews on every branch meant I could review design on a real URL before merging — genuinely useful even working solo.' },
        ],
      },
      {
        label:   'What I learned',
        heading: 'The honest retrospective.',
        body: [],
        list: [
          'Design systems pay for themselves. The week in Figma felt like a tax on delivery. By week four, every new component took 20 minutes because the decisions — spacing, colour, type — were already made.',
          "Cache invalidation needs to be mapped before you build it. When the admin saves a listing, what paths revalidate? The detail page, the listings index, the sitemap. Figure that out upfront, not after you've shipped stale data.",
          'Supabase RLS is powerful but takes real time to internalise. Policies are SQL expressions that run on every query — elegant once the mental model clicks, mysterious until it does.',
          "Real clients use 40% of what you design. The admin I shipped had fewer features than I prototyped. Those are the features that get used every week. Shipping less, sooner, is almost always the right call.",
        ],
      },
    ],
  },
]
