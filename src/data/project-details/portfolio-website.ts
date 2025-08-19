export interface ProjectDetail {
  slug: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  screenshots?: string[];
  demo?: string;
  github: string;
  live?: string;
  lessons: string[];
  futureEnhancements: string[];
}

export const portfolioWebsiteDetails: ProjectDetail = {
  slug: "portfolio-website",
  title: "Personal Portfolio Website",
  overview: `This modern, responsive portfolio website serves as a comprehensive showcase of my competitive programming journey, technical skills, and software development projects. Built with Next.js 15 and modern web technologies, it demonstrates my expertise in full-stack development while providing an excellent user experience across all devices.

The website features a clean, professional design with dark/light mode support, SEO optimization, and a blog system for sharing competitive programming insights and technical articles.`,

  challenge: `The main challenge was creating a portfolio that would stand out to potential employers and effectively communicate my technical abilities, competitive programming background, and passion for software development. 

Key challenges included:
- Designing a unique, professional interface that reflects my personality
- Implementing proper SEO for better visibility
- Creating a responsive design that works across all devices
- Integrating a blog system for technical content
- Optimizing performance while maintaining rich functionality
- Ensuring accessibility and modern web standards compliance`,

  solution: `I developed a comprehensive solution using Next.js 15 with the App Router, leveraging modern React patterns and TypeScript for type safety. The architecture includes:

**Frontend Architecture:**
- Component-based design with reusable UI elements
- Responsive layout using Tailwind CSS
- Dark/light mode implementation with system preference detection
- Smooth animations and transitions for better UX

**Content Management:**
- Static content management through TypeScript data files
- Dynamic routing for blog posts and project details
- SEO optimization with meta tags and structured data
- Image optimization using Next.js Image component

**Performance Optimization:**
- Static site generation (SSG) for fast loading
- Code splitting and lazy loading
- Optimized bundle size with tree shaking
- Efficient caching strategies`,

  features: [
    "🎨 Modern, responsive design with dark/light mode",
    "📱 Mobile-first approach with cross-device compatibility",
    "🚀 Fast loading with Next.js App Router and SSG",
    "📝 Integrated blog system for technical articles",
    "🎯 SEO optimized with meta tags and structured data",
    "💼 Comprehensive project showcase with detailed pages",
    "🏆 Competitive programming achievements and stats",
    "📧 Contact form with email integration",
    "🔍 Search functionality for blog posts",
    "♿ Accessibility compliant (WCAG guidelines)",
    "🎭 Smooth animations and micro-interactions",
    "🔧 Easy content management through TypeScript files"
  ],

  techStack: [
    {
      category: "Frontend Framework",
      technologies: ["Next.js 15", "React 18", "TypeScript"]
    },
    {
      category: "Styling & UI",
      technologies: ["Tailwind CSS", "CSS Modules", "Responsive Design"]
    },
    {
      category: "Development Tools",
      technologies: ["ESLint", "Prettier", "Git", "VS Code"]
    },
    {
      category: "Performance",
      technologies: ["Static Site Generation", "Image Optimization", "Code Splitting"]
    },
    {
      category: "SEO & Analytics",
      technologies: ["Meta Tags", "Structured Data", "Sitemap Generation"]
    },
    {
      category: "Deployment",
      technologies: ["GitHub Pages", "Vercel", "CI/CD Pipeline"]
    }
  ],

  screenshots: [
    "/images/projects/portfolio/hero-section.png",
    "/images/projects/portfolio/about-page.png",
    "/images/projects/portfolio/projects-showcase.png",
    "/images/projects/portfolio/blog-section.png",
    "/images/projects/portfolio/dark-mode.png"
  ],

  demo: "https://istahak.github.io/portfolio",
  github: "https://github.com/Istahak/portfolio",
  live: "https://istahak.github.io/portfolio",

  lessons: [
    "📚 Mastered Next.js 15 App Router and modern React patterns",
    "🎨 Learned advanced Tailwind CSS techniques for responsive design",
    "⚡ Gained expertise in performance optimization and SEO best practices",
    "🔧 Improved TypeScript skills for better code quality and maintainability",
    "📱 Enhanced understanding of mobile-first responsive design principles",
    "🚀 Learned deployment strategies and CI/CD pipeline setup",
    "♿ Gained knowledge about web accessibility standards and implementation",
    "🎯 Improved user experience design and interface development skills"
  ],

  futureEnhancements: [
    "🌐 Multi-language support (Bengali and English)",
    "🔍 Advanced search functionality with filters",
    "💬 Comment system for blog posts",
    "📊 Analytics dashboard for blog engagement",
    "🎥 Video tutorials and project demos",
    "📱 Progressive Web App (PWA) features",
    "🤖 AI-powered content recommendations",
    "📈 Performance monitoring and optimization tools",
    "🔔 Newsletter subscription and notification system",
    "🎮 Interactive coding challenges and demos"
  ]
};
