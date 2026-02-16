export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // Keep for backward compatibility, but will use detailsFile
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  category: string;
  featured: boolean;
  published: boolean;
  detailsFile?: string; // Path to detailed content file
  author?: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Think About Dynamic Programming on Trees",
    excerpt: "A comprehensive guide to the thinking process for Tree DP in competitive programming: how to decide if a problem needs Tree DP, how to invent states and transitions, when rerooting is needed, and how to debug it effectively.",
    date: "2026-01-15",
    readTime: "25 min read",
    tags: ["Dynamic Programming", "Tree DP", "Algorithms", "Advanced", "Competitive Programming"],
    slug: "dp-on-trees",
    category: "Tutorial",
    featured: true,
    published: true,
    detailsFile: "dp-on-trees",
    author: "Istahak Islam"
  },
  {
    id: 2,
    title: "Suffix Array (SA) — Contest Black-Box Notes",
    excerpt: "Complete black-box guide to Suffix Arrays for competitive programming. Includes implementation, LCP array, pattern matching, distinct substrings, and common contest applications with ready-to-use code templates.",
    date: "2026-01-20",
    readTime: "30 min read",
    tags: ["Suffix Array", "String Algorithms", "Data Structures", "Advanced", "CP"],
    slug: "suffix-array-notes",
    category: "Tutorial",
    featured: true,
    published: true,
    detailsFile: "suffix-array-notes",
    author: "Istahak Islam"
  },
  {
    id: 3,
    title: "Suffix Automaton (SAM) — Competitive Programming Note",
    excerpt: "Master Suffix Automaton: a compressed DFA of all substrings. Learn how to count distinct substrings, find occurrences, longest repeated substrings, and solve complex substring problems efficiently with practical recipes and examples.",
    date: "2026-01-25",
    readTime: "20 min read",
    tags: ["Suffix Automaton", "String Algorithms", "Automata", "Advanced", "Competitive Programming"],
    slug: "suffix-automaton",
    category: "Tutorial",
    featured: true,
    published: true,
    detailsFile: "suffix-automaton",
    author: "Istahak Islam"
  }
];
