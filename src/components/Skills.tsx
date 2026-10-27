/**
 * Skills.tsx — Morphing bento grid with kinetic reveals
 *
 * SIGNATURE BOLDNESS: Asymmetric bento boxes with massive category numbers
 * Each category is a different size box creating visual rhythm
 * Inspired by: Componine's kinetic layouts + Art Yakushev's bold grids
 * 
 * UNIQUE ELEMENTS:
 * - Asymmetric grid layout (some boxes are 2x size)
 * - Massive floating category numbers behind chips
 * - Chips fly in from random directions
 * - Hover magnification on entire category blocks
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SiPython, SiTypescript, SiJavascript, SiKotlin, SiCplusplus, SiC, SiReact, SiFastapi, SiNodedotjs, SiFlask, SiTailwindcss, SiTensorflow, SiOpencv, SiFirebase, SiMongodb, SiSqlite, SiDocker, SiAndroid, SiGithub } from 'react-icons/si';
import { Brain, Eye, Bot, Database, Cloud, Layers } from 'lucide-react';

const E = [0.76, 0, 0.24, 1] as const;

const categories = [
  {
    num: '01',
    title: 'Languages',
    subtitle: 'Core Stack',
    colSpan: 1,
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'Kotlin', icon: <SiKotlin /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'C', icon: <SiC /> },
    ],
  },
  {
    num: '02',
    title: 'AI & ML',
    subtitle: 'Intelligence',
    colSpan: 2, // BIGGER BOX
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'OpenCV', icon: <SiOpencv /> },
      { name: 'YOLO', icon: <Eye /> },
      { name: 'LangChain', icon: <Layers /> },
      { name: 'Hugging Face', icon: <Brain /> },
      { name: 'XGBoost', icon: <Brain /> },
      { name: 'Gemini API', icon: <Bot /> },
      { name: 'Ollama', icon: <Bot /> },
    ],
  },
  {
    num: '03',
    title: 'Frameworks',
    subtitle: 'Web & Mobile',
    colSpan: 2, // BIGGER BOX
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'React Native', icon: <SiReact /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Flask', icon: <SiFlask /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
      { name: 'Android SDK', icon: <SiAndroid /> },
    ],
  },
  {
    num: '04',
    title: 'Infrastructure',
    subtitle: 'Cloud & Ops',
    colSpan: 1,
    skills: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'SQLite', icon: <SiSqlite /> },
      { name: 'ChromaDB', icon: <Database /> },
      { name: 'GitHub', icon: <SiGithub /> },
      { name: 'Vercel', icon: <Cloud /> },
    ],
  },
];

function ClipLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle inView based on whether element is intersecting
        setInView(entry.isIntersecting);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Skills() {
  const { ref: gridRef, inView: gridInView } = useInView(0.1);

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-20">
          <ClipLine delay={0.1}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
              <span>Technical Arsenal</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
                Stack Built
              </div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
                In Production
              </div>
            </ClipLine>
          </div>

          {/* Description with hairline */}
          <div style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)', overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.5, ease: E }}
              className="flex items-start gap-6"
            >
              <motion.div
                style={{ height: 1, backgroundColor: '#A3E635', flexShrink: 0 }}
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.7, delay: 0.75, ease: E }}
              />
              <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.45)', lineHeight: 1.7, maxWidth: '42rem' }}>
                Battle-tested stack from shipping Play Store apps, IEEE research, and production platforms.
              </p>
            </motion.div>
          </div>
        </div>

        {/* BENTO GRID */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
          className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
        >
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.num}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={gridInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: catIndex * 0.12, ease: E }}
              style={{
                gridColumn: `span ${cat.colSpan}`,
                backgroundColor: '#0C0C0E',
                padding: 'clamp(2.5rem, 4vw, 4rem)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: cat.colSpan === 2 ? '400px' : '350px',
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Massive background number */}
              <div
                style={{
                  position: 'absolute',
                  right: '-1rem',
                  top: '-1rem',
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(8rem, 15vw, 12rem)',
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(163,230,53,0.06)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {cat.num}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Category title */}
                <h3
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 900,
                    fontSize: cat.colSpan === 2 ? 'clamp(2rem, 3.5vw, 3rem)' : 'clamp(1.6rem, 2.8vw, 2.4rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: '#F8FAFC',
                    marginBottom: '0.5rem',
                  }}
                >
                  {cat.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(248,250,252,0.3)',
                    marginBottom: '2.5rem',
                  }}
                >
                  {cat.subtitle}
                </p>

                {/* Skills - fly in from random directions */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, skillIndex) => {
                    const randomX = (Math.random() - 0.5) * 100;
                    const randomY = (Math.random() - 0.5) * 100;
                    
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: randomX, y: randomY }}
                        animate={gridInView ? { opacity: 1, x: 0, y: 0 } : {}}
                        transition={{
                          duration: 0.8,
                          delay: catIndex * 0.12 + skillIndex * 0.05,
                          ease: E,
                        }}
                        whileHover={{
                          scale: 1.08,
                          borderColor: '#A3E635',
                          backgroundColor: 'rgba(163,230,53,0.08)',
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.6rem 1rem',
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10.5px',
                          letterSpacing: '0.02em',
                          color: 'rgba(248,250,252,0.65)',
                          cursor: 'default',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span style={{ color: '#A3E635', fontSize: '14px' }}>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
