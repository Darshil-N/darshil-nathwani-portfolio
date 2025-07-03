import React, { useMemo } from 'react';
import { Github } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  isNew?: boolean;
  inDevelopment?: boolean;
  category: 'cv' | 'dsa' | 'ml' | 'data' | 'oth';
}

const categories = [
  { key: 'cv', label: 'Computer Vision' },
  { key: 'dsa', label: 'DSA' },
  { key: 'ml', label: 'Machine Learning' },
  { key: 'data', label: 'Data Interpretation' },
  { key: 'oth', label: 'Other' },
];

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get('category') as Project['category'] | null;

  const projects: Project[] = [
    {
      title: "AI Resource Suggestion Chatbot",
      description: "Built using Gemini API, LangChain, Streamlit & MongoDB. Suggests relevant learning resources based on incomplete task descriptions given by employees.",
      techStack: ["Gemini API", "Flask"],
      isNew: true,
      category: 'ml'
    },
    {
      title: "Automatic Trash Sorter",
      description: "Captures the live footage of trash and sorts it into different categories using OpenCV and TensorFlow.",
      techStack: ["Python", "TensorFlow", "OpenCV", "Custom Dataset"],
      inDevelopment: true,
      category: 'cv'
    },
    {
      title: "Single and 2 Player Rock-Paper-Scissors Game",
      description: "Built in C++ with live score tracking for both single-player (AI) and two-player modes.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/Games",
      category: 'dsa'
    },
    {
      title: "ATM Module",
      description: "Simulates ATM operations including user authentication, balance inquiry, deposits, and PIN changes.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/Atm_module",
      category: 'dsa'
    },
    {
      title: "GST Report Generator",
      description: "Automates GST calculations and report generation for annual tax summaries.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/GST_Report_Generator",
      category: 'dsa'
    },
    {
      title: "IPL Auction System",
      description: "Simulates an IPL auction with budget tracking and team/player selection features.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/IPL_AUCTION",
      category: 'dsa'
    },
    {
      title: "Stock Trading Simulator",
      description: "Simulates a stock exchange where players trade stocks with real-time fluctuations and leaderboard.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/Stock_Market_Sim",
      category: 'dsa'
    },
    {
      title: "Capturing Live Footage of Trash",
      description: "Using OpenCV the live photage of trash is sent to Live trash Detector. This is using numpy and panda to interpret the input and output for proper detection",
      techStack: ["Python", "OpenCV", "Camera Module","Numpy"],
      category: 'data',
      isNew: true
    },
    {
      title: "Portfolio Website",
      description: "Using no code tools and prompts able to create this websites",
      techStack: ["Github", "Spline", "Lovable AI","Cursor"],
      category: 'oth',
      github: "https://github.com/Anonymous-7777/darshil-nathwani-portfolio",
      isNew: true
    },
    {
      title: "Live Trash Detector",
      description: "This Trash Detector when paired with a camera, detects trash in real-time and send signal to arm and collect the trash in real-time.",
      techStack: ["Python", "OpenCV", "TensorFlow", "Custom Dataset", "Arduino IDE"],
      category: 'cv',
      isNew: true
    }
  ];

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory, projects]);

  return (
    <section id="projects" className="bg-dark-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Projects</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`px-5 py-2 rounded-full font-semibold border transition-all duration-200 text-sm
                ${selectedCategory === cat.key ? 'bg-purple text-white border-purple shadow-lg' : 'bg-dark-secondary text-purple border-purple/40 hover:bg-purple/10'}`}
              onClick={() => navigate(`?category=${cat.key}`)}
            >
              {cat.label}
            </button>
          ))}
          {selectedCategory && (
            <button
              className="ml-2 px-4 py-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-200 text-xs"
              onClick={() => navigate("/projects")}
            >
              Show All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No projects found for this category.</div>
          ) : (
            filteredProjects.map((project, index) => (
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;