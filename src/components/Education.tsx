/**
 * Education.tsx — Full-bleed minimal statement
 *
 * SIGNATURE BOLDNESS: Single massive card that feels like a magazine spread
 * Massive "D" watermark, editorial spacing, confident minimalism
 * Inspired by: Dan Mall's resume + Paul Kalkbrenner's tour section
 * 
 * UNIQUE ELEMENTS:
 * - Full-width editorial card (not boxy grid)
 * - Oversized university initial as design element
 * - Pulsing "Currently Pursuing" badge
 * - Minimal, confident layout with breathing room
 */

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const E = [0.76, 0, 0.24, 1] as const;

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

export default function Education() {
  return (
    <section
      id="education"
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
        <div className="mb-16">
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
              <span>Academic Foundation</span>
            </div>
          </ClipLine>

          <ClipLine delay={0.2}>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: '#F8FAFC',
              }}
            >
              Education
            </div>
          </ClipLine>
        </div>

        {/* MAIN EDITORIAL CARD */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 1.2, ease: E }}
          style={{
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.01)',
            overflow: 'hidden',
          }}
        >
          {/* Green accent bar */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background: 'linear-gradient(to bottom, transparent, #A3E635, transparent)',
            }}
          />

          {/* Massive "D" watermark */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(-3rem, -5vw, -2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(18rem, 32vw, 28rem)',
              lineHeight: 0.8,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(163,230,53,0.05)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            D
          </div>

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: 'clamp(3.5rem, 7vw, 6rem) clamp(2.5rem, 5vw, 5rem)',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
            }}
            className="lg:grid-cols-[1.5fr_1fr]"
          >
            {/* LEFT: Main info */}
            <div>
              {/* Status badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '2rem',
                  padding: '0.6rem 1.2rem',
                  border: '1px solid rgba(163,230,53,0.3)',
                  backgroundColor: 'rgba(163,230,53,0.06)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#A3E635',
                }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#A3E635',
                  }}
                />
                Currently Pursuing
              </div>

              {/* Degree */}
              <h3
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#F8FAFC',
                  marginBottom: '1rem',
                }}
              >
                Bachelor of Engineering
              </h3>

              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                  letterSpacing: '-0.01em',
                  color: 'rgba(248,250,252,0.6)',
                  marginBottom: '3rem',
                }}
              >
                Information Science & Engineering
              </p>

              {/* Institution details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      backgroundColor: 'rgba(163,230,53,0.1)',
                      border: '1px solid rgba(163,230,53,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <GraduationCap size={16} style={{ color: '#A3E635' }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      letterSpacing: '0.02em',
                      color: 'rgba(248,250,252,0.75)',
                    }}
                  >
                    Dayananda Sagar College of Engineering
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      backgroundColor: 'rgba(163,230,53,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MapPin size={15} style={{ color: '#A3E635' }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.02em',
                      color: 'rgba(248,250,252,0.6)',
                    }}
                  >
                    Bengaluru, Karnataka
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      backgroundColor: 'rgba(163,230,53,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Calendar size={15} style={{ color: '#A3E635' }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.02em',
                      color: 'rgba(248,250,252,0.6)',
                    }}
                  >
                    2024 – Present
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
