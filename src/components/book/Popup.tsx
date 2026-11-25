/**
 * Popup.tsx — a project, standing up out of the book.
 *
 * A specimen sheet: the card is hinged on its bottom edge and lifts off the page (rotateX, critically damped spring); inside it
 * the layers arrive in order (frame, plate and its line art drawing in, headline, write-up) while a single sheen crosses the card
 * once. The left plate holds fine line art that says what the project *is* (a network, a phone, a browser, a viewfinder, a chain of
 * blocks, a row of bars sorting themselves). The right column is the write-up, set like a product sheet, and the only scroll.
 *
 * Performance: transform / opacity only, no filters, no blur, no blend modes, one flat dim layer behind the card, static gradients
 * for every "material", and a handful of animated nodes (the loops are single elements on slow cycles). prefers-reduced-motion
 * drops every animation.
 */
import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { techIcons } from '../techIcons';
import type { Project } from '../../data/projects';
import { SCENES } from './Scenes';
import { T, hueOf } from './tokens';

export type PopupMeta = { num: number; total: number; chapterNo: number; chapterName: string; kind: Kind };
export type Kind = 'network' | 'phone' | 'browser' | 'vision' | 'chain' | 'bars';

const pad2 = (n: number) => String(n).padStart(2, '0');
const rnd = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const ink = (a: number) => `rgba(237,235,230,${a})`;
const MONO = "'JetBrains Mono', monospace";
const BG = '#0E0E10';
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;
const domainOf = (u?: string) => (u ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');

// what each AI project's figure shows (the kind alone would call all of them a 'neural network')
const SCENE_LABEL: Record<string, string> = {
  'Drishti-AI': 'Text-to-SQL over camera data',
  'Disha AI': 'Site scoring on a hex grid',
  'Saarthi - Material Master': 'Record matching and deduplication',
  'Pravaah AI': 'Fairness audit',
  Sanjeevani: 'Clinical decision support',
  'NETRA Platform': 'Monte Carlo risk simulation',
  'Siddhi AI Platform': 'Explainable credit scoring (SHAP)',
  'Kara-AI Interview Coach': 'Voice, face and posture analysis',
  'AI Resource Suggestion Chatbot': 'Retrieval over learning resources',
};
const labelOf = (title: string, kind: Kind) => SCENE_LABEL[title] ?? KIND_LABEL[kind];
const KIND_LABEL: Record<Kind, string> = { network: 'Neural network', phone: 'Mobile app', browser: 'Web platform', vision: 'Computer vision', chain: 'Ledger', bars: 'Algorithm' };

/* ───────────── the motifs (viewBox ~100 × 80) ───────────── */

type MotifProps = { project: Project; hue: string; seed: number; reduced: boolean };

function Network({ hue, seed, reduced }: MotifProps) {
  const counts = [3, 4 + (seed % 3), 5 - (seed % 2), 2];
  const xs = [10, 34, 60, 84];
  const pos = counts.map((n, l) => Array.from({ length: n }, (_, k) => ({ x: xs[l], y: 38 + (k - (n - 1) / 2) * (n <= 2 ? 22 : Math.min(15, 44 / (n - 1))) })));
  const gaps = [0, 1, 2].map((l) => pos[l].flatMap((a) => pos[l + 1].map((b) => `M${a.x} ${a.y}L${b.x} ${b.y}`)).join(''));
  const trace = counts.map((n, l) => pos[l][Math.floor(rnd(seed + l * 5 + 2) * n)]);
  const full = trace.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join('');
  const names = ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT'];
  const loss = Array.from({ length: 22 }, (_, i) => `${10 + i * 3.52},${5.6 + 4 * (1 - Math.exp(-i / 5)) + rnd(seed + i) * 0.5}`).join(' ');
  const conf = (0.9 + rnd(seed) * 0.08).toFixed(2);
  return (
    <>
      <g fontFamily={MONO} fontSize="1.9" letterSpacing="0.25" fill={ink(0.45)}>
        <text className="pu-f" style={d(0.2)} x="10" y="3.6">TRAINING LOSS</text>
        <text className="pu-f" style={d(0.2)} x="84" y="3.6" textAnchor="end">EPOCH 40 / 40</text>
      </g>
      <path className="pu-f" style={d(0.3)} d="M10 10.2H84" stroke={ink(0.12)} strokeWidth="0.2" />
      <polyline className="pu-d" pathLength={1} style={d(0.5)} points={loss} fill="none" stroke={hue} strokeWidth="0.45" strokeLinejoin="round" />
      {gaps.map((g, i) => (
        <path key={i} className="pu-f" style={d(0.1 + i * 0.25)} d={g} fill="none" stroke={ink(0.12)} strokeWidth="0.22" />
      ))}
      {trace.slice(1).map((p, i) => (
        <g key={i}>
          <line className="pu-d" pathLength={1} style={d(1.1 + i * 0.35)} x1={trace[i].x} y1={trace[i].y} x2={p.x} y2={p.y} stroke={hue} strokeWidth="0.55" strokeLinecap="round" />
          <text className="pu-f" style={d(1.6 + i * 0.35)} x={(trace[i].x + p.x) / 2} y={(trace[i].y + p.y) / 2 - 1.8} textAnchor="middle" fontSize="1.8" fill={ink(0.62)} fontFamily={MONO}>w {(0.4 + rnd(seed + i * 4) * 0.55).toFixed(2)}</text>
        </g>
      ))}
      {pos.map((layer, l) => (
        <g key={l} className="pu-f" style={d(0.3 + l * 0.2)}>
          {layer.map((p, k) => {
            const on = trace[l] === p;
            const out = l === 3 && on;
            return <circle key={k} cx={p.x} cy={p.y} r={on ? 2.1 : 1.6} fill={out ? T.lime : BG} stroke={out ? T.lime : on ? hue : ink(0.55)} strokeWidth="0.4" />;
          })}
        </g>
      ))}
      <g className="pu-f" style={d(2)}>
        <line x1={trace[3].x + 3} y1={trace[3].y} x2={trace[3].x + 6} y2={trace[3].y} stroke={ink(0.4)} strokeWidth="0.25" />
        <text x={trace[3].x + 7} y={trace[3].y + 0.7} fontSize="2" fill={T.lime} fontFamily={MONO}>p = {conf}</text>
      </g>
      {names.map((n, l) => (
        <g key={l} className="pu-f" style={d(0.9 + l * 0.1)} fontFamily={MONO} textAnchor="middle">
          <path d={`M${xs[l]} 70.5v1.4`} stroke={ink(0.3)} strokeWidth="0.25" />
          <text x={xs[l]} y="75.4" fontSize="2.1" letterSpacing="0.25" fill={ink(0.5)}>{n}</text>
          <text x={xs[l]} y="78.8" fontSize="1.8" fill={ink(0.3)}>n = {counts[l]}</text>
        </g>
      ))}
      {!reduced && (
        <circle r="1" fill={T.lime}>
          <animateMotion dur="5.5s" begin="2.6s" repeatCount="indefinite" path={full} keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="linear" />
          <animate attributeName="opacity" dur="5.5s" begin="2.6s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.05;0.5;0.58;1" />
        </circle>
      )}
    </>
  );
}

function Phone({ project, hue }: MotifProps) {
  const stack = project.techStack;
  const play = (project.features ?? []).some((f) => /play store/i.test(f));
  const rows = [0, 1, 2, 3];
  const callL = [stack[0], stack[1]].filter(Boolean);
  const callR = [stack[2], stack[3]].filter(Boolean);
  const leader = (x1: number, x2: number, y: number, i: number) => (
    <g key={`${x1}${y}`}>
      <line className="pu-d" pathLength={1} style={d(1 + i * 0.2)} x1={x1} y1={y} x2={x2} y2={y} stroke={ink(0.35)} strokeWidth="0.25" />
      <circle className="pu-f" style={d(1.3 + i * 0.2)} cx={x2} cy={y} r="0.7" fill={ink(0.8)} />
    </g>
  );
  return (
    <>
      <rect className="pu-d" pathLength={1} style={d(0)} x="36" y="4" width="28" height="69" rx="5" fill={BG} stroke={ink(0.7)} strokeWidth="0.45" />
      <rect className="pu-f" style={d(0.5)} x="38.2" y="6.2" width="23.6" height="64.6" rx="3.2" fill={hue} fillOpacity="0.07" />
      <rect className="pu-f" style={d(0.6)} x="46" y="6.9" width="8" height="1.5" rx="0.75" fill={ink(0.55)} />
      <g className="pu-f" style={d(0.65)} fontFamily={MONO} fontSize="1.7" fill={ink(0.55)}>
        <text x="40.4" y="11.4">9:41</text>
        <rect x="56.6" y="10.1" width="3.4" height="1.5" rx="0.4" fill="none" stroke={ink(0.5)} strokeWidth="0.2" />
        <rect x="56.9" y="10.4" width="2.2" height="0.9" rx="0.2" fill={ink(0.55)} />
      </g>
      <text className="pu-f" style={d(0.7)} x="40.5" y="16.4" fontSize="3.3" fontWeight="700" fill={ink(0.95)} fontFamily="'Inter Tight', sans-serif" letterSpacing="-0.1">{clip(project.shortTitle ?? project.title, 14)}</text>
      <rect className="pu-f" style={d(0.8)} x="40.5" y="18.3" width="9" height="1" rx="0.5" fill={hue} fillOpacity="0.9" />
      {rows.map((r) => (
        <g key={r} className="pu-f" style={d(0.9 + r * 0.14)}>
          <rect x="40" y={22.6 + r * 11.3} width="20" height="9.4" rx="1.6" fill={ink(0.035)} stroke={ink(0.22)} strokeWidth="0.2" />
          <circle cx="43.4" cy={27.3 + r * 11.3} r="1.7" fill={r === 1 ? hue : ink(0.2)} />
          <rect x="46.6" y={25.3 + r * 11.3} width={9 - r} height="1.2" rx="0.6" fill={ink(0.72)} />
          <rect x="46.6" y={27.9 + r * 11.3} width="6" height="1" rx="0.5" fill={ink(0.3)} />
        </g>
      ))}
      <rect className="pu-sel" x="39.6" y="22.2" width="20.8" height="10.2" rx="1.9" fill="none" stroke={hue} strokeWidth="0.4" />
      <path className="pu-f" style={d(1.4)} d="M38.2 65.2h23.6" stroke={ink(0.14)} strokeWidth="0.2" />
      {[43.5, 50, 56.5].map((x, i) => (
        <circle key={x} className="pu-f" style={d(1.5)} cx={x} cy="68.2" r="0.9" fill={i === 0 ? ink(0.9) : ink(0.3)} />
      ))}
      {callL.map((t, i) => (
        <g key={t}>
          {leader(31, 38.5, 24 + i * 24, i)}
          <text className="pu-f" style={d(1.2 + i * 0.2)} x="29.5" y={24.8 + i * 24} textAnchor="end" fontSize="2.1" letterSpacing="0.25" fill={ink(0.65)} fontFamily={MONO}>{clip(t, 12).toUpperCase()}</text>
        </g>
      ))}
      {callR.map((t, i) => (
        <g key={t}>
          {leader(69, 61.5, 36 + i * 24, i + 2)}
          <text className="pu-f" style={d(1.4 + i * 0.2)} x="70.5" y={36.8 + i * 24} fontSize="2.1" letterSpacing="0.25" fill={ink(0.65)} fontFamily={MONO}>{clip(t, 12).toUpperCase()}</text>
        </g>
      ))}
      <g className="pu-f" style={d(1.7)}>
        <path d="M36 76.6H64M36 75.4v2.4M64 75.4v2.4" stroke={ink(0.35)} strokeWidth="0.25" />
        <text x="50" y="79.6" textAnchor="middle" fontSize="1.9" letterSpacing="0.25" fill={ink(0.45)} fontFamily={MONO}>72 MM</text>
      </g>
      {play && (
        <g className="pu-f" style={d(1.9)}>
          <circle cx="67" cy="14" r="0.95" fill={T.lime} />
          <text x="69.6" y="14.8" fontSize="2.3" letterSpacing="0.25" fill={ink(0.9)} fontFamily={MONO}>GOOGLE PLAY</text>
        </g>
      )}
    </>
  );
}

function Browser({ project, hue }: MotifProps) {
  const domain = clip(domainOf(project.liveDemo) || 'localhost', 30);
  const title = project.shortTitle ?? project.title;
  const ruler = `M7 4.6H93${Array.from({ length: 17 }, (_, i) => `M${7 + i * 5.375} 3.6v2`).join('')}`;
  return (
    <>
      <g className="pu-f" style={d(0.1)} fontFamily={MONO} fontSize="1.8" fill={ink(0.42)}>
        <path d={ruler} stroke={ink(0.28)} strokeWidth="0.22" />
        <text x="7" y="2.2">0</text>
        <text x="93" y="2.2" textAnchor="end">1440 PX</text>
      </g>
      <rect className="pu-d" pathLength={1} style={d(0)} x="7" y="8" width="86" height="63" rx="2" fill={BG} stroke={ink(0.7)} strokeWidth="0.45" />
      <path className="pu-f" style={d(0.5)} d="M7 16H93" stroke={ink(0.22)} strokeWidth="0.25" />
      {[11.2, 14.2, 17.2].map((x) => <circle key={x} className="pu-f" style={d(0.5)} cx={x} cy="12" r="0.85" fill={ink(0.32)} />)}
      <rect className="pu-d" pathLength={1} style={d(0.4)} x="23" y="10.1" width="52" height="3.8" rx="1.9" fill={ink(0.04)} stroke={ink(0.3)} strokeWidth="0.25" />
      <circle className="pu-f" style={d(0.9)} cx="26.3" cy="12" r="0.8" fill={T.lime} />
      <text className="pu-f" style={d(0.9)} x="29" y="12.9" fontSize="2.4" fill={ink(0.85)} fontFamily={MONO}>{domain}</text>
      <g className="pu-f" style={d(1)}>
        <circle cx="12.4" cy="21" r="1.3" fill={hue} />
        <path d="M16 21h8" stroke={ink(0.55)} strokeWidth="0.7" strokeLinecap="round" />
        <path d="M62 21h5M70 21h5M78 21h5" stroke={ink(0.3)} strokeWidth="0.6" strokeLinecap="round" />
        <path d="M7 24.2H93" stroke={ink(0.1)} strokeWidth="0.2" />
      </g>
      <text className="pu-f" style={d(1.1)} x="12" y="35" fontSize="5.6" fontWeight="800" fill={ink(0.96)} fontFamily="'Inter Tight', sans-serif" letterSpacing="-0.25">{clip(title, 16)}</text>
      <path className="pu-d" pathLength={1} style={d(1.3)} d="M12 39.4h30M12 42.6h21" stroke={ink(0.3)} strokeWidth="0.9" strokeLinecap="round" />
      <rect className="pu-f" style={d(1.6)} x="12" y="46" width="14" height="4.4" rx="2.2" fill={hue} />
      <rect className="pu-d" pathLength={1} style={d(1.2)} x="58" y="27.4" width="29" height="23" rx="1.4" fill="none" stroke={hue} strokeOpacity="0.8" strokeWidth="0.35" />
      <circle className="pu-f" style={d(1.6)} cx="66" cy="34" r="2.2" fill="none" stroke={ink(0.5)} strokeWidth="0.3" />
      <path className="pu-d" pathLength={1} style={d(1.7)} d="M58 46.4l9-7 6 4.2 5-3.6 9 6.4" fill="none" stroke={ink(0.55)} strokeWidth="0.35" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect className="pu-d" pathLength={1} style={d(1.6 + k * 0.2)} x={12 + k * 26.6} y="54.4" width="23.4" height="13.4" rx="1.2" fill="none" stroke={ink(0.28)} strokeWidth="0.28" />
          <rect className="pu-f" style={d(2 + k * 0.2)} x={12 + k * 26.6} y="54.4" width="23.4" height="5.4" rx="1.2" fill={ink(0.06)} />
          <path className="pu-d" pathLength={1} style={d(2.1 + k * 0.2)} d={`M${14.6 + k * 26.6} 63h13M${14.6 + k * 26.6} 65.4h8`} stroke={ink(0.4)} strokeWidth="0.55" strokeLinecap="round" />
        </g>
      ))}
      <g className="pu-f" style={d(2.4)} fontFamily={MONO} fontSize="1.9" letterSpacing="0.25">
        {['HTTPS', 'RESPONSIVE', 'DEPLOYED'].map((t, i) => (
          <g key={t}>
            <circle cx={8.2 + [0, 12, 34][i]} cy="76.4" r="0.7" fill={i === 2 ? T.lime : ink(0.5)} />
            <text x={10.2 + [0, 12, 34][i]} y="77.1" fill={ink(0.5)}>{t}</text>
          </g>
        ))}
        <text x="93" y="77.1" textAnchor="end" fill={ink(0.35)}>1440 × 900</text>
      </g>
      <g className="pu-cur">
        <path d="M0 0v6.6l1.9-1.7 1.4 3.1 1.4-.6-1.4-3.1 2.6-.1z" fill={ink(0.96)} stroke={BG} strokeWidth="0.35" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Vision({ project, hue }: MotifProps) {
  const corner = (x: number, y: number, sx: number, sy: number) => <path className="pu-d" pathLength={1} style={d(0)} d={`M${x} ${y + sy * 5}V${y}H${x + sx * 5}`} fill="none" stroke={ink(0.9)} strokeWidth="0.5" />;
  const det = [
    { x: 21, y: 24, w: 23, h: 38, t: 'PLASTIC 0.92', main: true, dl: 1.4 },
    { x: 53, y: 17, w: 26, h: 25, t: 'PAPER 0.87', main: false, dl: 2 },
    { x: 50, y: 49, w: 26, h: 16, t: 'METAL 0.90', main: false, dl: 2.6 },
  ];
  const ticks = Array.from({ length: 11 }, (_, i) => `M10 ${8 + i * 6.2}h${i % 5 === 0 ? 2.2 : 1.2}`).join('') + Array.from({ length: 14 }, (_, i) => `M${10 + i * 6.15} 8v${i % 5 === 0 ? 2.2 : 1.2}`).join('');
  const legend = [['PLASTIC', 0.92, 10], ['PAPER', 0.87, 38], ['METAL', 0.9, 66]] as const;
  return (
    <>
      <rect className="pu-f" style={d(0)} x="10" y="8" width="80" height="62" fill={hue} fillOpacity="0.05" />
      <path className="pu-f" style={d(0.4)} d="M36.7 8V70M63.3 8V70M10 28.7H90M10 49.3H90" stroke={ink(0.1)} strokeWidth="0.2" strokeDasharray="0.8 1.6" />
      <path className="pu-f" style={d(0.5)} d={ticks} stroke={ink(0.4)} strokeWidth="0.2" />
      {corner(10, 8, 1, 1)}{corner(90, 8, -1, 1)}{corner(10, 70, 1, -1)}{corner(90, 70, -1, -1)}
      <path className="pu-f" style={d(0.5)} d="M50 37v6M47 40h6" stroke={ink(0.5)} strokeWidth="0.3" />
      <g fill="none" stroke={ink(0.5)} strokeWidth="0.45" strokeLinejoin="round">
        <path className="pu-d" pathLength={1} style={d(0.7)} d="M29.5 29h5v6c3.2 2 4.6 4.4 4.6 8v14.5a1.6 1.6 0 0 1-1.6 1.6H26.5a1.6 1.6 0 0 1-1.6-1.6V43c0-3.6 1.4-6 4.6-8z" />
        <path className="pu-d" pathLength={1} style={d(0.9)} d="M58 23l9-3 8 5 -1 9-8 5-8-5z" />
        <path className="pu-d" pathLength={1} style={d(1.1)} d="M52.5 52.5h15v10h-15zM52.5 55h15M52.5 60h15" />
      </g>
      {det.map((b) => (
        <g key={b.t}>
          <rect className="pu-d" pathLength={1} style={d(b.dl)} x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={b.main ? T.lime : ink(0.75)} strokeWidth="0.55" />
          <g className="pu-f" style={d(b.dl + 0.5)}>
            <rect x={b.x} y={b.y - 4} width={b.t.length * 1.5 + 2.4} height="4" fill={b.main ? T.lime : BG} stroke={b.main ? T.lime : ink(0.75)} strokeWidth="0.35" />
            <text x={b.x + 1.2} y={b.y - 1.2} fontSize="2.3" fontWeight="700" letterSpacing="0.15" fill={b.main ? '#0b0b0d' : ink(0.9)} fontFamily={MONO}>{b.t}</text>
          </g>
        </g>
      ))}
      <g className="pu-scan">
        <rect x="10" y="8" width="80" height="0.4" fill={hue} />
        <rect x="10" y="-3" width="80" height="11" fill="url(#pu-sg)" />
      </g>
      <defs>
        <linearGradient id="pu-sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hue} stopOpacity="0" />
          <stop offset="1" stopColor={hue} stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <g className="pu-f" style={d(0.8)} fontFamily={MONO} fontSize="2.1" letterSpacing="0.2" fill={ink(0.55)}>
        <text x="13.5" y="13.4">CAM 01 · {clip((project.shortTitle ?? project.title).toUpperCase(), 22)}</text>
        <text x="85.5" y="13.4" textAnchor="end">LIVE</text>
        <text x="13.5" y="67.4">640 × 480 · 30 FPS</text>
        <text x="85.5" y="67.4" textAnchor="end">3 OBJECTS</text>
      </g>
      <circle className="pu-f" style={d(0.8)} cx="80.4" cy="12.7" r="0.8" fill={T.lime} />
      <g className="pu-f" style={d(2.8)} fontFamily={MONO} fontSize="1.9" letterSpacing="0.2">
        {legend.map(([n, c, x], i) => (
          <g key={n}>
            <text x={x} y="76.6" fill={ink(0.55)}>{n}</text>
            <rect x={x} y="78.2" width="24" height="0.7" fill={ink(0.12)} />
            <rect x={x} y="78.2" width={24 * c} height="0.7" fill={i === 0 ? T.lime : ink(0.7)} />
            <text x={x + 24} y="76.6" textAnchor="end" fill={ink(0.8)}>{Math.round(c * 100)}%</text>
          </g>
        ))}
      </g>
    </>
  );
}

function Chain({ hue, seed }: MotifProps) {
  const hex = (i: number, n = 6) => Array.from({ length: n }, (_, k) => '0123456789abcdef'[Math.floor(rnd(seed + i * 7 + k) * 16)]).join('');
  const W = 21;
  const H = 19.5;
  const bx = (i: number) => 4 + i * 24;
  const by = (i: number) => 8 + i * 17.5;
  const leaves = [60, 72, 84, 96].map((x) => x - 4);
  const parents = [(leaves[0] + leaves[1]) / 2, (leaves[2] + leaves[3]) / 2];
  const root = (parents[0] + parents[1]) / 2;
  return (
    <>
      {/* merkle tree, top right */}
      <g fontFamily={MONO} fontSize="1.9" letterSpacing="0.25" fill={ink(0.45)}>
        <text className="pu-f" style={d(0.2)} x="56" y="4">MERKLE ROOT</text>
      </g>
      <path className="pu-d" pathLength={1} style={d(0.5)} d={`M${leaves[0]} 26L${parents[0]} 17L${leaves[1]} 26M${leaves[2]} 26L${parents[1]} 17L${leaves[3]} 26M${parents[0]} 17L${root} 9L${parents[1]} 17`} fill="none" stroke={ink(0.35)} strokeWidth="0.3" />
      <g className="pu-f" style={d(0.9)}>
        {leaves.map((x) => <rect key={x} x={x - 1.2} y="25" width="2.4" height="2.4" fill={BG} stroke={ink(0.6)} strokeWidth="0.3" />)}
        {parents.map((x) => <rect key={x} x={x - 1.2} y="16" width="2.4" height="2.4" fill={BG} stroke={ink(0.6)} strokeWidth="0.3" />)}
        <rect x={root - 1.4} y="7.6" width="2.8" height="2.8" fill={BG} stroke={hue} strokeWidth="0.4" />
        <text x={root + 3.4} y="9.9" fontSize="1.9" fill={ink(0.7)} fontFamily={MONO}>#{hex(31, 8)}</text>
      </g>
      {[1, 2, 3].map((i) => (
        <g key={i}>
          <path className="pu-d" pathLength={1} style={d(0.6 + i * 0.5)} d={`M${bx(i - 1) + W} ${by(i - 1) + 9.5}H${bx(i) + W / 2}V${by(i)}`} fill="none" stroke={hue} strokeOpacity="0.85" strokeWidth="0.45" />
          <circle className="pu-f" style={d(1 + i * 0.5)} cx={bx(i) + W / 2} cy={by(i)} r="0.9" fill={hue} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className="pu-d" pathLength={1} style={d(i * 0.5)} x={bx(i)} y={by(i)} width={W} height={H} rx="1" fill={BG} stroke={ink(0.62)} strokeWidth="0.35" />
          <g className="pu-f" style={d(0.3 + i * 0.5)}>
            <rect x={bx(i)} y={by(i)} width={W} height="4.4" rx="1" fill={ink(0.07)} />
            <text x={bx(i) + 1.8} y={by(i) + 3.1} fontSize="2.3" letterSpacing="0.3" fill={ink(0.9)} fontFamily={MONO}>BLOCK {pad2(i + 1)}</text>
            <text x={bx(i) + 1.8} y={by(i) + 9.2} fontSize="2.2" fill={ink(0.9)} fontFamily={MONO}>#{hex(i)}</text>
            <text x={bx(i) + 1.8} y={by(i) + 13} fontSize="2" fill={ink(0.4)} fontFamily={MONO}>{i ? `prev ${hex(i - 1).slice(0, 4)}` : 'genesis'}</text>
            <text x={bx(i) + 1.8} y={by(i) + 16.8} fontSize="2" fill={ink(0.4)} fontFamily={MONO}>nonce {Math.floor(rnd(seed + i) * 9000 + 1000)}</text>
          </g>
        </g>
      ))}
      <g className="pu-f" style={d(2.6)}>
        <circle cx={bx(3) + W - 1.8} cy={by(3) + 2.2} r="0.9" fill={T.lime} />
        <text x={bx(3) + W} y={by(3) - 1.8} textAnchor="end" fontSize="2.1" letterSpacing="0.3" fill={ink(0.5)} fontFamily={MONO}>HEAD</text>
      </g>
      {/* readout, bottom left */}
      <g className="pu-f" style={d(2.2)} fontFamily={MONO} fontSize="2" letterSpacing="0.2" fill={ink(0.45)}>
        <path d="M4 58.5H40" stroke={ink(0.16)} strokeWidth="0.2" />
        <text x="4" y="63">CHAIN HEIGHT</text>
        <text x="40" y="63" textAnchor="end" fill={ink(0.85)}>4</text>
        <text x="4" y="67.6">HASH</text>
        <text x="40" y="67.6" textAnchor="end" fill={ink(0.85)}>SHA-256</text>
        <text x="4" y="72.2">STATUS</text>
        <text x="40" y="72.2" textAnchor="end" fill={T.lime}>VERIFIED</text>
      </g>
    </>
  );
}

function Bars({ hue, seed }: MotifProps) {
  const N = 24;
  const pitch = 3.5;
  const x0 = 11;
  const base = 64;
  const hs = Array.from({ length: N }, (_, k) => 0.12 + rnd(seed + k * 3.7) * 0.88).sort((a, b) => a - b).map((v) => v * 44);
  const order = Array.from({ length: N }, (_, k) => k).sort((a, b) => rnd(seed + a * 1.3 + 9) - rnd(seed + b * 1.3 + 9));
  const slotOf = (k: number) => order.indexOf(k);
  const median = hs[Math.floor(N / 2)];
  let inv = 0;
  for (let a = 0; a < N; a++) for (let b = a + 1; b < N; b++) if (order[a] > order[b]) inv++;
  return (
    <>
      <path className="pu-d" pathLength={1} style={d(0)} d={`M${x0 - 2} ${base}H${x0 + N * pitch}`} stroke={ink(0.5)} strokeWidth="0.3" />
      <g className="pu-f" style={d(0.2)} stroke={ink(0.3)} strokeWidth="0.2">
        {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${x0 + 1.15 + i * 4 * pitch} ${base}v1.4`} />)}
      </g>
      <g className="pu-f" style={d(0.2)} stroke={ink(0.07)} strokeWidth="0.2">
        {[0.25, 0.5, 0.75, 1].map((f) => <path key={f} d={`M${x0 - 2} ${base - f * 44}H${x0 + N * pitch}`} />)}
      </g>
      <g className="pu-f" style={d(0.3)} fontFamily={MONO} fontSize="1.8" fill={ink(0.38)} textAnchor="end">
        <text x={x0 - 3.4} y={base - 22 + 0.6}>50</text>
        <text x={x0 - 3.4} y={base - 44 + 0.6}>100</text>
      </g>
      <g className="pu-f" style={d(2.9)}>
        <line x1={x0 - 2} y1={base - median} x2={x0 + N * pitch} y2={base - median} stroke={hue} strokeWidth="0.3" strokeDasharray="1 1.4" />
        <text x={x0 - 2} y={base - median - 1.4} fontSize="2.1" letterSpacing="0.3" fill={hue} fontFamily={MONO}>MEDIAN</text>
      </g>
      <g className="pu-f" style={d(0.3)}>
        {hs.map((h, k) => (
          <rect
            key={k}
            className="pu-sort"
            style={{ '--x': `${(slotOf(k) - k) * pitch}px` } as React.CSSProperties}
            x={x0 + k * pitch}
            y={base - h}
            width="2.3"
            height={h}
            fill={k === N - 1 ? T.lime : ink(0.78)}
          />
        ))}
      </g>
      <g fontFamily={MONO} fontSize="2.2" letterSpacing="0.3" fill={ink(0.45)}>
        <text className="pu-f" style={d(0.4)} x={x0 - 2} y="14">ARRAY[{N}]</text>
        <text className="pu-f" style={d(0.4)} x={x0 - 2} y="18.2" fontSize="1.9" fill={ink(0.32)}>INVERSIONS {inv} → 0</text>
        <text className="pu-f" style={d(2.8)} x={x0 + N * pitch} y="14" textAnchor="end" fill={T.lime}>SORTED · O(n log n)</text>
        <text className="pu-f" style={d(0.4)} x={x0 - 2} y="70.6" fontSize="2">i = 0</text>
        <text className="pu-f" style={d(0.4)} x={x0 + N * pitch} y="70.6" textAnchor="end" fontSize="2">i = {N - 1}</text>
      </g>
    </>
  );
}

function Motif({ kind, ...rest }: MotifProps & { kind: Kind }) {
  const Custom = SCENES[rest.project.title];
  const M = Custom ?? { network: Network, phone: Phone, browser: Browser, vision: Vision, chain: Chain, bars: Bars }[kind];
  const vb = Custom ? '0 0 100 80' : kind === 'phone' ? '9 0 82 81' : kind === 'vision' ? '0 0 100 82' : kind === 'network' ? '2 0 96 80' : '0 0 100 80';
  return (
    <svg viewBox={vb} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }} aria-hidden>
      <M {...rest} />
    </svg>
  );
}

/* ───────────── the write-up ───────────── */

function Rule({ label, count }: { label: string; count?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: T.faint }}>
      <span style={{ color: T.ink }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: T.line }} />
      {count !== undefined && <span>{pad2(count)}</span>}
    </div>
  );
}

function Section({ label, items, i }: { label: string; items: string[]; i: number }) {
  return (
    <section className="pu-up" style={{ '--i': i, marginTop: 46 } as React.CSSProperties}>
      <Rule label={label} count={items.length} />
      <ul style={{ listStyle: 'none', margin: '6px 0 0', padding: 0 }}>
        {items.map((f, k) => (
          <li key={f} style={{ display: 'grid', gridTemplateColumns: '38px 1fr', padding: '14px 0', borderTop: k ? `1px solid ${T.line}` : 'none' }}>
            <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.2, color: T.faint, paddingTop: 1 }}>{k + 1}</span>
            <span style={{ fontFamily: T.body, fontSize: 15, lineHeight: 1.6, color: 'rgba(237,235,230,0.88)' }}>{f}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const iconBtn: React.CSSProperties = { width: 38, height: 38, borderRadius: '50%', border: `1px solid ${T.line}`, color: T.ink, background: 'transparent', display: 'grid', placeItems: 'center', cursor: 'pointer', minHeight: 0, transition: 'background-color .25s, color .25s, border-color .25s' };

export default function Popup({ project, meta, onClose, onPrev, onNext }: { project: Project; meta: PopupMeta; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const reduced = !!useReducedMotion();
  const hue = hueOf(project.accentColor);
  const seed = meta.num * 3 + 1;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [firstTitle] = React.useState(project.title);
  const base = project.title === firstTitle ? '0.5s' : '0.05s';
  const words = project.title.split(' ');
  const head = words.length > 1 ? words.slice(0, -1).join(' ') : project.title;
  const tail = words.length > 1 ? words[words.length - 1] : '';
  const longest = Math.max(...project.title.split(/[\s\-:/]+/).filter(Boolean).map((t) => t.length));
  const titleSize = Math.max(36, Math.min(60, 620 / (longest * 0.62)));
  const stack = project.techStack;
  const status = project.inDevelopment ? 'In development' : project.liveDemo ? 'Live in production' : project.github ? 'Open source' : project.isNew ? 'Recently shipped' : 'Completed';
  const specs: [string, string][] = [
    ['Discipline', labelOf(project.title, meta.kind)],
    ['Chapter', `${pad2(meta.chapterNo)} — ${meta.chapterName}`],
    ['Status', status],
    ['Link', project.liveDemo ? clip(domainOf(project.liveDemo), 26) : project.github ? 'GitHub repository' : '—'],
  ];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    const on = (e: KeyboardEvent) => {
      const f = e.key === 'Escape' ? onClose : e.key === 'ArrowRight' ? onNext : e.key === 'ArrowLeft' ? onPrev : null;
      if (!f) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      f();
    };
    window.addEventListener('keydown', on, true);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', on, true);
    };
  }, [onClose, onNext, onPrev]);

  let sec = 6;
  const corners: React.CSSProperties[] = [
    { top: 8, left: 8, borderTop: `1px solid ${ink(0.5)}`, borderLeft: `1px solid ${ink(0.5)}` },
    { top: 8, right: 8, borderTop: `1px solid ${ink(0.5)}`, borderRight: `1px solid ${ink(0.5)}` },
    { bottom: 8, left: 8, borderBottom: `1px solid ${ink(0.5)}`, borderLeft: `1px solid ${ink(0.5)}` },
    { bottom: 8, right: 8, borderBottom: `1px solid ${ink(0.5)}`, borderRight: `1px solid ${ink(0.5)}` },
  ];
  return (
    <motion.div className="bk-pop" role="dialog" aria-modal="true" aria-label={project.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.26, ease: 'easeIn' } }} transition={{ duration: 0.3 }} style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'grid', placeItems: 'center', perspective: 1800, overflow: 'hidden', '--b': base } as React.CSSProperties}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 50% 55%, rgba(14,14,16,0.82), rgba(4,4,5,0.92))' }} />

      <motion.div
        className="bk-card"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 110, rotateX: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { opacity: { duration: 0.35 }, default: reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 140, damping: 26, mass: 1 } } }}
        exit={reduced ? { opacity: 0, transition: { duration: 0.2 } } : { opacity: 0, y: 50, rotateX: 12, transition: { duration: 0.26, ease: [0.5, 0, 0.75, 0] } }}
        style={{ position: 'relative', transformOrigin: '50% 100%', background: BG, border: `1px solid ${ink(0.2)}`, borderRadius: 5, boxShadow: `0 40px 70px -36px rgba(0,0,0,0.95), 0 0 0 5px rgba(237,235,230,0.025)`, overflow: 'hidden' }}
      >
        {/* light: one hairline along the top edge, one sheen across the card, both once */}
        <div aria-hidden className="pu-sweep" style={{ position: 'absolute', top: 0, left: 0, width: '35%', height: 1, background: `linear-gradient(90deg, transparent, ${T.lime}, transparent)`, zIndex: 8, pointerEvents: 'none' }} />
        <div aria-hidden className="pu-sheen" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '34%', background: 'linear-gradient(100deg, transparent, rgba(237,235,230,0.07) 50%, transparent)', zIndex: 7, pointerEvents: 'none' }} />
        {/* the inner frame: a second hairline set in from the edge, with corner marks */}
        <div aria-hidden className="pu-frame" style={{ position: 'absolute', inset: 8, border: `1px solid ${ink(0.07)}`, borderRadius: 2, zIndex: 6, pointerEvents: 'none' }} />
        {corners.map((c, i) => <span key={i} aria-hidden className="pu-frame" style={{ position: 'absolute', width: 10, height: 10, zIndex: 6, pointerEvents: 'none', ...c }} />)}

        {/* left: the plate */}
        <div className="bk-plate" style={{ position: 'relative', minHeight: 0, background: `radial-gradient(62% 52% at 50% 50%, ${hue}30, ${hue}0d 55%, transparent 78%), linear-gradient(180deg, #131316, #0F0F11)`, borderRight: `1px solid ${T.line}`, overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${ink(0.04)} 1px, transparent 1px), linear-gradient(90deg, ${ink(0.04)} 1px, transparent 1px)`, backgroundSize: '44px 44px', backgroundPosition: 'center' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 50% 50%, transparent 52%, rgba(0,0,0,0.5))' }} />
          <div className="bk-plate-cap" style={{ position: 'absolute', top: 28, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.faint }}>
            <span>Fig. <span style={{ color: T.ink }}>{pad2(meta.num)}</span></span>
            <span>{labelOf(project.title, meta.kind)}</span>
          </div>
          <div key={project.title} className="bk-motif" style={{ position: 'absolute', left: 30, right: 30, top: 66, bottom: 66 }}>
            <Motif kind={meta.kind} project={project} hue={hue} seed={seed} reduced={reduced} />
          </div>
          <div className="bk-plate-cap" style={{ position: 'absolute', bottom: 28, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.faint }}>
            <span>{clip(project.shortTitle ?? project.title, 26)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.lime }}>
              {project.isNew && <span>New</span>}
              {project.inDevelopment && <span>In dev</span>}
            </span>
          </div>
        </div>

        {/* right: the write-up */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, background: `repeating-linear-gradient(135deg, ${ink(0.014)} 0 1px, transparent 1px 5px), linear-gradient(180deg, ${ink(0.03)}, transparent 220px), ${BG}` }}>
          <div className="bk-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '22px 28px 18px clamp(28px, 3.6vw, 56px)', fontFamily: T.mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.faint }}>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
              <span style={{ whiteSpace: 'nowrap' }}>Entry <span style={{ color: T.ink }}>{pad2(meta.num)}</span> / {pad2(meta.total)}</span>
              <span className="bk-bar-ch" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.75 }}>Ch {pad2(meta.chapterNo)} · {meta.chapterName}</span>
            </span>
            <span style={{ display: 'flex', gap: 8, flex: 'none' }}>
              <button type="button" aria-label="Previous project" onClick={onPrev} className="bk-btn" style={iconBtn}><ArrowLeft size={15} /></button>
              <button type="button" aria-label="Next project" onClick={onNext} className="bk-btn" style={iconBtn}><ArrowRight size={15} /></button>
              <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} data-cursor-text="CLOSE" className="bk-btn" style={{ ...iconBtn, width: 'auto', padding: '0 14px', borderRadius: 19, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.18em' }}>
                ESC <X size={14} />
              </button>
            </span>
            <span aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: T.line }}>
              <span style={{ position: 'absolute', inset: 0, background: T.lime, transformOrigin: 'left center', transform: `scaleX(${meta.num / meta.total})`, transition: 'transform .7s cubic-bezier(.16,1,.3,1)' }} />
            </span>
          </div>

          <div key={project.title} className="bk-scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '36px clamp(28px, 3.6vw, 56px) 56px' }}>
            <div style={{ maxWidth: 680 }}>
              <div className="pu-up" style={{ '--i': 0, display: 'flex', alignItems: 'center', gap: 12, fontFamily: T.mono, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: T.faint } as React.CSSProperties}>
                <span style={{ width: 6, height: 6, background: T.lime }} />
                {meta.chapterName}
                {project.isNew && <span style={{ color: T.lime }}>· New</span>}
                {project.inDevelopment && <span style={{ color: T.lime }}>· In development</span>}
              </div>
              <h2 className="pu-up" style={{ '--i': 1, margin: '18px 0 0', fontFamily: T.sans, fontWeight: 800, fontSize: titleSize, lineHeight: 0.96, letterSpacing: '-0.045em', color: T.ink, textWrap: 'balance', overflowWrap: 'anywhere' } as React.CSSProperties}>
                {head}
                {tail && (
                  <>
                    {' '}
                    <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em' }}>{tail}</span>
                  </>
                )}
              </h2>

              <div className="pu-up" style={{ '--i': 2, margin: '30px 0 0', display: 'grid', gridTemplateColumns: '26px 1fr', columnGap: 16 } as React.CSSProperties}>
                <span aria-hidden style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 54, lineHeight: 0.8, color: T.lime, opacity: 0.9 }}>“</span>
                <p style={{ margin: 0, fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(21px, 1.9vw, 27px)', lineHeight: 1.28, letterSpacing: '-0.005em', color: T.ink }}>{project.description}</p>
              </div>
              {project.detailedDescription && <p className="pu-up" style={{ '--i': 3, margin: '22px 0 0', fontFamily: T.body, fontSize: 15, lineHeight: 1.78, color: T.dim } as React.CSSProperties}>{project.detailedDescription}</p>}

              {(project.liveDemo || project.github) && (
                <div className="pu-up" style={{ '--i': 4, display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 } as React.CSSProperties}>
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="bk-cta bk-cta-solid">
                      Visit live <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="bk-cta bk-cta-line">
                      Source code <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              )}

              {/* the spec sheet */}
              <dl className="pu-up bk-spec" style={{ '--i': 5, margin: '40px 0 0', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 28, borderBottom: `1px solid ${T.line}` } as React.CSSProperties}>
                {specs.map(([k, v]) => (
                  <div key={k} style={{ borderTop: `1px solid ${T.line}`, padding: '13px 0 14px', minWidth: 0 }}>
                    <dt style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: T.faint }}>{k}</dt>
                    <dd style={{ margin: '6px 0 0', fontFamily: T.sans, fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em', color: T.ink, overflowWrap: 'anywhere' }}>{k === 'Status' && (project.liveDemo || project.inDevelopment) ? <><span aria-hidden style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: T.lime, marginRight: 9, verticalAlign: 'middle', position: 'relative', top: -1 }} />{v}</> : v}</dd>
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${T.line}`, padding: '13px 0 14px' }}>
                  <dt style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: T.faint }}>Stack</dt>
                  <dd style={{ margin: '6px 0 0', fontFamily: T.sans, fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em', color: T.ink }}>{stack.slice(0, 4).join(' · ')}{stack.length > 4 && <span style={{ color: T.faint, fontWeight: 500 }}> +{stack.length - 4}</span>}</dd>
                </div>
              </dl>

              {project.features && project.features.length > 0 && <Section label="Features" items={project.features} i={sec++} />}
              {project.challenges && project.challenges.length > 0 && <Section label="Challenges" items={project.challenges} i={sec++} />}
              {project.learnings && project.learnings.length > 0 && <Section label="Learnings" items={project.learnings} i={sec++} />}

              <section className="pu-up" style={{ '--i': sec, marginTop: 46 } as React.CSSProperties}>
                <Rule label="Built with" count={stack.length} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                  {stack.map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: T.mono, fontSize: 12, padding: '8px 12px', border: `1px solid ${T.line}`, background: ink(0.025), borderRadius: 2, color: 'rgba(237,235,230,0.88)' }}>
                      {techIcons[t] && <span style={{ color: T.faint, display: 'flex' }}>{techIcons[t]}</span>}
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .bk-card { width: min(1280px, calc(100vw - 48px)); height: min(720px, calc(100svh - 48px)); display: grid; grid-template-columns: 6fr 7fr; }
        .bk-scroll { scrollbar-width: thin; scrollbar-color: rgba(237,235,230,.18) transparent; }
        .bk-btn:hover, .bk-btn:focus-visible { background: ${T.lime}; border-color: ${T.lime}; color: #0b0b0d; outline: none; }
        .bk-cta { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; font-family: ${T.mono}; font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; text-decoration: none; min-height: 0; border-radius: 2px; transition: background-color .25s, color .25s, border-color .25s; }
        .bk-cta-solid { background: ${T.lime}; color: #0b0b0d; border: 1px solid ${T.lime}; }
        .bk-cta-solid:hover, .bk-cta-solid:focus-visible { background: ${T.ink}; border-color: ${T.ink}; outline: none; }
        .bk-cta-line { color: ${T.ink}; border: 1px solid rgba(237,235,230,.32); }
        .bk-cta-line:hover, .bk-cta-line:focus-visible { border-color: ${T.lime}; color: ${T.lime}; outline: none; }
        @media (max-width: 860px) {
          .bk-card { width: calc(100vw - 20px); height: calc(100svh - 20px); grid-template-columns: 1fr; grid-template-rows: 34% minmax(0, 1fr); }
          .bk-plate { border-right: 0 !important; border-bottom: 1px solid ${T.line}; }
          .bk-plate-cap { display: none !important; }
          .bk-motif { left: 14px !important; right: 14px !important; top: 14px !important; bottom: 14px !important; }
          .bk-bar { padding: 14px 14px 12px 20px !important; }
          .bk-bar-ch { display: none; }
          .bk-scroll { padding: 26px 20px 44px !important; }
        }
        .pu-d { stroke-dasharray: 1; animation: pu-draw 1.3s var(--e, cubic-bezier(.16,1,.3,1)) backwards; animation-delay: calc(var(--b, .5s) + var(--d, 0s)); }
        .pu-f { animation: pu-fade .9s ease backwards; animation-delay: calc(var(--b, .5s) + var(--d, 0s)); }
        .pu-up { animation: pu-up .9s cubic-bezier(.16,1,.3,1) backwards; animation-delay: calc(var(--b, .5s) + .15s + var(--i, 0) * .07s); }
        .pu-frame { animation: pu-fade .8s ease .15s backwards; }
        .pu-sweep { opacity: 0; animation: pu-sweep 1.5s cubic-bezier(.4,0,.2,1) .35s backwards; }
        .pu-sheen { opacity: 0; animation: pu-sheen 1.9s cubic-bezier(.4,0,.2,1) .55s backwards; }
        .pu-sort { animation: pu-sort 2.2s cubic-bezier(.65,0,.35,1) backwards; animation-delay: calc(var(--b, .5s) + .7s); }
        .pu-sel { animation: pu-sel 12s cubic-bezier(.65,0,.35,1) infinite; animation-delay: calc(var(--b, .5s) + 2.2s); }
        .pu-cur { transform: translate(70px, 62px); animation: pu-cur 11s cubic-bezier(.65,0,.35,1) infinite; animation-delay: calc(var(--b, .5s) + 3s); }
        .pu-scan { animation: pu-scan 7s ease-in-out infinite; animation-delay: calc(var(--b, .5s) + .6s); }
        @keyframes pu-draw { from { stroke-dashoffset: 1; } }
        @keyframes pu-fade { from { opacity: 0; } }
        @keyframes pu-up { from { opacity: 0; transform: translateY(16px); } }
        @keyframes pu-sweep { from { transform: translateX(-100%); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } to { transform: translateX(290%); opacity: 0; } }
        @keyframes pu-sheen { from { transform: translateX(-100%); opacity: 0; } 25% { opacity: 1; } 75% { opacity: 1; } to { transform: translateX(300%); opacity: 0; } }
        @keyframes pu-sort { from { transform: translateX(var(--x)); } }
        @keyframes pu-sel { 0%, 20% { transform: translateY(0); } 25%, 45% { transform: translateY(11.3px); } 50%, 70% { transform: translateY(22.6px); } 75%, 95% { transform: translateY(33.9px); } 100% { transform: translateY(0); } }
        @keyframes pu-cur { 0%, 4% { transform: translate(70px, 62px); } 22%, 28% { transform: translate(20px, 49px); } 31% { transform: translate(20px, 49px) scale(.86); } 34% { transform: translate(20px, 49px); } 56%, 62% { transform: translate(44px, 62px); } 82%, 100% { transform: translate(70px, 62px); } }
        @keyframes pu-scan { 0% { transform: translateY(0); opacity: 0; } 8% { opacity: 1; } 46% { opacity: 1; } 54%, 100% { transform: translateY(62px); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .pu-d, .pu-f, .pu-up, .pu-frame, .pu-sweep, .pu-sheen, .pu-sort, .pu-sel, .pu-cur, .pu-scan { animation: none !important; }
          .pu-sweep, .pu-sheen, .pu-scan { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
