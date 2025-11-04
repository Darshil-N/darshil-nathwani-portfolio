import React, { useState } from 'react';
import { X, Plus, Github, ExternalLink, Save, Eye, Settings, LogOut } from 'lucide-react';
import { githubService, ProjectData, AchievementData } from '../services/githubService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'achievements' | 'settings'>('projects');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [githubToken, setGithubToken] = useState(githubService.getToken() || '');

  // Project form state
  const [projectForm, setProjectForm] = useState<ProjectData>({
    title: '',
    description: '',
    detailedDescription: '',
    techStack: [],
    category: 'web',
    github: '',
    liveDemo: '',
    logo: '',
    features: [],
    challenges: [],
    learnings: [],
    isNew: true
  });

  // Achievement form state
  const [achievementForm, setAchievementForm] = useState<AchievementData>({
    title: '',
    subtitle: '',
    description: '',
    date: '',
    category: 'hackathon',
    details: {
      event: '',
      achievement: '',
      team: '',
      technologies: [],
      impact: ''
    }
  });

  const projectCategories = [
    { label: 'Web Development', value: 'web' },
    { label: 'AI/ML', value: 'ai' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Computer Vision', value: 'cv' },
    { label: 'DSA & Algorithms', value: 'dsa' }
  ];
  const achievementCategories = ['hackathon', 'leadership', 'academic', 'professional'];

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveToken = async () => {
    if (!githubToken.trim()) {
      showMessage('error', 'Please enter a GitHub token');
      return;
    }

    setIsLoading(true);
    githubService.setToken(githubToken);
    
    const isValid = await githubService.testConnection();
    if (isValid) {
      showMessage('success', 'GitHub token saved and verified!');
    } else {
      showMessage('error', 'Invalid GitHub token. Please check and try again.');
    }
    setIsLoading(false);
  };

  const handleAddProject = async () => {
    if (!projectForm.title || !projectForm.description || !projectForm.detailedDescription) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    if (!githubService.getToken()) {
      showMessage('error', 'Please set up GitHub token first');
      setActiveTab('settings');
      return;
    }

    setIsLoading(true);
    try {
      await githubService.addProject(projectForm);
      showMessage('success', 'Project added successfully! Changes will be live in a few minutes.');
      
      // Reset form
      setProjectForm({
        title: '',
        description: '',
        detailedDescription: '',
        techStack: [],
        category: 'web',
        github: '',
        liveDemo: '',
        logo: '',
        features: [],
        challenges: [],
        learnings: [],
        isNew: true
      });
    } catch (error) {
      showMessage('error', `Failed to add project: ${error}`);
    }
    setIsLoading(false);
  };

  const handleAddAchievement = async () => {
    if (!achievementForm.title || !achievementForm.description || !achievementForm.details.event) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    if (!githubService.getToken()) {
      showMessage('error', 'Please set up GitHub token first');
      setActiveTab('settings');
      return;
    }

    setIsLoading(true);
    try {
      await githubService.addAchievement(achievementForm);
      showMessage('success', 'Achievement added successfully! Changes will be live in a few minutes.');
      
      // Reset form
      setAchievementForm({
        title: '',
        subtitle: '',
        description: '',
        date: '',
        category: 'hackathon',
        details: {
          event: '',
          achievement: '',
          team: '',
          technologies: [],
          impact: ''
        }
      });
    } catch (error) {
      showMessage('error', `Failed to add achievement: ${error}`);
    }
    setIsLoading(false);
  };

  const handleArrayInput = (value: string, setter: (arr: string[]) => void) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setter(array);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark border border-purple/30 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-purple/20 rounded-lg flex items-center justify-center">
              <Settings className="text-purple" size={20} />
            </div>
            Portfolio Admin Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
          >
            <LogOut size={24} />
          </button>
        </div>

        {/* Message Banner */}
        {message && (
          <div className={`mx-6 mt-4 p-3 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 px-6">
          {[
            { id: 'projects', label: 'Add Project', icon: Plus },
            { id: 'achievements', label: 'Add Achievement', icon: Plus },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple text-purple'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Add New Project</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="AI Interview Coach"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectData['category'] })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white focus:border-purple focus:outline-none"
                  >
                    {projectCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="AI-powered platform for interview preparation..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Long Description *
                  </label>
                  <textarea
                    value={projectForm.detailedDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, detailedDescription: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="Detailed description of the project, its features, and impact..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.techStack.join(', ')}
                    onChange={(e) => handleArrayInput(e.target.value, (arr) => setProjectForm({ ...projectForm, techStack: arr }))}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="React, TypeScript, Python, OpenAI"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.logo}
                    onChange={(e) => setProjectForm({ ...projectForm, logo: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="/images/project-logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="https://github.com/Darshil-N/project-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.liveDemo}
                    onChange={(e) => setProjectForm({ ...projectForm, liveDemo: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="https://your-project.vercel.app"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.features?.join(', ') || ''}
                    onChange={(e) => handleArrayInput(e.target.value, (arr) => setProjectForm({ ...projectForm, features: arr }))}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="Real-time chat, AI integration, Voice commands"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Challenges Faced (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.challenges?.join(', ') || ''}
                    onChange={(e) => handleArrayInput(e.target.value, (arr) => setProjectForm({ ...projectForm, challenges: arr }))}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="API rate limiting, Complex state management, Performance optimization"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Learnings (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.learnings?.join(', ') || ''}
                    onChange={(e) => handleArrayInput(e.target.value, (arr) => setProjectForm({ ...projectForm, learnings: arr }))}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="Advanced React patterns, API design, User experience principles"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={projectForm.isNew || false}
                      onChange={(e) => setProjectForm({ ...projectForm, isNew: e.target.checked })}
                      className="w-4 h-4 bg-dark-secondary border border-gray-600 rounded focus:ring-purple focus:ring-2"
                    />
                    Mark as New Project
                  </label>
                </div>
              </div>

              <button
                onClick={handleAddProject}
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple-light disabled:bg-purple/50 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Adding Project...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Add Project to Portfolio
                  </>
                )}
              </button>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Add New Achievement</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    value={achievementForm.title}
                    onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="1st Place Winner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={achievementForm.subtitle}
                    onChange={(e) => setAchievementForm({ ...achievementForm, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="TechCrunch Hackathon 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={achievementForm.date}
                    onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="March 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={achievementForm.category}
                    onChange={(e) => setAchievementForm({ ...achievementForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white focus:border-purple focus:outline-none"
                  >
                    {achievementCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={achievementForm.description}
                    onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="Brief description of the achievement..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event *
                  </label>
                  <input
                    type="text"
                    value={achievementForm.details.event}
                    onChange={(e) => setAchievementForm({ 
                      ...achievementForm, 
                      details: { ...achievementForm.details, event: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="TechCrunch Disrupt Hackathon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Achievement Details
                  </label>
                  <input
                    type="text"
                    value={achievementForm.details.achievement}
                    onChange={(e) => setAchievementForm({ 
                      ...achievementForm, 
                      details: { ...achievementForm.details, achievement: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="First place out of 200+ teams"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team (optional)
                  </label>
                  <input
                    type="text"
                    value={achievementForm.details.team}
                    onChange={(e) => setAchievementForm({ 
                      ...achievementForm, 
                      details: { ...achievementForm.details, team: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="Team Alpha (3 members)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={achievementForm.details.technologies.join(', ')}
                    onChange={(e) => handleArrayInput(e.target.value, (arr) => 
                      setAchievementForm({ 
                        ...achievementForm, 
                        details: { ...achievementForm.details, technologies: arr }
                      })
                    )}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="React, Node.js, AI/ML"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Impact
                  </label>
                  <textarea
                    value={achievementForm.details.impact}
                    onChange={(e) => setAchievementForm({ 
                      ...achievementForm, 
                      details: { ...achievementForm.details, impact: e.target.value }
                    })}
                    rows={3}
                    className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                    placeholder="Description of the impact this achievement had..."
                  />
                </div>
              </div>

              <button
                onClick={handleAddAchievement}
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple-light disabled:bg-purple/50 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Adding Achievement...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Add Achievement to Portfolio
                  </>
                )}
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">GitHub Integration Settings</h3>
              
              <div className="bg-purple/10 border border-purple/20 rounded-lg p-6">
                <h4 className="text-lg font-medium text-white mb-3">Setup GitHub Personal Access Token</h4>
                <p className="text-gray-300 mb-4 text-sm">
                  To automatically commit changes to your portfolio, you need a GitHub Personal Access Token with repository access.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub Personal Access Token
                    </label>
                    <input
                      type="password"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple focus:outline-none"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  
                  <button
                    onClick={handleSaveToken}
                    disabled={isLoading}
                    className="bg-purple hover:bg-purple-light disabled:bg-purple/50 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Github size={18} />
                        Save & Verify Token
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                <h4 className="text-lg font-medium text-yellow-400 mb-3">How to get GitHub Token:</h4>
                <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                  <li>Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
                  <li>Click "Generate new token (classic)"</li>
                  <li>Give it a name: "Portfolio Admin"</li>
                  <li>Select scopes: <code className="bg-gray-700 px-1 rounded">repo</code> (Full control of private repositories)</li>
                  <li>Click "Generate token" and copy the token</li>
                  <li>Paste it above and save</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;