"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  CheckCircle,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { projects, type Project } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectModal } from "@/components/features/project-modal";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // The featured project is Intervia
  const featured = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Selected Works"
          title="Engineered Products & Systems"
          description="Real-world full-stack architectures and AI applications built with production rigor."
        />

        {/* Featured Project Showcase: INTERVIA */}
        <div className="editorial-card rounded-3xl border border-border p-6 sm:p-8 lg:p-12 mb-16 shadow-2xl relative overflow-hidden">
          {/* Subtle accent corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/6 rounded-bl-[120px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Project Details & Features (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="editorial-tag text-xs font-semibold">Flagship Project</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-surface-secondary border border-border text-foreground font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {featured.status}
                </span>
                <span className="text-xs font-mono text-muted">{featured.category}</span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-foreground tracking-tight mb-3.5">
                  {featured.title}
                </h3>
                <p className="text-[17px] sm:text-[19px] text-foreground/90 leading-relaxed font-sans">
                  {featured.description}
                </p>
              </div>

              {/* Architecture tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono bg-surface-secondary border border-border text-muted hover:text-foreground transition-colors font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Core Feature highlights */}
              <div className="space-y-3 pt-2">
                <p className="text-xs sm:text-[13px] font-mono font-bold uppercase text-accent tracking-wider">
                  Core Architectural Highlights
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-[13px] font-mono text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>AI Question Synthesis Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>LeetCode-Style Code Sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>6-Digit OTP Email Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Session Analytics & Reports</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => setSelectedProject(featured)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-[#141512] font-semibold text-xs sm:text-sm hover:brightness-110 shadow-sm transition-all min-h-[44px]"
                >
                  <span>Project Architecture & Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-secondary border border-border text-xs sm:text-sm font-medium text-foreground hover:border-accent transition-colors min-h-[44px]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right: Realistic Application Mockup (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border bg-[#10110D] shadow-2xl overflow-hidden font-mono text-xs">
                {/* Mockup Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#181914] border-b border-border/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E05F55]" />
                    <span className="w-3 h-3 rounded-full bg-[#E0AF55]" />
                    <span className="w-3 h-3 rounded-full bg-[#5FB865]" />
                    <span className="ml-2 text-foreground font-semibold text-xs">intervia.app/room/live</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span>AI Interviewer Active</span>
                  </div>
                </div>

                {/* Mockup Split Editor View */}
                <div className="p-4 sm:p-5 space-y-3 bg-[#12130F] text-[#F3F0E7]">
                  {/* AI Prompt Dialogue */}
                  <div className="p-3.5 rounded-xl bg-surface border border-border/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-accent">
                      <span className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> AI Evaluator
                      </span>
                      <span className="text-muted text-[11px]">Round: DSA / System Design</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                      &quot;Design an LRU Cache with O(1) get and put operations. Explain how you structure your DoublyLinkedList and HashMap.&quot;
                    </p>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="p-3.5 rounded-xl bg-[#0B0C09] border border-border/60 text-xs space-y-1 font-mono text-foreground/90">
                    <div className="text-muted-foreground pb-1.5 border-b border-border/40 flex items-center justify-between text-[11px]">
                      <span>Solution.js</span>
                      <span>JavaScript (Node.js 20)</span>
                    </div>
                    <pre className="text-xs leading-relaxed pt-1.5 text-muted overflow-x-auto">
                      <code>{`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
}`}</code>
                    </pre>
                  </div>

                  {/* Execution Bar */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      <span>Test cases passed: 14/14</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Runtime: 42ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future / Pipeline Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-foreground">
                Upcoming Architectures & Research
              </h4>
              <p className="text-xs sm:text-sm text-muted font-mono mt-0.5">
                Active Architectural Blueprints & Proof of Concepts
              </p>
            </div>
            <span className="text-xs font-mono text-accent px-2.5 py-1 rounded-full bg-accent-muted border border-accent/20">
              Active Pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="editorial-card p-6 sm:p-7 rounded-2xl border border-border/80 flex flex-col justify-between space-y-4 hover:border-accent transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2.5">
                    <span className="text-accent font-bold">
                      {idx === 0 ? "Autonomous Systems" : "Distributed Backend"}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-secondary text-xs border border-border">
                      Planned
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-xl text-foreground mb-2.5">
                    {idx === 0 ? "Multi-Agent Coordination Engine" : "High-Throughput Event Broker"}
                  </h4>
                  <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed font-sans">
                    {idx === 0
                      ? "Investigating autonomous agent protocols that decompose complex tasks into verifiable sub-steps with state persistence and self-healing error recovery."
                      : "Architectural blueprint exploring message queues, relational data sharding, and edge-cached REST APIs for sub-50ms global latency."}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs sm:text-[13px] font-mono text-muted">
                  <span>Stack: Python • Node.js • PostgreSQL</span>
                  <span className="text-accent font-semibold">In Research →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
