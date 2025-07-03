import React from 'react';
import { Cloud, Eye } from 'lucide-react';
import Section from './ui/Section';

const About = () => {
  return (
    <Section id="about" className="bg-dark-secondary py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-2">About Me</h2>
      {/* Purple line below heading */}
      <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-300 text-lg leading-relaxed mb-12 text-center">
            I'm passionate about artificial intelligence, machine learning, and modern C++ development. I enjoy exploring how intelligent systems can be designed to solve real-world problems efficiently and creatively. With a growing interest in combining software and systems thinking, I strive to build solutions that are both practical and forward-looking. I value continuous learning and am always eager to expand my skill set through hands-on work with emerging technologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Eye className="text-purple" size={28} />, title: 'Computer Vision', desc: 'Turning images into intelligence' },
              { icon: <span className="text-purple font-bold text-xl">DSA</span>, title: 'DSA', desc: 'Sharpening Algorithms & Logic with C++' },
              { icon: <span className="text-purple font-bold text-xl">ML</span>, title: 'Machine Learning', desc: 'Training models to see patterns humans miss' },
              { icon: <Eye className="text-purple" size={28} />, title: 'Data Interpretation', desc: 'Turning images into intelligence' },
            ].map((card, i) => (
              <div
                key={card.title}
                className="flex items-center gradient-border p-6 stagger-fade-up"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <div className="mr-4">
                  <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-2">{card.title}</h3>
                  <p className="text-gray-400">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;