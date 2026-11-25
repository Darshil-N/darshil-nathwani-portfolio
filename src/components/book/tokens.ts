import type { CSSProperties } from 'react';

// The book borrows the site's palette and type exactly: near-black, warm off-white ink, one lime.
export const T = {
  ink: '#EDEBE6',
  dim: 'rgba(237,235,230,0.76)',
  faint: 'rgba(237,235,230,0.5)',
  line: 'rgba(237,235,230,0.16)',
  lime: '#A3E635',
  bg: '#0B0B0C',
  sans: "'Inter Tight', sans-serif",
  /** the cover's face: a condensed, heavy, Impact-like grotesque (Impact itself where it exists) */
  impact: "Impact, 'Anton', 'Bebas Neue', 'Inter Tight', sans-serif",
  syne: "'Syne', 'Inter Tight', sans-serif",
  serif: "'DM Serif Display', serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Inter', sans-serif",
  /** a fine hairline for rules inside the pages */
  hair: 'rgba(237,235,230,0.1)',
  /** the page stock: warm near-black, a touch lighter at the top */
  paperTop: '#171613',
  paperBottom: '#0F0E0C',
} as const;

/** The foil: a warm, pale metal. Used (as text fill) for the cover title and the chapter numerals, and nowhere else. */
export const FOIL = 'linear-gradient(104deg, #6f6a5d 0%, #b9b3a1 28%, #d8d2bf 48%, #9a9484 68%, #c4bdaa 86%, #7a7567 100%)';
export const foilText: CSSProperties = { background: FOIL, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' };

export type Side = 'left' | 'right' | 'single';

/** A page-sized unit that scales with the page: never smaller than `min` px, otherwise `cq` percent of the page width. */
export const fs = (min: number, cq: number) => `max(${min}px, ${cq}cqw)`;

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Tailwind-style accent names from the project data ("from-amber-500/20 …") to a colour for the plate's glow. */
const HUES: Record<string, string> = {
  amber: '#f59e0b', orange: '#f97316', yellow: '#eab308', lime: '#84cc16', green: '#22c55e', emerald: '#10b981', teal: '#14b8a6',
  cyan: '#06b6d4', sky: '#0ea5e9', blue: '#3b82f6', indigo: '#6366f1', violet: '#8b5cf6', purple: '#a855f7', pink: '#ec4899',
  rose: '#f43f5e', red: '#ef4444',
};
export const hueOf = (accent?: string) => HUES[accent?.match(/from-([a-z]+)-/)?.[1] ?? ''] ?? '#A3E635';
