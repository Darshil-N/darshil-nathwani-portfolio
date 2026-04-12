import React, { useState } from 'react';
import Section from './ui/Section';
import { Trophy, Users, Clock, Lightbulb, Award, Calendar, MapPin, Code2, X, ExternalLink } from 'lucide-react';

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  
  const competitiveAchievements = [
    {
      title: "Indian Chess Academy Hackathon - 1st Place",
      date: "2026",
      organizer: "Indian Chess Academy",
      duration: "72 Hours",
      type: "Winning Team Project",
      role: "Team Madoss",
      project: "Smart, Secure, and Usable Hackathon Platform",
      status: "1st Place",
      description: "Team Madoss secured 1st place for delivering a polished and reliable platform with a strong balance of usability, security, and technical execution.",
      highlights: [
        "Awarded 1st place for a well-rounded and thoughtfully developed solution",
        "Recognized for balancing product usability with robust security",
        "Delivered strong technical execution with dependable platform behavior",
        "Qualified for a one-month training program post-hackathon"
      ],
      features: [
        "Collaborative end-to-end product build with clear ownership",
        "Reliable platform workflows with production-minded implementation",
        "Security-aware design choices aligned with hackathon goals",
        "Post-win pathway to internship opportunities based on training performance"
      ],
      teammates: ["Darshil Nathwani", "Rigved", "Shrinidhi Patil", "Aadya Baranwal"],
      technologies: ["React", "TypeScript", "Firebase", "Security-First Design", "Full-Stack Architecture"],
      icon: <Trophy className="text-purple" size={20} />,
      color: "from-yellow/20 to-amber-500/20"
    },
    {
      title: "CICADA Hackathon - TOP 20",
      date: "22-Hour Sprint",
      organizer: "Mastersolis Infotech at Atria University, Bengaluru",
      duration: "22 Hours",
      type: "Innovation Hackathon",
      role: "Team Lead",
      project: "KARM AI - College Placement Management Portal",
      status: "TOP 20 Finish",
      description: "Led Team Jugaadu to build KARM AI, a dual-platform placement management solution in 22 hours. We solved real campus recruitment pain points through a web portal for Students, HOD, and TPO, plus a Chrome extension that auto-fills applications and improves submission speed with AI-assisted workflows.",
      highlights: [
        "Secured a TOP 20 finish among 150+ teams",
        "Completed end-to-end architecture from briefing to final presentation",
        "Built and validated a production-style multi-role placement workflow",
        "Sustained clean code and delivery pace through an overnight sprint"
      ],
      features: [
        "Multi-role portal access for Students, HOD, and TPO operations",
        "AI-powered resume parsing, scoring, and candidate-job fit analysis",
        "Automated placement drive lifecycle with email notifications",
        "Real-time analytics dashboard with department-level reports (Excel/PDF)",
        "Chrome extension for profile-based form auto-fill and one-click submissions",
        "Live application tracking and instant drive update notifications"
      ],
      teammates: ["Aadya Baranwal", "Musaddik Jamadar", "Shreyash J S"],
      technologies: ["React", "FastAPI", "Firebase", "Gemini API", "Chrome Extension"],
      icon: <Trophy className="text-purple" size={20} />,
      color: "from-yellow/20 to-purple/20"
    },
    {
      title: "SIH Internal Hackathon",
      date: "2024",
      organizer: "Smart India Hackathon",
      type: "National Competition",
      role: "Team Lead",
      project: "Smart Tourist Safety Monitoring System",
      status: "Selected for Next Round",
      description: "Team 'Paradox' successfully advanced to the next round with an innovative AI-powered tourist safety solution using geo-fencing and blockchain-based digital identity.",
      highlights: [
        "Successfully passed evaluation round",
        "Impressed expert evaluators",
        "Advanced to next competition phase",
        "National-level recognition"
      ],
      features: [
        "AI-powered monitoring system",
        "Geo-fencing technology",
        "Blockchain digital ID",
        "Incident response automation"
      ],
      icon: <Trophy className="text-purple" size={20} />,
      color: "from-yellow/20 to-orange/20"
    }
  ];

  const participationHighlights = [
    {
      title: "Ignisia 26 National Hackathon",
      date: "January-February 2026",
      organizer: "Ignisia 26",
      duration: "24 Hours",
      type: "Participation",
      role: "Team Atrangi",
      project: "Sanjeevani - Agentic Diagnostic Risk Assistant for ICU Complication Detection",
      description: "Built Sanjeevani to solve a critical ICU challenge: hospitals do not lack data, they lack time to connect signals across that data. The system used a multi-agent architecture to transform fragmented clinical information into interpretable risk reports for faster, safer decisions.",
      highlights: [
        "Completed a full 24-hour national-level build sprint under high pressure",
        "Focused on practical ICU risk interpretation instead of black-box predictions",
        "Used protocol-aware agent collaboration to improve decision quality",
        "Did not win, but shipped a meaningful healthcare AI prototype",
        "Learned in one sprint what usually takes weeks of normal development"
      ],
      features: [
        "Clinical NLP agent to convert unstructured notes into structured timelines",
        "Trend analysis agent to track lab-value evolution over time",
        "Medical RAG agent using embeddings and vector search over real guidance",
        "Chief synthesis agent to merge outputs into one interpretable risk report",
        "NFC-enabled quick patient data access and authentication for ICU practicality"
      ],
      teammates: ["Vishvajitsinh Gohil", "Ishita Mandle", "Kathan Gajera"],
      technologies: ["Clinical NLP", "Multi-Agent Systems", "RAG", "Vector Search", "Embeddings", "NFC"],
      icon: <Clock className="text-purple" size={20} />,
      color: "from-red-500/20 to-purple/20"
    },
    {
      title: "ArtPark CodeForge Hackathon",
      date: "2026",
      organizer: "ArtPark CodeForge",
      duration: "48 Hours",
      type: "Participation",
      role: "Team Kaarigars",
      project: "Setu AI - Adaptive Onboarding Engine",
      description: "Built Setu AI, an adaptive onboarding engine that compares resumes against job descriptions to calculate skill gaps and generate focused learning pathways. The product removed one-size-fits-all onboarding and replaced it with role-aware, evidence-backed progression.",
      highlights: [
        "Delivered a fully functional AI onboarding engine in 48 hours",
        "Solved enterprise onboarding inefficiency with adaptive skill-gap planning",
        "Shipped from blank repository to Dockerized end-to-end system",
        "Added transparent reasoning traces to justify recommendation paths"
      ],
      features: [
        "Fine-tuned Mistral 7B adapters for expertise-aware recommendation behavior",
        "NetworkX prerequisite graph to enforce learning dependency order",
        "ChromaDB grounding to map recommendations to real course inventory",
        "Built-in reasoning trace explaining skipped basics and advanced priorities"
      ],
      teammates: ["Arpit Ravi", "Arya Dudalkar", "Eesha Hemani"],
      technologies: ["Mistral 7B", "NetworkX", "ChromaDB", "Python", "Docker"],
      codeLink: "https://lnkd.in/eCi7Hyca",
      demoLink: "https://lnkd.in/eMiwDVNc",
      icon: <Lightbulb className="text-purple" size={20} />,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "RNSIT Hackathon",
      date: "8-9 April 2026",
      organizer: "RNSIT",
      duration: "48 Hours",
      type: "Participation",
      role: "AI Code Review Build Team",
      project: "RNSIT AI Code Analyzer",
      description: "Built a local-first AI code analysis system for editor and pull-request workflows. The platform combined a FastAPI backend, multi-agent analysis chains, a browser extension for GitHub and GitLab review pages, and a VS Code extension for workspace-aware diagnostics.",
      highlights: [
        "Implemented multi-surface review flow across editor, browser, and backend",
        "Enabled local-only execution so code stays inside localhost boundaries",
        "Supported quick, normal, and thorough scan depths in VS Code",
        "Shipped inline annotations and downloadable Markdown review reports"
      ],
      features: [
        "FastAPI local backend with structured analysis output",
        "Multi-agent pipeline for bug, security, quality, and compliance checks",
        "Chrome extension support for GitHub PR and GitLab MR review pages",
        "Streaming JSONL responses for near-instant progressive rendering",
        "Job-based analyze APIs with polling and websocket alternatives"
      ],
      technologies: ["FastAPI", "LangChain", "Tree-sitter", "ChromaDB", "Ollama", "Semgrep", "Ruff", "Gitleaks", "TypeScript", "VS Code Extension", "Chrome Extension"],
      icon: <Code2 className="text-purple" size={20} />,
      color: "from-purple/20 to-emerald-500/20"
    },
    {
      title: "Hackoasis v2",
      date: "29th November 2024",
      organizer: "Hackoasis",
      duration: "Hackathon",
      type: "Participation",
      project: "No-code Prototype with Wix",
      description: "Participated in my first hackathon and built a prototype using Wix, which kickstarted my competitive building journey.",
      highlights: [
        "First-ever hackathon participation",
        "Built and presented a no-code prototype",
        "Learned team coordination under event timelines"
      ],
      features: [
        "Rapid prototyping in a constrained timeline",
        "Foundation in hackathon workflow and pitching"
      ],
      technologies: ["Wix"],
      icon: <Clock className="text-purple" size={20} />,
      color: "from-purple/20 to-blue/20"
    },
    {
      title: "TechTrek Hackathon",
      date: "March 29, 2025",
      organizer: "DSCE ACM Student Chapter",
      duration: "8 Hours",
      type: "Participation",
      project: "PG Finder Web Application",
      description: "Designed and developed a MERN stack web application to find PGs nearby while working through an intense 8-hour sprint.",
      highlights: [
        "Built complete MERN stack application",
        "Implemented location-based PG search",
        "Improved execution under strict time pressure"
      ],
      features: [
        "Location-based search functionality",
        "PG listing and filtering system",
        "User-friendly responsive interface"
      ],
      teammates: ["Midde Jayanth", "Anshuman Pati", "Aman Kumar Singh"],
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      icon: <Clock className="text-purple" size={20} />,
      color: "from-purple/20 to-blue/20"
    },
    {
      title: "Hackverse 24-Hour Hackathon",
      date: "2024",
      organizer: "DSATM Techfusion",
      duration: "24 Hours",
      type: "Participation",
      role: "Team Lead",
      project: "Kara-AI: Multi-Modal AI Interview Coach",
      description: "Led team 'Jugaadu' to deliver a full-stack AI interview coaching prototype and gained critical leadership experience.",
      highlights: [
        "First online hackathon experience",
        "Team leadership under a 24-hour deadline",
        "Full-stack AI project delivery"
      ],
      features: [
        "Dynamic context-aware interview questions",
        "Live video and audio analysis",
        "Real-time feedback system"
      ],
      teammates: ["Aadya B.", "Musaddik Jamadar"],
      technologies: ["React", "Python", "OpenCV", "AI Models"],
      icon: <Lightbulb className="text-purple" size={20} />,
      color: "from-green/20 to-purple/20"
    },
    {
      title: "HackMan v.8",
      date: "Oct 31 - Nov 1, 2025",
      organizer: "Dayananda Sagar College of Engineering (DSCE)",
      duration: "24 Hours",
      type: "Participation",
      role: "Team Lead",
      project: "Kriti (कृति) - Decentralized Career Identity Platform",
      description: "In my first-ever 24-hour hackathon, I led Team UNO on a single mission: solving the trust crisis in hiring. We built Kriti, a decentralized digital identity platform that works like a DigiLocker for careers. It tackles fake resumes and slow background checks through a blockchain trust layer for verifiable credentials and an AI layer for ATS-proof resume generation plus instant recruiter-side talent verification.",
      highlights: [
        "24-hour sleepless build sprint as Team Lead",
        "Built a B2B/B2C architecture from whiteboard to working prototype",
        "Focused on solving fake resumes and hiring verification delays",
        "Strong learning outcome despite no final rank"
      ],
      features: [
        "Blockchain-backed verifiable credentials for degrees and experience letters",
        "Tamper-proof trust layer for un-forgeable career records",
        "AI engine for ATS-optimized resume creation",
        "Instant candidate verification workflow for recruiters",
        "Career identity vault inspired by DigiLocker"
      ],
      teammates: ["Dhruva K R", "Aadya Baranwal", "Utsav Patel"],
      technologies: ["Blockchain", "Verifiable Credentials", "AI", "React", "Node.js"],
      codeLink: "https://lnkd.in/gjRjJH-6",
      icon: <Award className="text-purple" size={20} />,
      color: "from-blue/20 to-cyan/20"
    },
    {
      title: "Aegis Cybersecurity Hackathon",
      date: "24-Hour Sprint",
      organizer: "Aegis at DSCE",
      duration: "24 Hours",
      type: "Participation",
      role: "Team Merge Conflict",
      project: "Kavach - AI Security Copilot",
      description: "Built Kavach, an AI that watches your AI-generated code in real time. The system blocks risky terminal commands, detects dependency attacks, scans live file changes, protects secrets, and provides local-first AI security analysis without sending code to external servers.",
      highlights: [
        "Delivered a fully local AI security workflow in 24 hours",
        "Focused on making vibe coding safer through proactive guardrails",
        "Combined threat detection, intent control, and rollback safety in one tool",
        "Validated end-to-end implementation under extreme hackathon pressure"
      ],
      features: [
        "Terminal interception to block dangerous commands pre-execution",
        "Phantom dependency blocker for fake and typosquatted packages",
        "Live security scanner for injections, broken auth, weak crypto, and secrets",
        "Secret Shield to keep credentials off AI servers",
        "Intent Guard to prevent over-scoped AI actions",
        "RAG-powered cross-file codebase security analysis",
        "Living vulnerability report that updates as fixes are made",
        "Reinforcement learning loop to reduce noise over time",
        "Rollback safety net for one-command recovery"
      ],
      teammates: ["Arpit Ravi", "Arya Dudalkar", "Rigved Tamkoria"],
      technologies: ["Ollama", "phi4-mini", "nomic-embed-text", "Semgrep", "XGBoost", "ChromaDB", "scikit-learn", "SQLite", "FastAPI", "Python", "TypeScript", "VS Code Extension"],
      codeLink: "https://lnkd.in/gy7hziPh",
      demoLink: "https://lnkd.in/ge3DmKgg",
      icon: <Trophy className="text-purple" size={20} />,
      color: "from-cyan-500/20 to-purple/20"
    }
  ];

  return (
    <Section id="achievements" className="bg-dark-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Achievements & Recognition</h2>
          <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A clear split between competitive outcomes and participation journey across hackathons and technical events.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Competitive Achievements</h3>
          <p className="text-gray-400 text-sm">Wins, rankings, and officially recognized outcomes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {competitiveAchievements.map((achievement, index) => (
            <div 
              key={index}
              className="gradient-border p-4 animate-slide-up opacity-0 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              onClick={() => setSelectedAchievement(achievement)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${achievement.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedAchievement(achievement);
                }
              }}
            >
              <div className="text-center">
                <div className="p-2 bg-purple/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
                  <div className="scale-75">
                    {achievement.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{achievement.title}</h3>
                
                {achievement.role && (
                  <span className="inline-block px-2 py-1 bg-purple/20 text-purple text-xs rounded-full mb-2">
                    {achievement.role}
                  </span>
                )}
                
                {achievement.project && (
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold text-purple line-clamp-2">{achievement.project}</h4>
                  </div>
                )}
                
                <div className="text-xs text-gray-400 mb-3">
                  <div className="mb-1">{achievement.date}</div>
                  {achievement.status && (
                    <div className="text-yellow-400 font-medium">{achievement.status}</div>
                  )}
                </div>
                
                <div className="flex items-center justify-center text-purple group-hover:text-purple-light transition-colors">
                  <ExternalLink size={14} className="mr-1" />
                  <span className="text-xs font-medium">Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Hackathon Participation Journey</h3>
          <p className="text-gray-400 text-sm">Sprints that shaped execution speed, teamwork, and product intuition.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participationHighlights.map((achievement, index) => (
            <div 
              key={`participation-${index}`}
              className="gradient-border p-4 animate-slide-up opacity-0 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              onClick={() => setSelectedAchievement(achievement)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${achievement.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedAchievement(achievement);
                }
              }}
            >
              <div className="text-center">
                <div className="p-2 bg-purple/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:bg-purple/20 transition-colors">
                  <div className="scale-75">
                    {achievement.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{achievement.title}</h3>

                {achievement.role && (
                  <span className="inline-block px-2 py-1 bg-purple/20 text-purple text-xs rounded-full mb-2">
                    {achievement.role}
                  </span>
                )}

                {achievement.project && (
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold text-purple line-clamp-2">{achievement.project}</h4>
                  </div>
                )}

                <div className="text-xs text-gray-400 mb-3">
                  <div className="mb-1">{achievement.date}</div>
                </div>

                <div className="flex items-center justify-center text-purple group-hover:text-purple-light transition-colors">
                  <ExternalLink size={14} className="mr-1" />
                  <span className="text-xs font-medium">Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-purple/10 rounded-full border border-purple/20">
            <Trophy className="text-purple mr-2" size={20} />
            <span className="text-gray-300 font-medium">
              Continuously participating in hackathons and technical competitions
            </span>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedAchievement(null);
            }
          }}
        >
          <div className="bg-dark-secondary border border-purple/20 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden relative animate-slide-up">
            <div className="bg-dark-secondary border-b border-purple/20 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-purple/10 rounded-full mr-3">
                  {selectedAchievement.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedAchievement.title}</h2>
                  {selectedAchievement.role && (
                    <span className="inline-block px-2 py-1 bg-purple/20 text-purple text-xs rounded-full mt-1">
                      {selectedAchievement.role}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAchievement(null);
                }}
                className="p-2 hover:bg-purple/10 rounded-full transition-colors"
                aria-label="Close achievement details"
              >
                <X className="text-gray-400 hover:text-white" size={18} />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(80vh-70px)] p-4">
            
              {/* Project Title */}
              {selectedAchievement.project && (
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-purple mb-2 flex items-center">
                    <Code2 className="mr-2" size={16} />
                    {selectedAchievement.project}
                  </h3>
                </div>
              )}

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-dark/50 p-2 rounded border border-purple/20">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Calendar className="mr-1 text-purple" size={12} />
                    <span className="text-xs">Date</span>
                  </div>
                  <p className="text-white text-sm font-medium">{selectedAchievement.date}</p>
                </div>
                
                <div className="bg-dark/50 p-2 rounded border border-purple/20">
                  <div className="flex items-center text-gray-400 mb-1">
                    <MapPin className="mr-1 text-purple" size={12} />
                    <span className="text-xs">Organizer</span>
                  </div>
                  <p className="text-white text-sm font-medium">{selectedAchievement.organizer}</p>
                </div>
                
                <div className="bg-dark/50 p-2 rounded border border-purple/20">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Clock className="mr-1 text-purple" size={12} />
                    <span className="text-xs">Duration</span>
                  </div>
                  <p className="text-white text-sm font-medium">{selectedAchievement.duration || selectedAchievement.type}</p>
                  {selectedAchievement.status && (
                    <div className="flex items-center mt-1">
                      <Trophy className="mr-1 text-yellow-400" size={10} />
                      <span className="text-yellow-400 text-xs font-medium">{selectedAchievement.status}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-2">About the Project</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedAchievement.description}</p>
                {selectedAchievement.codeLink && (
                  <a
                    href={selectedAchievement.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-xs font-medium text-purple hover:text-purple-light transition-colors"
                  >
                    <ExternalLink size={12} className="mr-1" />
                    Check out the code
                  </a>
                )}
                {selectedAchievement.demoLink && (
                  <a
                    href={selectedAchievement.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 ml-4 text-xs font-medium text-purple hover:text-purple-light transition-colors"
                  >
                    <ExternalLink size={12} className="mr-1" />
                    Watch demo video
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Highlights */}
                {selectedAchievement.highlights && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Key Highlights</h4>
                  <div className="space-y-1">
                    {selectedAchievement.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-xs">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* Features */}
                {selectedAchievement.features && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Key Features</h4>
                    <div className="space-y-1">
                      {selectedAchievement.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies */}
              {selectedAchievement.technologies && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedAchievement.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-purple/10 text-purple border border-purple/20 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {selectedAchievement.teammates && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                    <Users className="mr-1" size={14} />
                    Team Members
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.teammates.map((teammate, idx) => (
                      <div key={idx} className="bg-dark/50 border border-purple/20 p-2 rounded">
                        <span className="text-white text-xs font-medium">{teammate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Achievements;