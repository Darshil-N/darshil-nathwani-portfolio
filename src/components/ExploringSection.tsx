/**
 * ExploringSection.tsx — Pinned horizontal journey
 *
 * SIGNATURE: the section pins to the screen and your vertical scroll slides a
 * rail of panels sideways: an intro, four learning tracks, and an outro. A
 * counter and progress bar track the journey. On small screens (or with
 * reduced motion) it falls back to a plain vertical stack.
 */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Brain, Code2, Cloud, Shield, Rocket, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';
import ClipLine from './ui/ClipLine';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

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

const OUTRO_LINES = ['Learning in public', 'Building in sprints', 'Improving every release'];

type Category = (typeof categories)[number];

/** True at or above the width where the pinned rail is used. */
function useDesktop() {
  const query = '(min-width: 1024px)';
  // Read it up front so the first render already has the right layout.
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return desktop;
}

function IntroPanel({ desktop }: { desktop: boolean }) {
  return (
    <div
      className="flex flex-col justify-center flex-shrink-0"
      style={desktop ? { width: 'min(62vw, 880px)' } : undefined}
    >
      <ClipLine delay={0.1}>
        <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ color: LIME, fontSize: 12 }}>◈</span>
          <span>What&apos;s Next</span>
        </div>
      </ClipLine>

      <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
        <ClipLine delay={0.2}>
          <div style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)', color: '#F8FAFC' }}>Currently</div>
        </ClipLine>
        <ClipLine delay={0.35}>
          <div style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)', color: 'transparent', WebkitTextStroke: `1.5px ${LIME}` }}>Exploring</div>
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
        <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', color: 'rgba(248,250,252,0.55)', lineHeight: 1.7, maxWidth: '30rem' }}>
          Active learning tracks and emerging technologies I&apos;m diving into right now.
        </p>
      </motion.div>

      {desktop && (
        <div className="inline-flex items-center gap-3" style={{ ...MONO, marginTop: '2.6rem', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: LIME }}>
          Keep scrolling
          <motion.span animate={{ x: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowRight size={16} />
          </motion.span>
        </div>
      )}
    </div>
  );
}

function TrackPanel({ cat, index, desktop }: { cat: Category; index: number; desktop: boolean }) {
  const Icon = cat.icon;
  const num = String(index + 1).padStart(2, '0');
  return (
    <article
      className="relative flex flex-col flex-shrink-0 overflow-hidden"
      style={{
        ...(desktop ? { width: 'min(50vw, 700px)', height: '100%' } : {}),
        padding: 'clamp(1.4rem, min(3vw, 4.5vh), 3rem)',
        backgroundColor: '#0C0C0E',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {/* Giant numeral */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-0.5rem',
          bottom: '-1.5rem',
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(10rem, 20vw, 17rem)',
          lineHeight: 0.8,
          letterSpacing: '-0.06em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(163,230,53,0.14)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {num}
      </div>

      <div className="relative flex items-center gap-4 flex-wrap" style={{ marginBottom: '1.6rem' }}>
        <span style={{ width: 46, height: 46, borderRadius: 11, backgroundColor: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: LIME }} />
        </span>
        <span style={{ ...MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)' }}>Track {num}</span>
        <span className="inline-flex items-center gap-2" style={{ ...MONO, fontSize: 9, letterSpacing: '0.2em', color: LIME, border: '1px solid rgba(163,230,53,0.35)', padding: '0.35rem 0.7rem' }}>
          <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: LIME }} />
          IN PROGRESS
        </span>
      </div>

      <h3
        className="relative"
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: 'clamp(1.6rem, min(3.8vw, 6.2vh), 3.4rem)',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          marginBottom: 'clamp(1rem, 2vh, 2rem)',
          maxWidth: '90%',
        }}
      >
        {cat.title}
      </h3>

      <ul className="relative grid sm:grid-cols-2 gap-x-8" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 'auto', zIndex: 1 }}>
        {cat.items.map((item, i) => (
          <li
            key={item}
            onMouseEnter={() => sound.playHover?.()}
            className="group flex items-baseline gap-3 transition-colors duration-300"
            style={{ padding: 'clamp(0.4rem, 1vh, 0.7rem) 0', borderTop: '1px solid rgba(255,255,255,0.09)' }}
          >
            <span style={{ ...MONO, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(248,250,252,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
            <span
              className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#A3E635]"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', letterSpacing: '-0.01em', color: 'rgba(248,250,252,0.88)' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function OutroPanel({ desktop }: { desktop: boolean }) {
  return (
    <div className="flex flex-col justify-center flex-shrink-0" style={desktop ? { width: 'min(60vw, 840px)' } : undefined}>
      <Rocket size={26} style={{ color: LIME, marginBottom: '1.6rem' }} />
      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: '-0.045em', fontSize: 'clamp(2.4rem, 6.4vw, 5.8rem)' }}>
        {OUTRO_LINES.map((line, i) => (
          <ClipLine key={line} delay={0.1 + i * 0.15}>
            <div style={i === 1 ? { color: 'transparent', WebkitTextStroke: `1.5px ${LIME}` } : { color: '#F8FAFC' }}>{line}</div>
          </ClipLine>
        ))}
      </div>
    </div>
  );
}

export default function ExploringSection() {
  const reduce = useReducedMotion();
  const desktopQuery = useDesktop();
  const pinned = desktopQuery && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const shift = useRef(0);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 }); // HUD bar only
  // The rail is locked 1:1 to the scroll position. Smoothing it made it lag and drift.
  const x = useTransform(scrollYProgress, (v) => -v * shift.current);
  const bgX = useTransform(scrollYProgress, [0, 1], ['4%', '-22%']);

  const panelCount = categories.length + 2; // intro + tracks + outro

  // Section height = distance to slide + one screen of pinned time.
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const next = Math.max(0, rail.scrollWidth - window.innerWidth);
    shift.current = next;
    setHeight((h) => (h === next + window.innerHeight ? h : next + window.innerHeight));
  }, []);

  useLayoutEffect(() => {
    if (!pinned) return;
    measure();
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned, measure]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(Math.min(panelCount - 1, Math.max(0, Math.round(v * (panelCount - 1)))));
  });

  const header = (
    <>
      <IntroPanel desktop={pinned} />
      {categories.map((cat, i) => (
        <TrackPanel key={cat.title} cat={cat} index={i} desktop={pinned} />
      ))}
      <OutroPanel desktop={pinned} />
    </>
  );

  /* Stacked layout for small screens / reduced motion */
  if (!pinned) {
    return (
      <section
        id="exploring"
        style={{ position: 'relative', backgroundColor: '#0C0C0E', color: '#F8FAFC', padding: 'clamp(5rem, 10vw, 10rem) 0', overflow: 'hidden' }}
      >
        <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto flex flex-col gap-10">{header}</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="exploring"
      style={{ position: 'relative', backgroundColor: '#0C0C0E', color: '#F8FAFC', height: height ?? '420vh', overflowX: 'clip' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Slow background word */}
        <motion.div
          aria-hidden
          style={{
            x: bgX,
            willChange: 'transform',
            position: 'absolute',
            left: 0,
            top: '50%',
            translateY: '-50%',
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: '38vw',
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.045)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          NEXT UP
        </motion.div>

        {/* Rail */}
        <motion.div
          ref={railRef}
          style={{
            x,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'stretch',
            gap: '4vw',
            padding: '0 8vw',
            width: 'max-content',
            height: 'min(78vh, 700px)',
          }}
        >
          {header}
        </motion.div>

        {/* HUD */}
        <div
          className="absolute left-0 right-0 bottom-0 px-6 sm:px-10 lg:px-16 flex items-center gap-6"
          style={{ zIndex: 5, paddingBottom: '2rem', ...MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)' }}
        >
          <span style={{ color: LIME, minWidth: 64 }}>
            {step === 0 ? 'Intro' : step === panelCount - 1 ? 'End' : `${String(step).padStart(2, '0')} / ${String(categories.length).padStart(2, '0')}`}
          </span>
          <div style={{ flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
            <motion.div style={{ position: 'absolute', inset: 0, backgroundColor: LIME, boxShadow: '0 0 12px rgba(163,230,53,0.7)', transformOrigin: '0 50%', scaleX: progress }} />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
