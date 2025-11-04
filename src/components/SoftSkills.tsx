import React from "react";
import Section from './ui/Section';
import { Users, Lightbulb, MessageCircle, Clock, Search, Target, Brain, TrendingUp } from 'lucide-react';

const softSkills = [
  { icon: <Search className="text-purple" size={28} />, label: "Problem Solving" },
  { icon: <Brain className="text-purple" size={28} />, label: "Adaptability" },
  { icon: <TrendingUp className="text-purple" size={28} />, label: "Continuous Learning" },
  { icon: <Users className="text-purple" size={28} />, label: "Teamwork" },
  { icon: <MessageCircle className="text-purple" size={28} />, label: "Communication" },
  { icon: <Lightbulb className="text-purple" size={28} />, label: "Innovation" },
  { icon: <Target className="text-purple" size={28} />, label: "Goal-Oriented" },
  { icon: <Clock className="text-purple" size={28} />, label: "Time Management" },
];

const SoftSkills = () => {
  return (
    <Section id="softskills" className="bg-dark py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Professional Skills</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="gradient-border p-6 flex flex-col items-center justify-center text-white hover:scale-[1.02] transition-all duration-300 animate-slide-up opacity-0"
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              >
                <div className="mb-3 p-2 bg-purple/10 rounded-full">
                  {skill.icon}
                </div>
                <span className="text-center font-medium">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SoftSkills;