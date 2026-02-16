export interface Achievement {
  id: string;
  title: string;
  date: string;
  teamName?: string;
  rank: number;
  totalTeams?: number;
  problemsSolved?: number;
  category: "Programming Contest" | "Hackathon" | "Award" | "Certification" | "Other";
  organizer: string;
  location?: string;
  description: string;
  image: string;
  officialLink?: string;
  tags: string[];
  featured: boolean;
  detailsFile?: string;
}

export const achievements: Achievement[] = [
  {
    id: "ncpc-onsite-2023",
    title: "NCPC Onsite 2023 Hosted by JU",
    date: "2023-11-15",
    teamName: "DU_____long_shot_______",
    rank: 26,
    category: "Programming Contest",
    organizer: "Jahangirnagar University",
    location: "Jahangirnagar University, Dhaka",
    description:
      "Competed in the National Collegiate Programming Contest (NCPC) 2023, one of Bangladesh's most prestigious programming competitions. Our team DU_____long_shot_______ demonstrated strong problem-solving abilities and teamwork, securing 26th position among the country's top university teams. The contest featured challenging algorithmic problems that tested our skills in data structures, dynamic programming, and competitive programming strategies.",
    image: "/image/achievements/ncpc-2023.jpg",
    officialLink: "https://bapsoj.org/contests/ncpc-onsite-2023-hosted-by-ju/standings",
    tags: ["ICPC", "NCPC", "Competitive Programming", "Team Contest"],
    featured: true,
    detailsFile: "ncpc-onsite-2023.ts",
  },
  {
    id: "icpc-dhaka-regional-2024",
    title: "ICPC Asia Dhaka Regional Contest 2024 Onsite Round",
    date: "2024-12-10",
    teamName: "DU_Oblivion",
    rank: 37,
    category: "Programming Contest",
    organizer: "Daffodil International University",
    location: "Daffodil International University, Dhaka",
    description:
      "Participated in the prestigious ICPC Asia Dhaka Regional Contest 2024, representing University of Dhaka with Team DU_Oblivion. The ICPC (International Collegiate Programming Contest) is the world's most prestigious programming competition for university students. Competing against top teams from across the region, we secured 37th position, solving complex algorithmic challenges under intense time pressure. This experience sharpened our collaborative problem-solving skills and deepened our understanding of advanced algorithms.",
    image: "/image/achievements/icpc-dhaka-2024.jpg",
    officialLink: "https://bapsoj.org/contests/icpc-asia-dhaka-regional-contest-2024-onsite-round/standings",
    tags: ["ICPC", "Regional Contest", "Competitive Programming", "International"],
    featured: true,
    detailsFile: "icpc-dhaka-regional-2024.ts",
  },
  {
    id: "kuet-iupc-2025",
    title: "MIAKI Presents KUET IUPC Onsite 2025",
    date: "2025-02-15",
    teamName: "DU_Oblivion",
    rank: 20,
    category: "Programming Contest",
    organizer: "Khulna University of Engineering & Technology",
    location: "KUET, Khulna",
    description:
      "Competed in the KUET Inter University Programming Contest (IUPC) 2025, a highly competitive event that brought together talented programmers from universities across Bangladesh. Team DU_Oblivion achieved an impressive 20th position, showcasing our consistent growth and dedication to competitive programming. The contest challenged us with diverse problem sets covering graph theory, dynamic programming, and mathematical algorithms.",
    image: "/image/achievements/kuet-iupc-2025.jpg",
    officialLink: "https://bapsoj.org/contests/miaki-presents-kuet-iupc-onsite-2025/standings",
    tags: ["IUPC", "KUET", "Competitive Programming", "University Contest"],
    featured: true,
    detailsFile: "kuet-iupc-2025.ts",
  },
  {
    id: "duet-iupc-2025",
    title: "DUET Inter University Programming Contest 2025",
    date: "2025-03-20",
    teamName: "DU_OBLIVION",
    rank: 6,
    problemsSolved: 7,
    category: "Programming Contest",
    organizer: "Dhaka University of Engineering & Technology",
    location: "DUET, Gazipur",
    description:
      "Thrilled to announce that our team DU_OBLIVION secured an outstanding 6th place in the DUET Inter University Programming Contest 2025! 🎉 This achievement represents our team's strongest performance yet, as we successfully solved 7 challenging problems throughout the intense competition. The contest tested our collaborative problem-solving abilities, algorithm optimization skills, and ability to perform under pressure. This experience reinforced the importance of teamwork, effective communication, and maintaining composure during high-stakes competitions. Incredibly proud of what we accomplished together!",
    image: "/image/achievements/duet-iupc-2025.jpg",
    officialLink: "https://bapsoj.org/contests/duet-inter-university-programming-contest-2025/standings",
    tags: ["IUPC", "DUET", "Top 10", "Competitive Programming"],
    featured: true,
    detailsFile: "duet-iupc-2025.ts",
  },
  {
    id: "uttara-iupc-2025",
    title: "Uttara University Inter University Programming Contest 2025",
    date: "2025-04-05",
    teamName: "DU_Oblivion",
    rank: 8,
    category: "Programming Contest",
    organizer: "Uttara University",
    location: "Uttara University, Dhaka",
    description:
      "Competed in the Uttara University Inter University Programming Contest 2025 as part of Team DU_Oblivion, securing 8th place overall. While we're proud of this top-10 finish, the contest taught us valuable lessons beyond the scoreboard. We encountered a critical challenge with a Suffix Array problem—a bug in our template implementation cost us valuable time and points. Though disappointing in the moment, this experience became a powerful learning opportunity. It reinforced the importance of thoroughly testing template code, maintaining backup implementations, and staying mentally resilient when things don't go as planned. Every setback is fuel for improvement, and we're using this experience to strengthen our preparation for future contests.",
    image: "/image/achievements/uttara-iupc-2025.jpg",
    officialLink: "https://bapsoj.org/contests/uttara-university-inter-university-programming-contest-2025/standings",
    tags: ["IUPC", "Uttara University", "Learning Experience", "Top 10"],
    featured: false,
    detailsFile: "uttara-iupc-2025.ts",
  },
  {
    id: "samsung-code-contest-2025",
    title: "Samsung R&D Institute Bangladesh Code Contest 2025",
    date: "2025-05-12",
    rank: 9,
    category: "Programming Contest",
    organizer: "Samsung R&D Institute Bangladesh",
    location: "Samsung R&D Institute, Dhaka",
    description:
      "Excited to share that I secured 9th place in the onsite round of the Samsung R&D Institute Bangladesh Code Contest 2025! 🎉 This prestigious competition, organized by one of the world's leading technology companies, brought together exceptional programmers from across Bangladesh. The contest featured industry-relevant problem sets that challenged participants with real-world algorithmic scenarios. Competing alongside such talented individuals was an incredible learning experience that broadened my perspective on problem-solving approaches and industry expectations. This achievement represents both the culmination of consistent practice and the beginning of new opportunities in the tech industry.",
    image: "/image/achievements/samsung-2025.jpg",
    tags: ["Samsung", "Industry Contest", "Top 10", "Corporate Challenge"],
    featured: true,
    detailsFile: "samsung-code-contest-2025.ts",
  },
  {
    id: "cuet-iupc-2025",
    title: "IUPC CUET 2025 – inCSEption",
    date: "2026-01-15",
    teamName: "DU Odyssey",
    rank: 6,
    category: "Programming Contest",
    organizer: "Chittagong University of Engineering & Technology",
    location: "CUET, Chittagong",
    description:
      "Excited to share that our team, DU Odyssey, secured 6th position at the IUPC CUET 2025 – inCSEption! 🎉💻 We solved multiple challenging problems, showcasing teamwork, consistency, and problem-solving under pressure. The contest brought together talented programmers from universities across Bangladesh, testing our skills in algorithms, data structures, and competitive programming strategies. Grateful for the learning experience and proud of the team's effort. On to the next challenge! 🚀",
    image: "/image/achievements/cuet-iupc-2025.jpg",
    officialLink: "https://toph.co/c/cuet-iupc-2025/standings",
    tags: ["IUPC", "CUET", "Top 10", "Competitive Programming"],
    featured: true,
    detailsFile: "cuet-iupc-2025.ts",
  },
];
