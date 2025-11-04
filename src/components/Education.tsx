import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from 'lucide-react';
import Section from './ui/Section';

const Education = () => {
  const educationData = [
    {
      degree: "B.E. in Information Science and Engineering",
      institution: "Dayananda Sagar College of Engineering",
      location: "Bengaluru, Karnataka",
      duration: "2024 - Present",
      status: "Currently Pursuing"
    }
  ];

  return (
    <Section id="education" className="bg-dark-secondary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Education</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <div key={index} className="animate-slide-up opacity-0" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              <div className="gradient-border p-8 mb-8">
                {/* Header Section */}
                <div className="flex items-start mb-6">
                  <div className="mr-6 flex-shrink-0">
                    <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="text-purple" size={32} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                        <p className="text-lg text-purple font-medium">{edu.institution}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-flex items-center bg-purple/20 text-purple text-sm font-medium px-4 py-2 rounded-full">
                          <Calendar className="mr-2" size={14} />
                          {edu.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="mr-2" size={16} />
                      <span>{edu.location}</span>
                      <span className="mx-3">•</span>
                      <span className="text-green-400 font-medium">{edu.status}</span>
                    </div>
                  </div>
                </div>



                {/* Bottom Stats */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="text-purple mr-2" size={16} />
                      <span>Information Science & Engineering</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <BookOpen className="text-purple mr-2" size={16} />
                      <span>Undergraduate Program</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Education;