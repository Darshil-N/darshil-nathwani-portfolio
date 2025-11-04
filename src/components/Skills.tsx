import React from 'react';
import Section from './ui/Section';
import { SiPython, SiCplusplus, SiC, SiJavascript, SiTypescript, SiKotlin, SiReact, SiNodedotjs, SiGithub, SiGit, SiVscodium, SiTensorflow, SiOpencv, SiFlask, SiFastapi, SiFirebase, SiMongodb, SiSqlite, SiTailwindcss, SiVite, SiStreamlit, SiSolidity, SiAndroid, SiJupyter, SiKaggle, SiAnaconda, SiPandas, SiNumpy, SiLinux, SiUbuntu, SiCanva, SiFigma, SiHuggingface, SiGooglecolab, SiVercel, SiRailway, SiNetlify, SiDocker } from 'react-icons/si';
import { Code2, Brain, Eye, Cloud, Server, Database, Smartphone, Globe, Zap, Settings, Layers, Map, Shield, Bot, BarChart3, GitBranch, Cpu, FileText, Link, HardDrive, Palette, MonitorSpeaker } from 'lucide-react';

const Skills = () => {
  const skills = {
    programming: ["Python", "C++", "C", "JavaScript", "TypeScript", "Kotlin"],
    frameworks: ["React", "FastAPI", "Flask", "Node.js", "Streamlit", "Jetpack Compose", "Tailwind CSS", "Vite"],
    aiml: ["TensorFlow", "OpenCV", "YOLO", "XGBoost", "SHAP", "Gemini API", "LangChain", "Hugging Face", "Emotion Detection"],
    databases: ["Firebase", "Firestore", "Supabase", "MongoDB", "SQLite"],
    tools: ["VS Code", "GitHub", "Git", "Jupyter Notebook", "Google Colab", "Anaconda", "Kaggle", "Android Studio", "Spline"],
    dataScience: ["Pandas", "Numpy", "Matplotlib", "Power BI", "Data Science", "Data Interpretation"],
    devOps: ["Linux", "Ubuntu", "Docker", "Vercel", "Railway", "Netlify", "Cloud Computing", "Deployment", "Blockchain", "Polygon", "Metamask"],
    design: ["Canva", "Figma", "Spline"],
    concepts: ["DSA", "AI", "ML", "Computer Vision", "API Development", "OOP", "Authentication", "Stacks", "Queues", "Linked Lists"]
  };

  const skillIcons: Record<string, React.ReactNode> = {
    // Programming Languages
    'Python': <SiPython className="text-purple mr-1" size={16} />,
    'C++': <SiCplusplus className="text-purple mr-1" size={16} />,
    'C': <SiC className="text-purple mr-1" size={16} />,
    'JavaScript': <SiJavascript className="text-purple mr-1" size={16} />,
    'TypeScript': <SiTypescript className="text-purple mr-1" size={16} />,
    'Kotlin': <SiKotlin className="text-purple mr-1" size={16} />,
    
    // Frameworks & Libraries
    'React': <SiReact className="text-purple mr-1" size={16} />,
    'FastAPI': <SiFastapi className="text-purple mr-1" size={16} />,
    'Flask': <SiFlask className="text-purple mr-1" size={16} />,
    'Node.js': <SiNodedotjs className="text-purple mr-1" size={16} />,
    'Streamlit': <SiStreamlit className="text-purple mr-1" size={16} />,
    'Jetpack Compose': <SiAndroid className="text-purple mr-1" size={16} />,
    'Tailwind CSS': <SiTailwindcss className="text-purple mr-1" size={16} />,
    'Vite': <SiVite className="text-purple mr-1" size={16} />,
    
    // AI/ML
    'TensorFlow': <SiTensorflow className="text-purple mr-1" size={16} />,
    'OpenCV': <SiOpencv className="text-purple mr-1" size={16} />,
    'YOLO': <Eye className="text-purple mr-1" size={16} />,
    'XGBoost': <Bot className="text-purple mr-1" size={16} />,
    'SHAP': <Brain className="text-purple mr-1" size={16} />,
    'Gemini API': <Bot className="text-purple mr-1" size={16} />,
    'LangChain': <Layers className="text-purple mr-1" size={16} />,
    'Hugging Face': <SiHuggingface className="text-purple mr-1" size={16} />,
    'Emotion Detection': <Eye className="text-purple mr-1" size={16} />,
    
    // Databases
    'Firebase': <SiFirebase className="text-purple mr-1" size={16} />,
    'Firestore': <SiFirebase className="text-purple mr-1" size={16} />,
    'Supabase': <Database className="text-purple mr-1" size={16} />,
    'MongoDB': <SiMongodb className="text-purple mr-1" size={16} />,
    'SQLite': <SiSqlite className="text-purple mr-1" size={16} />,
    
    // Tools
    'VS Code': <SiVscodium className="text-purple mr-1" size={16} />,
    'GitHub': <SiGithub className="text-purple mr-1" size={16} />,
    'Git': <SiGit className="text-purple mr-1" size={16} />,
    'Jupyter Notebook': <SiJupyter className="text-purple mr-1" size={16} />,
    'Google Colab': <SiGooglecolab className="text-purple mr-1" size={16} />,
    'Anaconda': <SiAnaconda className="text-purple mr-1" size={16} />,
    'Kaggle': <SiKaggle className="text-purple mr-1" size={16} />,
    'Android Studio': <SiAndroid className="text-purple mr-1" size={16} />,
    'Spline': <Code2 className="text-purple mr-1" size={16} />,
    
    // Data Science
    'Pandas': <SiPandas className="text-purple mr-1" size={16} />,
    'Numpy': <SiNumpy className="text-purple mr-1" size={16} />,
    'Matplotlib': <BarChart3 className="text-purple mr-1" size={16} />,
    'Power BI': <MonitorSpeaker className="text-purple mr-1" size={16} />,
    'Data Science': <BarChart3 className="text-purple mr-1" size={16} />,
    'Data Interpretation': <FileText className="text-purple mr-1" size={16} />,
    
    // DevOps & Systems
    'Linux': <SiLinux className="text-purple mr-1" size={16} />,
    'Ubuntu': <SiUbuntu className="text-purple mr-1" size={16} />,
    'Docker': <SiDocker className="text-purple mr-1" size={16} />,
    'Vercel': <SiVercel className="text-purple mr-1" size={16} />,
    'Railway': <SiRailway className="text-purple mr-1" size={16} />,
    'Netlify': <SiNetlify className="text-purple mr-1" size={16} />,
    'Cloud Computing': <Cloud className="text-purple mr-1" size={16} />,
    'Deployment': <Server className="text-purple mr-1" size={16} />,
    'Blockchain': <SiSolidity className="text-purple mr-1" size={16} />,
    'Polygon': <Shield className="text-purple mr-1" size={16} />,
    'Metamask': <Shield className="text-purple mr-1" size={16} />,
    
    // Design Tools
    'Canva': <SiCanva className="text-purple mr-1" size={16} />,
    'Figma': <SiFigma className="text-purple mr-1" size={16} />,
    
    // Concepts & Algorithms
    'DSA': <Settings className="text-purple mr-1" size={16} />,
    'AI': <Brain className="text-purple mr-1" size={16} />,
    'ML': <Brain className="text-purple mr-1" size={16} />,
    'Computer Vision': <Eye className="text-purple mr-1" size={16} />,
    'API Development': <Globe className="text-purple mr-1" size={16} />,
    'OOP': <Cpu className="text-purple mr-1" size={16} />,
    'Authentication': <Shield className="text-purple mr-1" size={16} />,
    'Stacks': <Layers className="text-purple mr-1" size={16} />,
    'Queues': <Link className="text-purple mr-1" size={16} />,
    'Linked Lists': <Link className="text-purple mr-1" size={16} />,
  };

  return (
    <Section id="skills" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Technical Skills</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Programming Languages</h3>
            <div className="flex flex-wrap">
              {skills.programming.map((skill, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.13 + index * 0.03}s` }}>{skillIcons[skill] || <Code2 className="text-purple mr-1" size={16} />}{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.15s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Frameworks & Libraries</h3>
            <div className="flex flex-wrap">
              {skills.frameworks.map((framework, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.18 + index * 0.03}s` }}>{skillIcons[framework] || <Code2 className="text-purple mr-1" size={16} />}{framework}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">AI & Machine Learning</h3>
            <div className="flex flex-wrap">
              {skills.aiml.map((tech, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.23 + index * 0.03}s` }}>{skillIcons[tech] || <Brain className="text-purple mr-1" size={16} />}{tech}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.25s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Databases & Backend</h3>
            <div className="flex flex-wrap">
              {skills.databases.map((db, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.28 + index * 0.03}s` }}>{skillIcons[db] || <Database className="text-purple mr-1" size={16} />}{db}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Development Tools</h3>
            <div className="flex flex-wrap">
              {skills.tools.map((tool, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.33 + index * 0.03}s` }}>{skillIcons[tool] || <Settings className="text-purple mr-1" size={16} />}{tool}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.35s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Data Science & Analytics</h3>
            <div className="flex flex-wrap">
              {skills.dataScience.map((skill, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.38 + index * 0.03}s` }}>{skillIcons[skill] || <BarChart3 className="text-purple mr-1" size={16} />}{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">DevOps & Cloud</h3>
            <div className="flex flex-wrap">
              {skills.devOps.map((skill, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.43 + index * 0.03}s` }}>{skillIcons[skill] || <Cloud className="text-purple mr-1" size={16} />}{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.45s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Design Tools</h3>
            <div className="flex flex-wrap">
              {skills.design.map((skill, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.48 + index * 0.03}s` }}>{skillIcons[skill] || <Palette className="text-purple mr-1" size={16} />}{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Core Concepts</h3>
            <div className="flex flex-wrap">
              {skills.concepts.map((concept, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.53 + index * 0.03}s` }}>{skillIcons[concept] || <Brain className="text-purple mr-1" size={16} />}{concept}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;