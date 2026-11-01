/**
 * PhotoWipe.tsx — the hero's photo card.
 *
 * One card of photos in lime-toned monochrome behind ribbed-glass stripes. To change photo, a
 * lime bar sweeps across the card (the same motion as the loading screen), covers it, and pulls
 * off the other side to reveal the next one. With `clean` on (the cursor is over the card) the
 * tint and the stripes fade away so the photo can be seen as it is.
 */

import { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';

const E = [0.76, 0, 0.24, 1] as const;

export interface GlassPhoto {
  src: string;
  /** which part of the photo sits in the frame (like object-position), 0–1 */
  focus: { x: number; y: number };
  /** push the picture to the right by this fraction of the card (zooms in a little so no gap opens on the left) */
  shift?: number;
}

/** A photo in lime-toned monochrome, with ribbed-glass stripes over it. `clean` shows it as it is. */
function GlassImg({ photo, clean }: { photo: GlassPhoto; clean: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src={photo.src}
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `${photo.focus.x * 100}% ${photo.focus.y * 100}%`,
          transform: photo.shift ? `translateX(${photo.shift * 100}%) scale(${1 + photo.shift * 2})` : undefined,
          transformOrigin: '0% 50%',
          filter: clean ? 'grayscale(0) contrast(1.02) brightness(0.96)' : 'grayscale(1) contrast(1.25) brightness(0.7)',
          transition: 'filter .7s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: '#A3E635', mixBlendMode: 'color', opacity: clean ? 0 : 0.34, transition: 'opacity .7s ease' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: clean ? 0 : 1,
          transition: 'opacity .7s ease',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.12) 5px, rgba(255,255,255,0.04) 16px, rgba(255,255,255,0.1) 20px)',
        }}
      />
    </div>
  );
}

const CAPTION: React.CSSProperties = {
  fontFamily: "'Inter Tight', sans-serif",
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '-0.04em',
  lineHeight: 1,
  fontSize: 'clamp(1.7rem, 3.2vw, 3.6rem)',
  whiteSpace: 'nowrap',
};

export interface PhotoCaption {
  /** the bold line */
  title: string;
  /** the small line under it: what and where */
  sub: string;
}

/** A caption: the bold line, and under it a small mono line saying what and where */
function CaptionBlock({ c, color, shadow }: { c: PhotoCaption; color: string; shadow?: string }) {
  return (
    <div style={{ color }}>
      <div style={{ ...CAPTION, textShadow: shadow }}>{c.title}</div>
      <div
        style={{
          marginTop: '0.75rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(9px, 0.75vw, 11px)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          opacity: 0.78,
          textShadow: shadow,
        }}
      >
        {c.sub}
      </div>
    </div>
  );
}

export default function PhotoWipe({
  photos,
  index,
  clean,
  captions,
  captionClass,
}: {
  photos: GlassPhoto[];
  index: number;
  clean: boolean;
  /** one caption per photo. It rides the lime bar in dark type, then the bar leaves and it stays, in white, in the same place */
  captions?: PhotoCaption[];
  /** where the caption sits in the card (Tailwind position classes) */
  captionClass?: string;
}) {
  const [shown, setShown] = useState(index);
  const w = useMotionValue(0); // 0 → 1: the bar grows across; 1 → 2: it slides off the other side
  const clip = useTransform(w, (v) => (v <= 1 ? `inset(0 ${100 - v * 100}% 0 0)` : `inset(0 0 0 ${(v - 1) * 100}%)`));
  const first = useRef(true);

  // load every photo up front so none of them pops in when the bar uncovers it
  useEffect(() => {
    photos.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }, [photos]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    w.set(0);
    const swap = setTimeout(() => setShown(index), 480);
    const run = animate(w, [0, 1, 1, 2], { duration: 1.05, times: [0, 0.46, 0.54, 1], ease: E });
    return () => {
      clearTimeout(swap);
      run.stop();
    };
  }, [index, w]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <GlassImg photo={photos[shown]} clean={clean} />

      {/* the caption that stays: white, in place once the bar has gone (it is swapped while the bar covers it) */}
      {captions && (
        <div className={captionClass} style={{ position: 'absolute', zIndex: 2, pointerEvents: 'none' }}>
          <CaptionBlock c={captions[shown]} color="#F8FAFC" shadow="0 2px 24px rgba(0,0,0,0.65)" />
        </div>
      )}

      <motion.div aria-hidden style={{ position: 'absolute', inset: 0, background: '#A3E635', clipPath: clip, zIndex: 2 }}>
        {/* the new caption rises onto the bar in dark type, exactly where the white one will be */}
        {captions && (
          <div className={captionClass} style={{ position: 'absolute', overflow: 'hidden' }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-105%' }}
                transition={{ duration: 0.55, delay: 0.1, ease: E }}
              >
                <CaptionBlock c={captions[index]} color="#0C0C0E" />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
