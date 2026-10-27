import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import ProfessionalExperience from '../components/ProfessionalExperience';
import Skills from '../components/Skills';
import SoftSkills from '../components/SoftSkills';
import Education from '../components/Education';
import Achievements from '../components/Achievements';
import ExploringSection from '../components/ExploringSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const location = useLocation();
  const [ready, setReady] = useState(false);

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

      <AnimatePresence mode="wait">
        {!ready && <Preloader onComplete={() => setReady(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {ready && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col min-h-screen bg-[#000000] relative overflow-x-clip text-[#FFFFFF]"
          >
            <Navbar />
            <main>
              <Hero />
              <FeaturedProjects />
              <ProfessionalExperience />
              <Achievements />
              <Skills />
              <SoftSkills />
              <Education />
              <ExploringSection />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
