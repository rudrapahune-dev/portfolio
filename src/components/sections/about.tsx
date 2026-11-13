"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Cpu,
  Bot,
  Sparkles,
  Server,
  Brain,
  Code2,
  Database,
  ArrowRight,
  Layers,
  Terminal,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const exploringIcons: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
};

interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  tech: string;
}

const architectureNodes: ArchitectureNode[] = [
  { id: "client", title: "Client Layer", role: "Next.js & React", tech: "Tailwind • Framer Motion" },
  { id: "api", title: "REST Backend", role: "Express.js Engine", tech: "Node.js • JWT • OTP Auth" },
  { id: "orm", title: "Data Layer", role: "Prisma ORM", tech: "Type-safe Schema • Migrations" },
  { id: "db", title: "Database", role: "PostgreSQL", tech: "Supabase Hosted • ACID" },
  { id: "ai", title: "AI Intelligence", role: "LLM Orchestration", tech: "AI Agents • Evaluators" },
];

export function About() {
  const [activeNode, setActiveNode] = useState<ArchitectureNode>(architectureNodes[1]);

  return (
    <section id="about" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Profile"
          title="Under the Hood: Who I Am & How I Build"
          description="A personal look at my journey, philosophy and technical curiosity."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Narrative Column - Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
            <p>
              I have always been obsessed with what happens <span className="text-foreground font-semibold">under the hood</span>. Rather than treating frameworks like black boxes, I enjoy deconstructing how requests flow through an event loop, how relational schemas maintain data integrity under load, and how modern AI models can be woven into deterministic backend systems.
            </p>

            <p className="text-muted leading-relaxed">
              As an AI and Data Science engineering student at <strong className="text-foreground font-semibold">YCCE Nagpur (Class of 2029)</strong>, I bridge the world of rigorous computer science fundamentals—data structures, system design principles, and algorithms—with pragmatic full-stack development.
            </p>

            <div className="p-6 rounded-2xl bg-surface border border-border space-y-3 my-6">
              <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase font-semibold">
                <Terminal className="w-4 h-4" />
                <span>The Story of Intervia</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Building <strong className="text-accent font-semibold">Intervia</strong> was a major inflection point. Crafting a full technical interview simulator pushed me to design clean REST endpoints, implement 6-digit OTP email verification flows, integrate LeetCode-style code environments, and orchestrate generative AI prompt pipelines with sub-second feedback loops.
              </p>
            </div>

            <p className="text-muted leading-relaxed">
              When I am not coding, I am usually diving into distributed systems literature, experimenting with autonomous agent loops, or refining my understanding of high-throughput backend APIs.
            </p>

            {/* Quick credentials cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-surface/50 border border-border">
                <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span>Education</span>
                </div>
                <h4 className="font-semibold text-sm text-foreground">{personalInfo.education.degree}</h4>
                <p className="text-xs text-muted mt-1">{personalInfo.education.institution} • {personalInfo.education.expectedGraduation}</p>
              </div>

              <div className="p-4 rounded-xl bg-surface/50 border border-border">
                <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
                  <Cpu className="w-4 h-4 text-accent-secondary" />
                  <span>Core Focus</span>
                </div>
                <h4 className="font-semibold text-sm text-foreground">Backend & Intelligent Systems</h4>
                <p className="text-xs text-muted mt-1">Node.js, PostgreSQL, AI Agents & System Design</p>
              </div>
            </div>
          </div>

          {/* Technical Illustration: Interactive Architecture Blueprint - Right (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-surface border border-border shadow-lg">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <div className="flex items-center gap-2 font-mono text-xs text-foreground font-semibold">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>Interactive Architecture Blueprint</span>
                </div>
                <span className="text-[10px] font-mono text-muted px-2 py-0.5 rounded bg-surface-secondary border border-border">
                  Click Nodes to Inspect
                </span>
              </div>

              {/* Node selection stack */}
              <div className="space-y-2">
                {architectureNodes.map((node) => {
                  const isSelected = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between font-mono text-xs",
                        isSelected
                          ? "bg-accent-muted border-accent text-foreground shadow-sm"
                          : "bg-surface-secondary/40 border-border/80 text-muted hover:text-foreground hover:border-border"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={cn("w-2 h-2 rounded-full", isSelected ? "bg-accent" : "bg-muted-foreground")} />
                        <span className="font-semibold">{node.title}</span>
                      </div>
                      <span className="text-[11px] opacity-75">{node.role}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active node detail panel */}
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-5 p-4 rounded-xl bg-surface-secondary border border-border space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-accent">{activeNode.title}</span>
                  <span className="text-[11px] font-mono text-muted">{activeNode.role}</span>
                </div>
                <p className="text-xs text-foreground/80 font-mono">
                  Technologies: <span className="text-foreground font-semibold">{activeNode.tech}</span>
                </p>
                <p className="text-[11px] text-muted leading-relaxed">
                  Engineered with an emphasis on predictability, strict type boundaries, and resilient error recovery patterns.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* What I'm Currently Exploring subsection */}
        <div className="mt-24 pt-12 border-t border-border/60">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
                Active Research & Learning
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
                What I&apos;m Currently Exploring
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted font-mono max-w-md">
              Technologies and paradigms I am actively investigating in personal projects and coursework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {personalInfo.currentlyExploring.map((item) => (
              <div
                key={item.title}
                className="editorial-card p-5 rounded-2xl group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-accent-muted text-accent w-fit mb-4 group-hover:scale-110 transition-transform">
                  {exploringIcons[item.icon] || <Code2 className="w-5 h-5" />}
                </div>
                <h4 className="font-heading font-bold text-sm text-foreground mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted leading-relaxed font-sans">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
