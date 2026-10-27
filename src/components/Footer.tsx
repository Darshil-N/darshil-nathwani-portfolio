/**
 * Footer.tsx — Minimal end statement
 *
 * SIGNATURE BOLDNESS: Massive name watermark with clean link grid
 * Inspired by: Paul Kalkbrenner's minimal footer + Dan Mall's editorial end
 * 
 * UNIQUE ELEMENTS:
 * - Oversized "DARSHIL" watermark background
 * - Clean horizontal link layout
 * - Green accent line divider
 * - Back to top with smooth animation
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Download } from 'lucide-react';
import VisitorCounter from './VisitorCounter';
import { sound } from '../lib/sound';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    sound.playClick?.();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    sound.playClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Massive background name */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(163,230,53,0.02)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        DARSHIL
      </div>

      {/* Content */}
      <div
        className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto relative z-10"
        style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 4rem)' }}
      >
        {/* Top: Name + Back to top */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-12">
          {/* Name */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#F8FAFC',
                marginBottom: '0.8rem',
              }}
            >
              Darshil Nathwani
            </h3>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: 'rgba(248,250,252,0.4)',
              }}
            >
              AI/ML Engineer · Full-Stack Developer · Research Author
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover?.()}
            whileHover={{ y: -4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.8rem 1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(248,250,252,0.5)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            className="hover:!border-[#A3E635] hover:!text-[#F8FAFC]"
          >
            <ArrowUp size={12} />
            <span>Top</span>
          </motion.button>
        </div>

        {/* Green divider line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            height: 1,
            backgroundColor: 'rgba(163,230,53,0.2)',
            marginBottom: '3rem',
          }}
        />

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Navigate */}
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              Navigate
            </p>
            <div className="space-y-2">
              {[
                { label: 'Work', id: 'work' },
                { label: 'Experience', id: 'experience' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => sound.playHover?.()}
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(248,250,252,0.5)',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '0.4rem 0',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                  }}
                  className="hover:!text-[#A3E635]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              Connect
            </p>
            <div className="space-y-2">
              {[
                { label: 'GitHub', href: 'https://github.com/Darshil-N', icon: Github },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/darshil-nathwani-bba698307', icon: Linkedin },
                { label: 'Email', href: 'mailto:darshilnathwani7@gmail.com', icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover?.()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      color: 'rgba(248,250,252,0.5)',
                      padding: '0.4rem 0',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    className="hover:!text-[#A3E635]"
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.3)',
                marginBottom: '1.5rem',
              }}
            >
              Resources
            </p>
            <a
              href="/resume/Minimalist White and Grey Professional Resume.pdf"
              download="Darshil_Nathwani_Resume.pdf"
              onMouseEnter={() => sound.playHover?.()}
              onClick={() => sound.playChime?.()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'rgba(248,250,252,0.5)',
                padding: '0.4rem 0',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              className="hover:!text-[#A3E635]"
            >
              <Download size={14} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Bottom: Copyright + Visitor */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.05em',
              color: 'rgba(248,250,252,0.3)',
            }}
          >
            © {year} Darshil Nathwani · Built with React, TypeScript, Framer Motion
          </p>

          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
