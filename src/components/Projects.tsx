import React, { useMemo, useState } from 'react';
import { Github, ExternalLink, Lightbulb, Target, Code2, Database, Globe, Cpu, Brain, Eye, Bot, Settings, FileBarChart2, Layers, Terminal, FlaskConical, BookText, Server } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiPython, SiCplusplus, SiC, SiGithub, SiGit, SiVscodium, SiTensorflow, SiOpencv, SiFlask, SiJupyter, SiReact, SiTypescript, SiTailwindcss, SiSqlite, SiFastapi, SiStreamlit, SiMongodb, SiArduino, SiNodedotjs, SiSupabase, SiKotlin, SiFirebase, SiSolidity, SiPolygon, SiAndroid } from 'react-icons/si';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  techStack: string[];
  features?: string[];
  challenges?: string[];
  learnings?: string[];
  github?: string;
  liveDemo?: string;
  logo?: string;
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

// Tech stack icons mapping
const techStackIcons: Record<string, React.ReactNode> = {
  'React': <SiReact className="text-blue-500" size={24} />,
  'TypeScript': <SiTypescript className="text-blue-600" size={24} />,
  'FastAPI': <SiFastapi className="text-green-600" size={24} />,
  'XGBoost': <Brain className="text-purple-600" size={24} />,
  'SHAP': <FileBarChart2 className="text-orange-500" size={24} />,
  'SQLite': <SiSqlite className="text-blue-400" size={24} />,
  'TensorFlow': <SiTensorflow className="text-orange-600" size={24} />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-500" size={24} />,
  'Python': <SiPython className="text-yellow-500" size={24} />,
  'OpenCV': <SiOpencv className="text-red-500" size={24} />,
  'Flask': <SiFlask className="text-gray-600" size={24} />,
  'C++': <SiCplusplus className="text-blue-700" size={24} />,
  'GitHub': <SiGithub className="text-gray-700" size={24} />,
  'Git': <SiGit className="text-orange-500" size={24} />,
  'VS Code': <SiVscodium className="text-blue-500" size={24} />,
  'Jupyter Notebook': <SiJupyter className="text-orange-400" size={24} />,
  'MongoDB': <SiMongodb className="text-green-500" size={24} />,
  'Streamlit': <SiStreamlit className="text-red-500" size={24} />,
  'Arduino IDE': <SiArduino className="text-cyan-600" size={24} />,
  'Gemini API': <Bot className="text-purple-500" size={24} />,
  'Custom Dataset': <Database className="text-gray-500" size={24} />,
  'Camera Module': <Eye className="text-indigo-500" size={24} />,
  'Numpy': <Code2 className="text-blue-500" size={24} />,
  'Spline': <Cpu className="text-green-500" size={24} />,
  'Lovable AI': <Brain className="text-pink-500" size={24} />,
  'Cursor': <Terminal className="text-gray-600" size={24} />,
  'YOLO': <Eye className="text-red-600" size={24} />,
  'YOLOv8': <Eye className="text-red-600" size={24} />,
  'LangChain': <Layers className="text-green-600" size={24} />,
  'Node.js': <SiNodedotjs className="text-green-500" size={24} />,
  'Supabase': <SiSupabase className="text-green-600" size={24} />,
  'Vite': <Globe className="text-blue-500" size={24} />,
  'Emotion Detection': <Eye className="text-yellow-500" size={24} />,
  'WebRTC': <Globe className="text-purple-500" size={24} />,
  'Speech Recognition': <Bot className="text-blue-500" size={24} />,
  'Librosa': <Code2 className="text-orange-500" size={24} />,
  'Kotlin': <SiKotlin className="text-purple-500" size={24} />,
  'Android': <SiAndroid className="text-green-500" size={24} />,
  'Firebase': <SiFirebase className="text-orange-500" size={24} />,
  'Firestore': <Database className="text-orange-500" size={24} />,
  'Jetpack Compose': <SiAndroid className="text-green-600" size={24} />,
  'Solidity': <SiSolidity className="text-gray-700" size={24} />,
  'Polygon': <SiPolygon className="text-purple-600" size={24} />,
  'Blockchain': <Layers className="text-yellow-500" size={24} />,
  'NFC': <Settings className="text-blue-600" size={24} />,
  'SMS Fallback': <Bot className="text-green-600" size={24} />,
  'Geohashing': <Globe className="text-red-500" size={24} />,
  'Mapbox': <Globe className="text-blue-600" size={24} />,
  'Leaflet': <Globe className="text-green-500" size={24} />,
};

const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get('category') as Project['category'] | null;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects: Project[] = [
    {
      title: "Siddhi AI Platform",
      description: "Enterprise-grade augmented intelligence platform for concessional lending risk management. Features XGBoost ML models, SHAP explainability, LSTM forecasting, and comprehensive borrower assessment with interactive dashboards.",
      detailedDescription: "Siddhi is a comprehensive AI-powered platform designed for concessional lending risk management. It transforms static credit assessment into dynamic behavioral analysis, providing loan officers with intelligent decision-making tools. The platform combines multiple AI technologies including XGBoost for predictive modeling, SHAP for explainable AI, and LSTM networks for early warning systems.",
      techStack: ["React", "TypeScript", "FastAPI", "XGBoost", "SHAP", "SQLite", "TensorFlow", "Tailwind CSS"],
      features: [
        "XGBoost-powered risk scoring with 85%+ accuracy",
        "SHAP explainability for transparent AI decisions", 
        "Interactive borrower assessment dashboards",
        "Early warning system using LSTM forecasting",
        "Real-time behavioral analysis and monitoring",
        "Comprehensive audit trail and compliance reporting",
        "Multi-tier governance framework with human oversight"
      ],
      challenges: [
        "Handling 1.8M+ historical records efficiently",
        "Implementing explainable AI for regulatory compliance",
        "Balancing model accuracy with fairness metrics",
        "Creating intuitive UX for complex financial data"
      ],
      learnings: [
        "Advanced machine learning model deployment",
        "Enterprise-grade application architecture",
        "Financial domain expertise and regulations",
        "Explainable AI implementation with SHAP"
      ],
      github: "https://github.com/Darshil-N/Siddhi-Ai",
      logo: "https://raw.githubusercontent.com/Darshil-N/Siddhi-Ai/main/Siddhi_Logo.png",
      category: 'ml'
    },
    {
      title: "Kara-AI: Multi-Modal Interview Coach",
      description: "Revolutionary AI-powered interview coaching platform that analyzes speech, facial expressions, and body language in real-time. Features adaptive AI interviewers, emotion detection, and comprehensive performance analytics.",
      detailedDescription: "Kara-AI is a sophisticated multi-modal AI interview coach that revolutionizes interview preparation through advanced AI technology. The platform provides dynamic, context-aware simulated interview environments powered by Gemini 2.5 Flash. It processes live video and audio streams to evaluate performance across multiple dimensions including content quality, vocal delivery, and non-verbal cues through interactive reports.",
      techStack: ["React", "TypeScript", "FastAPI", "Python", "Node.js", "Gemini API", "YOLOv8", "OpenCV", "Supabase", "Vite", "Emotion Detection", "WebRTC", "Speech Recognition", "Librosa"],
      features: [
        "Real-time multi-modal analysis (speech, facial expressions, body language)",
        "Adaptive AI interviewers with different personalities and styles",
        "Live emotion detection with >77% accuracy using YOLOv8",
        "Speech recognition with >95% transcription accuracy",
        "Context-aware follow-up questions and dynamic conversations",
        "Comprehensive feedback dashboard with synchronized video playback",
        "Performance tracking across content, communication, and confidence",
        "Interactive reports with actionable improvement suggestions",
        "Sub-second feedback generation (avg. 500ms processing latency)",
        "PDF report generation for detailed analysis"
      ],
      challenges: [
        "Implementing real-time multi-modal data fusion and analysis",
        "Achieving low-latency processing for seamless user experience",
        "Training emotion detection models for diverse facial expressions",
        "Balancing AI sophistication with user-friendly interface",
        "Synchronizing video, audio, and AI analysis streams",
        "Creating realistic and adaptive AI interviewer personalities"
      ],
      learnings: [
        "Advanced multi-modal AI system architecture and integration",
        "Real-time video/audio processing and WebRTC implementation", 
        "Large language model integration with Gemini 2.5 Flash",
        "Computer vision with YOLOv8 for emotion and gesture recognition",
        "Full-stack development with React, FastAPI, and Node.js",
        "Building scalable AI applications with performance optimization"
      ],
      github: "https://github.com/Darshil-N/Kara-Ai",
      logo: "https://github.com/Darshil-N/Kara-Ai/blob/fd9e28527c1cf10665cc3bbb3c3e17c8d583cb21/Kara_Ai_Logo.png",
      isNew: true,
      category: 'ml'
    },
    {
      title: "Raahi: Smart Tourist Safety Platform",
      description: "Comprehensive digital ecosystem for tourist safety and convenience in Northeast India. Features blockchain-verified digital ID, NFC wristbands, emergency SMS fallback, real-time authority dashboard, and integrated travel services.",
      detailedDescription: "Project Raahi is a robust digital ecosystem that addresses tourist safety challenges through proactive, data-driven approach. It combines a native Android mobile app for tourists with a React web dashboard for authorities, powered by Firebase serverless architecture and Polygon blockchain for secure digital identity verification.",
      techStack: ["Kotlin", "Android", "Jetpack Compose", "React", "TypeScript", "Firebase", "Firestore", "Node.js", "Solidity", "Polygon", "Blockchain", "NFC", "SMS Fallback", "Geohashing", "Mapbox", "Leaflet"],
      features: [
        "Blockchain-verified digital ID on Polygon network with NFC wristband integration",
        "Panic button with SMS fallback - automatically sends GPS coordinates when offline",
        "Real-time location tracking with geospatial querying and proximity alerts",
        "Integrated travel hub storing itineraries, tickets, and travel documents",
        "Monument and local transport booking with crowd control mechanisms",
        "AI-powered dynamic safety score monitoring unusual activity patterns",
        "Unified authorities dashboard with live situational awareness and heatmaps",
        "Smart emergency resource mapper for automatic incident response routing",
        "Multi-language support (English/Hindi) with voice assistant integration",
        "Serverless architecture with Firebase Cloud Functions for scalability"
      ],
      challenges: [
        "Building offline-first emergency system with SMS fallback capabilities",
        "Implementing efficient geospatial queries for real-time location tracking",
        "Creating secure blockchain integration while maintaining user privacy",
        "Designing scalable serverless architecture for emergency response systems",
        "Balancing comprehensive features with intuitive user experience",
        "Ensuring reliable NFC verification in remote areas with poor connectivity"
      ],
      learnings: [
        "Native Android development with Kotlin and Jetpack Compose",
        "Blockchain development with Solidity smart contracts on Polygon",
        "Serverless architecture design with Firebase ecosystem",
        "Real-time geospatial data processing and visualization",
        "Emergency system design with offline capabilities",
        "Multi-platform development coordinating mobile app and web dashboard"
      ],
      github: "https://github.com/Darshil-N/Raahi",
      logo: "https://raw.githubusercontent.com/Anonymous-7777/Raahi/main/Logo.png",
      liveDemo: "https://raahi-eta.vercel.app/",
      isNew: true,
      category: 'oth'
    },
    {
      title: "AI Resource Suggestion Chatbot",
      description: "Built using Gemini API, LangChain, Streamlit & MongoDB. Suggests relevant learning resources based on incomplete task descriptions given by employees.",
      detailedDescription: "An intelligent chatbot that analyzes incomplete task descriptions from employees and suggests personalized learning resources. The system uses natural language processing to understand context and intent, then matches requirements with curated educational content.",
      techStack: ["Gemini API", "Flask", "LangChain", "Streamlit", "MongoDB"],
      features: [
        "Natural language understanding for task analysis",
        "Personalized resource recommendations",
        "Integration with multiple learning platforms",
        "Real-time chat interface with Streamlit",
        "Learning progress tracking and analytics"
      ],
      challenges: [
        "Handling ambiguous and incomplete user queries",
        "Integrating multiple data sources effectively",
        "Optimizing response time for real-time interaction"
      ],
      learnings: [
        "Large Language Model integration and prompt engineering",
        "Vector databases and semantic search",
        "Conversational AI design patterns"
      ],
      category: 'ml'
    },
    {
      title: "Automatic Trash Sorter",
      description: "Captures the live footage of trash and sorts it into different categories using OpenCV and TensorFlow.",
      detailedDescription: "An intelligent waste management system that uses computer vision to automatically identify and sort different types of waste materials. The system processes live camera feeds to classify trash into recyclables, organic waste, and general waste categories.",
      techStack: ["Python", "TensorFlow", "OpenCV", "Custom Dataset", "YOLO"],
      features: [
        "Real-time object detection and classification",
        "Multi-category waste sorting (plastic, paper, organic, metal)",
        "Custom trained CNN model with 90%+ accuracy",
        "Integration with robotic sorting mechanisms",
        "Analytics dashboard for waste management insights"
      ],
      challenges: [
        "Creating comprehensive training dataset",
        "Handling varying lighting conditions and angles",
        "Real-time processing optimization",
        "Integration with physical sorting hardware"
      ],
      learnings: [
        "Computer vision model training and optimization",
        "Real-time image processing techniques",
        "Hardware-software integration for robotics"
      ],
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
      category: 'data'
    },
    {
      title: "Portfolio Website",
      description: "Using no code tools and prompts able to create this websites",
      techStack: ["Github", "Spline", "Lovable AI","Cursor"],
      category: 'oth',
      github: "https://github.com/Anonymous-7777/darshil-nathwani-portfolio"
    },
    {
      title: "Live Trash Detector",
      description: "This Trash Detector when paired with a camera, detects trash in real-time and send signal to arm and collect the trash in real-time.",
      techStack: ["Python", "OpenCV", "TensorFlow", "Custom Dataset", "Arduino IDE"],
      category: 'cv'
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
                className="gradient-border p-6 h-full flex flex-col animate-slide-up opacity-0 cursor-pointer hover:border-purple-light transition-all duration-300 transform hover:scale-105" 
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => openProjectModal(project)}
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

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark border-2 border-purple/30 text-white">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      {selectedProject.logo && (
                        <img 
                          src={selectedProject.logo} 
                          alt={`${selectedProject.title} logo`}
                          className="w-10 h-10 object-contain"
                        />
                      )}
                      {selectedProject.title}
                      <div className="flex items-center space-x-2">
                        {selectedProject.isNew && (
                          <Badge className="bg-purple text-white">NEW</Badge>
                        )}
                        {selectedProject.inDevelopment && (
                          <Badge variant="secondary">IN DEVELOPMENT</Badge>
                        )}
                      </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-lg">
                      {selectedProject.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Detailed Description */}
                {selectedProject.detailedDescription && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="text-purple" size={20} />
                      Project Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.detailedDescription}
                    </p>
                  </div>
                )}



                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Settings className="text-purple" size={20} />
                    Technology Stack
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {selectedProject.techStack.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-purple/40 transition-colors">
                        {techStackIcons[tech] || <Code2 className="text-purple" size={24} />}
                        <span className="text-sm text-white font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Target className="text-purple" size={20} />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-purple rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Challenges & Learnings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Challenges */}
                  {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="text-purple" size={20} />
                        Challenges Overcome
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-purple rounded-full mt-2 flex-shrink-0"></div>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Learnings */}
                  {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Lightbulb className="text-purple-light" size={20} />
                        Key Learnings
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.learnings.map((learning, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-purple-light rounded-full mt-2 flex-shrink-0"></div>
                            {learning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Separator className="bg-purple/20" />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.github && (
                    <Button asChild className="bg-purple hover:bg-purple-light text-white border-none">
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={18} />
                        View Source Code
                      </a>
                    </Button>
                  )}
                  {selectedProject.liveDemo && (
                    <Button asChild className="bg-transparent border border-purple text-purple hover:bg-purple hover:text-white">
                      <a 
                        href={selectedProject.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" onClick={closeModal} className="border-gray-600 text-gray-300 hover:bg-purple/10 hover:border-purple">
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;