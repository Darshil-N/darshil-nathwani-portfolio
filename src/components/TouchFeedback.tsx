/**
 * TouchFeedback.tsx — the touch equivalent of the custom cursor
 *
 * Phones have no cursor, so the lime dot and its labels can't exist. Instead,
 * tapping anything interactive sends out a lime ring from the touch point, and
 * (on devices that support it) gives a tiny haptic tick. Mouse input is ignored.
 */

import { useEffect } from 'react';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [data-cursor-text], [data-cursor-grow]';

export default function TouchFeedback() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      const target = e.target as Element | null;
      if (!target?.closest?.(INTERACTIVE)) return;

      // Android only; iOS Safari has no vibration API, so this is simply skipped there.
      navigator.vibrate?.(8);
      if (reduce) return;

      const ring = document.createElement('span');
      Object.assign(ring.style, {
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: '14px',
        height: '14px',
        marginLeft: '-7px',
        marginTop: '-7px',
        borderRadius: '50%',
        border: '2px solid #A3E635',
        boxShadow: '0 0 18px rgba(163,230,53,0.55)',
        pointerEvents: 'none',
        zIndex: '1000000',
      } as CSSStyleDeclaration);
      document.body.appendChild(ring);

      const anim = ring.animate(
        [
          { transform: 'scale(0.4)', opacity: 0.95 },
          { transform: 'scale(5.2)', opacity: 0 },
        ],
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
      anim.onfinish = () => ring.remove();
      anim.oncancel = () => ring.remove();
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  return null;
}
