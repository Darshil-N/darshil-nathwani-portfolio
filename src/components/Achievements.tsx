import React, { useState } from 'react';
import Section from './ui/Section';
import { Trophy, Users, Clock, Lightbulb, Award, Calendar, MapPin, Code2, X, ExternalLink } from 'lucide-react';

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  
  const achievements = [
    {
      title: "Participation",
      subtitle: "HackOasisV2",
      description: "A participation in first ever hackathon where we built a website using no coding tools like wix",
      date: "28th November 2024",
      category: "hackathon",
      details: {
        event: "HackOasisV2",
        achievement: "Participation",
        team: "Error 404",
        technologies: ["Wix"],
        impact: ""
      }
    },
{
      title: "TechTrek Hackathon",
      date: "March 29, 2025",
      organizer: "DSCE ACM Student Chapter",
      duration: "8 Hours",
      type: "Open-themed Hackathon",
      project: "PG Finder Web Application",
      description: "Designed and developed a MERN stack web application to find PGs nearby. Participated in an intensive 8-hour hackathon that enhanced time management and web development skills while collaborating with an amazing team.",
      highlights: [
        "Built complete MERN stack application",
        "Implemented location-based PG search",
        "Enhanced time management under pressure",
        "Successful team collaboration",
        "Mentorship from industry experts"
      ],
      features: [
        "Location-based search functionality",
        "PG listing and filtering system",
        "User-friendly interface design",
        "Real-time data management"
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
      type: "AI/ML Domain",
      role: "Team Lead",
      project: "Kara-AI: Multi-Modal AI Interview Coach",
      description: "Led team 'Jugaadu' to build a comprehensive AI interview coaching platform. First time as team lead, successfully architected and delivered a complete full-stack AI solution.",
      highlights: [
        "First online hackathon experience",
        "Successful team leadership debut",
        "Full-stack AI project delivery",
        "Multi-modal AI integration"
      ],
      features: [
        "Dynamic context-aware questions",
        "Live video & audio analysis",
        "Real-time feedback system",
        "Speech pattern evaluation"
      ],
      teammates: ["Aadya B.", "Musaddik Jamadar"],
      technologies: ["React", "Python", "OpenCV", "AI Models"],
      icon: <Lightbulb className="text-purple" size={20} />,
      color: "from-green/20 to-purple/20"
    },
    {
      title: "HackMan v.8",
      date: "2024",
      organizer: "ISE Department, DSCE",
      duration: "24 Hours",
      type: "Innovation Marathon",
      role: "Team Lead",
      project: "Project Kriti - Trusted Career Network",
      description: "Led development of a blockchain-based career verification system combining AI and distributed ledger technology to solve document forgery in recruitment.",
      highlights: [
        "Tackled real-world forgery problems",
        "Integrated blockchain security",
        "AI-powered recruitment tools",
        "Comprehensive career passport"
      ],
      features: [
        "Secure KYC wallet system",
        "Tamper-proof credentials",
        "AI-smart candidate filtering",
        "Automated resume generation",
        "Smart autofill extension"
      ],
      technologies: ["Hyperledger Aries", "Fabric", "PyTorch", "TensorFlow", "React", "Node.js", "Firebase"],
      icon: <Award className="text-purple" size={20} />,
      color: "from-blue/20 to-cyan/20"
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

  return (
    <Section id="achievements" className="bg-dark-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Achievements & Recognition</h2>
          <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing hackathon victories, leadership experiences, and innovative projects that demonstrate 
            technical excellence and collaborative problem-solving skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
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
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Highlights */}
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