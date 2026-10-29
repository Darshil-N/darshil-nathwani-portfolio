import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'SYNCHRONIZING MULTI-AGENT PIPELINES...',
  'LOADING EXPLAINABLE AI CORE...',
  'SYSTEM READY',
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [stepText, setStepText] = useState(LOADING_STEPS[0]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Session check so returning in same session is fast
    const shown = sessionStorage.getItem('preloader-v2');
    if (shown) {
      onComplete();
      return;
    }

    let start: number | null = null;
    const duration = 1400; // Snappy 1.4s

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(eased * 100);
      setCount(currentCount);

      const stepIndex = Math.min(Math.floor((currentCount / 100) * LOADING_STEPS.length), LOADING_STEPS.length - 1);
      setStepText(LOADING_STEPS[stepIndex]);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem('preloader-v2', '1');
          setTimeout(onComplete, 400);
        }, 150);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Cyber Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center text-center max-w-md w-full"
          >
            {/* Monogram Badge */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-400 to-lime-600 p-[1px] mb-8 shadow-xl shadow-lime-400/20">
              <div className="w-full h-full bg-[#050609] rounded-2xl flex items-center justify-center">
                <span className="font-sans font-black text-sm text-lime-400">DN</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-2 uppercase">
              Darshil Nathwani
            </h1>

            <p className="font-mono text-xs text-lime-400 uppercase tracking-widest mb-8">
              Portfolio 2026 / 2027
            </p>

            {/* Progress Track */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-lime-500 via-lime-400 to-lime-300 shadow-[0_0_15px_rgba(163,230,53,0.8)]"
                style={{ width: `${count}%` }}
              />
            </div>

            {/* Telemetry line */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="truncate max-w-[280px] text-zinc-400 font-semibold">{stepText}</span>
              <span className="text-white font-bold tabular-nums text-sm">{count}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
