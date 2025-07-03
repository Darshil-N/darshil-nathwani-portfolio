import React, { useState, useEffect } from 'react';
import { Cloud, Eye, X, ArrowLeft, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import Section from './ui/Section';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Typewriter({ text, start, speed = 22, className = '' }: { text: string; start: boolean; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!start) {
      setDisplayed('');
      return;
    }
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, start, speed]);
  return <span className={className}>{displayed}</span>;
}

const aboutCards = [
  {
    icon: <Eye className="text-purple" size={28} />, 
    title: 'Computer Vision', 
    desc: 'Turning images into intelligence',
    brief: 'Teaching computers to see and think Using this Projects.',
    link: '/projects'
  },
  {
    icon: <span className="text-purple font-bold text-xl">DSA</span>, 
    title: 'DSA', 
    desc: 'Sharpening Algorithms & Logic with C++',
    brief: 'Shaping clarity from simplicity Using this projects.',
    link: '/projects'
  },
  {
    icon: <span className="text-purple font-bold text-xl">ML</span>, 
    title: 'Machine Learning', 
    desc: 'Training models to see patterns humans miss',
    brief: 'Training models that see what the human eye misses using this projects.',
    link: '/projects'
  },
  {
    icon: <Eye className="text-purple" size={28} />, 
    title: 'Data Interpretation', 
    desc: 'Turning images into intelligence',
    brief: 'Reading between the lines using this projects.',
    link: '/projects'
  },
];

const aboutCategoryMap: Record<string, string> = {
  'Computer Vision': 'cv',
  'DSA': 'dsa',
  'Machine Learning': 'ml',
  'Data Interpretation': 'data',
};

const About = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section id="about" className="bg-dark-secondary py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-2">About Me</h2>
      {/* Purple line below heading */}
      <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
      
      <div className="max-w-4xl mx-auto relative min-h-[420px] flex items-center justify-center">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-300 text-lg leading-relaxed mb-12 text-center">
            I'm passionate about artificial intelligence, machine learning, and modern C++ development. I enjoy exploring how intelligent systems can be designed to solve real-world problems efficiently and creatively. With a growing interest in combining software and systems thinking, I strive to build solutions that are both practical and forward-looking. I value continuous learning and am always eager to expand my skill set through hands-on work with emerging technologies.
          </p>
          {/* Expanded card view */}
          <AnimatePresence mode="wait">
            {expanded !== null ? (
              <motion.div
                key={expanded}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex flex-col items-center justify-center min-h-[320px] w-full"
              >
                <div className="flex flex-col items-center gradient-border p-8 md:p-12 bg-dark/80 rounded-2xl shadow-2xl max-w-xl w-full transition-all duration-500 relative">
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark-secondary/90 hover:bg-dark-secondary p-2 rounded-full text-purple hover:text-white transition-colors z-10 shadow-lg border border-purple"
                    onClick={() => setExpanded((expanded! - 1 + aboutCards.length) % aboutCards.length)}
                    aria-label="Previous card"
                  >
                    <ArrowBigLeft size={32} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark-secondary/90 hover:bg-dark-secondary p-2 rounded-full text-purple hover:text-white transition-colors z-10 shadow-lg border border-purple"
                    onClick={() => setExpanded((expanded! + 1) % aboutCards.length)}
                    aria-label="Next card"
                  >
                    <ArrowBigRight size={32} />
                  </button>
                  {/* X (close) button */}
                  <button
                    className="absolute top-4 right-4 bg-dark-secondary/90 hover:bg-dark-secondary p-2 rounded-full text-purple hover:text-white transition-colors z-20 shadow-lg border border-purple"
                    onClick={() => setExpanded(null)}
                    aria-label="Back to grid"
                  >
                    <X size={22} />
                  </button>
                  <div className="mb-4 mt-2">
                    <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      {aboutCards[expanded].icon}
                    </div>
                    <h3 className="text-white font-bold text-2xl text-center mb-1">{aboutCards[expanded].title}</h3>
                    <p className="text-gray-400 text-center">{aboutCards[expanded].desc}</p>
                  </div>
                  <Typewriter text={aboutCards[expanded].brief} start={expanded !== null} className="text-gray-300 mb-4 block min-h-[24px] text-center" />
                  <Link to={`/projects?category=${aboutCategoryMap[aboutCards[expanded].title]}`}
                    className="text-purple underline font-medium hover:text-purple-light transition-colors duration-200 text-center mb-6"
                    onClick={e => e.stopPropagation()}>
                    See Related Projects
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
              >
                {aboutCards.map((card, i) => (
                  <button
                    key={card.title}
                    className={`flex flex-col items-start gradient-border p-6 stagger-fade-up text-left transition-all duration-300 focus:outline-none hover:scale-[1.04]`}
                    style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                    onClick={() => setExpanded(i)}
                    aria-expanded={false}
                  >
                    <div className="flex items-center w-full">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                          {card.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg mb-2">{card.title}</h3>
                        <p className="text-gray-400">{card.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default About;