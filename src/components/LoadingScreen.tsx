/**
 * LoadingScreen.tsx — Site-wide grid loader for direct non-home visits & refreshes.
 *
 * Uses the exact same GridLoader as the home page's HeroOrbit so refreshing /projects
 * (or any sub-page) presents the identical loading experience and lime grid reveal.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import GridLoader, { LOAD_MS, type GridLoaderStage } from './GridLoader';
import { useMediaQuery } from '../hooks/useMediaQuery';

const SANS = "'Inter Tight', sans-serif";
const SERIF = "'DM Serif Display', serif";

export default function LoadingScreen({
  onReveal,
  onComplete,
}: {
  onReveal?: () => void;
  onComplete?: () => void;
}) {
  const compact = useMediaQuery('(max-width: 1023px), (max-width: 1100px) and (orientation: portrait)');
  const stack = useMediaQuery('(max-width: 639px)');
  const [fontsReady, setFontsReady] = useState(false);
  const [phase, setPhase] = useState<'load' | 'cover' | 'reveal'>('load');
  const [n, setN] = useState(0);
  const [fs, setFs] = useState(0);
  const [nameH, setNameH] = useState(0);
  const measurerRef = useRef<HTMLDivElement>(null);
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  onRevealRef.current = onReveal;
  onCompleteRef.current = onComplete;

  // Measure the edge-to-edge name size using the same font setup as HeroOrbit.
  useLayoutEffect(() => {
    let alive = true;
    const fit = () => {
      const el = measurerRef.current;
      if (!el || !el.parentElement) return;
      const avail = el.parentElement.clientWidth;
      if (!avail) return;
      const stacked = window.innerWidth < 640;
      el.style.flexDirection = stacked ? 'column' : 'row';
      el.style.alignItems = stacked ? 'flex-start' : 'baseline';
      el.style.fontSize = '100px';
      el.style.width = 'max-content';
      const w = Math.max(...Array.from(el.children).map((c) => (c as HTMLElement).scrollWidth), stacked ? 0 : el.scrollWidth);
      el.style.width = '';
      if (!w) return;
      const next = Math.floor(((100 * avail) / w) * (stacked ? 0.95 : 0.985));
      el.style.fontSize = `${next}px`;
      setFs(next);
      setNameH(Math.round(el.getBoundingClientRect().height));
    };

    const ro = new ResizeObserver(() => fit());
    const refit = () => alive && fit();
    document.fonts.addEventListener('loadingdone', refit);
    Promise.all([
      document.fonts.load(`500 100px "Inter Tight"`),
      document.fonts.load(`italic 400 100px "DM Serif Display"`),
    ])
      .catch(() => null)
      .then(() => document.fonts.ready)
      .then(() => {
        if (!alive) return;
        fit();
        setFontsReady(true);
        if (measurerRef.current?.parentElement) ro.observe(measurerRef.current.parentElement);
      });

    return () => {
      alive = false;
      ro.disconnect();
      document.fonts.removeEventListener('loadingdone', refit);
    };
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    const t0 = performance.now();
    let raf = 0;
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / LOAD_MS);
      const v = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      setN(v);
      if (v >= 100) {
        t1 = window.setTimeout(() => {
          setPhase('cover');
          t2 = window.setTimeout(() => {
            setPhase('reveal');
            onRevealRef.current?.();
            t3 = window.setTimeout(() => {
              onCompleteRef.current?.();
            }, 1400);
          }, 1050);
        }, 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [fontsReady]);

  const stage: GridLoaderStage = phase === 'load' ? 'count' : phase === 'cover' ? 'cover' : 'reveal';
  const pad = compact ? 'clamp(16px, 3vw, 32px)' : 'clamp(12px, 1.6vw, 28px)';

  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          left: pad,
          right: pad,
          bottom: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <div
          ref={measurerRef}
          style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap', lineHeight: 0.92 }}
        >
          <span style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '-0.055em' }}>Darshil</span>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.08em', letterSpacing: '-0.035em', marginLeft: '0.04em' }}>Nathwani</span>
        </div>
      </div>

      <GridLoader
        n={n}
        fs={fs}
        compact={compact}
        stack={stack}
        nameH={nameH}
        stage={stage}
        zIndex={999999}
      />
    </>
  );
}
