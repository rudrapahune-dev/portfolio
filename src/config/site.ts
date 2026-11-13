// src/config/site.ts — Central site configuration
// Update these values with your actual information

export const siteConfig = {
  name: "Rudra Pahune",
  title: "Rudra Pahune — Backend Developer & AI Engineer",
  description:
    "Personal portfolio of Rudra Pahune — Backend Developer, AI & Data Science Engineering Student, and Full-Stack Developer building intelligent systems.",
  url: "https://rudrapahune.dev", // Update with your actual domain
  ogImage: "/og.png",
  links: {
    github: "https://github.com/", // Add your GitHub username
    linkedin: "https://linkedin.com/in/", // Add your LinkedIn
    email: "mailto:", // Add your email
    twitter: "", // Optional
  },
  github: {
    username: "", // Add your GitHub username
  },
  resume: "/resume.pdf", // Place resume in public/
  status: {
    available: true,
    message: "Open to opportunities",
  },
  contact: {
    email: "", // Add your email
  },
  ai: {
    enabled: true,
    provider: "gemini" as "gemini" | "openai",
  },
} as const;

export type SiteConfig = typeof siteConfig;
