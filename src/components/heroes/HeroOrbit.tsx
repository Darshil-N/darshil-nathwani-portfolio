/**
 * HERO 6 — The name along the bottom, one carousel hung on the grid
 *
 * Composition (after Art Yakushev): the name runs edge to edge along the
 * bottom, a grotesk first name against an italic serif surname. The photo
 * frame is hung from the grid: its top edge on the top rule, its right edge
 * on the tall vertical, its foot resting on the name. The left field carries
 * the headline (a cursor light reads it, the role at its end changes behind a
 * lime bar); the right column is a numbered index of the page.
 *
 * Loading: the frame is already there, flicking through every photograph like
 * a contact sheet while a big counter runs where the name will be. At 100 a
 * lime panel sweeps across the whole screen, shrinks down into the frame, and
 * wipes off it to reveal the first photo: the carousel's own transition, at
 * the scale of the page. The name rises letter by letter as it goes.
 *
 * Play: hover the frame for colour and a NEXT disc; click or drag to change;
 * hover a letter of the name and the lime bar passes through it; ← → keys.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PhotoWipe, { type GlassPhoto } from '../PhotoWipe';
import Navbar from '../Navbar';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const BG = '#0B0B0C';
const TXT = '#EDEBE6';
const DIM = 'rgba(237,235,230,0.5)';
const FAINT = 'rgba(237,235,230,0.28)';
const LINE = 'rgba(237,235,230,0.12)';
const LIME = '#A3E635';
const SANS = "'Inter Tight', sans-serif";
const SERIF = "'DM Serif Display', serif";
const MONO = "'JetBrains Mono', monospace";
const EASE = [0.22, 1, 0.36, 1] as const;
const EXPO = [0.87, 0, 0.13, 1] as const;
const SLIDE_MS = 5200;

export const PHOTOS: (GlassPhoto & { where: string })[] = [
  { src: '/Images/darshil.jpg', focus: { x: 0.66, y: 0.3 }, where: 'Nasiko Hackathon · Microsoft' },
  { src: '/Images/darshil2.jpg', focus: { x: 0.25, y: 0.3 }, where: 'IEEE TENCON 2026' },
  { src: '/Images/deepmind.jpg', focus: { x: 0.45, y: 0.3 }, where: 'Google DeepMind Hackathon' },
  { src: '/Images/google.jpg', focus: { x: 0.5, y: 0.3 }, where: 'Google Kyoto · APL' },
  { src: '/Images/judges.jpg', focus: { x: 0.21, y: 0.3 }, where: 'HackMan V8 · Final pitch' },
  { src: '/Images/mixer.jpg', focus: { x: 0.65, y: 0.3 }, where: 'Devfolio Student Mixer' },
  { src: '/Images/darshil1.jpg', focus: { x: 0.25, y: 0.3 }, where: 'IEEE TENCON 2026 · Q&A' },
  { src: '/Images/cisco.jpg', focus: { x: 0.9, y: 0.3 }, where: 'Cisco · Industrial visit' },
  { src: '/Images/darshil3.jpg', focus: { x: 0.2, y: 0.3 }, shift: 0.1, where: 'IEEE TENCON 2026' },
];
const ROLES = ['AI Engineer', 'Full-Stack Developer', 'Software Engineer', 'Mobile App Developer', 'Researcher', 'Freelance Developer'];

/* ───────── small pieces ───────── */
function useIST() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Roll({ value, style }: { value: string; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'inline-grid', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: 1.15, whiteSpace: 'nowrap', ...style }}>
      <AnimatePresence initial={false}>
        <motion.span key={value} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: EXPO }} style={{ gridArea: '1 / 1', fontFamily: 'inherit', fontStyle: 'inherit' }}>
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** A line that rises out of a clip. */
function Rise({ children, delay, show }: { children: React.ReactNode; delay: number; show: boolean }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
      <motion.span initial={{ y: '110%' }} animate={show ? { y: '0%' } : {}} transition={{ duration: 1.1, delay, ease: EXPO }} style={{ display: 'block', fontFamily: 'inherit' }}>
        {children}
      </motion.span>
    </span>
  );
}

const LINES: { d: 'x' | 'y'; style: React.CSSProperties }[] = [
  { d: 'y', style: { left: '7%', top: 0, bottom: 0 } },
  { d: 'x', style: { left: '7%', right: 0, top: '15%' } },
  { d: 'y', style: { left: '79%', top: 0, height: '72%' } },
  { d: 'x', style: { left: 0, width: '7%', top: '63%' } },
  { d: 'x', style: { left: '79%', right: 0, top: '72%' } },
];
const CROSSES = [
  { x: '7%', y: '15%' },
  { x: '79%', y: '15%' },
  { x: '7%', y: '63%' },
  { x: '79%', y: '72%' },
];

function Hair({ d, delay, style }: { d: 'x' | 'y'; delay: number; style: React.CSSProperties }) {
  return (
    <motion.span
      aria-hidden
      initial={{ [d === 'x' ? 'scaleX' : 'scaleY']: 0 }}
      animate={{ [d === 'x' ? 'scaleX' : 'scaleY']: 1 }}
      transition={{ duration: 1.4, delay, ease: EXPO }}
      style={{ position: 'absolute', background: LINE, transformOrigin: d === 'x' ? '0 50%' : '50% 0', ...(d === 'x' ? { height: 1 } : { width: 1 }), ...style }}
    />
  );
}

function Cross({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.span aria-hidden initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.9, delay, ease: EASE }} style={{ position: 'absolute', left: x, top: y, width: 11, height: 11, marginLeft: -5, marginTop: -5, color: DIM, fontFamily: MONO, fontSize: 11, lineHeight: '11px', textAlign: 'center' }}>
      +
    </motion.span>
  );
}

/* ───────── the name ───────── */
// displacement map for ribbed glass: a 22px sawtooth ramp in red (x shift), flat mid-grey in green (no y shift)
const _RIBS_UNUSED =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="1200"><defs><linearGradient id="g"><stop offset="0" stop-color="rgb(0,128,0)"/><stop offset="1" stop-color="rgb(255,128,0)"/></linearGradient><pattern id="p" width="22" height="1200" patternUnits="userSpaceOnUse"><rect width="22" height="1200" fill="url(#g)"/></pattern></defs><rect width="4000" height="1200" fill="url(#p)"/></svg>`,
  );
function Letters({ text, style, show, delay }: { text: string; style: React.CSSProperties; show: boolean; delay: number }) {
  return (
    <span style={{ display: 'inline-flex', overflow: 'hidden', paddingTop: '0.12em', marginTop: '-0.12em', paddingBottom: '0.1em', marginBottom: '-0.1em', ...style }}>
      {text.split('').map((ch, k) => (
        <motion.span key={k} initial={{ y: '115%' }} animate={show ? { y: '0%' } : {}} transition={{ duration: 1.2, delay: delay + k * 0.045, ease: EXPO }} style={{ display: 'inline-block', fontFamily: 'inherit', fontStyle: 'inherit' }}>
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * The name with a lens over it. Where the lens sits the solid letters are cut away and only their hairline lime
 * outline remains, like seeing the drawing under the type. The lens opens when the cursor arrives, trails it softly,
 * and closes when it leaves.
 */
function Name({ show, nameRef, fs, stack }: { show: boolean; nameRef: React.RefObject<HTMLDivElement>; fs: number; stack: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const x = useSpring(-999, { stiffness: 110, damping: 20, mass: 0.7 });
  const y = useSpring(0, { stiffness: 110, damping: 20, mass: 0.7 });
  const rad = useSpring(0, { stiffness: 120, damping: 18 });
  const cut = useTransform([x, y, rad], ([cx, cy, r]) => `radial-gradient(circle at ${cx}px ${cy}px, transparent ${r}px, #000 ${(r as number) + 1}px)`);
  const keep = useTransform([x, y, rad], ([cx, cy, r]) => `radial-gradient(circle at ${cx}px ${cy}px, #000 ${r}px, transparent ${(r as number) + 1}px)`);
  const ring = useTransform(rad, (r) => r * 2);
  const ringL = useTransform([x, rad], ([cx, r]) => (cx as number) - (r as number));
  const ringT = useTransform([y, rad], ([cy, r]) => (cy as number) - (r as number));
  const line = (hollow: boolean) => (
    <div ref={hollow ? undefined : nameRef} style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap', lineHeight: 0.92, fontSize: fs || 100, ...(hollow && stack ? { flexDirection: 'column', alignItems: 'flex-start' } : {}) }}>
      <Letters text="Darshil" show={show} delay={0.15} style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '-0.055em', color: hollow ? 'transparent' : TXT, WebkitTextStroke: hollow ? `1.2px ${LIME}` : undefined }} />
      <Letters text="Nathwani" show={show} delay={0.35} style={{ color: hollow ? 'transparent' : 'rgba(237,235,230,0.82)', WebkitTextStroke: hollow ? `1.2px ${LIME}` : undefined, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.08em', letterSpacing: '-0.035em', marginLeft: '0.04em' }} />
    </div>
  );
  return (
    <div
      ref={wrap}
      onPointerEnter={(e) => {
        const r = wrap.current!.getBoundingClientRect();
        x.jump(e.clientX - r.left);
        y.jump(e.clientY - r.top);
        rad.set(Math.min(150, r.height * 0.7));
      }}
      onPointerMove={(e) => {
        const r = wrap.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => rad.set(0)}
      style={{ position: 'relative', cursor: 'none' }}
    >
      <motion.div style={{ WebkitMaskImage: cut, maskImage: cut }}>{line(false)}</motion.div>
      <motion.div aria-hidden style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', WebkitMaskImage: keep, maskImage: keep }}>
        {line(true)}
      </motion.div>
      {/* the lens rim */}
      <motion.span aria-hidden style={{ position: 'absolute', left: ringL, top: ringT, width: ring, height: ring, borderRadius: '50%', border: `1px solid rgba(163,230,53,0.35)`, pointerEvents: 'none' }} />
    </div>
  );
}

/* ───────── loader + the lime hand-off ───────── */
const LOAD_MS = 3000;

/**
 * The loader is the page's own grid. Every cell is a window: some show the photographs flicking past, one carries
 * the count, the big counter at the foot plays the photos through its digits. At 100 lime sweeps into every cell in
 * a cascade that spreads out from the photo frame; the page is swapped in underneath; the lime then sweeps out of
 * every cell in the same order, revealing the hero piece by piece.
 */
// The page's own grid on a wide screen; on phones and portrait tablets a simpler one (a masthead strip over two rows).
const GRIDS = {
  wide: { xs: [0, 7, 50, 79, 100], ys: [0, 15, 72, 100], from: { x: 64.5, y: 43.5 }, word: '1-0', label: '3-0' },
  compact: { xs: [0, 50, 100], ys: [0, 12, 60, 100], from: { x: 50, y: 70 }, word: '0-0', label: '1-0' },
};
// What the label says while it counts: the parts of the site that are being got ready.
const loadingWhat = (n: number) => (n < 22 ? 'Projects' : n < 48 ? 'Experience' : n < 72 ? 'Research' : n < 100 ? 'Gallery' : 'Ready');
type Stage = 'count' | 'cover' | 'reveal';

function GridLoader({ n, stage, fs, compact, stack, nameH }: { n: number; stage: Stage; fs: number; compact: boolean; stack: boolean; nameH: number }) {
  const g = compact ? GRIDS.compact : GRIDS.wide;
  const cells = [];
  for (let yi = 0; yi < g.ys.length - 1; yi++)
    for (let xi = 0; xi < g.xs.length - 1; xi++) {
      const x0 = g.xs[xi], x1 = g.xs[xi + 1], y0 = g.ys[yi], y1 = g.ys[yi + 1];
      const d = Math.hypot((x0 + x1) / 2 - g.from.x, ((y0 + y1) / 2 - g.from.y) * 0.8) / 70; // 0 at the frame, ~1 far away
      cells.push({ key: `${xi}-${yi}`, x0, x1, y0, y1, d });
    }
  const nameBottom = 'clamp(44px, 6.5vh, 70px)';
  const sideX = 'clamp(12px, 1.6vw, 28px)';
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, pointerEvents: stage === 'reveal' ? 'none' : 'auto' }}>
      {cells.map((c) => (
        <div
          key={c.key}
          style={{
            position: 'absolute',
            left: `${c.x0}%`,
            top: `${c.y0}%`,
            width: `${c.x1 - c.x0}%`,
            height: `${c.y1 - c.y0}%`,
            background: stage === 'reveal' ? 'transparent' : BG,
            boxShadow: stage === 'reveal' ? 'none' : `inset -1px -1px 0 ${LINE}`,
            overflow: 'hidden',
          }}
        >
          {c.key === g.word && stage === 'count' && (
            <div style={{ position: 'absolute', left: 'clamp(16px, 2vw, 32px)', top: 0, bottom: 0, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontFamily: SANS, fontSize: 'clamp(1rem, 1.3vw, 1.3rem)', letterSpacing: '-0.02em' }}>
              Darshil <span style={{ fontFamily: SERIF, fontStyle: 'italic', marginLeft: '0.25em' }}>Nathwani</span>
            </div>
          )}
          {/* what is being got ready, in words that mean something: the parts of the site */}
          {c.key === g.label && stage === 'count' && (
            <div style={{ position: 'absolute', left: compact ? 'clamp(12px, 3vw, 24px)' : 'clamp(16px, 1.6vw, 28px)', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: MONO, fontSize: compact ? 10 : 10.5, letterSpacing: compact ? '0.14em' : '0.18em', textTransform: 'uppercase', color: DIM, lineHeight: 1.9, whiteSpace: 'nowrap' }}>
              <span>Loading</span>
              <span style={{ color: TXT }}>{loadingWhat(n)}</span>
            </div>
          )}
          {/* the lime that sweeps in, then out */}
          <motion.div
            aria-hidden
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: stage === 'count' ? 'inset(0 100% 0 0)' : stage === 'cover' ? 'inset(0 0% 0 0)' : 'inset(0 0% 0 100%)' }}
            transition={{ duration: stage === 'cover' ? 0.6 : 0.75, delay: stage === 'cover' ? c.d * 0.45 : 0.05 + c.d * 0.55, ease: EXPO }}
            style={{ position: 'absolute', inset: 0, background: LIME }}
          />
        </div>
      ))}
      {/* the name is drawn, outline first, exactly where it will sit, and fills as the count completes (two lines on a phone, like the real one) */}
      {fs > 0 && (
        <motion.svg
          aria-hidden
          animate={{ opacity: stage === 'count' ? 1 : 0 }}
          transition={{ duration: 0.3, delay: stage === 'count' ? 0 : 0.35 }}
          style={{ position: 'absolute', left: sideX, bottom: nameBottom, width: '100%', height: stack ? fs * 2.14 : fs * 1.15, overflow: 'visible' }}
        >
          {(() => {
            const ink = { fill: `rgba(237,235,230,${n >= 100 ? 1 : 0})`, stroke: LIME, strokeWidth: 1.2, strokeDasharray: `${n * 9} 2000` };
            const first = { fontSize: fs, fontFamily: SANS, fontWeight: 500, letterSpacing: '-0.055em' };
            const second = { fontFamily: SERIF, fontStyle: 'italic' as const, fontWeight: 400, fontSize: fs * 1.08, letterSpacing: '-0.035em' };
            return stack ? (
              <>
                <text x="0" y={fs * 0.92} style={first} {...ink}>Darshil</text>
                <text x="0" y={fs * 1.91} style={second} {...ink}>Nathwani</text>
              </>
            ) : (
              <text x="0" y={fs * 0.92} style={first} {...ink}>
                Darshil
                <tspan dx={fs * 0.04} style={second}>Nathwani</tspan>
              </text>
            );
          })()}
        </motion.svg>
      )}
      {/* the count itself: small on the right rule on a wide screen; on a phone it sits above the name, bigger */}
      <div
        style={
          compact
            ? { position: 'absolute', left: 'clamp(16px, 3vw, 28px)', bottom: `calc(${nameBottom} + ${nameH}px + 18px)`, fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: DIM, opacity: stage === 'count' ? 1 : 0, transition: 'opacity .3s', lineHeight: 1 }
            : { position: 'absolute', right: 'clamp(16px, 2.4vw, 36px)', top: 'calc(15% + 22px)', textAlign: 'right', fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', color: DIM, opacity: stage === 'count' ? 1 : 0, transition: 'opacity .3s' }
        }
      >
        <span style={{ fontFamily: SANS, fontSize: compact ? 'clamp(4rem, 20vw, 8rem)' : 'clamp(2.4rem, 4vw, 3.6rem)', letterSpacing: '-0.04em', color: TXT, lineHeight: 0.9 }}>{String(n).padStart(2, '0')}</span>
        <span style={{ color: LIME }}> %</span>
      </div>
    </div>
  );
}

/* ───────── the lime sweep: the carousel's signature, reused on type ───────── */
const SWEEP = ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0 0 100%)'];

/** A phrase that changes by rolling: old letters leave upward, new ones arrive from below through a blur, one after another. */
function RollWord({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    // the right padding is for the italic's overhang (and its negative tracking), which the clip would otherwise shave off
    <motion.span layout transition={{ layout: { duration: 0.7, ease: EXPO } }} style={{ display: 'inline-grid', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.1em', marginBottom: '-0.1em', paddingRight: '0.16em', marginRight: '-0.16em', whiteSpace: 'nowrap', ...style }}>
      <AnimatePresence initial={false}>
        <motion.span key={text} style={{ gridArea: '1 / 1', display: 'inline-flex' }}>
          {text.split('').map((ch, k) => (
            <motion.span
              key={k}
              initial={{ y: '105%', opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, delay: 0.18 + k * 0.022, ease: EXPO } }}
              exit={{ y: '-105%', opacity: 0, filter: 'blur(8px)', transition: { duration: 0.6, delay: k * 0.015, ease: EXPO } }}
              style={{ display: 'inline-block', whiteSpace: 'pre', fontFamily: 'inherit', fontStyle: 'inherit' }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/**
 * One headline word, set twice in the same slot: as written, and in the site's other voice (plain words turn into the
 * lime italic serif, the italic keywords into the upright grotesk). Hover it and the letters roll over one by one into
 * the other voice; leave and they roll back. Both versions share one grid cell, so nothing around it moves.
 */
function FlipWord({ w, em, onHover }: { w: string; em?: boolean; onHover?: (v: boolean) => void }) {
  const [on, setOn] = useState(false);
  const serif: React.CSSProperties = { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em' };
  const sans: React.CSSProperties = { fontFamily: SANS, fontStyle: 'normal', fontWeight: 500, letterSpacing: '-0.035em' };
  const layer = (alt: boolean) => (
    <span aria-hidden={alt} style={{ gridArea: '1 / 1', display: 'inline-flex', justifyContent: 'flex-start', userSelect: alt ? 'none' : undefined, ...(alt ? (em ? { ...sans, color: TXT } : { ...serif, color: LIME }) : em ? serif : {}) }}>
      {w.split('').map((ch, k) => (
        <motion.span
          key={k}
          initial={false}
          animate={{ y: alt ? (on ? '0%' : '110%') : on ? '-110%' : '0%' }}
          transition={{ duration: 0.55, delay: k * 0.025, ease: EXPO }}
          style={{ display: 'inline-block', whiteSpace: 'pre', fontFamily: 'inherit', fontStyle: 'inherit' }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
  return (
    <span
      onMouseEnter={() => {
        setOn(true);
        onHover?.(true);
      }}
      onMouseLeave={() => {
        setOn(false);
        onHover?.(false);
      }}
      style={{ display: 'inline-grid', overflow: 'hidden', padding: '0.06em 0.08em 0.12em 0', margin: '-0.06em -0.08em -0.12em 0', verticalAlign: 'bottom' }}
    >
      {layer(false)}
      {layer(true)}
    </span>
  );
}

/**
 * The headline, restyled: Syne extra-bold capitals set tight, left-aligned on the grid. The three keywords are drawn
 * as hairline outlines. Hover one and a lime fill pours through it left to right, every other word dims back, and the
 * line underneath quietly rolls over to the work behind that word. Nothing pops up; the page just answers in place.
 */
const SYNE = "'Syne', 'Inter Tight', sans-serif";
const KEYS: Record<string, { label: string; work: string[] }> = {
  'PRODUCTION-SCALE': { label: 'Live in production', work: ['Crickraft Web', 'Crickraft Android', 'StrengthKraft'] },
  'AI/ML': { label: 'AI/ML, built', work: ['Kavach', 'Kriti', 'Kara-AI', 'Drishti-AI'] },
  'FULL-STACK': { label: 'Full-stack, shipped', work: ['Indian Chess Academy', 'Velvet Academy', 'StrengthKraft Web'] },
};
const LINES_H: string[][] = [['BUILDING', 'PRODUCTION-SCALE'], ['AI/ML', '&', 'FULL-STACK'], ['SYSTEMS']];

/** A word in Syne capitals drawn as an outline; hover and lime floods through it left to right. */
function Pour({ text, size, href, download, arrow, onClick }: { text: string; size: string; href?: string; download?: string; arrow?: string; onClick?: () => void }) {
  const [on, setOn] = useState(false);
  const word = (
    <span style={{ position: 'relative', display: 'inline-block', fontFamily: "'Syne', 'Inter Tight', sans-serif", fontWeight: 800, textTransform: 'uppercase', fontSize: size, lineHeight: 1, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: `1.2px ${on ? LIME : 'rgba(237,235,230,0.85)'}`, transition: '-webkit-text-stroke-color .4s' }}>
      {text}
      <motion.span aria-hidden initial={false} animate={{ clipPath: on ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }} transition={{ duration: 0.7, ease: EXPO }} style={{ position: 'absolute', inset: 0, color: LIME, WebkitTextStroke: '0px transparent', fontFamily: 'inherit', fontWeight: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>
        {text}
      </motion.span>
    </span>
  );
  const inner = (
    <>
      {word}
      {arrow && (
        <motion.span animate={{ y: on ? 3 : 0, color: on ? LIME : TXT }} transition={{ duration: 0.4 }} style={{ fontFamily: MONO, fontSize: 14, marginLeft: 10 }}>
          {arrow}
        </motion.span>
      )}
    </>
  );
  const common = { onMouseEnter: () => setOn(true), onMouseLeave: () => setOn(false), style: { display: 'inline-flex', alignItems: 'baseline', textDecoration: 'none', background: 'none', border: 0, padding: 0, cursor: 'pointer', minHeight: 0 } as React.CSSProperties };
  return href ? (
    <a href={href} download={download} {...common}>
      {inner}
    </a>
  ) : (
    <button onClick={onClick} {...common}>
      {inner}
    </button>
  );
}

function Key({ w, on, onHover }: { w: string; on: boolean; onHover: (v: boolean) => void }) {
  return (
    <span
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ position: 'relative', display: 'inline-block', cursor: 'default', color: 'transparent', WebkitTextStroke: `1.4px ${on ? LIME : 'rgba(237,235,230,0.85)'}`, transition: '-webkit-text-stroke-color .4s' }}
    >
      {w}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ clipPath: on ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        transition={{ duration: 0.7, ease: EXPO }}
        style={{ position: 'absolute', inset: 0, color: LIME, WebkitTextStroke: '0px transparent' }}
      >
        {w}
      </motion.span>
    </span>
  );
}

function Headline({ show, role, compact, children }: { show: boolean; role: string; compact?: boolean; children?: React.ReactNode }) {
  const [key, setKey] = useState<string | null>(null);
  const hover = (w: string) => (v: boolean) => setKey((cur) => (v ? w : cur === w ? null : cur));
  return (
    <div>
      <h1 style={{ margin: 0, fontFamily: SYNE, fontWeight: 800, fontSize: compact ? 'min(4.6rem, calc((100vw - 2 * var(--hero-pad)) / 11.2))' : 'clamp(1.9rem, 4.4vw, 5.4rem)', lineHeight: compact ? 0.95 : 0.92, letterSpacing: '-0.02em', textTransform: 'uppercase', color: TXT }}>
        {LINES_H.map((line, li) => (
          <Rise key={li} show={show} delay={0.55 + li * 0.08}>
            {line.map((w, k) => (
              <span key={k}>
                {KEYS[w] ? (
                  <Key w={w} on={key === w} onHover={hover(w)} />
                ) : (
                  <span style={{ opacity: key ? 0.18 : 1, transition: 'opacity .5s' }}>{w}</span>
                )}
                {k < line.length - 1 ? ' ' : ''}
              </span>
            ))}
            {li === LINES_H.length - 1 && (
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: '-0.02em', fontSize: compact ? '0.7em' : '0.62em', ...(compact ? { display: 'block', marginTop: '0.45em' } : { marginLeft: '0.3em' }), color: LIME, opacity: key ? 0.18 : 1, transition: 'opacity .5s' }}>
                <RollWord text={`as ${/^[AEIOU]/i.test(role) ? 'an' : 'a'} ${role}`} />
              </span>
            )}
          </Rise>
        ))}
      </h1>
      {/* the one line underneath: default copy, or the work behind the hovered word */}
      <div style={{ position: 'relative', marginTop: compact ? '1.1rem' : 'clamp(1.2rem, 2.2vw, 2rem)', minHeight: '1.6em' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={key ?? 'base'} initial={{ y: 14, opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: -10, opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.4, ease: EASE }}>
            {key ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                <span style={{ color: LIME }}>{KEYS[key].label} →</span>
                {KEYS[key].work.map((w, k) => (
                  <span key={w} style={{ color: TXT }}>
                    {w}
                    {k < KEYS[key].work.length - 1 && <span style={{ color: FAINT, marginLeft: 16 }}>/</span>}
                  </span>
                ))}
              </div>
            ) : (
              children
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Numbered index: a lime bar fills each row on hover, the label turns to ink. */
function IndexLink({ n, label, onClick, delay, show }: { n: string; label: string; onClick: () => void; delay: number; show: boolean }) {
  const [on, setOn] = useState(false);
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.button
        initial={{ y: '110%' }}
        animate={show ? { y: '0%' } : {}}
        transition={{ duration: 1, delay, ease: EXPO }}
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        onClick={onClick}
        style={{ position: 'relative', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '0.55rem 0.5rem', background: 'none', border: 0, borderTop: `1px solid ${LINE}`, color: TXT, cursor: 'pointer', minHeight: 0, textAlign: 'left' }}
      >
        <motion.span aria-hidden initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.55, ease: EXPO }} style={{ position: 'absolute', inset: 0, background: LIME, transformOrigin: on ? '0 50%' : '100% 50%' }} />
        <span style={{ position: 'relative', fontFamily: SANS, fontSize: 'clamp(1.05rem, 1.45vw, 1.45rem)', letterSpacing: '-0.02em', color: on ? BG : TXT, transition: 'color 0.3s' }}>{label}</span>
        <span style={{ position: 'relative', fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: on ? BG : FAINT, transition: 'color 0.3s' }}>{n}</span>
      </motion.button>
    </span>
  );
}

/* ───────── the index becomes the navbar as you scroll ───────── */
const NAV = [
  ['Works', 'work'],
  ['Experience', 'experience'],
  ['Honors', 'achievements'],
  ['Skills', 'skills'],
  ['Gallery', 'moments'],
  ['Contact', 'contact'],
] as const;
const SC = 0.66; // how far the index labels shrink to sit in the bar
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Box = { left: number; top: number; width: number; height: number };

function MorphLink({ id, label, n, k, start, e: eAll, onClick }: { id: string; label: string; n: string; k: number; start: Box; e: MotionValue<number>; onClick: () => void }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const top = useMotionValue(start.top);
  const left = useMotionValue(start.left);
  const scale = useMotionValue(1);
  const rowFade = useMotionValue(1);
  const textFade = useMotionValue(1);
  const [gone, setGone] = useState(false);
  useAnimationFrame(() => {
    const raw = eAll.get();
    const t = Math.min(1, Math.max(0, (raw - k * 0.07) / (1 - (NAV.length - 1) * 0.07)));
    const sy = window.scrollY;
    const target = document.querySelector(`[data-nav-link="${id}"] [data-nav-label]`)?.getBoundingClientRect();
    const lh = labelRef.current?.getBoundingClientRect().height ?? 24;
    const s0 = labelRef.current ? lh / scale.get() : 24;
    const sEnd = target ? target.height / s0 : 0.55;
    const startY = start.top - sy;
    const endY = target ? target.top - (start.height - s0) / 2 * sEnd : 20;
    const endX = target ? target.left - 8 * sEnd : start.left;
    top.set(lerp(startY, endY, t));
    left.set(lerp(start.left, endX, t));
    scale.set(lerp(1, sEnd, t));
    rowFade.set(1 - Math.min(1, t * 2.2));
    textFade.set(t < 0.86 ? 1 : 1 - (t - 0.86) / 0.14);
    const g = t >= 1;
    if (g !== gone) setGone(g);
  });
  const [on, setOn] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onClick={onClick}
      style={{ position: 'fixed', top, left, width: start.width, height: start.height, scale, transformOrigin: '0 0', zIndex: 61, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '0 0.5rem', background: 'none', border: 0, color: TXT, cursor: 'pointer', minHeight: 0, textAlign: 'left', visibility: gone ? 'hidden' : 'visible' }}
    >
      <motion.span aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: LINE, opacity: rowFade }} />
      <motion.span aria-hidden initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.55, ease: EXPO }} style={{ position: 'absolute', inset: 0, background: LIME, transformOrigin: on ? '0 50%' : '100% 50%', opacity: rowFade }} />
      <motion.span ref={labelRef} style={{ position: 'relative', opacity: textFade, fontFamily: SANS, fontSize: 'clamp(1.05rem, 1.45vw, 1.45rem)', letterSpacing: '-0.02em', lineHeight: 1, color: on ? BG : TXT, transition: 'color 0.3s' }}>
        {label}
      </motion.span>
      <motion.span style={{ position: 'relative', opacity: rowFade, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', color: on ? BG : FAINT }}>{n}</motion.span>
    </motion.button>
  );
}

function Wordmark() {
  return (
    <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 'clamp(1.1rem, 1.45vw, 1.45rem)', letterSpacing: '-0.035em', whiteSpace: 'nowrap', lineHeight: 1 }}>
      Darshil <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', color: 'rgba(237,235,230,0.82)' }}>Nathwani</span>
    </span>
  );
}

/* ───────── hero ───────── */
export default function HeroOrbit() {
  const navigate = useNavigate();
  const time = useIST();
  const nameRef = useRef<HTMLDivElement>(null);
  const [fs, setFs] = useState(0);
  const [nameH, setNameH] = useState(0);
  // Phones and portrait tablets get their own composition: the desktop grid (index column, rules, masthead) has no room there.
  const compact = useMediaQuery('(max-width: 1023px), (max-width: 1100px) and (orientation: portrait)');
  // The name stacks onto two lines on a phone.
  const stack = useMediaQuery('(max-width: 639px)');
  const [fontsReady, setFontsReady] = useState(false);
  const [phase, setPhase] = useState<'load' | 'cover' | 'reveal' | 'live'>('load');
  const [n, setN] = useState(0);
  const shown = phase === 'reveal' || phase === 'live';
  const [i, setI] = useState(0);
  const [over, setOver] = useState(false);
  const go = (d: number) => setI((v) => (v + d + PHOTOS.length) % PHOTOS.length);

  // count up; finish only once the first photos are in
  useEffect(() => {
    if (!fontsReady) return;
    let ready = 0;
    PHOTOS.forEach((p) => {
      const im = new Image();
      im.onload = im.onerror = () => ready++;
      im.src = p.src;
    });
    const t0 = performance.now();
    let raf = 0;
    let timer = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / LOAD_MS);
      const v = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      setN(v);
      if (v >= 100) {
        timer = window.setTimeout(() => {
          setPhase('cover');
          window.setTimeout(() => setPhase('reveal'), 1050);
          window.setTimeout(() => setPhase('live'), 1050 + 1400);
        }, 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [fontsReady]);

  useEffect(() => {
    if (phase !== 'live' || over) return;
    const t = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, phase, over]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, []);

  // frame leans toward the cursor; a disc follows it
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 120, damping: 20 });
  const rotX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 120, damping: 20 });
  const cx = useSpring(0, { stiffness: 500, damping: 40 });
  const cy = useSpring(0, { stiffness: 500, damping: 40 });
  const down = useRef<number | null>(null);

  // fit the name edge to edge
  useLayoutEffect(() => {
    let alive = true;
    const fit = () => {
      const el = nameRef.current;
      if (!el) return;
      const avail = el.parentElement!.clientWidth;
      const stacked = window.innerWidth < 640;
      el.style.flexDirection = stacked ? 'column' : 'row';
      el.style.alignItems = stacked ? 'flex-start' : 'baseline';
      el.style.fontSize = '100px';
      // Measure the words at their natural width: each is clipped to its own box (for the letter-by-letter rise), and the line
      // itself is capped to its container, so neither box's width says how wide the type really is. scrollWidth does.
      el.style.width = 'max-content';
      const w = Math.max(...Array.from(el.children).map((c) => (c as HTMLElement).scrollWidth), stacked ? 0 : el.scrollWidth);
      el.style.width = '';
      const next = Math.floor(((100 * avail) / w) * (stacked ? 0.95 : 0.985));
      el.style.fontSize = `${next}px`;
      setFs(next);
      setNameH(Math.round(el.getBoundingClientRect().height));
    };
    const ro = new ResizeObserver(() => fit());
    // The serif and Syne arrive late (they come in by CSS), so the name is measured again whenever a font finishes loading;
    // measuring only once used to size it from the fallback font, and on a phone the real one then ran off the edge.
    const refit = () => alive && fit();
    document.fonts.addEventListener('loadingdone', refit);
    Promise.all([document.fonts.load(`500 100px "Inter Tight"`), document.fonts.load(`italic 400 100px "DM Serif Display"`)])
      .catch(() => null)
      .then(() => document.fonts.ready)
      .then(() => {
        if (!alive) return;
        fit();
        setFontsReady(true);
        if (nameRef.current) ro.observe(nameRef.current.parentElement!);
      });
    return () => {
      alive = false;
      ro.disconnect();
      document.fonts.removeEventListener('loadingdone', refit);
    };
  }, []);

  // the index and the wordmark lift out of the hero into a fixed navbar as you scroll
  const logoSlot = useRef<HTMLDivElement>(null);
  const navSlots = useRef<(HTMLDivElement | null)[]>([]);
  const [boxes, setBoxes] = useState<{ logo: Box; nav: Box[] } | null>(null);
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, (y) => Math.min(1, Math.max(0, (y - window.innerHeight * 0.03) / (window.innerHeight * 0.6))));
  const smooth = useSpring(raw, { stiffness: 140, damping: 28, mass: 0.6 });
  const e = useTransform(smooth, (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2));
  useEffect(() => {
    if (phase !== 'live') return;
    const measure = () => {
      if (compact || !logoSlot.current) return setBoxes(null);
      const sy = window.scrollY;
      const box = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top + sy, width: r.width, height: r.height };
      };
      setBoxes({ logo: box(logoSlot.current), nav: navSlots.current.map((el) => box(el!)) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [phase, compact]);
  const logoFade = useTransform(e, [0.2, 0.55], [1, 0]);
  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else navigate('/', { state: { scrollTo: id } });
  };

  const fade = (delay: number, y = 10) => ({
    initial: { opacity: 0, y, filter: 'blur(8px)' },
    animate: shown ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1.2, delay: 0.6 + delay, ease: EASE },
  });
  const link = 'transition-colors duration-300 hover:text-[#A3E635]';
  const pad = (v: number) => String(v).padStart(2, '0');
  const role = i % ROLES.length;
  const em: React.CSSProperties = { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, color: TXT, letterSpacing: '-0.02em' };

  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: 600, background: BG, color: TXT, overflow: 'hidden', fontFamily: SANS, ['--hero-pad' as string]: compact ? 'clamp(16px, 3vw, 32px)' : 'clamp(12px, 1.6vw, 28px)' }}>
      {phase !== 'live' && <GridLoader n={n} fs={fs} compact={compact} stack={stack} nameH={nameH} stage={phase === 'load' ? 'count' : phase === 'cover' ? 'cover' : 'reveal'} />}

      {/* the site's navbar, which the index turns into */}
      {phase === 'live' && <Navbar handoff={boxes ? e : undefined} />}
      {boxes && (
        <>
          {NAV.map(([label, id], k) => (
            <MorphLink key={id} id={id} k={k} label={label} n={pad(k + 1)} start={boxes.nav[k]} e={e} onClick={() => goTo(id)} />
          ))}
        </>
      )}

      {/* grain */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', zIndex: 30, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* the grid's rules and crosses belong to the wide layout; on a phone they would just cut through the type */}
      {shown && !compact && LINES.map((l, k) => <Hair key={k} d={l.d} delay={0.3 + k * 0.12} style={l.style} />)}
      {shown && !compact && CROSSES.map((c, k) => <Cross key={k} x={c.x} y={c.y} delay={1 + k * 0.1} />)}

      {!compact && (
      <>
      {/* top band: a masthead. The name in the hero's pairing, the time beside the rule, the résumé as a solid lime block. */}
      <motion.div {...fade(0.2, -8)} className="!hidden md:!flex" style={{ position: 'absolute', top: 0, left: 'calc(7% + clamp(16px, 2vw, 32px))', right: 'calc(21% + clamp(16px, 2vw, 32px))', height: '15%', alignItems: 'center', justifyContent: 'space-between', zIndex: 3 }}>
        <motion.div ref={logoSlot} style={{ opacity: logoFade }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', minHeight: 0, color: TXT, fontSize: 'clamp(1.7rem, 2.5vw, 2.7rem)', lineHeight: 1, whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '-0.05em' }}>Darshil</span>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.08em', letterSpacing: '-0.03em', marginLeft: '0.06em', color: 'rgba(237,235,230,0.82)' }}>Nathwani</span>
          </button>
        </motion.div>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 6, background: LIME, boxShadow: `0 0 10px ${LIME}`, animation: 'h6pulse 2s ease-in-out infinite', alignSelf: 'center' }} />
          <span style={{ color: TXT }}>{time}</span> IST · Bengaluru
        </span>
      </motion.div>
      <motion.div {...fade(0.3, -8)} className="hidden md:flex" style={{ position: 'absolute', top: 0, left: 'calc(79% + clamp(16px, 1.6vw, 28px))', right: 'clamp(16px, 2.4vw, 36px)', height: '15%', alignItems: 'center', zIndex: 3 }}>
        <a
          href="/resume/Minimalist White and Grey Professional Resume.pdf"
          download="Darshil_Nathwani_Resume.pdf"
          className="group"
          style={{ position: 'relative', overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.95rem 1.1rem', background: LIME, color: BG, textDecoration: 'none' }}
        >
          <span aria-hidden className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: TXT, transitionTimingFunction: 'cubic-bezier(0.87,0,0.13,1)' }} />
          <span className="relative" style={{ fontFamily: "'Syne', 'Inter Tight', sans-serif", fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(1.05rem, 1.4vw, 1.4rem)', letterSpacing: '-0.01em' }}>Résumé</span>
          <span className="relative transition-transform duration-300 group-hover:translate-y-0.5" style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700 }}>↓</span>
        </a>
      </motion.div>
      {/* the hint, written sideways in the gap between the left grid line and the headline */}
      <motion.div
        {...fade(0.6, 0)}
        className="hidden md:block"
        style={{ position: 'absolute', left: 'calc(7% - clamp(22px, 1.8vw, 30px))', top: 'calc(15% + clamp(16px, 2.2vw, 34px))', zIndex: 3, writingMode: 'vertical-rl', rotate: '180deg', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: FAINT }}
      >
        Hover the <span style={{ color: LIME }}>outlined words</span>
      </motion.div>
      </>
      )}
      {/* left field: the headline */}
      <div className={compact ? 'h6-head-c' : 'h6-head'} style={{ position: 'absolute', zIndex: 3 }}>
        <Headline show={shown} role={ROLES[role]} compact={compact}>
          {compact && (
            <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT }}>
              Tap the <span style={{ color: LIME }}>outlined words</span>
            </span>
          )}
        </Headline>
      </div>

      {/* phones: the time and a scroll cue sit just over the name, so the headline and the name read as one composition */}
      {compact && (
        <motion.div
          {...fade(0.9, 6)}
          style={{ position: 'absolute', left: 'var(--hero-pad)', right: 'var(--hero-pad)', bottom: `calc(clamp(44px, 6.5vh, 70px) + ${nameH}px + 14px)`, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT }}
        >
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 6, background: LIME, boxShadow: `0 0 10px ${LIME}`, animation: 'h6pulse 2s ease-in-out infinite', alignSelf: 'center' }} />
            <span style={{ color: TXT }}>{time}</span> IST · Bengaluru
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            Scroll
            <span style={{ position: 'relative', width: 26, height: 1, background: LINE, overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: 0, height: 1, width: 10, background: LIME, animation: 'h6slide 1.8s cubic-bezier(0.87,0,0.13,1) infinite' }} />
            </span>
          </span>
        </motion.div>
      )}

      {!compact && (
      <>
      {/* right column: the index */}
      <div className="hidden md:block" style={{ position: 'absolute', left: 'calc(79% + clamp(16px, 1.6vw, 28px))', right: 'clamp(16px, 2.4vw, 36px)', top: 'calc(15% + 24px)', zIndex: 3 }}>
        <motion.div {...fade(0.6)} style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT, marginBottom: 10 }}>
          Index
        </motion.div>
        {NAV.map(([label, id], k) => (
          <div key={id} ref={(el) => (navSlots.current[k] = el)} style={{ visibility: boxes ? 'hidden' : 'visible' }}>
            <IndexLink n={pad(k + 1)} label={label} show={shown} delay={0.9 + k * 0.07} onClick={() => goTo(id)} />
          </div>
        ))}
      </div>
      <motion.div {...fade(1)} className="hidden md:flex h6-scroll" style={{ position: 'absolute', left: 'calc(79% + clamp(16px, 1.6vw, 28px))', bottom: 'calc(28% + 14px)', zIndex: 3, alignItems: 'center', gap: 12, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT }}>
        <span style={{ position: 'relative', width: 1, height: 38, background: LINE, overflow: 'hidden' }}>
          <span style={{ position: 'absolute', left: 0, width: 1, height: 14, background: LIME, animation: 'h6drop 1.8s cubic-bezier(0.87,0,0.13,1) infinite' }} />
        </span>
        Scroll
      </motion.div>
      </>
      )}

      {/* layout */}
      <style>{`
        .h6-head  { left: calc(7% + 16px); right: 16px; top: calc(15% + 28px); }
        @media (min-width: 768px) {
          .h6-head  { left: calc(7% + clamp(16px, 2vw, 32px)); right: auto; width: calc(72% - clamp(32px, 4vw, 64px)); top: calc(15% + clamp(16px, 2.2vw, 34px)); }
        }
        @keyframes h6pulse { 50% { opacity: .35 } }
        .h6-head-c { left: var(--hero-pad); right: var(--hero-pad); top: calc(env(safe-area-inset-top, 0px) + clamp(88px, 13svh, 120px)); }
        @keyframes h6slide { 0% { left: -10px } 100% { left: 26px } }
        @media (max-height: 820px) { .h6-scroll { display: none !important; } }
        @keyframes h6drop { 0% { top: -14px } 100% { top: 38px } }
      `}</style>
      {/* the name, edge to edge, letter by letter */}
      <div style={{ position: 'absolute', left: 'var(--hero-pad)', right: 'var(--hero-pad)', bottom: 'clamp(44px, 6.5vh, 70px)', zIndex: 2 }}>
        <Name show={shown} nameRef={nameRef} fs={fs} stack={stack} />
      </div>

      {/* bottom row */}
      <motion.div
        {...fade(0.8, 6)}
        style={{ position: 'absolute', left: 'var(--hero-pad)', right: 'var(--hero-pad)', bottom: 'clamp(14px, 2.4vh, 24px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: MONO, fontSize: compact ? 10 : 11, letterSpacing: compact ? '0.12em' : '0.14em', textTransform: 'uppercase', color: DIM, zIndex: 3, whiteSpace: 'nowrap' }}
      >
        <span>Based in India</span>
        <span style={{ display: 'flex', gap: compact ? 16 : 22 }}>
          <a className={link} style={{ minHeight: 0 }} href="https://github.com/Darshil-N" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className={link} style={{ minHeight: 0 }} href="https://www.linkedin.com/in/darshil-nathwani-bba698307" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </span>
        {!compact && (
          <a className={link} href="mailto:darshilnathwani@gmail.com" style={{ color: TXT, minHeight: 0 }}>
            darshilnathwani@gmail.com
          </a>
        )}
      </motion.div>
    </section>
  );
}
