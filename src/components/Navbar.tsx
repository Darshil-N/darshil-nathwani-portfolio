/**
 * Navbar.tsx — Floating command pill
 *
 * SIGNATURE: Full-width at the top of the page, then it condenses into a
 * floating glass pill that stays pinned while you scroll.
 * A lime pill slides between links (shared layout animation), a hairline
 * progress bar tracks the page, and the Resume button is magnetic.
 * Mobile gets a full-screen overlay menu with giant staggered links.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { Download, Terminal, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sound } from '../lib/sound';
import { CommandPalette } from './CommandPalette';
import { useISTClock } from '../hooks/useISTClock';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const RESUME_URL = '/resume/Minimalist White and Grey Professional Resume.pdf';

// Order matches the page, top to bottom.
const NAV_ITEMS = [
  { label: 'Works', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Honors', id: 'achievements' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];
const SECTION_IDS = ['home', ...NAV_ITEMS.map((i) => i.id)];

/** Pulls its children slightly toward the cursor. */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-flex' }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const time = useISTClock();
  const reduce = useReducedMotion();

  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  /* ── Scroll state: condensed pill, hide on scroll-down, active section ── */
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 30);

      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── ⌘K / Ctrl+K toggles the command palette ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Overlay menu: lock page scroll, close on Escape ── */
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const scrollTo = useCallback(
    (id: string) => {
      sound.playClick();
      const wasOpen = isMenuOpen;
      setIsMenuOpen(false);
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: id } });
        return;
      }
      // Let the overlay release the scroll lock before scrolling.
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: id === 'home' ? 0 : el.offsetTop - 80, behavior: 'smooth' });
      }, wasOpen ? 80 : 0);
    },
    [isMenuOpen, location.pathname, navigate]
  );

  const handleResumeDownload = () => {
    sound.playChime();
    const a = document.createElement('a');
    a.href = RESUME_URL;
    a.download = 'Darshil_Nathwani_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const pillTarget = hovered ?? activeSection;

  return (
    <>
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />

      {/* Page progress hairline */}
      <motion.div
        aria-hidden
        style={{
          scaleX: progress,
          transformOrigin: '0 50%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: LIME,
          boxShadow: `0 0 12px ${LIME}`,
          zIndex: 60,
        }}
      />

      <motion.header
        className="fixed left-0 right-0 top-0 z-50 pointer-events-none"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <motion.nav
          className="pointer-events-auto mx-auto flex items-center justify-between"
          aria-label="Primary"
          animate={{
            maxWidth: scrolled ? 1080 : 1800,
            marginTop: scrolled ? 14 : 0,
            borderRadius: scrolled ? 999 : 0,
            backgroundColor: scrolled ? 'rgba(12,12,14,0.78)' : 'rgba(12,12,14,0)',
            borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: reduce ? 0 : 0.6, ease: E }}
          style={{
            width: 'calc(100% - 24px)',
            padding: scrolled ? '0.55rem 0.7rem 0.55rem 1.3rem' : '1.1rem 1.5rem',
            border: '1px solid transparent',
            backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
            boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.45)' : 'none',
            fontFamily: "'Inter Tight', sans-serif",
            transition: 'padding 0.5s cubic-bezier(0.76,0,0.24,1), box-shadow 0.5s',
          }}
        >
          {/* Wordmark */}
          <button
            onClick={() => scrollTo('home')}
            onMouseEnter={() => sound.playHover()}
            aria-label="Back to top"
            data-cursor-text="TOP"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span
              className="relative flex items-center justify-center"
              style={{ width: 30, height: 30, border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8 }}
            >
              <span
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: 12,
                  letterSpacing: '-0.04em',
                  color: '#F8FAFC',
                }}
              >
                DN
              </span>
              <span
                style={{
                  position: 'absolute',
                  top: -3,
                  right: -3,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: LIME,
                  boxShadow: `0 0 0 3px rgba(163,230,53,0.2)`,
                }}
              />
            </span>
            <span className="hidden sm:block text-[13px] uppercase tracking-[0.06em] font-extrabold text-white group-hover:text-[#A3E635] transition-colors">
              Darshil Nathwani
            </span>
          </button>

          {/* Links with the sliding lime pill */}
          <div className="hidden md:flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
            {NAV_ITEMS.map((item) => {
              const isCurrent = activeSection === item.id;
              const showPill = pillTarget === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => {
                    setHovered(item.id);
                    sound.playHover();
                  }}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={isCurrent ? 'true' : undefined}
                  className="relative px-4 py-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] cursor-pointer"
                  style={{
                    color: showPill ? LIME : isCurrent ? '#F8FAFC' : 'rgba(255,255,255,0.45)',
                    transition: 'color 0.25s',
                  }}
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 999,
                        backgroundColor: 'rgba(163,230,53,0.1)',
                        border: '1px solid rgba(163,230,53,0.28)',
                      }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {time && (
              <div
                className="hidden xl:flex items-center gap-2 px-3 py-1.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                title="Bengaluru local time"
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: LIME,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <span className="text-[10px] tracking-[0.18em] text-white/35 uppercase">IST</span>
                <span className="text-[10px] tracking-widest text-white/65 font-medium tabular-nums">{time}</span>
              </div>
            )}

            <button
              onClick={() => {
                sound.playClick();
                setIsCmdOpen(true);
              }}
              onMouseEnter={() => sound.playHover()}
              aria-label="Open command menu"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 hover:border-white/30 text-[10px] uppercase tracking-[0.18em] text-white/45 hover:text-white transition-all cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              <span>⌘K</span>
            </button>

            <Magnetic>
              <button
                onClick={handleResumeDownload}
                onMouseEnter={() => sound.playHover()}
                data-cursor-text="PDF"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] hover:bg-[#A3E635] text-[#0C0C0E] font-extrabold text-[11px] uppercase tracking-[0.1em] transition-colors cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Resume</span>
              </button>
            </Magnetic>

            {/* Mobile menu toggle: two lines that cross into an X */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMenuOpen((o) => !o);
              }}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden relative w-10 h-10 rounded-full border border-white/15 cursor-pointer"
            >
              <motion.span
                aria-hidden
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -3 }}
                transition={{ duration: 0.35, ease: E }}
                className="absolute left-1/2 top-1/2 block bg-white"
                style={{ width: 16, height: 1.5, marginLeft: -8, marginTop: -0.75 }}
              />
              <motion.span
                aria-hidden
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 3 }}
                transition={{ duration: 0.35, ease: E }}
                className="absolute left-1/2 top-1/2 block bg-white"
                style={{ width: 16, height: 1.5, marginLeft: -8, marginTop: -0.75 }}
              />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* ── Full-screen overlay menu (mobile) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0 : 0.7, ease: E }}
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: '#0C0C0E', padding: 'calc(6.5rem + env(safe-area-inset-top, 0px)) 1.5rem calc(2rem + env(safe-area-inset-bottom, 0px))' }}
          >
            {/* Lime glow */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                right: '-30%',
                bottom: '-10%',
                width: '90%',
                height: '60%',
                background: 'radial-gradient(ellipse, rgba(163,230,53,0.12), transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            <nav aria-label="Mobile" className="relative flex-1 flex flex-col justify-center">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.id} style={{ overflow: 'hidden' }}>
                  <motion.button
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.18 + i * 0.07, ease: E }}
                    onClick={() => scrollTo(item.id)}
                    className="group w-full flex items-baseline gap-4 py-1.5 text-left cursor-pointer"
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        color: activeSection === item.id ? LIME : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        fontSize: 'clamp(2.6rem, 13vw, 5rem)',
                        color: activeSection === item.id ? '#F8FAFC' : 'transparent',
                        WebkitTextStroke: activeSection === item.id ? '0' : '1.5px rgba(248,250,252,0.5)',
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.6, ease: E }}
              className="relative pt-6 border-t border-white/10 flex flex-col gap-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <a
                href="mailto:darshilnathwani@gmail.com"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] text-white/70"
              >
                darshilnathwani@gmail.com <ArrowUpRight className="w-3.5 h-3.5 text-[#A3E635]" />
              </a>
              {/* ⌘K doesn't exist on a phone, so the command palette gets a button here */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMenuOpen(false);
                  setIsCmdOpen(true);
                }}
                className="inline-flex items-center gap-2 self-start text-[11px] tracking-[0.14em] uppercase text-white/70"
              >
                <Terminal className="w-3.5 h-3.5 text-[#A3E635]" /> Command menu
              </button>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#A3E635] text-[#0C0C0E] font-extrabold text-[12px] uppercase tracking-[0.1em]"
                >
                  <Download className="w-3.5 h-3.5" /> Resume
                </button>
                {time && (
                  <span className="text-[10px] tracking-[0.18em] text-white/40 uppercase tabular-nums">
                    Bengaluru · {time}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
