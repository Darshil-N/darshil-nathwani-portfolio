/**
 * SoftSkills.tsx — Diagonal split layout with staggered reveals
 *
 * SIGNATURE BOLDNESS: Cards arranged in diagonal cascading layout
 * Each card slides in from alternating directions creating visual flow
 * Inspired by: A Love Hate Story's asymmetric grids + Trevor Noah's editorial cards
 * 
 * UNIQUE ELEMENTS:
 * - Diagonal/offset grid creates visual rhythm
 * - Cards slide from alternating L/R with rotation
 * - Massive index numbers with gradient fills
 * - Icon boxes that expand on hover revealing more info
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, MessageCircle, Clock, Search, Target, Brain, TrendingUp } from 'lucide-react';

const E = [0.76, 0, 0.24, 1] as const;

const softSkills = [
  { num: '01', icon: Search, label: 'Problem Solving', desc: 'Breaking complexity into clear, solvable parts.' },
  { num: '02', icon: Brain, label: 'Adaptability', desc: 'New stack? New domain? I ramp fast and deliver.' },
  { num: '03', icon: TrendingUp, label: 'Continuous Learning', desc: 'Every project is a chance to go deeper.' },
  { num: '04', icon: Users, label: 'Teamwork', desc: 'Best code comes from collaboration, not isolation.' },
  { num: '05', icon: MessageCircle, label: 'Communication', desc: 'Explain ML pipelines to non-technical founders.' },
  { num: '06', icon: Lightbulb, label: 'Innovation', desc: 'Finding the non-obvious answer that works better.' },
  { num: '07', icon: Target, label: 'Goal-Oriented', desc: 'Lock on what matters, cut everything else.' },
  { num: '08', icon: Clock, label: 'Time Management', desc: 'Ship what counts, on time, every time.' },
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

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function SoftSkills() {
  const { ref: gridRef, inView: gridInView } = useInView(0.05);

  return (
    <section
      id="softskills"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(163,230,53,0.04), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

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
              <span>Human Stack</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
                Beyond
              </div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
                The Syntax
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
                Technical skills get you in the room. These keep you there.
              </p>
            </motion.div>
          </div>
        </div>

        {/* DIAGONAL OFFSET GRID */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={skill.num}
                initial={{
                  opacity: 0,
                  x: isLeft ? -80 : 80,
                  y: 60,
                  rotate: isLeft ? -3 : 3,
                }}
                animate={gridInView ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                } : {}}
                transition={{
                  duration: 1,
                  delay: index * 0.08,
                  ease: E,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  padding: 'clamp(2rem, 3vw, 2.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Massive number background */}
                <div
                  style={{
                    position: 'absolute',
                    right: '-0.5rem',
                    top: '-0.5rem',
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(5rem, 8vw, 6.5rem)',
                    lineHeight: 0.9,
                    background: 'linear-gradient(135deg, rgba(163,230,53,0.08), rgba(163,230,53,0.02))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {skill.num}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: 'rgba(163,230,53,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(163,230,53,0.2)',
                  }}
                >
                  <Icon size={20} style={{ color: '#A3E635' }} />
                </motion.div>

                {/* Label */}
                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                    letterSpacing: '-0.01em',
                    color: '#F8FAFC',
                    marginBottom: '0.8rem',
                  }}
                >
                  {skill.label}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: 'rgba(248,250,252,0.5)',
                  }}
                >
                  {skill.desc}
                </p>

                {/* Hover accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 2,
                    backgroundColor: '#A3E635',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
