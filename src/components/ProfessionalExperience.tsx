/**
 * ProfessionalExperience.tsx — Premium editorial cards
 *
 * SIGNATURE BOLDNESS: Magazine-style asymmetric cards with massive outlined typography
 * Inspired by: Vogue layouts, Apple career pages, Awwwards FWA winners
 * 
 * UNIQUE ELEMENTS:
 * - Asymmetric bento-style grid
 * - Massive outlined role titles
 * - Rich gradient overlays on hover
 * - Floating year badges
 * - Dramatic depth with shadows
 * - Current role spotlight effect
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';

const E = [0.76, 0, 0.24, 1] as const;

interface Experience {
  role: string;
  company: string;
  period: string;
  year: string;
  type: string;
  summary: string;
  highlights: string[];
  links?: { label: string; url: string; isPlayStore?: boolean }[];
  current?: boolean;
  featured?: boolean;
}

const experiences: Experience[] = [
  {
    role: 'Part-Time Software Developer',
    company: 'Vina EduTech Pvt. Ltd.',
    period: 'Jul 2026 – Present',
    year: '26',
    type: 'Production',
    current: true,
    featured: true,
    summary:
      'Leading mobile and web development initiatives for flagship products. Shipped Crickraft AMS (web + Android on Play Store), StrengthKraft platform (web + Android on Play Store), and the official Vina EduTech corporate platform.',
    highlights: [
      'Crickraft & StrengthKraft • Dual platform (Web + Play Store)',
      'React Native • Cross-platform mobile development',
      'Professional CI/CD • Code reviews • API routing',
      'Full stack deployment • Cloud infrastructure',
    ],
    links: [
      { label: 'Crickraft Web', url: 'https://crickraft.vinaedutech.com/' },
      { label: 'StrengthKraft Web', url: 'https://strengthkraft.vinaedutech.com/' },
      { label: 'StrengthKraft App', url: 'https://play.google.com/store/apps/details?id=com.vinaedutech.strengthkraft', isPlayStore: true },
    ],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'Indian Chess Academy',
    period: 'Jan 2026 – Jun 2026',
    year: '26',
    type: 'Internship',
    featured: true,
    summary:
      'Built and deployed the complete production website for Indian Chess Academy from scratch. Full-stack development including frontend, backend, database design, and cloud deployment.',
    highlights: [
      'Complete website development • Frontend + Backend',
      'Database architecture • Cloud deployment',
      'SEO optimization • Responsive design',
      'Live production deployment',
    ],
    links: [
      { label: 'Indian Chess Academy', url: 'https://indianchessacad.com' },
    ],
  },
  {
    role: 'AI Research Intern',
    company: 'Grep Digital',
    period: 'Oct 2025 – Mar 2026',
    year: '25',
    type: 'Research',
    featured: true,
    summary:
      'Natural language to SQL engines and CCTV video retrieval for Drishti AI. IEEE TENCON 2026 accepted paper.',
    highlights: [
      'NL-to-SQL semantic parser design',
      'CCTV retrieval pipeline • Drishti AI',
      'IEEE TENCON 2026 publication',
    ],
    links: [
      { label: 'IEEE Paper', url: '#achievements' },
    ],
  },
  {
    role: 'Freelance Developer',
    company: 'Independent',
    period: '2025 – Present',
    year: '25',
    type: 'Freelance',
    current: true,
    summary:
      'Production client websites and published Play Store apps. Crickraft AMS and Velvet Academy.',
    highlights: [
      'Crickraft AMS • Google Play Store',
      'Velvet Academy • Full production site',
      'SEO • Responsive • Cloud services',
    ],
    links: [
      { label: 'Crickraft AMS', url: 'https://play.google.com/store/apps/details?id=com.crickraft.ams', isPlayStore: true },
      { label: 'velvetacademy.org', url: 'https://velvetacademy.org/' },
    ],
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

export default function ProfessionalExperience() {
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        fontFamily: "'Inter Tight', sans-serif",
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(163,230,53,0.08), transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* SECTION HEADER */}
      <div className="mb-20 max-w-7xl mx-auto">
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
            <span>Career Journey</span>
          </div>
        </ClipLine>

        <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.045em' }}>
          <ClipLine delay={0.2}>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F8FAFC' }}>
              Experience
            </div>
          </ClipLine>
          <ClipLine delay={0.35}>
            <div 
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 7rem)', 
                color: 'transparent', 
                WebkitTextStroke: '2px #A3E635',
                marginTop: '-0.5rem',
              }}
            >
              & Impact
            </div>
          </ClipLine>
        </div>
      </div>

      {/* ASYMMETRIC CARDS GRID */}
      <div className="max-w-7xl mx-auto">
        <div 
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          }}
        >
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company + exp.role}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: index * 0.15, ease: E }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                position: 'relative',
                background: exp.current 
                  ? 'linear-gradient(135deg, rgba(163,230,53,0.08) 0%, rgba(12,12,14,0.95) 60%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(12,12,14,0.9) 60%)',
                border: `2px solid ${exp.current ? 'rgba(163,230,53,0.25)' : 'rgba(255,255,255,0.1)'}`,
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
                // Featured cards span more columns
                gridColumn: exp.featured && index === 0 ? 'span 2' : 'span 1',
                minHeight: exp.featured ? '550px' : '500px',
              }}
              onMouseEnter={() => sound.playHover?.()}
            >
              {/* Hover gradient overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: exp.current
                    ? 'radial-gradient(circle at top right, rgba(163,230,53,0.12), transparent 60%)'
                    : 'radial-gradient(circle at top right, rgba(255,255,255,0.04), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Floating year badge */}
              <motion.div
                initial={{ rotate: -12, scale: 0 }}
                whileInView={{ rotate: -12, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: E }}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: 'clamp(70px, 8vw, 90px)',
                  height: 'clamp(70px, 8vw, 90px)',
                  border: `2px solid ${exp.current ? '#A3E635' : 'rgba(255,255,255,0.15)'}`,
                  background: exp.current ? 'rgba(163,230,53,0.08)' : 'rgba(255,255,255,0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                  color: exp.current ? '#A3E635' : 'rgba(248,250,252,0.4)',
                }}
              >
                '{exp.year}
              </motion.div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                {/* Header */}
                <div className="flex items-start gap-3 mb-4 flex-wrap">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: exp.current ? '#A3E635' : 'rgba(248,250,252,0.5)',
                      padding: '0.6rem 1.1rem',
                      border: `1px solid ${exp.current ? 'rgba(163,230,53,0.3)' : 'rgba(255,255,255,0.15)'}`,
                      background: exp.current ? 'rgba(163,230,53,0.08)' : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    {exp.type}
                  </span>
                  
                  {exp.current && (
                    <motion.div
                      animate={{ 
                        opacity: [1, 0.5, 1],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        color: '#A3E635',
                        padding: '0.6rem 1.1rem',
                        border: '1px solid rgba(163,230,53,0.3)',
                        background: 'rgba(163,230,53,0.08)',
                      }}
                    >
                      <Sparkles size={11} />
                      ACTIVE NOW
                    </motion.div>
                  )}
                </div>

                {/* Period */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: '#A3E635',
                    marginBottom: '1.5rem',
                  }}
                >
                  {exp.period}
                </div>

                {/* Massive role title */}
                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 900,
                    fontSize: exp.featured ? 'clamp(2.2rem, 4.5vw, 4rem)' : 'clamp(1.8rem, 3.5vw, 3rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.035em',
                    color: '#F8FAFC',
                    marginBottom: '1rem',
                    maxWidth: '85%',
                    textTransform: 'uppercase',
                  }}
                >
                  {exp.role}
                </h3>

                {/* Company with underline accent */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(248,250,252,0.7)',
                      marginBottom: '0.8rem',
                    }}
                  >
                    {exp.company}
                  </div>
                  <div 
                    style={{ 
                      width: 'clamp(60px, 15%, 120px)',
                      height: 3,
                      background: `linear-gradient(90deg, ${exp.current ? '#A3E635' : 'rgba(255,255,255,0.3)'}, transparent)`,
                    }} 
                  />
                </div>

                {/* Summary */}
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: 'rgba(248,250,252,0.7)',
                    marginBottom: '2rem',
                  }}
                >
                  {exp.summary}
                </p>

                {/* Highlights - clean list */}
                <div className="space-y-2.5 mb-auto">
                  {exp.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: '0.95rem',
                        color: 'rgba(248,250,252,0.6)',
                        paddingLeft: '1.5rem',
                        borderLeft: `3px solid ${exp.current ? 'rgba(163,230,53,0.3)' : 'rgba(255,255,255,0.2)'}`,
                        lineHeight: 1.65,
                      }}
                    >
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* Links - premium buttons */}
                {exp.links && exp.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    {exp.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playHover?.()}
                        data-cursor-text="VIEW"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.7rem',
                          padding: '0.85rem 1.4rem',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.02)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(248,250,252,0.7)',
                          textDecoration: 'none',
                          transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
                        }}
                        className="hover:!border-[#A3E635] hover:!text-[#F8FAFC] hover:bg-[rgba(163,230,53,0.08)] hover:translate-y-[-2px]"
                      >
                        {link.isPlayStore ? <Smartphone size={14} /> : <Globe size={14} />}
                        <span>{link.label}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
