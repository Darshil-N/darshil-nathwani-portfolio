
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
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
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-dark overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl"></div>
      
      <div className="container max-w-3xl mx-auto px-4 z-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Darshil <span className="text-purple">Nathwani</span>
          </h1>
          
          <h2 className="text-gray-300 text-xl md:text-2xl mb-8 font-light tracking-wider">
            <span className="inline-block px-1">Engineering Student</span> | 
            <span className="inline-block px-1">AI Enthusiast</span> | 
            <span className="inline-block px-1">Problem Solver</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
            Passionate about artificial intelligence, machine learning, and C++ development. 
            Building innovative solutions and exploring cutting-edge technologies to solve real-world problems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-purple hover:bg-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg w-full sm:w-auto"
            >
              View My Projects
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-purple hover:border-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg w-full sm:w-auto hover:bg-purple/10"
            >
              Get In Touch
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="rounded-full border border-gray-600 p-2"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} className="text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
