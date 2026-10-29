// Honors, hackathons and publications. Add a new entry at the top of the array.

export interface Achievement {
  id: string;
  title: string;
  rank: string;
  date: string;
  organizer: string;
  type: 'hackathon' | 'publication' | 'competition';
  description: string;
  highlights: string[];
  features?: string[];
  team?: string[];
  technologies?: string[];
  link?: string;
  tier: 'research' | 'winner' | 'top10' | 'top20' | 'top25' | 'participation';
  /** Headline numbers shown big on the featured card (value is a number, e.g. 93 + '%'). */
  metrics?: { value: number; suffix?: string; label: string }[];
}

export const achievements: Achievement[] = [
  // RESEARCH PUBLICATION
  {
    id: 'research1',
    title: 'IEEE TENCON 2026',
    rank: 'PUBLISHED',
    date: '2026',
    organizer: 'IEEE Region 10 (Asia-Pacific) Flagship Conference',
    type: 'publication',
    tier: 'research',
    metrics: [
      { value: 93, suffix: '%', label: 'NL-to-SQL accuracy' },
      { value: 73, suffix: '%', label: 'CCTV cache hit rate' },
    ],
    description: 'Research paper on Drishti AI accepted and published. Natural language to SQL semantic parser achieving 93% accuracy and CCTV video retrieval systems with 73% cache hit rate. Presented findings on campus surveillance optimization. Grateful to have this work accepted at TENCON, the flagship international conference of IEEE Region 10 (Asia-Pacific).',
    highlights: [
      'Peer-reviewed IEEE publication',
      'Presented at TENCON, the IEEE Region 10 (Asia-Pacific) flagship conference',
      'NL-to-SQL semantic parser (93% accuracy)',
      'CCTV retrieval pipeline with caching (73% hit rate)',
      'Campus surveillance system optimization',
    ],
    features: [
      'Natural language query interface for campus surveillance',
      'Multi-stage semantic parsing pipeline',
      'Intelligent caching system for video retrieval',
      'Production-scale system validation',
    ],
    technologies: ['Python', 'DeepSeek', 'PostgreSQL', 'YOLOv8', 'OpenCV', 'Flask'],
    link: '#achievements',
  },

  // 1ST PLACE - WINNER TIER
  {
    id: 'win1',
    title: 'Indian Chess Academy Hackathon',
    rank: '1ST PLACE',
    date: '2026',
    organizer: 'Vina EduTech',
    type: 'hackathon',
    tier: 'winner',
    description: 'Team Madoss secured 1st place for delivering a polished and reliable platform with a strong balance of usability, security, and technical execution. Led to one-month training program and internship pathway.',
    highlights: [
      'Awarded 1st place out of all competing teams',
      'Recognized for balancing product usability with robust security',
      'Delivered strong technical execution with dependable platform behavior',
      'Qualified for one-month training program post-hackathon',
      'Internship opportunity based on training performance',
    ],
    features: [
      'Collaborative end-to-end product build with clear ownership',
      'Reliable platform workflows with production-minded implementation',
      'Security-aware design choices aligned with hackathon goals',
      'Post-win pathway to internship opportunities',
    ],
    team: ['Darshil Nathwani', 'Rigved', 'Shrinidhi Patil', 'Aadya Baranwal'],
    technologies: ['React', 'TypeScript', 'Firebase', 'Security-First Design'],
  },

  // TOP 10 TIER
  {
    id: 'top10-1',
    title: 'Nasiko × Devaarambh Buildathon',
    rank: 'TOP 10',
    date: '2026',
    organizer: 'Microsoft Reactor',
    type: 'hackathon',
    tier: 'top10',
    description: 'Built resilient multi-agent request layer with Redis queues, Docker orchestration, and API routing. Top 10 out of 200+ builders.',
    highlights: [
      'Multi-agent systems architecture',
      'Redis queue management',
      'Mentorship from industry experts',
      'Open-source contributions',
    ],
    technologies: ['Redis', 'Docker', 'FastAPI', 'Multi-Agent Systems'],
  },
  {
    id: 'top10-2',
    title: 'Athermex Hackathon',
    rank: 'TOP 10',
    date: '2026',
    organizer: 'BMSCE × DSCE',
    type: 'hackathon',
    tier: 'top10',
    description: 'Antraa: 100% local synthetic data generator with differential privacy. Top 10 out of 150+ teams (450+ participants).',
    highlights: [
      'Differential privacy implementation',
      'Healthcare/fintech focus',
      '450+ participants',
      'Privacy-preserving technology',
    ],
    team: ['Team Baazigar'],
    technologies: ['Python', 'Differential Privacy', 'Synthetic Data Generation'],
  },

  // TOP 20 TIER
  {
    id: 'top20-1',
    title: 'CICADA Hackathon',
    rank: 'TOP 20',
    date: '2026',
    organizer: 'Mastersolis @ Atria University',
    type: 'hackathon',
    tier: 'top20',
    description: 'KARM AI: 22-hour sprint building placement portal + Chrome extension. Multi-role access, AI resume parsing. TOP 20 among 150+ teams.',
    highlights: [
      'Secured TOP 20 finish among 150+ teams',
      'Completed end-to-end architecture in 22 hours',
      'Built production-style multi-role placement workflow',
      'Sustained clean code through overnight sprint',
    ],
    features: [
      'Multi-role portal access for Students, HOD, and TPO',
      'AI-powered resume parsing and scoring',
      'Automated placement drive lifecycle',
      'Real-time analytics dashboard',
      'Chrome extension for form auto-fill',
    ],
    team: ['Aadya Baranwal', 'Musaddik Jamadar', 'Shreyash J S'],
    technologies: ['React', 'FastAPI', 'Firebase', 'Gemini API', 'Chrome Extension'],
  },

  // TOP 25 TIER
  {
    id: 'top25-1',
    title: 'Google DeepMind Hackathon',
    rank: 'TOP 25',
    date: '2026',
    organizer: 'Google DeepMind Bangalore',
    type: 'hackathon',
    tier: 'top25',
    description: 'Solo 1-day sprint building AI agent with Gemini API. Top 25 finish out of 100+ participants.',
    highlights: [
      'Solo developer achievement',
      'Rapid prototyping',
      'Agentic system design',
      'Gemini API integration',
    ],
    technologies: ['Gemini API', 'Python', 'FastAPI'],
  },

  // PARTICIPATION / QUALIFIED TIER
  {
    id: 'part1',
    title: 'SIH Internal Round',
    rank: 'QUALIFIED',
    date: '2024',
    organizer: 'Smart India Hackathon',
    type: 'competition',
    tier: 'participation',
    description: 'Team Paradox advanced with AI-powered tourist safety monitoring using geo-fencing and blockchain.',
    highlights: [
      'AI monitoring system',
      'Geo-fencing technology',
      'Blockchain digital ID',
      'National competition',
    ],
    team: ['Team Paradox'],
    technologies: ['AI', 'Blockchain', 'Geo-fencing'],
  },
  {
    id: 'part2',
    title: 'HackMan v.8',
    rank: 'PARTICIPATION',
    date: 'Oct 31 - Nov 1, 2025',
    organizer: 'DSCE',
    type: 'hackathon',
    tier: 'participation',
    description: 'Kriti (कृति) - Decentralized Career Identity Platform. 24-hour sleepless build sprint solving hiring trust crisis through blockchain-backed verifiable credentials and AI-powered ATS resume generation.',
    highlights: [
      '24-hour sleepless build sprint as Team Lead',
      'Built B2B/B2C architecture from whiteboard to prototype',
      'Focused on solving fake resumes and verification delays',
      'Strong learning outcome',
    ],
    features: [
      'Blockchain-backed verifiable credentials',
      'Tamper-proof trust layer for career records',
      'AI engine for ATS-optimized resume creation',
      'Instant candidate verification for recruiters',
    ],
    team: ['Dhruva K R', 'Aadya Baranwal', 'Utsav Patel'],
    technologies: ['Blockchain', 'Verifiable Credentials', 'AI', 'React', 'Node.js'],
  },
  {
    id: 'part3',
    title: 'Aegis Cybersecurity Hackathon',
    rank: 'PARTICIPATION',
    date: '24-Hour Sprint',
    organizer: 'Aegis at DSCE',
    type: 'hackathon',
    tier: 'participation',
    description: 'Kavach - AI Security Copilot. Built AI that watches AI-generated code in real time, blocks risky commands, detects dependency attacks, scans file changes, protects secrets.',
    highlights: [
      'Delivered fully local AI security workflow in 24 hours',
      'Focused on making vibe coding safer through proactive guardrails',
      'Combined threat detection, intent control, and rollback safety',
      'Validated end-to-end implementation under extreme pressure',
    ],
    features: [
      'Terminal interception to block dangerous commands',
      'Phantom dependency blocker',
      'Live security scanner for injections and secrets',
      'Secret Shield for credentials protection',
      'Intent Guard to prevent over-scoped AI actions',
      'RAG-powered codebase security analysis',
    ],
    team: ['Arpit Ravi', 'Arya Dudalkar', 'Rigved Tamkoria'],
    technologies: ['Ollama', 'phi4-mini', 'Semgrep', 'XGBoost', 'ChromaDB', 'FastAPI', 'TypeScript'],
  },
  {
    id: 'part4',
    title: 'Hackverse 24-Hour Hackathon',
    rank: 'PARTICIPATION',
    date: '2024',
    organizer: 'DSATM Techfusion',
    type: 'hackathon',
    tier: 'participation',
    description: 'Kara-AI: Multi-Modal AI Interview Coach. Led team Jugaadu to deliver full-stack AI interview coaching prototype.',
    highlights: [
      'First online hackathon experience',
      'Team leadership under 24-hour deadline',
      'Full-stack AI project delivery',
    ],
    features: [
      'Dynamic context-aware interview questions',
      'Live video and audio analysis',
      'Real-time feedback system',
    ],
    team: ['Aadya B.', 'Musaddik Jamadar'],
    technologies: ['React', 'Python', 'OpenCV', 'AI Models'],
  },
  {
    id: 'part5',
    title: 'TechTrek Hackathon',
    rank: 'PARTICIPATION',
    date: 'March 29, 2025',
    organizer: 'DSCE ACM Student Chapter',
    type: 'hackathon',
    tier: 'participation',
    description: 'PG Finder Web Application. Designed and developed MERN stack web application in 8-hour sprint.',
    highlights: [
      'Built complete MERN stack application',
      'Implemented location-based PG search',
      'Improved execution under strict time pressure',
    ],
    team: ['Midde Jayanth', 'Anshuman Pati', 'Aman Kumar Singh'],
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
  {
    id: 'part6',
    title: 'Hackoasis v2',
    rank: 'PARTICIPATION',
    date: 'November 29, 2024',
    organizer: 'Hackoasis',
    type: 'hackathon',
    tier: 'participation',
    description: 'First-ever hackathon participation. Built prototype using Wix, kickstarting competitive building journey.',
    highlights: [
      'First-ever hackathon participation',
      'Built and presented no-code prototype',
      'Learned team coordination under event timelines',
    ],
    technologies: ['Wix'],
  },
];
