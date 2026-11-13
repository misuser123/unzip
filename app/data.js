// All site content lives here. Edit freely.
export const ME = {
  name: 'Bharat Saini',
  email: 'sainib601@gmail.com',
  github: 'https://github.com/ibharatsaini',
  linkedin: 'https://linkedin.com/in/bharat-saini-300394169',
  hackerone: 'https://hackerone.com/aadhaoctopus',
  resume: '/Bharat_Saini_Resume.pdf',
  summary:
    'Full-stack developer with 3+ years of experience in TypeScript, MERN, Next.js, WebSockets, AWS, Jest, PostgreSQL and Prisma. Passionate about problem solving and unraveling the mysteries behind computer science.'
};

export const NAV = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' }
];

export const TECH = [
  { name: 'TypeScript', code: 'TS' },
  { name: 'Next.js', code: 'NX' },
  { name: 'React', code: 'RE' },
  { name: 'Node.js', code: 'ND' },
  { name: 'PostgreSQL', code: 'PG' },
  { name: 'Prisma', code: 'PR' },
  { name: 'Redis', code: 'RD' },
  { name: 'BullMQ', code: 'BQ' },
  { name: 'Playwright', code: 'PW' },
  { name: 'Docker', code: 'DK' }
];

export const FEATURES = [
  {
    icon: 'bolt',
    title: 'Fast by default',
    body: 'Cut application load time by 50% at Undef Studio through code splitting and frontend optimization.'
  },
  {
    icon: 'shield',
    title: 'Tested to hold',
    body: 'End-to-end and integration tests with Playwright and Jest that catch regressions before users do.'
  },
  {
    icon: 'layers',
    title: 'Built to scale',
    body: 'Multi-tenant architecture, Redis and BullMQ job queues, and role-based permissions in Automiq.'
  }
];

export const EXPERIENCE = [
  {
    role: 'Software Developer',
    company: 'Cyfuture, Noida',
    period: 'Aug 2026 — Present',
    current: true,
    points: []
  },
  {
    role: 'Software Engineer',
    company: 'Undef Studio, India',
    period: 'Jun 2023 — Feb 2026',
    current: false,
    points: [
      'Reduced application load time by 50% through frontend optimization, code splitting, and performance improvements.',
      'Contributed to a UI redesign and built reusable, type-safe components with Next.js, TypeScript, Tailwind CSS and Shadcn/UI, improving maintainability and development speed.',
      'Designed and optimized database interactions using Prisma ORM with PostgreSQL, and contributed to schema improvements.',
      'Wrote end-to-end and integration tests with Playwright and Jest, improving reliability and reducing regressions.',
      'Collaborated with designers and backend engineers to turn business requirements into scalable, user-focused features.'
    ]
  }
];

export const AUTOMIQ = {
  title: 'Automiq',
  kind: 'Workflow automation platform',
  live: 'https://automiq-workflow.vercel.app/',
  github: 'https://github.com/ibharatsaini/automiq-workflow',
  stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Redis', 'BullMQ', 'PostgreSQL', 'TanStack Query'],
  points: [
    'Visual workflow builder with webhook and schedule triggers, actions, conditional logic, and execution history.',
    'Distributed job execution engine on Redis and BullMQ, with retry mechanisms and background workers.',
    'Multi-tenant architecture with organization-level isolation and role-based permissions.',
    'Fault-tolerant, concurrent task processing, with real-time monitoring and detailed execution logs.'
  ]
};

// Add a `blurb` and/or `github` to any project and it will show up automatically.
export const OTHER_PROJECTS = [
  {
    title: 'CodeIQ',
    kind: 'Learning tools',
    blurb: 'An editor-first environment for practicing algorithms without the noise.',
    stack: ['TypeScript', 'Node.js', 'Playwright'],
    live: 'https://codeiq.vercel.app/',
    github: ''
  },
  {
    title: 'Mailgaurd',
    kind: 'Side project',
    blurb: '',
    stack: [],
    live: 'https://mailgaurd-app.vercel.app/',
    github: ''
  }
];

export const SKILLS = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'TanStack Query', 'Redux'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT'] },
  { group: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma ORM'] },
  { group: 'Tools', items: ['Git', 'Docker', 'Playwright', 'Jest'] }
];

export const EDUCATION = {
  degree: 'Bachelor of Computer Applications',
  school: 'Maharshi Dayanand University, Haryana',
  period: 'August 2022'
};
