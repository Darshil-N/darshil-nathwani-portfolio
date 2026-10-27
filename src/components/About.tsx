import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Smartphone, Eye, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: 20, suffix: '+', label: 'Projects Built' },
  { value: 3, suffix: '+', label: 'Internships' },
  { value: 1, suffix: '', label: 'IEEE Paper' },
  { value: 10, suffix: '+', label: 'Hackathons' },
];

const cards = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    desc: 'Building AI systems for real-world impact — from trusted workflows to intelligent decision systems.',
    link: '/projects?category=ai',
    tag: 'Core Specialization',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Vision pipelines for detection, tracking and behavior understanding using OpenCV and YOLO.',
    link: '/projects?category=cv',
    tag: 'Deep Expertise',
  },
  {
    icon: Globe,
    title: 'Full-Stack Web',
    desc: 'React, TypeScript, FastAPI/Node.js — clean architecture, responsive interfaces, automation-first.',
    link: '/projects?category=web',
    tag: 'Full-Stack',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Native Android with Kotlin & Jetpack Compose — reliability, UX clarity, and real-world utility.',
    link: '/projects?category=mobile',
    tag: 'Android Native',
  },
  {
    icon: Zap,
    title: 'DSA & Algorithms',
    desc: 'Strong CS fundamentals for scalable systems, optimized APIs and fast engineering decisions.',
    link: '/projects?category=dsa',
    tag: 'Foundation',
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="stat-number">{count}{suffix}</div>
      <div className="text-zinc-500 text-sm font-medium tracking-wide mt-1">{label}</div>
    </div>
  );
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const About = () => {
  const { ref: headRef, inView: headInView } = useInView(0.2);
  const { ref: statsRef, inView: statsInView } = useInView(0.25);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.15);

  // Smooth fade-up animation variants (different from Hero's clip-reveal)
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section id="about" className="relative bg-[#0E0E0E] py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(circle at top right, rgba(110,60,188,0.06) 0%, transparent 60%)' }}
      />

      <div className="section-container">
        {/* Header with fade-up animation */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-20 max-w-3xl"
        >
          <motion.div
            variants={fadeUpVariants}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="section-eyebrow mb-5"
          >
            <span>Who I Am</span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-lg text-white mb-6 text-balance"
          >
            Engineering student who{' '}
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(135deg, #9370DB, #C084FC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ships.
            </em>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-zinc-400 text-lg leading-relaxed font-light max-w-2xl"
          >
            I'm an AI/ML-focused full-stack developer who loves turning high-stakes ideas into working products.
            From trusted identity systems and placement automation to AI security copilots, I build solutions
            that are practical, secure, and user-first. I enjoy leading fast execution cycles in hackathons,
            then refining those prototypes into production-minded architectures.
          </motion.p>
        </motion.div>

        {/* Stats with sequential fade-up */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-12 border-y border-white/[0.05]"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUpVariants}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <StatItem value={s.value} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </motion.div>

        {/* Cards grid with stagger */}
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="section-eyebrow mb-8"
          >
            <span>What I Do</span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUpVariants}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link to={card.link} className="block h-full group">
                    <div className="glass-card p-7 h-full flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="w-11 h-11 rounded-xl bg-purple/10 flex items-center justify-center group-hover:bg-purple/20 transition-all duration-300">
                          <Icon size={20} className="text-purple-light" />
                        </div>
                        <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-600 font-medium pt-0.5">
                          {card.tag}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-light transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{card.desc}</p>
                      </div>
                      <div className="mt-auto pt-2 flex items-center gap-2 text-zinc-600 group-hover:text-purple-light transition-colors duration-300 text-xs font-medium">
                        <span>See projects</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Large accent card — image */}
            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="glass-card p-7 h-full flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #6E3CBC 0%, transparent 60%)' }}
                />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple/30 mb-4">
                    <img src="/Images/darshil.jpg" alt="Darshil" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white/90 text-base font-light leading-relaxed italic">
                    "I enjoy leading fast execution cycles in hackathons, then refining those prototypes into
                    production-minded architectures."
                  </p>
                </div>
                <div className="relative mt-4 text-zinc-500 text-xs tracking-wide">
                  — Darshil Nathwani
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
