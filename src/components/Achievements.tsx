/**
 * Achievements.tsx — Mosaic trophy wall
 *
 * SIGNATURE BOLDNESS: Masonry-style grid with interactive trophy cards
 * Cards expand on click revealing full details in modal overlay
 * Inspired by: A Love Hate Story's mosaic + Componine's interactive grids
 * 
 * UNIQUE ELEMENTS:
 * - Masonry/pinterest-style layout (varying heights)
 * - Trophy cards with massive rank numbers
 * - Click to expand into fullscreen modal
 * - Staggered entrance from random directions
 * - IEEE publication highlighted differently
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, X, ExternalLink, Users, Calendar } from 'lucide-react';
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
  team?: string[];
  link?: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Nasiko × Devaarambh Buildathon',
    rank: 'TOP 10',
    date: '2026',
    organizer: 'Microsoft Reactor',
    type: 'hackathon',
    description: 'Built resilient multi-agent request layer. Redis queues, Docker, API routing. Top 10 out of 200+ builders.',
    highlights: [
      'Multi-agent systems architecture',
      'Redis queue management',
      'Mentorship from industry experts',
      'Open-source contributions',
    ],
  },
  {
    id: '2',
    title: 'Indian Chess Academy Hackathon',
    rank: '1ST PLACE',
    date: '2026',
    organizer: 'Vina EduTech',
    type: 'hackathon',
    description: 'Team Madoss won 1st place building secure, usable platform. Led to training program and internship.',
    highlights: [
      'Security-first design',
      'Production-minded implementation',
      'One-month training program',
      'Internship pathway',
    ],
    team: ['Rigved', 'Shrinidhi Patil', 'Aadya Baranwal'],
  },
  {
    id: '3',
    title: 'CICADA Hackathon',
    rank: 'TOP 20',
    date: '2026',
    organizer: 'Mastersolis @ Atria University',
    type: 'hackathon',
    description: 'KARM AI: 22-hour sprint building placement portal + Chrome extension. Multi-role access, AI resume parsing.',
    highlights: [
      'Dual-platform solution',
      'AI-powered resume scoring',
      'Chrome extension auto-fill',
      'Real-time analytics',
    ],
    team: ['Aadya Baranwal', 'Musaddik Jamadar', 'Shreyash J S'],
  },
  {
    id: '4',
    title: 'IEEE TENCON 2026',
    rank: 'ACCEPTED',
    date: '2026',
    organizer: 'IEEE International',
    type: 'publication',
    description: 'Research paper on Drishti AI accepted. Natural language to SQL and CCTV video retrieval systems.',
    highlights: [
      'Peer-reviewed publication',
      'International conference',
      'NL-to-SQL semantic parser',
      'CCTV retrieval pipeline',
    ],
    link: '#',
  },
  {
    id: '5',
    title: 'Google DeepMind Hackathon',
    rank: 'TOP 25',
    date: '2026',
    organizer: 'Google DeepMind Bangalore',
    type: 'hackathon',
    description: 'Solo 1-day sprint building AI agent with Gemini API. Top 25 finish.',
    highlights: [
      'Solo developer',
      'Rapid prototyping',
      'Agentic system design',
      'Gemini API integration',
    ],
  },
  {
    id: '6',
    title: 'Athermex Hackathon',
    rank: 'TOP 10',
    date: '2026',
    organizer: 'BMSCE × DSCE',
    type: 'hackathon',
    description: 'Antraa: 100% local synthetic data generator with differential privacy. Top 10 out of 150+ teams.',
    highlights: [
      'Differential privacy',
      'Healthcare/fintech focus',
      '450+ participants',
      'Privacy-preserving tech',
    ],
    team: ['Team Baazigar'],
  },
  {
    id: '7',
    title: 'SIH Internal Round',
    rank: 'QUALIFIED',
    date: '2024',
    organizer: 'Smart India Hackathon',
    type: 'competition',
    description: 'Team Paradox advanced with AI-powered tourist safety monitoring using geo-fencing and blockchain.',
    highlights: [
      'AI monitoring system',
      'Geo-fencing technology',
      'Blockchain digital ID',
      'National competition',
    ],
    team: ['Team Paradox'],
  },
];

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

function AchievementCard({ achievement, index, onClick }: { achievement: Achievement; index: number; onClick: () => void }) {
  const isPublication = achievement.type === 'publication';
  const randomX = (Math.random() - 0.5) * 80;
  const randomY = Math.random() * 60 + 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: randomX, y: randomY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, delay: index * 0.08, ease: E }}
      onClick={() => {
        sound.playClick?.();
        onClick();
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        border: `1px solid ${isPublication ? 'rgba(163,230,53,0.3)' : 'rgba(255,255,255,0.08)'}`,
        backgroundColor: isPublication ? 'rgba(163,230,53,0.03)' : 'rgba(255,255,255,0.01)',
        padding: 'clamp(2rem, 3vw, 2.5rem)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Rank badge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isPublication ? 3 : 2,
          backgroundColor: isPublication ? '#A3E635' : 'rgba(163,230,53,0.5)',
          boxShadow: isPublication ? '0 0 20px rgba(163,230,53,0.4)' : 'none',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: isPublication ? 'rgba(163,230,53,0.15)' : 'rgba(163,230,53,0.08)',
          border: `1px solid ${isPublication ? 'rgba(163,230,53,0.3)' : 'rgba(163,230,53,0.15)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        {isPublication ? <Award size={18} style={{ color: '#A3E635' }} /> : <Trophy size={18} style={{ color: '#A3E635' }} />}
      </div>

      {/* Rank/Status */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#A3E635',
          marginBottom: '1rem',
        }}
      >
        {achievement.rank}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)',
          letterSpacing: '-0.02em',
          color: '#F8FAFC',
          marginBottom: '0.8rem',
          lineHeight: 1.3,
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
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: 'rgba(248,250,252,0.5)',
          marginBottom: '1rem',
        }}
      >
        {achievement.description}
      </p>

      {/* Team indicator */}
      {achievement.team && (
        <div className="flex items-center gap-2">
          <Users size={12} style={{ color: 'rgba(163,230,53,0.6)' }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.05em',
              color: 'rgba(248,250,252,0.4)',
            }}
          >
            Team Project
          </span>
        </div>
      )}

      {/* Click hint */}
      <div
        style={{
          marginTop: '1.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(163,230,53,0.6)',
        }}
      >
        Click for details →
      </div>
    </motion.div>
  );
}

function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ duration: 0.4, ease: E }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '700px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          backgroundColor: '#0C0C0E',
          border: '1px solid rgba(163,230,53,0.2)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          onMouseEnter={() => sound.playHover?.()}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: 36,
            height: 36,
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          className="hover:!border-[#A3E635] hover:bg-[rgba(163,230,53,0.1)]"
        >
          <X size={16} style={{ color: '#F8FAFC' }} />
        </button>

        {/* Rank */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#A3E635',
            marginBottom: '1rem',
          }}
        >
          {achievement.rank}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            letterSpacing: '-0.025em',
            color: '#F8FAFC',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          {achievement.title}
        </h2>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2">
            <Calendar size={14} style={{ color: '#A3E635' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(248,250,252,0.6)' }}>
              {achievement.date}
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(248,250,252,0.5)' }}>
            {achievement.organizer}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(248,250,252,0.65)', marginBottom: '2rem' }}>
          {achievement.description}
        </p>

        {/* Highlights */}
        <div>
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(248,250,252,0.35)',
              marginBottom: '1rem',
            }}
          >
            Key Highlights
          </h3>
          <div className="space-y-2">
            {achievement.highlights.map((highlight, i) => (
              <div
                key={i}
                style={{
                  fontSize: '0.88rem',
                  color: 'rgba(248,250,252,0.55)',
                  paddingLeft: '1.2rem',
                  borderLeft: '2px solid rgba(163,230,53,0.3)',
                  lineHeight: 1.6,
                }}
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        {achievement.team && (
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Users size={14} style={{ color: '#A3E635' }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,250,252,0.4)',
                }}
              >
                Team Members
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievement.team.map((member) => (
                <span
                  key={member}
                  style={{
                    padding: '0.4rem 0.8rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'rgba(248,250,252,0.6)',
                  }}
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Link */}
        {achievement.link && (
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover?.()}
            style={{
              marginTop: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.8rem 1.5rem',
              backgroundColor: '#F8FAFC',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#0C0C0E',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            className="hover:bg-[#A3E635]"
          >
            View Publication
            <ExternalLink size={12} />
          </a>
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
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-20">
          <ClipLine delay={0.1}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
              <span>Competitive Track Record</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
                Wins &
              </div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
                Placements
              </div>
            </ClipLine>
          </div>

          <div style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)', overflow: 'hidden' }}>
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
              <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.45)', lineHeight: 1.7, maxWidth: '42rem' }}>
                Top finishes in hackathons, buildathons, and competitions. Plus one IEEE publication.
              </p>
            </motion.div>
          </div>
        </div>

        {/* MOSAIC GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
              onClick={() => setSelected(achievement)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && <AchievementModal achievement={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
