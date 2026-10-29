/**
 * SoftSkills.tsx — Scroll-velocity marquee
 *
 * SIGNATURE: two rows of giant outline words drift in opposite directions.
 * Scroll fast and they speed up and lean into the motion; hover and they ease
 * to a stop. The word under the cursor fills lime and its line of text appears
 * in the caption below. Left alone, it cycles through the words itself.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion';
import { Users, Lightbulb, MessageCircle, Clock, Search, Target, Brain, TrendingUp } from 'lucide-react';
import { sound } from '../lib/sound';
import ClipLine from './ui/ClipLine';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const CYCLE_MS = 3200;

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

type SoftSkill = (typeof softSkills)[number];

function MarqueeRow({
  items,
  dir,
  active,
  onPick,
  onHold,
  boost,
  skew,
}: {
  items: SoftSkill[];
  dir: 1 | -1;
  active: string;
  onPick: (num: string) => void;
  onHold: (held: boolean) => void;
  boost: MotionValue<number>;
  skew: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);
  const held = useRef(false);
  const speed = useRef(1); // eased 0..1 multiplier so stopping/starting is smooth

  useAnimationFrame((_, delta) => {
    if (reduce || !track.current) return;
    const half = track.current.scrollWidth / 2;
    if (half <= 0) return;
    speed.current += ((held.current ? 0 : 1) - speed.current) * Math.min(1, delta / 200);
    const pxPerSec = (55 + Math.min(Math.abs(boost.get()) * 0.22, 700)) * speed.current;
    let nx = x.get() - dir * pxPerSec * (delta / 1000);
    nx = nx % half;
    if (nx > 0) nx -= half;
    x.set(nx);
  });

  const loop = [...items, ...items];

  return (
    <motion.div
      style={{ overflow: 'hidden', skewX: reduce ? 0 : skew, padding: '0.4rem 0' }}
      onPointerEnter={() => {
        held.current = true;
        onHold(true);
      }}
      onPointerLeave={() => {
        held.current = false;
        onHold(false);
      }}
    >
      <motion.div ref={track} style={{ x, display: 'flex', width: 'max-content', alignItems: 'center' }}>
        {loop.map((s, i) => {
          const isActive = s.num === active;
          return (
            <React.Fragment key={`${s.num}-${i}`}>
              <button
                type="button"
                onPointerEnter={() => {
                  if (s.num !== active) sound.playHover?.();
                  onPick(s.num);
                }}
                onFocus={() => onPick(s.num)}
                onClick={() => onPick(s.num)}
                data-cursor-text="READ"
                aria-label={`${s.label}: ${s.desc}`}
                aria-pressed={isActive}
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.045em',
                  padding: '0 clamp(1rem, 2.5vw, 2.4rem)',
                  color: isActive ? LIME : 'transparent',
                  WebkitTextStroke: isActive ? '1.5px transparent' : '1.5px rgba(248,250,252,0.42)',
                  transition: 'color 0.35s, -webkit-text-stroke 0.35s, text-shadow 0.35s',
                  textShadow: isActive ? '0 0 42px rgba(163,230,53,0.45)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {s.label}
              </button>
              <span aria-hidden style={{ color: LIME, fontSize: 'clamp(1rem, 2vw, 1.8rem)', opacity: 0.7 }}>
                ✦
              </span>
            </React.Fragment>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default function SoftSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [activeNum, setActiveNum] = useState(softSkills[0].num);
  const [held, setHeld] = useState(false);

  // Scroll velocity drives both the marquee speed and the lean.
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 90, damping: 28 });
  const skew = useTransform(velocity, [-3000, 3000], [9, -9], { clamp: true });

  // Cycle on its own until the visitor hovers.
  useEffect(() => {
    if (held || !inView || reduce) return;
    const id = setInterval(() => {
      setActiveNum((n) => {
        const i = softSkills.findIndex((s) => s.num === n);
        return softSkills[(i + 1) % softSkills.length].num;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [held, inView, reduce]);

  const active = softSkills.find((s) => s.num === activeNum) ?? softSkills[0];
  const Icon = active.icon;

  return (
    <section
      ref={sectionRef}
      id="softskills"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(163,230,53,0.05), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-14 md:mb-20">
          <ClipLine delay={0.1}>
            <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ color: LIME, fontSize: 12 }}>◈</span>
              <span>Human Stack</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>Beyond</div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>The Syntax</div>
            </ClipLine>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: E }}
            className="flex items-start gap-6"
            style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)' }}
          >
            <div style={{ width: 50, height: 1, backgroundColor: LIME, flexShrink: 0, marginTop: '0.8rem' }} />
            <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.5)', lineHeight: 1.7, maxWidth: '36rem' }}>
              Technical skills get you in the room. These keep you there.
            </p>
          </motion.div>
        </div>
      </div>

      {/* MARQUEE: full bleed */}
      <div role="group" aria-label="Soft skills">
        <MarqueeRow
          items={softSkills.slice(0, 4)}
          dir={1}
          active={activeNum}
          onPick={setActiveNum}
          onHold={setHeld}
          boost={velocity}
          skew={skew}
        />
        <MarqueeRow
          items={softSkills.slice(4)}
          dir={-1}
          active={activeNum}
          onPick={setActiveNum}
          onHold={setHeld}
          boost={velocity}
          skew={skew}
        />
      </div>

      {/* CAPTION */}
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto" style={{ marginTop: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
          <div style={{ minHeight: 'clamp(150px, 16vw, 190px)' }} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.num}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: E }}
                className="grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-4 items-center"
              >
                <div className="flex items-center gap-5">
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(4rem, 9vw, 7.5rem)',
                      lineHeight: 0.85,
                      letterSpacing: '-0.06em',
                      color: 'transparent',
                      WebkitTextStroke: `1.5px ${LIME}`,
                    }}
                  >
                    {active.num}
                  </span>
                  <span
                    style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Icon size={22} style={{ color: LIME }} />
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.8rem' }}>
                    {active.label}
                  </div>
                  <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.6, color: 'rgba(248,250,252,0.7)', maxWidth: 640 }}>{active.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress ticks */}
          <div className="flex gap-2" style={{ marginTop: '1.4rem' }}>
            {softSkills.map((s) => (
              <button
                key={s.num}
                type="button"
                aria-label={s.label}
                onClick={() => setActiveNum(s.num)}
                style={{ flex: 1, maxWidth: 70, height: 18, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 3,
                    backgroundColor: s.num === activeNum ? LIME : 'rgba(255,255,255,0.14)',
                    transition: 'background-color 0.3s',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
