/**
 * KineticName.tsx — Hero name with a cursor "torch"
 *
 * SIGNATURE: the cursor is a lime torch moving across the name.
 *  - Solid lines glow lime where the torch passes.
 *  - Outline lines fill white where the torch passes (the inverse).
 *  - Letters near the cursor spring upward, so the word ripples as you sweep.
 *  - A soft lime bloom trails behind the cursor.
 * At rest it behaves like a failing neon tube: a lime glow under every letter,
 * random letters that flicker and nearly die (picked at random, forever), and
 * a faint white pulse on the outline word. All of that stops the moment the cursor enters.
 * Mouse position lives in CSS variables + motion values, so nothing re-renders.
 */

import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { sound } from '../lib/sound';

const E = [0.76, 0, 0.24, 1] as const;
const OFFSCREEN = -9999;
const REACH = 170; // px: how far a letter "feels" the cursor
const LIFT = 15; // % of the letter's own height

interface Line {
  text: string;
  variant: 'solid' | 'outline';
  delay: number;
}

// Only opacity animates at rest (composited, cheap). Nothing animates a filter
// or a text paint property, which made the whole name repaint and flash.
const IDLE_CSS = `
.kn-glow { opacity: 0; transition: opacity .35s ease; }
@keyframes kn-glow-breathe {
  0%, 100% { opacity: .5; }
  50%      { opacity: .75; }
}
@keyframes kn-white-breathe {
  0%, 100% { opacity: .55; }
  50%      { opacity: 1; }
}
.kn-box[data-active="false"] .kn-glow { animation: kn-glow-breathe 5s ease-in-out calc(1.8s + var(--i) * .3s) infinite; opacity: .5; }
.kn-box[data-active="false"] .kn-outline-text { animation: kn-white-breathe 3.6s ease-in-out calc(2s + var(--i) * .28s) infinite; }
@media (prefers-reduced-motion: reduce) {
  .kn-box[data-active="false"] .kn-glow,
  .kn-box[data-active="false"] .kn-outline-text { animation: none; }
}
`;

/** One tube-stutter on a letter: a random run of dim/bright steps, sometimes dying for a moment. */
function flickerLetter(el: HTMLElement, live: Set<Animation>) {
  const pulses = 2 + Math.floor(Math.random() * 4); // 2-5 stutters
  const dies = Math.random() < 0.18; // occasionally goes dark and stays dark briefly
  const hold = 'steps(1, jump-end)'; // easing is per keyframe: each value holds until the next
  const frames: Keyframe[] = [{ opacity: 1, easing: hold }];
  for (let i = 0; i < pulses; i++) {
    frames.push({ opacity: 0.05 + Math.random() * 0.3, easing: hold });
    frames.push({ opacity: 0.7 + Math.random() * 0.3, easing: hold });
  }
  frames.push({ opacity: dies ? 0.04 : 1, easing: hold });
  if (dies) frames.push({ opacity: 1 });
  const duration = 320 + Math.random() * 560 + (dies ? 500 : 0);
  const anim = el.animate(frames, { duration, easing: 'linear' });
  live.add(anim);
  anim.onfinish = anim.oncancel = () => live.delete(anim);
}

const TORCH = 'var(--torch-r)';
const POS = 'calc(var(--mx, -9999px) - var(--lx, 0px)) calc(var(--my, -9999px) - var(--ly, 0px))';

const VARIANT_STYLE: Record<Line['variant'], React.CSSProperties> = {
  solid: {
    backgroundImage: `radial-gradient(circle ${TORCH} at ${POS}, #A3E635 0%, rgba(190,242,100,0.85) 35%, rgba(163,230,53,0) 100%), linear-gradient(#F8FAFC, #F8FAFC)`,
  },
  outline: {
    backgroundImage: `radial-gradient(circle ${TORCH} at ${POS}, #F8FAFC 0%, rgba(248,250,252,0.9) 35%, rgba(248,250,252,0) 100%)`,
    WebkitTextStroke: '1.5px rgba(248,250,252,0.42)',
  },
};

function Letter({
  char,
  index,
  variant,
  mx,
  centers,
  lift,
  setRef,
}: {
  char: string;
  index: number;
  variant: Line['variant'];
  mx: MotionValue<number>;
  centers: React.MutableRefObject<number[]>;
  lift: boolean;
  setRef: (i: number, el: HTMLSpanElement | null) => void;
}) {
  // 0 → 1 as the cursor gets closer to this letter's centre (horizontal).
  const near = useTransform(mx, (v) => {
    const c = centers.current[index];
    if (!lift || c === undefined) return 0;
    const t = Math.max(0, 1 - Math.abs(v - c) / REACH);
    return t * t;
  });
  const t = useSpring(near, { stiffness: 320, damping: 22, mass: 0.6 });
  const y = useTransform(t, (v) => `${-v * LIFT}%`);
  const scale = useTransform(t, (v) => 1 + v * 0.05);

  return (
    <motion.span
      ref={(el) => setRef(index, el)}
      style={{
        ['--i' as string]: index,
        position: 'relative',
        display: 'inline-block',
        y,
        scale,
        padding: '0 0.03em',
        margin: '0 -0.03em',
        willChange: 'transform',
      }}
    >
      {/* This letter's own tube glow: a blurred lime copy underneath. It dims
          with the letter when the letter flickers. Solid letters only: outline
          letters are see-through, so the glow would tint their insides. */}
      {variant === 'solid' && (
      <span
        aria-hidden
        className="kn-glow"
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 0.03em',
          color: '#A3E635',
          WebkitTextFillColor: '#A3E635',
          filter: 'blur(0.09em)',
          pointerEvents: 'none',
        }}
      >
        {char}
      </span>
      )}
      <span
        className={variant === 'outline' ? 'kn-outline-text' : undefined}
        style={{
          position: 'relative',
          display: 'inline-block',
          // transparent fill so the gradient layers show through the glyph
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          ...VARIANT_STYLE[variant],
        }}
      >
        {char}
      </span>
    </motion.span>
  );
}

export default function KineticName({ lines, fontSize }: { lines: Line[]; fontSize: string }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<number[]>([]);

  const mx = useMotionValue(OFFSCREEN);
  const my = useMotionValue(OFFSCREEN);
  const glowX = useSpring(mx, { stiffness: 90, damping: 20 });
  const glowY = useSpring(my, { stiffness: 90, damping: 20 });
  const glowOpacity = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 120, damping: 24 });

  const setRef = (i: number, el: HTMLSpanElement | null) => {
    letters.current[i] = el;
  };

  /** Cache each letter's position relative to the box (at rest, so lifts don't skew it). */
  const measure = () => {
    const b = box.current;
    if (!b) return;
    const br = b.getBoundingClientRect();
    letters.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const left = r.left - br.left;
      const top = r.top - br.top;
      el.style.setProperty('--lx', `${left}px`);
      el.style.setProperty('--ly', `${top}px`);
      centers.current[i] = left + r.width / 2;
    });
  };

  const onEnter = () => {
    measure();
    box.current?.setAttribute('data-active', 'true');
    live.current.forEach((a) => a.cancel());
    sound.playHover?.();
    glowOpacity.set(1);
  };

  const onMove = (e: React.PointerEvent) => {
    const b = box.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    b.style.setProperty('--mx', `${x}px`);
    b.style.setProperty('--my', `${y}px`);
    mx.set(x);
    my.set(y);
  };

  const onLeave = () => {
    const b = box.current;
    b?.setAttribute('data-active', 'false');
    b?.style.setProperty('--mx', `${OFFSCREEN}px`);
    b?.style.setProperty('--my', `${OFFSCREEN}px`);
    mx.set(OFFSCREEN);
    my.set(OFFSCREEN);
    glowOpacity.set(0);
  };

  /* Random flicker: every ~0.8-3s one (sometimes two) random letters stutter. */
  const live = useRef(new Set<Animation>());
  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const b = box.current;
      if (b && b.getAttribute('data-active') === 'false' && !document.hidden) {
        const els = letters.current.filter((el): el is HTMLSpanElement => !!el);
        const n = Math.random() < 0.25 ? 2 : 1;
        for (let k = 0; k < n && els.length; k++) {
          flickerLetter(els[Math.floor(Math.random() * els.length)], live.current);
        }
      }
      timer = setTimeout(tick, 800 + Math.random() * 2200);
    };
    timer = setTimeout(tick, 2200); // after the intro slide-in
    const running = live.current;
    return () => {
      clearTimeout(timer);
      running.forEach((a) => a.cancel());
    };
  }, [reduce]);

  let counter = 0;

  return (
    <div
      ref={box}
      className="kn-box"
      data-active="false"
      role="img"
      aria-label={lines.map((l) => l.text).join(' ')}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: 'fit-content',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 0.86,
          letterSpacing: '-0.04em',
          fontSize,
          cursor: 'default',
          '--torch-r': 'clamp(120px, 15vw, 240px)',
        } as React.CSSProperties
      }
    >
      <style>{IDLE_CSS}</style>

      {/* Bloom that trails the cursor, behind the letters */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            x: glowX,
            y: glowY,
            width: 420,
            height: 420,
            marginLeft: -210,
            marginTop: -210,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(163,230,53,0.22), rgba(163,230,53,0) 65%)',
            filter: 'blur(24px)',
            opacity: glowOpacitySpring,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {lines.map((line) => (
        <div
          key={line.text}
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            // room for letters to lift without being clipped by the reveal mask
            paddingTop: '0.16em',
            marginTop: '-0.16em',
          }}
        >
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.05, delay: line.delay, ease: E }}
            aria-hidden
          >
            {line.text.split('').map((ch) => {
              const i = counter++;
              return (
                <Letter
                  key={i}
                  char={ch}
                  index={i}
                  variant={line.variant}
                  mx={mx}
                  centers={centers}
                  lift={!reduce}
                  setRef={setRef}
                />
              );
            })}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
