/**
 * pages.tsx — what is printed on the book's pages.
 *
 * A printed object, not an interface: warm near-black stock, fine hairlines, a quiet running head and folio, heavy tightly
 * tracked Inter Tight for names, DM Serif Display italic for the one expressive voice on a page (roman numerals, a
 * subtitle, a pull-quote), Inter for reading. Lime is a single accent (a full stop, a link, a status dot); the only other
 * "metal" is the foil on the cover title and the chapter numerals. Every size is in `cqw` (a percent of the page's own
 * width) so a page keeps its proportions from a phone to a wide screen. Nothing here animates or filters.
 */
import React from 'react';
import { T, foilText, fs, hueOf, type Side } from './tokens';
import { TransitionLink } from '../PageTransition';

/* ───────────── small helpers ───────────── */

const pad2 = (n: number) => String(n).padStart(2, '0');
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty'];
const words = (n: number) => (n < 20 ? ONES[n] : n < 50 ? TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '') : String(n));
const Words = (n: number) => words(n).replace(/^./, (c) => c.toUpperCase());
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const roman = (n: number) => ROMAN[n] ?? String(n);
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** "Raahi: Smart Tourist Safety" -> ["Raahi", "Smart Tourist Safety"]; "Saarthi - Material Master" likewise. */
const splitTitle = (t: string): [string, string] => {
  const m = t.match(/^(.+?)(?::\s+|\s+[-–—]\s+)(.+)$/);
  return m ? [m[1], m[2]] : [t, ''];
};

/** A feature string, read as a sentence. */
const sentence = (s: string) => {
  const t = s.trim().replace(/^./, (c) => c.toUpperCase());
  return /[.!?]$/.test(t) ? t : `${t}.`;
};

/** Chapter copy, written for the page (the page file's blurbs stay as the fallback). */
const CHAPTER_COPY: Record<string, (n: number) => string> = {
  Production: () => 'Five systems with live addresses: two Android apps on the Play Store with web platforms behind them, a chess academy, a client’s site and a procedural 3D portfolio.',
  'AI & ML': (n) => `${Words(n)} projects built around language models, agents and prediction. A published IEEE paper, a bias auditor made of five agents, an ICU assistant that knows when to refuse.`,
  Blockchain: () => 'Two projects where identity has to be provable: a tourist ID anchored on Polygon and worn as an NFC wristband, and a career passport made of verifiable credentials.',
  'Computer Vision': () => 'Two projects that watch a camera feed of rubbish and act on it. One sorts it by category; the other signals a robotic arm to pick it up.',
  'C++ Basics': () => 'Four programs, one language, no frameworks: a rock-paper-scissors game, an ATM, a GST report generator and a stock-market simulator.',
};

export const PAGE_CSS = `
  .bk-scroll { scrollbar-width: none; -ms-overflow-style: none; }
  .bk-scroll::-webkit-scrollbar { display: none; }
  .bk-row .bk-t { transition: color .3s; }
  .bk-row:hover .bk-t, .bk-row:focus-visible .bk-t { color: ${T.lime} !important; }
  .bk-row .bk-arr { display: inline-block; transition: transform .3s cubic-bezier(.22,1,.36,1); }
  .bk-row:hover .bk-arr, .bk-row:focus-visible .bk-arr { transform: translateX(.7cqw); }
  .bk-row:focus-visible { outline: 1px solid rgba(163,230,53,.55); outline-offset: -1px; }
  .bk-lnk { text-decoration: none; transition: color .25s, border-color .25s; }
  .bk-lnk:hover, .bk-lnk:focus-visible { color: ${T.lime} !important; border-color: ${T.lime} !important; }
  .bk-lnk .bk-arr { display: inline-block; transition: transform .3s cubic-bezier(.22,1,.36,1); }
  .bk-lnk:hover .bk-arr { transform: translate(.4cqw, -.4cqw); }
  .bk-lnk-r:hover .bk-arr { transform: translateX(.6cqw); }
`;

/* ───────────── small pieces ───────────── */

/** A quiet mono line: running heads, folios, the occasional label. */
function Mono({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ fontFamily: T.mono, fontSize: fs(7.5, 1.85), letterSpacing: '0.22em', textTransform: 'uppercase', ...style }}>{children}</span>;
}

/** The site's DN mark, redrawn as a plain ring: a thin circle and two letters. */
function Monogram({ size = 10, foil = false }: { size?: number; foil?: boolean }) {
  return (
    <span style={{ width: `${size}cqw`, height: `${size}cqw`, minWidth: 26, minHeight: 26, display: 'inline-grid', placeItems: 'center', border: `1px solid ${foil ? 'rgba(214,208,188,0.5)' : T.line}`, borderRadius: '50%' }}>
      <span style={{ fontFamily: T.sans, fontWeight: 800, fontSize: `${size * 0.36}cqw`, letterSpacing: '-0.05em', lineHeight: 1, ...(foil ? foilText : { color: T.ink }) }}>DN</span>
    </span>
  );
}

/** A name set heavy and tight, sized to its length so it never needs more than two lines. */
function BigTitle({ text, scale = 1 }: { text: string; scale?: number }) {
  const [name, sub] = splitTitle(text);
  const n = name.length;
  const size = (n <= 8 ? 14 : n <= 13 ? 11 : n <= 20 ? 8.8 : 7.4) * scale;
  const subSize = Math.min(5.6, size * 0.56) * 1;
  return (
    <div style={{ flexShrink: 0 }}>
      <h2 style={{ margin: 0, fontFamily: T.sans, fontWeight: 800, fontSize: `max(20px, ${size}cqw)`, lineHeight: 0.98, letterSpacing: '-0.045em', color: T.ink, overflowWrap: 'anywhere', textWrap: 'balance' } as React.CSSProperties}>{name}</h2>
      {sub && <div style={{ marginTop: '1.8cqw', fontFamily: T.serif, fontStyle: 'italic', fontSize: `max(15px, ${subSize}cqw)`, lineHeight: 1.08, letterSpacing: '-0.01em', color: T.dim, textWrap: 'balance' } as React.CSSProperties}>{sub}</div>}
    </div>
  );
}

/** An underlined text link: the book's only kind of button. */
const linkStyle = (lime = false): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: '1.4cqw',
  fontFamily: T.sans,
  fontWeight: 600,
  fontSize: fs(11.5, 3.1),
  letterSpacing: '-0.015em',
  color: lime ? T.lime : T.ink,
  borderBottom: `1px solid ${lime ? 'rgba(163,230,53,0.45)' : 'rgba(237,235,230,0.28)'}`,
  paddingBottom: '0.7cqw',
  cursor: 'pointer',
  background: 'none',
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  minHeight: 0,
});

/**
 * Paper. Warm near-black stock with a little light from above, the gutter's soft shadow, a running head at the outer
 * edge and a folio below. `bleed` lets a page lay out its own full-width art; otherwise content sits inside the margins.
 */
export function PageShell({ side, n, running, children, bleed }: { side: Side; n: number; running?: React.ReactNode; children: React.ReactNode; bleed?: boolean }) {
  const left = side === 'left';
  const single = side === 'single';
  const outer = 9;
  const inner = single ? 9 : 13;
  const padL = left ? outer : inner;
  const padR = left ? inner : outer;
  const gutter = single ? '' : `linear-gradient(to ${left ? 'left' : 'right'}, rgba(0,0,0,0.5), rgba(0,0,0,0.16) 9cqw, transparent 21cqw), `;
  const head = left ? 'Proof of Work' : running ?? 'Proof of Work';
  const atOuterRight = !left && !single;
  return (
    <div
      className="bk-pg"
      style={{
        position: 'absolute',
        inset: 0,
        containerType: 'inline-size',
        overflow: 'hidden',
        color: T.ink,
        fontFamily: T.body,
        background: `${gutter}url(/textures/paper-sheet.png) 0 0 / 100% 100% no-repeat, linear-gradient(180deg, ${T.paperTop}, ${T.paperBottom})`,
        borderRadius: left ? '4px 1px 1px 4px' : single ? 3 : '1px 4px 4px 1px',
        boxShadow: 'inset 0 0 0 1px rgba(237,235,230,0.06)',
      }}
    >
      <div style={{ position: 'absolute', top: '7cqw', left: `${padL}cqw`, right: `${padR}cqw`, zIndex: 6, display: 'flex', justifyContent: atOuterRight ? 'flex-end' : 'flex-start', color: T.faint, pointerEvents: 'none' }}>
        {left ? (
          <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(11, 2.9), letterSpacing: '0.01em' }}>{head}</span>
        ) : typeof head === 'string' ? (
          <Mono>{head}</Mono>
        ) : (
          head
        )}
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: bleed ? 0 : `17cqw ${padR}cqw 15cqw ${padL}cqw` }}>{children}</div>
      <div style={{ position: 'absolute', bottom: '6cqw', [atOuterRight ? 'right' : 'left']: `${atOuterRight ? padR : padL}cqw`, zIndex: 6, fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(11, 2.9), color: T.faint, lineHeight: 1, pointerEvents: 'none' }}>{n}</div>
    </div>
  );
}

/* ───────────── cover & back cover ───────────── */

/**
 * The board: deep black cloth, a hinge groove near the spine, a double hairline frame blind-stamped into the cover.
 * A faint sheen follows the cursor (a single static-cost gradient).
 */
function Board({ side, children }: { side: 'left' | 'right'; children: React.ReactNode }) {
  const spineLeft = side === 'right'; // a front cover's spine is on its left; a back cover's on its right
  const mx = spineLeft ? 'var(--mxr, 0.7)' : 'var(--mxl, 0.3)';
  const spineAt = spineLeft ? 'left' : 'right';
  const frame = spineLeft ? '8cqw 8cqw 8cqw 15cqw' : '8cqw 15cqw 8cqw 8cqw';
  const frameIn = spineLeft ? '9.6cqw 9.6cqw 9.6cqw 16.6cqw' : '9.6cqw 16.6cqw 9.6cqw 9.6cqw';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        containerType: 'inline-size',
        overflow: 'hidden',
        color: T.ink,
        background: 'url(/textures/paper-sheet.png) 0 0 / 100% 100% no-repeat, linear-gradient(165deg, #161614 0%, #0C0C0B 52%, #060606 100%)',
        borderRadius: spineLeft ? '3px 7px 7px 3px' : '7px 3px 3px 7px',
        boxShadow: 'inset 0 0 0 1px rgba(237,235,230,0.09), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* the hinge: a soft fall-off, then a groove */}
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, [spineAt]: 0, width: '7.4cqw', background: `linear-gradient(to ${spineLeft ? 'right' : 'left'}, rgba(0,0,0,0.78), rgba(255,255,255,0.035) 70%, rgba(0,0,0,0.3))` }} />
      <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, [spineAt]: '7.4cqw', width: 1, background: 'rgba(237,235,230,0.13)', boxShadow: `${spineLeft ? '-' : ''}1px 0 0 rgba(0,0,0,0.7)` }} />
      {/* the sheen */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at calc(${mx} * 100%) calc(var(--my, 0.3) * 100%), rgba(255,255,255,0.07), transparent 44%)` }} />
      {/* the blind-stamped frame: two hairlines */}
      <div aria-hidden style={{ position: 'absolute', inset: frame, border: '1px solid rgba(214,208,188,0.3)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: frameIn, border: '1px solid rgba(214,208,188,0.13)', pointerEvents: 'none' }} />
      {children}
    </div>
  );
}

export function Cover({ count }: { count: number }) {
  return (
    <Board side="right">
      <div style={{ position: 'absolute', inset: '8cqw 8cqw 8cqw 15cqw', padding: '9cqw 5cqw 8cqw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
        <Mono style={{ ...foilText, letterSpacing: '0.42em', paddingLeft: '0.42em' }}>Darshil Nathwani</Mono>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Monogram size={11} foil />
          <h1 style={{ margin: '8cqw 0 0', fontFamily: T.impact, fontWeight: 400, fontSize: '17.5cqw', lineHeight: 0.92, letterSpacing: '0.01em', whiteSpace: 'nowrap', textAlign: 'center', textTransform: 'uppercase', ...foilText }}>
            <div>PROOF</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              OF WORK
              <span aria-hidden style={{ position: 'absolute', left: '100%', bottom: 0, color: T.lime, WebkitTextFillColor: T.lime, background: 'none' }}>.</span>
            </div>
          </h1>
          <span aria-hidden style={{ display: 'block', width: '9cqw', height: 1, background: 'rgba(214,208,188,0.45)', margin: '6.4cqw 0 5.2cqw' }} />
          <p style={{ margin: 0, fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(15, 5.2), lineHeight: 1.1, letterSpacing: '-0.005em', color: 'rgba(237,235,230,0.84)' }}>Things that actually run.</p>
        </div>

        <div style={{ lineHeight: 2.1 }}>
          <Mono style={{ display: 'block', color: T.faint }}>Selected work · Volume I</Mono>
          <Mono style={{ display: 'block', color: 'rgba(237,235,230,0.34)' }}>{Words(count)} projects · 2026</Mono>
        </div>
      </div>
    </Board>
  );
}

export function BackCover() {
  return (
    <Board side="left">
      <div style={{ position: 'absolute', inset: '8cqw 15cqw 8cqw 8cqw', padding: '9cqw 5cqw 8cqw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Monogram size={13} foil />
        <p style={{ margin: '7cqw 0 0', fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(15, 5.2), lineHeight: 1.1, color: 'rgba(237,235,230,0.84)' }}>Darshil Nathwani</p>
        <span aria-hidden style={{ display: 'block', width: '7cqw', height: 1, background: 'rgba(214,208,188,0.4)', margin: '5cqw 0 4.4cqw' }} />
        <Mono style={{ color: T.faint }}>Bengaluru, India</Mono>
        <Mono style={{ position: 'absolute', bottom: '8cqw', color: 'rgba(237,235,230,0.3)', letterSpacing: '0.3em' }}>Proof of Work · Vol. I</Mono>
      </div>
    </Board>
  );
}

/* ───────────── the contents, and the chapters ───────────── */

export type ChapterView = { no: number; name: string; blurb: string; count: number; names: string[]; page: number; onOpen: () => void };

function IndexRow({ c }: { c: ChapterView }) {
  const rest = c.count - 3;
  const shown = c.names.slice(0, 3);
  const list = rest > 0 ? `${shown.join(', ')} and ${rest} more` : shown.length > 1 ? `${shown.slice(0, -1).join(', ')} and ${shown[shown.length - 1]}` : shown[0];
  return (
    <button
      type="button"
      className="bk-row"
      data-cursor-text="OPEN"
      onClick={c.onOpen}
      style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '10cqw 1fr auto', columnGap: '2cqw', alignItems: 'center', width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: `1px solid ${T.hair}`, padding: 0, cursor: 'pointer', color: T.ink, overflow: 'hidden' }}
    >
      <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(14, 4.6), color: T.faint, lineHeight: 1 }}>{roman(c.no)}</span>
      <span style={{ minWidth: 0 }}>
        <span className="bk-t" style={{ display: 'block', fontFamily: T.sans, fontWeight: 800, fontSize: fs(16, 5.6), lineHeight: 1, letterSpacing: '-0.04em', color: T.ink, whiteSpace: 'nowrap' }}>{c.name}</span>
        <span style={{ display: 'block', marginTop: '1.5cqw', fontSize: fs(10, 2.45), lineHeight: 1.3, color: T.faint, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{list}</span>
      </span>
      <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(12, 3.7), color: T.dim, lineHeight: 1 }}>{c.page}</span>
    </button>
  );
}

export function IndexLeft({ side, n, chapters, total }: { side: Side; n: number; chapters: ChapterView[]; total: number }) {
  return (
    <PageShell side={side} n={n} running="Contents">
      <div style={{ marginBottom: '7cqw' }}>
        <h2 style={{ margin: 0, fontFamily: T.sans, fontWeight: 800, fontSize: fs(32, 12), lineHeight: 0.92, letterSpacing: '-0.055em', color: T.ink }}>Contents</h2>
        <p style={{ margin: '3cqw 0 0', fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(14, 4.3), lineHeight: 1.15, color: T.faint }}>
          {Words(chapters.length)} chapters, {words(total)} projects.
        </p>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${T.hair}` }}>
        {chapters.map((c) => (
          <IndexRow key={c.no} c={c} />
        ))}
      </div>
    </PageShell>
  );
}

export type Facts = { total: number; live: number; code: number; writeups: number };

export function IndexRight({ side, n, chapters, facts, onStart }: { side: Side; n: number; chapters: ChapterView[]; facts: Facts; onStart: () => void }) {
  const first = chapters[0];
  return (
    <PageShell side={side} n={n} running="Preface">
      <div style={{ marginTop: '2cqw' }}>
        <span aria-hidden style={{ display: 'block', width: '8cqw', height: 1, background: T.lime, marginBottom: '5cqw' }} />
        <p style={{ margin: 0, fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(24, 8.8), lineHeight: 1.04, letterSpacing: '-0.02em', color: T.ink, textWrap: 'balance' } as React.CSSProperties}>Production first, then the research, then the experiments.</p>
      </div>

      <div style={{ marginTop: '8cqw', marginBottom: '6cqw', maxWidth: '68cqw', fontSize: fs(11, 2.95), lineHeight: 1.62, color: T.dim }}>
        <p style={{ margin: 0 }}>
          {Words(facts.total)} projects in {words(chapters.length)} chapters. {Words(facts.writeups)} come with a write-up of their own: what shipped, what was hard, what it runs on.
        </p>
        <p style={{ margin: '3.2cqw 0 0' }}>
          {Words(facts.live)} are live on the web and {words(facts.code)} have their source open. Turn the page, or pick a chapter from the contents.
        </p>
      </div>

      {first && (
        <button type="button" onClick={onStart} className="bk-lnk bk-lnk-r" data-cursor-text="GO" style={{ ...linkStyle(true), marginTop: 'auto', alignSelf: 'flex-start' }}>
          Begin with {first.name} <span className="bk-arr">→</span>
        </button>
      )}
    </PageShell>
  );
}

export function ChapterLeft({ side, n, c }: { side: Side; n: number; c: ChapterView }) {
  const blurb = (CHAPTER_COPY[c.name]?.(c.count)) ?? c.blurb;
  return (
    <PageShell side={side} n={n} running={`Chapter ${words(c.no)}`}>
      <div style={{ ...foilText, fontFamily: T.serif, fontStyle: 'italic', fontSize: '40cqw', lineHeight: 0.9, letterSpacing: '-0.02em', paddingRight: '3cqw', alignSelf: 'flex-start', userSelect: 'none' }}>{roman(c.no)}</div>
      <div style={{ marginTop: 'auto' }}>
        <span aria-hidden style={{ display: 'block', width: '8cqw', height: 1, background: T.lime, marginBottom: '6cqw' }} />
        <h2 style={{ margin: 0, fontFamily: T.sans, fontWeight: 800, fontSize: `max(26px, ${Math.min(13.5, 70 / (Math.max(...c.name.split(/\s+/).map((w) => w.length)) * 0.58))}cqw)`, lineHeight: 0.98, letterSpacing: '-0.05em', color: T.ink, overflowWrap: 'anywhere' }}>{c.name}</h2>
        <p style={{ margin: '5cqw 0 0', maxWidth: '66cqw', fontSize: fs(12, 3.15), lineHeight: 1.6, color: T.dim }}>{blurb}</p>
        <p style={{ margin: '5cqw 0 0', fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(12, 3.4), color: T.faint }}>
          {Words(c.count)} {plural(c.count, 'project', 'projects')}
        </p>
      </div>
    </PageShell>
  );
}

export type ChapterItem = { num: number; title: string; description: string; techStack: string[]; page?: number; onOpen: () => void };

export function ChapterRight({ side, n, items }: { side: Side; n: number; items: ChapterItem[] }) {
  const tier = items.length <= 3 ? 'a' : items.length <= 5 ? 'b' : 'c';
  const titleSize = tier === 'a' ? fs(18, 6.2) : tier === 'b' ? fs(14, 4.5) : fs(12.5, 3.65);
  const descSize = tier === 'a' ? fs(11.5, 3.05) : tier === 'b' ? fs(10.5, 2.6) : fs(9.5, 2.35);
  const clamp = (lines: number): React.CSSProperties => ({ display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical', overflow: 'hidden' });
  return (
    <PageShell side={side} n={n} running="The work">
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${T.hair}` }}>
        {items.map((it) => (
          <button
            key={it.num}
            type="button"
            className="bk-row"
            data-cursor-text={it.page ? 'GO' : 'OPEN'}
            onClick={it.onOpen}
            style={{ flex: tier === 'a' ? '0 1 34cqw' : 1, minHeight: 0, display: 'grid', gridTemplateColumns: '8cqw 1fr', columnGap: '1cqw', alignContent: 'center', alignItems: 'baseline', width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: `1px solid ${T.hair}`, padding: 0, cursor: 'pointer', color: T.ink, overflow: 'hidden' }}
          >
            <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(12, tier === 'c' ? 3.4 : 4.1), color: T.faint, lineHeight: 1 }}>{pad2(it.num)}</span>
            <span style={{ minWidth: 0, display: 'block' }}>
              <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '3cqw' }}>
                <span className="bk-t" style={{ minWidth: 0, fontFamily: T.sans, fontWeight: 700, fontSize: titleSize, lineHeight: 1.08, letterSpacing: '-0.035em', color: T.ink, ...(tier === 'a' ? clamp(2) : { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }) }}>{it.title}</span>
                <span className="bk-arr" style={{ flexShrink: 0, fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(10.5, 2.9), color: T.faint, whiteSpace: 'nowrap' }}>{it.page ? it.page : '↗'}</span>
              </span>
              <span style={{ display: 'block', marginTop: tier === 'a' ? '2cqw' : '1cqw', paddingRight: tier === 'a' ? '8cqw' : '4cqw', fontSize: descSize, lineHeight: 1.45, color: T.faint, ...clamp(tier === 'a' ? 3 : tier === 'b' ? 2 : 1) }}>{it.description}</span>
              {tier === 'a' && <span style={{ display: 'block', marginTop: '2.2cqw', fontSize: fs(10, 2.45), color: 'rgba(237,235,230,0.38)' }}>{it.techStack.slice(0, 4).join(' · ')}</span>}
            </span>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

/* ───────────── a project ───────────── */

const rnd = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * The plate: a tipped-in print. A soft glow in the project's own colour, concentric hairline rings and one lime point on
 * them, the project's number in foil. Composed differently for every project (the numbers seed it). Static, cheap.
 */
function Plate({ idx, accent, num }: { idx: number; accent?: string; num: number }) {
  const hue = hueOf(accent);
  const cx = 52 + (rnd(idx + 1) - 0.5) * 30;
  const cy = 46 + (rnd(idx + 7) - 0.5) * 22;
  const t = rnd(idx + 13) * Math.PI * 2;
  const radii = [9, 19, 31, 45, 62];
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: `radial-gradient(70% 70% at ${cx}% ${cy}%, ${hue}38 0%, ${hue}12 46%, transparent 75%), linear-gradient(180deg, #121211, #0b0b0a)` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <line x1="0" x2="100" y1={cy} y2={cy} stroke="rgba(237,235,230,0.09)" strokeWidth="0.2" />
        <line x1={cx} x2={cx} y1="0" y2="100" stroke="rgba(237,235,230,0.09)" strokeWidth="0.2" />
        {radii.map((r, k) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(237,235,230,1)" strokeOpacity={0.3 - k * 0.045} strokeWidth={k === 0 ? 0.4 : 0.26} />
        ))}
        <circle cx={cx + 31 * Math.cos(t)} cy={cy + 31 * Math.sin(t)} r="1.15" fill={T.lime} />
        <circle cx={cx} cy={cy} r="0.7" fill="rgba(237,235,230,0.8)" />
      </svg>
      <div style={{ position: 'absolute', left: '6cqw', bottom: '3cqw', ...foilText, fontFamily: T.serif, fontStyle: 'italic', fontSize: '18cqw', lineHeight: 1, paddingRight: '2cqw', letterSpacing: '-0.02em' }}>{pad2(num)}</div>
    </div>
  );
}

export type ProjectView = {
  idx: number;
  num: number;
  total: number;
  title: string;
  category: string;
  chapterNo: number;
  description: string;
  detailed?: string;
  features?: string[];
  techStack: string[];
  github?: string;
  liveDemo?: string;
  accent?: string;
  isNew?: boolean;
  inDevelopment?: boolean;
};

export function ProjectPlate({ side, n, p, onOpen }: { side: Side; n: number; p: ProjectView; onOpen: () => void }) {
  const status = p.inDevelopment ? 'In development' : p.isNew ? 'New' : '';
  return (
    <PageShell side={side} n={n} running={`No. ${pad2(p.num)}`}>
      <div onClick={onOpen} role="button" tabIndex={0} aria-label={`Open ${p.title}`} data-cursor-text="OPEN" onKeyDown={(e) => e.key === 'Enter' && onOpen()} style={{ position: 'relative', flex: '1 1 0', minHeight: '30cqw', cursor: 'pointer', border: `1px solid ${T.hair}`, overflow: 'hidden' }}>
        <Plate idx={p.idx} accent={p.accent} num={p.num} />
      </div>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '3cqw 0 5.5cqw', gap: '3cqw' }}>
        <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: fs(11, 3), color: T.faint }}>
          {roman(p.chapterNo)}. {p.category}
        </span>
        {status && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1.6cqw' }}>
            <span aria-hidden style={{ width: '1.5cqw', height: '1.5cqw', minWidth: 5, minHeight: 5, borderRadius: '50%', background: T.lime }} />
            <Mono style={{ color: T.faint }}>{status}</Mono>
          </span>
        )}
      </div>
      <BigTitle text={p.title} />
      <p style={{ margin: '4.4cqw 0 0', flexShrink: 0, fontSize: fs(12, 3.15), lineHeight: 1.55, color: T.dim, ...({ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties) }}>{p.description}</p>
    </PageShell>
  );
}

const joinStack = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0] ?? '');

export function ProjectDetails({ side, n, p, onOpen }: { side: Side; n: number; p: ProjectView; onOpen: () => void }) {
  const full = p.detailed || p.description;
  const m = full.match(/^([\s\S]+?[.!?])\s+([\s\S]*)$/);
  const lead = m ? m[1] : full;
  const rest = m ? m[2] : '';
  // the live address is already a link below, so don't spend a highlight on it
  // as many highlights as the page can carry beside the paragraph (a character budget keeps long write-ups from scrolling)
  const features: string[] = [];
  let used = full.length;
  for (const f of (p.features ?? []).filter((x) => !/^(live at|official live platform at)\b/i.test(x))) {
    if (features.length >= 4 || (features.length >= 2 && used + f.length > 580)) break;
    features.push(f);
    used += f.length;
  }
  return (
    <PageShell side={side} n={n} running={`No. ${pad2(p.num)}`}>
      <div
        className="bk-scroll"
        style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitMaskImage: 'linear-gradient(to bottom, #000 calc(100% - 6cqw), transparent)', maskImage: 'linear-gradient(to bottom, #000 calc(100% - 6cqw), transparent)', paddingBottom: '6cqw' }}
      >
        <p style={{ margin: 0, fontFamily: T.sans, fontWeight: 600, fontSize: fs(13, 3.7), lineHeight: 1.27, letterSpacing: '-0.022em', color: T.ink }}>{lead}</p>
        {rest && <p style={{ margin: '3.6cqw 0 0', fontSize: fs(10.5, 2.8), lineHeight: 1.62, color: T.dim }}>{rest}</p>}

        {features.length > 0 && (
          <ul style={{ listStyle: 'none', margin: '6cqw 0 0', padding: 0, borderBottom: `1px solid ${T.hair}` }}>
            {features.map((f) => (
              <li key={f} style={{ display: 'grid', gridTemplateColumns: '4.4cqw 1fr', padding: '2.1cqw 0', borderTop: `1px solid ${T.hair}`, fontSize: fs(10.5, 2.7), lineHeight: 1.45, color: 'rgba(237,235,230,0.86)' }}>
                <span aria-hidden style={{ color: T.faint, fontFamily: T.serif, fontStyle: 'italic' }}>&middot;</span>
                <span>{sentence(f)}</span>
              </li>
            ))}
          </ul>
        )}

        <p style={{ margin: '5cqw 0 0', fontSize: fs(10, 2.6), lineHeight: 1.6, color: T.faint }}>
          Built with <span style={{ color: T.dim }}>{joinStack(p.techStack.slice(0, 7))}</span>.
        </p>
      </div>

      <div style={{ flexShrink: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2.4cqw 6cqw', paddingTop: '4.4cqw', borderTop: `1px solid ${T.hair}` }}>
        <button type="button" onClick={onOpen} data-cursor-text="OPEN" className="bk-lnk bk-lnk-r" style={linkStyle(true)}>
          Read the case study <span className="bk-arr">→</span>
        </button>
        {p.liveDemo && (
          <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" className="bk-lnk" style={linkStyle()}>
            Live site <span className="bk-arr">↗</span>
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="bk-lnk" style={linkStyle()}>
            Source <span className="bk-arr">↗</span>
          </a>
        )}
      </div>
    </PageShell>
  );
}

/* ───────────── the end ───────────── */

const LINKS: { label: string; hint: string; href: string }[] = [
  { label: 'GitHub', hint: 'Darshil-N', href: 'https://github.com/Darshil-N' },
  { label: 'LinkedIn', hint: 'darshil-nathwani', href: 'https://www.linkedin.com/in/darshil-nathwani-bba698307' },
  { label: 'Email', hint: 'darshilnathwani@gmail.com', href: 'mailto:darshilnathwani@gmail.com' },
];

export function Closing({ side, n, count, onRestart }: { side: Side; n: number; count: number; onRestart: () => void }) {
  return (
    <PageShell side={side} n={n} running="Afterword">
      <span aria-hidden style={{ display: 'block', width: '8cqw', height: 1, background: T.lime, margin: '2cqw 0 5cqw' }} />
      <h2 style={{ margin: 0, fontFamily: T.sans, fontWeight: 800, fontSize: fs(24, 9.6), lineHeight: 0.98, letterSpacing: '-0.05em', color: T.ink }}>
        Built, shipped,
        <br />
        <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em', fontSize: '1.08em' }}>written down.</span>
      </h2>
      <p style={{ margin: '4.4cqw 0 0', maxWidth: '68cqw', fontSize: fs(11, 2.95), lineHeight: 1.62, color: T.dim }}>
        {Words(count)} projects, from small C++ programs to apps on the Play Store. If something here sits close to what you are working on, I would be glad to compare notes.
      </p>

      <div style={{ marginTop: 'auto', paddingTop: '4cqw', flexShrink: 0, borderBottom: `1px solid ${T.hair}` }}>
        {LINKS.map((l) => (
          <a key={l.label} className="bk-row" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '3cqw', padding: '2.4cqw 0', borderTop: `1px solid ${T.hair}`, color: T.ink, textDecoration: 'none' }}>
            <span className="bk-t" style={{ fontFamily: T.sans, fontWeight: 700, fontSize: fs(14, 4.3), letterSpacing: '-0.035em' }}>{l.label}</span>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '1.6cqw', minWidth: 0, fontSize: fs(9.5, 2.35), color: T.faint, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.hint}</span>
              <span className="bk-arr">↗</span>
            </span>
          </a>
        ))}
      </div>
      <button type="button" onClick={onRestart} className="bk-lnk" style={{ ...linkStyle(), marginTop: '4cqw', alignSelf: 'flex-start', color: T.dim, fontWeight: 500 }}>
        Back to the cover
      </button>
    </PageShell>
  );
}

export function Colophon({ side, n }: { side: Side; n: number }) {
  const specimen = (face: React.CSSProperties, name: string, role: string) => (
    <div style={{ flex: 1, minWidth: 0, borderTop: `1px solid ${T.hair}`, paddingTop: '3cqw' }}>
      <div style={{ fontSize: '10cqw', lineHeight: 1, color: T.ink, ...face }}>Aa</div>
      <div style={{ marginTop: '3cqw', fontSize: fs(9.5, 2.35), lineHeight: 1.4, color: T.dim }}>{name}</div>
      <div style={{ marginTop: '0.6cqw', fontSize: fs(9, 2.2), lineHeight: 1.4, color: T.faint }}>{role}</div>
    </div>
  );
  return (
    <PageShell side={side} n={n} running="Colophon">
      <span aria-hidden style={{ display: 'block', width: '8cqw', height: 1, background: T.lime, margin: '2cqw 0 5cqw' }} />
      <h2 style={{ margin: 0, fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400, fontSize: fs(28, 10.6), lineHeight: 1, letterSpacing: '-0.02em', color: T.ink }}>Colophon</h2>
      <div style={{ marginTop: '5cqw', maxWidth: '70cqw', fontSize: fs(11, 2.9), lineHeight: 1.62, color: T.dim }}>
        <p style={{ margin: 0 }}>Headlines are set in Inter Tight and Syne, the italics in DM Serif Display, the small print in JetBrains Mono.</p>
        <p style={{ margin: '3.2cqw 0 0' }}>The pages turn in plain CSS 3D, driven by Framer Motion. No WebGL, no page-flip library. Drag a page, swipe, click an edge, or use the arrow keys.</p>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '5cqw', display: 'flex', gap: '4cqw' }}>
        {specimen({ fontFamily: T.sans, fontWeight: 800, letterSpacing: '-0.05em' }, 'Inter Tight', 'Names and headlines')}
        {specimen({ fontFamily: T.serif, fontStyle: 'italic' }, 'DM Serif Display', 'The italic voice')}
        {specimen({ fontFamily: T.mono, fontSize: '8cqw' }, 'JetBrains Mono', 'Folios and small print')}
      </div>
      <TransitionLink to="/projects/list" className="bk-lnk bk-lnk-r" style={{ ...linkStyle(), marginTop: '5cqw', alignSelf: 'flex-start', color: T.dim, fontWeight: 500 }}>
        Prefer a plain list? Open the projects page <span className="bk-arr">↗</span>
      </TransitionLink>
    </PageShell>
  );
}
