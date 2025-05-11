
import React from 'react';

const Skills = () => {
  const skills = {
    programming: ["C++", "C", "Python (Basic)"],
    tools: ["GitHub", "LangChain", "Streamlit", "MongoDB", "TensorFlow", "OpenCV", "FastAPI"],
    concepts: ["DSA", "AI", "ML", "Data Science", "Cloud Computing"]
  };

  return (
    <section id="skills" className="bg-dark py-20">
      <div className="section-container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Programming</h3>
            <div className="flex flex-wrap">
              {skills.programming.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Tools</h3>
            <div className="flex flex-wrap">
              {skills.tools.map((tool, index) => (
                <span key={index} className="skill-tag">{tool}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Concepts</h3>
            <div className="flex flex-wrap">
              {skills.concepts.map((concept, index) => (
                <span key={index} className="skill-tag">{concept}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
