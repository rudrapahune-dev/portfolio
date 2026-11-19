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
  ArrowUpRight,
  Server,
  Database,
  Cpu,
} from "lucide-react";
import { projects, type Project } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectModal } from "@/components/features/project-modal";
import { siteConfig } from "@/config/site";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured) || projects[0];

  return (
    <section id="projects" className="section-padding relative border-t border-foreground/20">
      <div className="container-wide">
        <SectionHeading
          label="04 / Selected Work"
          title="Featured Projects"
          description="Engineered software products, AI pipelines, and distributed backend blueprints."
        />

        {/* FLAGSHIP HERO SHOWCASE: INTERVIA (Inspired by reference large work showcase) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="editorial-card rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 bg-surface border border-foreground shadow-[4px_4px_0px_#080808]"
        >
          {/* Top Tag & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-foreground/15 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-foreground text-background font-bold uppercase tracking-wider text-[11px]">
                Flagship Project
              </span>
              <span className="text-muted font-bold">2026 • Full-Stack AI</span>
            </div>

            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>In Active Development</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 pt-8 items-center">
            {/* Left Column: Title, Narrative, Tech (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cobalt font-bold block mb-2">
                  {featured.category}
                </span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight">
                  {featured.title}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-foreground/90 font-sans leading-relaxed">
                {featured.description}
              </p>

              {/* Architectural Feature Bullets */}
              <div className="space-y-2.5 pt-2 font-mono text-xs sm:text-[13px] text-muted">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span>Real-time AI question generation & dynamic feedback loop</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span>Interactive in-browser code sandbox with syntax evaluation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span>Secure user authentication with 6-digit OTP email verification</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-foreground flex-shrink-0" />
                  <span>Prisma ORM schema with Supabase-hosted PostgreSQL</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full border border-foreground/30 bg-background font-mono text-xs font-bold text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-btn-primary cursor-pointer shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedProject(featured)}
                  className="editorial-btn-secondary cursor-pointer"
                >
                  <span>Architecture Details</span>
                </button>
              </div>
            </div>

            {/* Right Column: Code Editor & Simulation Preview Mockup (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-foreground bg-background p-4 sm:p-5 font-mono text-xs shadow-[3px_3px_0px_#080808] overflow-hidden">
                {/* Mockup Window Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-foreground/20 text-muted">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[11px] font-bold text-foreground">intervia-session.ts</span>
                  <span className="text-[10px] uppercase font-bold text-foreground bg-black/10 px-1.5 py-0.5 rounded">Live</span>
                </div>

                {/* Simulated Code Lines */}
                <div className="space-y-1.5 text-[11px] sm:text-xs leading-relaxed overflow-x-auto text-foreground">
                  <p><span className="text-purple-600 font-bold dark:text-purple-400">async function</span> <span className="font-bold">evaluateInterviewResponse</span>(input: <span className="text-blue-600 dark:text-blue-400">CodeSubmission</span>) &#123;</p>
                  <p className="pl-4 text-muted">// 1. Validate code execution environment</p>
                  <p className="pl-4"><span className="text-purple-600 font-bold dark:text-purple-400">const</span> sandbox = <span className="text-purple-600 font-bold dark:text-purple-400">await</span> initIsolatedRuntime(&#123; timeoutMs: 4000 &#125;);</p>
                  <p className="pl-4"><span className="text-purple-600 font-bold dark:text-purple-400">const</span> testResults = <span className="text-purple-600 font-bold dark:text-purple-400">await</span> sandbox.execute(input.code);</p>
                  <p className="pl-4 text-muted">// 2. Multi-tier AI assessment stream</p>
                  <p className="pl-4"><span className="text-purple-600 font-bold dark:text-purple-400">const</span> feedback = <span className="text-purple-600 font-bold dark:text-purple-400">await</span> aiEngine.synthesizeFeedback(&#123;</p>
                  <p className="pl-8">complexity: testResults.timeComplexity,</p>
                  <p className="pl-8">correctness: testResults.passedCount / testResults.total,</p>
                  <p className="pl-4">&#125;);</p>
                  <p className="pl-4"><span className="text-purple-600 font-bold dark:text-purple-400">return</span> &#123; status: <span className="text-green-600 dark:text-green-400 font-bold">&quot;VERIFIED&quot;</span>, score: feedback.score &#125;;</p>
                  <p>&#125;</p>
                </div>

                {/* Real-time stats bar */}
                <div className="mt-4 pt-3 border-t border-foreground/20 flex items-center justify-between text-[11px] text-muted">
                  <span className="flex items-center gap-1.5 font-bold text-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    <span>Memory: 42MB</span>
                  </span>
                  <span>Latency: 18ms</span>
                  <span>Runtime: Node 20 LTS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECONDARY ARCHITECTURES & SYSTEMS GRID (2-column layout matching reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1: Multi-Agent Coordination Engine */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="editorial-card rounded-2xl p-6 sm:p-8 bg-surface border border-foreground/30 hover:border-cobalt hover:shadow-[4px_4px_0px_var(--cobalt)] transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-foreground/15 font-mono text-xs">
                <span className="text-cobalt font-bold uppercase">System Architecture</span>
                <span className="font-bold text-foreground">Autonomous AI</span>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-foreground text-background group-hover:bg-cobalt group-hover:text-white transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-black text-2xl text-foreground group-hover:text-cobalt transition-colors">
                  Multi-Agent Coordination Engine
                </h4>
              </div>

              <p className="text-sm sm:text-base font-sans text-muted leading-relaxed mb-6">
                Investigating autonomous multi-step execution loops where specialized LLM agents communicate via shared boards, decompose complex goals into verifiable sub-steps, and execute tool protocols.
              </p>
            </div>

            <div className="pt-4 border-t border-foreground/15 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground font-semibold">Autonomous Loops</span>
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground font-semibold">Tool Calling</span>
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground font-semibold">TypeScript</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground group-hover:text-cobalt group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.div>

          {/* Card 2: High-Throughput Event Broker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="editorial-card rounded-2xl p-6 sm:p-8 bg-surface border border-foreground/30 hover:border-cobalt hover:shadow-[4px_4px_0px_var(--cobalt)] transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-foreground/15 font-mono text-xs">
                <span className="text-cobalt font-bold uppercase">Backend Blueprint</span>
                <span className="font-bold text-foreground">Distributed Messaging</span>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-foreground text-background group-hover:bg-cobalt group-hover:text-white transition-colors">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-black text-2xl text-foreground group-hover:text-cobalt transition-colors">
                  High-Throughput Event Broker
                </h4>
              </div>

              <p className="text-sm sm:text-base font-sans text-muted leading-relaxed mb-6">
                A distributed backend messaging design focusing on idempotent event ingestion, resilient dead-letter queues, strict transaction isolation, and predictable sub-50ms global latencies.
              </p>
            </div>

            <div className="pt-4 border-t border-foreground/15 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground font-semibold">Node.js</span>
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground font-semibold">PostgreSQL</span>
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-foreground font-semibold">Idempotency</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground group-hover:text-cobalt group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.div>
        </div>

        {/* Modal for detail exploration */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
