/**
 * Gallery — each category is a deck of prints you can throw.
 *
 * Left: the categories as a big stacked list (the active one solid, the rest outlined), and under it the quote of
 * the print on top, set large, with a counter. Right: the category's photos as a loose pile of prints, each at its
 * own small tilt. Drag the top print and fling it away (or click it, or press →): it flies off with the speed you
 * gave it, the pile shuffles up, and the thrown one slides back in at the bottom. The top print is in full colour;
 * the ones beneath sit in the lime-toned ribbed glass. Switching category deals a fresh pile.
 *
 * The section is one screen tall whatever the photo count. Data lives in src/data/gallery.ts.
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { GALLERY, type GalleryPhoto } from '../../data/gallery';

const BG = '#0B0B0C';
const TXT = '#EDEBE6';
const DIM = 'rgba(237,235,230,0.5)';
const FAINT = 'rgba(237,235,230,0.28)';
const LINE = 'rgba(237,235,230,0.12)';
const LIME = '#A3E635';
const MONO = "'JetBrains Mono', monospace";
const SYNE = "'Syne', 'Inter Tight', sans-serif";
const SERIF = "'DM Serif Display', serif";
const EXPO = [0.87, 0, 0.13, 1] as const;
const pad = (v: number) => String(v).padStart(2, '0');

// a fixed, hand-feeling scatter for the pile
const TILT = [-4, 3, -2, 5, -6, 2, -3, 4, -1];
const SHIFT = [[0, 0], [14, -8], [-12, 10], [20, 6], [-18, -6], [8, 14], [-6, -14], [16, 12], [-14, 4]];

function Print({ p, depth, onThrow }: { p: GalleryPhoto; depth: number; onThrow: (dir: number) => void }) {
  const top = depth === 0;
  const x = useMotionValue(0);
  const rot = useTransform(x, [-300, 300], [-18, 18]);
  const [out, setOut] = useState<number | null>(null);
  const end = (_: unknown, info: PanInfo) => {
    const v = info.velocity.x, o = info.offset.x;
    if (Math.abs(o) > 120 || Math.abs(v) > 600) {
      const dir = (o || v) > 0 ? 1 : -1;
      setOut(dir);
      setTimeout(() => onThrow(dir), 380);
    }
  };
  const t = TILT[depth % TILT.length];
  const [sx, sy] = SHIFT[depth % SHIFT.length];
  return (
    <motion.div
      drag={top ? 'x' : false}
      dragSnapToOrigin
      dragElastic={0.9}
      onDragEnd={end}
      onTap={() => {
        if (!top) return;
        setOut(1);
        setTimeout(() => onThrow(1), 380);
      }}
      initial={{ opacity: 0, y: 60, rotate: t * 2 }}
      animate={
        out !== null
          ? { x: out * 900, rotate: out * 30, opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } }
          : { opacity: 1, y: sy, x: top ? 0 : sx, rotate: top ? 0 : t, scale: 1 - depth * 0.035, transition: { duration: 0.7, ease: EXPO } }
      }
      style={{ position: 'absolute', inset: 0, zIndex: 50 - depth, x: top ? x : undefined, rotate: top && out === null ? rot : undefined, cursor: top ? 'grab' : 'default', touchAction: 'pan-y' }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
    >
      <div style={{ position: 'absolute', inset: 0, background: '#efece4', padding: '3.2% 3.2% 13%', boxShadow: top ? '0 40px 90px rgba(0,0,0,0.65)' : '0 18px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#151515' }}>
          <img src={p.src} alt={p.where} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${p.focus.x * 100}% ${p.focus.y * 100}%`, filter: top ? 'none' : 'grayscale(1) contrast(1.2) brightness(0.75)', transition: 'filter .6s ease' }} />
          <div style={{ position: 'absolute', inset: 0, background: LIME, mixBlendMode: 'color', opacity: top ? 0 : 0.34, transition: 'opacity .6s ease' }} />
          <div style={{ position: 'absolute', inset: 0, opacity: top ? 0 : 1, transition: 'opacity .6s ease', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.1) 5px, rgba(255,255,255,0.04) 16px, rgba(255,255,255,0.1) 20px)' }} />
        </div>
        {/* the print's handwritten-feeling caption strip */}
        <div style={{ position: 'absolute', left: '4%', right: '4%', bottom: '3.4%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: '#1a1a1a' }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)' }}>{p.where.split(' · ')[0]}</span>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', opacity: 0.6 }}>{p.where.split(' · ')[1] ?? ''}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhotoStrip() {
  const [cat, setCat] = useState(0);
  const [order, setOrder] = useState<number[]>(() => GALLERY[0].photos.map((_, k) => k));
  const [deal, setDeal] = useState(0);
  const photos = GALLERY[cat].photos;
  useEffect(() => {
    setOrder(GALLERY[cat].photos.map((_, k) => k));
    setDeal((d) => d + 1);
  }, [cat]);
  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      const g = document.getElementById('moments')?.getBoundingClientRect();
      if (!g || g.bottom < 0 || g.top > window.innerHeight) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, []);
  const top = photos[order.find((k) => k < photos.length) ?? 0] ?? photos[0];
  // guard: never index past this category's photos (order can lag a render behind a category switch)
  const shown = order.filter((k) => k < photos.length).slice(0, 5);

  return (
    <section id="moments" style={{ position: 'relative', background: BG, color: TXT, minHeight: '100svh', padding: 'clamp(5rem, 9vw, 8rem) clamp(16px, 4vw, 64px) clamp(3rem, 6vw, 5rem)', overflow: 'hidden' }}>
      <div className="gal-wrap">
        {/* left: categories, then the quote of the print on top */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 40 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: DIM, marginBottom: 'clamp(1rem, 2vw, 1.6rem)' }}>
              <span style={{ color: LIME }}>◆</span> Gallery · out in the field
            </div>
            {GALLERY.map((g, k) => {
              const on = k === cat;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setOrder(GALLERY[k].photos.map((_, j) => j));
                    setCat(k);
                  }}
                  style={{ display: 'flex', alignItems: 'baseline', gap: 14, background: 'none', border: 0, padding: '0.1em 0', cursor: 'pointer', minHeight: 0, textAlign: 'left' }}
                >
                  <span
                    style={{
                      fontFamily: SYNE,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      fontSize: 'clamp(2rem, 4vw, 4.4rem)',
                      whiteSpace: 'nowrap',
                      lineHeight: 0.95,
                      letterSpacing: '-0.025em',
                      color: on ? TXT : 'transparent',
                      WebkitTextStroke: on ? '0px transparent' : '1.2px rgba(237,235,230,0.35)',
                      transition: 'color .5s, -webkit-text-stroke-color .5s',
                    }}
                    className={on ? '' : 'hover:[-webkit-text-stroke-color:#A3E635]'}
                  >
                    {g.title}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: on ? LIME : FAINT }}>{pad(g.photos.length)}</span>
                </button>
              );
            })}
          </div>

          <div>
            <div style={{ overflow: 'hidden', minHeight: '2.2em', fontFamily: SYNE, fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={top.src} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.55, ease: EXPO }}>
                  “{top.quote}”
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 18, fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: DIM, borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
              <span>
                <span style={{ color: LIME }}>{pad(photos.indexOf(top) + 1)}</span> / {pad(photos.length)}
              </span>
              <span style={{ flex: 1 }}>{top.where}</span>
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  aria-label={d > 0 ? 'Next photo' : 'Previous photo'}
                  onClick={() => (d > 0 ? next() : prev())}
                  className="hover:bg-[#A3E635] hover:text-black hover:border-[#A3E635] transition-colors duration-300"
                  style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${LINE}`, background: 'transparent', color: TXT, fontFamily: MONO, fontSize: 14, cursor: 'pointer', minHeight: 0 }}
                >
                  {d > 0 ? '→' : '←'}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT }}>Drag the print away · or click it</div>
          </div>
        </div>

        {/* right: the pile */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 'clamp(0px, 2vw, 32px)' }}>
          <div key={deal} style={{ position: 'relative', width: 'min(400px, 78vw, 46vh)', aspectRatio: '4 / 5.2' }}>
            {[...shown].reverse().map((k) => {
              const depth = shown.indexOf(k);
              return <Print key={`${deal}-${photos[k].src}`} p={photos[k]} depth={depth} onThrow={next} />;
            })}
          </div>
        </div>
      </div>
      <style>{`
        .gal-wrap { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 80px); min-height: calc(100svh - clamp(8rem, 15vw, 13rem)); }
        @media (max-width: 860px) { .gal-wrap { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
