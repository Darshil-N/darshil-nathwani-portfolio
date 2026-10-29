/**
 * DecryptText.tsx — "Cipher lock" text reveal
 *
 * SIGNATURE: the text starts as glowing lime code glyphs. A block caret
 * sweeps left to right; every letter it passes locks into the real
 * character with a lime flash that settles into its final colour.
 * Waits for the loading screen to finish, then replays every time the
 * section it lives in is scrolled back into view, and on hover.
 *
 * Character widths are measured and locked, so the layout never jitters
 * while the glyphs scramble.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { whenSiteReady } from '../lib/siteReady';

const LIME = '#A3E635';
const GLYPHS = '01<>/\\{}[]#$%&*+=_ABCDEF0123456789';
const TICK_MS = 42;

export interface DecryptSegment {
  text: string;
  /** Brighter final colour, for emphasis */
  bright?: boolean;
}

interface Props {
  /** Each inner array is one line. */
  lines: DecryptSegment[][];
  /** Seconds to wait before the first decrypt. */
  delay?: number;
  baseColor?: string;
  brightColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface Char {
  ch: string;
  bright: boolean;
  line: number;
  word: number;
}

const CSS = `
@keyframes dx-settle {
  0%   { color: ${LIME}; text-shadow: 0 0 14px rgba(163,230,53,.95); }
  100% { text-shadow: 0 0 0 rgba(163,230,53,0); }
}
.dx-done { animation: dx-settle .7s ease-out; }
@keyframes dx-caret { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
.dx-caret { animation: dx-caret .24s steps(1) infinite; }
`;

function randGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function DecryptText({
  lines,
  delay = 0,
  baseColor = 'rgba(248,250,252,0.42)',
  brightColor = 'rgba(248,250,252,0.7)',
  className,
  style,
}: Props) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLParagraphElement>(null);

  // Flatten to characters, tagging words so we can keep words unbroken.
  const chars = useRef<Char[]>([]);
  if (chars.current.length === 0) {
    let word = 0;
    lines.forEach((segs, line) => {
      segs.forEach((seg) => {
        for (const ch of seg.text) {
          if (ch === ' ') word++;
          chars.current.push({ ch, bright: !!seg.bright, line, word });
        }
      });
      word++;
    });
  }
  const list = chars.current;

  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const widths = useRef<number[]>([]);
  const resolveAt = useRef<number[]>([]);
  const display = useRef<string[]>(list.map((c) => c.ch));
  const [, force] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>(reduce ? 'done' : 'idle');
  const [front, setFront] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const startTimer = useRef<ReturnType<typeof setTimeout>>();
  const hasPlayed = useRef(false);

  const stop = () => {
    clearInterval(timer.current);
    clearTimeout(startTimer.current);
  };

  const isRunning = useRef(false);
  const runId = useRef(0);

  const run = useCallback(
    async (waitMs: number) => {
      stop();
      if (reduce) return;
      const id = ++runId.current; // a newer run supersedes this one

      // Never play underneath the loading screen.
      await whenSiteReady();
      if (id !== runId.current) return;

      // Wait. The real text is on screen (or hidden) during this wait.
      await new Promise<void>((res) => {
        startTimer.current = setTimeout(res, waitMs);
      });
      if (id !== runId.current) return;
      try {
        await document.fonts?.ready;
      } catch {
        /* ignore */
      }

      if (id !== runId.current) return;

      // Lock each letter's final width while the REAL text is showing,
      // so glyphs of other widths can't shift the layout when they swap in.
      if (!isRunning.current) {
        spanRefs.current.forEach((el, i) => {
          if (el) widths.current[i] = el.getBoundingClientRect().width;
        });
      }

      isRunning.current = true;
      setStatus('running');
      setFront(0);
      display.current = list.map((c) => (c.ch === ' ' ? ' ' : randGlyph()));
      force((n) => n + 1);

      const t0 = performance.now();
      // Sweep speed: ~2s for the whole tagline, with a little jitter per letter.
      const perChar = Math.min(26, 1900 / Math.max(list.length, 1));
      resolveAt.current = list.map((_, i) => i * perChar + Math.random() * 260);

      timer.current = setInterval(() => {
        const now = performance.now() - t0;
        let firstPending = -1;
        list.forEach((c, i) => {
          if (c.ch === ' ') return;
          if (now >= resolveAt.current[i]) {
            display.current[i] = c.ch;
          } else {
            display.current[i] = randGlyph();
            if (firstPending === -1) firstPending = i;
          }
        });
        if (firstPending === -1) {
          stop();
          isRunning.current = false;
          hasPlayed.current = true;
          setFront(-1);
          setStatus('done');
        } else {
          setFront(firstPending);
        }
        force((n) => n + 1);
      }, TICK_MS);
    },
    [list, reduce]
  );

  // Play when the section holding this text is on screen, and replay every
  // time it comes back after having scrolled mostly out of view.
  const runRef = useRef(run);
  runRef.current = run;
  useEffect(() => {
    const target = rootRef.current?.closest('section') ?? rootRef.current;
    if (!target) return;
    let armed = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4 && armed) {
          armed = false;
          runRef.current(hasPlayed.current ? 120 : delay * 1000);
        } else if (entry.intersectionRatio < 0.12) {
          armed = true;
        }
      },
      { threshold: [0, 0.12, 0.4, 0.7] }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [delay]);

  useEffect(() => {
    return () => {
      // runId is a plain counter, not a DOM ref, so reading it here is intended.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      runId.current++; // cancel anything still waiting
      stop();
    };
  }, []);

  const hidden = status === 'idle';

  // Group letters into unbreakable words, keeping real spaces between them.
  const renderLine = (lineIdx: number) => {
    const out: React.ReactNode[] = [];
    let i = 0;
    while (i < list.length) {
      if (list[i].line !== lineIdx) {
        i++;
        continue;
      }
      const w = list[i].word;
      const wordChars: React.ReactNode[] = [];
      while (i < list.length && list[i].line === lineIdx && list[i].word === w) {
        const idx = i;
        const c = list[idx];
        if (c.ch === ' ') {
          i++;
          continue;
        }
        const resolved = status === 'done' || display.current[idx] === c.ch;
        const isFront = status === 'running' && idx === front;
        const finalColor = c.bright ? brightColor : baseColor;
        wordChars.push(
          <span
            key={idx}
            ref={(el) => {
              spanRefs.current[idx] = el;
            }}
            className={resolved && status === 'running' ? 'dx-done' : isFront ? 'dx-caret' : undefined}
            style={{
              display: 'inline-block',
              width: status === 'running' && widths.current[idx] ? widths.current[idx] : undefined,
              textAlign: 'center',
              color: resolved ? finalColor : isFront ? '#0C0C0E' : LIME,
              backgroundColor: isFront ? LIME : 'transparent',
              fontFamily: resolved ? undefined : "'JetBrains Mono', monospace",
              fontWeight: resolved ? undefined : 600,
              textShadow: resolved || isFront ? undefined : '0 0 10px rgba(163,230,53,0.65)',
            }}
          >
            {resolved ? c.ch : display.current[idx]}
          </span>
        );
        i++;
      }
      out.push(
        <span key={`w${lineIdx}-${w}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {wordChars}
        </span>
      );
      out.push(' ');
    }
    return out;
  };

  return (
    <p
      ref={rootRef}
      className={className}
      onPointerEnter={() => status === 'done' && run(0)}
      aria-label={lines.map((l) => l.map((s) => s.text).join('')).join(' ')}
      style={{ ...style, opacity: hidden ? 0 : 1 }}
    >
      <style>{CSS}</style>
      <span aria-hidden>
        {lines.map((_, li) => (
          <React.Fragment key={li}>
            {renderLine(li)}
            {li < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </p>
  );
}
