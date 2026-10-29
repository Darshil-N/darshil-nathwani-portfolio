// Tiny "the loading screen is gone" signal, so intro animations can wait for it
// instead of playing underneath the overlay.

import { useEffect, useState } from 'react';

/** How long the loading screen stays up. App.tsx and LoadingScreen.tsx both derive from this. */
export const LOADING_MS = 5000;

let ready = false;
const waiting = new Set<() => void>();

export function markSiteReady() {
  if (ready) return;
  ready = true;
  waiting.forEach((resolve) => resolve());
  waiting.clear();
}

export function whenSiteReady(): Promise<void> {
  if (ready) return Promise.resolve();
  return new Promise((resolve) => waiting.add(resolve));
}

/** True once the loading screen has gone. Already true on later route changes. */
export function useSiteReady(): boolean {
  const [isReady, setIsReady] = useState(ready);
  useEffect(() => {
    if (ready) {
      setIsReady(true);
      return;
    }
    let live = true;
    whenSiteReady().then(() => live && setIsReady(true));
    return () => {
      live = false;
    };
  }, []);
  return isReady;
}
