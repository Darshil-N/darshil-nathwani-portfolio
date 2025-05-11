
import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-dark-secondary py-20">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="max-w-3xl animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            A tech-enthusiastic first-year engineering student with a solid foundation in C++ 
            and a strong interest in Artificial Intelligence, Machine Learning, and Cloud Computing. 
          </p>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Experienced in building interactive C++ applications and currently exploring AI-powered tools 
            to solve real-world problems. Passionate about continuous learning, team collaboration, and hands-on innovation.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gradient-border p-5 flex-grow basis-72">
              <div className="mr-4">
                <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-purple font-bold text-xl">AI</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg mb-1">Artificial Intelligence</h3>
                <p className="text-gray-400">Building intelligent systems using modern AI techniques</p>
              </div>
            </div>
            
            <div className="flex items-center gradient-border p-5 flex-grow basis-72">
              <div className="mr-4">
                <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-purple font-bold text-xl">C++</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg mb-1">C++ Development</h3>
                <p className="text-gray-400">Creating efficient and robust applications</p>
              </div>
            </div>
            
            <div className="flex items-center gradient-border p-5 flex-grow basis-72">
              <div className="mr-4">
                <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-purple font-bold text-xl">ML</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg mb-1">Machine Learning</h3>
                <p className="text-gray-400">Implementing data-driven solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
