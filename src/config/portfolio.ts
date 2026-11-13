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
  fullBio: `I'm Rudra Pahune, an engineering student pursuing my B.Tech in Artificial Intelligence and Data Science at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur. I am deeply interested in backend architecture, AI/ML, and building full-stack applications that are technically robust, reliable, and well-designed.

I believe in writing clean, maintainable code and understanding systems from the ground up. Rather than treating libraries as black boxes, I enjoy deconstructing event loops, relational databases, network protocols, and the mechanics of modern AI integration.

Currently, I'm focusing my engineering efforts on autonomous AI agents, generative AI workflows, resilient backend design with Node.js and PostgreSQL, and rigorous data structures and algorithms.`,
  education: {
    degree: "B.Tech in Artificial Intelligence and Data Science",
    institution: "Yeshwantrao Chavan College of Engineering (YCCE)",
    location: "Nagpur, India",
    expectedGraduation: "2029",
  },
};

export interface ExploringItem {
  title: string;
  category: string;
  status: "Building" | "Exploring" | "Learning" | "Improving";
  description: string;
  tech: string[];
  icon: "Server" | "Bot" | "Sparkles" | "Brain" | "Code2" | "Layers";
}

export const buildingAndExploring: ExploringItem[] = [
  {
    title: "Backend Engineering",
    category: "Architecture & Systems",
    status: "Building",
    description: "Designing modular, resilient RESTful micro-architectures with strict transaction boundaries and predictable error handling.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM"],
    icon: "Server",
  },
  {
    title: "AI Agents",
    category: "Autonomous Intelligence",
    status: "Exploring",
    description: "Investigating agentic workflows that decompose complex user intents into verifiable multi-step execution plans.",
    tech: ["Autonomous Loops", "Tool Calling", "Memory Chains"],
    icon: "Bot",
  },
  {
    title: "Generative AI",
    category: "Applied AI",
    status: "Building",
    description: "Integrating LLMs into production web applications with structured JSON outputs, streaming responses, and prompt optimization.",
    tech: ["LLM Orchestration", "Prompt Engineering", "Streaming"],
    icon: "Sparkles",
  },
  {
    title: "Machine Learning",
    category: "Core Intelligence",
    status: "Learning",
    description: "Studying statistical modeling, feature engineering, and predictive algorithms that derive actionable patterns from complex data.",
    tech: ["Python", "Supervised Learning", "Data Analysis"],
    icon: "Brain",
  },
  {
    title: "Advanced DSA",
    category: "Computer Science",
    status: "Improving",
    description: "Strengthening algorithmic foundations across graph traversals, dynamic programming, and asymptotic complexity optimization.",
    tech: ["Graphs", "Trees", "Dynamic Programming", "Optimization"],
    icon: "Code2",
  },
  {
    title: "Full-Stack Development",
    category: "Engineering Craft",
    status: "Building",
    description: "Crafting end-to-end applications where modern typed frontends communicate seamlessly with secured backend data services.",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    icon: "Layers",
  },
];

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
    github: "https://github.com/rudrapahune-dev",
    live: "",
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
      "Began my engineering journey at YCCE, Nagpur, establishing foundational skills in computer science, discrete math, and algorithms.",
    type: "education" as const,
  },
  {
    year: "2025",
    title: "First Full-Stack Application",
    description:
      "Built initial end-to-end web applications, learning component lifecycles, REST communication, and state management.",
    type: "project" as const,
  },
  {
    year: "2025-26",
    title: "Deep Dive into Backend Architecture & Databases",
    description:
      "Focused on mastering Node.js, Express.js, REST API design, relational modeling, and database persistence with PostgreSQL and Prisma ORM.",
    type: "learning" as const,
  },
  {
    year: "2026",
    title: "Full-Stack AI Integration & Scalable Backends",
    description:
      "Architecting multi-tier full-stack applications with robust REST APIs, OTP authentication flows, and real-time generative AI evaluation loops.",
    type: "project" as const,
  },
  {
    year: "2026",
    title: "Exploring AI Agents & Machine Learning",
    description:
      "Deepening exploration of autonomous AI agents, LLM orchestration, machine learning techniques, and advanced data structures.",
    type: "learning" as const,
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Focus", href: "#now-building" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
