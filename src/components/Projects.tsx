import React from 'react';
import { Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  isNew?: boolean;
  inDevelopment?: boolean;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "AI Resource Suggestion Chatbot",
      description: "Built using Gemini API, LangChain, Streamlit & MongoDB. Suggests relevant learning resources based on incomplete task descriptions given by employees.",
      techStack: ["Gemini API", "LangChain", "Streamlit", "MongoDB"],
      isNew: true
    },
    {
      title: "AI Health Severity & Disease Predictor",
      description: "Accepts user-uploaded medical images and metadata (age, gender, symptoms) to predict disease severity using CNN and NLP models.",
      techStack: ["Python", "TensorFlow", "OpenCV", "NLP"],
      inDevelopment: true
    },
    {
      title: "Single and 2 Player Rock-Paper-Scissors Game",
      description: "Built in C++ with live score tracking for both single-player (AI) and two-player modes.",
      techStack: ["C++"],
      github: "#"
    },
    {
      title: "ATM Module",
      description: "Simulates ATM operations including user authentication, balance inquiry, deposits, and PIN changes.",
      techStack: ["C++"],
      github: "#"
    },
    {
      title: "GST Report Generator",
      description: "Automates GST calculations and report generation for annual tax summaries.",
      techStack: ["C++"],
      github: "#"
    },
    {
      title: "IPL Auction System",
      description: "Simulates an IPL auction with budget tracking and team/player selection features.",
      techStack: ["C++"],
      github: "#"
    },
    {
      title: "Stock Trading Simulator",
      description: "Simulates a stock exchange where players trade stocks with real-time fluctuations and leaderboard.",
      techStack: ["C++"],
      github: "#"
    }
  ];

  return (
    <section id="projects" className="bg-dark-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Projects</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="gradient-border p-6 h-full flex flex-col animate-slide-up opacity-0" 
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <div className="flex items-center space-x-2">
                  {project.isNew && (
                    <span className="bg-purple text-white text-xs px-2 py-1 rounded-full">NEW</span>
                  )}
                  {project.inDevelopment && (
                    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">IN DEV</span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap mb-4">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="bg-dark text-gray-300 text-xs px-2 py-1 rounded mr-2 mb-2 border border-gray-800">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.github && (
                  <a 
                    href={project.github} 
                    className="inline-flex items-center text-purple hover:text-purple-light transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} className="mr-2" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;