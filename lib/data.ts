export const DATA = {
  name: 'Mykyta Pantelei',
  mark: 'MP',
  role: 'Developer',
  location: 'Bern, CH',
  email: 'mykytapantelei@gmail.com',
  github: 'Fallka0',
  githubUrl: 'https://github.com/Fallka0',

  heroLead: "I'm Mykyta — a developer from Ukraine,",
  heroRest: ' *building my future* in Bern.',
  heroLede: "I solve real problems and genuinely enjoy the build. I came to Switzerland as a refugee — now I want to help shape where it's going.",
  heroMeta: [
    { k: 'Currently', v: 'Student @ bwd Bern' },
    { k: 'Based in',  v: 'Bern, CH' },
  ],

  workLead: 'Two projects',
  workRest: ' I *learned the most from.*',

  showcase: {
    duration: 5200,
    projects: {
      planary: {
        name: 'Planary',
        site: 'planary.ch',
        line: "A build with my classmates — half about the app, half about beating our own lack of discipline and finally learning to ship web apps the right way.",
        tags: ['Full-stack', 'Real-time', 'Auth', 'System design'],
      },
      milla: {
        name: 'Milla Homes',
        site: 'milla-homes.com',
        line: 'My own project for a real-estate agency. The brief I set myself: stick to a strict design system and ship something genuinely professional.',
        tags: ['Web', 'CMS', 'Multilingual', 'SEO'],
      },
    } as Record<string, { name: string; site: string; line: string; tags: string[] }>,
    slides: [
      { p: 'planary', screen: 'Dashboard',   url: 'planary.ch',                  safari: '/media/safari-dashboard.png',      phone: '/media/m-safari-dashboard.png' },
      { p: 'planary', screen: 'Tournamount', url: 'tournament.planary.ch',       safari: '/media/safari-tournamount.png',    phone: '/media/m-safari-tournamount.png' },
      { p: 'planary', screen: 'Wishlist',    url: 'wishlist.planary.ch',         safari: '/media/safari-wishlist.png',       phone: '/media/m-safari-wishlist.png' },
      { p: 'planary', screen: 'Auth',        url: 'auth.planary.ch',             safari: '/media/safari-auth.png',           phone: null },
      { p: 'milla',   screen: 'Home',        url: 'milla-homes.com',             safari: '/media/safari-milla-home.png',     phone: '/media/m-safari-milla-home.png' },
      { p: 'milla',   screen: 'Catalogue',   url: 'milla-homes.com/properties',  safari: '/media/safari-milla-listings.png', phone: '/media/m-safari-milla-listings.png' },
      { p: 'milla',   screen: 'Admin',       url: 'milla-homes.com/admin',       safari: '/media/safari-milla-admin.png',    phone: null },
    ],
  },

  aboutLead: 'I came here with *not much.*',
  aboutRest: " Now I *build* software, and I want to give something back to a country I've grown to *love.*",
  aboutBody: [
    "Ukrainian by birth, Bern by choice. I'm still a student at bwd Bern, but I treat every project like it matters — the work is how you earn trust.",
    "Off the clock I'm a pretty normal teenager: gym, basketball, games, a soft spot for watches. What I really care about, though, is people, leadership, and one day building something of my own.",
  ],
  stats: [
    { k: '4',      v: 'Languages I speak' },
    { k: 'UA → CH', v: 'Ukraine-born, Bern-based' },
  ],
  languages: [
    { name: 'Ukrainian', level: 'Native' },
    { name: 'Russian',   level: 'Native' },
    { name: 'English',   level: 'C1' },
    { name: 'German',    level: 'B2–C1' },
    { name: 'French',    level: 'B1' },
  ],

  howLead: 'How *I*',
  howRest: ' work.',
  principles: [
    { t: 'Trust goes both ways',  d: 'I give everyone trust and respect from the start. The people I click with give it right back.' },
    { t: "I build what I'd use",  d: 'I care most about problems I actually relate to — like the real-estate site I built because the space genuinely interests me.' },
    { t: 'Own it, end to end',    d: "I'd rather carry something from the first messy idea all the way to the thing that ships than hand it off halfway." },
    { t: 'Still leveling up',     d: 'Planary exists so my classmates and I can beat our own lack of discipline and get properly good at building for the web.' },
  ],

  techLead: 'I can read, debug',
  techRest: ' and reason about the *code I ship.*',
  techNote: 'I use AI as a thinking partner, not a shortcut. Every pattern I reach for, I understand — architecture, trade-offs, and all.',
  techStack: [
    { cat: 'Frontend',  items: ['React', 'Next.js', 'TypeScript', 'Vercel'] },
    { cat: 'Backend',   items: ['Go', 'Java', 'Python', 'C#', 'PHP'] },
    { cat: 'Database',  items: ['PostgreSQL', 'Redis', 'Neo4j', 'Supabase'] },
    { cat: 'Infra',     items: ['Docker', 'Git', 'Arduino'] },
    { cat: 'Design',    items: ['Figma'] },
    { cat: 'Workflow',  items: ['Obsidian'] },
  ],

  contactLead: 'Say',
  contactRest: ' *hi.*',
  contactNote: "No big pitch. If any of this clicked, come by my DMs or drop me an email — I'm easy to reach.",

  vaultValues: [
    {
      t: 'Learning is the job',
      d: "I expect to be taught — and I take that seriously. The faster I stop needing hand-holding, the better I'm doing my part.",
    },
    {
      t: 'I show up fully',
      d: "Punctual, prepared, honest about what I know and don't. I don't coast — if I'm in the room I'm contributing.",
    },
    {
      t: 'Communication over silence',
      d: "Stuck? I say so. Something looks wrong? I raise it. I'd rather have a slightly uncomfortable conversation than a preventable mistake.",
    },
    {
      t: 'I want to own something',
      d: "Even a small module, a test suite, a deployment script — something I built, maintain, and can be accountable for.",
    },
    {
      t: 'People first, always',
      d: "I pick companies where the team genuinely matters. I'll work harder for people who treat me like a colleague, not a resource.",
    },
  ],

  vaultCerts: [] as { name: string; file: string }[],
}

export const EXTRA_PROJECTS = [
  {
    num: '01',
    name: 'FreakDeck',
    year: '2024',
    cat: 'Hardware + Software',
    desc: 'Custom Arduino macro pad with a Python desktop companion app. Map the 9 physical buttons to apps, URLs, or folders; control system volume; display the current "Now Playing" track on the device screen. Firmware in Arduino C++, companion app packaged as a standalone Python client.',
    tags: ['Arduino', 'C++', 'Python', 'Hardware'],
    github: 'https://github.com/Fallka0/FreakDeck',
    live: null,
  },
  {
    num: '02',
    name: 'AutoBot Dashboard',
    year: '2025',
    cat: 'TypeScript · Next.js',
    desc: 'Monitoring dashboard for an algorithmic paper-trading system. Live portfolio overview, position tracker, decision feed, broker order lifecycle, and market context — built as a live-ready UI with mocked data before the real trading backend is wired up.',
    tags: ['Next.js', 'TypeScript', 'Vercel', 'Finance'],
    github: 'https://github.com/Fallka0/autobot-dashboard',
    live: 'https://autobot-dashboard.vercel.app',
  },
  {
    num: '03',
    name: 'EduMania',
    year: '2024',
    cat: 'AI · Education',
    desc: 'Interactive Trackmania Nations Forever plugin that teaches AI concepts hands-on. Students tune rewards, learning rates, and strategies and watch the car\'s behaviour change in real time — a game-based introduction to informatics and machine learning without any math barrier.',
    tags: ['Python', 'AI/ML', 'Education', 'Gaming'],
    github: 'https://github.com/Fallka0/EduMania',
    live: null,
  },
  {
    num: '04',
    name: 'Noten-Plus',
    year: '2023',
    cat: 'Desktop App · C#',
    desc: 'Grade management desktop app built in C#. Track marks per subject, calculate weighted averages, set target grades, and monitor academic progress over a semester — a practical tool built for real everyday use.',
    tags: ['C#', '.NET', 'WinForms'],
    github: 'https://github.com/Fallka0/Noten-Plus',
    live: null,
  },
  {
    num: '05',
    name: 'Fetch',
    year: '2023',
    cat: 'Web App · PHP',
    desc: 'Budget planning web app built in PHP. Log income and expenses, visualise spending by category, and track progress toward savings goals — an early full-stack project that sharpened my fundamentals before I moved into TypeScript.',
    tags: ['PHP', 'Web', 'Finance'],
    github: 'https://github.com/Fallka0/fetch',
    live: 'https://fetch-indol.vercel.app',
  },
  {
    num: '06',
    name: 'Caesar',
    year: '2023',
    cat: 'Tool · C#',
    desc: 'Caesar cipher encoder/decoder in C#. Encode and decode messages with any rotation key, with a clean WinForms UI. A focused exercise in cryptography fundamentals and C# string handling.',
    tags: ['C#', 'Cryptography', '.NET'],
    github: 'https://github.com/Fallka0/Caesar',
    live: null,
  },
]

export const TECH_CONFIG: Record<string, { icon: string; projects: { name: string; url: string }[] }> = {
  React:        { icon: 'react',        projects: [{ name: 'Planary', url: 'https://planary.ch' }, { name: 'Milla Homes', url: 'https://milla-homes.com' }] },
  'Next.js':    { icon: 'nextdotjs',    projects: [{ name: 'Milla Homes', url: 'https://milla-homes.com' }, { name: 'AutoBot Dashboard', url: 'https://autobot-dashboard.vercel.app' }] },
  TypeScript:   { icon: 'typescript',   projects: [{ name: 'Milla Homes', url: 'https://milla-homes.com' }, { name: 'AutoBot Dashboard', url: 'https://autobot-dashboard.vercel.app' }] },
  Vercel:       { icon: 'vercel',       projects: [{ name: 'Milla Homes', url: 'https://milla-homes.com' }, { name: 'AutoBot Dashboard', url: 'https://autobot-dashboard.vercel.app' }] },
  Go:           { icon: 'go',           projects: [{ name: 'Planary', url: 'https://planary.ch' }] },
  Java:         { icon: 'openjdk',      projects: [] },
  Python:       { icon: 'python',       projects: [{ name: 'FreakDeck', url: 'https://github.com/Fallka0/FreakDeck' }, { name: 'EduMania', url: 'https://github.com/Fallka0/EduMania' }] },
  'C#':         { icon: 'csharp',       projects: [{ name: 'Noten-Plus', url: 'https://github.com/Fallka0/Noten-Plus' }, { name: 'Caesar', url: 'https://github.com/Fallka0/Caesar' }] },
  PHP:          { icon: 'php',          projects: [{ name: 'Fetch', url: 'https://fetch-indol.vercel.app' }] },
  PostgreSQL:   { icon: 'postgresql',   projects: [{ name: 'Planary', url: 'https://planary.ch' }] },
  Redis:        { icon: 'redis',        projects: [{ name: 'Planary', url: 'https://planary.ch' }] },
  Neo4j:        { icon: 'neo4j',        projects: [] },
  Supabase:     { icon: 'supabase',     projects: [{ name: 'Milla Homes', url: 'https://milla-homes.com' }] },
  Docker:       { icon: 'docker',       projects: [{ name: 'Planary', url: 'https://planary.ch' }] },
  Git:          { icon: 'git',          projects: [{ name: 'Planary', url: 'https://planary.ch' }, { name: 'Milla Homes', url: 'https://milla-homes.com' }] },
  Arduino:      { icon: 'arduino',      projects: [{ name: 'FreakDeck', url: 'https://github.com/Fallka0/FreakDeck' }] },
  Figma:        { icon: 'figma',        projects: [{ name: 'Planary', url: 'https://planary.ch' }, { name: 'Milla Homes', url: 'https://milla-homes.com' }] },
  Obsidian:     { icon: 'obsidian',     projects: [] },
}
