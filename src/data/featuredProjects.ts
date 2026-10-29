// Featured projects shown on the home page.

export interface FeaturedProject {
  id: string;
  num: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  architecture: string;
  techStack: string[];
  metrics: string[];
  challenges: string[];
  learnings: string[];
  github?: string;
  liveDemo?: string;
  logo?: string;
  highlightColor: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'crickraft-web',
    num: '01',
    title: 'Crickraft Web Platform',
    category: 'VINA EDUTECH - PRODUCTION WEB',
    badge: 'LIVE PRODUCTION',
    description:
      'Full-featured web management platform for Crickraft Academy Management System at Vina EduTech. Admin dashboard for batch scheduling, attendance tracking, fee collection, and player performance telemetry for cricket training institutes.',
    architecture:
      'Architected with React/TypeScript featuring coach dashboards, parent communication channels, secure payment reconciliation, and real-time cloud synchronization with the mobile app.',
    techStack: ['React', 'TypeScript', 'Firebase', 'REST APIs', 'Cloud DB', 'Tailwind CSS'],
    metrics: ['Full Web Platform Live at crickraft.vinaedutech.com', 'Real-Time Cloud Sync', 'Multi-Role Dashboard'],
    challenges: [
      'Building unified state management synchronized with mobile companion app',
      'Real-time player performance telemetry dashboard with live updates',
      'Payment reconciliation workflows for academy operations',
    ],
    learnings: [
      'Cross-platform architecture maintaining web and mobile parity',
      'Designing specialized operational workflows for sports academies',
      'Production cloud deployment with real-time synchronization',
    ],
    liveDemo: 'https://crickraft.vinaedutech.com/',
    highlightColor: 'from-amber-500/20 via-orange-600/10 to-transparent',
  },
  {
    id: 'crickraft-app',
    num: '02',
    title: 'Crickraft Android App',
    category: 'VINA EDUTECH - NATIVE MOBILE',
    badge: 'LIVE ON PLAY STORE',
    description:
      'Native Android application for Crickraft AMS published on Google Play Store at Vina EduTech. Mobile companion for coaches with offline-first architecture, attendance marking, and performance logging from remote cricket grounds.',
    architecture:
      'Built with Kotlin for native Android featuring offline-first local data synchronization, automatic cloud sync when connectivity resumes, and intuitive coach-facing mobile workflows.',
    techStack: ['Android', 'Kotlin', 'Google Play', 'Offline-First', 'Local DB', 'Cloud Sync'],
    metrics: ['Published on Google Play Store', 'Offline-First Architecture', 'Remote Ground Support'],
    challenges: [
      'Managing offline-first data synchronization for remote facilities without connectivity',
      'Deploying and passing Google Play Store production verification',
      'Battery-optimized background sync without draining coach devices',
    ],
    learnings: [
      'End-to-end production Android release engineering and Play Console lifecycle',
      'Offline-first mobile architecture with conflict resolution',
      'Native mobile app optimization for field usage',
    ],
    highlightColor: 'from-amber-600/20 via-yellow-600/10 to-transparent',
  },
  {
    id: 'strengthkraft-web',
    num: '03',
    title: 'StrengthKraft Web Platform',
    category: 'VINA EDUTECH - PRODUCTION WEB',
    badge: 'LIVE PRODUCTION',
    description:
      'Enterprise web management platform for StrengthKraft athletic training ecosystem at Vina EduTech. Admin suite for workout program management, athlete progress dashboards, and high-performance video workout streaming.',
    architecture:
      'Built with React/TypeScript for the web management suite featuring workout logging, athlete progress dashboards, video workout catalog management, and unified state with mobile companion.',
    techStack: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Video Streaming', 'Tailwind CSS'],
    metrics: ['Live at strengthkraft.vinaedutech.com', 'High-Performance Video Streaming', 'Athlete Analytics'],
    challenges: [
      'Low-latency video streaming and adaptive playback quality',
      'Maintaining unified state synchronization between web and mobile platforms',
      'Responsive accessibility for athletes during high-intensity training',
    ],
    learnings: [
      'Video streaming optimization and CDN integration',
      'Real-time analytics dashboard architecture',
      'High-velocity collaborative development with product teams',
    ],
    liveDemo: 'https://strengthkraft.vinaedutech.com/',
    highlightColor: 'from-sky-500/20 via-blue-600/10 to-transparent',
  },
  {
    id: 'strengthkraft-app',
    num: '04',
    title: 'StrengthKraft Mobile App',
    category: 'VINA EDUTECH - REACT NATIVE',
    badge: 'LIVE ON PLAY STORE',
    description:
      'React Native Android application for StrengthKraft published on Google Play Store at Vina EduTech. Mobile companion for athletes with workout tracking, video playback, and progress logging on the go.',
    architecture:
      'Crafted with React Native for cross-platform mobile featuring workout logging, video playback, progress tracking, and seamless synchronization with web platform.',
    techStack: ['React Native', 'Android', 'Google Play', 'Video Playback', 'Offline Caching'],
    metrics: ['Published on Play Store', 'Cross-Platform Mobile', 'Offline Video Caching'],
    challenges: [
      'Native bridge performance optimization for smooth video playback',
      'Managing continuous integration and app store submission pipelines',
      'Offline video caching and playback without connectivity',
    ],
    learnings: [
      'Large-scale React Native cross-platform architecture',
      'Native module integration for performance-critical features',
      'Mobile video playback optimization',
    ],
    highlightColor: 'from-sky-600/20 via-cyan-600/10 to-transparent',
  },
  {
    id: 'indian-chess-acad',
    num: '05',
    title: 'Indian Chess Academy',
    category: 'VINA EDUTECH - PRODUCTION WEB',
    badge: '1ST PLACE HACKATHON WIN',
    description:
      'Official web platform for Indian Chess Academy (Vina EduTech). Awarded following 1st place hackathon finish. Handles course discovery, student enrolments, and tournament operations on custom domain.',
    architecture:
      'Production full-stack web architecture with responsive design, secure student management, and tournament bracket workflows deployed on custom domain (indianchessacad.com).',
    techStack: ['React', 'TypeScript', 'Firebase', 'Node.js', 'Tailwind CSS', 'Responsive UI'],
    metrics: ['Official Live Platform (indianchessacad.com)', 'Awarded 1st Place Winner', 'Automated Cohort Management'],
    challenges: [
      'Translating hackathon prototype into a security-hardened production platform within tight deadlines',
      'Creating dynamic registration flows for both individual and institutional tournaments',
      'Optimizing page load performance and SEO for national search discoverability',
    ],
    learnings: [
      'Transitioning hackathon codebase into clean, maintainable production architecture',
      'Direct client communication and weekly sprint delivery iterations',
      'Production deployment and DNS routing for live commercial platforms',
    ],
    liveDemo: 'https://indianchessacad.com',
    highlightColor: 'from-emerald-500/20 via-teal-600/10 to-transparent',
  },
  {
    id: 'velvet-academy',
    num: '06',
    title: 'Velvet Academy',
    category: 'FREELANCE CLIENT PROJECT',
    badge: 'LIVE PRODUCTION WEBSITE',
    description:
      'Freelance client project: Official website for Velvet Academy (velvetacademy.org). Independent deliverable featuring modern visual branding, program portfolios, and streamlined inquiry handling with full production deployment.',
    architecture:
      'Crafted with clean semantic markup, fast-loading modern JavaScript, responsive typography, and production cloud hosting delivering high performance scores and immediate client satisfaction.',
    techStack: ['Full-Stack Web', 'Responsive UI', 'SEO Optimization', 'Cloud Hosting', 'Client Delivery'],
    metrics: ['Live at velvetacademy.org', '100% Client Satisfaction', 'Sub-Second Page Load'],
    challenges: [
      'Translating client aesthetic vision into a fast, responsive, and accessible digital portal',
      'Establishing robust cross-device compatibility from smartphones to high-res displays',
      'Configuring production DNS, SSL certificates, and search engine indexing',
    ],
    learnings: [
      'Independent end-to-end client project management and scope delivery',
      'Freelance contract fulfillment and deployment ownership',
      'Conversion-centered layout design and typography hierarchy',
    ],
    liveDemo: 'https://velvetacademy.org/',
    highlightColor: 'from-purple-500/20 via-indigo-600/10 to-transparent',
  },
  {
    id: 'drishti-ai',
    num: '07',
    title: 'Drishti-AI: Campus Surveillance Intelligence',
    category: 'IEEE PUBLISHED RESEARCH',
    badge: 'RESEARCH PAPER',
    description:
      'IEEE published research paper: Natural language campus surveillance system. DeepSeek Text-to-SQL with real-time computer vision for incident analysis. Deployed at DSCE campus and commercial retail partner achieving 93% query accuracy.',
    architecture:
      'End-to-end platform combining real-time CV anomaly detection (fights, falls, crowds) with fine-tuned DeepSeek 6.7B Text-to-SQL model. Features smart query caching (73% hit rate), automatic fallback to fuzzy search, and privacy-first local inference.',
    techStack: ['React', 'Flask', 'DeepSeek', 'PostgreSQL', 'Supabase', 'YOLOv8', 'OpenCV', 'PEFT'],
    metrics: ['93% Query Accuracy on Manual Test', '73% Cache Hit Rate', 'Published at IEEE TENCON, the Region 10 (Asia-Pacific) flagship conference'],
    challenges: [
      'Schema grounding for consistent SQL generation without hallucinations',
      '4-bit quantization without quality degradation on complex queries',
      'Building resilient fallback architecture under model failure',
    ],
    learnings: [
      'Production LLM deployment with quantization and fine-tuning',
      'Multi-layer security architecture for AI systems preventing SQL injection',
      'Research to production pipeline transformation at institutional scale',
    ],
    highlightColor: 'from-indigo-500/20 via-violet-600/10 to-transparent',
  },
];
