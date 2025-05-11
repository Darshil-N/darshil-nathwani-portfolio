
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${
        isScrolled ? "bg-dark shadow-lg shadow-purple/5 backdrop-blur-md bg-opacity-80" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 
              className="text-xl font-bold text-white cursor-pointer" 
              onClick={() => scrollToSection('home')}
            >
              Darshil <span className="text-purple">Nathwani</span>
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-purple transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-purple transition-colors duration-300">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-purple transition-colors duration-300">Projects</button>
              <button onClick={() => scrollToSection('education')} className="text-gray-300 hover:text-purple transition-colors duration-300">Education</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-purple transition-colors duration-300">Contact</button>
              <a 
                href="#" 
                className="bg-purple hover:bg-purple-light text-white px-5 py-2 rounded-md transition-colors duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // This would be replaced with the actual download link
                  alert("Resume download triggered");
                }}
              >
                Resume
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-secondary border-t border-purple/10 mt-4">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">About</button>
            <button onClick={() => scrollToSection('skills')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Projects</button>
            <button onClick={() => scrollToSection('education')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Education</button>
            <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Contact</button>
            <a 
              href="#" 
              className="block bg-purple hover:bg-purple-light text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium w-full text-center my-4"
              onClick={(e) => {
                e.preventDefault();
                // This would be replaced with the actual download link
                alert("Resume download triggered");
              }}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
