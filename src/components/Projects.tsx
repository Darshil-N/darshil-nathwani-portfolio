/**
 * Projects.tsx — Archive index with a live preview
 *
 * SIGNATURE: every project in one bold ranked list. Hovering a row drives a
 * sticky preview card on the right (number, category, stack, links). Filter
 * tabs share a sliding lime pill with live counts, and the list re-flows as
 * the filter changes. Clicking a row opens the full-screen detail modal.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sound } from '../lib/sound';
import { projects, type Project } from '../data/projects';
import ClipLine from './ui/ClipLine';
import { techIcons } from './techIcons';
import ProjectModal, { type ModalProject } from './ProjectModal';
import { useMediaQuery } from '../hooks/useMediaQuery';

const E = [0.76, 0, 0.24, 1] as const;


const LIME = '#A3E635';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

const categories = [
  { key: 'all' as const, label: 'All' },
  { key: 'ai' as const, label: 'AI & ML' },
  { key: 'mobile' as const, label: 'Mobile' },
  { key: 'web' as const, label: 'Web' },
  { key: 'cv' as const, label: 'Computer Vision' },
  { key: 'dsa' as const, label: 'DSA' },
];

const CATEGORY_LABEL: Record<string, string> = {
  ai: 'AI & ML',
  mobile: 'Mobile',
  web: 'Web',
  cv: 'Computer Vision',
  dsa: 'DSA',
  data: 'Data',
  oth: 'Other',
};

const numberOf = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0');

const toModal = (p: Project): ModalProject => ({
  number: numberOf(p),
  title: p.title,
  category: CATEGORY_LABEL[p.category] ?? p.category,
  badges: [...(p.isNew ? ['NEW'] : []), ...(p.inDevelopment ? ['IN DEVELOPMENT'] : [])],
  summary: p.detailedDescription || p.description,
  features: p.features,
  challenges: p.challenges,
  learnings: p.learnings,
  techStack: p.techStack,
  github: p.github,
  liveDemo: p.liveDemo,
});

/** Counts up whenever `to` changes (so switching filters animates the total). */
function CountTo({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => String(Math.round(v)).padStart(2, '0'));
  useEffect(() => {
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [to, reduce, mv]);
  return <motion.span>{text}</motion.span>;
}

/** Sticky preview that follows whichever row is hovered. */
function PreviewCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: E }}
      >
        {/* Visual */}
        <div
          onPointerMove={onMove}
          className="relative overflow-hidden"
          style={{
            aspectRatio: '16 / 10',
            background: `linear-gradient(135deg, ${project.accentColor || 'rgba(163,230,53,0.1)'}, rgba(12,12,14,0.6))`,
            border: '1px solid rgba(163,230,53,0.2)',
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'radial-gradient(260px circle at var(--x, 70%) var(--y, 30%), rgba(163,230,53,0.2), transparent 65%)' }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              right: '-1rem',
              bottom: '-2.2rem',
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(9rem, 17vw, 15rem)',
              lineHeight: 0.8,
              letterSpacing: '-0.06em',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(163,230,53,0.3)',
              userSelect: 'none',
            }}
          >
            {numberOf(project)}
          </div>
          <div className="absolute left-5 top-5 flex items-center gap-3" style={{ ...MONO, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: LIME }}>
            <span>◆ {CATEGORY_LABEL[project.category] ?? project.category}</span>
            {project.isNew && <span style={{ background: LIME, color: '#0C0C0E', fontWeight: 700, padding: '0.25rem 0.55rem', letterSpacing: '0.15em' }}>NEW</span>}
            {project.inDevelopment && <span style={{ border: '1px solid rgba(163,230,53,0.5)', padding: '0.25rem 0.55rem' }}>IN DEV</span>}
          </div>
        </div>

        {/* Copy */}
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', lineHeight: 0.98, letterSpacing: '-0.035em', marginTop: '1.4rem' }}>
          {project.title}
        </h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(248,250,252,0.62)', marginTop: '0.9rem' }}>{project.description}</p>

        <div className="flex flex-wrap gap-2" style={{ marginTop: '1.2rem' }}>
          {project.techStack.slice(0, 6).map((t) => (
            <span key={t} className="inline-flex items-center gap-2" style={{ ...MONO, fontSize: 10, padding: '0.4rem 0.75rem', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(248,250,252,0.72)' }}>
              {techIcons[t] && <span style={{ color: LIME, display: 'flex' }}>{techIcons[t]}</span>}
              {t}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span style={{ ...MONO, fontSize: 10, padding: '0.4rem 0.75rem', border: '1px solid rgba(163,230,53,0.25)', color: LIME }}>+{project.techStack.length - 6}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3" style={{ marginTop: '1.6rem' }}>
          <button
            type="button"
            onClick={onOpen}
            onMouseEnter={() => sound.playHover?.()}
            className="inline-flex items-center gap-3 transition-colors hover:!bg-[#A3E635] hover:!border-[#A3E635]"
            style={{ ...MONO, padding: '0.9rem 1.6rem', background: '#F8FAFC', border: '1px solid #F8FAFC', color: '#0C0C0E', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}
          >
            Full details <ArrowRight size={14} />
          </button>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover?.()}
              className="inline-flex items-center gap-2 transition-colors hover:!border-[#A3E635] hover:!text-[#A3E635]"
              style={{ ...MONO, padding: '0.9rem 1.4rem', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(248,250,252,0.8)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover?.()}
              className="inline-flex items-center gap-2 transition-colors hover:!border-[#A3E635] hover:!text-[#A3E635]"
              style={{ ...MONO, padding: '0.9rem 1.4rem', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(248,250,252,0.8)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  // The filter lives in the URL (?category=ai), so Back/Forward and shared links work.
  const urlCategory = new URLSearchParams(location.search).get('category');
  const selectedCategory: Project['category'] = categories.some((c) => c.key === urlCategory)
    ? (urlCategory as Project['category'])
    : 'all';

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  // Side-by-side preview needs room AND a pointer that can hover. Phones and tablets
  // get the same preview inline under the row instead (first tap expands, then open).
  const sideBySide = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      out[p.category] = (out[p.category] ?? 0) + 1;
    });
    return out;
  }, []);

  const filteredProjects = useMemo(
    () => (selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory)),
    [selectedCategory]
  );

  // The preview follows the hovered row; fall back to the first row of the current filter.
  const activeProject = filteredProjects.find((p) => p.title === activeTitle) ?? filteredProjects[0];

  const handleCategoryChange = (category: Project['category']) => {
    sound.playClick?.();
    setActiveTitle(null);
    setExpandedTitle(null);
    navigate(category === 'all' ? '/projects' : `/projects?category=${category}`);
  };

  const open = (p: Project) => {
    sound.playClick?.();
    setSelectedProject(p);
  };

  // Previous / next project inside the current filter (wraps around).
  const selIdx = selectedProject ? filteredProjects.findIndex((p) => p.title === selectedProject.title) : -1;
  const pick = (delta: number) =>
    selIdx < 0 ? undefined : filteredProjects[(selIdx + delta + filteredProjects.length) % filteredProjects.length];
  const neighbour = (delta: number) => {
    const n = pick(delta);
    return n && filteredProjects.length > 1 ? { number: numberOf(n), title: n.title } : undefined;
  };
  const step = (delta: number) => {
    const n = pick(delta);
    if (n) setSelectedProject(n);
  };

  return (
    <section
      style={{
        minHeight: '100svh',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
      }}
    >
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1700px] mx-auto">
        {/* HEADER */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <ClipLine delay={0.1}>
              <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ color: LIME, fontSize: 12 }}>◈</span>
                <span>Project Showcase</span>
              </div>
            </ClipLine>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
              <ClipLine delay={0.2}>
                <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>Built &amp;</div>
              </ClipLine>
              <ClipLine delay={0.35}>
                <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>Shipped</div>
              </ClipLine>
            </div>
          </div>

          <div className="flex items-end gap-5">
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.85, letterSpacing: '-0.06em', color: LIME }}>
              <CountTo to={filteredProjects.length} />
            </div>
            <p style={{ ...MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.5)', maxWidth: 200, lineHeight: 1.7, paddingBottom: 6 }}>
              Projects across AI, mobile, web &amp; computer vision
            </p>
          </div>
        </div>

        {/* FILTERS: sliding lime pill */}
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(cat.key)}
                onMouseEnter={() => sound.playHover?.()}
                className="relative"
                style={{
                  ...MONO,
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '0.8rem 1.4rem',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: isActive ? '#0C0C0E' : 'rgba(248,250,252,0.6)',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'color 0.3s, border-color 0.3s',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    aria-hidden
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    style={{ position: 'absolute', inset: -1, backgroundColor: LIME }}
                  />
                )}
                <span className="relative">
                  {cat.label} <span style={{ opacity: 0.6 }}>{counts[cat.key] ?? 0}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* INDEX + PREVIEW */}
        <div className={sideBySide ? 'grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 xl:gap-20 items-start' : 'block'}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <AnimatePresence initial={false} mode="popLayout">
              {filteredProjects.map((p) => {
                const isActive = sideBySide ? activeProject?.title === p.title : expandedTitle === p.title;
                return (
                  <motion.li
                    key={p.title}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: E }}
                  >
                    <button
                      type="button"
                      aria-expanded={sideBySide ? undefined : isActive}
                      onPointerEnter={() => {
                        if (!sideBySide) return;
                        if (!isActive) sound.playHover?.();
                        setActiveTitle(p.title);
                      }}
                      onFocus={() => sideBySide && setActiveTitle(p.title)}
                      onClick={() => {
                        if (sideBySide) open(p);
                        else {
                          sound.playClick?.();
                          setExpandedTitle((cur) => (cur === p.title ? null : p.title));
                        }
                      }}
                      data-cursor-text="OPEN"
                      className="group relative w-full text-left grid items-center gap-x-5 grid-cols-[auto_1fr_auto]"
                      style={{ padding: 'clamp(1.1rem, 2.2vw, 1.7rem) clamp(0.4rem, 1vw, 0.9rem)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-[3px] origin-top transition-transform duration-500"
                        style={{ backgroundColor: LIME, transform: `scaleY(${isActive ? 1 : 0})`, transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                      />
                      <span style={{ ...MONO, fontSize: 11, letterSpacing: '0.2em', color: isActive ? LIME : 'rgba(248,250,252,0.3)', transition: 'color 0.3s' }}>
                        {numberOf(p)}
                      </span>
                      <span
                        className="block min-w-0 transition-transform duration-500"
                        style={{ transform: isActive ? 'translateX(12px)' : 'none', transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                      >
                        <span
                          className="block"
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            fontSize: 'clamp(1.35rem, 3vw, 2.6rem)',
                            lineHeight: 1,
                            letterSpacing: '-0.035em',
                            color: isActive ? '#F8FAFC' : 'rgba(248,250,252,0.55)',
                            transition: 'color 0.3s',
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {p.title}
                        </span>
                        <span className="flex items-center gap-3" style={{ ...MONO, marginTop: 9, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)' }}>
                          {CATEGORY_LABEL[p.category] ?? p.category}
                          {p.isNew && <span style={{ background: LIME, color: '#0C0C0E', fontWeight: 700, padding: '0.15rem 0.45rem' }}>NEW</span>}
                          {p.inDevelopment && <span style={{ color: LIME }}>· In development</span>}
                        </span>
                      </span>
                      <span
                        className="flex items-center justify-center transition-all duration-500 group-hover:rotate-45"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          border: `1px solid ${isActive ? LIME : 'rgba(255,255,255,0.22)'}`,
                          backgroundColor: isActive ? LIME : 'transparent',
                          color: isActive ? '#0C0C0E' : '#F8FAFC',
                        }}
                      >
                        <ArrowRight size={16} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {!sideBySide && expandedTitle === p.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: E }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0.4rem 0.2rem 2rem' }}>
                            <PreviewCard project={p} onOpen={() => open(p)} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {/* Sticky preview (desktop only) */}
          {sideBySide && activeProject && (
            <aside className="sticky" style={{ top: '6.5rem' }} aria-label="Project preview">
              <PreviewCard project={activeProject} onOpen={() => open(activeProject)} />
            </aside>
          )}
        </div>
      </div>

      {/* PROJECT DIALOG (shared with the home page) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key="project-modal"
            project={toModal(selectedProject)}
            position={`${String(selIdx + 1).padStart(2, '0')} / ${String(filteredProjects.length).padStart(2, '0')}`}
            prev={neighbour(-1)}
            next={neighbour(1)}
            onPrev={filteredProjects.length > 1 ? () => step(-1) : undefined}
            onNext={filteredProjects.length > 1 ? () => step(1) : undefined}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163,230,53,0.35); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(163,230,53,0.55); }
      `}</style>
    </section>
  );
}
