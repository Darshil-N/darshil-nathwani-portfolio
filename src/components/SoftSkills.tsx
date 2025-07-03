import React from "react";
import Section from './ui/Section';
import { Users, Lightbulb, MessageCircle, Clock, Search, Target, Brain, TrendingUp } from 'lucide-react';

const softSkills = [
  { icon: <Users className="text-purple" size={28} />, label: "Teamwork" },
  { icon: <Lightbulb className="text-purple" size={28} />, label: "Creativity" },
  { icon: <MessageCircle className="text-purple" size={28} />, label: "Communication" },
  { icon: <Clock className="text-purple" size={28} />, label: "Time Management" },
  { icon: <Search className="text-purple" size={28} />, label: "Problem Solving" },
  { icon: <Target className="text-purple" size={28} />, label: "Goal Oriented" },
  { icon: <Brain className="text-purple" size={28} />, label: "Adaptability" },
  { icon: <TrendingUp className="text-purple" size={28} />, label: "Continuous Learning" },
];

const SoftSkills = () => {
  return (
    <Section id="softskills" className="bg-dark-secondary py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Soft Skills</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="gradient-border p-4 sm:p-6 flex flex-col items-center justify-center text-white text-base sm:text-lg font-medium animate-slide-up opacity-0"
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              >
                <span className="text-2xl sm:text-3xl mb-2">{skill.icon}</span>
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SoftSkills;