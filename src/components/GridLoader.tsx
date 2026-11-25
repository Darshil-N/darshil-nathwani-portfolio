/**
 * GridLoader.tsx — The site's signature grid loading screen.
 *
 * The loader is the home page's own grid. Every cell is a window; at 100%
 * lime sweeps into every cell in a cascade from the focal frame, the page
 * becomes ready underneath, and lime sweeps out of every cell in the same
 * order to reveal the page.
 */
import { motion } from 'framer-motion';

export const LOAD_MS = 3000;

const BG = '#0B0B0C';
const TXT = '#EDEBE6';
const DIM = 'rgba(237,235,230,0.5)';
const LINE = 'rgba(237,235,230,0.12)';
const LIME = '#A3E635';
const SANS = "'Inter Tight', sans-serif";
const SERIF = "'DM Serif Display', serif";
const MONO = "'JetBrains Mono', monospace";
const EXPO = [0.87, 0, 0.13, 1] as const;

const GRIDS = {
  wide: { xs: [0, 7, 50, 79, 100], ys: [0, 15, 72, 100], from: { x: 64.5, y: 43.5 }, word: '1-0', label: '3-0' },
  compact: { xs: [0, 50, 100], ys: [0, 12, 60, 100], from: { x: 50, y: 70 }, word: '0-0', label: '1-0' },
};

const loadingWhat = (n: number) => (n < 22 ? 'Projects' : n < 48 ? 'Experience' : n < 72 ? 'Research' : n < 100 ? 'Gallery' : 'Ready');

export type GridLoaderStage = 'count' | 'cover' | 'reveal';

export default function GridLoader({
  n,
  stage,
  fs,
  compact,
  stack,
  nameH,
  zIndex = 40,
}: {
  n: number;
  stage: GridLoaderStage;
  fs: number;
  compact: boolean;
  stack: boolean;
  nameH: number;
  zIndex?: number;
}) {
  const g = compact ? GRIDS.compact : GRIDS.wide;
  const cells = [];
  for (let yi = 0; yi < g.ys.length - 1; yi++) {
    for (let xi = 0; xi < g.xs.length - 1; xi++) {
      const x0 = g.xs[xi], x1 = g.xs[xi + 1], y0 = g.ys[yi], y1 = g.ys[yi + 1];
      const d = Math.hypot((x0 + x1) / 2 - g.from.x, ((y0 + y1) / 2 - g.from.y) * 0.8) / 70;
      cells.push({ key: `${xi}-${yi}`, x0, x1, y0, y1, d });
    }
  }
  const nameBottom = 'clamp(44px, 6.5vh, 70px)';
  const sideX = compact ? 'clamp(16px, 3vw, 32px)' : 'clamp(12px, 1.6vw, 28px)';

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: stage === 'reveal' ? 'none' : 'auto' }}
    >
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
            <div style={{ position: 'absolute', left: 'clamp(16px, 2vw, 32px)', top: 0, bottom: 0, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontFamily: SANS, fontSize: 'clamp(1rem, 1.3vw, 1.3rem)', letterSpacing: '-0.02em', color: TXT }}>
              Darshil <span style={{ fontFamily: SERIF, fontStyle: 'italic', marginLeft: '0.25em' }}>Nathwani</span>
            </div>
          )}
          {c.key === g.label && stage === 'count' && (
            <div style={{ position: 'absolute', left: compact ? 'clamp(12px, 3vw, 24px)' : 'clamp(16px, 1.6vw, 28px)', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: MONO, fontSize: compact ? 10 : 10.5, letterSpacing: compact ? '0.14em' : '0.18em', textTransform: 'uppercase', color: DIM, lineHeight: 1.9, whiteSpace: 'nowrap' }}>
              <span>Loading</span>
              <span style={{ color: TXT }}>{loadingWhat(n)}</span>
            </div>
          )}
          <motion.div
            aria-hidden
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: stage === 'count' ? 'inset(0 100% 0 0)' : stage === 'cover' ? 'inset(0 0% 0 0)' : 'inset(0 0% 0 100%)' }}
            transition={{ duration: stage === 'cover' ? 0.6 : 0.75, delay: stage === 'cover' ? c.d * 0.45 : 0.05 + c.d * 0.55, ease: EXPO }}
            style={{ position: 'absolute', inset: 0, background: LIME }}
          />
        </div>
      ))}
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
