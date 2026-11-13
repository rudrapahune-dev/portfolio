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
    github: "https://github.com/rudrapahune-dev",
    linkedin: "https://www.linkedin.com/in/rudra-pahune-0b1257279/",
    email: "mailto:rudrapahune@gmail.com", // Configurable
    twitter: "", // Optional
  },
  github: {
    username: "rudrapahune-dev",
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
