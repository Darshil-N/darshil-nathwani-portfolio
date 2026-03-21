import React from 'react';
import Section from './ui/Section';
import { Briefcase, Building2, CalendarDays } from 'lucide-react';

const experiences = [
  {
    role: 'Tech Team Member',
    company: 'NUMERANO',
    period: '2026 - Present',
    type: 'Professional Experience',
    summary:
      'Contributing to product-focused engineering initiatives with an emphasis on clean full-stack implementation, AI-enabled workflows, and practical delivery.',
    highlights: [
      'Building production-minded features with performance and reliability in focus',
      'Collaborating across teams to ship fast iterations with maintainable architecture',
      'Applying AI tools to improve development speed while preserving code quality',
    ],
  },
];

const ProfessionalExperience = () => {
  return (
    <Section id="experience" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Professional Experience</h2>
          <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional roles and responsibilities focused on building reliable software and real-world impact.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="gradient-border p-6 animate-slide-up opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Briefcase className="text-purple mr-2" size={20} />
                    {experience.role}
                  </h3>
                  <p className="text-purple font-medium mt-1 flex items-center">
                    <Building2 className="mr-2" size={16} />
                    {experience.company}
                  </p>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs font-medium">
                    {experience.type}
                  </span>
                  <span className="inline-flex items-center text-gray-400 text-sm">
                    <CalendarDays className="mr-2" size={14} />
                    {experience.period}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">{experience.summary}</p>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Key Contributions</h4>
                <div className="space-y-2">
                  {experience.highlights.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-purple rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProfessionalExperience;
