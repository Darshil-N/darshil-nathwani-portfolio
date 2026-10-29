import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ backgroundColor: '#0C0C0E', color: '#F8FAFC' }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(600px circle at 50% 45%, rgba(163,230,53,0.09), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: E }}
        aria-hidden
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(9rem, 32vw, 26rem)',
          lineHeight: 0.8,
          letterSpacing: '-0.06em',
          color: 'transparent',
          WebkitTextStroke: `2px ${LIME}`,
          userSelect: 'none',
        }}
      >
        404
      </motion.div>

      <div className="relative" style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: LIME, marginBottom: '1rem' }}>
          Page not found
        </div>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
          This route doesn&apos;t exist.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.06em', color: 'rgba(248,250,252,0.45)', marginTop: '0.8rem' }}>
          {location.pathname}
        </p>

        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 overflow-hidden transition-colors"
          style={{
            marginTop: '2.2rem',
            padding: '1rem 1.8rem',
            border: '1px solid rgba(248,250,252,0.8)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#F8FAFC',
            textDecoration: 'none',
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ backgroundColor: LIME, transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
          />
          <ArrowLeft size={14} className="relative transition-colors group-hover:text-[#0C0C0E]" />
          <span className="relative transition-colors group-hover:text-[#0C0C0E]">Back to home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
