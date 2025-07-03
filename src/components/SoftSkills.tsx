import React from "react";

const softSkills = [
  { icon: "🤝", label: "Teamwork" },
  { icon: "💡", label: "Creativity" },
  { icon: "🗣️", label: "Communication" },
  { icon: "⏰", label: "Time Management" },
  { icon: "🔍", label: "Problem Solving" },
  { icon: "🎯", label: "Goal Oriented" },
  { icon: "🧠", label: "Adaptability" },
  { icon: "📈", label: "Continuous Learning" },
];

const SoftSkills = () => {
  return (
    <section id="softskills" className="bg-dark-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Soft Skills</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="gradient-border p-6 flex flex-col items-center justify-center text-white text-lg font-medium animate-slide-up opacity-0"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <span className="text-3xl mb-2">{skill.icon}</span>
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;