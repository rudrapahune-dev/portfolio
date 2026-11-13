"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Cpu,
  Server,
  Layers,
  Terminal,
  Database,
  Code2,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  tech: string;
}

const architectureNodes: ArchitectureNode[] = [
  { id: "client", title: "Client Layer", role: "Next.js & React", tech: "Tailwind • TypeScript • Framer Motion" },
  { id: "api", title: "REST Backend", role: "Express.js Engine", tech: "Node.js • REST APIs • JWT & Auth" },
  { id: "orm", title: "Data Layer", role: "Prisma ORM", tech: "Type-safe Schema • Migrations • Query Optimization" },
  { id: "db", title: "Database", role: "PostgreSQL", tech: "Supabase Hosted • ACID Transactions • Relational Integrity" },
  { id: "ai", title: "AI Intelligence", role: "LLM & Agent Pipelines", tech: "Generative AI • Autonomous Loops • Tool Execution" },
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
          <div className="lg:col-span-7 space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg font-sans">
            <p>
              I have always been driven by an obsession with what happens <span className="text-foreground font-semibold">under the hood</span>. Rather than treating frameworks or APIs like black boxes, I enjoy deconstructing how requests navigate the event loop, how relational schemas guarantee consistency under load, and how modern AI models can be woven into predictable, resilient backend architectures.
            </p>

            <p className="text-muted leading-relaxed">
              As an AI and Data Science engineering student at <strong className="text-foreground font-semibold">Yeshwantrao Chavan College of Engineering (YCCE), Nagpur</strong> (Class of 2029), I bridge core computer science principles—data structures, system design, and algorithmic efficiency—with modern, pragmatic full-stack execution.
            </p>

            {/* Architecture Focus Card (replaces the old Intervia box) */}
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-3 my-6 shadow-xs">
              <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Engineering Philosophy</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                My primary focus revolves around <strong className="text-accent font-semibold">Backend Engineering</strong> and <strong className="text-accent font-semibold">Artificial Intelligence</strong>. I believe that an exceptional user interface is only as reliable as the data layer, caching strategy, and server architecture powering it. Whether designing PostgreSQL schemas or orchestrating LLM prompt pipelines, I prioritize strict type safety, modular boundaries, and clean separation of concerns.
              </p>
            </div>

            <p className="text-muted leading-relaxed">
              When I am not coding, I spend time studying distributed systems literature, experimenting with autonomous agent execution loops, and continuously sharpening my problem-solving skills across advanced data structures and algorithms.
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
                  <span>Technical Focus</span>
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
                          ? "bg-accent-muted border-accent text-foreground shadow-sm font-semibold"
                          : "bg-surface-secondary/40 border-border/80 text-muted hover:text-foreground hover:border-border"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={cn("w-2 h-2 rounded-full", isSelected ? "bg-accent" : "bg-muted-foreground")} />
                        <span>{node.title}</span>
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
                <p className="text-xs text-foreground/90 font-mono">
                  Stack: <span className="text-foreground font-semibold">{activeNode.tech}</span>
                </p>
                <p className="text-[11px] text-muted leading-relaxed font-sans">
                  Engineered with an emphasis on predictability, strict type boundaries, and resilient error recovery patterns.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
