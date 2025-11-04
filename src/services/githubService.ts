// GitHub API Service for committing changes to repository

export interface ProjectData {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  github?: string;
  live?: string;
  logo?: string;
  images?: string[];
}

export interface AchievementData {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  category: string;
  details: {
    event: string;
    achievement: string;
    team?: string;
    technologies: string[];
    impact: string;
  };
}

class GitHubService {
  private owner = 'Darshil-N';
  private repo = 'darshil-nathwani-portfolio';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('github_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('github_token');
    }
    return this.token;
  }

  private async apiCall(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub token not set');
    }

    const response = await fetch(`https://api.github.com${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`GitHub API error: ${error.message}`);
    }

    return response.json();
  }

  async getFileContent(path: string): Promise<{ content: string; sha: string }> {
    const data = await this.apiCall(`/repos/${this.owner}/${this.repo}/contents/${path}`);
    return {
      content: atob(data.content.replace(/\n/g, '')),
      sha: data.sha,
    };
  }

  async updateFile(path: string, content: string, message: string, sha: string) {
    return this.apiCall(`/repos/${this.owner}/${this.repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: btoa(content),
        sha,
      }),
    });
  }

  async addProject(projectData: ProjectData): Promise<void> {
    try {
      // Get current Projects.tsx content
      const { content, sha } = await this.getFileContent('src/components/Projects.tsx');
      
      // Generate new project object
      const newProject = this.generateProjectCode(projectData);
      
      // Find the projects array and add new project
      const updatedContent = this.insertProjectIntoCode(content, newProject);
      
      // Commit the changes
      await this.updateFile(
        'src/components/Projects.tsx',
        updatedContent,
        `Add new project: ${projectData.title}`,
        sha
      );
      
      console.log('✅ Project added successfully to GitHub!');
    } catch (error) {
      console.error('❌ Error adding project:', error);
      throw error;
    }
  }

  async addAchievement(achievementData: AchievementData): Promise<void> {
    try {
      // Get current Achievements.tsx content
      const { content, sha } = await this.getFileContent('src/components/Achievements.tsx');
      
      // Generate new achievement object
      const newAchievement = this.generateAchievementCode(achievementData);
      
      // Find the achievements array and add new achievement
      const updatedContent = this.insertAchievementIntoCode(content, newAchievement);
      
      // Commit the changes
      await this.updateFile(
        'src/components/Achievements.tsx',
        updatedContent,
        `Add new achievement: ${achievementData.title}`,
        sha
      );
      
      console.log('✅ Achievement added successfully to GitHub!');
    } catch (error) {
      console.error('❌ Error adding achievement:', error);
      throw error;
    }
  }

  private generateProjectCode(project: ProjectData): string {
    return `    {
      title: "${project.title}",
      description: "${project.description}",
      longDescription: "${project.longDescription}",
      technologies: [${project.technologies.map(tech => `"${tech}"`).join(', ')}],
      category: "${project.category}",${project.github ? `\n      github: "${project.github}",` : ''}${project.live ? `\n      live: "${project.live}",` : ''}${project.logo ? `\n      logo: "${project.logo}",` : ''}${project.images ? `\n      images: [${project.images.map(img => `"${img}"`).join(', ')}],` : ''}
    }`;
  }

  private generateAchievementCode(achievement: AchievementData): string {
    return `    {
      title: "${achievement.title}",
      subtitle: "${achievement.subtitle}",
      description: "${achievement.description}",
      date: "${achievement.date}",
      category: "${achievement.category}",
      details: {
        event: "${achievement.details.event}",
        achievement: "${achievement.details.achievement}",${achievement.details.team ? `\n        team: "${achievement.details.team}",` : ''}
        technologies: [${achievement.details.technologies.map(tech => `"${tech}"`).join(', ')}],
        impact: "${achievement.details.impact}"
      }
    }`;
  }

  private insertProjectIntoCode(content: string, newProject: string): string {
    // Find the projects array
    const projectsArrayRegex = /const projects = \[([\s\S]*?)\];/;
    const match = content.match(projectsArrayRegex);
    
    if (!match) {
      throw new Error('Could not find projects array in Projects.tsx');
    }
    
    // Insert new project at the beginning of the array
    const existingProjects = match[1].trim();
    const updatedProjects = existingProjects 
      ? `\n${newProject},${existingProjects.startsWith('\n') ? '' : '\n'}${existingProjects}\n  `
      : `\n${newProject}\n  `;
    
    return content.replace(
      projectsArrayRegex,
      `const projects = [${updatedProjects}];`
    );
  }

  private insertAchievementIntoCode(content: string, newAchievement: string): string {
    // Find the achievements array
    const achievementsArrayRegex = /const achievements = \[([\s\S]*?)\];/;
    const match = content.match(achievementsArrayRegex);
    
    if (!match) {
      throw new Error('Could not find achievements array in Achievements.tsx');
    }
    
    // Insert new achievement at the beginning of the array
    const existingAchievements = match[1].trim();
    const updatedAchievements = existingAchievements 
      ? `\n${newAchievement},${existingAchievements.startsWith('\n') ? '' : '\n'}${existingAchievements}\n  `
      : `\n${newAchievement}\n  `;
    
    return content.replace(
      achievementsArrayRegex,
      `const achievements = [${updatedAchievements}];`
    );
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.apiCall(`/repos/${this.owner}/${this.repo}`);
      return true;
    } catch (error) {
      console.error('GitHub connection test failed:', error);
      return false;
    }
  }
}

export const githubService = new GitHubService();