/**
 * Education.tsx — Tilting campus ID card
 *
 * SIGNATURE: a 3D student ID card that tilts toward the cursor with a moving
 * glare, next to the details laid out as bold editorial rows. Only facts from
 * the original section: college, programme, city, 2024 to present.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import ClipLine from './ui/ClipLine';
import { sound } from '../lib/sound';
import { useMediaQuery } from '../hooks/useMediaQuery';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

const DETAILS = [
  { k: 'Institution', v: 'Dayananda Sagar College of Engineering' },
  { k: 'Programme', v: 'Information Science & Engineering' },
  { k: 'Location', v: 'Bengaluru, Karnataka' },
  { k: 'Duration', v: '2024 – Present' },
];

// Decorative barcode, generated from a fixed seed so it never changes between renders.
const BARS = (() => {
  let seed = 7;
  const out: number[] = [];
  for (let i = 0; i < 46; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    out.push(1 + Math.floor((seed / 233280) * 4));
  }
  return out;
})();

function IdCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); // -0.5 .. 0.5 across the card
  const my = useMotionValue(0);

  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 160, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 160, damping: 18 });
  const gx = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.24), rgba(255,255,255,0) 55%)`;

  // Touch has no hover, so the card sways gently by itself until a finger takes over.
  const coarse = useMediaQuery('(pointer: coarse)');
  const [swaying, setSwaying] = useState(true);
  useEffect(() => {
    if (!coarse || reduce || !swaying) return;
    const a = animate(mx, 0.28, { duration: 3.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' });
    const b = animate(my, -0.16, { duration: 4.3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' });
    return () => {
      a.stop();
      b.stop();
    };
  }, [coarse, reduce, swaying, mx, my]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
    setSwaying(true);
  };

  return (
    <div style={{ perspective: 1200 }} className="flex justify-center lg:justify-end">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        onPointerDown={(e) => e.pointerType === 'touch' && setSwaying(false)}
        onPointerEnter={() => sound.playHover?.()}
        initial={reduce ? false : { opacity: 0, y: 60, rotateX: 28 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: E }}
        style={{ width: 'min(100%, 360px)', touchAction: 'pan-y' }}
      >
        <motion.div
          style={{
            rotateX: reduce ? 0 : rotX,
            rotateY: reduce ? 0 : rotY,
            transformStyle: 'preserve-3d',
            position: 'relative',
            aspectRatio: '0.64',
            backgroundColor: '#101013',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 40px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(163,230,53,0.08)',
          }}
        >
          {/* Lime header band */}
          <div style={{ backgroundColor: LIME, color: '#0C0C0E', padding: '0.9rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.28em' }}>STUDENT</span>
            <span aria-hidden style={{ width: 44, height: 9, borderRadius: 9, backgroundColor: '#0C0C0E', opacity: 0.85 }} />
          </div>

          <div style={{ padding: '1.2rem 1.2rem 1rem', display: 'flex', flexDirection: 'column', height: 'calc(100% - 41px)' }}>
            {/* Photo (floats forward in 3D) */}
            <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '1.15', border: '1px solid rgba(163,230,53,0.35)' }}>
                <img
                  src="/Images/darshil.jpg"
                  alt="Darshil Nathwani"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'grayscale(1) contrast(1.05)' }}
                />
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(163,230,53,0.08), rgba(12,12,14,0.55))', mixBlendMode: 'multiply' }} />
              </div>
            </div>

            {/* Name + programme */}
            <div style={{ transform: 'translateZ(30px)', marginTop: '1rem' }}>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 2.4vw, 1.9rem)', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                Darshil
                <br />
                Nathwani
              </div>
              <div style={{ ...MONO, marginTop: 10, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: LIME }}>B.E. &middot; Information Science &amp; Engineering</div>
              <div style={{ ...MONO, marginTop: 6, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.55)' }}>Dayananda Sagar College of Engineering</div>
            </div>

            {/* Status */}
            <div style={{ marginTop: 'auto', transform: 'translateZ(24px)' }}>
              <div
                className="inline-flex items-center gap-2"
                style={{ ...MONO, fontSize: 9, letterSpacing: '0.2em', color: LIME, border: '1px solid rgba(163,230,53,0.4)', backgroundColor: 'rgba(163,230,53,0.07)', padding: '0.4rem 0.7rem' }}
              >
                <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: LIME }} />
                ACTIVE &middot; 2024 &ndash; PRESENT
              </div>
              <div aria-hidden className="flex items-end" style={{ gap: 2, height: 30, marginTop: 14 }}>
                {BARS.map((w, i) => (
                  <span key={i} style={{ width: w, height: i % 5 === 0 ? '100%' : '78%', backgroundColor: 'rgba(248,250,252,0.55)', flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Glare that follows the pointer */}
          {!reduce && (
            <motion.div aria-hidden style={{ position: 'absolute', inset: 0, background: glare, pointerEvents: 'none', mixBlendMode: 'overlay' }} />
          )}
        </motion.div>
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
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(163,230,53,0.06), transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-14 md:mb-20">
          <ClipLine delay={0.1}>
            <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ color: LIME, fontSize: 12 }}>◈</span>
              <span>Academic Foundation</span>
            </div>
          </ClipLine>
          <ClipLine delay={0.2}>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
              Education
            </div>
          </ClipLine>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-14 lg:gap-20 items-center">
          {/* Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: E }}
              className="inline-flex items-center gap-2"
              style={{ ...MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: LIME, marginBottom: '1.6rem' }}
            >
              <span className="animate-pulse" style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: LIME }} />
              Currently pursuing
            </motion.div>

            <ClipLine delay={0.1}>
              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                Bachelor of
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.45)' }}>Engineering</span>
              </h3>
            </ClipLine>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {DETAILS.map((d, i) => (
                <motion.div
                  key={d.k}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.09, ease: E }}
                  className="group grid sm:grid-cols-[150px_1fr] gap-x-6 gap-y-1 items-baseline"
                  style={{ padding: '1.1rem 0.2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span style={{ ...MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)' }}>{d.k}</span>
                  <span
                    className="transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#A3E635]"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)', letterSpacing: '-0.015em', color: '#F8FAFC', transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                  >
                    {d.v}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <IdCard />
        </div>
      </div>
    </section>
  );
}
