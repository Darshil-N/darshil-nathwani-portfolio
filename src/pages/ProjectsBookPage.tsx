/**
 * ProjectsBookPage.tsx — /projects: the project archive as a book lying on a desk.
 *
 * The stage is pinned while you scroll: the book starts shut on the desk, and scrolling raises the camera, lifts the
 * spotlight and opens the cover (scroll back up and it closes again). Once it is open, the index lists the chapters, each
 * chapter opens with its own list, and every entry opens as a pop-up that stands up out of the page.
 * Everything is real DOM (selectable, linkable, readable by crawlers and screen readers); only the page-turn is 3D.
 * The classic list stays at /projects/list.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, motionValue, useMotionValueEvent, useScroll, useTransform, type AnimationPlaybackControls, type MotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Book, { LIFT, SLAB, type BookHandle, type BookLeaf } from '../components/book/Book';
import Popup, { type Kind } from '../components/book/Popup';
import {
  BackCover, ChapterLeft, ChapterRight, Closing, Colophon, Cover, IndexLeft, IndexRight, PAGE_CSS, ProjectDetails, ProjectPlate,
  type ChapterItem, type ChapterView, type ProjectView,
} from '../components/book/pages';
import { T, type Side } from '../components/book/tokens';
import { projects, type Project } from '../data/projects';
import { sound } from '../lib/sound';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSiteReady } from '../lib/siteReady';

const pad2 = (n: number) => String(n).padStart(2, '0');
const TOTAL = projects.length;

/* ── the chapters ── */
const CHAPTER_DEFS: { name: string; blurb: string; pick: (p: Project, i: number) => boolean; kind?: Kind }[] = [
  { name: 'Production', blurb: 'Live systems, built end to end and out in the world.', pick: (_p, i) => i < 5 },
  { name: 'AI & ML', blurb: 'Models, agents and the pipelines around them.', pick: (p, i) => i >= 5 && p.category === 'ai' },
  { name: 'Blockchain', blurb: 'Verifiable identity and credentials, and the apps built around them.', pick: (p, i) => i >= 5 && (p.title.startsWith('Raahi') || p.title.startsWith('Kriti')), kind: 'chain' },
  { name: 'Computer Vision', blurb: 'Cameras, classifiers and the hardware they steer.', pick: (p) => p.category === 'cv' },
  { name: 'C++ Basics', blurb: 'Data structures and small systems, written from scratch.', pick: (p) => p.category === 'dsa' },
];
const KIND_OF: Record<string, Kind> = { ai: 'network', mobile: 'phone', web: 'browser', cv: 'vision', dsa: 'bars', oth: 'network' };

type Entry = { p: Project; num: number; idx: number; chapter: number; rich: boolean; kind: Kind; page?: number };
const ENTRIES: Entry[] = [];
const CHAPTERS = CHAPTER_DEFS.map((d, ci) => {
  const items = projects.map((p, idx) => ({ p, idx })).filter(({ p, idx }) => d.pick(p, idx));
  const entries = items.map(({ p, idx }) => {
    const e: Entry = { p, idx, num: ENTRIES.length + 1, chapter: ci + 1, rich: !!(p.features && p.features.length), kind: d.kind ?? KIND_OF[p.category] ?? 'network' };
    ENTRIES.push(e);
    return e;
  });
  return { ...d, no: ci + 1, entries };
});

// page numbers: 0 cover · 1-2 index · per chapter: opener (2) + two pages for each entry with a write-up · closing (2) · back cover
let cursor = 3;
const CHAPTER_START: number[] = [];
CHAPTERS.forEach((c) => {
  CHAPTER_START.push(cursor);
  cursor += 2;
  c.entries.forEach((e) => {
    if (e.rich) {
      e.page = cursor;
      cursor += 2;
    }
  });
});

const toView = (e: Entry): ProjectView => ({
  idx: e.idx, num: e.num, total: TOTAL, title: e.p.title, category: CHAPTER_DEFS[e.chapter - 1].name, chapterNo: e.chapter, description: e.p.description,
  detailed: e.p.detailedDescription, features: e.p.features, techStack: e.p.techStack, github: e.p.github, liveDemo: e.p.liveDemo, accent: e.p.accentColor, isNew: e.p.isNew, inDevelopment: e.p.inDevelopment,
});

type PageDef = { label: string; render: (side: Side, n: number) => React.ReactNode };

/* ── the desk ──
   Everything here is a static gradient: a leather desk mat with stitching and a title block etched into it, and a few quiet
   things that belong on a developer's desk. They live in the book's own 3D space (on the table plane), so they tilt with
   the camera, and they drift out to the sides as the book opens so the spread keeps the room. */
const U = (k: number) => `calc(var(--ph) * ${k})`;
const MAT_Z = -SLAB - 0.6;
let grainUrl = '';
const grain = () => {
  if (grainUrl || typeof document === 'undefined') return grainUrl;
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    if (!g) return '';
    const d = g.createImageData(128, 128);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() < 0.5 ? 255 : 0;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = Math.random() * (v ? 9 : 26);
    }
    g.putImageData(d, 0, 0);
    grainUrl = `url(${c.toDataURL('image/png')})`;
  } catch {
    grainUrl = '';
  }
  return grainUrl;
};

type ThingProps = { x: number; y: number; w: number; h: number; rot?: number; z?: number; style?: React.CSSProperties; children?: React.ReactNode };
/** a flat thing lying on the desk: centred on (x, y), sizes in units of the page height */
const Thing = ({ x, y, w, h, rot = 0, z = MAT_Z, style, children }: ThingProps) => (
  <div aria-hidden style={{ position: 'absolute', left: U(x - w / 2), top: U(y - h / 2), width: U(w), height: U(h), transform: `translateZ(${z}px) rotateZ(${rot}deg)`, transformStyle: 'preserve-3d', pointerEvents: 'none', ...style }}>
    {children}
  </div>
);
/** the front face of a thing of thickness `t`, standing on the desk */
const Front = ({ t, style }: { t: number; style: React.CSSProperties }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: `calc(100% - ${t}px)`, height: t, transformOrigin: '50% 100%', transform: 'rotateX(-90deg)', ...style }} />
);
const INK = 'rgba(237,235,230,';

/** the sides of a thing of thickness `t` whose top face is the plane it stands on: they hang down to the desk */
const Sides = ({ t, front, right, left }: { t: number; front: string; right: string; left?: string }) => (
  <>
    <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', height: t, transformOrigin: '50% 0', transform: 'rotateX(-90deg)', background: front }} />
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '100%', width: t, transformOrigin: '0 50%', transform: 'rotateY(90deg)', background: right }} />
    <div style={{ position: 'absolute', top: 0, bottom: 0, right: '100%', width: t, transformOrigin: '100% 50%', transform: 'rotateY(-90deg)', background: left ?? right }} />
  </>
);
/** a registration cross, like the ones on the site's grid */
const Cross = ({ x, y }: { x: number; y: number }) => (
  <Thing x={x} y={y} w={0.034} h={0.034} z={MAT_Z - 0.1} style={{ background: `linear-gradient(${INK}0.3), ${INK}0.3)) 50% 0 / 1px 100% no-repeat, linear-gradient(${INK}0.3), ${INK}0.3)) 0 50% / 100% 1px no-repeat` }} />
);

const CLOTH = (noise: string) => `${noise ? noise + ',' : ''}linear-gradient(150deg, #1b1d19 0%, #0f100f 58%, #0a0a0a 100%)`;
const FOIL = `linear-gradient(to bottom, transparent 0 14%, ${T.lime} 14% 16%, transparent 16% 22%, ${T.lime} 22% 23%, transparent 23% 78%, ${T.lime} 78% 79%, transparent 79% 84%, ${T.lime} 84% 86%, transparent 86%)`;

/** a closed volume lying on the desk: cloth top, page-edge front, and a spine with lime foil on the side that faces the room */
function Volume({ x, y, w, h, rot, z, t, noise, spine = 'right' }: { x: number; y: number; w: number; h: number; rot: number; z: number; t: number; noise: string; spine?: 'left' | 'right' }) {
  const spineBg = `${FOIL}, linear-gradient(to ${spine === 'right' ? 'right' : 'left'}, #2a2c28, #121312 55%, #0a0a0a)`;
  const pages = 'linear-gradient(to bottom, #6f7448 0%, #4d5230 35%, #2a2e18 75%, #15180b 100%)';
  return (
    <Thing x={x} y={y} w={w} h={h} rot={rot} z={z + t} style={{ borderRadius: 3, boxShadow: '0 0 16px 4px rgba(0,0,0,0.6)', background: CLOTH(noise) }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 3, boxShadow: `inset 0 0 0 1px ${INK}0.1), inset 0 1px 0 ${INK}0.12)` }} />
      <div style={{ position: 'absolute', top: '10%', bottom: '10%', [spine === 'right' ? 'right' : 'left']: '9%', width: 1, background: `${INK}0.1)` }} />
      <Sides t={t} front={pages} right={spine === 'right' ? spineBg : '#0c0c0c'} left={spine === 'left' ? spineBg : '#0c0c0c'} />
    </Thing>
  );
}

/** a faceted cylinder standing on the desk (a cup, a lamp base): the facets are culled by the camera, so only the near ones draw */
function Cylinder({ x, y, r, h, z, rim, body, top, shadow = 16 }: { x: number; y: number; r: number; h: number; z: number; rim?: string; body: (k: number) => string; top: string; shadow?: number }) {
  const n = 8;
  const R = r * 684; // px, at the nominal page height: close enough for a prop
  const fw = 2 * R * Math.tan(Math.PI / n) + 0.8;
  return (
    <Thing x={x} y={y} w={0.001} h={0.001} z={z} style={{ overflow: 'visible' }}>
      <div style={{ position: 'absolute', left: -R, top: -R, width: 2 * R, height: 2 * R, borderRadius: '50%', boxShadow: `${R * 0.35}px ${R * 0.5}px ${shadow}px ${shadow * 0.15}px rgba(0,0,0,0.62), 0 0 0 1px rgba(0,0,0,0.5)` }} />
      {Array.from({ length: n }, (_, k) => {
        const th = (360 / n) * k;
        return <div key={k} style={{ position: 'absolute', left: -fw / 2, top: -h, width: fw, height: h, transformOrigin: '50% 100%', transform: `rotateZ(${th}deg) translateY(${R}px) rotateX(-90deg)`, background: body(k / n) }} />;
      })}
      <div style={{ position: 'absolute', left: -R, top: -R, width: 2 * R, height: 2 * R, borderRadius: '50%', transform: `translateZ(${h}px)`, background: top, boxShadow: rim }} />
    </Thing>
  );
}

/**
 * How likely this machine is to struggle: 'hard' (software rendering, no WebGL: stay light), 'soft' (few cores, little memory, a
 * phone, an old integrated GPU: start light, but move up to the full scene if it proves smooth), or 'none' (go straight to full).
 */
function deviceTier(): 'hard' | 'soft' | 'none' {
  try {
    const q = new URLSearchParams(location.search).get('lite');
    if (q === '1') return 'hard';
    if (q === '0') return 'none';
    const gl = document.createElement('canvas').getContext('webgl');
    const info = gl?.getExtension('WEBGL_debug_renderer_info');
    const r = info ? String(gl!.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    if (!gl || /swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(r)) return 'hard';
    const n = navigator as Navigator & { deviceMemory?: number };
    if ((n.hardwareConcurrency ?? 8) <= 4 || (n.deviceMemory ?? 8) <= 4 || matchMedia('(pointer: coarse)').matches || /Intel\(R\) (HD|UHD) Graphics [0-9]{3,4}/i.test(r)) return 'soft';
    return 'none';
  } catch {
    return 'hard';
  }
}

/** the light desk: one flat dark surface and a pool of light, nothing else */
function LiteDesk() {
  return <Thing x={0} y={0.04} w={3} h={1.7} z={MAT_Z - 0.4} style={{ borderRadius: 18, background: 'radial-gradient(40% 45% at 40% 34%, rgba(237,235,230,0.07), transparent 70%), linear-gradient(135deg, #151716, #0c0d0d 60%, #090909)' }} />;
}

function Desk({ open, single }: { open: MotionValue<number>; single: boolean }) {
  const noise = useMemo(() => grain(), []);
  const lx = useTransform(open, (o) => U(-0.42 * o));
  const rx = useTransform(open, (o) => U(0.38 * o));
  const layer = (n: string) => (n ? `${n},` : '');
  const pwK = single ? 0.7 : 0.75; // the closed book's width, in page heights
  const volTop = -SLAB + LIFT; // the book stands on a second volume: its top is where the book's underside is
  // a facet of the cup is lit from the top left: a smooth ramp round the cylinder
  const ceramic = (k: number) => `linear-gradient(to right, hsl(210 6% ${8 + 20 * Math.max(0, Math.cos((k - 0.62) * Math.PI * 2)) ** 1.5}%), hsl(210 6% ${8 + 20 * Math.max(0, Math.cos((k - 0.58) * Math.PI * 2)) ** 1.5}%))`;
  const metal = (k: number) => `linear-gradient(to bottom, hsl(220 4% ${14 + 26 * Math.max(0, Math.cos((k - 0.6) * Math.PI * 2)) ** 2}%), hsl(220 4% 7%))`;
  return (
    <>
      {/* the mat: matte black, stitched at the edge, a debossed monogram, the lamp's pool of light on it, and a faint long reflection */}
      <Thing x={0} y={0.04} w={single ? 1.9 : 2.8} h={1.6} z={MAT_Z - 0.4} style={{ borderRadius: 18, background: `${layer(noise)}radial-gradient(34% 40% at 28% 30%, ${INK}0.11), transparent 70%), linear-gradient(112deg, transparent 34%, ${INK}0.03) 44%, transparent 54%), radial-gradient(70% 70% at 30% 26%, ${INK}0.06), transparent 72%), linear-gradient(135deg, #171918 0%, #0e0f0f 52%, #0a0a0a 100%)`, boxShadow: `0 0 0 1px ${INK}0.07), 0 14px 26px rgba(0,0,0,0.6), inset 0 1px 0 ${INK}0.08)` }}>
        <div style={{ position: 'absolute', inset: 16, border: `1px dashed ${INK}0.16)`, borderRadius: 10 }} />
        {/* the debossed monogram, bottom right: a pressed mark, lit on one edge */}
        <div style={{ position: 'absolute', right: 52, bottom: 44, width: 64, height: 64, borderRadius: 14, border: `1px solid ${INK}0.07)`, boxShadow: `inset 1px 1px 2px rgba(0,0,0,0.7), 1px 1px 0 ${INK}0.08)`, display: 'grid', placeItems: 'center', fontFamily: T.sans, fontWeight: 800, fontSize: 24, letterSpacing: '-0.06em', color: `${INK}0.1)`, textShadow: `-1px -1px 0 rgba(0,0,0,0.8), 1px 1px 0 ${INK}0.1)` }}>DN</div>
        {/* a title block, etched in hairline */}
        <div style={{ position: 'absolute', left: 42, bottom: 36, fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase', lineHeight: 2.1, color: `${INK}0.28)`, whiteSpace: 'nowrap' }}>
          <div style={{ color: 'rgba(163,230,53,0.5)' }}>Sheet 01 / 05</div>
          <div>Proof of Work — Vol. 01</div>
          <div>Darshil Nathwani · 2026</div>
        </div>
      </Thing>

      <Cross x={-0.66} y={-0.64} />
      <Cross x={0.66} y={-0.64} />
      <Cross x={-0.66} y={0.68} />
      <Cross x={0.66} y={0.68} />

      {/* the volume the book stands on: a sliver of it shows past the edges */}
      <Thing x={0.03} y={0.014} w={pwK + 0.04} h={1.06} rot={2.2} z={volTop} style={{ borderRadius: '2px 6px 6px 2px', boxShadow: '0 0 14px 4px rgba(0,0,0,0.6)', background: CLOTH(noise) }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: `inset 0 0 0 1px ${INK}0.09), inset 0 1px 0 ${INK}0.1)` }} />
        <Sides t={volTop - MAT_Z} front={`linear-gradient(${T.lime}, ${T.lime}) 0 0 / 100% 1px no-repeat, linear-gradient(to bottom, #3a4219, #181c0b 60%, #0c0e06)`} right="linear-gradient(to right, #1d1e1c, #0a0a0a)" />
      </Thing>

      {!single ? (
        <>
          {/* two more volumes, stacked at an angle, spines out to the room */}
          <motion.div aria-hidden style={{ x: lx, position: 'absolute', transformStyle: 'preserve-3d' }}>
            <Volume x={-0.76} y={-0.04} w={0.46} h={0.62} rot={-9} z={MAT_Z} t={25} noise={noise} />
            <Volume x={-0.75} y={-0.06} w={0.41} h={0.56} rot={-2} z={MAT_Z + 25} t={15} noise={noise} />
            {/* the lamp: its base enters from the corner, and its light pools on the mat */}
            <Cylinder x={-1.22} y={-0.7} r={0.19} h={16} z={MAT_Z} top="radial-gradient(circle at 36% 30%, #3b3d3f, #17181a 70%)" rim={`inset 0 0 0 1px ${INK}0.16), 0 0 0 2px rgba(163,230,53,0.0)`} body={metal} shadow={22} />
          </motion.div>

          {/* a slim machined tray with a few index cards */}
          <motion.div aria-hidden style={{ x: rx, position: 'absolute', transformStyle: 'preserve-3d' }}>
            <Thing x={0.74} y={0.4} w={0.36} h={0.23} rot={-5} z={MAT_Z + 6} style={{ borderRadius: 4, boxShadow: '0 0 12px 3px rgba(0,0,0,0.6)', background: 'linear-gradient(135deg, #2b2d2f 0%, #1a1b1d 46%, #121314 100%)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 4, boxShadow: `inset 0 0 0 1px ${INK}0.14), inset 1px 1px 0 ${INK}0.18)` }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: T.lime, opacity: 0.8, borderRadius: '4px 4px 0 0' }} />
              {[{ r: -2.5, dx: -6, dy: 4 }, { r: 1.5, dx: 4, dy: -2 }, { r: -0.5, dx: 0, dy: 0 }].map((c, i) => (
                <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: '78%', height: '70%', margin: '-35% 0 0 -39%', transform: `translateZ(${1 + i * 1.6}px) translate(${c.dx}px, ${c.dy}px) rotateZ(${c.r}deg)`, background: i === 2 ? `linear-gradient(145deg, #1d1f1c, #121312)` : '#151614', boxShadow: `0 0 0 1px ${INK}0.12), 0 1px 3px rgba(0,0,0,0.7)`, borderRadius: 2 }}>
                  {i === 2 && (
                    <>
                      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: T.lime }} />
                      <div style={{ position: 'absolute', left: 12, top: 14, fontFamily: T.mono, fontSize: 9, letterSpacing: '0.3em', color: `${INK}0.5)` }}>NO. 01</div>
                      <div style={{ position: 'absolute', left: 12, right: 12, top: 36, height: 1, background: `${INK}0.14)` }} />
                      <div style={{ position: 'absolute', left: 12, right: 40, top: 48, height: 1, background: `${INK}0.1)` }} />
                    </>
                  )}
                </div>
              ))}
              <Sides t={6} front="linear-gradient(to bottom, #6a6d70, #1e1f21)" right="linear-gradient(to right, #4a4c4f, #151617)" />
            </Thing>

            {/* a small dark ceramic cup */}
            <Cylinder x={0.8} y={-0.46} r={0.058} h={62} z={MAT_Z} top="radial-gradient(circle at 40% 34%, #0a0a0b 0 56%, #3a3d40 58% 64%, #1b1c1e 66%)" rim={`inset 0 0 0 1px ${INK}0.12)`} body={ceramic} shadow={26} />
          </motion.div>
        </>
      ) : (
        <>
          <Volume x={-0.06} y={0.84} w={0.56} h={0.4} rot={4} z={MAT_Z} t={20} noise={noise} spine="left" />
          <Cylinder x={0.34} y={-0.7} r={0.07} h={56} z={MAT_Z} top="radial-gradient(circle at 40% 34%, #0a0a0b 0 56%, #3a3d40 58% 64%, #1b1c1e 66%)" rim={`inset 0 0 0 1px ${INK}0.12)`} body={ceramic} shadow={24} />
        </>
      )}
    </>
  );
}

/* the desk behind everything: one soft key light from the top left over a dark, matte surface that sinks away at the edges */
const BACKDROP = `radial-gradient(70% 62% at 34% 30%, rgba(237,235,230,0.085), transparent 70%), radial-gradient(90% 80% at 62% 78%, rgba(163,230,53,0.025), transparent 70%), linear-gradient(180deg, #0b0b0c 0%, #101112 46%, #0a0a0b 100%)`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function ProjectsBookPage() {
  const wrap = useRef<HTMLDivElement>(null);
  const book = useRef<BookHandle>(null);
  const ready = useSiteReady();
  const single = !useMediaQuery('(min-width: 900px)');
  // Weak machines get a lighter scene; strong ones get everything. Wait until the loading screen has finished and the
  // reveal has settled before measuring frame times so startup/loader jank never hides the desk props on refresh.
  const tier = useMemo(deviceTier, []);
  const [lite, setLite] = useState(tier !== 'none');
  const locked = useRef(tier === 'hard');
  useEffect(() => {
    if (locked.current || !ready) return;
    let raf = 0, last = 0, slow = 0, n = 0;
    const window_ = lite ? 3500 : 6000;
    const start = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (t: number) => {
        if (last && !document.hidden) {
          const dt = t - last;
          if (dt < 250) {
            if (dt > 30) slow++;
            n++;
          }
        }
        last = t;
        if (t - t0 > window_) {
          if (lite && n > 40 && slow / n < 0.04) setLite(false); // smooth in the light scene: go full
          else if (!lite && n > 30 && slow / n > 0.18) { locked.current = true; setLite(true); } // struggling: back to light, for good
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 1600);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [lite, ready]);
  const [pop, setPop] = useState<number | null>(null); // index into ENTRIES
  // the site's film-grain overlay repaints the whole screen every few frames; under a 3D scene it is pure cost
  useEffect(() => {
    document.documentElement.classList.add('no-grain');
    return () => document.documentElement.classList.remove('no-grain');
  }, []);

  /* ── scroll is the one source of truth ──
     Scrolling decides which spread the book should be on (one modest gesture = one spread); the book then turns there on its
     own clock, so a turn is calm however hard the wheel was pushed. `u` is that animated position, in leaves:
     0 = shut on its cover, k = k leaves turned, N = shut on its back cover. */
  const u = useMemo(() => motionValue(0), []);
  const jumpRef = useRef<(t: number) => void>(() => {});
  const requestClose = useCallback(() => jumpRef.current(0), []);
  const { scrollY } = useScroll();
  const hint = useTransform(scrollY, [0, 140], [1, 0]);
  const [hinting, setHinting] = useState(true);
  useMotionValueEvent(scrollY, 'change', (v) => setHinting((h) => (h === v < 180 ? h : v < 180)));

  // where we are, kept in a mode-independent form (the left-hand page; 0 = cover) so a resize doesn't lose your place
  const place = useRef(0);
  const [turned, setTurned] = useState(0);
  const onTurn = useCallback(
    (t: number) => {
      place.current = single ? t : t === 0 ? 0 : 2 * t - 1;
      setTurned(t);
    },
    [single],
  );
  const goPage = useCallback((page: number) => book.current?.goTo(single ? page : Math.ceil(page / 2)), [single]);
  const popOpen = useCallback((entryIdx: number) => {
    sound.playChime?.();
    setPop(entryIdx);
  }, []);

  /* ── the pages ── */
  const pages = useMemo<PageDef[]>(() => {
    const chapterViews: ChapterView[] = CHAPTERS.map((c, k) => ({
      no: c.no, name: c.name, blurb: c.blurb, count: c.entries.length, names: c.entries.map((e) => e.p.shortTitle ?? e.p.title), page: CHAPTER_START[k], onOpen: () => goPage(CHAPTER_START[k]),
    }));
    const facts = {
      total: TOTAL,
      live: projects.filter((p) => p.liveDemo).length,
      code: projects.filter((p) => p.github).length,
      writeups: ENTRIES.filter((e) => e.rich).length,
    };

    const list: PageDef[] = [
      { label: 'Cover', render: () => <Cover count={TOTAL} /> },
      { label: 'Index', render: (s, n) => <IndexLeft side={s} n={n} chapters={chapterViews} total={TOTAL} /> },
      { label: 'Index', render: (s, n) => <IndexRight side={s} n={n} chapters={chapterViews} facts={facts} onStart={() => goPage(CHAPTER_START[0])} /> },
    ];
    CHAPTERS.forEach((c, k) => {
      const view = chapterViews[k];
      const items: ChapterItem[] = c.entries.map((e) => ({
        num: e.num, title: e.p.title, description: e.p.description, techStack: e.p.techStack, page: e.page, onOpen: () => (e.page ? goPage(e.page) : popOpen(ENTRIES.indexOf(e))),
      }));
      list.push({ label: `Chapter ${pad2(c.no)} — ${c.name}`, render: (s, n) => <ChapterLeft side={s} n={n} c={view} /> });
      list.push({ label: `Chapter ${pad2(c.no)} — ${c.name}`, render: (s, n) => <ChapterRight side={s} n={n} items={items} /> });
      c.entries.forEach((e) => {
        if (!e.rich) return;
        const v = toView(e);
        const label = `${pad2(e.num)} — ${e.p.title}`;
        const at = ENTRIES.indexOf(e);
        list.push({ label, render: (s, n) => <ProjectPlate side={s} n={n} p={v} onOpen={() => popOpen(at)} /> });
        list.push({ label, render: (s, n) => <ProjectDetails side={s} n={n} p={v} onOpen={() => popOpen(at)} /> });
      });
    });
    list.push({ label: 'End of volume', render: (s, n) => <Closing side={s} n={n} count={TOTAL} onRestart={() => requestClose()} /> });
    list.push({ label: 'Colophon', render: (s, n) => <Colophon side={s} n={n} /> });
    list.push({ label: 'Back cover', render: () => <BackCover /> });
    return list;
  }, [goPage, popOpen, requestClose]);

  // leaves: two pages to a sheet on a wide screen, one on a phone
  const leaves = useMemo<BookLeaf[]>(() => {
    if (single) return pages.map((p, i) => ({ front: p.render('single', i), back: <div style={{ position: 'absolute', inset: 0, background: '#0C0C0E' }} /> }));
    const out: BookLeaf[] = [];
    for (let i = 0; i < pages.length; i += 2) out.push({ front: pages[i].render('right', i), back: pages[i + 1].render('left', i + 1) });
    return out;
  }, [pages, single]);
  const N = leaves.length;
  const MAXU = single ? N - 1 : N; // a phone ends on the back cover page itself; the two-page book shuts onto it

  /* ── the scroll layout: one short stretch of scroll per spread ── */
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight));
  useEffect(() => {
    const f = () => setVh((p) => (Math.abs(window.innerHeight - p) > 120 ? window.innerHeight : p));
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const per = (single ? 0.1 : 0.13) * vh; // ~13svh a spread (about one wheel notch), ~10svh a phone page
  const hold = 0.45 * vh; // the shut book rests a moment before the page lets go
  const range = per * MAXU + hold;

  const popRef = useRef(pop);
  popRef.current = pop;
  const snapTimer = useRef(0);
  const goal = useRef(0); // the spread the scroll position asks for
  const run = useRef<AnimationPlaybackControls | null>(null);
  const navTo = useRef<number | null>(null); // while an explicit jump is scrolling, scroll events don't re-aim
  const navTimer = useRef(0);
  const wrapTop = () => (wrap.current ? wrap.current.getBoundingClientRect().top + window.scrollY : 0);

  // turn the book to `t` on its own clock: a soft start and a long soft settle, a few more leaves riffling a little faster
  const turnTo = (t: number) => {
    goal.current = t;
    const from = u.get();
    const steps = Math.abs(t - from);
    if (steps < 0.001) return;
    const busy = !!run.current && run.current.time > 0 && run.current.time < (run.current.duration || 0);
    run.current?.stop();
    const dur = Math.min(2.8, 1.25 + 0.2 * Math.max(0, steps - 1) + (t === 0 || t === MAXU || from < 1 || from > MAXU - 1 ? 0.25 : 0));
    run.current = animate(u, t, { duration: dur, ease: busy ? [0.22, 0.5, 0.2, 1] : [0.45, 0.02, 0.16, 1] });
  };
  useEffect(() => () => run.current?.stop(), []);
  // the page count differs between the one-page and two-page layouts: keep the position in range when it switches
  useEffect(() => {
    if (u.get() > MAXU) {
      run.current?.stop();
      u.set(MAXU);
      goal.current = MAXU;
    }
  }, [MAXU, u]);

  jumpRef.current = (t: number) => {
    const to = Math.min(Math.max(t, 0), MAXU);
    navTo.current = to;
    window.clearTimeout(navTimer.current);
    navTimer.current = window.setTimeout(() => (navTo.current = null), 2600);
    turnTo(to);
    window.scrollTo({ top: wrapTop() + to * per, behavior: 'smooth' });
  };
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY - wrapTop();
      if (navTo.current !== null) {
        if (Math.abs(s - navTo.current * per) < 4) navTo.current = null;
        return;
      }
      // the spread the scroll position is nearest to, with a little hysteresis so it doesn't flutter on the boundary
      const want = Math.min(MAXU, Math.max(0, s / per));
      if (Math.abs(want - goal.current) >= 0.5) turnTo(Math.round(want));
      // when the scrolling stops, settle on that spread so it always rests flat and legible
      window.clearTimeout(snapTimer.current);
      snapTimer.current = window.setTimeout(() => {
        if (popRef.current !== null) return;
        const s2 = window.scrollY - wrapTop();
        if (s2 < 0 || s2 > range - hold * 0.5 - 1 || s2 >= MAXU * per) return; // in the footer's run-up, leave it alone
        const t = goal.current;
        if (Math.abs(s2 - t * per) > 3) window.scrollTo({ top: wrapTop() + t * per, behavior: 'smooth' });
      }, 150);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(snapTimer.current);
      window.clearTimeout(navTimer.current);
    };
  }, [per, MAXU, range]); // eslint-disable-line react-hooks/exhaustive-deps

  // what the desk and the controls need to know, derived from the smoothed position
  const reading = useMemo(() => motionValue(0), []); // 1 while the book is open, 0 when it is shut (either way)
  const chrome = useMemo(() => motionValue(0), []);
  const derive = (v: number) => {
    const o = clamp01(v);
    const b = single ? 0 : clamp01(v - (N - 1));
    reading.set(smooth(o) * (1 - smooth(b)));
    chrome.set(clamp01((v - 0.6) / 0.4) * (single ? 1 : 1 - clamp01((v - (N - 1.2)) / 0.8)));
  };
  useMotionValueEvent(u, 'change', derive);
  useEffect(() => derive(u.get()), [N]); // eslint-disable-line react-hooks/exhaustive-deps

  const label = turned === 0 ? 'Scroll to open' : single ? pages[turned]?.label : turned >= N ? pages[pages.length - 1].label : pages[2 * turned - 1].label;

  /* ── layout ── */
  const sizes = (single
    ? { '--ph': 'min(70svh, calc((100vw - 40px) / 0.7), 780px)', '--pw': 'calc(var(--ph) * 0.7)' }
    : { '--ph': 'min(76svh, calc((100vw - 200px) / 1.5), 920px)', '--pw': 'calc(var(--ph) * 0.75)' }) as React.CSSProperties;


  const popEntry = pop !== null ? ENTRIES[pop] : null;
  const step = (d: number) => setPop((i) => (i === null ? i : (i + d + TOTAL) % TOTAL));

  const circle: React.CSSProperties = { width: 40, height: 40, borderRadius: '50%', border: `1px solid ${T.line}`, color: T.ink, display: 'grid', placeItems: 'center', background: 'rgba(10,10,12,0.6)', cursor: 'pointer', minHeight: 0, transition: 'background .3s, border-color .3s, color .3s' };

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <CustomCursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, backgroundColor: T.bg }}>
        {/* the pinned stage: 100svh to look at, plus the scroll that opens the book */}
        <div ref={wrap} style={{ height: `calc(100svh + ${Math.round(range)}px)`, position: 'relative' }}>
          <section
            className={lite ? "bk-section bk-lite" : "bk-section"}
            style={{
              ...sizes,
              position: 'sticky',
              top: 0,
              height: '100svh',
              overflow: 'hidden',
              color: T.ink,
              background: BACKDROP,
            }}
          >
            <style>{PAGE_CSS}</style>

            <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1.4, delay: 0.1 }} style={{ position: 'absolute', inset: 0 }}>
              <Book ref={book} key={single ? 'single' : 'spread'} leaves={leaves} single={single} u={u} lite={lite} surface={lite ? <LiteDesk /> : <Desk open={reading} single={single} />} keys={pop === null} onTurn={onTurn} onGoTo={(t) => jumpRef.current(t)} />
            </motion.div>

            {/* the room's edge: the light falls off towards the corners, the far side of the desk sinks into the dark */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(5,5,6,0.85) 0%, rgba(5,5,6,0) 22%), radial-gradient(125% 105% at 50% 48%, transparent 52%, rgba(3,3,4,0.72) 100%)' }} />
            {/* the invitation */}
            {hinting && <motion.div style={{ opacity: hint, position: 'absolute', left: 0, right: 0, bottom: 'clamp(28px, 6svh, 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, pointerEvents: 'none', fontFamily: T.mono, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.dim }}>
              <span>
                <span style={{ color: T.lime }}>◆</span> Scroll to open
              </span>
              <span style={{ position: 'relative', width: 1, height: 44, background: T.line, overflow: 'hidden' }}>
                <span style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 16, background: T.lime, animation: 'bk-drop 2s cubic-bezier(.65,0,.35,1) infinite' }} />
              </span>
            </motion.div>}

            {/* controls, once it is open */}
            <motion.div style={{ opacity: chrome, position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 'clamp(14px, 3.4svh, 30px)', width: single ? 'calc(100% - 32px)' : 'min(760px, calc(100% - 60px))', pointerEvents: turned === 0 || (!single && turned >= N) ? 'none' : 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button type="button" aria-label="Previous page" onClick={() => book.current?.prev()} className="hover:!bg-[#A3E635] hover:!border-[#A3E635] hover:!text-black" style={circle}>
                  <ArrowLeft size={15} />
                </button>
                <button type="button" aria-label="Next page" disabled={turned >= MAXU} onClick={() => book.current?.next()} className="hover:!bg-[#A3E635] hover:!border-[#A3E635] hover:!text-black" style={{ ...circle, opacity: turned >= MAXU ? 0.35 : 1 }}>
                  <ArrowRight size={15} />
                </button>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  <span style={{ color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
                  <span style={{ color: T.faint, whiteSpace: 'nowrap' }}>{pad2(turned)} / {pad2(N)}</span>
                </div>
              </div>
              <div style={{ position: 'relative', height: 1, background: T.line, marginTop: 12 }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(turned / N) * 100}%`, background: T.lime, transition: 'width .9s cubic-bezier(.65,0,.35,1)' }} />
              </div>
            </motion.div>

            <style>{`
              @keyframes bk-drop { 0% { transform: translateY(-16px) } 100% { transform: translateY(44px) } }
            `}</style>
          </section>
        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {popEntry && (
          <Popup
            key="pop"
            project={popEntry.p}
            meta={{ num: popEntry.num, total: TOTAL, chapterNo: popEntry.chapter, chapterName: CHAPTER_DEFS[popEntry.chapter - 1].name, kind: popEntry.kind }}
            onClose={() => setPop(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
