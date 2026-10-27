/**
 * Achievements.tsx — Tiered achievements with visual hierarchy
 *
 * VISUAL HIERARCHY: Research hero > 1st Place premium > TOP 10 > TOP 20 > TOP 25 > Participation
 * Each tier has distinct styling reflecting achievement level
 * 
 * UNIQUE ELEMENTS:
 * - Research paper: Full-width hero with animated background
 * - 1st Place: Large card with gold accents, spans 2 columns
 * - TOP 10/20: Medium cards with lime accents
 * - TOP 25/Participation: Standard cards
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, X, ExternalLink, Users, Calendar, Sparkles, Medal, Star, Crown, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/sound';

const E = [0.76, 0, 0.24, 1] as const;

interface Achievement {
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
}

const achievements: Achievement[] = [
  // RESEARCH PUBLICATION
  {
    id: 'research1',
    title: 'IEEE TENCON 2026',
    rank: 'PUBLISHED',
    date: '2026',
    organizer: 'IEEE International Conference',
    type: 'publication',
    tier: 'research',
    description: 'Research paper on Drishti AI accepted and published. Natural language to SQL semantic parser achieving 93% accuracy and CCTV video retrieval systems with 73% cache hit rate. Presented findings on campus surveillance optimization.',
    highlights: [
      'Peer-reviewed IEEE publication',
      'International conference presentation',
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

// Separate by tier
const researchPaper = achievements.find(a => a.tier === 'research')!;
const firstPlace = achievements.filter(a => a.tier === 'winner');
const top10 = achievements.filter(a => a.tier === 'top10');
const top20 = achievements.filter(a => a.tier === 'top20');
const top25 = achievements.filter(a => a.tier === 'top25');
const participation = achievements.filter(a => a.tier === 'participation');

function ClipLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Research Paper - Folded Paper Document Design
function ResearchCard({ achievement, onClick }: { achievement: Achievement; onClick: () => void }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 1, ease: E }}
      onMouseEnter={() => { setIsHovered(true); sound.playHover?.(); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        sound.playClick?.();
        onClick();
      }}
      style={{
        position: 'relative',
        marginBottom: '4rem',
        cursor: 'pointer',
        perspective: '2000px',
      }}
    >
      {/* Paper document container */}
      <motion.div
        animate={{
          rotateX: isHovered ? -2 : 0,
          z: isHovered ? 20 : 0,
        }}
        transition={{ duration: 0.4, ease: E }}
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(248,250,252,0.08) 0%, rgba(163,230,53,0.08) 100%)',
          border: '2px solid rgba(163,230,53,0.3)',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? '0 20px 60px rgba(163,230,53,0.2), inset 0 0 60px rgba(163,230,53,0.05)'
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Folded corner effect */}
        <motion.div
          animate={{
            width: isHovered ? '120px' : '80px',
            height: isHovered ? '120px' : '80px',
          }}
          transition={{ duration: 0.4, ease: E }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'linear-gradient(135deg, transparent 50%, rgba(163,230,53,0.3) 50%)',
            borderLeft: '2px solid rgba(163,230,53,0.4)',
            borderBottom: '2px solid rgba(163,230,53,0.4)',
            transformOrigin: 'top right',
          }}
        />

        {/* IEEE Badge - looks like a stamp */}
        <motion.div
          animate={{
            rotate: isHovered ? -2 : -8,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            padding: '0.8rem 1.2rem',
            border: '3px dashed rgba(163,230,53,0.5)',
            background: 'rgba(163,230,53,0.1)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#A3E635',
            fontWeight: 800,
            transform: 'rotate(-8deg)',
          }}
        >
          <Award size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
          IEEE PUBLISHED
        </motion.div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: '3rem' }}>
          {/* Conference line */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(163,230,53,0.8)',
              marginBottom: '1.5rem',
            }}
          >
            {achievement.organizer}
          </div>

          {/* Title with paper lines effect */}
          <div style={{ position: 'relative' }}>
            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: '#F8FAFC',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                textShadow: isHovered ? '0 0 20px rgba(163,230,53,0.3)' : 'none',
              }}
            >
              {achievement.title}
            </h2>
            
            {/* Decorative lines like ruled paper */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-0.5rem', height: '2px', background: 'repeating-linear-gradient(90deg, rgba(163,230,53,0.2) 0px, rgba(163,230,53,0.2) 10px, transparent 10px, transparent 20px)' }} />
          </div>

          {/* Abstract excerpt */}
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(248,250,252,0.7)',
              marginBottom: '2rem',
              maxWidth: '85%',
            }}
          >
            {achievement.description}
          </p>

          {/* Research metrics in grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
            {achievement.highlights.slice(0, 4).map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                style={{
                  padding: '1rem',
                  background: 'rgba(163,230,53,0.05)',
                  border: '1px solid rgba(163,230,53,0.2)',
                  fontSize: '0.85rem',
                  color: 'rgba(248,250,252,0.7)',
                  lineHeight: 1.5,
                }}
              >
                {highlight}
              </motion.div>
            ))}
          </div>

          {/* Interactive hint with page icon */}
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginTop: '2rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#A3E635',
            }}
          >
            <ExternalLink size={14} />
            Click to Read Full Publication
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Winner Card - Minimalist Prestige (like Apple awards)
function WinnerCard({ achievement, index, onClick }: { achievement: Achievement; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: E }}
      onMouseEnter={() => { setIsHovered(true); sound.playHover?.(); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        sound.playClick?.();
        onClick();
      }}
      style={{
        cursor: 'pointer',
        position: 'relative',
        gridColumn: 'span 2',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(12,12,14,0.95) 60%)',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: 'clamp(3rem, 5vw, 4rem)',
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,191,36,0.3)'
            : '0 8px 16px rgba(0,0,0,0.2)',
        }}
      >
        {/* Top gold line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #FFC107, rgba(251,191,36,0.3))',
            transition: 'height 0.3s ease',
            ...(isHovered && { height: '3px' }),
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(251,191,36,0.6)',
                marginBottom: '0.8rem',
              }}
            >
              Championship
            </div>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: 'rgba(251,191,36,0.15)',
                WebkitTextStroke: '1.5px rgba(251,191,36,0.8)',
                marginBottom: '0.5rem',
              }}
            >
              01
            </div>
          </div>

          <div
            style={{
              padding: '0.6rem 1.2rem',
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.2)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#FFC107',
              fontWeight: 600,
            }}
          >
            {achievement.rank}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: '#F8FAFC',
              marginBottom: '1.5rem',
            }}
          >
            {achievement.title}
          </h3>

          <div className="flex items-center gap-3 mb-4" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(248,250,252,0.5)',
              }}
            >
              {achievement.organizer}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(248,250,252,0.4)',
              }}
            >
              {achievement.date}
            </span>
          </div>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'rgba(248,250,252,0.6)',
              marginBottom: '2rem',
            }}
          >
            {achievement.description}
          </p>

          {achievement.team && (
            <div className="flex items-center gap-2 mb-4">
              <Users size={13} style={{ color: 'rgba(251,191,36,0.7)' }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  color: 'rgba(248,250,252,0.45)',
                }}
              >
                Team Achievement
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(251,191,36,0.8)',
          }}
        >
          View Details
          <ArrowUpRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Regular Achievement Card (with tier styling)
const AchievementCard = React.memo(({ achievement, index, onClick }: { achievement: Achievement; index: number; onClick: () => void }) => {
  const tierConfig = {
    top10: {
      borderColor: 'rgba(163,230,53,0.35)',
      bgGradient: 'linear-gradient(135deg, rgba(163,230,53,0.08) 0%, rgba(12,12,14,0.9) 60%)',
      iconBg: 'rgba(163,230,53,0.15)',
      iconBorder: 'rgba(163,230,53,0.35)',
      badgeBorder: 'rgba(163,230,53,0.35)',
      badgeBg: 'rgba(163,230,53,0.1)',
      badgeColor: '#A3E635',
      icon: <Medal size={22} style={{ color: '#A3E635' }} />,
    },
    top20: {
      borderColor: 'rgba(163,230,53,0.25)',
      bgGradient: 'linear-gradient(135deg, rgba(163,230,53,0.05) 0%, rgba(12,12,14,0.9) 60%)',
      iconBg: 'rgba(163,230,53,0.1)',
      iconBorder: 'rgba(163,230,53,0.25)',
      badgeBorder: 'rgba(163,230,53,0.25)',
      badgeBg: 'rgba(163,230,53,0.08)',
      badgeColor: 'rgba(163,230,53,0.9)',
      icon: <Star size={20} style={{ color: '#A3E635' }} />,
    },
    top25: {
      borderColor: 'rgba(255,255,255,0.15)',
      bgGradient: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(12,12,14,0.85) 60%)',
      iconBg: 'rgba(163,230,53,0.08)',
      iconBorder: 'rgba(255,255,255,0.15)',
      badgeBorder: 'rgba(255,255,255,0.2)',
      badgeBg: 'rgba(255,255,255,0.05)',
      badgeColor: 'rgba(248,250,252,0.7)',
      icon: <Trophy size={19} style={{ color: 'rgba(163,230,53,0.8)' }} />,
    },
    participation: {
      borderColor: 'rgba(255,255,255,0.1)',
      bgGradient: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(12,12,14,0.8) 60%)',
      iconBg: 'rgba(255,255,255,0.04)',
      iconBorder: 'rgba(255,255,255,0.1)',
      badgeBorder: 'rgba(255,255,255,0.15)',
      badgeBg: 'rgba(255,255,255,0.03)',
      badgeColor: 'rgba(248,250,252,0.5)',
      icon: <Trophy size={18} style={{ color: 'rgba(163,230,53,0.6)' }} />,
    },
  };

  const config = tierConfig[achievement.tier as keyof typeof tierConfig];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: E }}
      onClick={() => {
        sound.playClick?.();
        onClick();
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        border: `2px solid ${config.borderColor}`,
        background: config.bgGradient,
        padding: 'clamp(2rem, 3.5vw, 3rem)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Icon + Rank badge */}
      <div className="flex items-center justify-between mb-4">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            background: config.iconBg,
            border: `1px solid ${config.iconBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {config.icon}
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: config.badgeColor,
            padding: '0.5rem 1rem',
            border: `1px solid ${config.badgeBorder}`,
            background: config.badgeBg,
          }}
        >
          {achievement.rank}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#F8FAFC',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}
      >
        {achievement.title}
      </h3>

      {/* Organizer + Date */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.05em',
            color: 'rgba(248,250,252,0.5)',
          }}
        >
          {achievement.organizer}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'rgba(248,250,252,0.4)',
          }}
        >
          {achievement.date}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'rgba(248,250,252,0.6)',
          marginBottom: '1.5rem',
          flex: 1,
        }}
      >
        {achievement.description}
      </p>

      {/* Team indicator */}
      {achievement.team && (
        <div className="flex items-center gap-2 mb-4">
          <Users size={13} style={{ color: 'rgba(163,230,53,0.7)' }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.08em',
              color: 'rgba(248,250,252,0.45)',
            }}
          >
            Team Project
          </span>
        </div>
      )}

      {/* Click hint */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: config.badgeColor,
        }}
      >
        View Details →
      </div>
    </motion.div>
  );
});

// Modal (reuse from previous - same component)
function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  const isResearch = achievement.tier === 'research';
  const isWinner = achievement.tier === 'winner';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        transition={{ duration: 0.4, ease: E }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '950px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#0C0C0E',
          border: `3px solid ${isResearch ? 'rgba(163,230,53,0.4)' : isWinner ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.18)'}`,
          padding: 'clamp(2.5rem, 5vw, 4.5rem)',
          position: 'relative',
        }}
        className="custom-scrollbar"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          onMouseEnter={() => sound.playHover?.()}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            width: 44,
            height: 44,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          className="hover:!border-[#A3E635] hover:bg-[rgba(163,230,53,0.1)]"
        >
          <X size={20} style={{ color: '#F8FAFC' }} />
        </button>

        {/* Featured badge */}
        {(isResearch || isWinner) && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.8rem',
              padding: '0.7rem 1.3rem',
              border: `2px solid ${isResearch ? 'rgba(163,230,53,0.4)' : 'rgba(251,191,36,0.4)'}`,
              background: isResearch ? 'rgba(163,230,53,0.1)' : 'rgba(251,191,36,0.1)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: isResearch ? '#A3E635' : '#FFC107',
            }}
          >
            {isResearch ? <Award size={13} /> : <Crown size={13} />}
            {isResearch ? 'PEER-REVIEWED PUBLICATION' : '1ST PLACE WINNER'}
          </div>
        )}

        {/* Rank */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: isResearch ? '#A3E635' : isWinner ? '#FFC107' : 'rgba(163,230,53,0.9)',
            marginBottom: '1.8rem',
          }}
        >
          {achievement.rank}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.035em',
            color: '#F8FAFC',
            marginBottom: '1.8rem',
            lineHeight: 1.12,
          }}
        >
          {achievement.title}
        </h2>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2">
            <Calendar size={16} style={{ color: '#A3E635' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(248,250,252,0.7)' }}>
              {achievement.date}
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(248,250,252,0.6)' }}>
            {achievement.organizer}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'rgba(248,250,252,0.75)', marginBottom: '3.5rem' }}>
          {achievement.description}
        </p>

        {/* Highlights & Features side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Highlights */}
          <div>
            <h3
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.45)',
                marginBottom: '1.8rem',
              }}
            >
              Key Highlights
            </h3>
            <div className="space-y-3.5">
              {achievement.highlights.map((highlight, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '1rem',
                    color: 'rgba(248,250,252,0.7)',
                    paddingLeft: '1.6rem',
                    borderLeft: `3px solid ${isResearch || isWinner ? 'rgba(163,230,53,0.5)' : 'rgba(163,230,53,0.3)'}`,
                    lineHeight: 1.75,
                  }}
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          {achievement.features && (
            <div>
              <h3
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,250,252,0.45)',
                  marginBottom: '1.8rem',
                }}
              >
                Key Features
              </h3>
              <div className="space-y-3.5">
                {achievement.features.map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '1rem',
                      color: 'rgba(248,250,252,0.65)',
                      paddingLeft: '1.6rem',
                      borderLeft: '3px solid rgba(255,255,255,0.2)',
                      lineHeight: 1.75,
                    }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technologies */}
        {achievement.technologies && (
          <div style={{ marginBottom: '3rem' }}>
            <h3
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.45)',
                marginBottom: '1.5rem',
              }}
            >
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {achievement.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.7rem 1.2rem',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.03)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                    color: 'rgba(248,250,252,0.7)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Team */}
        {achievement.team && (
          <div style={{ paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} style={{ color: '#A3E635' }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,250,252,0.5)',
                }}
              >
                Team Members
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {achievement.team.map((member) => (
                <span
                  key={member}
                  style={{
                    padding: '0.7rem 1.2rem',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.03)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'rgba(248,250,252,0.7)',
                  }}
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(163,230,53,0.06), transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1700px] mx-auto">
        {/* HEADER */}
        <div className="mb-24">
          <ClipLine delay={0.1}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div style={{ width: 40, height: 1, background: '#A3E635' }} />
              <span>Competitive Track Record</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.045em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F8FAFC' }}>
                Achievements
              </div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'transparent', WebkitTextStroke: '2px #A3E635', marginTop: '-0.5rem' }}>
                & Recognition
              </div>
            </ClipLine>
          </div>

          <div style={{ marginTop: 'clamp(2rem, 3.5vw, 3rem)', overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.5, ease: E }}
              className="flex items-start gap-6"
            >
              <motion.div
                style={{ height: 1, backgroundColor: '#A3E635', flexShrink: 0 }}
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.7, delay: 0.75, ease: E }}
              />
              <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', color: 'rgba(248,250,252,0.5)', lineHeight: 1.8, maxWidth: '52rem' }}>
                From peer-reviewed IEEE publications to championship wins and top finishes across hackathons with Microsoft, Google DeepMind, and leading institutions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RESEARCH PAPER HERO */}
        <ResearchCard
          achievement={researchPaper}
          onClick={() => setSelected(researchPaper)}
        />

        {/* 1ST PLACE WINNER */}
        <div className="mb-16">
          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#F8FAFC', marginBottom: '2rem', textTransform: 'uppercase' }}>
            Championship Win
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {firstPlace.map((achievement, index) => (
              <WinnerCard
                key={achievement.id}
                achievement={achievement}
                index={index}
                onClick={() => setSelected(achievement)}
              />
            ))}
          </div>
        </div>

        {/* TOP 10 */}
        {top10.length > 0 && (
          <div className="mb-16">
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#F8FAFC', marginBottom: '2rem', textTransform: 'uppercase' }}>
              TOP 10 Finishes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {top10.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                  onClick={() => setSelected(achievement)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TOP 20 */}
        {top20.length > 0 && (
          <div className="mb-16">
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#F8FAFC', marginBottom: '2rem', textTransform: 'uppercase' }}>
              TOP 20 Finishes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {top20.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                  onClick={() => setSelected(achievement)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TOP 25 & PARTICIPATION */}
        {(top25.length > 0 || participation.length > 0) && (
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#F8FAFC', marginBottom: '2rem', textTransform: 'uppercase' }}>
              Additional Highlights & Participation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...top25, ...participation].map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                  onClick={() => setSelected(achievement)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && <AchievementModal achievement={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163,230,53,0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163,230,53,0.5);
        }
      `}</style>
    </section>
  );
}
