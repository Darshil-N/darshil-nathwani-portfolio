
import React from 'react';

const ExploringSection = () => {
  const exploring = ["Gemini AI", "Streamlit", "Computer Vision", "API Development", "Deployment on Cloud"];

  return (
    <section className="bg-dark py-20">
      <div className="section-container">
        <h2 className="section-title">Currently Exploring</h2>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          {exploring.map((item, index) => (
            <div 
              key={index}
              className="px-6 py-4 bg-dark-secondary border border-purple/20 rounded-lg hover:border-purple/50 transition-all duration-300"
            >
              <span className="text-white font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploringSection;
