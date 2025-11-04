# Darshil Nathwani Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases projects, skills, education, and provides contact information for Darshil Nathwani, an Engineering Student specializing in AI and Machine Learning.

## 🌟 Features

- **Interactive 3D Hero Section** - Powered by Spline 3D graphics
- **Responsive Design** - Optimized for all device sizes
- **Smooth Animations** - Page transitions with Framer Motion
- **Project Filtering** - Categorized project showcase (Computer Vision, DSA, ML, Data Interpretation, Other)
- **Contact Form** - Interactive contact form with validation
- **Resume Download** - Direct resume download functionality
- **Dark Theme** - Modern dark theme with purple accents
- **Navigation** - Smooth scroll navigation between sections

## 🎨 Design Features

- Modern gradient borders and glass-morphism effects
- Custom animations with staggered delays
- Interactive cards with hover effects
- Typewriter animation for dynamic text
- Mobile-responsive navigation with hamburger menu
- Smooth scroll animations triggered on viewport intersection

## 🚀 Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Icons** - Popular icon library

### Animations & Interactions
- **Framer Motion** - Smooth animations and page transitions
- **Spline** - 3D graphics and interactive elements

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **Smooth scrolling** - Custom scroll behavior

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ui/              # shadcn/ui components
│   ├── About.tsx        # About section with interactive cards
│   ├── Contact.tsx      # Contact form and social links
│   ├── Education.tsx    # Education information
│   ├── ExploringSection.tsx # Currently exploring technologies
│   ├── Footer.tsx       # Website footer
│   ├── Hero.tsx         # Hero section with 3D graphics
│   ├── Navbar.tsx       # Navigation bar
│   ├── Projects.tsx     # Project showcase with filtering
│   ├── Skills.tsx       # Technical skills display
│   └── SoftSkills.tsx   # Soft skills showcase
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   ├── NotFound.tsx     # 404 page
│   └── ProjectsPage.tsx # Dedicated projects page
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection hook
│   ├── use-toast.ts     # Toast notifications
│   └── useScrollAnimation.ts # Scroll animations
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🏗️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Bun (recommended) or npm/yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Darshil-N/darshil-nathwani-portfolio.git
   cd darshil-nathwani-portfolio
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Start development server**
   ```bash
   # Using Bun
   bun dev
   
   # Or using npm
   npm run dev
   
   # Or using yarn
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal)

## 🔧 Available Scripts

- `bun dev` / `npm run dev` - Start development server
- `bun run build` / `npm run build` - Build for production
- `bun run build:dev` / `npm run build:dev` - Build in development mode
- `bun run lint` / `npm run lint` - Run ESLint
- `bun run preview` / `npm run preview` - Preview production build

## 🎯 Key Sections

### Hero Section
- 3D interactive sphere using Spline
- Animated typography with name and tagline
- Call-to-action buttons for projects and contact
- Smooth scroll down indicator

### About Section
- Interactive cards showcasing focus areas (Computer Vision, DSA, Cloud Computing)
- Typewriter animation for descriptions
- Links to related projects

### Projects Section
- Filterable project showcase by category:
  - **Computer Vision**: AI-powered image recognition and detection projects
  - **DSA**: Data Structures and Algorithms implementations in C++
  - **Machine Learning**: ML models and AI applications
  - **Data Interpretation**: Data analysis and visualization projects
  - **Other**: Web development and miscellaneous projects
- GitHub links for open-source projects
- Technology stack badges
- "NEW" and "IN DEVELOPMENT" indicators

#### Featured Projects
- **Siddhi AI Platform** - Enterprise-grade augmented intelligence platform for concessional lending risk management with XGBoost ML models **NEW**
- **AI Resource Suggestion Chatbot** - Built with Gemini API and Flask
- **Automatic Trash Sorter** - Computer vision project using OpenCV and TensorFlow
- **Live Trash Detector** - Real-time detection system with Arduino integration
- **Stock Trading Simulator** - C++ implementation with real-time fluctuations
- **IPL Auction System** - Simulates IPL auction with budget tracking
- **GST Report Generator** - Automates GST calculations and report generation
- **Portfolio Website** - This website built with modern web technologies

### Skills Section
- **Programming Languages**: C++, C, Python
- **Tools & Frameworks**: TensorFlow, OpenCV, Flask, Git, VS Code, Jupyter Notebook, YOLO, Pandas, Numpy
- **Concepts**: AI, ML, Computer Vision, DSA, Cloud Computing, API Development, Version Control

### Soft Skills
- Problem Solving
- Team Collaboration  
- Adaptability
- Continuous Learning

### Education
- **B.E. in Information Science and Engineering**
- Dayananda Sagar College of Engineering, Bengaluru
- 2024 - Present

### Contact Section
- Interactive contact form with validation
- Direct links to GitHub and LinkedIn profiles
- Email contact option

## 🎨 Customization

### Colors & Theme
The design uses a custom purple theme defined in `tailwind.config.ts`:
- Primary purple: `#8B5CF6`
- Light purple: `#A78BFA`
- Dark background: `#0A0A0A`
- Secondary dark: `#1A1A1A`

### Adding New Projects
To add a new project, edit the `projects` array in `src/components/Projects.tsx`:

```typescript
{
  title: "Project Name",
  description: "Project description",
  techStack: ["Technology1", "Technology2"],
  github: "https://github.com/username/repo", // Optional
  category: 'cv' | 'dsa' | 'ml' | 'data' | 'oth',
  isNew: true, // Optional
  inDevelopment: false // Optional
}
```

### Modifying Animations
Animation delays and durations can be adjusted in component files. Look for `animationDelay` styles and Framer Motion configurations.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Key responsive features:
- Collapsible navigation menu on mobile
- Stacked layouts on smaller screens
- Optimized typography scaling
- Touch-friendly interactive elements

## 🔗 External Integrations

- **Spline 3D Graphics**: Interactive 3D sphere in hero section
- **GitHub**: Links to project repositories
- **LinkedIn**: Professional profile integration
- **Resume Download**: Direct PDF download functionality

## 🚀 Deployment

### Build for Production
```bash
bun run build
```

The build outputs to the `dist/` directory. Deploy this directory to any static hosting service:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Surge**
- **AWS S3**

### Environment Variables
No environment variables required for basic functionality. The contact form currently uses client-side simulation - integrate with a backend service for full functionality.

## 🛠️ Development

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** formatting (recommended)
- **Component-based architecture**

### Performance Optimizations
- Lazy loading for 3D components
- Code splitting with React.lazy
- Optimized images and assets
- Minimal bundle size with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

This portfolio was built by **Darshil Nathwani**, an Engineering Student passionate about:
- 🤖 Artificial Intelligence & Machine Learning
- 👁️ Computer Vision & Image Processing
- 💻 Modern C++ Development
- 🧩 Problem Solving with Code
- ☁️ Cloud Computing & Deployment

**Current Status**: B.E. in Information Science and Engineering at Dayananda Sagar College of Engineering, Bengaluru (2024 - Present)

### Technical Interests
- Deep Learning and Neural Networks
- Computer Vision Applications
- Algorithm Design and Optimization
- Software Architecture and Design Patterns

## 📞 Get in Touch

- **GitHub**: [Anonymous-7777](https://github.com/Anonymous-7777)
- **LinkedIn**: [Darshil Nathwani](https://www.linkedin.com/in/darshil-nathwani-bba698307)
- **Email**: Available through the contact form on the website

## 🎯 Future Enhancements

- [ ] Backend integration for contact form
- [ ] Blog section for technical articles
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced project filtering and search
- [ ] Performance analytics dashboard

## 🌟 Highlights

- **Modern Tech Stack**: Built with the latest React 18, TypeScript, and Vite
- **Performance Optimized**: Fast loading times with code splitting and lazy loading
- **Accessible Design**: ARIA compliant with keyboard navigation support
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Mobile First**: Designed with mobile users in mind
- **Interactive Elements**: Engaging 3D graphics and smooth animations

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ using React, TypeScript, and Tailwind CSS*