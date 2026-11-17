"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Server,
  Layers,
  Terminal,
  Database,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  tech: string;
  latency: string;
  resilience: string;
  protocol: string;
}

const architectureNodes: ArchitectureNode[] = [
  {
    id: "client",
    title: "Client Application",
    role: "Next.js & React 19 Frontend",
    tech: "TypeScript • Tailwind CSS • Framer Motion",
    latency: "< 50ms FCP",
    resilience: "Client-side error boundaries & optimistic updates",
    protocol: "HTTPS / HTTP/2",
  },
  {
    id: "api",
    title: "REST Backend Gateway",
    role: "Express.js Engine & Middleware",
    tech: "Node.js 20 LTS • REST APIs • JWT & Rate Limiting",
    latency: "15–30ms response",
    resilience: "Global error handlers & structured request validation",
    protocol: "JSON over REST",
  },
  {
    id: "orm",
    title: "Data Access Layer",
    role: "Prisma ORM & Query Layer",
    tech: "Type-safe Schemas • Connection Pool • Query Optimization",
    latency: "4–8ms query time",
    resilience: "Transaction rollbacks & schema migrations",
    protocol: "TCP Connection Pool",
  },
  {
    id: "db",
    title: "Relational Persistence",
    role: "Supabase Hosted PostgreSQL",
    tech: "PostgreSQL • B-Tree Indexes • Foreign Key Constraints",
    latency: "< 10ms execution",
    resilience: "Full ACID compliance & automated backups",
    protocol: "PostgreSQL Wire Protocol",
  },
  {
    id: "ai",
    title: "AI Intelligence Pipeline",
    role: "Autonomous Agent & LLM Execution",
    tech: "Gemini API • Agent Orchestration • Tool Calling",
    latency: "Streaming token feed",
    resilience: "Fallback generation & graceful schema validation",
    protocol: "Server-Sent Events / REST",
  },
];

export function About() {
  const [activeNode, setActiveNode] = useState<ArchitectureNode>(architectureNodes[1]);

  return (
    <section id="about" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Profile & Philosophy"
          title="Under the Hood: Who I Am & How I Build"
          description="A personal look at my engineering principles, architectural curiosity, and technical foundation."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Narrative Column - Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-foreground/90 font-sans">
            <p className="text-[17px] sm:text-[19px] leading-relaxed">
              I have always been driven by an obsession with what happens <span className="text-foreground font-semibold underline decoration-accent/40 underline-offset-4">under the hood</span>. Rather than treating frameworks or APIs like black boxes, I enjoy deconstructing how requests navigate the event loop, how relational schemas guarantee consistency under load, and how modern AI models can be woven into predictable, resilient backend architectures.
            </p>

            <p className="text-[16px] sm:text-[18px] text-muted leading-relaxed">
              As an AI and Data Science engineering student at <strong className="text-foreground font-semibold">Yeshwantrao Chavan College of Engineering (YCCE), Nagpur</strong> (Class of 2029), I bridge core computer science principles—data structures, system design, and algorithmic efficiency—with modern, pragmatic full-stack execution.
            </p>

            {/* Architecture Focus Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surface border border-border space-y-3.5 my-6 shadow-xs">
              <div className="flex items-center gap-2 text-accent font-mono text-xs sm:text-[13px] uppercase font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Engineering Philosophy</span>
              </div>
              <p className="text-[15px] sm:text-[17px] text-foreground/90 leading-relaxed font-sans">
                My primary focus revolves around <strong className="text-accent font-semibold">Backend Engineering</strong> and <strong className="text-accent font-semibold">Artificial Intelligence</strong>. I believe that an exceptional user interface is only as reliable as the data layer, caching strategy, and server architecture powering it. Whether designing PostgreSQL schemas or orchestrating LLM prompt pipelines, I prioritize strict type safety, modular boundaries, and clean separation of concerns.
              </p>
            </div>

            <p className="text-[16px] sm:text-[18px] text-muted leading-relaxed">
              When I am not writing code, I spend time studying distributed systems literature, experimenting with autonomous agent execution loops, and continuously sharpening my problem-solving skills across advanced data structures and algorithms.
            </p>

            {/* Credentials cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-5 rounded-2xl bg-surface/70 border border-border shadow-xs">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono text-muted mb-2">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span>Academic Degree</span>
                </div>
                <h4 className="font-heading font-bold text-base text-foreground">
                  {personalInfo.education.degree}
                </h4>
                <p className="text-xs sm:text-sm text-muted mt-1 font-mono">
                  {personalInfo.education.institution} • {personalInfo.education.expectedGraduation}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface/70 border border-border shadow-xs">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono text-muted mb-2">
                  <Cpu className="w-4 h-4 text-accent-secondary" />
                  <span>Specialization</span>
                </div>
                <h4 className="font-heading font-bold text-base text-foreground">
                  Backend & Intelligent Systems
                </h4>
                <p className="text-xs sm:text-sm text-muted mt-1 font-mono">
                  Node.js, PostgreSQL, AI Agents & System Design
                </p>
              </div>
            </div>
          </div>

          {/* Technical Illustration: Interactive Architecture Blueprint - Right (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-foreground font-semibold">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>Interactive Architecture Schematic</span>
                </div>
                <span className="text-[11px] font-mono text-muted px-2.5 py-0.5 rounded-full bg-surface-secondary border border-border">
                  Click Nodes to Inspect
                </span>
              </div>

              {/* Node selection stack */}
              <div className="space-y-2">
                {architectureNodes.map((node, index) => {
                  const isSelected = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className={cn(
                        "w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between font-mono text-xs sm:text-[13px]",
                        isSelected
                          ? "bg-accent-muted border-accent text-foreground shadow-sm font-semibold"
                          : "bg-surface-secondary/40 border-border/80 text-muted hover:text-foreground hover:border-border"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          isSelected ? "bg-accent shadow-xs shadow-accent" : "bg-muted-foreground"
                        )} />
                        <span className="font-semibold">{node.title}</span>
                      </div>
                      <span className="text-[11px] opacity-80">{node.protocol}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active node detail panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-5 p-5 rounded-2xl bg-surface-secondary border border-border space-y-3 font-sans"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-mono font-bold text-accent text-sm sm:text-base">
                      {activeNode.title}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface border border-border text-foreground font-semibold">
                      {activeNode.latency}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/90 font-mono">
                    <strong className="text-muted font-normal">Stack:</strong> {activeNode.tech}
                  </p>

                  <div className="p-3 rounded-xl bg-surface border border-border/70 text-xs sm:text-[13px] text-muted space-y-1">
                    <div className="flex items-center gap-1.5 text-accent font-mono font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Resilience Pattern</span>
                    </div>
                    <p className="leading-relaxed font-sans">{activeNode.resilience}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
