import React, { useEffect } from 'react';
import Projects from '../components/Projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <CustomCursor />
      <Navbar />
      {/* Opaque and above the footer, so the footer's curtain reveal works */}
      <main style={{ position: 'relative', zIndex: 1, backgroundColor: '#0C0C0E' }}>
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage; 