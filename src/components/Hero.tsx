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
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';
import { sound } from '../lib/sound';
import { useSiteReady } from '../lib/siteReady';
import { useMediaQuery } from '../hooks/useMediaQuery';
import KineticName from './KineticName';
import DecryptText from './DecryptText';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

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

const HERO_PHOTOS = [
  '/Images/darshil.jpg',
  '/Images/darshil1.jpg',
  '/Images/darshil2.jpg',
  '/Images/darshil3.jpg',
];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const siteReady = useSiteReady();
  const heroRef = useRef<HTMLElement>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoHovered, setPhotoHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, 4800);
    return () => clearInterval(id);
  }, []);

  // Touch devices can't hover the photo, so it flushes into colour on its own as it changes.
  const coarse = useMediaQuery('(pointer: coarse)');
  const phoneLayout = useMediaQuery('(max-width: 1023px)');
  useEffect(() => {
    if (!coarse) return;
    let off: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setPhotoHovered(true);
      off = setTimeout(() => setPhotoHovered(false), 2000);
    }, 4800);
    return () => {
      clearInterval(id);
      clearTimeout(off);
    };
  }, [coarse]);

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
      {/* ══════════════════════════════════════════════
          01. EDITORIAL PHOTO — raw, no card, no border.
              Positioned absolutely on right edge.
              Desktop only.
      ══════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[62svh] lg:inset-x-auto lg:right-0 lg:bottom-0 lg:h-auto lg:w-[40%]"
        data-cursor-grow
        onMouseEnter={() => setPhotoHovered(true)}
        onMouseLeave={() => setPhotoHovered(false)}
        onPointerDown={(e) => e.pointerType === 'touch' && setPhotoHovered(true)}
        onPointerUp={(e) => e.pointerType === 'touch' && setPhotoHovered(false)}
        onPointerCancel={() => setPhotoHovered(false)}
        style={{
          x: photoX,
          WebkitTouchCallout: 'none',
          y: photoY,
          zIndex: 1,
          overflow: 'hidden',
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Crossfading photo stack */}
        <AnimatePresence>
          <motion.img
            key={HERO_PHOTOS[photoIndex]}
            src={HERO_PHOTOS[photoIndex]}
            alt=""
            draggable={false}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: photoHovered ? 1.04 : 1 }}
            exit={{ opacity: 0, scale: 1.0 }}
            transition={{
              opacity: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: photoHovered
                ? 'grayscale(0%) contrast(1.03) brightness(0.95) saturate(1.08)'
                : 'grayscale(100%) contrast(1.08) brightness(0.62)',
              transitionProperty: 'filter',
              transitionDuration: '1.4s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              display: 'block',
              userSelect: 'none',
            }}
          />
        </AnimatePresence>

        {/* Left-edge fade: ultra-smooth blend with many gradient stops (desktop: photo sits on the right) */}
        <div
          aria-hidden
          className="hidden lg:block"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, ' +
              '#0C0C0E 0%, ' +
              'rgba(12,12,14,0.98) 5%, ' +
              'rgba(12,12,14,0.92) 10%, ' +
              'rgba(12,12,14,0.85) 15%, ' +
              'rgba(12,12,14,0.75) 20%, ' +
              'rgba(12,12,14,0.65) 25%, ' +
              'rgba(12,12,14,0.55) 30%, ' +
              'rgba(12,12,14,0.45) 35%, ' +
              'rgba(12,12,14,0.35) 40%, ' +
              'rgba(12,12,14,0.28) 45%, ' +
              'rgba(12,12,14,0.22) 50%, ' +
              'rgba(12,12,14,0.16) 55%, ' +
              'rgba(12,12,14,0.12) 60%, ' +
              'rgba(12,12,14,0.08) 65%, ' +
              'rgba(12,12,14,0.05) 70%, ' +
              'rgba(12,12,14,0.03) 75%, ' +
              'rgba(12,12,14,0.015) 80%, ' +
              'rgba(12,12,14,0.008) 85%, ' +
              'rgba(12,12,14,0.003) 90%, ' +
              'transparent 95%)',
            opacity: photoHovered ? 0.3 : 0.88,
            transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Bottom fade - also ultra-smooth */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '45%',
            background:
              'linear-gradient(to top, ' +
              '#0C0C0E 0%, ' +
              'rgba(12,12,14,0.9) 15%, ' +
              'rgba(12,12,14,0.75) 25%, ' +
              'rgba(12,12,14,0.6) 35%, ' +
              'rgba(12,12,14,0.45) 45%, ' +
              'rgba(12,12,14,0.32) 55%, ' +
              'rgba(12,12,14,0.22) 65%, ' +
              'rgba(12,12,14,0.14) 75%, ' +
              'rgba(12,12,14,0.08) 85%, ' +
              'transparent 95%)',
            opacity: photoHovered ? 0.4 : 0.9,
            transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Phones: the photo is a full-width banner, so it fades into the page from the bottom and darkens at the top for the navbar */}
        <div
          aria-hidden
          className="lg:hidden"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #0C0C0E 0%, rgba(12,12,14,0.94) 20%, rgba(12,12,14,0.6) 48%, rgba(12,12,14,0.18) 76%, transparent 100%), linear-gradient(to bottom, rgba(12,12,14,0.72) 0%, transparent 26%)',
            opacity: photoHovered ? 0.55 : 1,
            transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Index dots */}
        <div
          className="top-[5.8rem] right-5 lg:top-auto lg:bottom-[1.4rem] lg:right-[1.4rem]"
          style={{
            position: 'absolute',
            zIndex: 3,
            display: 'flex',
            gap: '0.4rem',
          }}
        >
          {HERO_PHOTOS.map((src, i) => (
            <span
              key={src}
              style={{
                width: i === photoIndex ? 16 : 5,
                height: 5,
                borderRadius: 999,
                backgroundColor: i === photoIndex ? '#A3E635' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
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
          delay={0.12}
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
          fontSize={phoneLayout ? 'clamp(3.4rem, 15.5vw, 9rem)' : 'clamp(3.2rem, 9.5vw, 10.5rem)'}
          lines={[
            { text: 'DARSHIL', variant: 'solid', delay: 0.22 },
            { text: 'NATHWANI', variant: 'outline', delay: 0.36 },
          ]}
        />

        {/* ── TAGLINE with clearer positioning ── */}
        <div style={{ marginTop: 'clamp(1.8rem, 3.5vw, 3rem)', overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.56, ease: E }}
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
              transition={{ duration: 0.65, delay: 0.82, ease: E }}
            />
            <DecryptText
              delay={1.3}
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
        transition={{ duration: 1, delay: 0.78 }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.055)',
          padding: '0.8rem 0',
          overflow: 'hidden',
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
        transition={{ duration: 0.9, delay: 0.92, ease: E }}
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
