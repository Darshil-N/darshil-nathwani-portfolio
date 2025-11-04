import React, { useRef, Suspense, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden py-12 md:py-20">
      {/* Spline 3D background only for Hero, mounted only when in view */}
      {!inView && (
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-dark via-dark-secondary to-dark">
          <div className="w-full h-full flex items-center justify-center text-purple/20">
            <div className="w-32 h-32 rounded-full border-2 border-purple/20 animate-pulse"></div>
          </div>
        </div>
      )}
      {inView && (
        <div className="absolute inset-0 w-full h-full z-0">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-dark via-dark-secondary to-dark flex items-center justify-center">
              <div className="text-purple animate-pulse">Loading 3D Scene...</div>
            </div>
          }>
            <Spline scene="https://prod.spline.design/tSFYRNk3hSRZ6tQm/scene.splinecode" />
          </Suspense>
        </div>
      )}
      
      {/* Hide Spline watermark */}
      <div className="absolute bottom-4 right-4 w-40 h-16 bg-black z-20"></div>
      
      <div className="container max-w-3xl mx-auto px-4 z-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Darshil <span className="text-purple">Nathwani</span>
          </h1>
          <h2 className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 font-light tracking-wider">
            <span className="inline-block px-1">AI/ML Engineer</span> | 
            <span className="inline-block px-1">MLOps Enthusiast</span> | 
            <span className="inline-block px-1">Innovation Builder</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-10">
            I'm deeply fascinated by the endless possibilities of artificial intelligence and machine learning. 
            From building intelligent interview coaches to fraud detection systems, I love creating AI solutions 
            that make a real difference. My journey spans across computer vision, NLP, and MLOps - always with 
            the goal of turning complex algorithms into meaningful, user-friendly applications that solve genuine problems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/projects">
            <button 
              className="bg-purple hover:bg-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-base sm:text-lg w-full sm:w-auto"
            >
              View My Projects
            </button>
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-purple hover:border-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-base sm:text-lg w-full sm:w-auto hover:bg-purple/10"
            >
              Get In Touch
            </button>
          </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce z-10">
          <button 
            onClick={() => scrollToSection('about')}
            className="rounded-full border border-gray-600 p-2"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} className="text-gray-400" />
          </button>
      </div>
    </section>
  );
};

export default Hero;
