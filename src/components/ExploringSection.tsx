/**
 * ExploringSection.tsx — Floating cards with depth
 *
 * SIGNATURE BOLDNESS: Cards that float at different Z-depths creating 3D effect
 * Each card has parallax on scroll and expands on hover
 * Inspired by: Componine's layered depth + Art Yakushev's floating elements
 * 
 * UNIQUE ELEMENTS:
 * - Cards float with subtle parallax
 * - Different rotation angles for visual interest
 * - Hover expands and brings to front (z-index change)
 * - Tags flow like water inside cards
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Code2, Cloud, Shield, Rocket } from 'lucide-react';

const E = [0.76, 0, 0.24, 1] as const;

const categories = [
  {
    icon: Brain,
    title: 'AI Security & Local LLMs',
    items: ['Ollama', 'Local Model Routing', 'Prompt Guardrails', 'Secure Inference', 'Model Evaluation', 'Safety Policies'],
  },
  {
    icon: Code2,
    title: 'Full-Stack Product Engineering',
    items: ['Next.js', 'WebSocket Workflows', 'Event-Driven APIs', 'Advanced Auth', 'Caching Patterns', 'System Design'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    items: ['AWS Core Services', 'GCP Services', 'Docker Compose', 'CI/CD Pipelines', 'Observability', 'Cost-Aware Deployment'],
  },
  {
    icon: Shield,
    title: 'Secure Developer Tooling',
    items: ['Semgrep Rule Tuning', 'Dependency Risk Scoring', 'Secret Scanning', 'Extension Security', 'Rollback Automation', 'Threat Modeling'],
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

export default function ExploringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  
  return (
    <section
      ref={sectionRef}
      id="exploring"
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
              <span>What's Next</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
                Currently
              </div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
                Exploring
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
                Active learning tracks and emerging technologies I'm diving into right now.
              </p>
            </motion.div>
          </div>
        </div>

        {/* FLOATING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const y = useTransform(scrollYProgress, [0, 1], [50 * (index % 2), -50 * (index % 2)]);
            
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 80, rotate: index % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.1, delay: index * 0.15, ease: E }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                style={{
                  y,
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  padding: 'clamp(2.5rem, 4vw, 3.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: 'rgba(163,230,53,0.08)',
                    border: '1px solid rgba(163,230,53,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                  }}
                >
                  <Icon size={24} style={{ color: '#A3E635' }} />
                </motion.div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                    letterSpacing: '-0.02em',
                    color: '#F8FAFC',
                    marginBottom: '2rem',
                    lineHeight: 1.3,
                  }}
                >
                  {cat.title}
                </h3>

                {/* Items - flowing tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + i * 0.05, ease: E }}
                      whileHover={{ scale: 1.08, backgroundColor: 'rgba(163,230,53,0.1)' }}
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 0.9rem',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.02em',
                        color: 'rgba(248,250,252,0.6)',
                        cursor: 'default',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                {/* Corner accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: 'radial-gradient(circle at top right, rgba(163,230,53,0.06), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: E }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            border: '1px solid rgba(163,230,53,0.15)',
            backgroundColor: 'rgba(163,230,53,0.02)',
          }}
        >
          <Rocket size={20} style={{ color: '#A3E635' }} />
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'rgba(248,250,252,0.6)',
              textAlign: 'center',
            }}
          >
            Learning in public · Building in sprints · Improving every release
          </p>
        </motion.div>
      </div>
    </section>
  );
}
