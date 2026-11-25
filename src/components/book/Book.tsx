/**
 * Book.tsx — a hardcover lying on a desk, in plain CSS 3D (no WebGL, no extra libraries).
 *
 * The scene is one 3D space: the desk plane, a back board, the leaves stacked above it with real depth, and the edges of
 * the page blocks drawn from the side so the book has thickness (gilt edges, in the site's lime). A "rig" tilts the whole
 * space towards the camera. Its tilt, spin and scale, the way the book slides to the centre, and the cover itself are all
 * driven by one number, `open` (0 → 1), which the page ties to the scroll position.
 *
 * Leaves: a leaf is one sheet with a front and a back, hinged at the spine, swinging through an angle (0 = lying on the
 * right, 180 = lying on the left). `turned` is how many have been turned (the cover is leaf 0 and belongs to the scroll).
 * Everything after the cover turns by click, drag, arrow keys or the controls; a jump riffles the leaves in a cascade.
 *
 * Cost: every moving value here is a transform or an opacity. Shading layers exist only while a leaf is moving, the page
 * content is only rendered for leaves near the current spread, and `will-change` is set only while something is moving.
 */
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { motion, motionValue, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import { sound } from '../../lib/sound';
import { T } from './tokens';

export type BookLeaf = { front: React.ReactNode; back: React.ReactNode };
export type BookHandle = {
  goTo: (turned: number) => void;
  next: () => void;
  prev: () => void;
  /** the book's own element, for the pop-up to rise out of */
  element: () => HTMLElement | null;
};

type Props = {
  leaves: BookLeaf[];
  single: boolean;
  /** the scroll position in leaves, already smoothed: 0 = shut on its front, k = k leaves turned, N = shut on its back */
  u: MotionValue<number>;
  /** things lying on the desk: rendered in the same 3D space, on the table plane (z = TABLE) */
  surface?: React.ReactNode;
  keys?: boolean;
  onTurn?: (turned: number) => void;
  /** every kind of navigation is a scroll: asked to bring the book to `turned` leaves */
  onGoTo: (turned: number) => void;
  /** weak devices: no bending sheets, no ribbon, fewer pages with content */
  lite?: boolean;
};

const rad = (a: number) => (a * Math.PI) / 180;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const NONE = motionValue(180); // "no neighbour": fully turned away, casts no shadow

/* geometry, in px of the book's own space (z is up from the top of the back board) */
export const SLAB = 6; // the back board's thickness (it reaches down to the desk at z = -SLAB)
export const TABLE = -SLAB;
export const LIFT = 12; // the book stands this high above the desk mat, on a second volume
const OV = 7; // how far the boards overhang the page block
const CT = 3; // thickness of the front board
const BASE = 11; // the hidden body of the page block: both halves sit at about the same height, so the spread reads level
const DZ = 0.36; // depth between the sheets that do move
const HMAX = 34;

const GILT_FRONT = 'linear-gradient(to bottom, #d9deb0 0%, #b4c26e 10%, #8a9c44 42%, #566a26 78%, #2a3512 100%)';
const GILT_SIDE = 'linear-gradient(to right, #d9deb0 0%, #b4c26e 10%, #8a9c44 42%, #566a26 78%, #2a3512 100%)';
const BOARD_EDGE = 'linear-gradient(to bottom, #3a3c3a 0%, #171818 38%, #09090a 100%)';

/* shading, as functions of a leaf's angle (a) and its neighbour's (o). The key light is above and a little to the left. */
const selfFront = (a: number) => clamp(1 - (0.45 * Math.sin(rad(a)) + 0.87 * Math.cos(rad(a))) / 0.87, 0, 1) * 0.5;
const selfBack = (a: number) => clamp(1 - (-0.45 * Math.sin(rad(a)) - 0.87 * Math.cos(rad(a))) / 0.87, 0, 1) * 0.55;
const castOnFront = (o: number) => (o <= 0 ? 0 : o < 90 ? Math.sin(rad(o)) * 0.55 : o < 150 ? ((150 - o) / 60) * 0.55 : 0);
const castOnBack = (o: number) => (o <= 30 ? 0 : o < 90 ? ((o - 30) / 60) * 0.55 : o < 180 ? Math.sin(rad(o)) * 0.55 : 0);
const moving = (a: number) => a > 0.2 && a < 179.8;

const PAPER = <div style={{ position: 'absolute', inset: 0, background: '#0e0e10' }} />;
const FACE: React.CSSProperties = { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };

const inertProps = (live: boolean) => (live ? {} : ({ inert: '', 'aria-hidden': true } as Record<string, unknown>));
const SPAN = 2; // a leaf in flight is cut into this many strips, hinged to one another so it can bend
const CURL = 20; // degrees of bend at each hinge at the most

/** one strip of a leaf in flight; it carries its own slice of both faces, and the next strip is hinged to it */
function Strip({ j, angle, curl, prev, next, leaf, near, past }: {
  j: number;
  angle: MotionValue<number>;
  curl: MotionValue<number>;
  prev: MotionValue<number>;
  next: MotionValue<number>;
  leaf: BookLeaf;
  near: boolean;
  past: boolean;
}) {
  const rel = useTransform(curl, (c) => -c);
  const A = useTransform([angle, curl] as MotionValue<number>[], ([a, c]) => (a as number) + j * (c as number)); // this strip's own angle
  const fDark = useTransform([A, prev] as MotionValue<number>[], ([a, o]) => Math.max(selfFront(a as number), castOnFront(o as number)));
  const bDark = useTransform([A, next] as MotionValue<number>[], ([a, o]) => Math.max(selfBack(a as number), castOnBack(o as number)));
  const last = j === SPAN - 1;
  const face = (side: 'front' | 'back') => {
    const content = near ? (side === 'front' ? leaf.front : leaf.back) : PAPER;
    const dark = side === 'front' ? fDark : bDark;
    const shown = side === 'front' ? !past : past;
    return (
      <div aria-hidden style={{ ...FACE, overflow: 'hidden', width: last ? '100%' : 'calc(100% + 0.7px)', ...(side === 'back' ? { transform: 'rotateY(180deg)', transformOrigin: '50% 50%' } : {}) }}>
        <div style={{ position: 'absolute', top: 0, height: '100%', width: `${SPAN * 100}%`, left: `${-(side === 'front' ? j : SPAN - 1 - j) * 100}%` }}>{content}</div>
        {shown && (
          <>
            <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: dark, willChange: 'opacity', background: `linear-gradient(to ${side === 'front' ? 'right' : 'left'}, rgba(0,0,0,0.85), rgba(0,0,0,0.35))` }} />
          </>
        )}
      </div>
    );
  };
  return (
    <motion.div style={{ position: 'absolute', top: 0, height: '100%', left: j === 0 ? 0 : '100%', width: j === 0 ? `${100 / SPAN}%` : '100%', transformOrigin: '0% 50%', transformStyle: 'preserve-3d', rotateY: j === 0 ? 0 : rel }}>
      {face('front')}
      {face('back')}
      {!last && <Strip j={j + 1} angle={angle} curl={curl} prev={prev} next={next} leaf={leaf} near={near} past={past} />}
    </motion.div>
  );
}

function LeafView({ i, count, single, angle, prev, next, leaf, frontLive, backLive, near, lite }: {
  i: number;
  count: number;
  single: boolean;
  angle: MotionValue<number>;
  prev: MotionValue<number>;
  next: MotionValue<number>;
  leaf: BookLeaf;
  frontLive: boolean;
  backLive: boolean;
  near: boolean;
  lite?: boolean;
}) {
  const first = i === 0; // the front board: larger than the pages, and thick
  const rotateY = useTransform(angle, (a) => -a);
  // lying on the right a leaf sits above the ones after it; once turned it sits above the ones before it. It lifts as it swings.
  const z = useTransform(angle, (a) => lerp(BASE + (count - i) * DZ + 1, BASE + (i + 1) * DZ + 1 + CT, smooth(a / 180)) + Math.sin(rad(a)) * (first ? 1.2 : 3.2));
  // a little roll as it passes the vertical
  const skewY = useTransform(angle, (a) => Math.sin(rad(a)) * (first ? 0.6 : 1.6));
  const twist = useTransform(angle, (a) => Math.sin(rad(a * 2)) * (first ? 0 : 1.1));
  // the bend: the free edge leads as the sheet lifts off and trails as it settles, and the faster it travels the more it bends
  const curl = useTransform(angle, (a) => CURL * (0.4 + 0.6 * Math.min(1, Math.abs(angle.getVelocity()) / 260)) * Math.sin(rad(a * 2)));

  // shading layers only exist while this leaf, or one touching it, is in motion; and only on the face that can be seen
  const [live, setLive] = useState(false);
  const [flying, setFlying] = useState(false);
  const [past, setPast] = useState(false);
  const sync = () => {
    const a = angle.get();
    const f = moving(a);
    const l = f || moving(prev.get()) || moving(next.get());
    setFlying((p) => (p === f ? p : f));
    setLive((p) => (p === l ? p : l));
    setPast((p) => (p === a > 90 ? p : a > 90));
  };
  useMotionValueEvent(angle, 'change', sync);
  useMotionValueEvent(prev, 'change', sync);
  useMotionValueEvent(next, 'change', sync);

  const frontDark = useTransform([angle, prev] as MotionValue<number>[], ([a, o]) => Math.max(selfFront(a as number), castOnFront(o as number)));
  const backDark = useTransform([angle, next] as MotionValue<number>[], ([a, o]) => Math.max(selfBack(a as number), castOnBack(o as number)));
  const inert = inertProps;
  const showFront = live && !past;
  const showBack = live && past;
  const strips = flying && !first && !lite;

  const shade = (dark: MotionValue<number>, side: 'front' | 'back') => (
    <motion.div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20, opacity: dark, willChange: 'opacity', background: `linear-gradient(to ${side === 'front' ? 'right' : 'left'}, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 36%, rgba(0,0,0,0.1) 100%)` }} />
  );

  // the front board overhangs the pages on three sides (never the spine)
  const box: React.CSSProperties = first
    ? { top: -OV, height: `calc(100% + ${OV * 2}px)`, left: single ? 0 : '50%', width: single ? `calc(100% + ${OV}px)` : `calc(50% + ${OV}px)` }
    : { top: 0, height: '100%', left: single ? 0 : '50%', width: single ? '100%' : '50%' };

  return (
    <motion.div style={{ position: 'absolute', ...box, transformOrigin: '0% 50%', transformStyle: 'preserve-3d', rotateY, skewY, rotateX: twist, z }}>
      {strips ? (
        <Strip j={0} angle={angle} curl={curl} prev={prev} next={next} leaf={leaf} near={near} past={past} />
      ) : (
        <>
          <div style={first ? { ...FACE, transform: `translateZ(${CT}px)` } : FACE} {...inert(frontLive)}>
            {near ? leaf.front : PAPER}
            {showFront && shade(frontDark, 'front')}
          </div>
          <div style={{ ...FACE, transform: 'rotateY(180deg)' }} {...inert(backLive)}>
            {first ? (
              <>
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #141514, #0b0b0c)', boxShadow: 'inset 0 0 0 1px rgba(237,235,230,0.1)' }} />
                <div style={{ position: 'absolute', top: OV, bottom: OV, left: 0, right: single ? OV : 0 }}>{near ? leaf.back : PAPER}</div>
              </>
            ) : near ? leaf.back : PAPER}
            {showBack && shade(backDark, 'back')}
          </div>
        </>
      )}
      {first && (
        <>
          {/* the thickness of the board: its lower edge and its fore-edge */}
          <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: '100%', height: CT, transformOrigin: '50% 0', transform: `translateZ(${CT}px) rotateX(-90deg)`, background: BOARD_EDGE, borderRadius: '0 0 3px 3px' }} />
          <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: '100%', width: CT, transformOrigin: '0 50%', transform: `translateZ(${CT}px) rotateY(90deg)`, background: 'linear-gradient(to right, #3a3c3a, #0b0b0c)' }} />
        </>
      )}
    </motion.div>
  );
}

/**
 * The edge of a stack of pages, as a face standing on the board. It is always drawn at full height and scaled to the
 * stack's height, so changing it is a transform, never a layout. `edge`: which side of the stack it faces.
 */
function Edge({ edge, left, width, h, visible }: { edge: 'front' | 'left' | 'right' | 'spine'; left: string; width: string; h: number; visible: boolean }) {
  const s = Math.max(0.001, h / HMAX);
  const t = 'transform .9s cubic-bezier(.65,0,.35,1), opacity .5s';
  const common: React.CSSProperties = { position: 'absolute', opacity: visible ? 1 : 0, transition: t, pointerEvents: 'none' };
  if (edge === 'front') {
    return <div aria-hidden style={{ ...common, left, width, top: `calc(100% - ${HMAX}px)`, height: HMAX, transformOrigin: '50% 100%', transform: `rotateX(-90deg) scaleY(${s})`, background: GILT_FRONT }} />;
  }
  const side = edge === 'right';
  return (
    <div
      aria-hidden
      style={{
        ...common,
        top: 0,
        height: '100%',
        left,
        width: HMAX,
        marginLeft: side ? -HMAX : 0,
        transformOrigin: side ? '100% 50%' : '0 50%',
        transform: edge === 'right' ? `rotateY(90deg) scaleX(${s})` : `rotateY(-90deg) scaleX(${s})`,
        background: side ? GILT_SIDE : edge === 'spine' ? 'linear-gradient(to right, #1b1c1b, #0b0b0c)' : 'linear-gradient(to right, #2a3512 0%, #566a26 22%, #8a9c44 58%, #b4c26e 90%, #d9deb0 100%)',
      }}
    />
  );
}

/** A satin ribbon: it comes out from between the pages at the head of the spine, lies down the gutter, and drapes over the front edge onto the desk. */
function Ribbon({ single, z, visible, ph }: { single: boolean; z: number; visible: boolean; ph: number }) {
  const drop = z - TABLE + LIFT; // from the ribbon's height down to the desk mat
  const run = 42; // how far out from the edge it lands
  const phi = (Math.atan2(drop, run) * 180) / Math.PI;
  const len = Math.hypot(drop, run);
  const x = single ? 'calc(var(--pw) * 0.045)' : 'calc(50% + var(--pw) * 0.045)';
  const w = 'calc(var(--pw) * 0.012)';
  const satin = 'linear-gradient(to right, #587a1d 0%, #9fd13f 35%, #86b82a 70%, #5d841f 100%)';
  const tr = 'transform .9s cubic-bezier(.65,0,.35,1), opacity .5s';
  const flat: React.CSSProperties = { position: 'absolute', left: x, width: w, background: satin, pointerEvents: 'none', transition: tr, opacity: visible ? 1 : 0 };
  return (
    <>
      <div aria-hidden style={{ ...flat, top: 0, height: '100%', transform: `translateZ(${z}px)` }} />
      <div aria-hidden style={{ ...flat, top: '100%', height: len, transformOrigin: '50% 0', transform: `translateZ(${z}px) rotateX(${-phi}deg)`, background: 'linear-gradient(to right, #4a6a18 0%, #86b82a 35%, #729f24 70%, #4f711a 100%)' }} />
      <div aria-hidden style={{ ...flat, top: `calc(100% + ${run}px)`, height: ph * 0.2, transformOrigin: '50% 0', transform: `translateZ(${TABLE - LIFT + 0.4}px) rotateZ(7deg)`, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)', background: 'linear-gradient(to right, #46641a 0%, #7aa828 35%, #6a9722 70%, #476a18 100%)' }} />
    </>
  );
}

const Book = forwardRef<BookHandle, Props>(function Book({ leaves, single, u, surface, keys = true, onTurn, onGoTo, lite }, ref) {
  const N = leaves.length;
  const angles = useMemo(() => leaves.map(() => motionValue(0)), [N]); // eslint-disable-line react-hooks/exhaustive-deps
  const [turned, setTurned] = useState(0);
  const turnedRef = useRef(0);
  const aim = useRef(0); // where a run of key presses / clicks is heading (the scroll takes a moment to get there)
  const aimUntil = useRef(0);
  const lastClick = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [pw, setPw] = useState(0);
  const [ph, setPh] = useState(0);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setPw(el.offsetWidth / (single ? 1 : 2));
      setPh(el.offsetHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [single]);

  /* ── the camera: everything follows `u`, the scroll position in leaves (0 = shut, k = k leaves turned, N = shut on the back) ──
     shut: low and oblique, turned a little on the desk, so the thickness of the book shows.
     open: it rises to a reading angle and squares up, leans in a touch as you read, and settles back down when the book is closed. */
  const open = useTransform(u, (v) => smooth(clamp(v, 0, 1)));
  const back = useTransform(u, (v) => (single ? 0 : smooth(clamp(v - (N - 1), 0, 1)))); // 1 once the book is shut on its back cover
  const push = useTransform(u, (v) => smooth(clamp((v - 1) / 2.5, 0, 1)));
  const rotX = useTransform([open, back, push] as MotionValue<number>[], ([o, b, p]) => lerp(lerp(single ? 54 : 63, single ? 14 : 24, o as number), single ? 54 : 63, b as number) - (p as number) * (1 - (b as number)) * (single ? 3 : 5));
  const rotZ = useTransform([open, back] as MotionValue<number>[], ([o, b]) => lerp(lerp(single ? -9 : -15, single ? 0 : -0.6, o as number), single ? 9 : 15, b as number));
  const scale = useTransform([open, back, push] as MotionValue<number>[], ([o, b, p]) => lerp(lerp(single ? 0.68 : 1.1, single ? 0.94 : 1, o as number), single ? 0.68 : 1.1, b as number) + (p as number) * (1 - (b as number)) * 0.05);
  const rigY = useTransform([open, back] as MotionValue<number>[], ([o, b]) => lerp(lerp(single ? 40 : 46, single ? -4 : -14, o as number), single ? 40 : 46, b as number));
  // a shut book is centred on its cover; it slides to the middle as it opens, and over to the left when shut on its back
  const shiftX = useTransform([open, back] as MotionValue<number>[], ([o, b]) => (single ? 0 : -(pw / 2) * (1 - (o as number)) + (b as number) * (pw / 2)));
  const leftBoard = useTransform([open, back] as MotionValue<number>[], ([o, b]) => (single ? 0 : Math.max(clamp((o as number - 0.4) / 0.35, 0, 1), b as number)));
  const rightBoard = useTransform(back, (b) => 1 - b);
  // the gutter: a soft shade down the middle, there once the cover is over
  const gutter = useTransform([open, back] as MotionValue<number>[], ([o, b]) => clamp(((o as number) - 0.88) / 0.12, 0, 1) * (1 - (b as number)));
  // the cover's shadow on the first page, and the light that comes up as it lifts
  const coverShade = useTransform(open, (o) => (o > 0.02 && o < 0.995 ? Math.pow(1 - o, 0.85) * 0.85 : 0));

  /* ── the leaves: each follows its own slice of `u`; the spring on `u` (in the page) is what makes a fast scroll riffle ── */
  const sync = (v: number) => {
    for (let i = 0; i < N; i++) angles[i].set(clamp(v - i, 0, 1) * 180);
    const t = clamp(Math.round(v), 0, N);
    if (t !== turnedRef.current) {
      const was = turnedRef.current;
      const now = performance.now();
      turnedRef.current = t;
      setTurned(t);
      onTurn?.(t);
      if (now > aimUntil.current) aim.current = t;
      if (was >= 1 && t >= 1 && now - lastClick.current > 110) {
        lastClick.current = now;
        sound.playClick?.();
      } else if (was === 0 && t === 1) sound.playChime?.();
    }
  };
  useMotionValueEvent(u, 'change', sync);
  useEffect(() => sync(u.get()), [N]); // eslint-disable-line react-hooks/exhaustive-deps

  // while the camera moves the whole scene is its own layer (so it is moved, not repainted); at rest it is released so the type stays crisp
  const rigRef = useRef<HTMLDivElement>(null);
  const settle = useRef(0);
  const moveRig = () => {
    if (rigRef.current) rigRef.current.style.willChange = 'transform';
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => rigRef.current && (rigRef.current.style.willChange = 'auto'), 260);
  };
  useMotionValueEvent(u, 'change', moveRig);
  useEffect(() => () => window.clearTimeout(settle.current), []);

  /* ── navigation is scrolling: every way of turning a page just asks the page to scroll there ── */
  const goTo = (to: number) => {
    const t = clamp(Math.round(to), 0, N);
    aim.current = t;
    aimUntil.current = performance.now() + 1400;
    onGoTo(t);
  };
  useImperativeHandle(ref, () => ({
    goTo,
    next: () => goTo(aim.current + 1),
    prev: () => goTo(aim.current - 1),
    element: () => bookRef.current,
  }));

  // keyboard
  useEffect(() => {
    if (!keys) return;
    const on = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.key === 'ArrowRight') goTo(aim.current + 1);
      else if (e.key === 'ArrowLeft') goTo(aim.current - 1);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── pointer: the cursor moves a sheen across the covers ── */
  const track = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const root = e.currentTarget as HTMLElement;
    const r = bookRef.current?.getBoundingClientRect();
    if (!r) return;
    const mx = clamp((e.clientX - r.left) / r.width, 0, 1);
    const my = clamp((e.clientY - r.top) / r.height, 0, 1);
    root.style.setProperty('--mxr', String(single ? mx : clamp((mx - 0.5) * 2, 0, 1)));
    root.style.setProperty('--mxl', String(single ? mx : clamp(mx * 2, 0, 1)));
    root.style.setProperty('--my', String(my));
  };

  const closed = turned === 0;
  const topZ = BASE + N * DZ + CT + 30;
  // heights of the two stacks (the top sheet on each side, less the half-pixel that keeps the edge under it)
  const rightTop = BASE + (N - Math.min(Math.max(turned, 1), N)) * DZ + 1; // where the top sheet on the right lies (the cover counts as page one)
  const rightH = closed ? BASE + N * DZ + 0.6 : rightTop - 0.4;
  const leftH = turned <= 1 ? BASE + DZ + 0.6 : BASE + turned * DZ + 1 + CT - 0.4;
  const zone = (side: 'l' | 'r'): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    [side === 'r' ? 'right' : 'left']: 0,
    width: side === 'r' && closed && !single ? '50%' : closed ? '100%' : 'calc(var(--pw) * 0.085)',
    transform: `translateZ(${topZ}px)`,
    zIndex: 5,
    background: 'transparent',
    border: 0,
    padding: 0,
    minHeight: 0,
    cursor: 'pointer',
  });

  const boardTop = 'linear-gradient(180deg, #151617, #0a0a0b)';
  const boardLine = '0 0 0 1px rgba(237,235,230,0.12), inset 0 1px 0 rgba(255,255,255,0.08)';
  const rx = single ? '0%' : '50%'; // where the right-hand half begins

  return (
    <div
      ref={rootRef}
      className="bk-root"
      onPointerMove={track}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
    >
      <div style={{ position: 'absolute', inset: 0, perspective: single ? '1800px' : '2500px', perspectiveOrigin: '50% 36%' }}>
        <motion.div ref={rigRef} style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d', y: rigY, scale, rotateX: rotX, rotateZ: rotZ }}>
          {surface}

          <motion.div
            ref={bookRef}
            style={{
              position: 'absolute',
              width: single ? 'var(--pw)' : 'calc(var(--pw) * 2)',
              height: 'var(--ph)',
              left: single ? 'calc(var(--pw) * -0.5)' : 'calc(var(--pw) * -1)',
              top: 'calc(var(--ph) * -0.5)',
              transformStyle: 'preserve-3d',
              x: shiftX,
              z: LIFT,
            }}
          >
            {/* what the book throws on the desk: a close, dark contact and a long soft fall-off away from the light (top left) */}
            <motion.div aria-hidden style={{ position: 'absolute', top: -OV, bottom: -OV, left: rx, right: -OV, transform: `translateZ(${TABLE - 0.3}px)`, borderRadius: 6, boxShadow: '2px 3px 5px rgba(0,0,0,0.85), 16px 26px 38px -2px rgba(0,0,0,0.6), 40px 60px 90px 0 rgba(0,0,0,0.38)', opacity: rightBoard }} />
            {!single && <motion.div aria-hidden style={{ position: 'absolute', top: -OV, bottom: -OV, left: -OV, right: '50%', transform: `translateZ(${TABLE - 0.3}px)`, borderRadius: 6, boxShadow: '2px 3px 5px rgba(0,0,0,0.85), 16px 26px 38px -2px rgba(0,0,0,0.6), 40px 60px 90px 0 rgba(0,0,0,0.38)', opacity: leftBoard }} />}

            {/* the back board and its skirt */}
            <motion.div aria-hidden style={{ position: 'absolute', top: -OV, bottom: -OV, left: rx, right: -OV, background: boardTop, borderRadius: '0 5px 5px 0', boxShadow: boardLine, opacity: rightBoard }} />
            <motion.div aria-hidden style={{ position: 'absolute', top: `calc(100% + ${OV}px)`, height: SLAB, left: rx, right: -OV, transformOrigin: '50% 0', transform: 'rotateX(-90deg)', background: BOARD_EDGE, borderRadius: '0 0 4px 4px', opacity: rightBoard }} />
            <motion.div aria-hidden style={{ position: 'absolute', top: -OV, bottom: -OV, left: `calc(100% + ${OV}px)`, width: SLAB, transformOrigin: '0 50%', transform: 'rotateY(90deg)', background: 'linear-gradient(to right, #2a2b2c, #09090a)', opacity: rightBoard }} />
            {!single && (
              <>
                <motion.div aria-hidden style={{ position: 'absolute', top: -OV, bottom: -OV, left: -OV, right: '50%', background: boardTop, borderRadius: '5px 0 0 5px', boxShadow: boardLine, opacity: leftBoard }} />
                <motion.div aria-hidden style={{ position: 'absolute', top: `calc(100% + ${OV}px)`, height: SLAB, left: -OV, right: '50%', transformOrigin: '50% 0', transform: 'rotateX(-90deg)', background: BOARD_EDGE, borderRadius: '0 0 4px 4px', opacity: leftBoard }} />
                <motion.div aria-hidden style={{ position: 'absolute', top: -OV, bottom: -OV, left: -OV - SLAB, width: SLAB, transformOrigin: '100% 50%', transform: 'rotateY(-90deg)', background: 'linear-gradient(to left, #2a2b2c, #09090a)', opacity: leftBoard }} />
              </>
            )}

            {/* the page blocks: gilt edges seen from the front and from the sides */}
            {!single && <Edge edge="front" left="0%" width="50%" h={leftH} visible={!closed} />}
            <Edge edge="front" left={rx} width={single ? '100%' : '50%'} h={rightH} visible={turned < N} />
            <Edge edge="right" left="100%" width="0" h={rightH} visible={turned < N} />
            <Edge edge="spine" left={rx} width="0" h={Math.max(rightH, 4)} visible={closed || turned < N} />
            {!single && <Edge edge="left" left="0%" width="0" h={leftH} visible={!closed} />}

            {/* the ribbon: it moves with the reading place and is only out of sight once the book is shut on its back */}
            {!lite && <Ribbon single={single} z={BASE + (N - Math.min(Math.max(turned, 1), N)) * DZ + 1.18} visible={turned < N} ph={ph} />}

            {/* the cover's shadow falling on the first page, easing off as the cover lifts */}
            <motion.div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: rx, width: single ? '100%' : '50%', transform: `translateZ(${BASE + (N - 1) * DZ + 1.1}px)`, opacity: coverShade, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.06) 100%)' }} />

            {leaves.map((leaf, i) => (
              <LeafView
                key={i}
                i={i}
                count={N}
                single={single}
                angle={angles[i]}
                prev={i > 0 ? angles[i - 1] : NONE}
                next={i < N - 1 ? angles[i + 1] : NONE}
                leaf={leaf}
                frontLive={i === turned}
                backLive={!single && i === turned - 1}
                near={Math.abs(i - turned) <= (single || lite ? 1 : 2)}
                lite={lite}
              />
            ))}

            {/* the gutter: the pages dip into the spine */}
            {!single && (
              <motion.div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - var(--pw) * 0.09)', width: 'calc(var(--pw) * 0.18)', transform: `translateZ(${BASE + N * DZ + CT + 1.6}px)`, opacity: gutter, pointerEvents: 'none', background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.14) 30%, rgba(0,0,0,0.42) 48%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.42) 52%, rgba(0,0,0,0.14) 70%, transparent 100%)' }} />
            )}

            {/* edge zones: click to turn (the whole cover opens it) */}
            {(closed || turned > 0) && (
              <button type="button" className="bk-zone" aria-label={turned <= 1 ? (closed ? 'Open the book' : 'Close the book') : 'Previous page'} data-cursor-text={turned <= 1 ? 'CLOSE' : 'BACK'} onClick={() => goTo(turnedRef.current - 1)} style={{ ...zone('l'), display: closed ? 'none' : undefined }}>
                <span aria-hidden className="bk-zone-glow" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.14), transparent)' }}>‹</span>
              </button>
            )}
            {turned < N && (
              <button type="button" className="bk-zone" aria-label={closed ? 'Open the book' : 'Next page'} data-cursor-text={closed ? 'OPEN' : 'NEXT'} onClick={() => goTo(turnedRef.current + 1)} style={{ ...zone('r'), ...(closed && !single ? { left: '50%', right: 0, width: 'auto' } : {}) }}>
                <span aria-hidden className="bk-zone-glow" style={{ background: 'linear-gradient(to left, rgba(163,230,53,0.14), transparent)', justifyContent: 'flex-end' }}>›</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .bk-zone .bk-zone-glow { position:absolute; inset:0; display:flex; align-items:center; padding:0 0.5rem; opacity:0; transition:opacity .35s; color:${T.lime}; font-family:${T.mono}; font-size:22px; pointer-events:none; }
        .bk-zone:hover .bk-zone-glow, .bk-zone:focus-visible .bk-zone-glow { opacity:1; }
        @media (hover: none) { .bk-zone .bk-zone-glow { display:none; } }
      `}</style>
    </div>
  );
});

export default Book;
