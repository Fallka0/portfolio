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

  /* Card content for the vault documents. The PDFs themselves are not in
     /public — each `id` is fetched through /api/vault/doc/[id], which only
     answers for a session that passed the access code. */
  vaultDocs: [
    {
      id: 'bm-zeugnis',
      title: 'Berufsmaturität',
      kind: 'School report',
      issuer: 'bwd Informatikmittelschule Bern',
      date: 'July 2026',
      grade: '5.4',
      gradeNote: 'Durchschnitt',
      summary:
        'Informatiker EFZ Applikationsentwicklung mit BM 1, Wirtschaft und Dienstleistungen (Typ Wirtschaft), class IM24A. Grades below are the most recent semester; promoted in every semester so far.',
      groups: [
        {
          label: 'Grundlagenbereich',
          rows: [
            { k: 'Mathematik', v: '6.0' },
            { k: 'Englisch', v: '5.5' },
            { k: 'Informatik (gibb)', v: '5.5' },
            { k: 'Deutsch', v: '5.0' },
            { k: 'Französisch', v: '5.0' },
          ],
        },
        {
          label: 'Schwerpunkt & Ergänzung',
          rows: [
            { k: 'Finanz- und Rechnungswesen', v: '5.5' },
            { k: 'Technik und Umwelt', v: '5.5' },
            { k: 'Wirtschaft und Recht', v: '5.0' },
            { k: 'Geschichte und Politik', v: '5.0' },
          ],
        },
        {
          label: 'Weitere',
          rows: [
            { k: 'Sport', v: '6.0' },
            { k: 'Interdisziplinäres Arbeiten', v: '5.5' },
            { k: 'Promotion', v: 'promoviert' },
          ],
        },
      ],
    },
    {
      id: 'inf-zeugnis',
      title: 'Informatik',
      kind: 'School report',
      issuer: 'gibb Berufsfachschule Bern',
      date: 'July 2026',
      grade: '5.5',
      gradeNote: 'Erfahrungsnote',
      summary:
        'Informatiker EFZ Applikationsentwicklung, class INF2024i. Every module graded across the apprenticeship so far.',
      groups: [
        {
          label: 'Informatikkompetenzen',
          rows: [
            { k: '319 Applikationen entwerfen und implementieren', v: '6.0' },
            { k: '122 Abläufe mit einer Scriptsprache automatisieren', v: '6.0' },
            { k: '114 Codierungs-, Kompressions- und Verschlüsselungsverfahren', v: '6.0' },
            { k: '293 Webauftritt erstellen und veröffentlichen', v: '6.0' },
            { k: '165 NoSQL-Datenbanken einsetzen', v: '6.0' },
            { k: '347 Dienst mit Container anwenden', v: '6.0' },
            { k: '254 Geschäftsprozesse im eigenen Berufsumfeld beschreiben', v: '6.0' },
            { k: '431 Aufträge im eigenen Berufsumfeld selbständig durchführen', v: '5.5' },
            { k: '117 Informatik- und Netzinfrastruktur realisieren', v: '5.5' },
            { k: '164 Datenbanken erstellen und Daten einfügen', v: '5.5' },
            { k: '320 Objektorientiert programmieren', v: '5.5' },
            { k: '346 Cloud Lösungen konzipieren und realisieren', v: '5.5' },
            { k: '322 Benutzerschnittstellen entwerfen und implementieren', v: '5.5' },
            { k: '162 Daten analysieren und modellieren', v: '5.0' },
            { k: '231 Datenschutz und Datensicherheit anwenden', v: '5.0' },
            { k: '426 Software mit agilen Methoden entwickeln', v: '5.0' },
          ],
        },
        {
          label: 'Überbetriebliche Kurse',
          rows: [
            { k: '187 ICT-Arbeitsplatz in Betrieb nehmen', v: '6.0' },
            { k: '106 Datenbanken abfragen, bearbeiten und warten', v: '5.5' },
            { k: '294 Frontend einer interaktiven Webapplikation', v: '5.5' },
            { k: '295 Backend für Applikationen realisieren', v: '4.0' },
          ],
        },
      ],
    },
    {
      id: 'uek-335',
      title: 'Modul 335',
      kind: 'Kompetenznachweis üK',
      issuer: 'ICT-Berufsbildung Bern',
      date: 'June–July 2026',
      grade: '5.5',
      gradeNote: 'Modulnote',
      summary:
        'Mobile-Applikation realisieren — five-day inter-company course, class 335-AE-IMS-24.',
      groups: [
        {
          label: 'Selbst- und Sozialkompetenzen',
          rows: [
            { k: 'Kommunikation und Initiative', v: '6' },
            { k: 'Kursbeteiligung und Interesse', v: '5' },
            { k: 'Selbständigkeit', v: '5' },
            { k: 'Arbeitsqualität, Einsatz und Ausdauer', v: '5' },
            { k: 'Umgang mit Infrastruktur', v: '5' },
            { k: 'Auftreten und Umgangsformen', v: '5' },
            { k: 'Teamfähigkeit', v: '5' },
          ],
        },
      ],
    },
    {
      id: 'uek-106',
      title: 'Modul 106',
      kind: 'Kompetenznachweis üK',
      issuer: 'ICT-Berufsbildung Bern',
      date: 'March 2025',
      grade: '5.5',
      gradeNote: 'Modulnote',
      summary:
        'Datenbanken abfragen, bearbeiten und warten — five-day inter-company course under Christian Feuz.',
      groups: [
        {
          label: 'Allgemeine Rückmeldungen',
          rows: [
            { k: 'Ist teamfähig', v: '++' },
            { k: 'Zeigt Interesse, ist aktiv dabei', v: '+' },
            { k: 'Hat gute Umgangsformen', v: '+' },
            { k: 'Arbeitet selbständig', v: '+' },
          ],
        },
      ],
    },
    {
      id: 'uek-187',
      title: 'Modul 187',
      kind: 'Kompetenznachweis üK',
      issuer: 'ICT-Berufsbildung Bern',
      date: 'September 2024',
      grade: '6.0',
      gradeNote: 'Modulnote',
      summary:
        'ICT-Arbeitsplatz mit Betriebssystem in Betrieb nehmen — five-day inter-company course under Daniel Meyer, no absences.',
      note: 'Mykyta war sehr engagiert, sein Interesse an der Informatik war deutlich zu spüren. Sehr gute Fragequalität.',
      groups: [
        {
          label: 'Allgemeine Rückmeldungen',
          rows: [
            { k: 'Zeigt Interesse, ist aktiv dabei', v: '+' },
            { k: 'Lässt sich wenig ablenken', v: '+' },
            { k: 'Ist teamfähig', v: '+' },
            { k: 'Hat gute Umgangsformen', v: '+' },
            { k: 'Arbeitet selbständig', v: '+' },
          ],
        },
      ],
    },
  ],
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
