/**
 * Projects.tsx — Premium project showcase with pagination
 *
 * SIGNATURE: All 14 projects with 7 per page, numbers in visual boxes
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiPython, SiReact, SiTypescript, SiFastapi, SiTensorflow, SiOpencv, SiTailwindcss, SiMongodb, SiNodedotjs, SiKotlin, SiFirebase, SiAndroid, SiCplusplus, SiSolidity, SiPolygon, SiStreamlit, SiFlask } from 'react-icons/si';
import { sound } from '../lib/sound';

const E = [0.76, 0, 0.24, 1] as const;

interface Project {
  title: string;
  shortTitle?: string;
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
  category: 'ai' | 'mobile' | 'cv' | 'dsa' | 'data' | 'web' | 'oth' | 'all';
  accentColor?: string;
}

const techIcons: Record<string, React.ReactNode> = {
  'Python': <SiPython size={18} />,
  'React': <SiReact size={18} />,
  'TypeScript': <SiTypescript size={18} />,
  'FastAPI': <SiFastapi size={18} />,
  'TensorFlow': <SiTensorflow size={18} />,
  'OpenCV': <SiOpencv size={18} />,
  'Tailwind CSS': <SiTailwindcss size={18} />,
  'MongoDB': <SiMongodb size={18} />,
  'Node.js': <SiNodedotjs size={18} />,
  'Kotlin': <SiKotlin size={18} />,
  'Firebase': <SiFirebase size={18} />,
  'Android': <SiAndroid size={18} />,
  'C++': <SiCplusplus size={18} />,
  'Solidity': <SiSolidity size={18} />,
  'Polygon': <SiPolygon size={18} />,
  'Streamlit': <SiStreamlit size={18} />,
  'Flask': <SiFlask size={18} />,
};

function ClipLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const ITEMS_PER_PAGE = 7;

export default function Projects() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const urlCategory = params.get('category') as Project['category'] | null;
  
  const [selectedCategory, setSelectedCategory] = useState<Project['category']>(urlCategory || 'all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const projects: Project[] = [
    // PRODUCTION PROJECTS FIRST
    {
      title: "Crickraft AMS",
      shortTitle: "Crickraft",
      description: "Academy management system built at Vina EduTech. Native Android app on Play Store + full web platform powering cricket academies.",
      detailedDescription: "Comprehensive academy management system featuring both a native Android application (published on Google Play Store) and a full web platform. Powers batch scheduling, attendance tracking, fee collection, and player performance telemetry for cricket training institutes with offline-first architecture.",
      techStack: ["Android", "Kotlin", "React", "TypeScript", "Firebase"],
      features: [
        "Published on Google Play Store with production reliability",
        "Full web platform at crickraft.vinaedutech.com",
        "Batch scheduling and attendance tracking system",
        "Fee collection with payment reconciliation",
        "Real-time player performance telemetry",
        "Offline-first mobile architecture for remote facilities",
        "Coach dashboards and parent communication channels"
      ],
      challenges: [
        "Managing offline-first data synchronization for remote cricket grounds",
        "Building dual-platform system with unified state management",
        "Google Play Store production verification and deployment"
      ],
      learnings: [
        "Production Android release engineering and Play Console lifecycle",
        "Cross-platform architecture with mobile and web parity",
        "Sports academy operational workflow optimization"
      ],
      liveDemo: "https://crickraft.vinaedutech.com/",
      category: 'mobile',
      isNew: true,
      accentColor: 'from-amber-500/20 to-orange-600/10'
    },
    {
      title: "StrengthKraft",
      description: "Athletic training ecosystem at Vina EduTech. React Native app + enterprise web platform for strength and conditioning programs.",
      detailedDescription: "Comprehensive athletic training ecosystem featuring a published React Native Android application coupled with an enterprise web platform. Integrates high-performance video workouts, workout logging, and athlete progress dashboards for strength training protocols.",
      techStack: ["React Native", "Android", "React", "TypeScript", "Node.js", "Firebase"],
      features: [
        "Published on Google Play Store",
        "Cross-platform Android app and web portal",
        "Live at strengthkraft.vinaedutech.com",
        "High-performance video workout streaming",
        "Workout logging and progress tracking",
        "Athlete progress dashboards with analytics",
        "Unified state synchronization across platforms"
      ],
      challenges: [
        "Maintaining unified state synchronization between web and mobile",
        "Low-latency video streaming and workout playback on mobile",
        "Managing continuous integration and app store submission pipelines"
      ],
      learnings: [
        "Large-scale React Native cross-platform architecture",
        "Native bridge performance optimization techniques",
        "High-velocity collaborative development with engineering teams"
      ],
      liveDemo: "https://strengthkraft.vinaedutech.com/",
      category: 'mobile',
      isNew: true,
      accentColor: 'from-sky-500/20 to-blue-600/10'
    },
    {
      title: "Indian Chess Academy",
      shortTitle: "ICA",
      description: "Official web platform for Indian Chess Academy (Vina EduTech). 1st place hackathon winner handling tournaments and enrolments.",
      detailedDescription: "Production full-stack web platform with responsive design, secure student management, and tournament bracket workflows. Awarded following 1st place hackathon finish and deployed on custom domain for course discovery, student enrolments, and tournament operations.",
      techStack: ["React", "TypeScript", "Firebase", "Node.js", "Tailwind CSS"],
      features: [
        "Official live platform at indianchessacad.com",
        "Awarded 1st Place Winner in hackathon competition",
        "Course discovery and student enrolment system",
        "Tournament operations with bracket management",
        "Automated cohort and batch management",
        "SEO optimized for national search discoverability"
      ],
      challenges: [
        "Translating hackathon prototype into security-hardened production platform",
        "Creating dynamic registration flows for tournaments",
        "Optimizing page load performance and SEO within tight deadlines"
      ],
      learnings: [
        "Hackathon to production architecture transformation",
        "Direct client communication and sprint delivery",
        "Production deployment and DNS routing for commercial platforms"
      ],
      liveDemo: "https://indianchessacad.com",
      category: 'web',
      accentColor: 'from-emerald-500/20 to-teal-600/10'
    },
    {
      title: "Velvet Academy",
      description: "Freelance production: Official website for Velvet Academy with modern branding, program portfolios, and full cloud deployment.",
      detailedDescription: "Independent freelance client project delivering the official website for Velvet Academy. Features modern visual branding, program portfolios, and streamlined inquiry handling with fast-loading design, responsive typography, and production cloud hosting.",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      features: [
        "Live at velvetacademy.org with 100% client satisfaction",
        "Sub-second page load performance scores",
        "Modern visual branding and design system",
        "Program portfolio showcase with filtering",
        "Streamlined inquiry and contact handling",
        "Fully responsive across all device sizes",
        "Production cloud hosting with SSL and DNS"
      ],
      challenges: [
        "Translating client aesthetic vision into fast, accessible portal",
        "Cross-device compatibility from smartphones to high-res displays",
        "Configuring production DNS, SSL certificates, and SEO indexing"
      ],
      learnings: [
        "Independent client project management and scope delivery",
        "Freelance contract fulfillment and deployment ownership",
        "Conversion-centered layout design and typography hierarchy"
      ],
      liveDemo: "https://velvetacademy.org/",
      category: 'web',
      accentColor: 'from-purple-500/20 to-indigo-600/10'
    },
    {
      title: "Raahi: Smart Tourist Safety",
      shortTitle: "Raahi",
      description: "Digital ecosystem for tourist safety in Northeast India. Blockchain-verified ID, NFC wristbands, emergency SMS fallback, and real-time dashboard.",
      detailedDescription: "Comprehensive digital ecosystem addressing tourist safety through proactive, data-driven approach. Combines native Android app with React web dashboard, powered by Firebase serverless architecture and Polygon blockchain for secure digital identity verification.",
      techStack: ["Kotlin", "Android", "React", "TypeScript", "Firebase", "Solidity", "Polygon"],
      features: [
        "Blockchain-verified digital ID on Polygon with NFC wristband",
        "Panic button with SMS fallback sending GPS coordinates offline",
        "Real-time location tracking with geospatial querying",
        "Integrated travel hub storing itineraries and documents",
        "AI-powered dynamic safety score monitoring activity",
        "Unified authorities dashboard with live situational awareness",
        "Smart emergency resource mapper for incident response",
        "Multi-language support with voice assistant integration"
      ],
      challenges: [
        "Building offline-first emergency system with SMS fallback",
        "Implementing efficient geospatial queries for real-time tracking",
        "Creating secure blockchain integration maintaining privacy",
        "Designing scalable serverless emergency response architecture"
      ],
      learnings: [
        "Native Android development with Kotlin and Jetpack Compose",
        "Blockchain development with Solidity on Polygon",
        "Serverless architecture design with Firebase ecosystem",
        "Real-time geospatial data processing and visualization"
      ],
      github: "https://github.com/Darshil-N/Raahi",
      liveDemo: "https://raahi-eta.vercel.app/",
      category: 'mobile',
      isNew: true,
      accentColor: 'from-cyan-500/20 to-blue-600/10'
    },
    
    // AI/RESEARCH PROJECTS
    {
      title: "Drishti-AI",
      shortTitle: "Drishti",
      description: "IEEE Published Research: Natural language campus surveillance system. DeepSeek Text-to-SQL with computer vision for incident analysis achieving 93% query accuracy.",
      detailedDescription: "Published IEEE research paper presenting an end-to-end campus surveillance platform combining real-time CV anomaly detection with natural language incident retrieval. Fine-tuned DeepSeek 6.7B achieves 93% accuracy on manual test queries. Features smart caching (73% hit rate), automatic fallback to fuzzy search, and deployed at Dayananda Sagar College.",
      techStack: ["React", "Flask", "DeepSeek", "PostgreSQL", "Supabase", "YOLOv8", "OpenCV"],
      features: [
        "Published in IEEE conference proceedings",
        "93% natural language to SQL query accuracy",
        "Real-time CV anomaly detection (fights, falls, crowds)",
        "73% cache hit rate reducing LLM calls significantly",
        "Automatic fallback to fuzzy search on model unavailability",
        "Deployed at DSCE campus and commercial retail partner",
        "4-bit quantized model running on standard hardware"
      ],
      challenges: [
        "Schema grounding for consistent SQL generation",
        "4-bit quantization without quality degradation",
        "Building resilient fallback under model failure",
        "Preventing SQL injection via prompt engineering"
      ],
      learnings: [
        "Production LLM deployment with quantization",
        "Multi-layer security architecture for AI systems",
        "Research to production pipeline transformation",
        "Privacy-first local AI without external API dependencies"
      ],
      category: 'ai',
      isNew: true,
      accentColor: 'from-indigo-500/20 to-violet-600/10'
    },
    {
      title: "Disha AI",
      shortTitle: "Disha",
      description: "AI-driven site-selection intelligence. Pick a city, category, and tier — get every zone scored, ranked, and explained with live OpenStreetMap data.",
      detailedDescription: "Built for Nasiko Build-A-Thon. AI-powered commercial site selection platform that divides cities into H3 hexagonal cells, scores them against 9 weighted signals (footfall, affluence, demand, competition, accessibility), and provides natural-language explanations. Deployed on real Nasiko A2A agents with live computation and grounding guardrails.",
      techStack: ["Next.js", "React", "FastAPI", "PostgreSQL", "PostGIS", "Ollama", "H3"],
      features: [
        "Live scoring on deployed Nasiko A2A agents with automatic fallback",
        "H3 geospatial indexing across thousands of city zones",
        "9-signal weighted analysis: footfall, affluence, demand, competition",
        "Natural-language follow-up with grounding guardrails",
        "Full analytics: city-wide distribution, confidence-vs-score, signal contribution matrix",
        "Real OpenStreetMap data processing with PostGIS"
      ],
      challenges: [
        "Live agent deployment verification with graceful degradation",
        "Processing OpenStreetMap data at city scale efficiently",
        "Grounding LLM responses to prevent hallucinations"
      ],
      learnings: [
        "A2A agent orchestration and deployment patterns",
        "Geospatial analysis at scale with H3 and PostGIS",
        "Building verifiable AI systems with data grounding"
      ],
      github: "https://github.com/Darshil-N/Nasiko_Buildathon",
      category: 'ai',
      isNew: true,
      accentColor: 'from-teal-500/20 to-cyan-600/10'
    },
    {
      title: "Saarthi - Material Master",
      shortTitle: "Saarthi",
      description: "One Nation. One Material Code. AI-powered platform standardizing material master data across public-sector departments with OCR, deduplication, and CNMC generation.",
      detailedDescription: "Built for SIH 2026. Unified material master platform for public-sector enterprises eliminating duplicate procurement through AI-powered Common National Material Code (CNMC) generation. Features Gemini Vision OCR, pgvector similarity search, and role-based workflows for operators, engineers, accounts, and admins with full transaction audit.",
      techStack: ["React", "FastAPI", "Supabase", "PostgreSQL", "pgvector", "Gemini"],
      features: [
        "Gemini Vision OCR for bill photo and barcode extraction",
        "pgvector similarity search for duplicate detection",
        "Automatic CNMC generation for new materials",
        "Four-role workflow: Entry, Engineer, Accounts, Admin",
        "Single-transaction material·stock·price·audit writes",
        "Natural-language material search for engineers",
        "Vendor price comparison and savings tracking"
      ],
      challenges: [
        "Real-time duplicate detection across large catalogs",
        "Transaction integrity during concurrent material intake",
        "OCR accuracy for diverse bill formats"
      ],
      learnings: [
        "Vector similarity search for enterprise deduplication",
        "Multi-role workflow orchestration with audit trails",
        "Vision AI integration for document processing"
      ],
      github: "https://github.com/Darshil-N/Saarthi",
      category: 'ai',
      isNew: true,
      accentColor: 'from-blue-500/20 to-indigo-600/10'
    },
    {
      title: "Pravaah AI",
      shortTitle: "Pravaah",
      description: "Next-gen multi-agent AI fairness & bias detection platform. Audits ML datasets and deployed models using LangGraph orchestration and AIF360/Fairlearn metrics.",
      detailedDescription: "Enterprise-grade algorithmic bias audit platform with multi-agent architecture. Five specialized agents (Pattern Extractor, Proxy Detector, Bias Auditor, Counterfactual Tester, Report Writer) orchestrated by LangGraph. Translates AIF360 and Fairlearn metrics into plain-English severity assessments with what-if testing for deployed models.",
      techStack: ["React", "FastAPI", "LangGraph", "Python", "Supabase", "Gemini", "Ollama"],
      features: [
        "Dataset audit: statistical bias and proxy variable detection",
        "Software audit: what-if counterfactual testing on live APIs",
        "Live monitoring: drift tracking with threshold alerts",
        "5-agent LangGraph pipeline with human-in-loop checkpoints",
        "AIF360 & Fairlearn metric translation to plain English",
        "Executive-ready PDF/Markdown audit reports",
        "Privacy-first: agents see only statistical summaries, never raw data"
      ],
      challenges: [
        "Building deterministic multi-agent pipelines with LangGraph",
        "Privacy-preserving statistical profiling at scale",
        "Translating complex fairness metrics for non-technical stakeholders"
      ],
      learnings: [
        "Multi-agent AI orchestration with state management",
        "Enterprise bias detection frameworks (AIF360, Fairlearn)",
        "Privacy-first ML auditing architectures"
      ],
      github: "https://github.com/Darshil-N/Pravaah-AI-",
      category: 'ai',
      isNew: true,
      accentColor: 'from-violet-500/20 to-purple-600/10'
    },
    {
      title: "Sanjeevani",
      shortTitle: "Sanjeevani",
      description: "Multi-agent ICU decision-support platform. Ingests patient files, builds temporal state, retrieves guideline evidence, produces risk reports with outlier safety guards.",
      detailedDescription: "Architecture-first clinical decision-support system for ICU workflows. Multi-agent pipeline (note parser, lab mapper, RAG agent, chief agent) with statistical outlier refusal, multi-language analytics (EN/HI/MR), NFC secure access with PIN verification, and real-time report updates via Supabase channels.",
      techStack: ["React", "FastAPI", "Ollama", "Gemini", "ChromaDB", "Supabase", "PostgreSQL"],
      features: [
        "Multi-agent pipeline: note parser, lab mapper, RAG retriever, chief synthesizer",
        "Three-level outlier safety guards preventing unsafe diagnosis updates",
        "NFC secure access with doctor PIN verification",
        "Multi-language support: English, Hindi, Marathi",
        "Runtime medical-term translation with glossary masking",
        "Real-time report updates via Supabase channels",
        "PDF export with disease progression timeline graphs"
      ],
      challenges: [
        "Building safe clinical AI with hard refusal constraints",
        "Medical terminology preservation during translation",
        "Real-time multi-language analytics rendering"
      ],
      learnings: [
        "Safety-first AI for healthcare with deterministic guardrails",
        "Multi-language clinical text processing",
        "Real-time collaborative medical dashboards"
      ],
      github: "https://github.com/Darshil-N/Sanjeevani",
      category: 'ai',
      isNew: true,
      accentColor: 'from-red-500/20 to-pink-600/10'
    },
    {
      title: "NETRA Platform",
      shortTitle: "NETRA",
      description: "Enterprise augmented intelligence for cyber-risk quantification. FAIR framework + Monte Carlo simulation translates security events into Expected Annual Loss (EAL).",
      detailedDescription: "Complete ecosystem for banking security posture management. Retail bank with toggle-able vulnerabilities (Bug Lab), CyberRisk Quantifier using FAIR framework and Monte Carlo simulation, real-time WebSocket updates, AI risk assistant with RAG, and full observability stack (Prometheus, Grafana, Loki, Tempo).",
      techStack: ["React", "Next.js", "Express", "FastAPI", "Python", "Supabase", "Redis", "Celery"],
      features: [
        "FAIR framework risk quantification with Monte Carlo simulation",
        "Real-time EAL recomputation on every security event",
        "WebSocket live dashboard updates with threshold breach alerts",
        "AI risk assistant powered by Groq LLM with RAG knowledge base",
        "Demo Bug Lab with toggle-able vulnerabilities",
        "Full observability: Prometheus, Grafana, Loki, Tempo, GlitchTip",
        "Event sourcing audit trail for every computation"
      ],
      challenges: [
        "Building event-driven architecture for real-time risk updates",
        "Monte Carlo simulation performance optimization",
        "Observability stack integration across polyglot services"
      ],
      learnings: [
        "Quantitative cyber-risk modeling with FAIR framework",
        "Event-sourced architectures with full audit provenance",
        "Production-grade observability for AI systems"
      ],
      github: "https://github.com/Darshil-N/Netra",
      category: 'ai',
      isNew: true,
      accentColor: 'from-orange-500/20 to-yellow-600/10'
    },
    {
      title: "Kriti SmartHire",
      shortTitle: "Kriti",
      description: "Decentralized career passport. Blockchain-verified credentials (DIDs + VCs) with AI profile builder, resume ghostwriter, and smart autofill for instant verification.",
      detailedDescription: "Two-layer platform: Blockchain trust layer using Hyperledger Aries/Indy or Polygon ID for un-forgeable credential verification, and AI intelligence layer with auto-profile builder, ATS-optimized resume ghostwriter, browser autofill extension, job recommendations, and skill gap analysis. B2B SaaS for recruiters with verified talent pool access.",
      techStack: ["React Native", "React", "Node.js", "Python", "Hyperledger", "Polygon", "Solidity"],
      features: [
        "Blockchain-verified credentials with DIDs and VCs",
        "Aadhaar-verified Kriti Wallet for credential management",
        "AI resume ghostwriter with ATS optimization",
        "Smart Autofill browser extension for job applications",
        "AI job recommendations and skill gap analysis",
        "AI mock interview preparation",
        "Recruiter dashboard with Smart Filter for verified talent"
      ],
      challenges: [
        "Blockchain integration with privacy-preserving verification",
        "Building trust with issuers for credential adoption",
        "Cross-platform wallet with secure key management"
      ],
      learnings: [
        "Decentralized identity with DIDs and Verifiable Credentials",
        "Two-sided marketplace network effects",
        "Privacy-first blockchain architectures"
      ],
      github: "https://github.com/HACKMANV8/UNO/tree/main",
      category: 'oth',
      isNew: true,
      accentColor: 'from-green-500/20 to-emerald-600/10'
    },
    
    // OTHER PROJECTS
    {
      title: "Siddhi AI Platform",
      shortTitle: "Siddhi",
      description: "Enterprise AI for concessional lending risk. XGBoost models with SHAP explainability processing 1.8M+ financial records.",
      detailedDescription: "Enterprise-grade augmented intelligence platform transforming credit assessment into dynamic behavioral analysis. Combines XGBoost predictive modeling (85%+ accuracy), SHAP explainability matrices for regulatory compliance, and LSTM early warning systems across 1.8M+ historical records.",
      techStack: ["React", "TypeScript", "FastAPI", "XGBoost", "TensorFlow", "Python"],
      features: [
        "XGBoost-powered risk scoring with 85%+ accuracy",
        "SHAP explainability for strict regulatory compliance",
        "Processing 1.8M+ historical financial records",
        "Interactive borrower assessment dashboards",
        "LSTM early warning alert system",
        "Multi-tier human-in-loop governance framework",
        "Comprehensive audit trail and compliance reporting"
      ],
      challenges: [
        "Benchmarking data pipelines across 1.8M records efficiently",
        "Creating transparent SHAP visualizations for non-technical users",
        "Balancing high predictive accuracy with fairness and bias mitigation"
      ],
      learnings: [
        "Advanced production machine learning deployment",
        "Financial compliance and explainable AI (XAI) frameworks",
        "Real-time data visualization dashboard architecture"
      ],
      github: "https://github.com/Darshil-N/Siddhi-Ai",
      category: 'ai',
      accentColor: 'from-indigo-500/20 to-purple-600/10'
    },
    {
      title: "Kara-AI Interview Coach",
      shortTitle: "Kara",
      description: "Multi-modal AI interview coach analyzing speech, facial expressions, and body language. YOLOv8 + Gemini 2.5 Flash integration.",
      detailedDescription: "Revolutionary AI interview preparation platform processing live video and audio streams with adaptive interview personas. Features YOLOv8 emotion detection (77%+ accuracy), speech recognition (95%+ transcription), and Gemini 2.5 Flash for context-aware conversations with sub-500ms latency.",
      techStack: ["React", "TypeScript", "FastAPI", "Python", "YOLOv8", "OpenCV"],
      features: [
        "Real-time multi-modal analysis (speech, face, body language)",
        "Adaptive AI interviewers with different personalities",
        "Live emotion detection with 77%+ accuracy using YOLOv8",
        "Speech recognition with 95%+ transcription accuracy",
        "Context-aware follow-up questions and dynamic conversations",
        "Comprehensive feedback dashboard with video playback",
        "Sub-500ms processing latency for seamless experience",
        "PDF report generation for detailed analysis"
      ],
      challenges: [
        "Real-time multi-modal data fusion and synchronization",
        "Achieving low-latency processing for seamless UX",
        "Training emotion detection models for diverse expressions",
        "Balancing AI sophistication with user-friendly interface"
      ],
      learnings: [
        "Multi-modal AI system integration and orchestration",
        "Real-time video processing with WebRTC streaming",
        "Low-latency data pipeline architecture and optimization"
      ],
      github: "https://github.com/Darshil-N/Kara-Ai",
      category: 'ai',
      isNew: true,
      accentColor: 'from-pink-500/20 to-purple-600/10'
    },
    {
      title: "AI Resource Suggestion Chatbot",
      shortTitle: "AI Bot",
      description: "Built using Gemini API, LangChain, Streamlit & MongoDB. Suggests relevant learning resources based on incomplete task descriptions.",
      detailedDescription: "Intelligent chatbot analyzing incomplete task descriptions from employees and suggesting personalized learning resources. Uses natural language processing to understand context and intent, then matches requirements with curated educational content.",
      techStack: ["Python", "Gemini API", "Flask", "LangChain", "Streamlit", "MongoDB"],
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
      category: 'ai',
      accentColor: 'from-yellow-500/20 to-amber-600/10'
    },
    {
      title: "Automatic Trash Sorter",
      description: "Captures live footage of trash and sorts it into different categories using OpenCV and TensorFlow.",
      detailedDescription: "Intelligent waste management system using computer vision to automatically identify and sort different types of waste materials. Processes live camera feeds to classify trash into recyclables, organic waste, and general waste categories.",
      techStack: ["Python", "TensorFlow", "OpenCV", "YOLO"],
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
      category: 'cv',
      accentColor: 'from-green-500/20 to-emerald-600/10'
    },
    {
      title: "Live Trash Detector",
      description: "When paired with a camera, detects trash in real-time and sends signal to robotic arm to collect trash.",
      techStack: ["Python", "OpenCV", "TensorFlow", "Arduino"],
      category: 'cv',
      accentColor: 'from-lime-500/20 to-green-600/10'
    },
    {
      title: "Rock-Paper-Scissors Game",
      description: "Built in C++ with live score tracking for both single-player (AI) and two-player modes.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/Games",
      category: 'dsa',
      accentColor: 'from-red-500/20 to-rose-600/10'
    },
    {
      title: "ATM Module",
      description: "Simulates ATM operations including user authentication, balance inquiry, deposits, and PIN changes.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/Atm_module",
      category: 'dsa',
      accentColor: 'from-blue-500/20 to-cyan-600/10'
    },
    {
      title: "GST Report Generator",
      description: "Automates GST calculations and report generation for annual tax summaries.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/GST_Report_Generator",
      category: 'dsa',
      accentColor: 'from-violet-500/20 to-purple-600/10'
    },
    {
      title: "Stock Trading Simulator",
      description: "Simulates a stock exchange where players trade stocks with real-time fluctuations and leaderboard.",
      techStack: ["C++"],
      github: "https://github.com/Anonymous-7777/Stock_Market_Sim",
      category: 'dsa',
      accentColor: 'from-orange-500/20 to-red-600/10'
    },
  ];
  const categories = [
    { key: 'all' as const, label: 'All' },
    { key: 'ai' as const, label: 'AI & ML' },
    { key: 'mobile' as const, label: 'Mobile' },
    { key: 'web' as const, label: 'Web' },
    { key: 'cv' as const, label: 'Computer Vision' },
    { key: 'dsa' as const, label: 'DSA' },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleCategoryChange = (category: Project['category']) => {
    sound.playClick?.();
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === 'all') {
      navigate('/projects');
    } else {
      navigate(`/projects?category=${category}`);
    }
  };

  const handlePageChange = (page: number) => {
    sound.playClick?.();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      {/* HEADER */}
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto mb-16">
        <ClipLine delay={0.1}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
            <span>Project Showcase</span>
          </div>
        </ClipLine>

        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em' }}>
          <ClipLine delay={0.2}>
            <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
              Built &
            </div>
          </ClipLine>
          <ClipLine delay={0.35}>
            <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
              Shipped
            </div>
          </ClipLine>
        </div>

        <div style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)', overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.5, ease: E }}
            className="flex items-start gap-6"
          >
            <motion.div
              style={{ height: 1, backgroundColor: '#A3E635', flexShrink: 0 }}
              initial={{ width: 0 }}
              animate={{ width: 50 }}
              transition={{ duration: 0.7, delay: 0.75, ease: E }}
            />
            <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.45)', lineHeight: 1.7, maxWidth: '42rem' }}>
              {filteredProjects.length} production applications across AI, mobile, web, and computer vision.
            </p>
          </motion.div>
        </div>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: E }}
          className="flex flex-wrap gap-3 mt-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              onMouseEnter={() => sound.playHover?.()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'relative',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                color: selectedCategory === cat.key ? '#A3E635' : 'rgba(248,250,252,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
              }}
              className="hover:!border-[rgba(163,230,53,0.3)] hover:!text-[#A3E635]"
            >
              {cat.label}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: selectedCategory === cat.key ? '100%' : 0 }}
                transition={{ duration: 0.4, ease: E }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: 2,
                  backgroundColor: '#A3E635',
                }}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* PROJECTS GRID */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="px-6 sm:px-10 lg:px-16 max-w-[1800px] mx-auto space-y-24"
        >
          {paginatedProjects.map((project, index) => {
            const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, delay: index * 0.08, ease: E }}
                style={{
                  position: 'relative',
                  minHeight: '60vh',
                  display: 'grid',
                  gridTemplateColumns: globalIndex % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr',
                  gap: 'clamp(3rem, 6vw, 6rem)',
                  alignItems: 'center',
                }}
                className="lg:grid-cols-2 grid-cols-1"
              >
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, order: globalIndex % 2 === 0 ? 1 : 2 }}>
                  {/* Category + Badges */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#A3E635',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span>◆</span>
                      {project.category}
                    </div>
                    {project.isNew && (
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '8px',
                          letterSpacing: '0.15em',
                          padding: '0.3rem 0.6rem',
                          background: '#A3E635',
                          color: '#0C0C0E',
                          fontWeight: 700,
                        }}
                      >
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                      letterSpacing: '-0.03em',
                      color: '#F8FAFC',
                      lineHeight: 1.1,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                      lineHeight: 1.7,
                      color: 'rgba(248,250,252,0.55)',
                      marginBottom: '2rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <div
                        key={tech}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.9rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.02em',
                          color: 'rgba(248,250,252,0.7)',
                        }}
                      >
                        {techIcons[tech] && <span style={{ color: '#A3E635', display: 'flex' }}>{techIcons[tech]}</span>}
                        <span>{tech}</span>
                      </div>
                    ))}
                    {project.techStack.length > 4 && (
                      <div
                        style={{
                          padding: '0.5rem 0.9rem',
                          background: 'rgba(163,230,53,0.08)',
                          border: '1px solid rgba(163,230,53,0.2)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          color: '#A3E635',
                          fontWeight: 700,
                        }}
                      >
                        +{project.techStack.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      onClick={() => {
                        sound.playClick?.();
                        setSelectedProject(project);
                      }}
                      onMouseEnter={() => sound.playHover?.()}
                      whileHover={{ x: 4 }}
                      data-cursor-text="VIEW"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.9rem 1.8rem',
                        background: '#F8FAFC',
                        border: '1px solid #F8FAFC',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#0C0C0E',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      className="hover:bg-[#A3E635] hover:border-[#A3E635]"
                    >
                      Details
                      <ArrowRight size={14} />
                    </motion.button>

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playHover?.()}
                        data-cursor-text="LIVE"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.9rem 1.8rem',
                          border: '1px solid rgba(255,255,255,0.15)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'rgba(248,250,252,0.7)',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                        }}
                        className="hover:!border-[#A3E635] hover:!text-[#F8FAFC]"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playHover?.()}
                        data-cursor-text="CODE"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.9rem 1.8rem',
                          border: '1px solid rgba(255,255,255,0.15)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'rgba(248,250,252,0.7)',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                        }}
                        className="hover:!border-[#A3E635] hover:!text-[#F8FAFC]"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual box with PROJECT NUMBER */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    position: 'relative',
                    order: globalIndex % 2 === 0 ? 2 : 1,
                    aspectRatio: '4/3',
                    background: `linear-gradient(135deg, ${project.accentColor || 'rgba(163,230,53,0.08)'}, rgba(12,12,14,0.5))`,
                    border: '1px solid rgba(163,230,53,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Giant project number */}
                  <div
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 900,
                      fontSize: 'clamp(6rem, 15vw, 12rem)',
                      color: 'transparent',
                      WebkitTextStroke: '2px rgba(163,230,53,0.25)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.04em',
                      userSelect: 'none',
                    }}
                  >
                    {String(globalIndex + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-24 px-6"
        >
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
            onMouseEnter={() => sound.playHover?.()}
            style={{
              width: 40,
              height: 40,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.3 : 1,
              transition: 'all 0.3s ease',
            }}
            className={currentPage !== 1 ? 'hover:!border-[#A3E635] hover:bg-[rgba(163,230,53,0.1)]' : ''}
          >
            <ChevronLeft size={18} style={{ color: '#F8FAFC' }} />
          </motion.button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                onMouseEnter={() => sound.playHover?.()}
                whileHover={{ scale: 1.05 }}
                style={{
                  width: 40,
                  height: 40,
                  border: currentPage === page ? '1px solid #A3E635' : '1px solid rgba(255,255,255,0.15)',
                  background: currentPage === page ? 'rgba(163,230,53,0.1)' : 'transparent',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: currentPage === page ? '#A3E635' : 'rgba(248,250,252,0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: currentPage === page ? 700 : 400,
                }}
                className={currentPage !== page ? 'hover:!border-[#A3E635] hover:bg-[rgba(163,230,53,0.05)]' : ''}
              >
                {page}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
            onMouseEnter={() => sound.playHover?.()}
            style={{
              width: 40,
              height: 40,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.3 : 1,
              transition: 'all 0.3s ease',
            }}
            className={currentPage !== totalPages ? 'hover:!border-[#A3E635] hover:bg-[rgba(163,230,53,0.1)]' : ''}
          >
            <ChevronRight size={18} style={{ color: '#F8FAFC' }} />
          </motion.button>
        </motion.div>
      )}

      {/* PREMIUM FULL-SCREEN MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              background: '#0C0C0E',
              overflow: 'hidden',
            }}
          >
            {/* Animated background grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                opacity: 0.3,
              }}
            />

            {/* Giant number watermark */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(20rem, 40vw, 35rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(163,230,53,0.04)',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              {String(projects.indexOf(selectedProject) + 1).padStart(2, '0')}
            </div>

            {/* Close button - top right */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setSelectedProject(null)}
              onMouseEnter={() => sound.playHover?.()}
              whileHover={{ scale: 1.05, rotate: 90 }}
              data-cursor-text="CLOSE"
              style={{
                position: 'fixed',
                top: 'clamp(2rem, 4vw, 3rem)',
                right: 'clamp(2rem, 4vw, 3rem)',
                width: 56,
                height: 56,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(12,12,14,0.8)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 100,
              }}
              className="hover:!border-[#A3E635] hover:bg-[rgba(163,230,53,0.15)]"
            >
              <X size={22} style={{ color: '#F8FAFC' }} />
            </motion.button>

            {/* Split screen layout */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr',
                height: '100%',
              }}
              className="lg:grid-cols-[40%_60%]"
            >
              {/* LEFT: Hero section - FIXED */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: E }}
                style={{
                  padding: 'clamp(3rem, 6vw, 5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRight: '1px solid rgba(163,230,53,0.15)',
                  position: 'relative',
                  background: 'linear-gradient(135deg, rgba(163,230,53,0.02), transparent)',
                  overflow: 'hidden',
                }}
              >
                {/* Accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: E }}
                  style={{
                    height: 2,
                    background: '#A3E635',
                    marginBottom: '1.5rem',
                  }}
                />

                {/* Category + Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: '#A3E635',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                    }}
                  >
                    <span>◆</span>
                    {selectedProject.category}
                  </div>
                  {selectedProject.isNew && (
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '7px',
                        letterSpacing: '0.15em',
                        padding: '0.3rem 0.6rem',
                        background: '#A3E635',
                        color: '#0C0C0E',
                        fontWeight: 700,
                      }}
                    >
                      NEW
                    </div>
                  )}
                </div>

                {/* Project title - smaller */}
                <h1
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.04em',
                    color: '#F8FAFC',
                    lineHeight: 1,
                    marginBottom: '2rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedProject.title}
                </h1>

                {/* Description */}
                <p
                  style={{
                    fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                    lineHeight: 1.7,
                    color: 'rgba(248,250,252,0.65)',
                    marginBottom: '2.5rem',
                  }}
                >
                  {selectedProject.detailedDescription || selectedProject.description}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {selectedProject.liveDemo && (
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => sound.playHover?.()}
                      data-cursor-text="LIVE"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        padding: '0.9rem 1.8rem',
                        background: '#F8FAFC',
                        border: '1px solid #F8FAFC',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#0C0C0E',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      className="hover:bg-[#A3E635] hover:border-[#A3E635]"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => sound.playHover?.()}
                      data-cursor-text="CODE"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        padding: '0.9rem 1.8rem',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(248,250,252,0.8)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      className="hover:!border-[#A3E635] hover:!text-[#F8FAFC] hover:bg-[rgba(163,230,53,0.05)]"
                    >
                      <Github size={14} />
                      Source Code
                    </a>
                  )}
                </div>
              </motion.div>

              {/* RIGHT: Details - ONLY THIS SCROLLS */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: E, delay: 0.15 }}
                style={{
                  overflowY: 'auto',
                  padding: 'clamp(3rem, 6vw, 5rem)',
                  paddingTop: 'clamp(5rem, 8vw, 7rem)',
                }}
                className="custom-scrollbar"
              >
                {/* Tech Stack */}
                <div style={{ marginBottom: '3.5rem' }}>
                  <h3
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'rgba(248,250,252,0.35)',
                      marginBottom: '1.2rem',
                    }}
                  >
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.techStack.map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.7rem 1rem',
                          background: 'rgba(163,230,53,0.05)',
                          border: '1px solid rgba(163,230,53,0.2)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '9px',
                          letterSpacing: '0.02em',
                          color: 'rgba(248,250,252,0.8)',
                        }}
                      >
                        {techIcons[tech] && <span style={{ color: '#A3E635', display: 'flex' }}>{techIcons[tech]}</span>}
                        <span>{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div style={{ marginBottom: '3.5rem' }}>
                    <h3
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: 'rgba(248,250,252,0.35)',
                        marginBottom: '1.2rem',
                      }}
                    >
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                          style={{
                            fontSize: '0.92rem',
                            color: 'rgba(248,250,252,0.65)',
                            paddingLeft: '1.5rem',
                            borderLeft: '2px solid rgba(163,230,53,0.4)',
                            lineHeight: 1.7,
                          }}
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                  <div style={{ marginBottom: '3.5rem' }}>
                    <h3
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: 'rgba(248,250,252,0.35)',
                        marginBottom: '1.2rem',
                      }}
                    >
                      Challenges Overcome
                    </h3>
                    <div className="space-y-2.5">
                      {selectedProject.challenges.map((challenge, i) => (
                        <p key={i} style={{ fontSize: '0.88rem', color: 'rgba(248,250,252,0.55)', lineHeight: 1.7 }}>
                          • {challenge}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learnings */}
                {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: 'rgba(248,250,252,0.35)',
                        marginBottom: '1.2rem',
                      }}
                    >
                      Key Learnings
                    </h3>
                    <div className="space-y-2.5">
                      {selectedProject.learnings.map((learning, i) => (
                        <p key={i} style={{ fontSize: '0.88rem', color: 'rgba(248,250,252,0.55)', lineHeight: 1.7 }}>
                          • {learning}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163,230,53,0.35);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163,230,53,0.55);
        }
      `}</style>
    </section>
  );
}
