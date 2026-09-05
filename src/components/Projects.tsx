import React, { useMemo, useState } from 'react';
import { Github, ExternalLink, Lightbulb, Target, Code2, Database, Globe, Cpu, Brain, Eye, Bot, Settings, FileBarChart2, Layers, Terminal, FlaskConical, BookText, Server } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiPython, SiCplusplus, SiC, SiGithub, SiGit, SiVscodium, SiTensorflow, SiOpencv, SiFlask, SiJupyter, SiReact, SiTypescript, SiTailwindcss, SiSqlite, SiFastapi, SiStreamlit, SiMongodb, SiArduino, SiNodedotjs, SiSupabase, SiKotlin, SiFirebase, SiSolidity, SiPolygon, SiAndroid, SiRedis, SiDocker } from 'react-icons/si';
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
  category: 'ai' | 'mobile' | 'cv' | 'web' | 'dsa';
}

const categories = [
  { key: 'ai', label: 'AI & Machine Learning' },
  { key: 'mobile', label: 'Mobile & Full-Stack' },
  { key: 'cv', label: 'Computer Vision' },
  { key: 'web', label: 'Web Development' },
  { key: 'dsa', label: 'DSA & Algorithms' },
];

// Function to get default logo based on project category and type
const getDefaultLogo = (project: Project) => {
  // AI/ML Projects
  if (project.category === 'ai') {
    return <Brain className="w-6 h-6 text-purple" />;
  }
  
  // Mobile/Full-Stack Projects  
  if (project.category === 'mobile') {
    if (project.techStack.includes('Android') || project.techStack.includes('Kotlin')) {
      return <SiAndroid className="w-6 h-6 text-green-500" />;
    }
    return <Globe className="w-6 h-6 text-purple" />;
  }
  
  // Computer Vision Projects
  if (project.category === 'cv') {
    return <Eye className="w-6 h-6 text-purple" />;
  }
  
  // Web Development Projects
  if (project.category === 'web') {
    return <Globe className="w-6 h-6 text-purple" />;
  }
  
  // DSA/Algorithm Projects
  if (project.category === 'dsa') {
    return <Terminal className="w-6 h-6 text-purple" />;
  }
  
  // Default fallback
  return <Code2 className="w-6 h-6 text-purple" />;
};

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
  'Redis': <SiRedis className="text-red-600" size={24} />,
  'Docker': <SiDocker className="text-blue-500" size={24} />,
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
      title: "Resilient Multi-Agent Request Layer",
      description: "A resilient request layer for multi-agent systems built during the Nasiko x Devaarambh Buildathon (finished in the Top 10), managing request queues, routing, and caching logic.",
      detailedDescription: "Designed and built during the Nasiko x Devaarambh Buildathon held at Microsoft, this project is a resilient request layer for multi-agent systems. The architecture focuses on handling high-throughput agent communication by integrating Redis queue structures, containerized Docker deployments, and robust API routing to handle concurrent tasks and cache constraints, securing a Top 10 finish out of over 200 builders.",
      techStack: ["Redis", "Docker", "Python", "API Routing", "Multi-Agent Systems", "Caching", "Queues"],
      features: [
        "Finished in the Top 10 at the Nasiko x Devaarambh Buildathon at Microsoft",
        "Resilient request layer designed specifically for multi-agent communication",
        "Redis-backed task queueing and caching to manage concurrent agent requests",
        "Dockerized environment setup for reliable orchestration and routing"
      ],
      challenges: [
        "Managing multi-agent state coordination without bottlenecking requests",
        "Fighting Redis queue synchronization and cache logic under rapid iteration",
        "Handling Docker container networking and API routing constraints under tight hackathon timelines"
      ],
      learnings: [
        "Mastered open-source integration, focusing on how not to break existing code while adding new features",
        "Designed resilient request routing architectures for distributed AI agent systems",
        "Optimized Docker containerization and network pipelines under pressure"
      ],
      isNew: true,
      category: 'ai'
    },
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
      category: 'ai'
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
      logo: "/Logos/Kara_ai.png",
      isNew: true,
      category: 'ai'
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
      logo: "https://raw.githubusercontent.com/Darshil-N/Raahi/main/Logo.png",
      liveDemo: "https://raahi-eta.vercel.app/",
      isNew: true,
      category: 'mobile'
    },
    {
      title: "Kriti (कृति): Trusted Career Identity",
      description: "A decentralized career identity platform that solves hiring trust gaps using verifiable credentials and AI-powered recruiter workflows.",
      detailedDescription: "Kriti is a decentralized digital identity platform designed as a DigiLocker for careers. The system addresses two core hiring pain points: forged resumes and slow, expensive background checks. It combines a blockchain trust layer for verifiable credentials (education and work proofs) with an AI intelligence layer that consumes verified data to generate ATS-optimized resumes and accelerate recruiter-side candidate validation. The platform includes candidate onboarding, credential issuance and verification, recruiter search flows, and trust scoring pathways.",
      techStack: ["React", "TypeScript", "Node.js", "Express.js", "Firebase", "Blockchain", "Verifiable Credentials", "Hyperledger Aries", "Hyperledger Fabric", "PyTorch", "TensorFlow"],
      features: [
        "Candidate career vault for storing education and experience credentials",
        "Cryptographically verifiable records to make credentials tamper-evident",
        "One-click credential validation flow for recruiter and HR screening stages",
        "AI-assisted ATS-ready resume generation from trusted credential data",
        "Trust-first candidate shortlisting pipeline for faster hiring decisions",
        "B2B/B2C architecture prototype with end-to-end workflow coverage"
      ],
      challenges: [
        "Defining a secure decentralized identity model under severe time constraints",
        "Bridging blockchain credential verification with practical recruiter workflows",
        "Designing reliable data flows across credential storage, AI parsing, and screening",
        "Balancing product depth with rapid MVP delivery during a sleepless sprint"
      ],
      learnings: [
        "End-to-end leadership across a high-pressure multi-domain build",
        "Applying decentralized identity and verifiable credential concepts to real hiring problems",
        "Structuring AI layers around trusted data instead of raw self-reported profiles",
        "Turning a complex concept into an explainable and demo-ready architecture quickly"
      ],
      github: "https://lnkd.in/gjRjJH-6",
      logo: "/Logos/Kriti_Ai.png",
      isNew: true,
      category: 'ai'
    },
    {
      title: "KARM AI: Placement Management System",
      description: "A dual-platform college placement system combining AI-assisted screening with a Chrome extension for faster application workflows.",
      detailedDescription: "KARM AI targets practical campus recruitment challenges by combining a web portal and a Chrome extension into one connected experience. The web platform supports Students, HOD, and TPO with resume analysis, hiring pipeline visibility, and automated drive operations. The Chrome extension eliminates repetitive form filling by auto-populating student details, enabling one-click submissions and timely notifications. The overall architecture delivers an ATS-aware placement workflow with real-time data sync and actionable insights.",
      techStack: ["React", "TypeScript", "FastAPI", "Firebase", "Firestore", "Gemini API", "Chrome Extension"],
      features: [
        "Role-based placement portal for Students, HOD, and TPO",
        "AI-driven resume parsing and intelligent candidate filtering",
        "Automated placement drive creation, tracking, and stage transitions",
        "Smart email notifications for every recruitment milestone",
        "Real-time dashboard analytics with department-wise trend insights",
        "Exportable performance reporting in Excel/PDF workflows",
        "Gemini API integration for resume scoring and job-fit analysis",
        "Chrome extension with profile-based auto-fill and one-click applications",
        "Instant drive alerts and real-time application progress tracking"
      ],
      challenges: [
        "Shipping a complete dual-platform architecture with production-like depth",
        "Keeping real-time Firebase data sync reliable under rapid iteration",
        "Integrating AI evaluation flows while preserving fast UX and clear outputs",
        "Maintaining code quality during overnight debugging and final-stage pressure"
      ],
      learnings: [
        "Leading high-intensity execution across full product lifecycle phases",
        "Designing practical AI features that directly reduce recruiter and student effort",
        "Building extension plus web-platform interoperability for seamless workflows",
        "Balancing speed, architecture clarity, and demo readiness under extreme timelines"
      ],
      isNew: true,
      category: 'web'
    },
    {
      title: "Indian Chess Academy Hackathon Winner",
      description: "1st-place winning team project (72-hour sprint): a smart, secure, and highly usable hackathon platform.",
      detailedDescription: "Built as Team Madoss during the Indian Chess Academy Hackathon, this platform helped secure 1st place by balancing usability, security, and technical reliability. The collaborative end-to-end product build focused on reliable platform workflows with a production-minded implementation.",
      techStack: ["React", "TypeScript", "Firebase", "Security-First Design", "Full-Stack Architecture"],
      features: [
        "Awarded 1st place out of all participating teams",
        "Collaborative end-to-end product build with clear ownership",
        "Reliable platform workflows with production-minded implementation",
        "Security-aware design choices aligned with hackathon goals"
      ],
      challenges: [
        "Building and polishing a complete full-stack product in a 72-hour sprint",
        "Designing secure verification flows under time pressure",
        "Balancing product depth, frontend polish, and backend reliability"
      ],
      learnings: [
        "Effective teamwork and orchestration of full-stack services",
        "Importance of UX details in differentiating a standard build",
        "Delivering strong technical execution with dependable platform behavior"
      ],
      isNew: true,
      category: 'web'
    },
    {
      title: "Kavach: AI Security Copilot",
      description: "A local-first AI security copilot that monitors AI-generated code and blocks risky actions before they impact your codebase.",
      detailedDescription: "Kavach addresses a modern risk: developers accepting AI-generated output without deep review. It acts as an active defensive layer by intercepting dangerous terminal commands, blocking suspicious dependencies, and scanning live code edits for critical vulnerabilities. The system combines local LLM inference with RAG-based repository understanding, reinforcement learning for low-noise feedback, and one-command rollback safety. Everything runs fully local, with zero outbound API dependency for core security flows, ensuring that sensitive code and credentials never leave the machine.",
      techStack: ["Ollama", "phi4-mini", "nomic-embed-text", "Semgrep", "XGBoost", "ChromaDB", "scikit-learn", "SQLite", "FastAPI", "Python", "TypeScript", "VS Code Extension", "Watchdog", "Shell Hooks"],
      features: [
        "Terminal interception that blocks dangerous commands before execution",
        "Phantom dependency blocker for typosquatting and fake package attacks",
        "Live scanner on every file save for OWASP-style security issues",
        "Secret Shield preventing credential leakage to AI systems",
        "Intent Guard that stops AI from exceeding user-requested scope",
        "RAG-powered cross-file threat analysis for full-project awareness",
        "Living security report that updates as vulnerabilities are fixed",
        "Contextual bandit reinforcement learning to reduce false positives",
        "Rollback safety net for rapid recovery after unsafe AI actions"
      ],
      challenges: [
        "Building a real-time multi-layer defense stack with low-latency guardrails",
        "Balancing strict security controls with developer-friendly usability",
        "Keeping the system fully local while maintaining meaningful AI analysis",
        "Coordinating extension, backend, scanning, and policy logic in one cohesive architecture"
      ],
      learnings: [
        "How to engineer practical guardrails around AI-assisted coding workflows",
        "Integrating static analysis, ML scoring, and local LLM reasoning cohesively",
        "Designing actionable security signals with minimal alert fatigue",
        "Delivering a polished security product under extreme time pressure"
      ],
      github: "https://lnkd.in/gy7hziPh",
      liveDemo: "https://lnkd.in/ge3DmKgg",
      logo: "/Logos/Kavach_ai.png",
      isNew: true,
      category: 'ai'
    },
    {
      title: "Sanjeevani: ICU Diagnostic Risk Assistant",
      description: "A multi-agent clinical intelligence system built at Ignisia 26 to detect ICU complication risks from fragmented patient data.",
      detailedDescription: "Sanjeevani was built for a core ICU reality: hospitals have data, but teams do not always have time to connect every signal manually. The platform coordinated specialized agents for clinical note understanding, lab trend interpretation, guideline-grounded retrieval, and final risk synthesis. The result was a single interpretable report that highlighted potential complications, surfaced outliers, and added cautious clinical framing around AI outputs.",
      techStack: ["Clinical NLP", "Multi-Agent Systems", "RAG", "Embeddings", "Vector Search", "NFC"],
      features: [
        "Clinical NLP pipeline for unstructured note-to-timeline conversion",
        "Trend analysis over longitudinal lab data rather than one-time readings",
        "Medical RAG grounding against guideline-aligned reference context",
        "Chief synthesis layer merging all agents into one risk narrative",
        "Outlier-aware aggregation to avoid unsafe conclusions from noisy data",
        "NFC-based patient access and authentication for practical bedside usage"
      ],
      challenges: [
        "Designing reliable multi-agent coordination inside a 24-hour sprint",
        "Balancing interpretability and speed for high-stakes ICU context",
        "Handling uneven and noisy clinical data without overconfident outputs",
        "Keeping the architecture practical for real-world hospital workflows"
      ],
      learnings: [
        "Healthcare AI products depend as much on protocol-aware systems as model quality",
        "Agent role clarity dramatically improves signal synthesis under time pressure",
        "Meaningful hackathon outcomes can matter more than leaderboard position"
      ],
      isNew: true,
      category: 'ai'
    },
    {
      title: "Setu AI: Adaptive Onboarding Engine",
      description: "An AI onboarding platform built at ArtPark CodeForge that computes role-wise skill gaps and generates focused learning tracks.",
      detailedDescription: "Setu AI replaces one-size-fits-all onboarding with an adaptive bridge between candidate capability and role expectations. The system analyzes resumes against job descriptions, computes precise skill gaps, and builds a prerequisite-respecting learning path. It includes grounded recommendations tied to an actual course catalog and a reasoning trace that explains exactly why modules were selected, skipped, or prioritized.",
      techStack: ["Mistral 7B", "Python", "NetworkX", "ChromaDB", "Docker"],
      features: [
        "Skill-gap inference by comparing resume evidence against role requirements",
        "Adaptive curriculum generation with no redundant beginner modules",
        "Prerequisite-aware sequencing using NetworkX knowledge graph logic",
        "Grounded recommendations through ChromaDB-backed course retrieval",
        "Transparent reasoning trace for every major AI planning decision"
      ],
      challenges: [
        "Teaching the model to distinguish true expertise levels from keyword overlap",
        "Designing curriculum logic that respects dependency ordering",
        "Preventing hallucinated recommendations with strict catalog grounding",
        "Building and Dockerizing the full system in a 48-hour window"
      ],
      learnings: [
        "Reasoning transparency is essential for trust in enterprise AI tooling",
        "Knowledge graphs are highly effective for onboarding sequence control",
        "Fast execution still needs architecture discipline to stay maintainable"
      ],
      github: "https://lnkd.in/eCi7Hyca",
      liveDemo: "https://lnkd.in/eMiwDVNc",
      isNew: true,
      category: 'ai'
    },
    {
      title: "RNSIT AI Code Analyzer",
      description: "A local-first AI code review copilot for VS Code and PR pages with multi-agent analysis and streaming diagnostics.",
      detailedDescription: "RNSIT AI Code Analyzer is a complete local code-review system spanning editor workflows and pull-request review pages. It uses a FastAPI backend and orchestration layer to run specialist agents for bugs, security, quality, and compliance. The platform supports a Chrome extension for GitHub/GitLab review screens and a VS Code extension with multiple depth modes, then streams findings as structured output for low-latency feedback loops.",
      techStack: ["FastAPI", "Python", "LangChain", "TypeScript", "VS Code Extension", "Chrome Extension", "ChromaDB", "Ollama", "Semgrep", "Ruff", "Gitleaks", "Tree-sitter"],
      features: [
        "Local backend API with structured JSON analysis output",
        "Multi-agent chain for bug, security, quality, and compliance findings",
        "Chrome extension support for GitHub PR and GitLab MR pages",
        "Inline review annotations plus downloadable Markdown reports",
        "VS Code extension commands for quick, normal, and thorough depth",
        "Streaming JSONL delivery for progressive no-wait rendering",
        "Job-based API workflow with polling and websocket options",
        "Architecture-rule loading from repository-specific configuration"
      ],
      challenges: [
        "Coordinating multiple interfaces across editor, browser, and backend",
        "Keeping analysis responsive with semantic chunking and context reduction",
        "Managing local-model orchestration with stable structured output",
        "Ensuring privacy guarantees while maintaining useful cross-file reasoning"
      ],
      learnings: [
        "Local-first tooling can achieve strong UX with proper streaming design",
        "Agent specialization improves review quality for complex codebases",
        "Tight integration between static tools and LLM reasoning is high leverage"
      ],
      isNew: true,
      category: 'ai'
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
      category: 'ai'
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
      github: "https://github.com/Darshil-N/Games",
      category: 'dsa'
    },
    {
      title: "ATM Module",
      description: "Simulates ATM operations including user authentication, balance inquiry, deposits, and PIN changes.",
      techStack: ["C++"],
      github: "https://github.com/Darshil-N/Atm_module",
      category: 'dsa'
    },
    {
      title: "GST Report Generator",
      description: "Automates GST calculations and report generation for annual tax summaries.",
      techStack: ["C++"],
      github: "https://github.com/Darshil-N/GST_Report_Generator",
      category: 'dsa'
    },
    {
      title: "IPL Auction System",
      description: "Simulates an IPL auction with budget tracking and team/player selection features.",
      techStack: ["C++"],
      github: "https://github.com/Darshil-N/IPL_AUCTION",
      category: 'dsa'
    },
    {
      title: "Stock Trading Simulator",
      description: "Simulates a stock exchange where players trade stocks with real-time fluctuations and leaderboard.",
      techStack: ["C++"],
      github: "https://github.com/Darshil-N/Stock_Market_Sim",
      category: 'dsa'
    },
    {
      title: "Capturing Live Footage of Trash",
      description: "Using OpenCV the live photage of trash is sent to Live trash Detector. This is using numpy and panda to interpret the input and output for proper detection",
      techStack: ["Python", "OpenCV", "Camera Module","Numpy"],
      category: 'cv'
    },
    {
      title: "Portfolio Website",
      description: "Using no code tools and prompts able to create this websites",
      techStack: ["Github", "Spline", "Lovable AI","Cursor"],
      category: 'web',
      github: "https://github.com/Darshil-N/darshil-nathwani-portfolio"
    },
    {
      title: "Live Trash Detector",
      description: "This Trash Detector when paired with a camera, detects trash in real-time and send signal to arm and collect the trash in real-time.",
      techStack: ["Python", "OpenCV", "TensorFlow", "Custom Dataset", "Arduino IDE"],
      category: 'cv'
    }
  
    ,{
      title: "Google DeepMind Bangalore Hackathon",
      description: "Built an AI agent using Gemini in a fast-paced one-day sprint, finishing in the Top 25.",
      detailedDescription: "Participated in the Google DeepMind Bangalore Hackathon. Took on the challenge solo and spent the day building, debugging, and rethinking ideas to create a functional AI agent using Gemini tokens. Finished in the Top 25 amongst a room full of builders, researchers, and founders.",
      techStack: ["Gemini API", "Python", "Multi-Agent Systems"],
      features: [
        "Finished in the Top 25 out of talented builders",
        "Solo development sprint completed in one day",
        "Integration with Gemini for agentic capabilities"
      ],
      isNew: true,
      category: 'ai'
    },
    {
      title: "Pravaah AI: Bias Detection System",
      description: "A 100% offline, air-gapped AI bias detection tool built at Cepheus 2.0.",
      detailedDescription: "Built with Team Baazigar at Cepheus 2.0 (GDG on Campus AIT x Code Club Atria). Pravaah AI is designed for healthcare, fintech, and defense. It runs 100% offline with no cloud compromise. It uses 5 specialized AI agents to handle profiling, proxy detection, counterfactual testing, and report writing to detect bias before it ruins a model's fairness.",
      techStack: ["Python", "Multi-Agent Systems", "Data Synthesis"],
      features: [
        "Runs 100% offline for air-gapped systems",
        "5 specialized AI agents for bias scoring and counterfactual testing",
        "Translates technical metrics into plain English explanations",
        "Human-in-the-loop column assignments",
        "Executive-ready PDF audit report generation"
      ],
      github: "https://lnkd.in/gQURRpm5",
      isNew: true,
      category: 'ai'
    },
    {
      title: "Antraa: Synthetic Data Generator",
      description: "A 100% local synthetic data generator with formal differential privacy, built at Athermex (Top 10).",
      detailedDescription: "Built with Team Baazigar at Athermex (organized by ByteXync, BMSCE x DSCE). Antraa addresses the challenge of locked healthcare and fintech data by generating statistically accurate synthetic data preserving all minute details while running 100% locally. Finished in the Top 10 out of 150 teams.",
      techStack: ["Python", "Multi-Agent Systems"],
      features: [
        "Finished in the Top 10 out of 150 teams at Athermex",
        "Generates synthetic data mathematically proven with formal differential privacy",
        "7 automated AI agents for profiling, compliance, generation, and validation",
        "Auto-maps to HIPAA, GDPR, GLBA, EEOC before generating rows",
        "Outputs a PDF compliance certificate upon completion"
      ],
      isNew: true,
      category: 'ai'
    },
    {
      title: "OpenEnv: AI Catastrophe Simulator",
      description: "A production-grade RL environment for testing AI robotics in disaster scenarios, built at OpenEnv Hackathon.",
      detailedDescription: "Built with Team Kaarigars at the OpenEnv Hackathon by Scaler x Meta. We created an arena to test how an AI thinks when lives are on the line, featuring a realistic earthquake simulation and a legged rescue robot. Deployed on Hugging Face Spaces using the same infrastructure Meta uses internally.",
      techStack: ["Python", "Docker"],
      features: [
        "Realistic earthquake simulation (Mw 7.5, direct impact, sensor degradation)",
        "Legged rescue robot simulation with sensor suites (LiDAR, Thermal, RGB-D)",
        "Triage logic enforcing rescue priorities for victims",
        "Multi-pillar reward system across safety, path efficiency, and time"
      ],
      github: "https://lnkd.in/gW5btXhu",
      isNew: true,
      category: 'ai'
    },
    {
      title: "NeroBot: Marine Pollution Cleaner",
      description: "A jellyfish-inspired underwater robot designed to detect and clean marine pollution.",
      detailedDescription: "Developed with Team TritoneXus. NeroBot is a jellyfish-inspired underwater robot aimed at tackling marine pollution. The software team successfully developed a YOLO-based detection model to identify plastic bottles in real time using OpenCV. The model was exported via TorchScript for lightweight deployment, enabling autonomous waste collection on command.",
      techStack: ["Python", "YOLO", "OpenCV", "Arduino IDE", "Camera Module"],
      features: [
        "Real-time plastic bottle detection underwater",
        "Lightweight deployment optimized for embedded systems",
        "Integration with Arduino Uno and servo motors for autonomous collection mechanisms"
      ],
      isNew: true,
      category: 'cv'
    },
    {
      title: "NUMERANO Hackathon Portal",
      description: "A smart, festive hackathon registration platform built in a 24-hour solo sprint.",
      detailedDescription: "Built as an audition problem statement for NUMERANO, this is a fully immersive, Christmas-themed Hackathon Registration Portal. The project focused on packing maximum functionality into a single day, including OCR for ID scanning, a Gemini-powered chatbot, and instant backend email feedback loops.",
      techStack: ["React", "TypeScript", "Firebase", "Gemini API"],
      features: [
        "24-hour solo sprint development",
        "OCR-based ID card scanning with auto-fill",
        "Gemini API integrated responsive Chatbot for FAQs",
        "Real-time instant feedback loop using Firebase and Nodemailer",
        "Festive UI with background music"
      ],
      liveDemo: "https://lnkd.in/gWq3Qc2Y",
      isNew: true,
      category: 'web'
    }
];

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory, projects]);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-dark"></div>
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-mesh animate-mesh opacity-30"></div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large background shapes */}
        <div className="absolute top-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-r from-purple/20 via-purple/10 to-transparent blur-3xl animate-slow-spin"></div>
        <div className="absolute -top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-l from-purple-light/15 via-purple-light/5 to-transparent blur-3xl animate-slow-spin-reverse"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-gradient-to-t from-purple/15 via-purple/8 to-transparent blur-3xl animate-slow-spin" style={{animationDelay: '3s'}}></div>
        
        {/* Structured floating cards - mimicking project cards */}
        <div className="absolute top-20 left-1/4 w-48 h-32 bg-dark-secondary/60 rounded-xl rotate-3 animate-float-slow border border-purple/30 backdrop-blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-28 bg-dark/80 rounded-xl -rotate-2 animate-float-medium border border-purple/40 backdrop-blur-sm" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/6 w-44 h-30 bg-dark-secondary/70 rounded-xl rotate-1 animate-float-fast border border-purple/35 backdrop-blur-sm" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-26 bg-dark/85 rounded-xl -rotate-1 animate-float-slow border border-purple/30 backdrop-blur-sm" style={{animationDelay: '4s'}}></div>
        
        {/* Medium project card shapes */}
        <div className="absolute top-16 right-16 w-52 h-24 bg-dark-secondary/50 rounded-xl rotate-2 animate-float-medium border border-purple/25 backdrop-blur-sm" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-2/3 left-10 w-32 h-36 bg-dark/75 rounded-xl -rotate-3 animate-float-slow border border-purple/35 backdrop-blur-sm" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/4 left-2/3 w-38 h-28 bg-dark-secondary/65 rounded-xl rotate-2 animate-float-fast border border-purple/30 backdrop-blur-sm" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-30 h-34 bg-dark/70 rounded-xl -rotate-1 animate-float-medium border border-purple/40 backdrop-blur-sm" style={{animationDelay: '2.5s'}}></div>
        
        {/* Small UI element shapes */}
        <div className="absolute top-32 left-1/2 w-20 h-16 bg-dark-secondary/80 rounded-lg rotate-6 animate-float-fast border border-purple/50" style={{animationDelay: '2.2s'}}></div>
        <div className="absolute bottom-32 right-1/2 w-24 h-18 bg-dark/90 rounded-lg -rotate-4 animate-float-medium border border-purple/45" style={{animationDelay: '3.8s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-16 h-20 bg-dark-secondary/75 rounded-lg rotate-5 animate-float-slow border border-purple/35" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-28 h-14 bg-dark/85 rounded-lg -rotate-3 animate-float-fast border border-purple/40" style={{animationDelay: '4.8s'}}></div>
        
        {/* Subtle connecting lines */}
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-purple/30 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-purple-light/30 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            A showcase of my technical expertise across AI, mobile development, and full-stack applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple via-purple-light to-purple mx-auto rounded-full"></div>
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button
            className={`uiverse-btn-secondary ${!selectedCategory ? 'active' : ''}`}
            data-text="ALL PROJECTS"
            onClick={() => navigate("/projects")}
          >
            <span className="actual-text">&nbsp;ALL PROJECTS&nbsp;</span>
            <span aria-hidden="true" className="hover-text">&nbsp;ALL PROJECTS&nbsp;</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`uiverse-btn-secondary ${selectedCategory === cat.key ? 'active' : ''}`}
              data-text={cat.label.toUpperCase()}
              onClick={() => navigate(`?category=${cat.key}`)}
            >
              <span className="actual-text">&nbsp;{cat.label.toUpperCase()}&nbsp;</span>
              <span aria-hidden="true" className="hover-text">&nbsp;{cat.label.toUpperCase()}&nbsp;</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No projects found for this category.</div>
          ) : (
            filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="ui-browser-card h-full flex flex-col animate-slide-up opacity-0 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]" 
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => openProjectModal(project)}
              >
                <div className="ui-browser-card__bar">
                  <div className="ui-browser-card__circles" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="ui-browser-card__search">{project.category}.project</div>
                </div>

                <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        alt={`${project.title} logo`}
                        className="w-8 h-8 object-contain rounded"
                        loading="lazy"
                        width="32"
                        height="32"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded bg-purple/20 flex items-center justify-center">
                        {getDefaultLogo(project)}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  </div>
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
                      {selectedProject.logo ? (
                        <img 
                          src={selectedProject.logo} 
                          alt={`${selectedProject.title} logo`}
                          className="w-10 h-10 object-contain"
                          loading="lazy"
                          width="40"
                          height="40"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-purple/20 flex items-center justify-center">
                          {getDefaultLogo(selectedProject)}
                        </div>
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

              <div className="space-y-8 mt-8">
                {/* Detailed Description */}
                {selectedProject.detailedDescription && (
                  <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                      <div className="p-2 bg-purple/20 rounded-lg">
                        <Lightbulb className="text-purple" size={20} />
                      </div>
                      Project Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base">
                      {selectedProject.detailedDescription}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-purple/20 rounded-lg">
                      <Settings className="text-purple" size={20} />
                    </div>
                    Technology Stack
                    <span className="text-sm text-gray-400 font-normal">
                      ({selectedProject.techStack.length} technologies)
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedProject.techStack.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-dark border border-gray-700 rounded-lg hover:border-purple/40 hover:bg-gray-800/50 transition-all duration-300">
                        {techStackIcons[tech] || <Code2 className="text-purple" size={24} />}
                        <span className="text-sm text-white font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-purple/20 rounded-lg">
                        <Target className="text-purple" size={20} />
                      </div>
                      Key Features
                      <span className="text-sm text-gray-400 font-normal">
                        ({selectedProject.features.length} highlights)
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-dark/50 border border-gray-700 rounded-lg">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple to-purple-light rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges & Learnings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Challenges */}
                  {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                    <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Target className="text-red-400" size={20} />
                        </div>
                        Challenges Overcome
                      </h3>
                      <div className="space-y-3">
                        {selectedProject.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm leading-relaxed">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learnings */}
                  {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                    <div className="bg-green-900/10 border border-green-800/30 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <Lightbulb className="text-green-400" size={20} />
                        </div>
                        Key Learnings
                      </h3>
                      <div className="space-y-3">
                        {selectedProject.learnings.map((learning, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm leading-relaxed">{learning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-purple/30 to-transparent" />

                {/* Action Buttons */}
                <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Explore This Project</h4>
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="uiverse-btn"
                        data-text="SOURCE CODE"
                      >
                        <span className="actual-text">
                          <span className="inline-flex items-center gap-2">&nbsp;<Github size={18} /> SOURCE CODE&nbsp;</span>
                        </span>
                        <span aria-hidden="true" className="hover-text">
                          <span className="inline-flex items-center gap-2">&nbsp;<Github size={18} /> SOURCE CODE&nbsp;</span>
                        </span>
                      </a>
                    )}
                    {selectedProject.liveDemo && (
                      <a 
                        href={selectedProject.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="uiverse-btn"
                        data-text="LIVE DEMO"
                      >
                        <span className="actual-text">
                          <span className="inline-flex items-center gap-2">&nbsp;<ExternalLink size={18} /> LIVE DEMO&nbsp;</span>
                        </span>
                        <span aria-hidden="true" className="hover-text">
                          <span className="inline-flex items-center gap-2">&nbsp;<ExternalLink size={18} /> LIVE DEMO&nbsp;</span>
                        </span>
                      </a>
                    )}
                    <button 
                      onClick={closeModal} 
                      className="uiverse-btn-secondary"
                      data-text="CLOSE"
                    >
                      <span className="actual-text">&nbsp;CLOSE&nbsp;</span>
                      <span aria-hidden="true" className="hover-text">&nbsp;CLOSE&nbsp;</span>
                    </button>
                  </div>
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