// src/config/portfolio.ts — All portfolio content data
// Edit this file to update your portfolio content

export const personalInfo = {
  name: "Rudra Pahune",
  firstName: "Rudra",
  roles: [
    "Backend Developer",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Problem Solver",
  ] as const,
  headline: "Building Intelligent Systems & Scalable Backends",
  shortBio:
    "B.Tech student in AI & Data Science, passionate about backend architecture, artificial intelligence, and building products that solve real problems.",
  fullBio: `I'm Rudra Pahune, a B.Tech student in Artificial Intelligence and Data Science at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur. I'm passionate about backend development, AI/ML, and building full-stack applications that are both technically sound and user-friendly.

I believe in writing clean, maintainable code and building systems that scale. My approach to development is driven by curiosity — I love exploring new technologies and understanding how things work under the hood.

Currently, I'm diving deep into AI agents, generative AI, and advanced backend architectures while strengthening my fundamentals in data structures and algorithms.`,
  education: {
    degree: "B.Tech in Artificial Intelligence and Data Science",
    institution: "Yeshwantrao Chavan College of Engineering (YCCE)",
    location: "Nagpur, India",
    expectedGraduation: "2029",
  },
  currentlyExploring: [
    {
      title: "AI Agents",
      description: "Building autonomous AI systems that can reason and act",
      icon: "Bot" as const,
    },
    {
      title: "Generative AI",
      description: "Exploring LLMs, prompt engineering, and AI applications",
      icon: "Sparkles" as const,
    },
    {
      title: "Backend Architecture",
      description: "Designing scalable and resilient server systems",
      icon: "Server" as const,
    },
    {
      title: "Machine Learning",
      description: "Understanding algorithms that learn from data",
      icon: "Brain" as const,
    },
    {
      title: "Advanced DSA",
      description: "Mastering data structures and algorithmic problem solving",
      icon: "Code2" as const,
    },
  ],
};

export const skills = {
  categories: [
    {
      name: "Programming Languages",
      icon: "Terminal" as const,
      items: [
        { name: "Java", icon: "java" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Python", icon: "python" },
        { name: "C", icon: "c" },
      ],
    },
    {
      name: "Frontend Development",
      icon: "Layout" as const,
      items: [
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "tailwind" },
      ],
    },
    {
      name: "Backend Development",
      icon: "Server" as const,
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "REST APIs", icon: "api" },
      ],
    },
    {
      name: "Databases",
      icon: "Database" as const,
      items: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Supabase", icon: "supabase" },
        { name: "Prisma ORM", icon: "prisma" },
      ],
    },
    {
      name: "Tools & Platforms",
      icon: "Wrench" as const,
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "VS Code", icon: "vscode" },
        { name: "Postman", icon: "postman" },
        { name: "Vercel", icon: "vercel" },
      ],
    },
    {
      name: "AI & Machine Learning",
      icon: "Brain" as const,
      items: [
        { name: "Machine Learning", icon: "ml" },
        { name: "Generative AI", icon: "genai" },
        { name: "AI Agents", icon: "agents" },
      ],
    },
  ],
};

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  status: "Completed" | "In Development" | "Planned";
  featured: boolean;
  github: string;
  live: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "intervia",
    title: "Intervia",
    category: "AI-Powered Interview Simulator",
    description:
      "An AI-powered interview simulation platform designed to help users prepare for technical interviews through realistic AI-driven experiences.",
    longDescription: `Intervia is a full-stack platform that simulates technical interviews using AI. It features an interactive interview room with a coding environment inspired by LeetCode, real-time AI-powered question generation, and comprehensive interview management.`,
    features: [
      "AI-powered interview questions",
      "Interview simulation environment",
      "User authentication with email verification (6-digit OTP)",
      "Interview management dashboard",
      "Interactive interview room",
      "LeetCode-inspired coding environment",
      "Multiple interview question types",
      "Voice-based interaction (in progress)",
    ],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Framer Motion",
    ],
    status: "In Development",
    featured: true,
    github: "", // Add GitHub URL
    live: "", // Add live URL
    image: "/projects/intervia.png",
  },
  {
    id: "project-2",
    title: "Coming Soon",
    category: "Project Category",
    description: "More projects coming soon. Stay tuned!",
    longDescription: "",
    features: [],
    tech: [],
    status: "Planned",
    featured: false,
    github: "",
    live: "",
    image: "",
  },
  {
    id: "project-3",
    title: "Coming Soon",
    category: "Project Category",
    description: "More projects coming soon. Stay tuned!",
    longDescription: "",
    features: [],
    tech: [],
    status: "Planned",
    featured: false,
    github: "",
    live: "",
    image: "",
  },
];

export const timeline = [
  {
    year: "2025",
    title: "Started B.Tech in AI & Data Science",
    description:
      "Began my journey at YCCE, Nagpur, diving into the fundamentals of computer science, AI, and data science.",
    type: "education" as const,
  },
  {
    year: "2025",
    title: "First Full-Stack Project",
    description:
      "Built my first complete web application, learning React, Node.js, and database management.",
    type: "project" as const,
  },
  {
    year: "2025-26",
    title: "Deep Dive into Backend Development",
    description:
      "Focused on mastering Node.js, Express.js, REST APIs, and database architecture with PostgreSQL and Prisma.",
    type: "learning" as const,
  },
  {
    year: "2026",
    title: "Building Intervia",
    description:
      "Started developing an AI-powered interview simulation platform, combining full-stack skills with AI integration.",
    type: "project" as const,
  },
  {
    year: "2026",
    title: "Exploring AI & Machine Learning",
    description:
      "Diving into AI agents, generative AI, and machine learning while building practical applications.",
    type: "learning" as const,
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
