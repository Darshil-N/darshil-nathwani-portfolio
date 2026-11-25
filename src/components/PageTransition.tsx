/**
 * PageTransition — Signature Architectural Grid & Lime Wipe between routes.
 *
 * Visual language matches the rest of the portfolio:
 *  - Obsidian #0B0B0C staggered architectural columns (matching HeroOrbit's grid)
 *  - Electric lime (#A3E635) leading wavefront & progress rule
 *  - Mixed editorial typography (Inter Tight upright + DM Serif Display italic + JetBrains Mono)
 *  - + registration crosshairs & 1px architectural hairlines
 *
 * Preloads the destination lazy route chunk while the curtain closes so the
 * target page is ready underneath with zero spinner flash when the columns part.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, type NavigateOptions } from 'react-router-dom';
import { motion } from 'framer-motion';
import { markHeroVisited } from '../lib/siteReady';
import { sound } from '../lib/sound';

const BG = '#0B0B0C';
const LIME = '#A3E635';
const TXT = '#EDEBE6';
const LINE = 'rgba(237,235,230,0.12)';
const EXPO = [0.87, 0, 0.13, 1] as const;

const SANS = "'Inter Tight', sans-serif";
const SERIF = "'DM Serif Display', serif";
const MONO = "'JetBrains Mono', monospace";

// Staggered architectural columns (widths sum to 100%)
const COLUMNS = [14, 22, 28, 22, 14];
const STAGGER_MS = 42;
const COVER_MS = 480;
const HOLD_MS = 380;
const REVEAL_MS = 540;

interface RouteMeta {
  folio: string;
  titleSans: string;
  titleSerif: string;
  caption: string;
}

function getRouteMeta(to: string): RouteMeta {
  const path = to.split('?')[0].split('#')[0];
  if (path === '/') {
    return {
      folio: '00 / INDEX',
      titleSans: 'Darshil',
      titleSerif: 'Nathwani',
      caption: 'Portfolio · Selected Works',
    };
  }
  if (path === '/projects' || path === '/project' || path === '/project2') {
    return {
      folio: 'VOL. 01 / ARCHIVE',
      titleSans: 'Proof of',
      titleSerif: 'Work',
      caption: '20+ Projects · Interactive Volume',
    };
  }
  if (path === '/projects/list') {
    return {
      folio: '02 / DIRECTORY',
      titleSans: 'Complete',
      titleSerif: 'Archive',
      caption: 'Filterable Engineering Index',
    };
  }
  return {
    folio: 'NAVIGATION',
    titleSans: 'Darshil',
    titleSerif: 'Nathwani',
    caption: 'Engineering Portfolio',
  };
}

function preloadRoute(to: string) {
  const path = to.split('?')[0].split('#')[0];
  if (path === '/') return import('../pages/Index');
  if (path === '/projects' || path === '/project' || path === '/project2') {
    return import('../pages/ProjectsBookPage');
  }
  if (path === '/projects/list') return import('../pages/ProjectsPage');
  return Promise.resolve();
}

/* ── context ───────────────────────────────────────────────────────────────── */
interface TransitionCtx {
  go: (to: string, options?: NavigateOptions) => void;
}
const Ctx = createContext<TransitionCtx>({ go: () => {} });

/** Imperative hook: use anywhere instead of useNavigate() for the signature transition. */
export function usePageNavigate() {
  return useContext(Ctx).go;
}

/* ── state machine ─────────────────────────────────────────────────────────── */
type Phase = 'idle' | 'covering' | 'holding' | 'revealing';

interface TransitionJob {
  meta: RouteMeta;
}

let triggerGlobal: ((to: string, runNav: () => void) => void) | null = null;

/** Fixed overlay — mount once at the App root inside <BrowserRouter>. */
export function TransitionOverlay() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [job, setJob] = useState<TransitionJob | null>(null);
  const phaseRef = useRef<Phase>('idle');
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    triggerGlobal = (to: string, runNav: () => void) => {
      if (phaseRef.current !== 'idle') {
        runNav();
        return;
      }
      clearTimers();

      const meta = getRouteMeta(to);
      setJob({ meta });
      phaseRef.current = 'covering';
      setPhase('covering');

      // Warm up the destination lazy bundle immediately while the curtain closes.
      const preload = preloadRoute(to).catch(() => {});

      const totalCover = COVER_MS + (COLUMNS.length - 1) * STAGGER_MS;
      const t1 = window.setTimeout(async () => {
        await preload;
        phaseRef.current = 'holding';
        setPhase('holding');
        runNav();

        const t2 = window.setTimeout(() => {
          phaseRef.current = 'revealing';
          setPhase('revealing');

          const totalReveal = REVEAL_MS + (COLUMNS.length - 1) * STAGGER_MS;
          const t3 = window.setTimeout(() => {
            phaseRef.current = 'idle';
            setPhase('idle');
            setJob(null);
          }, totalReveal + 40);
          timers.current.push(t3);
        }, HOLD_MS);
        timers.current.push(t2);
      }, totalCover);
      timers.current.push(t1);
    };

    return () => {
      clearTimers();
      triggerGlobal = null;
    };
  }, []);

  if (phase === 'idle' || !job) return null;

  const isRevealing = phase === 'revealing';
  const showEditorial = phase === 'covering' || phase === 'holding';

  const overlay = (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: isRevealing ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ── Staggered Architectural Grid Columns ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
        }}
      >
        {COLUMNS.map((widthPct, idx) => {
          const delaySec = (idx * STAGGER_MS) / 1000;
          return (
            <motion.div
              key={`${idx}-${isRevealing ? 'rev' : 'cov'}`}
              initial={{ y: isRevealing ? '0%' : '100%' }}
              animate={{ y: isRevealing ? '-100%' : '0%' }}
              transition={{
                duration: (isRevealing ? REVEAL_MS : COVER_MS) / 1000,
                delay: delaySec,
                ease: EXPO,
              }}
              style={{
                position: 'relative',
                width: `${widthPct}%`,
                height: '100%',
                backgroundColor: BG,
                boxShadow: `inset -1px 0 0 ${LINE}`,
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              {/* Leading electric lime edge (top while sweeping up, bottom while exiting up) */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  [isRevealing ? 'bottom' : 'top']: 0,
                  height: 3,
                  backgroundColor: LIME,
                  boxShadow: `0 0 22px 4px rgba(163,230,53,0.65)`,
                }}
              />
              {/* Subtle lime gradient sheen right behind the leading edge */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  [isRevealing ? 'bottom' : 'top']: 3,
                  height: '18%',
                  background: isRevealing
                    ? 'linear-gradient(to top, rgba(163,230,53,0.14), transparent)'
                    : 'linear-gradient(to bottom, rgba(163,230,53,0.14), transparent)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Horizontal centre hairline & registration marks ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isRevealing ? 0 : 1,
          opacity: isRevealing ? 0 : 1,
        }}
        transition={{
          duration: isRevealing ? 0.28 : 0.45,
          delay: isRevealing ? 0 : 0.18,
          ease: EXPO,
        }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: 1,
          backgroundColor: LINE,
          transformOrigin: isRevealing ? '100% 50%' : '0% 50%',
          pointerEvents: 'none',
        }}
      >
        {/* Glowing lime beam sweeping across the centre rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'holding' ? 1 : isRevealing ? 1 : 0.15 }}
          transition={{ duration: 0.42, ease: EXPO }}
          style={{
            position: 'absolute',
            inset: 0,
            height: 1,
            backgroundColor: LIME,
            boxShadow: `0 0 18px 2px rgba(163,230,53,0.75)`,
            transformOrigin: '0% 50%',
          }}
        />
      </motion.div>

      {/* ── Editorial Destination Title Card ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showEditorial ? 1 : 0 }}
        transition={{
          duration: showEditorial ? 0.28 : 0.2,
          delay: showEditorial ? 0.22 : 0,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Top folio badge */}
        <div style={{ overflow: 'hidden', marginBottom: 14 }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: showEditorial ? '0%' : '-110%' }}
            transition={{ duration: 0.42, delay: showEditorial ? 0.24 : 0, ease: EXPO }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(237,235,230,0.65)',
            }}
          >
            <span style={{ color: LIME }}>◆</span>
            <span>{job.meta.folio}</span>
          </motion.div>
        </div>

        {/* Mixed-voice editorial title (Inter Tight + DM Serif Display italic) */}
        <div style={{ overflow: 'hidden', padding: '0.06em 0.12em' }}>
          <motion.div
            initial={{ y: '115%' }}
            animate={{ y: showEditorial ? '0%' : '-115%' }}
            transition={{ duration: 0.48, delay: showEditorial ? 0.28 : 0.03, ease: EXPO }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.22em',
              fontSize: 'clamp(2.4rem, 6vw, 4.75rem)',
              lineHeight: 0.98,
              color: TXT,
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontWeight: 600,
                letterSpacing: '-0.045em',
              }}
            >
              {job.meta.titleSans}
            </span>
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: LIME,
                fontSize: '1.06em',
              }}
            >
              {job.meta.titleSerif}
            </span>
          </motion.div>
        </div>

        {/* Bottom caption */}
        <div style={{ overflow: 'hidden', marginTop: 18 }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: showEditorial ? '0%' : '-110%' }}
            transition={{ duration: 0.42, delay: showEditorial ? 0.34 : 0, ease: EXPO }}
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(237,235,230,0.4)',
            }}
          >
            {job.meta.caption}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : overlay;
}

/* ── provider ──────────────────────────────────────────────────────────────── */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const go = useCallback(
    (to: string, options?: NavigateOptions) => {
      // Any SPA navigation marks the initial session loader as already seen
      markHeroVisited();
      sound.playClick?.();

      const targetPath = to.split('?')[0].split('#')[0];
      const currentPath = window.location.pathname;
      if (targetPath === currentPath && !options?.state) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (triggerGlobal) {
        triggerGlobal(to, () => navigate(to, options));
      } else {
        navigate(to, options);
      }
    },
    [navigate],
  );

  return <Ctx.Provider value={{ go }}>{children}</Ctx.Provider>;
}

/* ── TransitionLink ────────────────────────────────────────────────────────── */
interface TLProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  state?: unknown;
}

/**
 * Drop-in replacement for <Link to="…">. Plays the architectural grid wipe
 * before navigating. Cmd/Ctrl+click opens in a new tab as normal.
 */
export function TransitionLink({ to, state, children, onClick, ...rest }: TLProps) {
  const { go } = useContext(Ctx);

  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick?.(e);
        go(to, state ? { state } : undefined);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export default TransitionProvider;
