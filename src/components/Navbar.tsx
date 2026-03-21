import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sectionIds = ['about', 'experience', 'projects', 'skills', 'education', 'achievements', 'exploring', 'contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Highlight logic
      let found = false;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionIds[i]);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveSection('about');
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionNav = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
      setIsMenuOpen(false);
    }
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

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume/Minimalist White and Grey Professional Resume.pdf';
    link.download = 'Darshil_Nathwani_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav
      className={`fixed w-full z-50 py-3 transition-all duration-300 ${
        isScrolled ? "bg-dark/90 shadow-lg shadow-purple/10 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-xl px-2 md:px-3">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Profile Image with hover effect */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple transition-transform duration-300 group-hover:scale-150 group-hover:z-50">
                <img 
                  src="/Images/darshil.jpg" 
                  alt="Darshil Nathwani profile picture" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="40"
                  height="40"
                  decoding="async"
                />
              </div>
              {/* Optional: Add a tooltip that appears on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-dark text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Darshil Nathwani
              </div>
            </div>
            {/* Name */}
            <h1 
              className="text-xl font-bold text-white cursor-pointer" 
              onClick={() => handleSectionNav('home')}
            >
              Darshil <span className="text-purple">Nathwani</span>
            </h1>
          </div>
          
          <div className="hidden md:flex flex-1 justify-end">
            <div className="ml-6 flex items-center gap-2 text-base">
              <button onClick={() => handleSectionNav('about')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'about' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>About</button>
              <button onClick={() => handleSectionNav('experience')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'experience' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Experience</button>
              <Link to="/projects" className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'projects' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>
                Projects
              </Link>
              <button onClick={() => handleSectionNav('skills')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'skills' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Skills</button>
              <button onClick={() => handleSectionNav('education')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'education' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Education</button>
              <button onClick={() => handleSectionNav('achievements')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'achievements' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Achievements</button>
              <button onClick={() => handleSectionNav('exploring')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'exploring' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Exploring</button>
              <button onClick={() => handleSectionNav('contact')} className={`px-2 py-1 transition-colors duration-300 ${activeSection === 'contact' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Contact</button>
              <button 
                className="uiverse-btn ml-3"
                data-text="RESUME"
                onClick={(e) => {
                  e.preventDefault();
                  handleResumeDownload();
                }}
              >
                <span className="actual-text">&nbsp;RESUME&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;RESUME&nbsp;</span>
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-secondary border-t border-purple/10 mt-4">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <button onClick={() => handleSectionNav('about')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'about' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>About</button>
            <button onClick={() => handleSectionNav('experience')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'experience' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Experience</button>
            <Link to="/projects" className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'projects' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Projects</Link>
            <button onClick={() => handleSectionNav('skills')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'skills' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Skills</button>
            <button onClick={() => handleSectionNav('education')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'education' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Education</button>
            <button onClick={() => handleSectionNav('achievements')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'achievements' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Achievements</button>
            <button onClick={() => handleSectionNav('exploring')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'exploring' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Exploring</button>
            <button onClick={() => handleSectionNav('contact')} className={`block w-full text-left py-2 transition-colors duration-300 ${activeSection === 'contact' ? 'text-purple font-bold' : 'text-gray-300 hover:text-purple'}`}>Contact</button>
            <div className="flex justify-center w-full my-4">
              <button 
                className="uiverse-btn"
                data-text="RESUME"
                onClick={(e) => {
                  e.preventDefault();
                  handleResumeDownload();
                }}
              >
                <span className="actual-text">&nbsp;RESUME&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;RESUME&nbsp;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;