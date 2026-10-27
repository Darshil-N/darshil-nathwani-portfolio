/**
 * ProfessionalExperience.tsx — Horizontal scroll timeline
 *
 * SIGNATURE BOLDNESS: Side-scrolling cards with massive outlined years floating behind content
 * Inspired by: Paul Kalkbrenner's tour dates meets Componine's kinetic layouts
 * 
 * UNIQUE ELEMENTS:
 * - Horizontal scroll experience (desktop)
 * - Massive floating year numbers that parallax slower than cards
 * - Asymmetric card sizes based on role significance
 * - Active roles pulse with green glow
 * - Snap-scroll behavior for premium feel
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Smartphone, Globe, ArrowUpRight } from 'lucide-react';
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
  featured?: boolean; // Make some cards bigger
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
      'Leading mobile and web development initiatives. Shipped the official Vina EduTech platform, StrengthKraft web ecosystem, and the published StrengthKraft Android application on Google Play Store.',
    highlights: [
      'Cross-platform mobile apps • React Native',
      'StrengthKraft platform • Play Store published',
      'Professional CI/CD • Code reviews • API routing',
    ],
    links: [
      { label: 'vinaedutech.com', url: 'https://www.vinaedutech.com/' },
      { label: 'StrengthKraft', url: 'https://play.google.com/store/apps/details?id=com.vinaedutech.strengthkraft', isPlayStore: true },
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Indian Chess Academy',
    period: 'Apr – Jun 2026',
    year: '26',
    type: 'Internship',
    summary:
      'Offered role after 1st place hackathon win. Shipped official academy website, tournament workflows, and admin dashboards.',
    highlights: [
      'Official website • indianchessacad.com',
      'Admin dashboards • Player management',
      'Weekly sprints • Frontend + Backend',
    ],
    links: [
      { label: 'indianchessacad.com', url: 'https://indianchessacad.com' },
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
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  
  // Parallax for background years
  const yearX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        fontFamily: "'Inter Tight', sans-serif",
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* SECTION HEADER */}
      <div className="px-6 sm:px-10 lg:px-16 mb-16">
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
            <span>Career Timeline</span>
          </div>
        </ClipLine>

        <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
          <ClipLine delay={0.2}>
            <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
              Production
            </div>
          </ClipLine>
          <ClipLine delay={0.35}>
            <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
              Not Promises
            </div>
          </ClipLine>
        </div>
      </div>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div style={{ position: 'relative' }}>
        {/* Massive floating year indicators (parallax background) */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            x: yearX,
            y: '-50%',
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(15rem, 28vw, 25rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(163,230,53,0.04)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          25 · 26 · 27
        </motion.div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="hide-scrollbar"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '2rem clamp(1.5rem, 4vw, 4rem)',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: E }}
              style={{
                scrollSnapAlign: 'center',
                flexShrink: 0,
                width: exp.featured ? 'clamp(380px, 42vw, 520px)' : 'clamp(320px, 36vw, 440px)',
                height: exp.featured ? 'auto' : 'auto',
                minHeight: exp.featured ? '520px' : '460px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: exp.current ? 'rgba(163,230,53,0.02)' : 'rgba(255,255,255,0.01)',
                padding: 'clamp(2rem, 3vw, 3rem)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
              whileHover={{
                borderColor: exp.current ? 'rgba(163,230,53,0.4)' : 'rgba(255,255,255,0.18)',
                y: -8,
              }}
            >
              {/* Active glow */}
              {exp.current && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: '#A3E635',
                    boxShadow: '0 0 20px rgba(163,230,53,0.4)',
                  }}
                />
              )}

              {/* Type badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  padding: '0.4rem 0.8rem',
                  border: `1px solid ${exp.current ? 'rgba(163,230,53,0.3)' : 'rgba(255,255,255,0.15)'}`,
                  backgroundColor: exp.current ? 'rgba(163,230,53,0.08)' : 'rgba(255,255,255,0.03)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: exp.current ? '#A3E635' : 'rgba(248,250,252,0.5)',
                }}
              >
                {exp.current && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      backgroundColor: '#A3E635',
                    }}
                  />
                )}
                {exp.type}
              </div>

              {/* Period */}
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10.5px',
                  letterSpacing: '0.08em',
                  color: '#A3E635',
                  marginBottom: '1.5rem',
                }}
              >
                {exp.period}
              </p>

              {/* Role */}
              <h3
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: exp.featured ? 'clamp(1.5rem, 2.2vw, 2rem)' : 'clamp(1.3rem, 1.9vw, 1.7rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#F8FAFC',
                  marginBottom: '0.5rem',
                }}
              >
                {exp.role}
              </h3>

              {/* Company */}
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.03em',
                  color: 'rgba(248,250,252,0.55)',
                  marginBottom: '1.5rem',
                }}
              >
                {exp.company}
              </p>

              {/* Summary */}
              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  color: 'rgba(248,250,252,0.5)',
                  marginBottom: '1.5rem',
                }}
              >
                {exp.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-6">
                {exp.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(248,250,252,0.42)',
                      lineHeight: 1.6,
                      paddingLeft: '1rem',
                      borderLeft: '2px solid rgba(163,230,53,0.2)',
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Links */}
              {exp.links && exp.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {exp.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      className="group"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.85rem',
                        border: '1px solid rgba(255,255,255,0.12)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9.5px',
                        letterSpacing: '0.05em',
                        color: 'rgba(248,250,252,0.5)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#A3E635';
                        e.currentTarget.style.color = '#F8FAFC';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                        e.currentTarget.style.color = 'rgba(248,250,252,0.5)';
                      }}
                    >
                      {link.isPlayStore ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* End spacer */}
          <div style={{ width: '2rem', flexShrink: 0 }} />
        </div>

        {/* Scroll hint */}
        <div
          className="hidden lg:flex"
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            writingMode: 'vertical-rl',
            pointerEvents: 'none',
          }}
        >
          Scroll →
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163,230,53,0.3);
          border-radius: 3px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163,230,53,0.5);
        }
      `}</style>
    </section>
  );
}
