import React from 'react';
import { Book } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Education</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="max-w-3xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          <div className="gradient-border p-6">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                  <Book className="text-purple" size={24} />
                </div>
              </div>
              
              <div>
                <div className="flex flex-wrap items-center mb-2">
                  <h3 className="text-xl font-semibold text-white mr-3">B.Tech in Computer Engineering</h3>
                  <span className="bg-purple/20 text-purple text-sm px-3 py-1 rounded-full">2024 - Present</span>
                </div>
                
                <p className="text-gray-400">First Year</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple rounded-full mr-2"></div>
                    <p className="text-gray-300">Focusing on fundamental computer engineering principles</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple rounded-full mr-2"></div>
                    <p className="text-gray-300">Building practical projects to enhance learning</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple rounded-full mr-2"></div>
                    <p className="text-gray-300">Exploring advanced topics like AI and machine learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;