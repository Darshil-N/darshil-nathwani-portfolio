/**
 * ProfessionalExperience.tsx — Scroll-drawn timeline with a spotlight
 *
 * SIGNATURE: a lime line draws itself down the page as you scroll. Each role
 * has a node that ignites when the line reaches it, and the role at the centre
 * of the screen is lit while the rest dim.
 *
 * Text is scroll-driven too: titles fill from outline to solid, summaries
 * brighten word by word, the ghost year drifts with parallax.
 *
 * Freelance doesn't fit a single-file chain (no end date, overlaps everything),
 * so it runs as a PARALLEL TRACK: a dashed second line beside the main one,
 * with its own block at the bottom.
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Smartphone, Globe, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/sound';
import { experiences, totalWorkedMonths, type Experience } from '../data/experience';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const RAIL = 'clamp(14px, 3vw, 34px)'; // x of the main timeline
const LANE = 'clamp(10px, 1.8vw, 22px)'; // gap from main line to the parallel line
const LANE_X = `calc(${RAIL} + ${LANE})`;
const INDENT = `calc(${LANE_X} + clamp(16px, 5vw, 60px))`;

const CSS = `
@keyframes xp-flow { from { background-position: 0 0; } to { background-position: 0 -16px; } }
.xp-lane { animation: xp-flow 1.1s linear infinite; }
@media (prefers-reduced-motion: reduce) { .xp-lane { animation: none; } }
`;

/** Slide-up reveal. Watches the visible wrapper: the moving child starts fully
 *  clipped, and clipped content never counts as "in view". */
function ClipLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: inView ? '0%' : '110%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Scroll-driven text pieces ─────────────────────────────────── */

/** Heading that starts as an outline and fills solid as `progress` goes 0 → 1. */
function FillTitle({
  text,
  progress,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  style: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const position = useTransform(progress, [0.02, 0.34], ['100% 0%', '0% 0%']);

  if (reduce) {
    return <h3 style={{ ...style, color: '#F8FAFC' }}>{text}</h3>;
  }
  return (
    <motion.h3
      style={{
        ...style,
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        WebkitTextStroke: '1.5px rgba(248,250,252,0.42)',
        backgroundImage:
          'linear-gradient(90deg, #F8FAFC 0%, #F8FAFC 46%, rgba(248,250,252,0) 54%, rgba(248,250,252,0) 100%)',
        backgroundSize: '220% 100%',
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
    >
      {text}
    </motion.h3>
  );
}

function Word({
  word,
  progress,
  from,
  to,
}: {
  word: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const opacity = useTransform(progress, [from, to], [0.16, 1]);
  const y = useTransform(progress, [from, to], [7, 0]);
  return (
    <motion.span style={{ display: 'inline-block', opacity, y }}>{word}</motion.span>
  );
}

/** Paragraph that brightens word by word as `progress` advances. */
function ScrollWords({
  text,
  progress,
  start = 0.12,
  spread = 0.5,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  start?: number;
  spread?: number;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  if (reduce) return <p style={style}>{text}</p>;
  return (
    <p style={style} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => {
          const from = start + (i / words.length) * spread;
          return (
            <React.Fragment key={i}>
              <Word word={w} progress={progress} from={from} to={from + 0.1} />{' '}
            </React.Fragment>
          );
        })}
      </span>
    </p>
  );
}

/* ── Shared bits ───────────────────────────────────────────────── */

function Links({ exp }: { exp: Experience }) {
  if (!exp.links?.length) return null;
  return (
    <div className="flex flex-wrap gap-3" style={{ marginTop: '2rem' }}>
      {exp.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target={link.url.startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
          onMouseEnter={() => sound.playHover?.()}
          data-cursor-text="VIEW"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            padding: '0.85rem 1.3rem',
            border: '1px solid rgba(255,255,255,0.16)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(248,250,252,0.8)',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.76,0,0.24,1)',
          }}
          className="hover:!border-[#A3E635] hover:!text-[#0C0C0E] hover:!bg-[#A3E635]"
        >
          {link.isPlayStore ? <Smartphone size={14} /> : <Globe size={14} />}
          <span>{link.label}</span>
          <ArrowUpRight size={12} />
        </a>
      ))}
    </div>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((h, i) => (
        <motion.li
          key={h}
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08 * i, ease: E }}
          className="flex gap-3"
          style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(248,250,252,0.62)' }}
        >
          <span style={{ color: LIME, flexShrink: 0 }}>→</span>
          <span>{h}</span>
        </motion.li>
      ))}
    </ul>
  );
}

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
  fontWeight: 900,
  textTransform: 'uppercase',
  fontSize: 'clamp(2rem, 4.6vw, 4.2rem)',
  lineHeight: 0.98,
  letterSpacing: '-0.04em',
};

const BODY_STYLE: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: 'rgba(248,250,252,0.78)',
  marginBottom: '1.8rem',
};

/* ── Main-line role ────────────────────────────────────────────── */

function Entry({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  // Lit while the middle of the viewport is inside this role.
  const active = useInView(ref, { margin: '-55% 0px -44% 0px' });

  // 0 → 1 as this role's top edge crosses the same mid-screen mark the line uses.
  const { scrollYProgress: passed } = useScroll({ target: ref, offset: ['start 56%', 'start 54%'] });
  const fill = useSpring(passed, { stiffness: 200, damping: 30 });
  const nodeScale = useTransform(fill, [0, 1], [0.3, 1]);

  // Reading progress: the role's top travels from 85% to 25% of the viewport.
  const { scrollYProgress: read } = useScroll({ target: ref, offset: ['start 85%', 'start 25%'] });
  // Whole-pass progress, for the ghost-year parallax.
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(pass, [0, 1], [90, -90]);

  const lit = active || hover;

  return (
    <article
      ref={ref}
      onMouseEnter={() => {
        setHover(true);
        sound.playHover?.();
      }}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(2.8rem, 5vw, 4.5rem) 0',
        paddingLeft: INDENT,
        overflowX: 'clip',
      }}
    >
      {/* Node on the main line, plus a dashed link across to the parallel lane */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: RAIL,
          top: 'clamp(3.2rem, 5.6vw, 5rem)',
          width: 0,
          height: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 8,
            top: -0.5,
            width: `calc(${LANE} - 8px)`,
            borderTop: '1px dashed rgba(163,230,53,0.35)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            width: 15,
            height: 15,
            marginLeft: -7.5,
            marginTop: -7.5,
            borderRadius: '50%',
            backgroundColor: '#0C0C0E',
            border: '2px solid rgba(255,255,255,0.22)',
          }}
        />
        <motion.span
          style={{
            position: 'absolute',
            width: 15,
            height: 15,
            marginLeft: -7.5,
            marginTop: -7.5,
            borderRadius: '50%',
            backgroundColor: LIME,
            opacity: fill,
            scale: nodeScale,
            boxShadow: lit ? '0 0 0 6px rgba(163,230,53,0.18), 0 0 24px rgba(163,230,53,0.7)' : '0 0 0 0 rgba(163,230,53,0)',
            transition: 'box-shadow 0.45s ease',
          }}
        />
        {exp.current && !reduce && (
          <span
            className="animate-ping"
            style={{
              position: 'absolute',
              width: 15,
              height: 15,
              marginLeft: -7.5,
              marginTop: -7.5,
              borderRadius: '50%',
              backgroundColor: 'rgba(163,230,53,0.35)',
            }}
          />
        )}
      </div>

      {/* Ghost year, drifting with scroll (outer box centres it, inner box drifts) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(-1rem, -1vw, 0rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            y: reduce ? 0 : ghostY,
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(9rem, 24vw, 22rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: lit ? '1.5px rgba(163,230,53,0.3)' : '1px rgba(255,255,255,0.05)',
            transition: 'all 0.6s cubic-bezier(0.76,0,0.24,1)',
          }}
        >
          &rsquo;{exp.year}
        </motion.div>
      </div>

      {/* Content, dimmed unless it holds the spotlight */}
      <motion.div
        animate={{ opacity: lit ? 1 : 0.4 }}
        transition={{ duration: 0.5, ease: E }}
        className="relative grid gap-6 lg:gap-14 lg:grid-cols-[200px_minmax(0,1fr)]"
        style={{ zIndex: 1 }}
      >
        {/* Meta column */}
        <div className="flex lg:flex-col flex-wrap items-center lg:items-start gap-3">
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              color: LIME,
              whiteSpace: 'nowrap',
            }}
          >
            {exp.period}
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(248,250,252,0.6)',
              padding: '0.5rem 0.9rem',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {exp.type}
          </span>
          {exp.current && (
            <span
              className="inline-flex items-center gap-2"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.22em', color: LIME }}
            >
              <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: LIME }} />
              ACTIVE NOW
            </span>
          )}
        </div>

        {/* Body column */}
        <div style={{ maxWidth: 820 }}>
          <FillTitle text={exp.role} progress={read} style={TITLE_STYLE} />

          <div className="flex items-center gap-4" style={{ marginTop: '1.1rem', marginBottom: '1.8rem' }}>
            <motion.span
              aria-hidden
              animate={{ width: lit ? 56 : 24 }}
              transition={{ duration: 0.6, ease: E }}
              style={{ height: 2, backgroundColor: LIME, flexShrink: 0 }}
            />
            <motion.span
              animate={{ letterSpacing: lit ? '0.26em' : '0.12em' }}
              transition={{ duration: 0.7, ease: E }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.78)',
              }}
            >
              {exp.company}
            </motion.span>
          </div>

          <ScrollWords text={exp.summary} progress={read} style={BODY_STYLE} />
          <Highlights items={exp.highlights} />
          <Links exp={exp} />
        </div>
      </motion.div>
    </article>
  );
}

/* ── Parallel track (freelance) ────────────────────────────────── */

/** One shipped project: a full-width editorial row with a lime sweep on hover. */
function WorkRow({ link, index }: { link: NonNullable<Experience['links']>[number]; index: number }) {
  return (
    <motion.a
      href={link.url}
      target={link.url.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      onMouseEnter={() => sound.playHover?.()}
      data-cursor-text="OPEN"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: E }}
      className="group relative flex items-center justify-between gap-4 overflow-hidden"
      style={{
        padding: 'clamp(1.1rem, 2.2vw, 1.7rem) clamp(0.6rem, 1.5vw, 1.2rem)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textDecoration: 'none',
        color: '#F8FAFC',
      }}
    >
      {/* lime sweep */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: LIME, transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
      />
      <span className="relative flex items-baseline gap-4 sm:gap-6 min-w-0 transition-colors duration-300 group-hover:text-[#0C0C0E]">
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', opacity: 0.55 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(1.1rem, 3.2vw, 2.6rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1,
            overflowWrap: 'anywhere',
          }}
        >
          {link.label}
          {/* phones: the platform label moves under the title (the right-hand one needs the room) */}
          <span
            className="sm:hidden block"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 9, letterSpacing: '0.22em', lineHeight: 1.4, opacity: 0.6, marginTop: 8 }}
          >
            {link.isPlayStore ? 'Google Play' : 'Live site'}
          </span>
        </span>
      </span>
      <span className="relative flex items-center gap-4 flex-shrink-0 transition-colors duration-300 group-hover:text-[#0C0C0E]">
        <span
          className="hidden sm:inline"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6 }}
        >
          {link.isPlayStore ? 'Google Play' : 'Live site'}
        </span>
        <span
          className="flex items-center justify-center w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] transition-transform duration-500 group-hover:rotate-45"
          style={{ borderRadius: '50%', border: '1px solid currentColor' }}
        >
          <ArrowUpRight size={16} />
        </span>
      </span>
    </motion.a>
  );
}

function ParallelTrack({ exp }: { exp: Experience }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: read } = useScroll({ target: ref, offset: ['start 85%', 'start 25%'] });

  return (
    <section
      ref={ref}
      aria-label="Freelance, running in parallel"
      style={{
        position: 'relative',
        paddingLeft: INDENT,
        paddingTop: 'clamp(3rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(1rem, 2vw, 2rem)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Node on the parallel lane */}
      <div
        aria-hidden
        style={{ position: 'absolute', left: LANE_X, top: 'clamp(3.4rem, 6.4vw, 6rem)', width: 0, height: 0 }}
      >
        <span
          className="animate-ping"
          style={{
            position: 'absolute',
            width: 15,
            height: 15,
            marginLeft: -7.5,
            marginTop: -7.5,
            borderRadius: '50%',
            backgroundColor: 'rgba(163,230,53,0.35)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            width: 15,
            height: 15,
            marginLeft: -7.5,
            marginTop: -7.5,
            borderRadius: 3,
            transform: 'rotate(45deg)',
            backgroundColor: LIME,
            boxShadow: '0 0 0 5px rgba(163,230,53,0.16), 0 0 22px rgba(163,230,53,0.65)',
          }}
        />
      </div>

      {/* Status line */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: E }}
        className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-2"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: '1.8rem',
        }}
      >
        <span className="inline-flex items-center gap-2" style={{ color: LIME }}>
          <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: LIME, boxShadow: `0 0 10px ${LIME}` }} />
          Active now
        </span>
        <span style={{ color: 'rgba(248,250,252,0.7)' }}>Since {exp.period.split(' ')[0]}</span>
        <span style={{ color: 'rgba(248,250,252,0.45)' }}>Running in parallel with every role above</span>
      </motion.div>

      <FillTitle text={exp.role} progress={read} style={TITLE_STYLE} />

      <div style={{ maxWidth: 780, marginTop: '1.8rem' }}>
        <ScrollWords text={exp.summary} progress={read} style={BODY_STYLE} />
      </div>

      {/* Shipped work as editorial rows */}
      {exp.links && exp.links.length > 0 && (
        <div style={{ marginTop: '2.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(248,250,252,0.4)',
              marginBottom: '1rem',
            }}
          >
            {'// Shipped & live'}
          </div>
          {exp.links.map((link, i) => (
            <WorkRow key={link.url} link={link} index={i} />
          ))}
        </div>
      )}

      {/* Highlights as a quiet tree */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '2rem 0 0',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          lineHeight: 2,
          color: 'rgba(248,250,252,0.5)',
        }}
      >
        {exp.highlights.map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.07 * i, ease: E }}
            className="flex"
          >
            {/* hanging indent: wrapped lines line up under the text, not under the glyph */}
            <span style={{ color: LIME, marginRight: 10, flexShrink: 0 }}>{i === exp.highlights.length - 1 ? '└─' : '├─'}</span>
            <span>{h}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ── Section ───────────────────────────────────────────────────── */

export default function ProfessionalExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const main = experiences.filter((e) => !e.parallel);
  const parallel = experiences.filter((e) => e.parallel);

  // The lime line fills as the mid-screen mark travels down the main list.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });

  const activeCount = experiences.filter((e) => e.current).length;
  const worked = totalWorkedMonths();
  const workedYears = Math.floor(worked / 12);
  const workedMonths = worked % 12;

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        fontFamily: "'Inter Tight', sans-serif",
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        overflow: 'clip', // not 'hidden': hidden would stop the sticky lane label from sticking
      }}
    >
      <style>{CSS}</style>

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(163,230,53,0.07), transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="mb-16 md:mb-24 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <ClipLine delay={0.1}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div style={{ width: 40, height: 1, background: LIME }} />
              <span>Career Journey</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.045em' }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F8FAFC' }}>Experience</div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  color: 'transparent',
                  WebkitTextStroke: `2px ${LIME}`,
                  marginTop: '-0.5rem',
                }}
              >
                &amp; Impact
              </div>
            </ClipLine>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: E }}
          className="flex flex-wrap gap-x-10 gap-y-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {[
            { n: String(experiences.length).padStart(2, '0'), u: '', l: 'Roles' },
            { n: String(activeCount).padStart(2, '0'), u: '', l: 'Active now' },
            workedYears > 0
              ? { n: String(workedYears), u: workedMonths > 0 ? `YR ${workedMonths}` : 'YR', tail: workedMonths > 0 ? 'MO' : '', l: 'Total worked' }
              : { n: String(workedMonths), u: 'MO', l: 'Total worked' },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="flex items-baseline"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: '#F8FAFC',
                }}
              >
                {s.n}
                {s.u && (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 500,
                      fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                      letterSpacing: '0.18em',
                      color: LIME,
                      marginLeft: 6,
                    }}
                  >
                    {s.u}
                    {'tail' in s && s.tail ? ` ${s.tail}` : ''}
                  </span>
                )}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Timeline + parallel lane */}
      <div ref={wrapRef} className="relative max-w-7xl mx-auto">
        {/* Parallel lane: dashed, flowing upward toward "now", full height */}
        {parallel.length > 0 && (
          <>
            <div
              aria-hidden
              className="xp-lane"
              style={{
                position: 'absolute',
                left: LANE_X,
                top: 0,
                bottom: 0,
                width: 2,
                marginLeft: -1,
                backgroundImage: 'repeating-linear-gradient(to bottom, rgba(163,230,53,0.6) 0 8px, transparent 8px 16px)',
              }}
            />
            {/* Sticky vertical label that follows you down the lane */}
            <div
              aria-hidden
              style={{ position: 'absolute', left: `calc(${LANE_X} + 10px)`, top: 0, bottom: 0, width: 14, pointerEvents: 'none' }}
            >
              <div
                style={{
                  position: 'sticky',
                  top: '38svh',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(163,230,53,0.7)',
                  whiteSpace: 'nowrap',
                }}
              >
                Freelance &middot; running in parallel
              </div>
            </div>
          </>
        )}

        {/* Main line + roles */}
        <div ref={listRef} className="relative">
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: RAIL,
              top: 0,
              bottom: 0,
              width: 2,
              marginLeft: -1,
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}
          />
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              left: RAIL,
              top: 0,
              bottom: 0,
              width: 2,
              marginLeft: -1,
              backgroundColor: LIME,
              boxShadow: '0 0 14px rgba(163,230,53,0.8)',
              transformOrigin: '50% 0%',
              scaleY: line,
            }}
          />
          {main.map((exp, i) => (
            <Entry key={exp.company + exp.role} exp={exp} index={i} />
          ))}
        </div>

        {parallel.map((exp) => (
          <ParallelTrack key={exp.company + exp.role} exp={exp} />
        ))}
      </div>
    </section>
  );
}
