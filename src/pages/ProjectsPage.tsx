import React, { useEffect } from 'react';
import Projects from '../components/Projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Navbar />
      <main>
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage; 