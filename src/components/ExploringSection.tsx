import React from 'react';
import Section from './ui/Section';
import { Brain, Code2, Cloud, Shield, Zap, Rocket } from 'lucide-react';

const ExploringSection = () => {
  const exploringCategories = [
    {
      title: "AI Security & Local LLMs",
      icon: <Brain className="text-purple" size={24} />,
      items: ["Ollama", "Local Model Routing", "Prompt Guardrails", "Secure Inference", "Model Evaluation", "Safety Policies"]
    },
    {
      title: "Full-Stack Product Engineering",
      icon: <Code2 className="text-purple" size={24} />,
      items: ["Next.js", "WebSocket Workflows", "Event-Driven APIs", "Advanced Auth", "Caching Patterns", "System Design"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="text-purple" size={24} />,
      items: ["AWS Core Services", "GCP Services", "Docker Compose", "CI/CD Pipelines", "Observability", "Cost-Aware Deployment"]
    },
    {
      title: "Secure Developer Tooling",
      icon: <Shield className="text-purple" size={24} />,
      items: ["Semgrep Rule Tuning", "Dependency Risk Scoring", "Secret Scanning", "Extension Security", "Rollback Automation", "Threat Modeling"]
    }
  ];

  return (
    <Section id="exploring" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Currently Exploring</h2>
          <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I stay hands-on with production-relevant technologies and security-first workflows, 
            continuously exploring tools that improve reliability, speed, and real-world impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {exploringCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="gradient-border p-6 animate-slide-up opacity-0 hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${0.1 + categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple/10 rounded-full mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <span 
                    key={itemIndex}
                    className="px-3 py-2 bg-dark-secondary/60 text-gray-300 text-sm rounded-lg border border-purple/20 hover:border-purple/40 hover:bg-purple/5 transition-all duration-200 animate-slide-up opacity-0"
                    style={{ animationDelay: `${0.2 + categoryIndex * 0.1 + itemIndex * 0.05}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-purple/10 rounded-full border border-purple/20">
            <Rocket className="text-purple mr-2" size={20} />
            <span className="text-gray-300 font-medium">
              Learning in public, building in sprints, improving every release
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExploringSection;
