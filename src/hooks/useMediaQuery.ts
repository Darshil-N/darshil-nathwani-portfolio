import { useEffect, useState } from 'react';

/**
 * Live `window.matchMedia` result. The first render already has the right answer
 * (read synchronously), so layouts don't flip after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/** True when the primary input can hover (a mouse or trackpad), false on phones and tablets. */
export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
