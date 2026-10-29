/**
 * ProjectModal.tsx — Shared project dialog
 *
 * Used by both the home page Featured list and the /projects archive.
 * SIGNATURE: a full-screen curtain reveal with a reading-progress bar, a huge
 * word-by-word title, numbered editorial sections, ←/→ to move between
 * projects, and a giant "next project" footer.
 */

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import { sound } from '../lib/sound';
import { techIcons } from './techIcons';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

export interface ModalProject {
  number: string;
  title: string;
  category: string;
  badges?: string[];
  summary: string;
  architecture?: string;
  metrics?: string[];
  features?: string[];
  challenges?: string[];
  learnings?: string[];
  techStack: string[];
  github?: string;
  liveDemo?: string;
}

interface Neighbour {
  number: string;
  title: string;
}

interface Props {
  project: ModalProject;
  /** e.g. "03 / 21" */
  position?: string;
  prev?: Neighbour;
  next?: Neighbour;
  onPrev?: () => void;
  onNext?: () => void;
  onClose: () => void;
}

/** One numbered list: rows with a glyph, hairlines and a lime bar on hover. */
function RowList({ items, glyph }: { items: string[]; glyph: string }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.06, ease: E }}
          className="group relative flex gap-4 sm:gap-6"
          style={{ padding: 'clamp(0.9rem, 1.6vw, 1.25rem) 0.3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
            style={{ backgroundColor: LIME }}
          />
          <span style={{ ...MONO, fontSize: 11, letterSpacing: '0.18em', color: LIME, minWidth: 34, paddingTop: 4 }}>
            {glyph}
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="transition-transform duration-500 group-hover:translate-x-2" style={{ fontSize: 'clamp(1rem, 1.35vw, 1.2rem)', lineHeight: 1.6, color: 'rgba(248,250,252,0.85)' }}>
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function Section({ index, label, children }: { index: number; label: string; children: React.ReactNode }) {
  return (
    <section className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-x-12 gap-y-6" style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="lg:sticky lg:self-start" style={{ top: '6rem' }}>
        <div
          aria-hidden
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: `1.5px ${LIME}`,
          }}
        >
          {String(index).padStart(2, '0')}
        </div>
        <div style={{ ...MONO, marginTop: 12, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.7)' }}>{label}</div>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default function ProjectModal({ project, position, prev, next, onPrev, onNext, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Touch: swipe sideways to go to the next / previous project.
  const swipe = (e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (!('pointerType' in e) || e.pointerType !== 'touch') return;
    if (Math.abs(info.offset.x) < 80 || Math.abs(info.offset.x) < Math.abs(info.offset.y) * 1.6) return;
    if (info.offset.x < 0) onNext?.();
    else onPrev?.();
  };

  // Reading progress of the scrolling panel (not the page).
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Lock page scroll, focus the close button, wire up the keyboard.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && onNext) onNext();
      else if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNext, onPrev]);

  // Back to the top whenever the project changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.title]);

  const sections: { label: string; body: React.ReactNode }[] = [];
  if (project.architecture) {
    sections.push({
      label: 'Architecture',
      body: <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)', lineHeight: 1.7, color: 'rgba(248,250,252,0.82)', maxWidth: 820 }}>{project.architecture}</p>,
    });
  }
  if (project.metrics?.length) {
    sections.push({ label: 'Impact', body: <RowList items={project.metrics} glyph="✓" /> });
  }
  if (project.features?.length) {
    sections.push({ label: 'Features', body: <RowList items={project.features} glyph="F" /> });
  }
  if (project.challenges?.length) {
    sections.push({ label: 'Challenges', body: <RowList items={project.challenges} glyph="C" /> });
  }
  if (project.learnings?.length) {
    sections.push({ label: 'Learnings', body: <RowList items={project.learnings} glyph="L" /> });
  }
  sections.push({
    label: 'Stack',
    body: (
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        {project.techStack.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: E }}
            className="group flex flex-col justify-between transition-colors hover:!border-[#A3E635]/60"
            style={{ minHeight: 108, padding: '1rem 1.1rem', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <span style={{ color: LIME, fontSize: 28, lineHeight: 1, display: 'flex' }} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6">
              {techIcons[t] ?? <span style={{ ...MONO, fontSize: 18 }}>{'</>'}</span>}
            </span>
            <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em', color: '#F8FAFC' }}>{t}</span>
          </motion.div>
        ))}
      </div>
    ),
  });

  const words = project.title.split(' ');

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.75, ease: E }}
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 99999, backgroundColor: '#0C0C0E', color: '#F8FAFC' }}
    >
      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: LIME, boxShadow: '0 0 12px rgba(163,230,53,0.8)', transformOrigin: '0 50%', scaleX: progress, zIndex: 5 }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-6 sm:px-10 lg:px-16" style={{ height: 'calc(72px + env(safe-area-inset-top, 0px))', paddingTop: 'env(safe-area-inset-top, 0px)', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)' }}>
          <span style={{ color: LIME }}>◈</span>&nbsp;&nbsp;Project {position ?? project.number}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {onPrev && (
            <button type="button" onClick={() => { sound.playClick?.(); onPrev(); }} onMouseEnter={() => sound.playHover?.()} aria-label="Previous project" className="flex items-center justify-center transition-colors hover:!border-[#A3E635] hover:!text-[#A3E635]" style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)' }}>
              <ArrowLeft size={16} />
            </button>
          )}
          {onNext && (
            <button type="button" onClick={() => { sound.playClick?.(); onNext(); }} onMouseEnter={() => sound.playHover?.()} aria-label="Next project" className="flex items-center justify-center transition-colors hover:!border-[#A3E635] hover:!text-[#A3E635]" style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)' }}>
              <ArrowRight size={16} />
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={() => { sound.playClick?.(); onClose(); }}
            onMouseEnter={() => sound.playHover?.()}
            aria-label="Close project"
            className="inline-flex items-center gap-3 transition-colors hover:!bg-[#A3E635] hover:!text-[#0C0C0E] hover:!border-[#A3E635]"
            style={{ ...MONO, height: 42, padding: '0 1.1rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}
          >
            <span className="hidden sm:inline">Close · Esc</span>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Scrolling content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar" style={{ overscrollBehavior: 'contain' }}>
        <motion.div key={project.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} onPanEnd={swipe} className="px-6 sm:px-10 lg:px-16 mx-auto relative" style={{ touchAction: 'pan-y', maxWidth: 1500, paddingTop: 'clamp(2.5rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          {/* Giant number */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              right: 'clamp(0.5rem, 2vw, 2rem)',
              top: 'clamp(1rem, 3vw, 3rem)',
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(10rem, 28vw, 26rem)',
              lineHeight: 0.8,
              letterSpacing: '-0.06em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(163,230,53,0.14)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {project.number}
          </div>

          {/* Hero */}
          <div className="relative" style={{ paddingBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div className="flex flex-wrap items-center gap-3" style={{ ...MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: LIME, marginBottom: '1.6rem' }}>
              <span>◆ {project.category}</span>
              {project.badges?.map((b) => (
                <span key={b} style={{ background: LIME, color: '#0C0C0E', fontWeight: 700, letterSpacing: '0.16em', padding: '0.3rem 0.65rem' }}>
                  {b}
                </span>
              ))}
            </div>

            <h2
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: 'clamp(2.4rem, 7.2vw, 6.6rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.045em',
                maxWidth: '16ch',
              }}
            >
              {words.map((w, i) => (
                <span key={`${project.title}-${i}`} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.22em' }}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: E }}
                    style={{ display: 'inline-block', ...(i === words.length - 1 && words.length > 1 ? { color: 'transparent', WebkitTextStroke: `1.5px ${LIME}` } : {}) }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: E }}
              style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.45rem)', lineHeight: 1.65, color: 'rgba(248,250,252,0.72)', maxWidth: 780, marginTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              {project.summary}
            </motion.p>

            {(project.liveDemo || project.github) && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: E }}
                className="flex flex-wrap gap-3"
                style={{ marginTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              >
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover?.()} data-cursor-text="LIVE" className="group inline-flex items-center gap-3 transition-colors hover:!bg-[#F8FAFC]" style={{ ...MONO, padding: '1rem 1.7rem', backgroundColor: LIME, color: '#0C0C0E', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    <ExternalLink size={15} /> Live platform
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover?.()} data-cursor-text="CODE" className="inline-flex items-center gap-3 transition-colors hover:!border-[#A3E635] hover:!text-[#A3E635]" style={{ ...MONO, padding: '1rem 1.7rem', border: '1px solid rgba(255,255,255,0.35)', color: '#F8FAFC', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    <Github size={15} /> Source code
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Numbered sections */}
          <div className="relative">
            {sections.map((s, i) => (
              <Section key={s.label} index={i + 1} label={s.label}>
                {s.body}
              </Section>
            ))}
          </div>

          {/* Next project */}
          {next && onNext && (
            <button
              type="button"
              onClick={() => { sound.playClick?.(); onNext(); }}
              onMouseEnter={() => sound.playHover?.()}
              data-cursor-text="NEXT"
              className="group relative w-full text-left overflow-hidden"
              style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', padding: 'clamp(2rem, 4vw, 3.5rem) 0', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.5)' }}>Next project · {next.number}</span>
              <span className="flex items-end justify-between gap-6" style={{ marginTop: '1rem' }}>
                <span
                  className="transition-all duration-500 group-hover:translate-x-4 group-hover:text-[#A3E635]"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem, 6vw, 5.5rem)', lineHeight: 0.92, letterSpacing: '-0.045em', transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                >
                  {next.title}
                </span>
                <ArrowRight className="flex-shrink-0 transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#A3E635]" size={44} />
              </span>
            </button>
          )}
        </motion.div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163,230,53,0.35); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(163,230,53,0.55); }
      `}</style>
    </motion.div>
  );
}
