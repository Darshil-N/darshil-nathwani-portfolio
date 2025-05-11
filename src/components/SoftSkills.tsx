
import React from 'react';

const SoftSkills = () => {
  const softSkills = ["Team Collaboration", "Adaptability", "Time Management"];

  return (
    <section className="bg-dark-secondary py-20">
      <div className="section-container">
        <h2 className="section-title">Soft Skills</h2>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {softSkills.map((skill, index) => (
            <div 
              key={index}
              className="gradient-border p-8 flex flex-col items-center animate-slide-up opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-purple font-semibold">{skill.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-semibold text-white text-center">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;
