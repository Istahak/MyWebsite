export interface Project {
  id: number;
  slug: string; // Added for URL routing
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github: string;
  live?: string;
  category: string;
  featured: boolean;
  status: "Completed" | "In Progress" | "Planning";
  image?: string;
  detailsFile?: string; // Path to detailed content file
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "kodeshell",
    title: "KodeShell - CP Companion",
    description: "A comprehensive Android mobile application that unifies contest management, progress tracking, and community engagement across multiple competitive programming platforms including Codeforces, LeetCode, and AtCoder.",
    longDescription: "KodeShell provides a unified dashboard for competitive programmers to track contests, submissions, and connect with the community. Features include multi-platform profile integration, real-time messaging, contest reminders, and social networking specifically designed for the CP community.",
    tech: ["Android", "Java", "Firebase", "Kotlin", "REST API", "Volley", "Room Database"],
    github: "https://github.com/mahmudulyeamim/KodeShell",
    category: "Mobile Development",
    featured: true,
    status: "Completed",
    detailsFile: "kodeshell"
  },
  {
    id: 2,
    slug: "agriconnect",
    title: "AgriConnect - Smart Farming Platform",
    description: "A comprehensive full-stack web application designed to empower farmers with modern technology, providing agricultural information, AI-powered assistance using Google Gemini, weather forecasting, and farm management tools.",
    longDescription: "AgriConnect combines social media features with agricultural information systems, AI-powered crop advice, expert chat, weather forecasting, and task management. It creates a comprehensive digital ecosystem for farmers with crop database, community support, and intelligent farming recommendations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Google Gemini AI", "JWT", "Socket.io"],
    github: "https://github.com/Istahak/agroproject",
    category: "Web Development",
    featured: true,
    status: "Completed",
    detailsFile: "agriconnect"
  },
  {
    id: 3,
    slug: "seedhope",
    title: "SeedHope - Crowdfunding Platform",
    description: "A full-stack mobile and web application for creating, managing, and contributing to fundraising campaigns. Built with Spring Boot backend and React Native frontend with integrated payment gateways (SSLCommerz & Stripe).",
    longDescription: "SeedHope connects people who need financial support with those willing to help. Features include secure authentication (JWT & OAuth2), campaign management with multiple categories, real-time donation tracking, comment system with nested replies, and integrated payment processing for both local and international transactions.",
    tech: ["Spring Boot", "React Native", "JWT", "OAuth2", "SSLCommerz", "Stripe", "MySQL", "REST API"],
    github: "https://github.com/tikly31/SeedHope",
    category: "Mobile & Web Development",
    featured: true,
    status: "Completed",
    detailsFile: "seedhope"
  }
];
