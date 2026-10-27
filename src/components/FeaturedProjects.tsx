import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Terminal,
  X,
  AlertCircle,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sound } from '../lib/sound';

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

const E = [0.76, 0, 0.24, 1] as const;

const FEATURED_PROJECTS: FeaturedProject[] = [
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
    metrics: ['93% Query Accuracy on Manual Test', '73% Cache Hit Rate', 'Published in IEEE Proceedings'],
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

function ProjectRow({ project, index }: { project: FeaturedProject; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      data-cursor-text="VIEW"
      onClick={() => {
        sound.playChime();
        window.dispatchEvent(new CustomEvent('open-project', { detail: project.id }));
      }}
      onMouseEnter={() => {
        setHovered(true);
        sound.playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay: index * 0.04, ease: E }}
      style={{
        position: 'relative',
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: 0,
        cursor: 'pointer',
        display: 'block',
        overflow: 'hidden',
      }}
      className="group"
    >
      {/* Invert panel sweep */}
      <motion.div
        aria-hidden
        animate={{ y: hovered ? '0%' : '101%' }}
        transition={{ duration: 0.45, ease: E }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#A3E635',
          zIndex: 0,
        }}
      />

      <div
        style={{ position: 'relative', zIndex: 1, padding: '2rem 0' }}
        className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10"
      >
        {/* Index number */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            letterSpacing: '0.1em',
            color: hovered ? '#0C0C0E' : 'rgba(255,255,255,0.3)',
            transition: 'color 0.2s',
            flexShrink: 0,
            width: '2.4rem',
          }}
        >
          {project.num}
        </span>

        {/* Title + category + badge */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9.5px',
                letterSpacing: '0.18em',
                color: hovered ? 'rgba(12,12,14,0.6)' : 'rgba(255,255,255,0.32)',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
            >
              {project.category}
            </span>
            {project.badge && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: hovered ? '#0C0C0E' : '#A3E635',
                  border: hovered ? '1px solid rgba(12,12,14,0.3)' : '1px solid rgba(163,230,53,0.3)',
                  padding: '2px 8px',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {project.badge}
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.4rem, 2.6vw, 2.3rem)',
              letterSpacing: '-0.02em',
              color: hovered ? '#0C0C0E' : 'rgba(248,250,252,0.86)',
              transition: 'color 0.2s, transform 0.4s',
              transform: hovered ? 'translateX(10px)' : 'translateX(0)',
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Tech stack */}
        <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[260px] justify-end">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.05em',
                color: hovered ? 'rgba(12,12,14,0.7)' : 'rgba(255,255,255,0.4)',
                border: hovered ? '1px solid rgba(12,12,14,0.25)' : '1px solid rgba(255,255,255,0.1)',
                padding: '3px 8px',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          aria-hidden
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.3, ease: E }}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: hovered ? '1px solid rgba(12,12,14,0.3)' : '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ArrowUpRight
            size={16}
            style={{ color: hovered ? '#0C0C0E' : 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
          />
        </motion.div>
      </div>
    </motion.button>
  );
}

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = FEATURED_PROJECTS.find((p) => p.id === id) ?? null;
      setSelectedProject(found);
    };
    window.addEventListener('open-project', handler);
    return () => window.removeEventListener('open-project', handler);
  }, []);

  const closeModal = () => {
    sound.playClick();
    setSelectedProject(null);
  };

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="work"
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#0C0C0E',
          color: '#F8FAFC',
          fontFamily: "'Inter Tight', sans-serif",
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          overflow: 'hidden',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderTop: '1px solid rgba(163,230,53,0.3)',
          boxShadow: '0 -60px 120px rgba(0,0,0,0.65), 0 -2px 0 rgba(163,230,53,0.15)',
        }}
      >
        <div className="px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.32)',
                  marginBottom: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
                <span>Selected Works — 09</span>
              </motion.div>

              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: E }}
                  style={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.98,
                    fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)',
                  }}
                >
                  Systems Built
                  <br />
                  <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.42)' }}>
                    To Ship &amp; Scale
                  </span>
                </motion.h2>
              </div>
            </div>

            <Link
              to="/projects"
              onMouseEnter={() => sound.playHover()}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '0.85rem 1.4rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.25s, color 0.25s',
              }}
              className="hover:!border-[#A3E635] hover:!text-[#A3E635] w-fit"
            >
              <span>Explore All 20+ Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Editorial Row List */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {FEATURED_PROJECTS.map((project, idx) => (
              <ProjectRow key={project.id} project={project} index={idx} />
            ))}
          </div>

          {/* View All Projects Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
            className="mt-14 text-center"
          >
            <Link
              to="/projects"
              onMouseEnter={() => sound.playHover()}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10.5px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0C0C0E',
                backgroundColor: '#F8FAFC',
                padding: '1rem 2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background-color 0.25s',
              }}
              className="hover:!bg-[#A3E635]"
            >
              <span>View Complete Engineering Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════
            DEEP DIVE — full-height slide-over panel
        ══════════════════════════════════════════════ */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99999]"
              style={{ backgroundColor: 'rgba(5,5,6,0.7)', backdropFilter: 'blur(6px)' }}
              onClick={closeModal}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.55, ease: E }}
                className="absolute top-0 right-0 h-full w-full sm:w-[90%] lg:w-[58%] max-w-3xl overflow-y-auto"
                style={{
                  backgroundColor: '#0C0C0E',
                  borderLeft: '1px solid rgba(255,255,255,0.1)',
                  padding: 'clamp(2rem, 5vw, 3.5rem)',
                  fontFamily: "'Inter Tight', sans-serif",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Giant watermark numeral */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    fontSize: 'clamp(5rem, 14vw, 11rem)',
                    fontWeight: 900,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {selectedProject.num}
                </span>

                <button
                  onClick={closeModal}
                  data-cursor-text="CLOSE"
                  className="absolute top-8 left-8 sm:left-auto sm:right-8 w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-8 pt-16 pr-8 relative z-10">
                  <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10.5px',
                        letterSpacing: '0.1em',
                        color: '#A3E635',
                      }}
                    >
                      {selectedProject.num} // ARCHITECTURAL BREAKDOWN
                    </span>
                    {selectedProject.badge && (
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '9px',
                          letterSpacing: '0.1em',
                          color: 'rgba(255,255,255,0.6)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          padding: '2px 7px',
                        }}
                      >
                        {selectedProject.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                    }}
                  >
                    {selectedProject.title}
                  </h3>

                  <p
                    style={{
                      marginTop: '1rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9rem',
                      color: 'rgba(248,250,252,0.55)',
                      lineHeight: 1.65,
                    }}
                  >
                    {selectedProject.description}
                  </p>
                </div>

                {/* System Architecture */}
                <div style={{ padding: '1.1rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                  <h4
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#A3E635',
                      marginBottom: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>System Architecture</span>
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(248,250,252,0.7)', lineHeight: 1.65 }}>
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Challenges & Learnings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div style={{ padding: '1rem 1.1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h5
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9.5px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        marginBottom: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Engineering Challenges</span>
                    </h5>
                    <ul className="space-y-2" style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.6)' }}>
                      {selectedProject.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span style={{ color: '#A3E635' }}>—</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ padding: '1rem 1.1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h5
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9.5px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        marginBottom: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Technical Insights</span>
                    </h5>
                    <ul className="space-y-2" style={{ fontSize: '0.78rem', color: 'rgba(248,250,252,0.6)' }}>
                      {selectedProject.learnings.map((l, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span style={{ color: '#A3E635' }}>—</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-7">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9.5px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}
                  >
                    Technologies Deployed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          color: '#A3E635',
                          border: '1px solid rgba(163,230,53,0.25)',
                          padding: '3px 9px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div
                  className="flex flex-wrap items-center justify-between gap-4 pt-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.65rem 1.2rem',
                          backgroundColor: '#F8FAFC',
                          color: '#0C0C0E',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {selectedProject.liveDemo && (
                      <a
                        href={selectedProject.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.65rem 1.2rem',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#F8FAFC',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" style={{ color: '#A3E635' }} />
                        <span>Live Platform</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={closeModal}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    Close [ESC]
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}
