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
        <div className="absolute inset-0 w-full h-full z-0">
          <img src="/Images/spline-sphere.png" alt="3D Sphere" className="w-full h-full object-cover" />
        </div>
      )}
      {inView && (
        <div className="absolute inset-0 w-full h-full z-0">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-purple bg-black/40">Loading 3D...</div>}>
            <Spline scene="https://prod.spline.design/tSFYRNk3hSRZ6tQm/scene.splinecode" renderOnDemand />
          </Suspense>
        </div>
      )}
      <div className="container max-w-3xl mx-auto px-4 z-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Darshil <span className="text-purple">Nathwani</span>
          </h1>
          <h2 className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 font-light tracking-wider">
            <span className="inline-block px-1">Engineering Student</span> | 
            <span className="inline-block px-1">AI Enthusiast</span> | 
            <span className="inline-block px-1">Problem Solver</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-10">
            Passionate about artificial intelligence, machine learning, and C++ development. 
            Building innovative solutions and exploring cutting-edge technologies to solve real-world problems.
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
