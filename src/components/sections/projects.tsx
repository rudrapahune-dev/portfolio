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
  Play,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import { projects, type Project } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectModal } from "@/components/features/project-modal";
import { siteConfig } from "@/config/site";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // The featured project is Intervia
  const featured = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Featured Work"
          title="Engineered Products & Systems"
          description="Real-world full-stack architectures and AI applications built with rigor."
        />

        {/* Featured Project Showcase: INTERVIA */}
        <div className="editorial-card rounded-3xl border border-border p-6 sm:p-8 lg:p-10 mb-16 shadow-xl relative overflow-hidden">
          {/* Subtle accent corner accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-bl-[100px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Project Details & Features (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="editorial-tag">Flagship Project</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-surface-secondary border border-border text-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {featured.status}
                </span>
                <span className="text-xs font-mono text-muted">{featured.category}</span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-3">
                  {featured.title}
                </h3>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {featured.description}
                </p>
              </div>

              {/* Architecture tags */}
              <div className="flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface-secondary border border-border text-muted hover:text-foreground transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Core Feature highlights */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-mono font-semibold uppercase text-muted tracking-wider">
                  Core Implementation Highlights
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>AI Question Synthesis Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>LeetCode-Style Code Sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>6-Digit OTP Email Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>Session Analytics & Reports</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setSelectedProject(featured)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-[#141512] font-semibold text-xs hover:brightness-110 shadow-sm transition-all"
                >
                  <span>Project Architecture & Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-secondary border border-border text-xs font-medium text-foreground hover:border-accent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Right: Realistic Application Mockup (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border bg-[#11120F] shadow-2xl overflow-hidden font-mono text-xs">
                {/* Mockup Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#191A14] border-b border-border/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E05F55]" />
                    <span className="w-3 h-3 rounded-full bg-[#E0AF55]" />
                    <span className="w-3 h-3 rounded-full bg-[#5FB865]" />
                    <span className="ml-2 text-foreground font-semibold text-xs">intervia.app/room/live</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span>AI Interviewer Active</span>
                  </div>
                </div>

                {/* Mockup Split Editor View */}
                <div className="p-4 space-y-3 bg-[#131410] text-[#F3F0E7]">
                  {/* AI Prompt Dialogue */}
                  <div className="p-3 rounded-xl bg-surface border border-border/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-accent">
                      <span className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> AI Evaluator
                      </span>
                      <span className="text-muted text-[10px]">Round: DSA / System Design</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      &quot;Design an LRU Cache with O(1) get and put operations. Explain how you structure your DoublyLinkedList and HashMap.&quot;
                    </p>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="p-3 rounded-xl bg-[#0D0E0B] border border-border/60 text-[11px] space-y-1 font-mono text-foreground/90">
                    <div className="text-muted-foreground pb-1 border-b border-border/40 flex items-center justify-between text-[10px]">
                      <span>Solution.js</span>
                      <span>JavaScript (Node.js 20)</span>
                    </div>
                    <pre className="text-[11px] leading-relaxed pt-1 text-muted overflow-x-auto">
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
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <div className="flex items-center gap-2 text-accent">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Test cases passed: 14/14</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted text-[10px]">
                      <Clock className="w-3 h-3" />
                      <span>Runtime: 42ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future / Pipeline Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-lg text-foreground">
              Upcoming Architectures & Research
            </h4>
            <span className="text-xs font-mono text-muted">Active Pipeline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="editorial-card p-6 rounded-2xl border border-border/80 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                    <span className="text-accent">{idx === 0 ? "Autonomous Systems" : "Distributed Backend"}</span>
                    <span className="px-2 py-0.5 rounded bg-surface-secondary text-[11px] border border-border">Planned</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-foreground mb-2">
                    {idx === 0 ? "Multi-Agent Coordination Engine" : "High-Throughput Event Broker"}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed font-sans">
                    {idx === 0
                      ? "Investigating autonomous agent protocols that decompose complex tasks into verifiable sub-steps with state persistence and self-healing error recovery."
                      : "Architectural blueprint exploring message queues, relational data sharding, and edge-cached REST APIs for sub-50ms global latency."}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted">
                  <span>Stack: Python • Node.js • PostgreSQL</span>
                  <span className="text-accent">In Research →</span>
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
