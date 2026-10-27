import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  ShieldCheck, 
  Trophy, 
  GitBranch, 
  Database, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../lib/sound';

const PILLARS = [
  {
    number: '01',
    title: 'High-Throughput Multi-Agent Systems & Distributed AI Infra',
    highlight: 'Concurrency, Redis Queues & Task Orchestration',
    description: 
      'Rather than just calling LLM endpoints, I design the resilient plumbing beneath autonomous systems. Proven at the Microsoft Buildathon (Top 10 finish out of 200+ builders), where I built a fault-tolerant multi-agent request layer managing high-load queues, intelligent caching, and containerized Docker networking.',
    capabilities: [
      'Multi-agent state synchronization and contention-free routing',
      'Redis queue architecture and distributed task caching',
      'Containerized microservices orchestration with Docker',
      'Zero-bottleneck API throughput under high concurrency',
    ],
    proof: 'Top 10 @ Nasiko x Devaarambh Buildathon at Microsoft',
    accentColor: 'from-sky-500/20 to-blue-600/20',
    borderColor: 'group-hover:border-sky-500/40',
    icon: Zap,
  },
  {
    number: '02',
    title: 'Explainable AI, Multimodal Intelligence & Computer Vision',
    highlight: 'From 1.8M Financial Records to Sub-Second Video Telemetry',
    description: 
      'I bridge raw machine learning models with human-verifiable systems. In Siddhi AI, I deployed XGBoost with SHAP explainability matrices for 1.8M+ financial records so risk officers understand every AI decision. In Kara-AI, I fused Gemini 2.5 Flash with YOLOv8 real-time computer vision for sub-second facial emotion tracking.',
    capabilities: [
      'Explainable AI (XAI) using SHAP values and feature attribution',
      'Sub-second real-time computer vision (YOLOv8, OpenCV, WebRTC)',
      'Time-series forecasting with LSTM networks and early-warning alerts',
      'LLM integration & orchestration (Gemini API, Ollama, LangChain)',
    ],
    proof: 'Siddhi AI (1.8M Records) & Kara-AI Multimodal Platform',
    accentColor: 'from-indigo-500/20 to-purple-600/20',
    borderColor: 'group-hover:border-indigo-500/40',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Hackathon Velocity with Production Rigor & Full-Stack Craft',
    highlight: 'Rapid Prototyping That Transitions Cleanly Into Scalable Code',
    description: 
      'I thrive in high-stakes sprints and carry that execution speed into production architectures. Multiple hackathon podium finishes (1st place at Indian Chess Academy, Top 20 at CICADA) directly translated into industry internships where I shipped official academy websites, internal operations dashboards, and peer-reviewed research.',
    capabilities: [
      'Full-stack mastery: React, TypeScript, FastAPI, Node.js, Tailwind CSS',
      'Native Android engineering with Kotlin and Jetpack Compose',
      'Rigorous peer-reviewed research: accepted IEEE TENCON 2026 author',
      'Clean Git workflows, automated CI/CD, and defensive security scanning',
    ],
    proof: '1st Place Hackathon Winner & IEEE TENCON 2026 Co-Author',
    accentColor: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'group-hover:border-emerald-500/40',
    icon: ShieldCheck,
  },
];

const METRICS = [
  { value: '20+', label: 'Shipped Projects', detail: 'AI, Web & Mobile' },
  { value: 'Top 10', label: 'Microsoft Buildathon', detail: 'Out of 200+ Builders' },
  { value: '1st', label: 'Hackathon Champion', detail: 'Indian Chess Academy' },
  { value: '1.8M+', label: 'Records Handled', detail: 'Concessional Risk Engine' },
  { value: 'IEEE', label: 'TENCON Publication', detail: 'Peer-Reviewed Research' },
  { value: '3+', label: 'Technical Internships', detail: 'Software & AI Research' },
];

export default function WhyHireMe() {
  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="why-hire" className="relative py-28 bg-[#050609] overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        
        {/* Section Eyebrow & Title (Dan Mall Authority) */}
        <div className="max-w-3xl mb-16">
          <div className="section-eyebrow mb-4">
            <span>The Value Proposition</span>
          </div>

          <h2 className="heading-lg text-white mb-6">
            Why hire{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-300">
              Darshil Nathwani?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Most portfolios show tutorial clones. I build high-concurrency systems that withstand hackathon time crunches, 
            process millions of production data points, and ship into real client ecosystems. Here is what I bring to your engineering organization:
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-3xl p-7 bg-[#090B12] border border-white/10 transition-all duration-300 hover:border-sky-500/40 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Glow background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-sky-400 tracking-wider">
                      {pillar.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-sky-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase mb-2">
                    {pillar.highlight}
                  </span>

                  <h3 className="font-syne text-xl font-bold text-white mb-4 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2 mb-6">
                    {pillar.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Proof Pill */}
                <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-sky-300 font-semibold">{pillar.proof}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quantified Metrics Grid */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#090B12]/80 border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">
                Proven Track Record
              </span>
              <h3 className="font-syne text-2xl font-bold text-white mt-1">
                Numbers That Back Up The Code
              </h3>
            </div>
            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => sound.playHover()}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider hover:bg-sky-500 hover:text-black transition-all"
            >
              <span>Schedule Technical Screen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {METRICS.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-syne text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {m.value}
                </span>
                <span className="text-xs font-bold text-sky-400 mt-1 uppercase tracking-wider font-mono">
                  {m.label}
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5">
                  {m.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
