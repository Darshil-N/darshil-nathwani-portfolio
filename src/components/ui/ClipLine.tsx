import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const E = [0.76, 0, 0.24, 1] as const;

/**
 * Slide-up reveal that plays when the line scrolls into view.
 * It watches the visible wrapper: the moving child starts fully clipped, and
 * clipped content never counts as "in view".
 */
export default function ClipLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: inView ? '0%' : '110%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}
