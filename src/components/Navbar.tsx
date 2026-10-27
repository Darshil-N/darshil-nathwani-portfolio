import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Terminal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sound } from '../lib/sound';
import { CommandPalette } from './CommandPalette';
import { useISTClock } from '../hooks/useISTClock';

const NAV_ITEMS = [
  { label: 'Works', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Honors', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const time = useISTClock();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      const sectionIds = ['home', 'work', 'experience', 'skills', 'achievements', 'contact'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    sound.playChime();
    const a = document.createElement('a');
    a.href = '/resume/Minimalist White and Grey Professional Resume.pdf';
    a.download = 'Darshil_Nathwani_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />

      <header
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backgroundColor: scrolled ? 'rgba(12,12,14,0.92)' : 'rgba(12,12,14,0.0)',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <nav
          className="flex items-center justify-between px-6 sm:px-10 lg:px-16"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            padding: '1.1rem 0',
          }}
        >
          {/* Logo / wordmark */}
          <button
            onClick={() => scrollTo('home')}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#A3E635',
                boxShadow: '0 0 0 3px rgba(163,230,53,0.18)',
              }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-white font-medium group-hover:text-[#A3E635] transition-colors"
            >
              Darshil Nathwani
            </span>
          </button>

          {/* IST Clock */}
          {time && (
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-white/10"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  backgroundColor: '#A3E635',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <span className="text-[10px] tracking-[0.18em] text-white/40 uppercase">IST</span>
              <span className="text-[10px] tracking-widest text-white/60 font-medium">{time}</span>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => sound.playHover()}
                  className="relative text-[10.5px] uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  style={{ color: isActive ? '#F8FAFC' : 'rgba(255,255,255,0.4)' }}
                >
                  {item.label}
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: -6,
                      height: 1,
                      width: isActive ? '100%' : 0,
                      backgroundColor: '#A3E635',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                setIsCmdOpen(true);
              }}
              onMouseEnter={() => sound.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-white/30 text-[10px] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-all cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              <span>⌘K</span>
            </button>

            <button
              onClick={handleResumeDownload}
              onMouseEnter={() => sound.playHover()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F8FAFC] hover:bg-[#A3E635] text-[#0C0C0E] font-semibold text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Resume</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="md:hidden flex items-center justify-center w-8 h-8 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div
            className="md:hidden animate-slide-up"
            style={{
              backgroundColor: 'rgba(12,12,14,0.97)',
              backdropFilter: 'blur(14px)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center justify-between py-2.5 text-left text-[10.5px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-[#A3E635]">→</span>
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsCmdOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/50 hover:text-white"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Open ⌘K Menu</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
