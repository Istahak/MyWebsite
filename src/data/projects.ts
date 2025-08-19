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
    slug: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js showcasing my competitive programming journey and projects.",
    longDescription: "This portfolio website features a clean design with dark/light mode, responsive layout, blog functionality for competitive programming articles, and optimized SEO. Built using modern web technologies with a focus on performance and user experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React", "SEO"],
    github: "https://github.com/Istahak/portfolio",
    live: "https://istahak.github.io/portfolio",
    category: "Web Development",
    featured: true,
    status: "Completed",
    detailsFile: "portfolio-website"
  },
  {
    id: 2,
    slug: "competitive-programming-solutions",
    title: "Competitive Programming Solutions",
    description: "A collection of my competitive programming solutions from Codeforces, CodeChef, AtCoder, and LeetCode with detailed explanations.",
    longDescription: "This repository contains well-documented solutions to competitive programming problems with complexity analysis, multiple approaches, and learning notes. Organized by platform and difficulty level to help other CP enthusiasts learn.",
    tech: ["C++", "Python", "Algorithms", "Data Structures", "Problem Solving"],
    github: "https://github.com/Istahak/competitive-programming",
    category: "Competitive Programming",
    featured: true,
    status: "In Progress",
    detailsFile: "competitive-programming-solutions"
  },
  {
    id: 3,
    slug: "course-management-system",
    title: "University Course Management System",
    description: "A web application designed for university students to manage courses, track academic progress, and plan semesters effectively.",
    longDescription: "Features include course registration, grade tracking, GPA calculation, semester planning, and academic requirement monitoring. Built with a focus on University of Dhaka's academic structure.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Material-UI"],
    github: "https://github.com/Istahak/course-management",
    category: "Web Development",
    featured: true,
    status: "In Progress",
    detailsFile: "course-management-system"
  },
  {
    id: 4,
    slug: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    description: "An interactive tool to visualize sorting algorithms and data structures, helping students understand algorithmic concepts through animations.",
    longDescription: "Provides step-by-step visualizations for popular algorithms like Quick Sort, Merge Sort, BFS, DFS, and data structures like Binary Trees and Graphs. Features adjustable speed controls and educational explanations.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS3", "Animation", "Educational Tools"],
    github: "https://github.com/Istahak/algorithm-visualizer",
    live: "https://istahak.github.io/algorithm-visualizer",
    category: "Educational",
    featured: false,
    status: "Completed",
    detailsFile: "algorithm-visualizer"
  },
  {
    id: 5,
    slug: "cp-contest-tracker",
    title: "CP Contest Tracker",
    description: "A personal dashboard to track upcoming competitive programming contests across multiple platforms and set reminders.",
    longDescription: "Aggregates contest information from Codeforces, CodeChef, AtCoder, and other platforms. Features include contest calendar, difficulty predictions, and personal performance tracking.",
    tech: ["Python", "Flask", "API Integration", "SQLite", "Bootstrap"],
    github: "https://github.com/Istahak/cp-contest-tracker",
    category: "Competitive Programming",
    featured: false,
    status: "Planning",
    detailsFile: "cp-contest-tracker"
  },
  {
    id: 6,
    slug: "study-group-management",
    title: "Study Group Management",
    description: "A collaborative platform for university students to form study groups, share resources, and coordinate academic activities.",
    longDescription: "Enables students to create study groups, schedule meetings, share notes and resources, track group progress, and communicate effectively. Designed specifically for university academic collaboration.",
    tech: ["Vue.js", "Firebase", "Firestore", "PWA", "Vuetify"],
    github: "https://github.com/Istahak/study-group-manager",
    category: "Educational",
    featured: false,
    status: "Planning",
    detailsFile: "study-group-management"
  }
];
