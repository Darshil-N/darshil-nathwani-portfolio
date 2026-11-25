/**
 * Scenes.tsx — a figure of its own for each of the AI projects, so no two pop-ups show the same picture.
 * Each is a fragment of an SVG with a 100 x 80 viewBox, drawn with the pop-up's draw-in classes (`pu-d`, `pu-f`) and nothing
 * heavier: no filters, no blend modes, no per-frame work.
 */
import React from 'react';
import { T } from './tokens';
import type { Project } from '../../data/projects';

export type SceneProps = { project: Project; hue: string; seed: number; reduced: boolean };

const MONO = "'JetBrains Mono', monospace";
const BG = '#0E0E10';
const ink = (a: number) => `rgba(237,235,230,${a})`;
const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;
const rnd = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const hexPath = (cx: number, cy: number, r: number) => Array.from({ length: 6 }, (_, i) => { const a = ((60 * i - 30) * Math.PI) / 180; return `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`; }).join('') + 'Z';

const Cap = ({ x, y, t, c = 0.5, size = 2.1, anchor = 'start', delay = 0.8 }: { x: number; y: number; t: string; c?: number; size?: number; anchor?: 'start' | 'middle' | 'end'; delay?: number }) => (
  <text className="pu-f" style={d(delay)} x={x} y={y} fontSize={size} textAnchor={anchor} letterSpacing="0.22" fill={ink(c)} fontFamily={MONO}>{t}</text>
);

/* Drishti-AI: a question in plain words, the SQL it becomes, and the camera frame it is run against */
function Drishti({ hue }: SceneProps) {
  return (
    <>
      <rect className="pu-f" style={d(0.1)} x="6" y="5" width="88" height="11" fill="none" stroke={ink(0.55)} strokeWidth="0.35" />
      <text className="pu-f" style={d(0.4)} x="9" y="11.7" fontSize="2.6" fill={ink(0.9)} fontFamily={MONO}>show incidents near the library after 10 pm</text>
      <rect className="pu-f" style={d(1.4)} x="85" y="8" width="1.1" height="5" fill={T.lime} />
      <path className="pu-d" pathLength={1} style={d(1.1)} d="M24 17v7" stroke={hue} strokeWidth="0.5" />
      <rect className="pu-f" style={d(1.4)} x="6" y="24" width="42" height="35" fill={ink(0.04)} stroke={ink(0.35)} strokeWidth="0.3" />
      {['SELECT camera, ts, label', 'FROM incidents', "WHERE zone = 'library'", "  AND hour >= 22", 'ORDER BY ts DESC;'].map((l, i) => (
        <text key={i} className="pu-f" style={d(1.7 + i * 0.18)} x="9" y={31 + i * 5.2} fontSize="2.3" fill={i === 0 || i === 4 ? T.lime : ink(0.8)} fontFamily={MONO}>{l}</text>
      ))}
      <rect className="pu-f" style={d(1.6)} x="52" y="24" width="42" height="35" fill={hue} fillOpacity="0.1" stroke={ink(0.35)} strokeWidth="0.3" />
      <path className="pu-f" style={d(1.9)} d="M52 49l10-8 8 5 9-9 15 12" fill="none" stroke={ink(0.3)} strokeWidth="0.3" />
      <rect className="pu-d" pathLength={1} style={d(2.4)} x="68" y="32" width="12" height="17" fill="none" stroke={T.lime} strokeWidth="0.5" />
      <Cap x={68} y={30.6} t="PERSON .91" c={0.85} size={1.9} delay={2.8} />
      <Cap x={55} y={28} t="CAM 04 · 22:14" c={0.5} size={1.9} delay={2.2} />
      <rect className="pu-f" style={d(3)} x="6" y="66" width="88" height="2.2" fill={ink(0.1)} />
      <rect className="pu-f" style={d(3.1)} x="6" y="66" width="82" height="2.2" fill={hue} fillOpacity="0.85" />
      <Cap x={6} y={73.5} t="QUERY ACCURACY" delay={3.2} />
      <Cap x={94} y={73.5} t="93%" c={0.95} anchor="end" delay={3.3} />
    </>
  );
}

/* Disha AI: a city cut into hexagonal cells, each one scored, the best ones ranked */
function Disha({ hue, seed }: SceneProps) {
  const r = 7.2;
  const cells: { x: number; y: number; s: number; k: number }[] = [];
  for (let row = 0; row < 6; row++) for (let col = 0; col < 9; col++) {
    const x = 10 + col * r * 1.732 + (row % 2) * r * 0.866;
    const y = 10 + row * r * 1.5;
    if (x > 92 || ((col - 4) ** 2 + (row - 2.5) ** 2) > 14) continue;
    cells.push({ x, y, s: rnd(seed + row * 9 + col) * 0.65 + 0.12 + Math.max(0, 1 - Math.hypot(col - 5, row - 2.5) / 4) * 0.25, k: row * 9 + col });
  }
  const top = [...cells].sort((a, b) => b.s - a.s).slice(0, 3);
  return (
    <>
      {cells.map((c) => (
        <path key={c.k} className="pu-f" style={d(0.2 + (c.x + c.y) * 0.012)} d={hexPath(c.x, c.y, r * 0.93)} fill={hue} fillOpacity={0.06 + c.s * 0.5} stroke={ink(0.3)} strokeWidth="0.25" />
      ))}
      {top.map((c, i) => (
        <g key={c.k}>
          <path className="pu-d" pathLength={1} style={d(1.7 + i * 0.3)} d={hexPath(c.x, c.y, r * 0.93)} fill="none" stroke={T.lime} strokeWidth="0.55" />
          <circle className="pu-f" style={d(2.1 + i * 0.3)} cx={c.x} cy={c.y} r="2.3" fill={T.lime} />
          <text className="pu-f" style={d(2.2 + i * 0.3)} x={c.x} y={c.y + 0.9} fontSize="2.6" fontWeight="700" textAnchor="middle" fill="#0b0b0d" fontFamily={MONO}>{i + 1}</text>
        </g>
      ))}
      <Cap x={6} y={72} t="H3 CELLS · 9 SIGNALS" delay={1.2} />
      <rect className="pu-f" style={d(1.3)} x="6" y="75" width="30" height="1.6" fill={`url(#dg)`} />
      <defs><linearGradient id="dg"><stop offset="0" stopColor={hue} stopOpacity="0.1" /><stop offset="1" stopColor={hue} stopOpacity="0.85" /></linearGradient></defs>
      <Cap x={94} y={76.4} t="SCORE ▸" anchor="end" delay={1.3} />
    </>
  );
}

/* Saarthi: three records for one material, read, matched and folded into a single code */
function Saarthi({ hue }: SceneProps) {
  const docs = ['BOLT HEX M12 ZN', 'HEX BOLT 12MM ZINC', 'BOLT, HEXAGON M-12'];
  return (
    <>
      {docs.map((t, i) => (
        <g key={i}>
          <rect className="pu-f" style={d(0.2 + i * 0.25)} x="5" y={9 + i * 19} width="34" height="15" fill={ink(0.05)} stroke={ink(0.4)} strokeWidth="0.3" />
          <text className="pu-f" style={d(0.5 + i * 0.25)} x="8" y={15.6 + i * 19} fontSize="2.4" fill={ink(0.9)} fontFamily={MONO}>{t}</text>
          <path className="pu-d" pathLength={1} style={d(0.7 + i * 0.25)} d={`M8 ${19.4 + i * 19}h${16 - i * 2}`} stroke={ink(0.3)} strokeWidth="0.5" />
          <path className="pu-d" pathLength={1} style={d(1.6 + i * 0.2)} d={`M39 ${16.5 + i * 19}C52 ${16.5 + i * 19} 50 40 62 40`} fill="none" stroke={hue} strokeWidth="0.45" />
        </g>
      ))}
      <rect className="pu-f" style={d(1.8)} x="58" y="32" width="9" height="16" fill={BG} stroke={hue} strokeWidth="0.45" />
      <Cap x={62.5} y={41} t="=" c={0.95} size={4} anchor="middle" delay={2} />
      <path className="pu-d" pathLength={1} style={d(2.1)} d="M67 40h7" stroke={T.lime} strokeWidth="0.5" />
      <rect className="pu-f" style={d(2.4)} x="74" y="28" width="22" height="24" fill={T.lime} fillOpacity="0.1" stroke={T.lime} strokeWidth="0.5" />
      <Cap x={85} y={36} t="CNMC" c={0.7} size={1.9} anchor="middle" delay={2.6} />
      <text className="pu-f" style={d(2.7)} x="85" y="43" fontSize="3.2" fontWeight="700" textAnchor="middle" fill={T.lime} fontFamily={MONO}>4012</text>
      <text className="pu-f" style={d(2.8)} x="85" y="48.6" fontSize="3.2" fontWeight="700" textAnchor="middle" fill={T.lime} fontFamily={MONO}>8873</text>
      <Cap x={6} y={72} t="OCR  ›  MATCH  ›  DEDUPLICATE" delay={1.2} />
      <Cap x={94} y={72} t="3 → 1" c={0.95} anchor="end" delay={2.9} />
    </>
  );
}

/* Pravaah AI: two groups, their outcome rates, and the fairness metrics held against a threshold */
function Pravaah({ hue }: SceneProps) {
  const rows = [{ k: 'GROUP A', v: 0.74, y: 10 }, { k: 'GROUP B', v: 0.58, y: 23 }];
  const metrics = [{ k: 'DEMOGRAPHIC PARITY', v: 0.78, y: 46 }, { k: 'EQUAL OPPORTUNITY', v: 0.91, y: 56 }, { k: 'DISPARATE IMPACT', v: 0.84, y: 66 }];
  return (
    <>
      {rows.map((r, i) => (
        <g key={r.k}>
          <Cap x={6} y={r.y + 4} t={r.k} c={0.6} delay={0.3 + i * 0.2} />
          <rect className="pu-f" style={d(0.4 + i * 0.2)} x="26" y={r.y} width="62" height="6" fill={ink(0.07)} />
          <rect className="pu-f" style={d(0.7 + i * 0.2)} x="26" y={r.y} width={62 * r.v} height="6" fill={i ? hue : T.lime} fillOpacity={i ? 0.85 : 0.9} />
          <Cap x={94} y={r.y + 4.3} t={`${Math.round(r.v * 100)}%`} c={0.9} anchor="end" delay={1} />
        </g>
      ))}
      <path className="pu-d" pathLength={1} style={d(1.2)} d="M26 33.5h68" stroke={ink(0.25)} strokeWidth="0.25" strokeDasharray="1 1.4" />
      <Cap x={6} y={40.4} t="FAIRNESS METRICS · THRESHOLD 0.80" delay={1.3} />
      {metrics.map((m, i) => (
        <g key={m.k}>
          <Cap x={6} y={m.y + 3.6} t={m.k} c={0.6} size={1.9} delay={1.5 + i * 0.2} />
          <rect className="pu-f" style={d(1.6 + i * 0.2)} x="46" y={m.y} width="42" height="4.6" fill={ink(0.07)} />
          <rect className="pu-f" style={d(1.8 + i * 0.2)} x="46" y={m.y} width={42 * m.v} height="4.6" fill={m.v >= 0.8 ? T.lime : hue} />
          <Cap x={94} y={m.y + 3.7} t={m.v.toFixed(2)} c={0.9} anchor="end" delay={2} />
        </g>
      ))}
      <path className="pu-d" pathLength={1} style={d(2.2)} d="M79.6 43.5v26" stroke={T.lime} strokeWidth="0.4" />
    </>
  );
}

/* Sanjeevani: a patient's vitals, the risk read from them, and the guard that defers to a clinician */
function Sanjeevani({ hue }: SceneProps) {
  const beat = (x: number) => `L${x} 24 L${x + 2} 24 L${x + 3} 21 L${x + 5} 24 L${x + 8} 24 L${x + 9.5} 29 L${x + 11} 7 L${x + 12.5} 32 L${x + 14} 24 L${x + 18} 24 L${x + 20} 20 L${x + 23} 24`;
  const ecg = `M6 24${beat(10)}${beat(36)}${beat(62)} L94 24`;
  return (
    <>
      <rect className="pu-f" style={d(0.1)} x="5" y="6" width="90" height="36" fill={ink(0.03)} stroke={ink(0.3)} strokeWidth="0.3" />
      {[16, 24, 32].map((y) => <path key={y} className="pu-f" style={d(0.3)} d={`M5 ${y}h90`} stroke={ink(0.08)} strokeWidth="0.2" />)}
      <path className="pu-d" pathLength={1} style={{ ...d(0.5), ['--e' as string]: 'cubic-bezier(.4,0,.2,1)' }} d={ecg} fill="none" stroke={T.lime} strokeWidth="0.6" strokeLinejoin="round" />
      <Cap x={8} y={10} t="ECG · II" c={0.6} delay={0.7} />
      {[['HR', '88', 'bpm'], ['SpO₂', '96', '%'], ['BP', '118/76', ''], ['TEMP', '37.4', '°C']].map(([k, v, u], i) => (
        <g key={k}>
          <Cap x={7 + i * 22} y={50} t={k} c={0.5} delay={1.2 + i * 0.15} />
          <text className="pu-f" style={d(1.3 + i * 0.15)} x={7 + i * 22} y={58} fontSize="5" fontWeight="700" fill={ink(0.95)} fontFamily={MONO}>{v}<tspan fontSize="2" fill={ink(0.5)}> {u}</tspan></text>
        </g>
      ))}
      <path className="pu-f" style={d(2)} d="M6 63h88" stroke={ink(0.2)} strokeWidth="0.25" />
      <rect className="pu-f" style={d(2.1)} x="6" y="66" width="39" height="10" fill={hue} fillOpacity="0.12" stroke={hue} strokeWidth="0.4" />
      <Cap x={9} y={72.2} t="RISK · MODERATE" c={0.9} delay={2.3} />
      <rect className="pu-f" style={d(2.4)} x="49" y="66" width="45" height="10" fill="none" stroke={T.lime} strokeWidth="0.4" strokeDasharray="1.2 1" />
      <Cap x={52} y={72.2} t="OUTLIER · DEFER TO CLINICIAN" c={0.9} size={1.9} delay={2.6} />
    </>
  );
}

/* NETRA: ten thousand simulated years of loss, and the expected annual loss read off the curve */
function Netra({ hue, seed }: SceneProps) {
  const bars = Array.from({ length: 26 }, (_, i) => { const x = (i + 1) / 27; return Math.max(0.03, Math.exp(-Math.pow(Math.log(x * 3.2 + 0.2) + 0.55, 2) / 0.5) * (0.9 + rnd(seed + i) * 0.12)); });
  const mean = 8;
  return (
    <>
      <path className="pu-d" pathLength={1} style={d(0.2)} d="M6 56H94M6 8V56" stroke={ink(0.4)} strokeWidth="0.3" />
      {bars.map((h, i) => (
        <rect key={i} className="pu-f" style={d(0.3 + i * 0.045)} x={7 + i * 3.3} y={56 - h * 44} width="2.5" height={h * 44} fill={i >= 19 ? T.lime : hue} fillOpacity={i >= 19 ? 0.95 : 0.7} />
      ))}
      <path className="pu-d" pathLength={1} style={d(1.7)} d={`M${7 + mean * 3.3 + 1.2} 6V56`} stroke={ink(0.9)} strokeWidth="0.35" strokeDasharray="1.2 1.2" />
      <Cap x={7 + mean * 3.3 + 3} y={9} t="EXPECTED ANNUAL LOSS" c={0.9} size={1.9} delay={2} />
      <path className="pu-d" pathLength={1} style={d(2.1)} d="M69.6 18V56" stroke={T.lime} strokeWidth="0.35" strokeDasharray="1.2 1.2" />
      <Cap x={71} y={21} t="95TH PERCENTILE" c={0.9} size={1.9} delay={2.4} />
      <Cap x={6} y={63} t="LOSS  ›" delay={1} />
      <Cap x={94} y={63} t="10,000 RUNS" anchor="end" delay={1} />
      {[['FAIR', 'FRAMEWORK'], ['MONTE CARLO', 'SIMULATION'], ['EAL', 'RESULT']].map(([a, b], i) => (
        <g key={a}>
          <rect className="pu-f" style={d(2.6 + i * 0.2)} x={6 + i * 30} y="68" width="28" height="9" fill="none" stroke={ink(0.35)} strokeWidth="0.3" />
          <Cap x={9 + i * 30} y={72} t={a} c={0.95} size={1.9} delay={2.8 + i * 0.2} />
          <Cap x={9 + i * 30} y={75.2} t={b} c={0.45} size={1.6} delay={2.9 + i * 0.2} />
        </g>
      ))}
    </>
  );
}

/* Siddhi: how a lending-risk score is built, one feature at a time (a SHAP waterfall) */
function Siddhi({ hue }: SceneProps) {
  const steps = [{ k: 'REPAYMENT HISTORY', v: +0.18 }, { k: 'UTILISATION', v: -0.09 }, { k: 'TENURE', v: +0.07 }, { k: 'INCOME STABILITY', v: +0.11 }, { k: 'RECENT ENQUIRIES', v: -0.05 }];
  let acc = 0.4;
  const rows = steps.map((s, i) => { const from = acc; acc += s.v; return { ...s, from, to: acc, y: 14 + i * 9.5 }; });
  const X = (v: number) => 34 + v * 58;
  return (
    <>
      <Cap x={6} y={8} t="BASE RATE" c={0.55} delay={0.2} />
      <path className="pu-d" pathLength={1} style={d(0.3)} d={`M${X(0.4)} 10V${14 + steps.length * 9.5 + 2}`} stroke={ink(0.35)} strokeWidth="0.25" strokeDasharray="1 1.2" />
      {rows.map((r, i) => (
        <g key={r.k}>
          <Cap x={6} y={r.y + 4} t={r.k} c={0.65} size={1.8} delay={0.5 + i * 0.2} />
          <rect className="pu-f" style={d(0.7 + i * 0.22)} x={X(Math.min(r.from, r.to))} y={r.y} width={Math.abs(r.to - r.from) * 58} height="6" fill={r.v > 0 ? T.lime : hue} fillOpacity={r.v > 0 ? 0.9 : 0.8} />
          <Cap x={X(Math.max(r.from, r.to)) + 2} y={r.y + 4.2} t={`${r.v > 0 ? '+' : '−'}${Math.abs(r.v).toFixed(2)}`} c={0.85} size={1.9} delay={1 + i * 0.22} />
        </g>
      ))}
      <path className="pu-d" pathLength={1} style={d(2)} d={`M${X(acc)} 12V${14 + steps.length * 9.5 + 2}`} stroke={T.lime} strokeWidth="0.45" />
      <rect className="pu-f" style={d(2.2)} x="6" y="68" width="88" height="9" fill="none" stroke={ink(0.3)} strokeWidth="0.3" />
      <Cap x={9} y={73.8} t="RISK SCORE" c={0.6} delay={2.4} />
      <text className="pu-f" style={d(2.5)} x="91" y="75" fontSize="5.2" fontWeight="700" textAnchor="end" fill={T.lime} fontFamily={MONO}>{acc.toFixed(2)}</text>
      <Cap x={34} y={73.8} t="1.8M+ RECORDS · XGBOOST" c={0.55} size={1.8} delay={2.6} />
    </>
  );
}

/* Kara-AI: a candidate read on three channels at once: voice, face and posture */
function Kara({ hue }: SceneProps) {
  const wave = Array.from({ length: 30 }, (_, i) => 3 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.31)) * 12);
  const face = [[0, 0], [-4, -3], [4, -3], [-3, 3], [3, 3], [0, 5], [-6, 0], [6, 0], [0, -7], [-3, -5], [3, -5]];
  return (
    <>
      <rect className="pu-f" style={d(0.1)} x="5" y="5" width="36" height="42" fill={hue} fillOpacity="0.1" stroke={ink(0.35)} strokeWidth="0.3" />
      <circle className="pu-f" style={d(0.4)} cx="23" cy="22" r="10" fill="none" stroke={ink(0.4)} strokeWidth="0.3" />
      {face.map(([x, y], i) => <circle key={i} className="pu-f" style={d(0.8 + i * 0.07)} cx={23 + x * 1.1} cy={22 + y * 1.1} r="0.7" fill={T.lime} />)}
      <path className="pu-d" pathLength={1} style={d(1.4)} d="M23 33v7M17 36h12M23 40l-5 6M23 40l5 6" fill="none" stroke={ink(0.7)} strokeWidth="0.45" strokeLinecap="round" />
      <rect className="pu-d" pathLength={1} style={d(1.6)} x="10" y="9" width="26" height="36" fill="none" stroke={T.lime} strokeWidth="0.45" />
      <Cap x={10} y={7.6} t="YOLOV8 · PERSON" c={0.85} size={1.7} delay={2} />
      <Cap x={48} y={9} t="SPEECH" c={0.6} delay={0.6} />
      {wave.map((h, i) => <rect key={i} className="pu-f" style={d(0.7 + i * 0.03)} x={48 + i * 1.5} y={26 - h} width="0.9" height={h * 2} fill={i % 7 === 3 ? T.lime : ink(0.7)} />)}
      <Cap x={48} y={44} t="PACE 138 WPM · FILLERS 3" c={0.55} size={1.8} delay={1.8} />
      {[['EYE CONTACT', 0.82], ['POSTURE', 0.9], ['CLARITY', 0.74]].map(([k, v], i) => (
        <g key={k as string}>
          <Cap x={5} y={57 + i * 7.5} t={k as string} c={0.65} size={1.9} delay={2 + i * 0.2} />
          <rect className="pu-f" style={d(2.1 + i * 0.2)} x="32" y={54 + i * 7.5} width="52" height="3.4" fill={ink(0.08)} />
          <rect className="pu-f" style={d(2.3 + i * 0.2)} x="32" y={54 + i * 7.5} width={52 * (v as number)} height="3.4" fill={i === 1 ? T.lime : hue} />
          <Cap x={94} y={57 + i * 7.5} t={`${Math.round((v as number) * 100)}`} c={0.9} anchor="end" delay={2.5} />
        </g>
      ))}
    </>
  );
}

/* the chatbot: a half-finished question, the resources it finds, and where they sit among the others */
function Chatbot({ hue, seed }: SceneProps) {
  const dots = Array.from({ length: 34 }, (_, i) => ({ x: 56 + rnd(seed + i) * 38, y: 8 + rnd(seed + i * 3) * 36 }));
  const near = [...dots].sort((a, b) => Math.hypot(a.x - 78, a.y - 22) - Math.hypot(b.x - 78, b.y - 22)).slice(0, 3);
  return (
    <>
      <rect className="pu-f" style={d(0.2)} x="5" y="8" width="42" height="12" rx="2" fill={ink(0.07)} stroke={ink(0.4)} strokeWidth="0.3" />
      <text className="pu-f" style={d(0.5)} x="8" y="15.2" fontSize="2.4" fill={ink(0.9)} fontFamily={MONO}>need to build a login page</text>
      <rect className="pu-f" style={d(1.1)} x="53" y="24" width="42" height="9" rx="2" fill={hue} fillOpacity="0.18" stroke={hue} strokeWidth="0.35" />
      <text className="pu-f" style={d(1.3)} x="56" y="29.8" fontSize="2.3" fill={ink(0.9)} fontFamily={MONO}>which stack, and what for?</text>
      <rect className="pu-f" style={d(1.9)} x="5" y="36" width="30" height="9" rx="2" fill={ink(0.07)} stroke={ink(0.4)} strokeWidth="0.3" />
      <text className="pu-f" style={d(2.1)} x="8" y="41.8" fontSize="2.3" fill={ink(0.9)} fontFamily={MONO}>react, with Firebase</text>
      {dots.map((p, i) => <circle key={i} className="pu-f" style={d(1.5 + i * 0.02)} cx={p.x} cy={p.y + 0} r="0.9" fill={ink(0.35)} transform="translate(0 30)" />)}
      {near.map((p, i) => <circle key={`n${i}`} className="pu-f" style={d(2.6 + i * 0.2)} cx={p.x} cy={p.y + 30} r="1.6" fill={T.lime} />)}
      <circle className="pu-d" pathLength={1} style={d(2.4)} cx="78" cy="52" r="12" fill="none" stroke={T.lime} strokeWidth="0.35" strokeDasharray="1.2 1.2" />
      <Cap x={53} y={33.5} t="EMBEDDING SPACE" delay={1.6} />
      {[['Firebase Auth · docs', '.91'], ['React forms, step by step', '.88'], ['Session cookies explained', '.84']].map(([t, s], i) => (
        <g key={t}>
          <rect className="pu-f" style={d(2.8 + i * 0.2)} x="5" y={52 + i * 8.6} width="44" height="7" fill="none" stroke={ink(0.32)} strokeWidth="0.3" />
          <text className="pu-f" style={d(3 + i * 0.2)} x="7.5" y={56.6 + i * 8.6} fontSize="2.1" fill={ink(0.9)} fontFamily={MONO}>{t}</text>
          <text className="pu-f" style={d(3 + i * 0.2)} x="46.5" y={56.6 + i * 8.6} fontSize="2.1" textAnchor="end" fill={T.lime} fontFamily={MONO}>{s}</text>
        </g>
      ))}
    </>
  );
}

export const SCENES: Record<string, React.FC<SceneProps>> = {
  'Drishti-AI': Drishti,
  'Disha AI': Disha,
  'Saarthi - Material Master': Saarthi,
  'Pravaah AI': Pravaah,
  Sanjeevani,
  'NETRA Platform': Netra,
  'Siddhi AI Platform': Siddhi,
  'Kara-AI Interview Coach': Kara,
  'AI Resource Suggestion Chatbot': Chatbot,
};
