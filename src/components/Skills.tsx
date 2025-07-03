import React from 'react';

const Skills = () => {
  const skills = {
    programming: ["C++", "C", "Python"],
    tools: ["GitHub", "Git", "VS Code", "YOLO", "TensorFlow", "OpenCV", "Flask","Jupyter Notebook","LabelImg","Kaggle","Roboflow","Google Colab","Anaconda","Pandas","Numpy","Matplotlib",],
    concepts: ["DSA", "AI", "ML", "Data Science", "Cloud Computing","Computer Vision","API Development","Version Control (Git)","Object-Oriented Programming (OOP)","Data Interpretation","Deployment"]
  };

  return (
    <section id="skills" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Technical Skills</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Programming Languages</h3>
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