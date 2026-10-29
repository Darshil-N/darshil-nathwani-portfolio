import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { sound } from '../lib/sound';
import { FEATURED_PROJECTS, type FeaturedProject } from '../data/featuredProjects';
import ProjectModal from './ProjectModal';

const E = [0.76, 0, 0.24, 1] as const;


function ProjectRow({ project, index }: { project: FeaturedProject; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      data-cursor-text="VIEW"
      onClick={() => {
        sound.playChime();
        window.dispatchEvent(new CustomEvent('open-project', { detail: project.id }));
      }}
      onMouseEnter={() => {
        setHovered(true);
        sound.playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay: index * 0.04, ease: E }}
      style={{
        position: 'relative',
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: 0,
        cursor: 'pointer',
        display: 'block',
        overflow: 'hidden',
      }}
      className="group"
    >
      {/* Invert panel sweep */}
      <motion.div
        aria-hidden
        animate={{ y: hovered ? '0%' : '101%' }}
        transition={{ duration: 0.45, ease: E }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#A3E635',
          zIndex: 0,
        }}
      />

      <div
        style={{ position: 'relative', zIndex: 1, padding: '2rem 0' }}
        className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10"
      >
        {/* Index number */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            letterSpacing: '0.1em',
            color: hovered ? '#0C0C0E' : 'rgba(255,255,255,0.3)',
            transition: 'color 0.2s',
            flexShrink: 0,
            width: '2.4rem',
          }}
        >
          {project.num}
        </span>

        {/* Title + category + badge */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9.5px',
                letterSpacing: '0.18em',
                color: hovered ? 'rgba(12,12,14,0.6)' : 'rgba(255,255,255,0.32)',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
            >
              {project.category}
            </span>
            {project.badge && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: hovered ? '#0C0C0E' : '#A3E635',
                  border: hovered ? '1px solid rgba(12,12,14,0.3)' : '1px solid rgba(163,230,53,0.3)',
                  padding: '2px 8px',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {project.badge}
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.4rem, 2.6vw, 2.3rem)',
              letterSpacing: '-0.02em',
              color: hovered ? '#0C0C0E' : 'rgba(248,250,252,0.86)',
              transition: 'color 0.2s, transform 0.4s',
              transform: hovered ? 'translateX(10px)' : 'translateX(0)',
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Tech stack */}
        <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[260px] justify-end">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.05em',
                color: hovered ? 'rgba(12,12,14,0.7)' : 'rgba(255,255,255,0.4)',
                border: hovered ? '1px solid rgba(12,12,14,0.25)' : '1px solid rgba(255,255,255,0.1)',
                padding: '3px 8px',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          aria-hidden
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.3, ease: E }}
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: hovered ? '1px solid rgba(12,12,14,0.3)' : '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ArrowUpRight
            size={16}
            style={{ color: hovered ? '#0C0C0E' : 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
          />
        </motion.div>
      </div>
    </motion.button>
  );
}

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = FEATURED_PROJECTS.find((p) => p.id === id) ?? null;
      setSelectedProject(found);
    };
    window.addEventListener('open-project', handler);
    return () => window.removeEventListener('open-project', handler);
  }, []);

  const closeModal = () => {
    sound.playClick();
    setSelectedProject(null);
  };

  // Previous / next featured project (wraps around).
  const selIdx = selectedProject ? FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id) : -1;
  const pick = (delta: number) =>
    selIdx < 0 ? undefined : FEATURED_PROJECTS[(selIdx + delta + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];
  const neighbour = (delta: number) => {
    const n = pick(delta);
    return n ? { number: n.num, title: n.title } : undefined;
  };
  const step = (delta: number) => {
    const n = pick(delta);
    if (n) setSelectedProject(n);
  };

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="work"
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#0C0C0E',
          color: '#F8FAFC',
          fontFamily: "'Inter Tight', sans-serif",
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          overflow: 'hidden',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderTop: '1px solid rgba(163,230,53,0.3)',
          boxShadow: '0 -60px 120px rgba(0,0,0,0.65), 0 -2px 0 rgba(163,230,53,0.15)',
        }}
      >
        <div className="px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.32)',
                  marginBottom: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
                <span>Selected Works — 09</span>
              </motion.div>

              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: E }}
                  style={{
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.98,
                    fontSize: 'clamp(2.2rem, 4.8vw, 4.2rem)',
                  }}
                >
                  Systems Built
                  <br />
                  <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.42)' }}>
                    To Ship &amp; Scale
                  </span>
                </motion.h2>
              </div>
            </div>

            <Link
              to="/projects"
              onMouseEnter={() => sound.playHover()}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '0.85rem 1.4rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.25s, color 0.25s',
              }}
              className="hover:!border-[#A3E635] hover:!text-[#A3E635] w-fit"
            >
              <span>Explore All 20+ Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Editorial Row List */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {FEATURED_PROJECTS.map((project, idx) => (
              <ProjectRow key={project.id} project={project} index={idx} />
            ))}
          </div>

          {/* View All Projects Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
            className="mt-14 text-center"
          >
            <Link
              to="/projects"
              onMouseEnter={() => sound.playHover()}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10.5px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0C0C0E',
                backgroundColor: '#F8FAFC',
                padding: '1rem 2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background-color 0.25s',
              }}
              className="hover:!bg-[#A3E635]"
            >
              <span>View Complete Engineering Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Project dialog (shared with /projects) */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              key="featured-modal"
              project={{
                number: selectedProject.num,
                title: selectedProject.title,
                category: selectedProject.category,
                badges: selectedProject.badge ? [selectedProject.badge] : [],
                summary: selectedProject.description,
                architecture: selectedProject.architecture,
                metrics: selectedProject.metrics,
                challenges: selectedProject.challenges,
                learnings: selectedProject.learnings,
                techStack: selectedProject.techStack,
                github: selectedProject.github,
                liveDemo: selectedProject.liveDemo,
              }}
              position={`${selectedProject.num} / ${String(FEATURED_PROJECTS.length).padStart(2, '0')}`}
              prev={neighbour(-1)}
              next={neighbour(1)}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}
