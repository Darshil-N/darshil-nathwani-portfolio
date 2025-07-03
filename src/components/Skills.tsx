import React from 'react';
import Section from './ui/Section';
import { SiPython, SiCplusplus, SiC, SiGithub, SiGit, SiVscodium, SiTensorflow, SiOpencv, SiFlask, SiJupyter, SiKaggle, SiRoboflow, SiGooglecolab, SiAnaconda, SiPandas, SiNumpy } from 'react-icons/si';
import { Code2, Github, GitBranch, Terminal, FlaskConical, BookOpen, Brain, Eye, Cloud, Server, Bot, BookText, FileBarChart2, Layers, FileImage, Settings, Cpu, Globe, BarChart2 } from 'lucide-react';

const Skills = () => {
  const skills = {
    programming: ["C++", "C", "Python"],
    tools: ["GitHub", "Git", "VS Code", "YOLO", "TensorFlow", "OpenCV", "Flask","Jupyter Notebook","LabelImg","Kaggle","Roboflow","Google Colab","Anaconda","Pandas","Numpy","Matplotlib",],
    concepts: ["DSA", "AI", "ML", "Data Science", "Cloud Computing","Computer Vision","API Development","Version Control (Git)","Object-Oriented Programming (OOP)","Data Interpretation","Deployment"]
  };

  const skillIcons: Record<string, React.ReactNode> = {
    'C++': <SiCplusplus className="text-purple mr-1" size={16} />,
    'C': <SiC className="text-purple mr-1" size={16} />,
    'Python': <SiPython className="text-purple mr-1" size={16} />,
    'GitHub': <SiGithub className="text-purple mr-1" size={16} />,
    'Git': <SiGit className="text-purple mr-1" size={16} />,
    'VS Code': <SiVscodium className="text-purple mr-1" size={16} />,
    'YOLO': <Code2 className="text-purple mr-1" size={16} />,
    'TensorFlow': <SiTensorflow className="text-purple mr-1" size={16} />,
    'OpenCV': <SiOpencv className="text-purple mr-1" size={16} />,
    'Flask': <SiFlask className="text-purple mr-1" size={16} />,
    'Jupyter Notebook': <SiJupyter className="text-purple mr-1" size={16} />,
    'LabelImg': <Code2 className="text-purple mr-1" size={16} />,
    'Kaggle': <SiKaggle className="text-purple mr-1" size={16} />,
    'Roboflow': <SiRoboflow className="text-purple mr-1" size={16} />,
    'Google Colab': <SiGooglecolab className="text-purple mr-1" size={16} />,
    'Anaconda': <SiAnaconda className="text-purple mr-1" size={16} />,
    'Pandas': <SiPandas className="text-purple mr-1" size={16} />,
    'Numpy': <SiNumpy className="text-purple mr-1" size={16} />,
    'Matplotlib': <Code2 className="text-purple mr-1" size={16} />,
    'DSA': <Settings className="text-purple mr-1" size={16} />,
    'AI': <Brain className="text-purple mr-1" size={16} />,
    'ML': <Brain className="text-purple mr-1" size={16} />,
    'Data Science': <BarChart2 className="text-purple mr-1" size={16} />,
    'Cloud Computing': <Cloud className="text-purple mr-1" size={16} />,
    'Computer Vision': <Eye className="text-purple mr-1" size={16} />,
    'API Development': <Globe className="text-purple mr-1" size={16} />,
    'Version Control (Git)': <GitBranch className="text-purple mr-1" size={16} />,
    'Object-Oriented Programming (OOP)': <Cpu className="text-purple mr-1" size={16} />,
    'Data Interpretation': <BarChart2 className="text-purple mr-1" size={16} />,
    'Deployment': <Server className="text-purple mr-1" size={16} />,
  };

  return (
    <Section id="skills" className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Technical Skills</h2>
        <div className="w-24 h-1 bg-purple mx-auto rounded-full mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Programming Languages</h3>
            <div className="flex flex-wrap">
              {skills.programming.map((skill, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.13 + index * 0.03}s` }}>{skillIcons[skill] || <Code2 className="text-purple mr-1" size={16} />}{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Tools</h3>
            <div className="flex flex-wrap">
              {skills.tools.map((tool, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.23 + index * 0.03}s` }}>{skillIcons[tool] || <Code2 className="text-purple mr-1" size={16} />}{tool}</span>
              ))}
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold text-white mb-4">Concepts</h3>
            <div className="flex flex-wrap">
              {skills.concepts.map((concept, index) => (
                <span key={index} className="skill-tag flex items-center animate-slide-up opacity-0" style={{ animationDelay: `${0.33 + index * 0.03}s` }}>{skillIcons[concept] || <Code2 className="text-purple mr-1" size={16} />}{concept}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;