import React from 'react';
import Section from './ui/Section';

const ExploringSection = () => {
  const exploring = ["Gemini AI", "Pytorch", "Scikit-learn", "TensorFlow", "Deployment on Cloud","Deep Learning","Hugging Face","Prompt Engineering","NLP","MongoDB","Embeded Systems","Generative AI","MLops","TensorFlow","SQL"];

  return (
    <Section id="exploring" className="bg-dark-secondary py-20">
      <div className="section-container">
        <div className="flex justify-center">
          <h2 className="section-title text-center block mx-auto">Currently Exploring</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto mt-8">
          {exploring.map((item, index) => (
            <div 
              key={index}
              className="px-8 py-5 bg-dark border border-purple/30 rounded-xl shadow-lg hover:shadow-purple/30 hover:border-purple/60 transition-all duration-300 animate-slide-up opacity-0 flex items-center justify-center min-w-[180px] min-h-[60px]"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <span className="text-white font-semibold text-lg tracking-wide">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ExploringSection;
