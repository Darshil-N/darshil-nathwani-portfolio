/**
 * LoadingScreen.tsx — Premium luxury loading experience
 * 
 * Signature: Massive animated typography, gradient overlays, smooth reveals
 * Inspired by: Apple product launches, luxury brand sites, Awwwards winners
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const E = [0.76, 0, 0.24, 1] as const;
const SPRING = { type: 'spring', stiffness: 60, damping: 20 };

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'loading' | 'complete' | 'exit'>('intro');

  useEffect(() => {
    // Phase 1: Intro - Name reveal (1.8s - slower, let it breathe)
    const introTimer = setTimeout(() => setPhase('loading'), 1800);

    // Phase 2: Loading counter (4s)
    let isPaused = false;
    const countTimer = setInterval(() => {
      if (isPaused) return;
      
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(countTimer);
          setTimeout(() => setPhase('complete'), 400);
          return 100;
        }
        
        return Math.min(prev + 1.25, 100); // 1.25 per tick
      });
    }, 40); // 40ms * 80 ticks = 4s

    // Phase 3: Complete hold at 100% (1s - good pause)
    const completeTimer = setTimeout(() => setPhase('exit'), 6800);

    // Phase 4: Exit (0.6s)
    const exitTimer = setTimeout(() => setLoading(false), 7400);

    return () => {
      clearTimeout(introTimer);
      clearInterval(countTimer);
      clearTimeout(completeTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: E }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#0C0C0E',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '20%',
              right: '15%',
              width: 'clamp(300px, 40vw, 600px)',
              height: 'clamp(300px, 40vw, 600px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(163,230,53,0.15), transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />
          
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '25%',
              left: '10%',
              width: 'clamp(400px, 50vw, 700px)',
              height: 'clamp(400px, 50vw, 700px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(163,230,53,0.12), transparent 70%)',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />

          {/* Content container */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            
            {/* Phase 1: Intro - Massive name reveal */}
            <AnimatePresence>
              {phase === 'intro' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: E }}
                >
                  <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
                    <motion.h1
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: E }}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(4rem, 12vw, 10rem)',
                        letterSpacing: '-0.04em',
                        color: '#F8FAFC',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      Darshil
                    </motion.h1>
                  </div>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.6, ease: E }}
                    style={{
                      height: 2,
                      background: 'linear-gradient(90deg, transparent, #A3E635, transparent)',
                      margin: '0 auto',
                      maxWidth: '400px',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 2 & 3: Loading counter + tagline */}
            <AnimatePresence>
              {(phase === 'loading' || phase === 'complete') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: E }}
                >
                  {/* Giant counter */}
                  <div style={{ position: 'relative', marginBottom: '3rem' }}>
                    <motion.div
                      animate={phase === 'complete' ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(8rem, 20vw, 16rem)',
                        letterSpacing: '-0.05em',
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #A3E635 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {Math.floor(count)}
                    </motion.div>
                    
                    {/* Percentage sign */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '20%',
                        right: '-10%',
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        color: 'rgba(163,230,53,0.4)',
                      }}
                    >
                      %
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div
                    style={{
                      position: 'relative',
                      width: 'clamp(300px, 60vw, 600px)',
                      height: 4,
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      margin: '0 auto 2rem',
                    }}
                  >
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${count}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #A3E635, #84CC16)',
                        boxShadow: '0 0 20px rgba(163,230,53,0.6)',
                        borderRadius: 2,
                      }}
                    />
                  </div>

                  {/* Tagline */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === 'complete' ? 1 : 0.6 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(11px, 1.2vw, 14px)',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(248,250,252,0.5)',
                    }}
                  >
                    {phase === 'complete' ? 'Ready to explore' : 'Crafting Experience'}
                  </motion.div>

                  {/* Loading dots animation */}
                  {phase === 'loading' && (
                    <div 
                      style={{ 
                        display: 'flex', 
                        gap: '0.5rem', 
                        justifyContent: 'center',
                        marginTop: '1.5rem',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                          }}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#A3E635',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Bottom branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(248,250,252,0.35)',
              textAlign: 'center',
            }}
          >
            Portfolio
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
