import React, { useEffect } from 'react';
import HeroOrbit from '../components/heroes/HeroOrbit';
import PhotoStrip from '../components/heroes/PhotoStrip';
import FeaturedProjects from '../components/FeaturedProjects';
import ProfessionalExperience from '../components/ProfessionalExperience';
import Skills from '../components/Skills';
import SoftSkills from '../components/SoftSkills';
import Education from '../components/Education';
import Achievements from '../components/Achievements';
import ExploringSection from '../components/ExploringSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <CustomCursor />

      {/* The hero carries its own loading screen, and hands its index over to the navbar as you scroll. */}
      <div className="flex flex-col min-h-screen bg-[#000000] relative overflow-x-clip text-[#FFFFFF]">
            {/* Opaque and above the footer, so the footer's curtain reveal works */}
            <main style={{ position: 'relative', zIndex: 1, backgroundColor: '#0C0C0E' }}>
              <HeroOrbit />
              <FeaturedProjects />
              <ProfessionalExperience />
              <Achievements />
              <Skills />
              <SoftSkills />
              <Education />
              <ExploringSection />
              <PhotoStrip />
              <Contact />
            </main>
            <Footer />
      </div>
    </>
  );
};

export default Index;
