/**
 * Skills.tsx — Cursor-lit skill index
 *
 * SIGNATURE: four giant category rows on the left (the active one fills solid
 * while a lime marker slides between them) and, on the right, that category's
 * skills dealt out as big tiles with a spotlight that follows the cursor.
 * It cycles through the categories on its own until the visitor takes over.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { SiPython, SiTypescript, SiJavascript, SiKotlin, SiCplusplus, SiC, SiReact, SiFastapi, SiNodedotjs, SiFlask, SiTailwindcss, SiTensorflow, SiOpencv, SiFirebase, SiMongodb, SiSqlite, SiDocker, SiAndroid, SiGithub, SiSolidity, SiNextdotjs, SiSupabase, SiPostgresql, SiRedis, SiGoogleplay, SiAppstore } from 'react-icons/si';
import { Brain, Eye, Bot, Database, Cloud, Layers, Network, WifiOff } from 'lucide-react';
import { sound } from '../lib/sound';
import ClipLine from './ui/ClipLine';

const E = [0.76, 0, 0.24, 1] as const;

const categories = [
  {
    num: '01',
    title: 'Languages',
    subtitle: 'Core Stack',
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'C', icon: <SiC /> },
      { name: 'Solidity', icon: <SiSolidity /> },
    ],
  },
  {
    num: '02',
    title: 'AI & ML',
    subtitle: 'Intelligence',
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'OpenCV', icon: <SiOpencv /> },
      { name: 'YOLO', icon: <Eye /> },
      { name: 'LangChain', icon: <Layers /> },
      { name: 'LangGraph', icon: <Network /> },
      { name: 'Hugging Face', icon: <Brain /> },
      { name: 'XGBoost', icon: <Brain /> },
      { name: 'Gemini API', icon: <Bot /> },
      { name: 'Ollama', icon: <Bot /> },
    ],
  },
  {
    num: '03',
    title: 'Web',
    subtitle: 'Frontend & APIs',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Flask', icon: <SiFlask /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
    ],
  },
  {
    num: '04',
    title: 'Mobile & Apps',
    subtitle: 'Build & Ship',
    skills: [
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'Android SDK', icon: <SiAndroid /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Offline-First', icon: <WifiOff /> },
      { name: 'Google Play', icon: <SiGoogleplay /> },
      { name: 'App Store', icon: <SiAppstore /> },
    ],
  },
  {
    num: '05',
    title: 'Data & Infra',
    subtitle: 'Cloud & Ops',
    skills: [
      { name: 'Supabase', icon: <SiSupabase /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'SQLite', icon: <SiSqlite /> },
      { name: 'Redis', icon: <SiRedis /> },
      { name: 'ChromaDB', icon: <Database /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'GitHub', icon: <SiGithub /> },
      { name: 'Vercel', icon: <Cloud /> },
    ],
  },
];

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const LIME = '#A3E635';
const CYCLE_MS = 4200;

type Skill = (typeof categories)[number]['skills'][number];

/** A skill tile with a spotlight that follows the cursor. */
function SkillTile({ skill, index }: { skill: Skill; index: number }) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.92 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.6, ease: E, delay: index * 0.045 }}
      onMouseMove={onMove}
      onMouseEnter={() => sound.playHover?.()}
      className="group relative flex flex-col justify-between overflow-hidden"
      style={{
        minHeight: 'clamp(120px, 12vw, 160px)',
        padding: '1.2rem 1.3rem',
        backgroundColor: '#0C0C0E',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      whileHover={{ borderColor: 'rgba(163,230,53,0.55)' }}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(170px circle at var(--x, 50%) var(--y, 50%), rgba(163,230,53,0.2), transparent 70%)' }}
      />
      <span style={{ ...MONO, position: 'relative', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(248,250,252,0.3)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative">
        <div
          className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6"
          style={{ color: LIME, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1, marginBottom: 14, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          {skill.icon}
        </div>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)', letterSpacing: '-0.01em', color: '#F8FAFC' }}>
          {skill.name}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // Cycle categories on its own until the visitor takes over.
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % categories.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [auto, inView, reduce]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const cat = categories[active];
  const totalSkills = new Set(categories.flatMap((c) => c.skills.map((sk) => sk.name))).size;

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(163,230,53,0.06), transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <ClipLine delay={0.1}>
              <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ color: LIME, fontSize: 12 }}>◈</span>
                <span>Technical Arsenal</span>
              </div>
            </ClipLine>

            <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
              <ClipLine delay={0.2}>
                <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>Stack Built</div>
              </ClipLine>
              <ClipLine delay={0.35}>
                <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>In Production</div>
              </ClipLine>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: E }}
              className="flex items-start gap-6"
              style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)' }}
            >
              <div style={{ width: 50, height: 1, backgroundColor: LIME, flexShrink: 0, marginTop: '0.8rem' }} />
              <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.5)', lineHeight: 1.7, maxWidth: '36rem' }}>
                Battle-tested stack from shipping Play Store apps, IEEE research, and production platforms.
              </p>
            </motion.div>
          </div>

          <div className="flex gap-10" style={{ ...MONO }}>
            {[
              { n: totalSkills, l: 'Tools' },
              { n: categories.length, l: 'Domains' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#F8FAFC' }}>
                  {String(s.n).padStart(2, '0')}
                </div>
                <div style={{ marginTop: 8, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* INDEX + PANEL */}
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] gap-12 lg:gap-16 items-start">
          {/* Category index */}
          <div role="tablist" aria-label="Skill categories" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {categories.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.num}
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => {
                    if (i !== active) sound.playHover?.();
                    choose(i);
                  }}
                  onClick={() => choose(i)}
                  data-cursor-text="VIEW"
                  className="relative w-full text-left flex items-baseline gap-4 sm:gap-6"
                  style={{ padding: 'clamp(0.95rem, 1.8vw, 1.5rem) 0.2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-marker"
                      aria-hidden
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      style={{ position: 'absolute', left: -14, top: 0, bottom: 0, width: 3, backgroundColor: LIME, boxShadow: '0 0 14px rgba(163,230,53,0.7)' }}
                    />
                  )}
                  <span style={{ ...MONO, fontSize: 11, letterSpacing: '0.2em', color: isActive ? LIME : 'rgba(248,250,252,0.3)', transition: 'color 0.3s' }}>{c.num}</span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: 'clamp(1.9rem, 4.6vw, 3.8rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.04em',
                        color: isActive ? '#F8FAFC' : 'transparent',
                        WebkitTextStroke: isActive ? '1.5px transparent' : '1.5px rgba(248,250,252,0.4)',
                        transition: 'color 0.4s, -webkit-text-stroke 0.4s, transform 0.5s cubic-bezier(0.76,0,0.24,1)',
                        transform: isActive ? 'translateX(10px)' : 'none',
                      }}
                    >
                      {c.title}
                    </span>
                    <span className="block" style={{ ...MONO, marginTop: 10, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: isActive ? 'rgba(248,250,252,0.6)' : 'rgba(248,250,252,0.3)', transition: 'color 0.3s' }}>
                      {c.subtitle}
                    </span>
                    {isActive && auto && !reduce && (
                      <motion.span
                        key={`bar-${active}`}
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                        className="block"
                        style={{ marginTop: 14, height: 2, width: '100%', backgroundColor: 'rgba(163,230,53,0.55)', transformOrigin: '0 50%' }}
                      />
                    )}
                  </span>
                  <span style={{ ...MONO, fontSize: 11, letterSpacing: '0.18em', color: isActive ? '#F8FAFC' : 'rgba(248,250,252,0.3)' }}>
                    {String(c.skills.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill panel */}
          <div className="relative" style={{ minHeight: 'clamp(320px, 34vw, 460px)' }} role="tabpanel">
            <div
              aria-hidden
              style={{
                position: 'absolute',
                right: 0,
                top: '-2rem',
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(9rem, 22vw, 20rem)',
                lineHeight: 0.8,
                letterSpacing: '-0.06em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(163,230,53,0.08)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {cat.num}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cat.num}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                className="relative grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
              >
                {cat.skills.map((skill, i) => (
                  <SkillTile key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
