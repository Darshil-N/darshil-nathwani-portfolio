import React from 'react';
import Section from './ui/Section';
import { Briefcase, Building2, CalendarDays, ExternalLink } from 'lucide-react';

interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  website?: string;
}

const professionalExperiences: Experience[] = [
  {
    role: 'Part-Time Software Developer',
    company: 'Vina EduTech',
    period: 'Jul 2026 - Present',
    type: 'Part-Time (Remote)',
    summary:
      'Transitioned to the parent company, Vina EduTech, to focus on cross-platform app and web development using React Native and related technologies.',
    highlights: [
      'Leading app and web development initiatives using React Native and the modern JavaScript ecosystem',
      'Actively participating in professional software development lifecycles including code reviews and iterations',
      'Collaborating closely with a dedicated technical team to deliver reliable and maintainable software products'
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Indian Chess Academy (Vina EduTech Pvt. Ltd.)',
    period: 'Apr 2026 - Jun 2026',
    type: 'Internship (Remote)',
    website: 'https://indianchessacad.com',
    summary:
      'Offered the internship after a successful academy hackathon and one-month training period, with responsibilities spanning internal product development and team delivery workflows.',
    highlights: [
      'Built and shipped the official academy website as part of core web development deliverables',
      'Developed and maintained internal tools, websites, and dashboards for academy operations',
      'Collaborated with the team on frontend and backend feature implementation',
      'Participated in weekly sprints and code reviews in a fully remote setup',
      'Followed company confidentiality and data security practices across deliverables',
    ],
  },
  {
    role: 'Artificial Intelligence Research Intern',
    company: 'Grep Digital | Trust-Grade Platforms & Sovereign Systems',
    period: 'Oct 2025 - Mar 2026',
    type: 'Internship (Remote)',
    summary:
      'Led the design and implementation of an AI system that converts natural language queries into SQL while supporting CCTV footage retrieval workflows for Drishti AI.',
    highlights: [
      'Designed a natural language to SQL pipeline for analytical querying',
      'Collaborated with cross-functional teams to retrieve CCTV footage using constraint-based queries',
      'Improved query efficiency and overall system performance for Drishti AI',
      'Co-authored “Drishti-Ai: A Natural Language-Driven Framework for Campus Incident Analysis Using DeepSeek Text-to-SQL”, accepted at IEEE TENCON 2026',
    ],
  },
];

const clubRoles: Experience[] = [
  {
    role: 'Tech Team Member',
    company: 'NUMERANO',
    period: '2026 - Present',
    type: 'Club Role',
    summary:
      'Contributing to product-focused engineering initiatives with an emphasis on clean full-stack implementation, AI-enabled workflows, and practical delivery.',
    highlights: [
      'Building production-minded features with performance and reliability in focus',
      'Collaborating across teams to ship fast iterations with maintainable architecture',
      'Applying AI tools to improve development speed while preserving code quality',
    ],
  },
  {
    role: 'Tech Team Member',
    company: 'AWS Club, DSCE',
    period: '11 Apr 2026 - Present',
    type: 'Club Experience',
    summary:
      'Contributing as a core tech team member by supporting event technology, developer initiatives, and cloud-focused project execution within the club.',
    highlights: [
      'Helped build and maintain technical assets for club events and activities',
      'Collaborated with team members on cloud and full-stack implementation tasks',
      'Supported smooth technical operations for workshops, sessions, and showcases',
      'Contributed to rapid prototyping and practical developer workflows',
      'Prepared CTF 2026 questions and helped shape the event flow for Capture The Flag 2026',
    ],
  },
];

const ProfessionalExperience = () => {
  const renderExperienceCards = (items: Experience[], delayOffset = 0) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {items.map((experience, index) => (
        <div
          key={`${experience.company}-${experience.role}-${index}`}
          className="gradient-border p-6 animate-slide-up opacity-0"
          style={{ animationDelay: `${0.1 + (index + delayOffset) * 0.1}s` }}
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
              {experience.website ? (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-md bg-purple/20 border border-purple/40 px-3 py-1.5 text-sm font-semibold text-purple-light hover:bg-purple/30 hover:border-purple/60 transition-colors"
                >
                  {experience.website.replace(/^https?:\/\//, '')}
                  <ExternalLink size={14} />
                </a>
              ) : null}
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
  );

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

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-5 text-center md:text-left max-w-6xl mx-auto">
              Professional Experience
            </h3>
            {renderExperienceCards(professionalExperiences)}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-5 text-center md:text-left max-w-6xl mx-auto">
              Club Roles
            </h3>
            {renderExperienceCards(clubRoles, professionalExperiences.length)}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProfessionalExperience;
