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
    title: "Dynamic Programming: From Beginner to Expert",
    excerpt: "A comprehensive guide to mastering dynamic programming with practical examples and problem-solving strategies. Learn the fundamentals and advanced techniques.",
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["Dynamic Programming", "Algorithms", "Tutorial"],
    slug: "dynamic-programming-guide",
    category: "Tutorial",
    featured: true,
    published: true,
    detailsFile: "dynamic-programming-guide",
    author: "Istahak Islam"
  },
  {
    id: 2,
    title: "Graph Theory in Competitive Programming",
    excerpt: "Essential graph algorithms every competitive programmer should know, with implementation details and common patterns used in contests.",
    date: "2024-03-10",
    readTime: "12 min read",
    tags: ["Graph Theory", "Algorithms", "CP"],
    slug: "graph-theory-cp",
    category: "Tutorial",
    featured: true,
    published: true,
    detailsFile: "graph-theory-cp",
    author: "Istahak Islam"
  },
  {
    id: 3,
    title: "Optimizing Your Contest Strategy",
    excerpt: "Tips and techniques for improving your performance in competitive programming contests and effective time management during competitions.",
    date: "2024-03-05",
    readTime: "6 min read",
    tags: ["Strategy", "Contest Tips", "Competitive Programming"],
    slug: "contest-strategy",
    category: "Strategy",
    featured: true,
    published: true,
    detailsFile: "contest-strategy",
    author: "Istahak Islam"
  },
  {
    id: 4,
    title: "Binary Search: Beyond the Basics",
    excerpt: "Advanced binary search techniques and applications in competitive programming, including binary search on answers and complex predicates.",
    date: "2024-02-28",
    readTime: "10 min read",
    tags: ["Binary Search", "Algorithms", "Advanced"],
    slug: "binary-search-advanced",
    category: "Tutorial",
    featured: false,
    published: true,
    detailsFile: "binary-search-advanced",
    author: "Istahak Islam"
  },
  {
    id: 5,
    title: "My Journey to Expert on Codeforces",
    excerpt: "Personal story of reaching Expert level on Codeforces, sharing the challenges, learnings, and strategies that helped me improve.",
    date: "2024-02-10",
    readTime: "7 min read",
    tags: ["Personal", "Journey", "Motivation"],
    slug: "codeforces-expert-journey",
    category: "Personal",
    featured: false,
    published: true,
    detailsFile: "codeforces-expert-journey",
    author: "Istahak Islam"
  }
];
