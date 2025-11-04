import React, { useState, useEffect } from 'react';
import { Brain, Smartphone, Eye, Globe, Zap, X, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import Section from './ui/Section';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Typewriter({ text, start, speed = 22, className = '' }: { text: string; start: boolean; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!start || !text) {
      setDisplayed('');
      return;
    }
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + (text[i] || ''));
        i++;
      }
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, start, speed]);
  return <span className={className}>{displayed}</span>;
}

const aboutCards = [
  {
    icon: <Brain className="text-purple" size={28} />, 
    title: 'Artificial Intelligence', 
    desc: 'Building intelligent systems with ML & NLP',
    brief: 'I specialize in developing machine learning models and natural language processing systems that can understand context and make intelligent predictions. My expertise spans across neural networks, deep learning, and creating AI solutions that adapt and learn from data to solve complex real-world challenges.',
    link: '/projects'
  },
  {
    icon: <Smartphone className="text-purple" size={28} />, 
    title: 'Mobile Development', 
    desc: 'Native Android apps with modern architecture',
    brief: 'I build native Android applications using modern development practices with Kotlin and Jetpack Compose. My focus is on creating intuitive user experiences while integrating advanced technologies like blockchain, real-time communication, and cloud services for comprehensive mobile solutions.',
    link: '/projects'
  },
  {
    icon: <Eye className="text-purple" size={28} />, 
    title: 'Computer Vision', 
    desc: 'Teaching machines to see and understand',
    brief: 'I develop computer vision systems that can analyze images, detect objects, recognize faces, and interpret visual patterns. Using frameworks like YOLO and OpenCV, I create applications that bridge the gap between human visual perception and machine understanding through advanced image processing techniques.',
    link: '/projects'
  },
  {
    icon: <Globe className="text-purple" size={28} />, 
    title: 'Web Development', 
    desc: 'Full-stack applications with modern tech',
    brief: 'I have created full-stack web applications using React, TypeScript, and Node.js, focusing on responsive design and seamless user experiences. My approach emphasizes clean architecture, performance optimization, and building interfaces that make complex functionality accessible and intuitive for end users.',
    link: '/projects'
  },
  {
    icon: <Zap className="text-purple" size={28} />, 
    title: 'Data Structures & Algorithms', 
    desc: 'Optimizing performance with efficient code',
    brief: 'I have a strong foundation in computer science fundamentals, implementing efficient algorithms and data structures in C++. My focus is on writing optimized code that scales well, understanding time and space complexity, and applying algorithmic thinking to solve challenging computational problems.',
    link: '/projects'
  },
];

const aboutCategoryMap: Record<string, string> = {
  'Artificial Intelligence': 'ai',
  'Mobile Development': 'mobile',
  'Computer Vision': 'cv',
  'Web Development': 'web',
  'Data Structures & Algorithms': 'dsa',
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
            I'm an AI/ML engineer who believes technology should make life better, not more complicated. My journey started with curiosity about how machines could learn and think, and has evolved into building practical AI solutions that solve real problems. Whether it's creating an intelligent interview coach that helps people land their dream jobs, or developing fraud detection systems that protect financial institutions, I focus on making AI accessible and impactful. I'm driven by the challenge of turning complex algorithms into user-friendly applications that people actually want to use.
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