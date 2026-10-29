/**
 * LoadingScreen.tsx — The name fills with lime
 *
 * SIGNATURE: the same name treatment as the hero. DARSHIL sits solid,
 * NATHWANI is an outline that fills lime left to right as progress climbs,
 * and a giant counter fills from the bottom up. Status lines type out, a
 * ticked bar runs along the bottom, and at 100% a lime panel sweeps over the
 * screen and lifts away to reveal the site.
 *
 * Total length is LOADING_MS (siteReady.ts). App.tsx unmounts this at that
 * moment and starts the rest of the site's intro off the same signal.
 */

import React, { useEffect, useState } from 'react';
import {
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { useISTClock } from '../hooks/useISTClock';
import { LOADING_MS } from '../lib/siteReady';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

// Everything is laid out backwards from the end, so changing LOADING_MS keeps the shape.
const WIPE_AT = LOADING_MS - 1200; // lime panel sweeps up over everything (0.5s)
const REVEAL_AT = LOADING_MS - 700; // panel fully covers the screen, then lifts away (0.65s)
const COUNT_START = 0.7; // seconds
const COUNT_DURATION = (WIPE_AT - 200) / 1000 - COUNT_START; // counter hits 100 just before the wipe

const STEPS = [
  { at: 0, text: 'BOOTING INTERFACE' },
  { at: 25, text: 'LOADING PROJECTS' },
  { at: 55, text: 'COMPILING EXPERIENCE' },
  { at: 85, text: 'POLISHING PIXELS' },
  { at: 100, text: 'READY' },
];

const NAME_SIZE = 'clamp(3.2rem, min(12.5vw, 19vh), 12rem)';

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const s: React.CSSProperties = { position: 'absolute', width: 22, height: 22, borderColor: LIME, borderStyle: 'solid', borderWidth: 0, opacity: 0.7 };
  if (pos === 'tl') Object.assign(s, { top: 18, left: 18, borderTopWidth: 2, borderLeftWidth: 2 });
  if (pos === 'tr') Object.assign(s, { top: 18, right: 18, borderTopWidth: 2, borderRightWidth: 2 });
  if (pos === 'bl') Object.assign(s, { bottom: 18, left: 18, borderBottomWidth: 2, borderLeftWidth: 2 });
  if (pos === 'br') Object.assign(s, { bottom: 18, right: 18, borderBottomWidth: 2, borderRightWidth: 2 });
  return <motion.span aria-hidden initial={{ opacity: 0, scale: 1.6 }} animate={{ opacity: 0.7, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: E }} style={s} />;
}

function Digit({ index, count, filled }: { index: number; count: ReturnType<typeof useMotionValue<number>>; filled: boolean }) {
  const digit = useTransform(count, (v) => String(Math.min(100, Math.floor(v))).padStart(3, '0')[index]);
  return (
    <motion.span
      style={{
        display: 'inline-block',
        width: '0.62em',
        textAlign: 'center',
        color: filled ? LIME : 'transparent',
        WebkitTextStroke: filled ? '0' : '1.5px rgba(248,250,252,0.35)',
      }}
    >
      {digit}
    </motion.span>
  );
}

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'run' | 'wipe' | 'reveal'>('run');
  const [step, setStep] = useState(0);
  const time = useISTClock();

  const count = useMotionValue(0);

  // Everything visual hangs off this one motion value, so nothing re-renders per frame.
  const nameFill = useMotionTemplate`inset(0 ${useTransform(count, (v) => 100 - v)}% 0 0)`;
  const counterFill = useMotionTemplate`inset(${useTransform(count, (v) => 100 - v)}% 0 0 0)`;
  const barScale = useTransform(count, (v) => v / 100);
  const barHead = useTransform(count, (v) => `${v}%`);

  useEffect(() => {
    const controls = animate(count, 100, { duration: COUNT_DURATION, delay: COUNT_START, ease: [0.65, 0, 0.35, 1] });
    const wipe = setTimeout(() => setPhase('wipe'), WIPE_AT);
    const reveal = setTimeout(() => setPhase('reveal'), REVEAL_AT);
    return () => {
      controls.stop();
      clearTimeout(wipe);
      clearTimeout(reveal);
    };
  }, [count]);

  useMotionValueEvent(count, 'change', (v) => {
    let idx = 0;
    STEPS.forEach((s, i) => {
      if (v >= s.at) idx = i;
    });
    setStep((prev) => (prev === idx ? prev : idx));
  });

  const revealed = phase === 'reveal';

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        overflow: 'hidden',
        // Once the lime panel fully covers the screen, the dark layer underneath goes away,
        // so the panel lifts off the site instead of the loader.
        backgroundColor: revealed ? 'transparent' : '#0C0C0E',
        color: '#F8FAFC',
      }}
    >
      {!revealed && (
        <>
          {/* Grid + glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.5,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at 40% 50%, #000 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 40% 50%, #000 20%, transparent 75%)',
            }}
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: '-10%', bottom: '-15%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163,230,53,0.14), transparent 65%)', filter: 'blur(70px)' }}
          />

          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* HUD */}
          <div className="absolute left-0 right-0 flex items-center justify-between" style={{ top: 'clamp(1.6rem, 3vw, 2.4rem)', padding: '0 clamp(2.4rem, 5vw, 4.5rem)', ...MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)' }}>
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: E }} className="flex items-center gap-3">
              <span style={{ width: 30, height: 30, border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: '-0.04em', color: '#F8FAFC' }}>
                DN
              </span>
              <span>Portfolio 2026 / 27</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: E }} className="hidden sm:flex items-center gap-3">
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: LIME }} className="animate-pulse" />
              <span>Bengaluru{time ? ` · ${time} IST` : ''}</span>
            </motion.div>
          </div>

          {/* Name */}
          <div className="absolute inset-x-0 top-0 flex flex-col justify-start" style={{ padding: 'clamp(5.5rem, 16vh, 9rem) clamp(2.4rem, 5vw, 4.5rem) 0' }}>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.86, letterSpacing: '-0.045em', fontSize: NAME_SIZE }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.2, ease: E }}>
                  Darshil
                </motion.div>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.38, ease: E }} style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.4)' }}>Nathwani</span>
                  {/* Lime fill, revealed left to right by progress */}
                  <motion.span aria-hidden style={{ position: 'absolute', left: 0, top: 0, color: LIME, clipPath: nameFill, textShadow: '0 0 40px rgba(163,230,53,0.35)' }}>
                    Nathwani
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Giant counter, fills from the bottom */}
          <div
            aria-hidden
            className="absolute"
            style={{ right: 'clamp(2rem, 4vw, 4rem)', bottom: 'clamp(5rem, 11vh, 7.5rem)', fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(4.5rem, min(14vw, 21vh), 13rem)', lineHeight: 0.8, letterSpacing: '-0.04em', display: 'flex', alignItems: 'flex-start' }}
          >
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <span style={{ display: 'inline-flex' }}>
                {[0, 1, 2].map((i) => (
                  <Digit key={i} index={i} count={count} filled={false} />
                ))}
              </span>
              <motion.span style={{ position: 'absolute', left: 0, top: 0, display: 'inline-flex', clipPath: counterFill }}>
                {[0, 1, 2].map((i) => (
                  <Digit key={i} index={i} count={count} filled />
                ))}
              </motion.span>
            </span>
            <span style={{ fontSize: '0.3em', lineHeight: 1, marginLeft: '0.1em', color: 'rgba(163,230,53,0.7)' }}>%</span>
          </div>

          {/* Status + progress bar */}
          <div className="absolute left-0 right-0" style={{ bottom: 'clamp(1.8rem, 3vw, 2.6rem)', padding: '0 clamp(2.4rem, 5vw, 4.5rem)' }}>
            <div style={{ ...MONO, fontSize: 'clamp(10px, 1vw, 12px)', letterSpacing: '0.24em', color: '#F8FAFC', marginBottom: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem', height: 18 }}>
              <span style={{ color: LIME }}>›</span>
              <motion.span key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {STEPS[step].text}
              </motion.span>
              <motion.span aria-hidden animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ width: 8, height: 14, backgroundColor: LIME, display: 'inline-block' }} />
            </div>

            <div style={{ position: 'relative', height: 14 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 6, height: 2, backgroundColor: 'rgba(255,255,255,0.12)' }} />
              {[...Array(11)].map((_, i) => (
                <span key={i} aria-hidden style={{ position: 'absolute', left: `${i * 10}%`, top: i % 5 === 0 ? 0 : 3, width: 1, height: i % 5 === 0 ? 14 : 8, backgroundColor: 'rgba(255,255,255,0.25)' }} />
              ))}
              <motion.div style={{ position: 'absolute', left: 0, right: 0, top: 6, height: 2, backgroundColor: LIME, boxShadow: '0 0 14px rgba(163,230,53,0.9)', transformOrigin: '0 50%', scaleX: barScale }} />
              <motion.span aria-hidden style={{ position: 'absolute', top: 2, left: barHead, marginLeft: -5, width: 10, height: 10, borderRadius: '50%', backgroundColor: LIME, boxShadow: '0 0 18px 4px rgba(163,230,53,0.7)' }} />
            </div>
          </div>
        </>
      )}

      {/* Lime panel: sweeps up over everything, then lifts away to reveal the site */}
      <motion.div
        aria-hidden
        initial={{ y: '100%' }}
        animate={{ y: phase === 'run' ? '100%' : phase === 'wipe' ? '0%' : '-100%' }}
        transition={{ duration: phase === 'wipe' ? 0.5 : 0.65, ease: E }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: LIME }}
      >
        <span
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(7rem, 30vw, 26rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.07em',
            color: 'transparent',
            WebkitTextStroke: '2px #0C0C0E',
            userSelect: 'none',
          }}
        >
          DN
        </span>
      </motion.div>
    </div>
  );
}
