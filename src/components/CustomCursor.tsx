import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic label cursor: a small lime dot that morphs into a filled
 * pill carrying a short word (from data-cursor-text) over interactive
 * elements. Disabled on touch devices.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [grow, setGrow] = useState(false);
  const [hidden, setHidden] = useState(true);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 900, damping: 50, mass: 0.3 });
  const ry = useSpring(my, { stiffness: 900, damping: 50, mass: 0.3 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setHidden(false);
    };
    const onLeaveWindow = () => setHidden(true);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>('[data-cursor-text]');
      const growable = el.closest('a, button, [data-cursor-grow]');
      setLabel(labelled ? labelled.getAttribute('data-cursor-text') : null);
      setGrow(!!growable);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [mx, my]);

  if (!enabled) return null;

  const isLabelled = !!label;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      <motion.div
        aria-hidden
        animate={{
          opacity: hidden ? 0 : 1,
          width: isLabelled ? 68 : grow ? 14 : 8,
          height: isLabelled ? 34 : grow ? 14 : 8,
          backgroundColor: isLabelled ? '#0C0C0E' : grow ? '#A3E635' : '#F8FAFC',
          borderColor: isLabelled ? '#A3E635' : 'transparent',
          mixBlendMode: isLabelled ? 'normal' : grow ? 'normal' : 'difference',
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 999,
          pointerEvents: 'none',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {isLabelled && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A3E635',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
