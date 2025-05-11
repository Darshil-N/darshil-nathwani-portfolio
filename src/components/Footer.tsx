
import React from 'react';
import { Github, Download } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white">Darshil <span className="text-purple">Nathwani</span></h3>
            <p className="text-gray-400 mt-2">Engineering Student | AI Enthusiast | Problem Solver</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="https://github.com/Anonymous-7777" 
              className="flex items-center text-gray-300 hover:text-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2" size={20} />
              GitHub
            </a>
            
            <a 
              href="#" 
              className="flex items-center text-gray-300 hover:text-purple transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // This would be replaced with the actual download link
                alert("Resume download triggered");
              }}
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Darshil Nathwani. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-400 hover:text-purple transition-colors text-sm">
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
