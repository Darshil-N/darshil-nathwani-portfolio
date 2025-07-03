import React from 'react';
import { Book } from 'lucide-react';
import Section from './ui/Section';

const Education = () => {
  return (
    <Section id="education" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Education</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="max-w-3xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <div className="gradient-border p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                  <Book className="text-purple" size={24} />
                </div>
              </div>
              
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <h3 className="text-xl font-semibold text-white mr-3">B.E. in Information Science and Engineering</h3>
                  <span className="bg-purple/20 text-purple text-sm px-3 py-1 rounded-full">2024 - Present</span>
                </div>
                
                <p className="text-gray-400">Dayananda Sagar College of Engineering Bengaluru</p>
                <div className="mt-4 space-y-2">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Education;