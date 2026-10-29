/**
 * Achievements.tsx — Trophy-room scoreboard
 *
 * SIGNATURE: a stat wall that counts up, the IEEE paper as a giant outline
 * with a PUBLISHED stamp that slams down, a gold 1ST for the championship,
 * and everything else as a ranked ledger: bold rows, a placement meter, a
 * sticky tier label, and a preview card that trails the cursor.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Trophy, Award, X, ExternalLink, Users, Calendar, Sparkles, Medal, Star, Crown, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/sound';
import { achievements, type Achievement } from '../data/achievements';
import { useCanHover } from '../hooks/useMediaQuery';

const E = [0.76, 0, 0.24, 1] as const;

// Separate by tier
const researchPaper = achievements.find((a) => a.tier === 'research')!;
const firstPlace = achievements.filter((a) => a.tier === 'winner');
const top10 = achievements.filter((a) => a.tier === 'top10');
const top20 = achievements.filter((a) => a.tier === 'top20');
const top25 = achievements.filter((a) => a.tier === 'top25');
const participation = achievements.filter((a) => a.tier === 'participation');

const GOLD = '#FBBF24';
const LIME = '#A3E635';

// How many of 5 pips light up for each placement tier (decorative, not a score).
const TIER_METER: Record<Achievement['tier'], number> = {
  research: 5,
  winner: 5,
  top10: 4,
  top20: 3,
  top25: 2,
  participation: 1,
};

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

/** Counts up from 0 when scrolled into view. With `replay`, resets and counts again every time. */
function CountUp({ to, suffix = '', duration = 1.6, replay = false }: { to: number; suffix?: string; duration?: number; replay?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: !replay, margin: '-60px' });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) {
      if (replay) mv.set(0);
      return;
    }
    if (reduce) {
      mv.set(to);
      return;
    }
    // Wait for the stamp to land before the numbers start (matters on replay too).
    const controls = animate(mv, to, { duration, delay: replay ? 0.6 : 0, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, to, reduce, mv, duration, replay]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

/* ── Featured: IEEE paper ──────────────────────────────────────── */

function ResearchSlab({ achievement, onOpen }: { achievement: Achievement; onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${achievement.title}: open details`}
      onClick={() => {
        sound.playClick?.();
        onOpen();
      }}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      onMouseEnter={() => sound.playHover?.()}
      data-cursor-text="OPEN"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: E }}
      className="group relative grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center cursor-pointer"
      style={{
        padding: 'clamp(2rem, 4vw, 3.5rem) 0',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        marginBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      {/* Stage: giant IEEE + slamming stamp */}
      <div className="relative" style={{ minHeight: 'clamp(200px, 26vw, 340px)' }}>
        <motion.div
          initial={{ backgroundPosition: '100% 0%' }}
          whileInView={{ backgroundPosition: '0% 0%' }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 1.8, ease: E, delay: 0.2 }}
          aria-hidden
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(6.5rem, 19vw, 16rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1.5px rgba(163,230,53,0.45)',
            backgroundImage: `linear-gradient(90deg, ${LIME} 0%, ${LIME} 46%, rgba(163,230,53,0) 54%, rgba(163,230,53,0) 100%)`,
            backgroundSize: '220% 100%',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            userSelect: 'none',
          }}
        >
          IEEE
        </motion.div>

        {/* Stamp + shockwave share one anchor, so the ring is centred on the stamp */}
        <div style={{ position: 'absolute', right: '2%', bottom: '4%' }}>
          {!reduce && (
            <motion.span
              aria-hidden
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 2.6, opacity: [0, 0.65, 0] }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 1.25, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 150,
                height: 150,
                marginLeft: -75,
                marginTop: -75,
                borderRadius: '50%',
                border: `2px solid ${LIME}`,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* The stamp */}
          <motion.div
            initial={reduce ? false : { scale: 2.6, rotate: -26, opacity: 0 }}
            whileInView={{ scale: 1, rotate: -9, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 1.1 }}
            style={{
              ...MONO,
              position: 'relative',
              padding: '0.9rem 1.5rem',
              border: `3px solid ${LIME}`,
              color: LIME,
              fontSize: 'clamp(0.9rem, 1.6vw, 1.3rem)',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              backgroundColor: 'rgba(12,12,14,0.85)',
              boxShadow: '0 0 30px rgba(163,230,53,0.25), inset 0 0 18px rgba(163,230,53,0.12)',
            }}
          >
            {achievement.rank}
          </motion.div>
        </div>
      </div>

      {/* Copy */}
      <div>
        <div
          style={{ ...MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: LIME, marginBottom: '1.4rem' }}
        >
          Peer-reviewed publication &middot; {achievement.date}
        </div>
        <h3
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(2.2rem, 4.6vw, 4.2rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '0.9rem',
          }}
        >
          {achievement.title}
        </h3>
        <div style={{ ...MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)', marginBottom: '1.6rem' }}>
          {achievement.organizer}
        </div>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(248,250,252,0.72)', maxWidth: 560 }}>
          {achievement.description}
        </p>

        {achievement.metrics && (
          <div className="flex flex-wrap gap-x-12 gap-y-6" style={{ marginTop: '2rem' }}>
            {achievement.metrics.map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: '#F8FAFC',
                  }}
                >
                  <CountUp to={m.value} suffix={m.suffix} replay />
                </div>
                <div style={{ ...MONO, marginTop: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.5)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="inline-flex items-center gap-3 transition-colors group-hover:text-[#A3E635]"
          style={{ ...MONO, marginTop: '2.2rem', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.7)' }}
        >
          Read the full details
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.article>
  );
}

/* ── Featured: championship ────────────────────────────────────── */

function WinnerSlab({ achievement, onOpen }: { achievement: Achievement; onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${achievement.title}: open details`}
      onClick={() => {
        sound.playClick?.();
        onOpen();
      }}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      onMouseEnter={() => sound.playHover?.()}
      data-cursor-text="OPEN"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: E }}
      className="group relative grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center cursor-pointer"
      style={{
        padding: 'clamp(2rem, 4vw, 3.5rem) 0',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        marginBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      {/* Copy first on desktop, numeral second */}
      <div className="order-2 lg:order-1">
        <div className="inline-flex items-center gap-3" style={{ ...MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.4rem' }}>
          <Crown size={14} /> Championship win &middot; {achievement.date}
        </div>
        <h3
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(2.2rem, 4.6vw, 4.2rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '0.9rem',
          }}
        >
          {achievement.title}
        </h3>
        <div style={{ ...MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)', marginBottom: '1.6rem' }}>
          {achievement.organizer}
        </div>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(248,250,252,0.72)', maxWidth: 560 }}>
          {achievement.description}
        </p>
        <div
          className="inline-flex items-center gap-3 transition-colors group-hover:text-[#FBBF24]"
          style={{ ...MONO, marginTop: '2.2rem', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.7)' }}
        >
          Read the full details
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>

      {/* Giant gold 1ST with a one-shot shimmer */}
      <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end" aria-hidden>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '10% 5%',
            background: 'radial-gradient(ellipse, rgba(251,191,36,0.18), transparent 65%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ backgroundPosition: '100% 0%' }}
          whileInView={{ backgroundPosition: '0% 0%' }}
          whileHover={{ backgroundPosition: '100% 0%' }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: E, delay: 0.2 }}
          style={{
            position: 'relative',
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(8rem, 24vw, 21rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.07em',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1.5px rgba(251,191,36,0.5)',
            backgroundImage:
              'linear-gradient(100deg, #B45309 0%, #FBBF24 28%, #FFF4C2 42%, #FBBF24 56%, rgba(251,191,36,0) 56.5%, rgba(251,191,36,0) 100%)',
            backgroundSize: '240% 100%',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            userSelect: 'none',
          }}
        >
          1ST
        </motion.div>
      </div>
    </motion.article>
  );
}

/* ── Ledger ────────────────────────────────────────────────────── */

function Pips({ lit }: { lit: number }) {
  return (
    <span className="inline-flex gap-1.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileInView={{ backgroundColor: i < lit ? LIME : 'rgba(255,255,255,0.1)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.09 }}
          style={{ width: 22, height: 5, display: 'block' }}
        />
      ))}
    </span>
  );
}

function LedgerRow({
  achievement,
  index,
  onOpen,
  onHover,
  canHover,
  expanded,
  onToggle,
}: {
  achievement: Achievement;
  index: number;
  onOpen: () => void;
  onHover: (a: Achievement | null) => void;
  canHover: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: E }}
      style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
      <button
        type="button"
        aria-expanded={canHover ? undefined : expanded}
        onClick={() => {
          sound.playClick?.();
          // Mouse: the preview follows the cursor, so a click opens the details.
          // Touch: there is no hover, so the first tap expands the row inline instead.
          if (canHover) onOpen();
          else onToggle();
        }}
        onPointerEnter={() => {
          if (!canHover) return;
          onHover(achievement);
          sound.playHover?.();
        }}
        onPointerLeave={() => canHover && onHover(null)}
        onFocus={() => canHover && onHover(achievement)}
        onBlur={() => canHover && onHover(null)}
        data-cursor-text="OPEN"
        className="group relative w-full text-left grid items-center gap-x-6 gap-y-3 grid-cols-[auto_1fr] md:grid-cols-[48px_1fr_230px_42px]"
        style={{ padding: 'clamp(1.2rem, 2.4vw, 1.9rem) clamp(0.5rem, 1.2vw, 1rem)' }}
      >
        {/* Lime bar that grows on hover (or stays lit while expanded on touch) */}
        <span
          aria-hidden
          className={`absolute left-0 top-0 h-full w-[3px] origin-top transition-transform duration-500 ${expanded ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}
          style={{ backgroundColor: LIME, transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
        />

        <span style={{ ...MONO, fontSize: 11, letterSpacing: '0.2em', color: expanded ? LIME : 'rgba(248,250,252,0.35)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className={`block min-w-0 transition-transform duration-500 ${expanded ? 'translate-x-3' : 'group-hover:translate-x-3'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
        >
          <span
            className="block"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: 'clamp(1.3rem, 2.7vw, 2.3rem)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              color: '#F8FAFC',
              overflowWrap: 'anywhere',
            }}
          >
            {achievement.title}
          </span>
          <span className="block" style={{ ...MONO, marginTop: 10, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.45)' }}>
            {achievement.organizer} &middot; {achievement.date}
          </span>
        </span>

        <span className="col-span-2 md:col-span-1 flex md:flex-col md:items-start items-center justify-between gap-3">
          <span style={{ ...MONO, fontSize: 11, letterSpacing: '0.22em', color: LIME }}>{achievement.rank}</span>
          <Pips lit={TIER_METER[achievement.tier]} />
        </span>

        <span
          className={`hidden md:flex items-center justify-center transition-all duration-500 ${expanded ? 'rotate-45 bg-[#A3E635] text-[#0C0C0E] border-[#A3E635]' : 'group-hover:rotate-45 group-hover:bg-[#A3E635] group-hover:text-[#0C0C0E] group-hover:border-[#A3E635]'}`}
          style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', color: '#F8FAFC' }}
        >
          <ArrowUpRight size={16} />
        </span>
      </button>

      {/* Touch: the preview that the cursor card shows on desktop opens inline under the row */}
      <AnimatePresence initial={false}>
        {!canHover && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: E }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0.2rem 0.6rem 1.7rem 2.6rem' }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(248,250,252,0.72)' }}>{achievement.description}</p>
              {achievement.technologies && achievement.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5" style={{ marginTop: 14 }}>
                  {achievement.technologies.slice(0, 6).map((t) => (
                    <span key={t} style={{ ...MONO, fontSize: 9.5, letterSpacing: '0.08em', padding: '0.35rem 0.6rem', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(248,250,252,0.7)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  sound.playClick?.();
                  onOpen();
                }}
                className="inline-flex items-center gap-2"
                style={{ ...MONO, marginTop: 18, padding: '0.8rem 1.3rem', backgroundColor: LIME, color: '#0C0C0E', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}
              >
                Full details <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LedgerGroup({
  numeral,
  label,
  items,
  start,
  onOpen,
  onHover,
  canHover,
  expandedId,
  onToggle,
}: {
  numeral: string;
  label: string;
  items: Achievement[];
  start: number;
  onOpen: (a: Achievement) => void;
  onHover: (a: Achievement | null) => void;
  canHover: boolean;
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-y-6" style={{ marginBottom: 'clamp(3.5rem, 6vw, 6rem)' }}>
      {/* Sticky tier label: a column on desktop, a compact bar under the navbar on phones */}
      <div className="sticky z-20 top-[4.9rem] lg:top-28 lg:self-start py-3 lg:py-0 bg-[#0C0C0E] lg:bg-transparent">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: E }}
          className="flex items-center gap-4 lg:block"
        >
          <div
            aria-hidden
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 10vw, 8.5rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              color: 'transparent',
              WebkitTextStroke: `1.5px ${LIME}`,
            }}
          >
            {numeral}
          </div>
          <div>
            <div style={{ ...MONO, marginTop: 0, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.85)' }} className="lg:mt-3.5">
              {label}
            </div>
            <div style={{ ...MONO, marginTop: 6, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)' }}>
              {String(items.length).padStart(2, '0')} {items.length === 1 ? 'event' : 'events'}
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {items.map((a, i) => (
          <LedgerRow
            key={a.id}
            achievement={a}
            index={start + i}
            onOpen={() => onOpen(a)}
            onHover={onHover}
            canHover={canHover}
            expanded={expandedId === a.id}
            onToggle={() => onToggle(a.id)}
          />
        ))}
      </div>
    </div>
  );
}

/** Preview card that trails the cursor while a ledger row is hovered. */
function CursorPreview({ item, x, y }: { item: Achievement | null; x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden
      animate={{ opacity: item ? 1 : 0, scale: item ? 1 : 0.94 }}
      transition={{ duration: 0.2 }}
      className="hidden md:block"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x,
        y,
        width: 340,
        zIndex: 60,
        pointerEvents: 'none',
        padding: '1.2rem 1.3rem',
        backgroundColor: 'rgba(12,12,14,0.96)',
        border: '1px solid rgba(163,230,53,0.4)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {item && (
        <>
          <div style={{ ...MONO, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: LIME, marginBottom: 10 }}>
            {item.rank} &middot; {item.organizer}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(248,250,252,0.8)' }}>
            {item.description.length > 170 ? `${item.description.slice(0, 167).trimEnd()}…` : item.description}
          </p>
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5" style={{ marginTop: 12 }}>
              {item.technologies.slice(0, 5).map((t) => (
                <span key={t} style={{ ...MONO, fontSize: 9, letterSpacing: '0.1em', padding: '0.3rem 0.55rem', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(248,250,252,0.65)' }}>
                  {t}
                </span>
              ))}
            </div>
          )}
          <div style={{ ...MONO, marginTop: 12, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)' }}>
            Click for details
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────────── */

export default function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [hovered, setHovered] = useState<Achievement | null>(null);
  const canHover = useCanHover();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleExpanded = (id: string) => setExpandedId((cur) => (cur === id ? null : id));

  // Cursor-following preview position (spring-smoothed, flips near screen edges).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 260, damping: 28, mass: 0.5 });
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const W = 340;
    const H = 230;
    let nx = e.clientX + 26;
    let ny = e.clientY + 22;
    if (nx + W > window.innerWidth - 12) nx = e.clientX - W - 26;
    if (ny + H > window.innerHeight - 12) ny = Math.max(12, e.clientY - H - 22);
    px.set(nx);
    py.set(ny);
  };

  const publications = achievements.filter((a) => a.type === 'publication').length;
  const topTen = firstPlace.length + top10.length;
  const rest = [...top25, ...participation];

  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'clip', // not 'hidden': hidden would stop the sticky tier labels from sticking
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
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

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER + stat wall */}
        <div className="mb-20 md:mb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <ClipLine delay={0.1}>
              <div
                style={{
                  ...MONO,
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
                <span>Competitive Track Record</span>
              </div>
            </ClipLine>

            <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.85, letterSpacing: '-0.045em', fontFamily: "'Inter Tight', sans-serif" }}>
              <ClipLine delay={0.2}>
                <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#F8FAFC' }}>Achievements</div>
              </ClipLine>
              <ClipLine delay={0.35}>
                <div style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'transparent', WebkitTextStroke: `2px ${LIME}`, marginTop: '-0.5rem' }}>
                  &amp; Recognition
                </div>
              </ClipLine>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: E }}
              style={{ marginTop: 'clamp(1.8rem, 3vw, 2.6rem)', fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', color: 'rgba(248,250,252,0.55)', lineHeight: 1.8, maxWidth: '40rem' }}
            >
              From a peer-reviewed IEEE publication to a championship win and top finishes across hackathons with Microsoft, Google DeepMind and leading institutions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55, ease: E }}
            className="flex flex-wrap gap-x-10 sm:gap-x-14 gap-y-6"
          >
            {[
              { n: achievements.length, l: 'Events entered' },
              { n: topTen, l: 'Top-10 or better' },
              { n: publications, l: 'IEEE paper' },
            ].map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: '#F8FAFC',
                  }}
                >
                  <CountUp to={s.n} />
                </div>
                <div style={{ ...MONO, marginTop: 10, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* FEATURED */}
        <ResearchSlab achievement={researchPaper} onOpen={() => setSelected(researchPaper)} />
        {firstPlace.map((a) => (
          <WinnerSlab key={a.id} achievement={a} onOpen={() => setSelected(a)} />
        ))}

        {/* LEDGER */}
        <div onPointerMove={onMove}>
          <LedgerGroup numeral="10" label="Top 10 finishes" items={top10} start={0} onOpen={setSelected} onHover={setHovered} canHover={canHover} expandedId={expandedId} onToggle={toggleExpanded} />
          <LedgerGroup numeral="20" label="Top 20 finishes" items={top20} start={top10.length} onOpen={setSelected} onHover={setHovered} canHover={canHover} expandedId={expandedId} onToggle={toggleExpanded} />
          <LedgerGroup numeral="25+" label="Also competed" items={rest} start={top10.length + top20.length} onOpen={setSelected} onHover={setHovered} canHover={canHover} expandedId={expandedId} onToggle={toggleExpanded} />
        </div>
      </div>

      {canHover && <CursorPreview item={hovered} x={sx} y={sy} />}

      {/* MODAL */}
      <AnimatePresence>
        {selected && <AchievementModal achievement={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163,230,53,0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(163,230,53,0.5); }
      `}</style>
    </section>
  );
}


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
          maxHeight: '92svh',
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
