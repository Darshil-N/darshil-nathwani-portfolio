/**
 * LimeHandoff.tsx — the DN on the loading screen's lime panel becomes the first letters of the name.
 *
 * The loader ends on a full lime panel with a hollow DN mark. This takes over with an
 * identical panel and mark. Then the panel lifts away, and at the same moment the D and
 * the N come apart, shrink and fly to the first letters of DARSHIL and NATHWANI, filling
 * in lime as they go. They land exactly on the hero's own D and N (which are hidden until then).
 *
 * The hero must be mounted when this runs: it finds the letters by the `data-kn-line`
 * attribute KineticName puts on each line, and the `data-mark` attribute on first letters.
 * It is portalled to <body> to sit above the loader's own panel.
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animate, motion, useMotionValue } from 'framer-motion';

const E = [0.76, 0, 0.24, 1] as const;

/** How long after this mounts the letters have landed: the rest of the hero times itself to it. */
export const HANDOFF_LANDS_AT = 1.4; // s

const GLYPH: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: "'Inter Tight', sans-serif",
  fontWeight: 900,
  fontSize: 'clamp(7rem, 30vw, 26rem)',
  lineHeight: 0.8,
  letterSpacing: '-0.07em',
  color: 'transparent',
  WebkitTextStroke: '2px #0C0C0E',
  userSelect: 'none',
  willChange: 'transform',
};

const mix = (a: number, b: number, p: number) => Math.round(a + (b - a) * p);

export default function LimeHandoff({ onDone }: { onDone: () => void }) {
  const lift = useMotionValue('0%');
  const dRef = useRef<HTMLSpanElement>(null);
  const nRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // the hero's own first letters stay hidden until the flying ones have landed on them
    const marks = Array.from(document.querySelectorAll<HTMLElement>('#home [data-mark="1"]'));
    marks.forEach((m) => {
      m.style.visibility = 'hidden';
    });
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      marks.forEach((m) => {
        m.style.visibility = '';
      });
      onDone();
    };

    const start = setTimeout(() => {
      const glyphs = [dRef.current, nRef.current];
      // where each first letter will be: x from the letter, y from its line (which is not mid-slide)
      const targets = [0, 1].map((li) => {
        const line = document.querySelector(`#home [data-kn-line="${li}"]`) as HTMLElement | null;
        const letter = line?.querySelector('span') as HTMLElement | null;
        if (!line || !letter) return null;
        const r = line.getBoundingClientRect();
        const l = letter.getBoundingClientRect();
        const cs = getComputedStyle(line);
        const fs = parseFloat(cs.fontSize);
        const top0 = r.top + (parseFloat(cs.paddingTop) || 0);
        return { cx: l.left + l.width / 2, cy: top0 + 0.43 * fs, fs };
      });
      if (glyphs.some((g) => !g) || targets.some((t) => !t)) return done();

      const from = glyphs.map((g) => {
        const r = g!.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, fs: parseFloat(getComputedStyle(g!).fontSize) };
      });

      animate(lift, '-100%', { duration: 1.0, ease: E });
      animate(0, 1, {
        duration: 1.15,
        ease: E,
        onUpdate: (p) => {
          glyphs.forEach((g, i) => {
            const f = from[i];
            const t = targets[i]!;
            const s = 1 + (t.fs / f.fs - 1) * p;
            g!.style.transform = `translate(${(t.cx - f.cx) * p}px, ${(t.cy - f.cy) * p}px) scale(${s})`;
            // hollow dark outline on lime → solid lime letter
            g!.style.setProperty('-webkit-text-stroke-color', `rgb(${mix(12, 163, p)},${mix(12, 230, p)},${mix(14, 53, p)})`);
            g!.style.setProperty('-webkit-text-fill-color', `rgba(163,230,53,${p * p})`);
          });
        },
        onComplete: done,
      });
    }, 260);
    const safety = setTimeout(done, 4500);
    return () => {
      clearTimeout(start);
      clearTimeout(safety);
      marks.forEach((m) => {
        m.style.visibility = '';
      });
    };
    // runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 1000000, pointerEvents: 'none' }}>
      {/* the lime panel: lifts away to reveal the hero */}
      <motion.div style={{ position: 'absolute', inset: 0, background: '#A3E635', y: lift }} />
      {/* the DN mark, as two letters so they can part */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span ref={dRef} style={GLYPH}>
          D
        </span>
        <span ref={nRef} style={GLYPH}>
          N
        </span>
      </div>
    </div>,
    document.body,
  );
}
