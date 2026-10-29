/**
 * Footer.tsx — Curtain reveal
 *
 * SIGNATURE: the footer sits underneath the page. When you reach the end the
 * last section slides up like a curtain and uncovers it. A full-width
 * DARSHIL NATHWANI wordmark fills lime as the curtain lifts, and every letter
 * lights up on hover. If the footer is taller than the screen (phones) the
 * curtain is replaced by a scroll-linked unveil (the content rises into place as
 * you arrive), so phones get the same feeling.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Download } from 'lucide-react';
import VisitorCounter from './VisitorCounter';
import { sound } from '../lib/sound';
import { useISTClock } from '../hooks/useISTClock';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const RESUME_URL = '/resume/Minimalist White and Grey Professional Resume.pdf';

const NAV = [
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Honors', id: 'achievements' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const CONNECT = [
  { label: 'GitHub', href: 'https://github.com/Darshil-N' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/darshil-nathwani-bba698307' },
  { label: 'Email', href: 'mailto:darshilnathwani@gmail.com' },
];

const NAME = 'DARSHIL NATHWANI';

function FooterLink({ children, onClick, href, external }: { children: React.ReactNode; onClick?: () => void; href?: string; external?: boolean }) {
  const inner = (
    <span className="group relative inline-flex items-center gap-2" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', letterSpacing: '-0.015em', color: 'rgba(248,250,252,0.78)' }}>
      <span className="transition-colors duration-300 group-hover:text-[#A3E635]">{children}</span>
      {external && <ArrowUpRight size={15} className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[#A3E635]" />}
      <span aria-hidden className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: LIME }} />
    </span>
  );
  const common = { onMouseEnter: () => sound.playHover?.(), className: 'inline-flex py-1.5 text-left' };
  return href ? (
    <a href={href} target={external ? '_blank' : undefined} rel="noopener noreferrer" {...common}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} {...common}>
      {inner}
    </button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const time = useISTClock();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [curtain, setCurtain] = useState(false);

  // The curtain only works when the whole footer fits on screen.
  useEffect(() => {
    const check = () => {
      const h = ref.current?.offsetHeight ?? 0;
      setCurtain(window.innerWidth >= 768 && h > 0 && h <= window.innerHeight);
    };
    check();
    const ro = new ResizeObserver(check);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', check);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);

  // The wordmark fills as the footer is uncovered.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const fillPos = useTransform(scrollYProgress, [0.1, 0.95], ['100% 0%', '0% 0%']);
  // No sticky curtain (phones, or a footer taller than the screen): the content rises into place instead.
  const unveilY = useTransform(scrollYProgress, [0, 1], ['-16%', '0%']);
  const small = useMediaQuery('(max-width: 640px)');

  const scrollToSection = (id: string) => {
    sound.playClick?.();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: id === 'home' ? 0 : el.offsetTop - 80, behavior: 'smooth' });
  };
  const scrollToTop = () => {
    sound.playClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      style={{
        ...(curtain ? { position: 'sticky', bottom: 0, zIndex: 0 } : { position: 'relative' }),
        backgroundColor: '#0C0C0E',
        borderTop: '1px solid rgba(163,230,53,0.25)',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ y: curtain || reduce ? 0 : unveilY }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-20%',
          width: '80%',
          height: '60%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(163,230,53,0.09), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative px-6 sm:px-10 lg:px-16 max-w-[1700px] mx-auto" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        {/* Top: pitch + back to top */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div>
            <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)', marginBottom: '1rem' }}>
              <span style={{ color: LIME }}>◈</span>&nbsp;&nbsp;Have an idea?
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => sound.playHover?.()}
              data-cursor-text="TALK"
              className="group text-left"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: '#F8FAFC' }}
            >
              Let&apos;s build it{' '}
              <span className="inline-flex align-middle transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:text-[#A3E635]">
                <ArrowUpRight size={40} />
              </span>
            </button>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover?.()}
            whileHover={{ y: -6 }}
            aria-label="Back to top"
            data-cursor-text="TOP"
            className="group flex items-center justify-center self-start md:self-auto flex-shrink-0 transition-colors duration-300 hover:bg-[#A3E635] hover:border-[#A3E635]"
            style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', color: '#F8FAFC' }}
          >
            <ArrowUp size={26} className="transition-colors duration-300 group-hover:text-[#0C0C0E]" />
          </motion.button>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10" style={{ paddingTop: 'clamp(1.8rem, 3vw, 2.6rem)', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="col-span-2 md:col-span-1">
            <p style={{ ...MONO, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.35)', marginBottom: '1rem' }}>Based in</p>
            <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', color: 'rgba(248,250,252,0.78)', lineHeight: 1.4 }}>
              Bengaluru, India
            </p>
            {time && (
              <p className="inline-flex items-center gap-2" style={{ ...MONO, marginTop: 8, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(248,250,252,0.5)' }}>
                <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: LIME }} />
                {time} IST
              </p>
            )}
          </div>

          <div>
            <p style={{ ...MONO, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.35)', marginBottom: '0.8rem' }}>Navigate</p>
            <div className="flex flex-col">
              {NAV.map((n) => (
                <FooterLink key={n.id} onClick={() => scrollToSection(n.id)}>
                  {n.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <p style={{ ...MONO, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.35)', marginBottom: '0.8rem' }}>Connect</p>
            <div className="flex flex-col">
              {CONNECT.map((c) => (
                <FooterLink key={c.label} href={c.href} external={c.href.startsWith('http')}>
                  {c.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <p style={{ ...MONO, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.35)', marginBottom: '0.8rem' }}>Resources</p>
            <a
              href={RESUME_URL}
              download="Darshil_Nathwani_Resume.pdf"
              onMouseEnter={() => sound.playHover?.()}
              onClick={() => sound.playChime?.()}
              className="group inline-flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-[#A3E635]"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', color: 'rgba(248,250,252,0.78)' }}
            >
              <Download size={16} /> Resume
            </a>
          </div>
        </div>
      </div>

      {/* Full-width wordmark: fills lime as the footer is revealed; letters light up on hover/tap.
          On phones it stacks onto two lines so it stays huge. */}
      <div aria-hidden className="relative select-none" style={{ lineHeight: 0.8, padding: '0 clamp(0.5rem, 1.5vw, 1.5rem)', whiteSpace: 'nowrap', textAlign: 'center' }}>
        <motion.div
          style={{
            display: 'inline-block',
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: small ? '19vw' : '9.4vw',
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1.5px rgba(248,250,252,0.3)',
            backgroundImage: `linear-gradient(90deg, ${LIME} 0%, ${LIME} 46%, rgba(163,230,53,0) 54%, rgba(163,230,53,0) 100%)`,
            backgroundSize: '220% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: reduce ? '0% 0%' : fillPos,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          {(small ? NAME.split(' ') : [NAME]).map((line, li) => (
            <div key={li} style={{ marginTop: li ? '0.05em' : 0 }}>
              {line.split('').map((ch, i) =>
                ch === ' ' ? (
                  <span key={i}>&nbsp;</span>
                ) : (
                  <span key={i} className="inline-block transition-transform duration-300 hover:-translate-y-[6%] active:-translate-y-[6%]">
                    {ch}
                  </span>
                )
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative px-6 sm:px-10 lg:px-16 max-w-[1700px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ paddingTop: 'clamp(1.4rem, 2.4vw, 2rem)', paddingLeft: 'clamp(1.5rem, 4vw, 4rem)', paddingRight: 'clamp(1.5rem, 4vw, 4rem)', paddingBottom: 'calc(clamp(1.4rem, 2.4vw, 2rem) + env(safe-area-inset-bottom, 0px))', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 'clamp(1rem, 2vw, 1.6rem)' }}>
        <p style={{ ...MONO, fontSize: 10, letterSpacing: '0.06em', color: 'rgba(248,250,252,0.4)' }}>
          © {year} Darshil Nathwani · Built with React, TypeScript, Framer Motion
        </p>
        <VisitorCounter />
      </div>
      </motion.div>
    </footer>
  );
}
