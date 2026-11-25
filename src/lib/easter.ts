/**
 * easter.ts — the small things hidden around the site.
 *
 * Everything here is lazy: the module is imported after the page is idle, listeners are passive, nothing polls, and the only
 * thing that ever animates is a single fixed overlay that lives for a few seconds. Device-specific ones only attach when the
 * device can do them (a motion sensor, a battery, a network event).
 */
import { toast } from 'sonner';

const LIME = '#A3E635';
const once = (k: string) => {
  try {
    if (sessionStorage.getItem(k)) return false;
    sessionStorage.setItem(k, '1');
  } catch { /* private mode: show it every time */ }
  return true;
};
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** scanlines over the whole page for a few seconds: a nod to the retro-computer project */
export function crt(ms = 5000) {
  if (reduced() || document.getElementById('egg-crt')) return;
  const el = document.createElement('div');
  el.id = 'egg-crt';
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = `position:fixed;inset:0;z-index:2147483000;pointer-events:none;opacity:0;transition:opacity .5s;background:repeating-linear-gradient(to bottom,rgba(0,0,0,.28) 0 1px,transparent 1px 3px),radial-gradient(120% 90% at 50% 50%,transparent 55%,rgba(0,0,0,.55)),linear-gradient(rgba(163,230,53,.05),rgba(163,230,53,.05))`;
  document.body.appendChild(el);
  requestAnimationFrame(() => (el.style.opacity = '1'));
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 600); }, ms);
}

/** typed in the command palette */
export const SECRETS: Record<string, { label: string; run: (go: (path: string) => void) => void }> = {
  'sudo hire': { label: 'sudo hire', run: () => toast('Permission denied.', { description: 'The work speaks first. Try: ls projects' }) },
  whoami: { label: 'whoami', run: () => toast('darshil@bengaluru', { description: 'builds things that actually run. AI, mobile, web. IEEE-published.' }) },
  'ls projects': { label: 'ls projects', run: (go) => { toast('22 entries · 5 chapters', { description: 'Opening the Proof of Work…' }); go('/projects'); } },
  konami: { label: 'konami', run: () => { crt(); toast('+30 lives'); } },
  coffee: { label: 'coffee', run: () => toast('☕ brewing…', { description: 'ETA: after this build finishes.' }) },
  'rm -rf': { label: 'rm -rf /', run: () => { crt(2500); toast('Nice try.', { description: 'Everything is read-only. Even the jokes.' }); } },
};

export function installEggs() {
  const off: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(t: K, f: (e: WindowEventMap[K]) => void, o: AddEventListenerOptions = { passive: true }) => {
    window.addEventListener(t, f as EventListener, o);
    off.push(() => window.removeEventListener(t, f as EventListener, o));
  };

  /* ── for the curious: the console ── */
  if (once('egg-console')) {
    console.log('%cDARSHIL NATHWANI', `font:900 28px Inter,sans-serif;color:${LIME};letter-spacing:-1px`);
    console.log('%cYou opened DevTools. Of course you did.\nIf you like looking under the hood: github.com/Darshil-N\nTry the command palette (Ctrl/⌘ K) and type: whoami', 'font:12px/1.7 monospace;color:#9aa');
  }

  /* ── the tab title ── */
  let title = document.title;
  const vis = () => {
    if (document.hidden) { title = document.title; document.title = 'Come back, the build is still running…'; }
    else document.title = title;
  };
  document.addEventListener('visibilitychange', vis);
  off.push(() => document.removeEventListener('visibilitychange', vis));

  /* ── Konami code (↑ ↑ ↓ ↓ ← → ← → B A) ── */
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let at = 0;
  on('keydown', (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    at = k === seq[at] ? at + 1 : k === seq[0] ? 1 : 0;
    if (at === seq.length) { at = 0; crt(); toast('+30 lives', { description: 'Konami code. Old school.' }); }
  });

  /* ── the DN mark, five times ── */
  let taps = 0, tapTimer = 0;
  on('click', (e) => {
    if (!(e.target as Element | null)?.closest?.('[aria-label="Back to top"]')) return;
    taps++;
    window.clearTimeout(tapTimer);
    tapTimer = window.setTimeout(() => (taps = 0), 1600);
    if (taps >= 5) {
      taps = 0;
      toast('You found the build log.', { description: 'React · TypeScript · Framer Motion · Tailwind. Hand-built, no templates. Thanks for poking around.', duration: 6000 });
      crt(2500);
    }
  });

  /* ── idle: nudge towards the book, once, only on the home page ── */
  let idle = 0;
  const arm = () => {
    window.clearTimeout(idle);
    if (location.pathname !== '/') return;
    idle = window.setTimeout(() => { if (once('egg-idle')) toast('Still there?', { description: 'There is a book at /projects. It has a ribbon.' }); }, 50000);
  };
  (['pointermove', 'scroll', 'keydown', 'touchstart'] as const).forEach((t) => on(t, arm));
  arm();

  /* ── late at night (local time) ── */
  const h = new Date().getHours();
  if (h >= 0 && h < 4 && once('egg-late')) setTimeout(() => toast(`It is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} where you are.`, { description: 'Go to sleep. The portfolio will still be here.' }), 4500);

  /* ── the device ── */
  // offline / back online
  on('offline', () => toast("You're offline.", { description: 'This page still works. It never needed the internet to be good.' }));
  on('online', () => toast('Back online.', { description: 'Welcome back.' }));

  // a low battery (Chromium only)
  const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean }> };
  nav.getBattery?.().then((b) => { if (b.level < 0.2 && !b.charging && once('egg-batt')) setTimeout(() => toast(`Battery at ${Math.round(b.level * 100)}%.`, { description: 'Light on power by design. There is even a lite mode for the book.' }), 6000); }).catch(() => undefined);

  // shake the phone (needs a motion sensor that does not ask for a permission: Android and most others)
  const DM = window.DeviceMotionEvent as unknown as { requestPermission?: unknown } | undefined;
  if (DM && typeof DM.requestPermission !== 'function' && matchMedia('(pointer: coarse)').matches) {
    let last = 0, hits = 0, lastHit = 0;
    on('devicemotion', (e) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const m = Math.abs(a.x ?? 0) + Math.abs(a.y ?? 0) + Math.abs(a.z ?? 0);
      const now = Date.now();
      if (m > 38 && now - lastHit > 120) { hits = now - lastHit < 600 ? hits + 1 : 1; lastHit = now; }
      if (hits >= 4 && now - last > 8000) { last = now; hits = 0; toast('Easy.', { description: "It's a portfolio, not a snow globe." }); crt(2000); }
    });
  }

  return () => { off.forEach((f) => f()); window.clearTimeout(tapTimer); window.clearTimeout(idle); };
}
