/**
 * Hero.tsx — Awwwards-tier hero section.
 *
 * Design language: Paul Kalkbrenner × Componine × Art Yakushev
 * ─ Color: #0C0C0E base / #F8FAFC text / #A3E635 lime accent
 * ─ Type: Inter Tight 900 — massive, tracking-tight, clip-reveal
 * ─ Layout: Full-width editorial — text fills left 62%, BW photo bleeds right edge
 * ─ Animations: every line slides up from y:110% through overflow:hidden clip
 * ─ Marquee: scrolling ticker strip above footer bar
 * ─ Native cursor restored (cursor: none removed)
 */

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';
import { sound } from '../lib/sound';
import { useSiteReady } from '../lib/siteReady';
import { useMediaQuery } from '../hooks/useMediaQuery';
import KineticName from './KineticName';
import PhotoWipe, { type GlassPhoto } from './PhotoWipe';
import LimeHandoff, { HANDOFF_LANDS_AT } from './LimeHandoff';
import DecryptText from './DecryptText';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

/** One number that rolls up when it changes, like an odometer */
function Roll({ value }: { value: string }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', height: '1.25em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{ display: 'inline-block' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const AUTOPLAY_MS = 5200;

// The photo card's left edge is cut at an angle and followed by a lime band that carries the counter.
const SLANT_INDENT = 14; // % of the card's width the top of the cut is indented by
const EDGE_CLIP = `polygon(${SLANT_INDENT}% 0%, 100% 0%, 100% 100%, 0% 100%)`;
const BAND_TEXT = 'Proof, not promises';
// The caption and counter sit a fixed gap to the right of the band, measured where they are: roughly 72% of the way
// down, where the slanted cut has moved 28% of the way back out of its indent. Band width 46px + gap 30px.
// (written out in full on purpose: Tailwind only generates classes it can find as whole strings; 3.9% = SLANT_INDENT x 0.28)
const LEFT = 'lg:left-[calc(3.9%+76px)]';

/** Snappy premium ease — matches Awwwards studios */
const E = [0.76, 0, 0.24, 1] as const;

/** Ticker items for the marquee strip */
const TICKER = [
  'Software Engineer',
  'Mobile App Developer',
  'Researcher',
  'Freelance Developer',
  'Full-Stack Developer',
  'AI Engineer',
  'Software Engineer',
  'Mobile App Developer',
  'Researcher',
  'Freelance Developer',
  'Full-Stack Developer',
  'AI Engineer',
  
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/**
 * ClipLine: wraps children in an overflow:hidden parent
 * so the motion.div slides up into view — Awwwards standard.
 */
function ClipLine({
  children,
  delay,
  className,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        className={className}
        style={style}
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Seamless horizontal marquee via CSS animation (no JS layout jank) */
function MarqueeTicker() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="hero-ticker"
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
              whiteSpace: 'nowrap',
              padding: '0 2.6rem',
              userSelect: 'none',
            }}
          >
            {item}
            <span style={{ color: '#A3E635', marginLeft: '2.6rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */

// `face` is where the face is in the photo and `aspect` its width / height; the card works out the rest so every face
// lands in the same spot. `zoom` brings in the full-body shots. `caption` is the bold line (under ~20 characters so it
// fits on one line) and `sub` says what and where.
const GLASS_PHOTOS: (GlassPhoto & { caption: string; sub: string })[] = [
  { src: '/Images/darshil.jpg', face: { x: 0.57, y: 0.4 }, aspect: 0.75, zoom: 1.2, caption: "Don't drop the mic.", sub: 'Nasiko Hackathon · Microsoft office' },
  { src: '/Images/mixer.jpg', face: { x: 0.6, y: 0.26 }, aspect: 1.778, caption: 'Ideas, out loud.', sub: 'Devfolio Student Mixer' },
  { src: '/Images/darshil2.jpg', face: { x: 0.25, y: 0.37 }, aspect: 0.75, zoom: 1.9, caption: 'Explain it simply.', sub: 'IEEE TENCON 2026 · Poster session' },
  { src: '/Images/deepmind.jpg', face: { x: 0.5, y: 0.42 }, aspect: 1.501, zoom: 1.2, caption: 'Forty tabs. One bug.', sub: 'Google DeepMind Hackathon' },
  { src: '/Images/judges.jpg', face: { x: 0.38, y: 0.44 }, aspect: 1.5, zoom: 1.4, caption: 'Five minutes. Go.', sub: 'HackMan V8 · Pitching to the judges' },
  { src: '/Images/darshil1.jpg', face: { x: 0.25, y: 0.37 }, aspect: 0.75, zoom: 1.9, caption: 'Hm. Good question.', sub: 'IEEE TENCON 2026 · Poster session' },
  { src: '/Images/darshil3.jpg', face: { x: 0.17, y: 0.39 }, aspect: 0.75, zoom: 2.3, caption: 'Poster duty.', sub: 'IEEE TENCON 2026' },
  { src: '/Images/cisco.jpg', face: { x: 0.64, y: 0.5 }, aspect: 0.75, zoom: 2, caption: 'Meet the packets.', sub: 'Cisco · Mega Industrial Visit 2026' },
  { src: '/Images/google.jpg', face: { x: 0.5, y: 0.54 }, aspect: 0.75, zoom: 2, caption: 'Agents, assemble.', sub: 'Google Kyoto · Agent Premier League' },
];
const CAPTIONS = GLASS_PHOTOS.map((p) => ({ title: p.caption, sub: p.sub }));

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const siteReady = useSiteReady();
  const heroRef = useRef<HTMLElement>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  // On a fresh page load the loading screen's lime panel shrinks into the D and the N; the entrance waits for it.
  const [panel, setPanel] = useState(!siteReady);
  const lag = useRef(siteReady ? 0 : HANDOFF_LANDS_AT - 0.2).current;

  const [paused, setPaused] = useState(false);
  const go = (dir: 1 | -1) => setPhotoIndex((i) => (i + dir + GLASS_PHOTOS.length) % GLASS_PHOTOS.length);
  useEffect(() => {
    // keeps running while you hover (hover only clears the tint)
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [photoIndex]);

  const phoneLayout = useMediaQuery('(max-width: 1023px)');
  // the band's text leans to match the angled cut, which depends on the card's size
  const [slantDeg, setSlantDeg] = useState(5);
  useEffect(() => {
    const fit = () => setSlantDeg((Math.atan((SLANT_INDENT / 100) * 0.44 * window.innerWidth / window.innerHeight) * 180) / Math.PI);
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  /* ── Subtle parallax on mouse move (photo layer only) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const smY = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const photoX = useTransform(smX, [-700, 700], [-16, 16]);
  const photoY = useTransform(smY, [-500, 500], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* ── Actions ── */
  const copyEmail = () => {
    navigator.clipboard.writeText('darshilnathwani@gmail.com');
    sound.playChime?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToWork = () => {
    sound.playClick?.();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const downloadResume = () => {
    sound.playChime?.();
    const a = document.createElement('a');
    a.href = '/resume/Minimalist White and Grey Professional Resume.pdf';
    a.download = 'Darshil_Nathwani_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  // Hold the whole entrance until the loading screen is gone, so it plays on
  // screen instead of underneath the overlay. Same box, so nothing jumps.
  if (!siteReady) {
    return (
      <section
        id="home"
        aria-hidden
        style={{ position: 'sticky', top: 0, minHeight: '100svh', width: '100%', backgroundColor: '#0C0C0E', zIndex: 0 }}
      />
    );
  }

  return (
    <motion.section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        position: 'sticky',
        top: 0,
        minHeight: '100svh',
        width: '100%',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Inter Tight', sans-serif",
        zIndex: 0,
      }}
    >
      {panel && <LimeHandoff onDone={() => setPanel(false)} />}

      {/* ══════════════════════════════════════════════
          01. EDITORIAL PHOTO — raw, no card, no border.
              Positioned absolutely on right edge.
              Desktop only.
      ══════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[62svh] lg:inset-x-auto lg:right-0 lg:bottom-0 lg:h-auto lg:w-[44%]"
        data-cursor-grow
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          x: photoX,
          WebkitTouchCallout: 'none',
          y: photoY,
          zIndex: 1,
          overflow: 'hidden',
          clipPath: phoneLayout ? undefined : EDGE_CLIP,
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.6 + lag, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* The photos; the lime bar sweeps across to change them, and the tint clears while you hover */}
        <PhotoWipe
          photos={GLASS_PHOTOS}
          index={photoIndex}
          clean={paused}
          captions={CAPTIONS}
          captionClass={`left-4 right-4 top-[9rem] lg:top-auto ${LEFT} lg:right-6 lg:bottom-[11.8rem]`}
        />

        {/* A lime band that follows the angled cut, with its text tilted to match */}
        <div aria-hidden className="hidden lg:block" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#A3E635', clipPath: `polygon(${SLANT_INDENT}% 0%, calc(${SLANT_INDENT}% + 46px) 0%, 46px 100%, 0% 100%)` }} />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `calc(${SLANT_INDENT / 2}% + 23px)`,
                width: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${slantDeg}deg)`,
              }}
            >
              <div
                style={{
                  writingMode: 'vertical-rl',
                  rotate: '180deg',
                  whiteSpace: 'nowrap',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.34em',
                  textTransform: 'uppercase',
                  color: '#0C0C0E',
                }}
              >
                {BAND_TEXT} ✦ {String(photoIndex + 1).padStart(2, '0')} / {String(GLASS_PHOTOS.length).padStart(2, '0')}
              </div>
            </div>
          </div>

        {/* Phones: the photo is a full-width banner, so it fades into the page from the bottom and darkens at the top for the navbar */}
        <div
          aria-hidden
          className="lg:hidden"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #0C0C0E 0%, rgba(12,12,14,0.94) 20%, rgba(12,12,14,0.6) 48%, rgba(12,12,14,0.18) 76%, transparent 100%), linear-gradient(to bottom, rgba(12,12,14,0.72) 0%, transparent 26%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Counter, arrows and a progress line (kept above the page's bottom bar) */}
        <div
          className={`left-4 right-4 top-[6rem] lg:top-auto ${LEFT} lg:right-6 lg:bottom-[9rem]`}
          style={{ position: 'absolute', zIndex: 3, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.2em', color: '#F8FAFC', display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
            <Roll value={String(photoIndex + 1).padStart(2, '0')} />
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>/ {String(GLASS_PHOTOS.length).padStart(2, '0')}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                aria-label={dir === 1 ? 'Next photo' : 'Previous photo'}
                onClick={() => {
                  sound.playClick?.();
                  go(dir);
                }}
                style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(12,12,14,0.5)', color: '#F8FAFC', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, cursor: 'pointer', minHeight: 0 }}
                className="hover:bg-[#A3E635] hover:text-black hover:border-[#A3E635] transition-colors"
              >
                {dir === 1 ? '→' : '←'}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          key={photoIndex}
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
          className="hidden lg:block lg:bottom-[7.8rem]"
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: '#A3E635', transformOrigin: '0 50%', zIndex: 3 }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════
          03. MAIN TYPOGRAPHY STAGE
              The name IS the visual. Max-width 62% on desktop
              so the photo bleeds on the right.
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
        className="justify-end lg:justify-center px-6 sm:px-10 lg:px-16 lg:max-w-[63%]"
      >
        {/* ── Discipline label ── */}
        <ClipLine
          delay={0.12 + lag}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            marginBottom: '1.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
          }}
        >
          <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
          <span>AI Engineer · Full-Stack Developer</span>
        </ClipLine>

        {/* ── MASSIVE NAME BLOCK — cursor torch + letter ripple ── */}
        <KineticName
          fontSize={phoneLayout ? 'clamp(3.6rem, 15.8vw, 9.4rem)' : 'clamp(3.6rem, 10.2vw, 11.5rem)'}
          lines={[
            { text: 'DARSHIL', variant: 'solid', delay: 0.22, mark: true },
            { text: 'NATHWANI', variant: 'outline', delay: 0.36, mark: true },
          ]}
        />

        {/* ── TAGLINE with clearer positioning ── */}
        <div style={{ marginTop: 'clamp(1.8rem, 3.5vw, 3rem)', overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.56 + lag, ease: E }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}
          >
            {/* Lime hairline */}
            <motion.div
              style={{ 
                height: 1, 
                backgroundColor: '#A3E635', 
                flexShrink: 0,
                marginTop: '0.7rem', // Align with first line of text
              }}
              initial={{ width: 0 }}
              animate={{ width: 44 }}
              transition={{ duration: 0.65, delay: 0.82 + lag, ease: E }}
            />
            <DecryptText
              delay={1.3 + lag}
              lines={[
                [
                  { text: 'Building production-scale ' },
                  { text: 'AI/ML', bright: true },
                  { text: ' and ' },
                  { text: 'Full-stack systems', bright: true },
                  { text: '.' },
                ],
                [
                  { text: 'Researcher with a published ' },
                  { text: 'IEEE paper.', bright: true },
                ],
              ]}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.78rem, 1.1vw, 1rem)',
                letterSpacing: '0.015em',
                lineHeight: 1.6,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          04. MARQUEE TICKER STRIP
      ══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.78 + lag }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.055)',
          padding: '0.8rem 0',
          overflow: 'hidden',
          // sits above the photo card, so give it a faint dark base to stay readable over it
          background: 'rgba(12,12,14,0.5)',
        }}
      >
        <MarqueeTicker />
      </motion.div>

      {/* ══════════════════════════════════════════════
          05. BOTTOM ACTION BAR
      ══════════════════════════════════════════════ */}
      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.92 + lag, ease: E }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.055)',
          paddingTop: '1.35rem',
          paddingBottom: 'calc(1.35rem + env(safe-area-inset-bottom, 0px))',
        }}
        className="px-6 sm:px-10 lg:px-16"
      >
        {/* ── Scroll hint ── */}
        <button
          onClick={scrollToWork}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
          className="group"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            className="group-hover:border-[#A3E635] group-hover:bg-[#A3E635]"
          >
            <ArrowDown
              size={13}
              style={{ color: 'rgba(255,255,255,0.35)' }}
              className="group-hover:!text-black transition-colors duration-300"
            />
          </motion.div>
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9.5px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)',
              transition: 'color 0.3s',
            }}
          >
            Explore Work
          </span>
        </button>

        {/* ── CTAs ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Contact / copy email */}
          <button
            onClick={copyEmail}
            style={{
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9.5px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.65rem 1.25rem',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.32)',
              transition: 'border-color 0.25s, color 0.25s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              whiteSpace: 'nowrap',
            }}
            className="hover:border-white/28 hover:text-white/70"
          >
            {copied ? (
              <>
                <Check size={10} style={{ color: '#A3E635' }} />
                <span>Copied</span>
              </>
            ) : (
              <span>Contact</span>
            )}
          </button>

          {/* Resume */}
          <button
            onClick={downloadResume}
            style={{
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9.5px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.65rem 1.25rem',
              background: '#F8FAFC',
              border: '1px solid #F8FAFC',
              color: '#0C0C0E',
              fontWeight: 700,
              transition: 'background 0.25s, border-color 0.25s',
              whiteSpace: 'nowrap',
            }}
            className="hover:bg-[#A3E635] hover:border-[#A3E635]"
          >
            Resume ↓
          </button>
        </div>
      </motion.footer>

      {/* ══════════════════════════════════════════════
          KEYFRAMES
      ══════════════════════════════════════════════ */}
      <style>{`
        /* ~100px/s on desktop. On phones the type is small, so the same speed reads as much faster. */
        .hero-ticker { animation: hero-marquee 36s linear infinite; }
        @media (max-width: 767px) { .hero-ticker { animation-duration: 90s; } }
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1;   box-shadow: 0 0 0 3px rgba(163,230,53,0.18); }
          50%       { opacity: 0.5; box-shadow: 0 0 0 5px rgba(163,230,53,0.08); }
        }
      `}</style>
    </motion.section>
  );
}
