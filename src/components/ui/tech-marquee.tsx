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
    <div className="relative w-full overflow-hidden border-y border-border bg-surface/30 py-4 my-8">
      {/* Edge gradient fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none gap-8 items-center">
        {/* Double list for seamless looping */}
        {[...technologies, ...technologies].map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-surface/60 border border-border/80 text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors cursor-default whitespace-nowrap"
          >
            <TechIcon name={tech.icon} className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs font-medium tracking-tight">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
