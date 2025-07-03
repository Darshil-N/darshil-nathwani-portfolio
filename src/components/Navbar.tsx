import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${
        isScrolled ? "bg-dark shadow-lg shadow-purple/5 backdrop-blur-md bg-opacity-80" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Profile Image with hover effect */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple transition-transform duration-300 group-hover:scale-150 group-hover:z-50">
                <img 
                  src="/Images/darshil.jpg" 
                  alt="Darshil Nathwani" 
                  className="w-full h-full object-cover"
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
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button onClick={() => handleSectionNav('about')} className="text-gray-300 hover:text-purple transition-colors duration-300">About</button>
              <button onClick={() => handleSectionNav('skills')} className="text-gray-300 hover:text-purple transition-colors duration-300">Skills</button>
              <Link to="/projects" className="text-gray-300 hover:text-purple transition-colors duration-300">
                Projects
              </Link>
              <button onClick={() => handleSectionNav('education')} className="text-gray-300 hover:text-purple transition-colors duration-300">Education</button>
              <button onClick={() => handleSectionNav('softskills')} className="text-gray-300 hover:text-purple transition-colors duration-300">Soft Skills</button>
              <button onClick={() => handleSectionNav('contact')} className="text-gray-300 hover:text-purple transition-colors duration-300">Contact</button>
              <a 
                href="#" 
                className="bg-purple hover:bg-purple-light text-white px-5 py-2 rounded-md transition-colors duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  handleResumeDownload();
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
            <button onClick={() => handleSectionNav('about')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">About</button>
            <button onClick={() => handleSectionNav('skills')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Skills</button>
            <Link to="/projects" className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Projects</Link>
            <button onClick={() => handleSectionNav('education')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Education</button>
            <button onClick={() => handleSectionNav('softskills')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Soft Skills</button>
            <button onClick={() => handleSectionNav('contact')} className="block text-gray-300 hover:text-purple w-full text-left py-2 transition-colors duration-300">Contact</button>
            <a 
              href="#" 
              className="block bg-purple hover:bg-purple-light text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium w-full text-center my-4"
              onClick={(e) => {
                e.preventDefault();
                handleResumeDownload();
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