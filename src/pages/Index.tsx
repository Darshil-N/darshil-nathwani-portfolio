import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import SoftSkills from '../components/SoftSkills';
import ExploringSection from '../components/ExploringSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth',
        });
      }
      // Remove scrollTo from history state so it doesn't repeat
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    // Function to handle scroll animations
    const handleScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('.animate-slide-up');
      
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;
        
        if (isVisible) {
          element.classList.add('animate-slide-up');
        }
      });
    };

    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScrollAnimations);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Navbar />
      <main>
        <Hero>
          <Link to="/projects">
            <button className="bg-purple hover:bg-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg mt-8">
              View Projects
            </button>
          </Link>
        </Hero>
        <About />
        <Skills />
        <Education />
        <SoftSkills />
        <ExploringSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
