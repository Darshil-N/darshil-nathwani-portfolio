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
    id: 'crickraft-ams',
    num: '01',
    title: 'Crickraft AMS: Academy Management System',
    category: 'PUBLISHED GOOGLE PLAY STORE APP',
    badge: 'LIVE ON GOOGLE PLAY STORE',
    description:
      'Native Android application published on the Google Play Store for sports academy management. Powers batch scheduling, attendance tracking, fee collection, and player performance telemetry for cricket training institutes.',
    architecture:
      'Architected with native Android, Kotlin, and cloud synchronization for offline-first reliability. Features intuitive coach dashboards, parent communication channels, and secure payment reconciliation.',
    techStack: ['Android', 'Kotlin', 'Mobile Architecture', 'Google Play', 'REST APIs', 'Cloud DB'],
    metrics: ['Published on Google Play Store', '100% Production Reliability', 'Real-Time Player Telemetry'],
    challenges: [
      'Managing offline-first local data synchronization for remote cricket ground facilities',
      'Optimizing performance across budget Android devices with smooth rendering',
      'Deploying and passing Google Play Store production verification guidelines',
    ],
    learnings: [
      'End-to-end production Android release engineering and Play Console lifecycle',
      'Designing specialized operational workflows for sports academies',
      'Zero-downtime mobile data caching and validation',
    ],
    liveDemo: 'https://play.google.com/store/apps/details?id=com.crickraft.ams',
    highlightColor: 'from-amber-500/20 via-orange-600/10 to-transparent',
  },
  {
    id: 'strengthkraft',
    num: '02',
    title: 'StrengthKraft: Athletic Conditioning Ecosystem',
    category: 'DUAL PRODUCTION: PLAY STORE APP & WEB PORTAL',
    badge: 'LIVE ON PLAY STORE & WEB',
    description:
      'Comprehensive athletic training ecosystem built during my tenure at Vina EduTech. Features a published React Native Android application on the Play Store coupled with an enterprise web platform for strength training protocols.',
    architecture:
      'Built with React Native for the mobile companion app and React/TypeScript for the web management suite. Integrates high-performance video workouts, workout logging, and athlete progress dashboards.',
    techStack: ['React Native', 'Android', 'React', 'TypeScript', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    metrics: ['Published on Play Store', 'Cross-Platform Android & Web', 'Live Production Ecosystem'],
    challenges: [
      'Maintaining unified state synchronization between web portals and mobile companions',
      'Handling low-latency video streaming and workout playback on mobile',
      'Ensuring responsive accessibility for athletes during high-intensity training',
    ],
    learnings: [
      'Large-scale React Native cross-platform architecture and native bridge performance',
      'Managing continuous integration and app store submission pipelines',
      'High-velocity collaborative development with engineering teams',
    ],
    liveDemo: 'https://play.google.com/store/apps/details?id=com.vinaedutech.strengthkraft',
    highlightColor: 'from-sky-500/20 via-blue-600/10 to-transparent',
  },
  {
    id: 'indian-chess-acad',
    num: '03',
    title: 'Indian Chess Academy: Official Platform',
    category: 'PRODUCTION ACADEMY & TOURNAMENT PLATFORM',
    badge: '1ST PLACE HACKATHON WIN',
    description:
      'Official web platform for Indian Chess Academy (Vina EduTech Pvt. Ltd.), awarded following a 1st place hackathon finish and intensive training sprint. Handles course discovery, student enrolments, and tournament operations.',
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
    num: '04',
    title: 'Velvet Academy: Freelance Deliverable',
    category: 'COMMERCIAL FREELANCE PRODUCTION',
    badge: 'LIVE FREELANCE PRODUCTION',
    description:
      'Independent client freelance deliverable: engineered the official website for Velvet Academy (velvetacademy.org), featuring modern visual branding, program portfolios, and streamlined inquiry handling.',
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
    id: 'multi-agent-layer',
    num: '05',
    title: 'Resilient Multi-Agent Request Layer',
    category: 'DISTRIBUTED AI INFRASTRUCTURE',
    badge: 'TOP 10 @ MICROSOFT BUILDATHON',
    description:
      'A resilient request and execution layer built during the Nasiko x Devaarambh Buildathon at Microsoft, finishing in the Top 10 out of over 200 builders. Handles concurrent task queueing, state routing, and distributed caching for multi-agent workflows under heavy load.',
    architecture:
      'Engineered with Redis task queues to eliminate contention between autonomous agents. Wrapped in containerized Docker microservices with adaptive API routing and cache eviction to maintain low-latency agent interaction during rapid parallel task bursts.',
    techStack: ['Redis', 'Docker', 'Python', 'FastAPI', 'Multi-Agent Infra', 'AsyncIO', 'Task Queues'],
    metrics: ['Finished Top 10 / 200+ Builders', 'Sub-15ms Route Latency', 'Zero-State Contention'],
    challenges: [
      'Synchronizing asynchronous agent states without request serialization bottlenecks',
      'Handling Docker network bridging constraints under intense hackathon deadlines',
      'Implementing cache invalidation logic for volatile agent working memories',
    ],
    learnings: [
      'Architecting resilient distributed queuing systems for multi-agent autonomy',
      'Deploying zero-downtime containerized microservices under severe time pressure',
      'How to contribute to complex open-source agent ecosystems without regression',
    ],
    github: 'https://github.com/Darshil-N',
    highlightColor: 'from-sky-500/20 via-blue-600/10 to-transparent',
  },
  {
    id: 'siddhi-ai',
    num: '06',
    title: 'Siddhi AI: Concessional Lending Risk Engine',
    category: 'ENTERPRISE AI & REGULATORY COMPLIANCE',
    badge: '1.8M+ FINANCIAL RECORDS PROCESSED',
    description:
      'Enterprise augmented intelligence platform for concessional lending risk assessment. Transforms static credit reports into dynamic behavioral analysis combining XGBoost predictive modeling, SHAP explainability matrices, and LSTM early warning alerts.',
    architecture:
      'FastAPI microservices pipeline coupled with a React/TypeScript analytics dashboard. Incorporates SHAP values for strict regulatory explainability so credit officers can audit each prediction feature by feature.',
    techStack: ['React', 'TypeScript', 'FastAPI', 'XGBoost', 'SHAP', 'SQLite', 'TensorFlow', 'Tailwind CSS'],
    metrics: ['85%+ Risk Scoring Accuracy', '1.8M+ Historical Records', 'Multi-Tier Human-in-Loop'],
    challenges: [
      'Benchmarking and optimizing data pipelines across 1.8M historical records efficiently',
      'Creating transparent SHAP visualizations that non-technical loan officers can interpret instantly',
      'Balancing high predictive accuracy with fairness and bias mitigation',
    ],
    learnings: [
      'Advanced production machine learning deployment and validation',
      'Financial compliance and explainable AI (XAI) frameworks',
      'Building responsive real-time data visualization dashboards',
    ],
    github: 'https://github.com/Darshil-N/Siddhi-Ai',
    logo: 'https://raw.githubusercontent.com/Darshil-N/Siddhi-Ai/main/Siddhi_Logo.png',
    highlightColor: 'from-indigo-500/20 via-purple-600/10 to-transparent',
  },
  {
    id: 'kara-ai',
    num: '07',
    title: 'Kara-AI: Multimodal Interview Coach',
    category: 'REAL-TIME COMPUTER VISION & SPEECH',
    badge: 'GEMINI 2.5 FLASH + YOLOV8 CV',
    description:
      'Revolutionary AI interview preparation platform that analyzes speech, facial expressions, and body language in real-time. Features adaptive interview personas, YOLOv8 live emotion classification, and synchronized performance telemetry.',
    architecture:
      'Full-stack WebRTC pipeline that streams video and audio frames to an asynchronous FastAPI backend. Fuses YOLOv8 emotion detection with Gemini 2.5 Flash for context-aware conversational questions with sub-second latency.',
    techStack: ['React', 'TypeScript', 'FastAPI', 'Python', 'Gemini API', 'YOLOv8', 'OpenCV', 'WebRTC', 'Supabase'],
    metrics: ['Sub-500ms Stream Latency', '>77% Facial Emotion Accuracy', '>95% Speech Transcription'],
    challenges: [
      'Fusing video frames, audio streams, and LLM reasoning simultaneously with low latency',
      'Calibrating YOLOv8 facial landmark models across variable lighting and webcam angles',
      'Designing realistic conversational AI interview personas that feel human and constructive',
    ],
    learnings: [
      'Full-duplex real-time WebRTC audio/video stream processing',
      'Production deployment of computer vision models with OpenCV and YOLO',
      'Multimodal prompt engineering and latency optimization with Gemini 2.5',
    ],
    github: 'https://github.com/Darshil-N/Kara-Ai',
    logo: '/Logos/Kara_ai.png',
    highlightColor: 'from-cyan-500/20 via-teal-600/10 to-transparent',
  },
  {
    id: 'raahi-safety',
    num: '08',
    title: 'Project Raahi: Smart Tourist Safety Ecosystem',
    category: 'BLOCKCHAIN & NATIVE ANDROID',
    badge: 'POLYGON ID + OFFLINE SMS FALLBACK',
    description:
      'Comprehensive digital ecosystem for tourist safety in Northeast India. Features blockchain-verified digital identity on Polygon, NFC wristband integration, offline SMS emergency fallbacks, and a real-time authority monitoring dashboard.',
    architecture:
      'Native Android application built with Kotlin and Jetpack Compose connected to Firebase serverless Cloud Functions, Polygon smart contracts for tamper-proof identity, and Leaflet/Mapbox geospatial heatmaps.',
    techStack: ['Kotlin', 'Android', 'Jetpack Compose', 'Polygon', 'Solidity', 'Firebase', 'NFC', 'SMS Fallback', 'Mapbox'],
    metrics: ['Zero-Connectivity SMS Fallback', 'NFC Tamper-Proof Verification', 'Live Situational Heatmap'],
    challenges: [
      'Architecting an offline-first panic mechanism that transmits GPS coordinates over cellular SMS when data fails',
      'Integrating NFC verification in remote areas without internet latency bottlenecks',
      'Balancing user biometric privacy with law enforcement emergency situational requirements',
    ],
    learnings: [
      'Native Android development with Kotlin, Coroutines, and modern Jetpack Compose',
      'Smart contract integration with Polygon and Web3 authentication',
      'Mission-critical emergency workflow design and fault tolerance',
    ],
    github: 'https://github.com/Darshil-N',
    highlightColor: 'from-amber-500/20 via-orange-600/10 to-transparent',
  },
  {
    id: 'karm-ai',
    num: '09',
    title: 'KARM AI: Placement Automation Platform',
    category: 'FULL-STACK AUTOMATION & CHROME EXT.',
    badge: 'TOP 20 FINISH @ CICADA 22H SPRINT',
    description:
      'Led Team Jugaadu to build a dual-platform college placement portal in a 22-hour hackathon. Integrates multi-role student/TPO dashboards with a custom Chrome Extension that auto-fills complex drive applications in one click.',
    architecture:
      'React frontend with FastAPI microservices and Gemini API for automated resume parsing, ATS scoring, and candidate-drive matching, plus a background manifest v3 Chrome extension for automated form submissions.',
    techStack: ['React', 'FastAPI', 'Firebase', 'Gemini API', 'Chrome Extension', 'Tailwind CSS'],
    metrics: ['Built in 22 Hours', 'Top 20 Finish / 150+ Teams', 'One-Click Form Automation'],
    challenges: [
      'Maintaining clean modular architecture while building a full web portal and Chrome extension in 22 hours',
      'Extracting and standardizing unstructured resume PDF data reliably using Gemini API',
      'Handling live cross-origin form auto-filling on external job portals',
    ],
    learnings: [
      'High-velocity team leadership and product delivery under continuous sprint constraints',
      'Chrome Extension Manifest v3 architecture and secure DOM injection',
      'End-to-end recruitment lifecycle automation',
    ],
    github: 'https://github.com/Darshil-N',
    highlightColor: 'from-emerald-500/20 via-sky-600/10 to-transparent',
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
      {/* Invert panel sweep — slides up from the bottom on hover */}
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

        {/* Tech stack — desktop only */}
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
