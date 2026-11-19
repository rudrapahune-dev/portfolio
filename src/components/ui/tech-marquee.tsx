"use client";

import { TechIcon } from "@/lib/tech-icons";

const technologies = [
  { name: "Node.js", icon: "nodejs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Python", icon: "python" },
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "Express.js", icon: "express" },
  { name: "Prisma ORM", icon: "prisma" },
  { name: "Supabase", icon: "supabase" },
  { name: "Java", icon: "java" },
  { name: "TypeScript", icon: "javascript" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "REST APIs", icon: "api" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Postman", icon: "postman" },
  { name: "C", icon: "c" },
];

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-foreground/20 py-3.5 my-6 select-none bg-background">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none gap-6 sm:gap-8 items-center">
        {[...technologies, ...technologies].map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-foreground font-mono text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap"
          >
            <TechIcon name={tech.icon} className="w-3.5 h-3.5 text-foreground/70" />
            <span>{tech.name}</span>
            <span className="text-foreground/30 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
