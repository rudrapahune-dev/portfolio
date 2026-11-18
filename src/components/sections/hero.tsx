"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Mail,
  Github,
  Linkedin,
  FileText,
  MapPin,
  Sparkles,
  Terminal,
  Activity,
  Cpu,
  Database,
  Server,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3200);

    const pingTimer = setInterval(() => {
      setLatency(Math.floor(20 + Math.random() * 12));
    }, 4000);

    return () => {
      clearInterval(roleTimer);
      clearInterval(pingTimer);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Background editorial grid & warm lighting */}
      <div className="absolute inset-0 editorial-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[360px] bg-accent/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Hero Content (Left 7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top metadata badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs sm:text-[13px] font-mono shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-foreground font-medium">{siteConfig.status.message}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/60 border border-border text-xs sm:text-[13px] text-muted font-mono">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Nagpur, India • B.Tech AI & Data Science</span>
              </div>
            </motion.div>

            {/* Intro line & Name */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-mono text-sm sm:text-base uppercase tracking-widest text-accent mb-2 font-semibold"
              >
                Hi, I&apos;m
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="fluid-hero-heading font-heading font-black text-foreground tracking-tight text-balance"
              >
                Rudra Pahune<span className="text-accent">.</span>
              </motion.h1>
            </div>

            {/* Dynamic Role Line with Reserved Space (Zero Layout Shift) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl md:text-[26px] font-heading font-semibold text-foreground/90"
            >
              <span className="text-muted font-normal">Specializing in</span>
              <div className="relative inline-block h-9 sm:h-10 overflow-hidden min-w-[270px] sm:min-w-[320px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 26, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -26, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-0 text-accent font-bold underline decoration-accent/40 underline-offset-6"
                  >
                    {personalInfo.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Carefully Crafted Narrative Description */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-3.5 max-w-2xl text-foreground/90 font-sans"
            >
              <p className="text-[17px] sm:text-[19px] leading-relaxed">
                I&apos;m a developer interested in building intelligent software systems, scalable backend architectures and AI-powered applications.
              </p>
              <p className="text-[15px] sm:text-[17px] text-muted leading-relaxed font-sans">
                My primary interests are <strong className="text-foreground font-semibold">Backend Development</strong>, <strong className="text-foreground font-semibold">Artificial Intelligence</strong> and <strong className="text-foreground font-semibold">Full-Stack Engineering</strong>.
              </p>
            </motion.div>

            {/* 5 CTAs with Real Profile Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              {/* 1. Explore My Work */}
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-[#141512] font-semibold text-sm sm:text-base hover:brightness-110 shadow-md shadow-accent/15 transition-all active:scale-[0.98] min-h-[44px]"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* 2. Let's Connect */}
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface border border-border text-foreground font-medium text-sm sm:text-base hover:border-accent hover:bg-surface-secondary transition-all active:scale-[0.98] min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span>Let&apos;s Connect</span>
              </button>

              {/* 3. GitHub Profile */}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground font-medium text-sm sm:text-base hover:border-accent hover:bg-surface-secondary transition-all min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              {/* 4. LinkedIn Profile */}
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground font-medium text-sm sm:text-base hover:border-accent hover:bg-surface-secondary transition-all min-h-[44px]"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>

              {/* 5. Resume (Only active when actual PDF is provided) */}
              {siteConfig.resume.available ? (
                <a
                  href={siteConfig.resume.url}
                  download
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface/60 border border-border text-muted font-medium text-sm sm:text-base hover:text-foreground hover:border-accent transition-all min-h-[44px]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              ) : (
                <span
                  title="Resume PDF will be made available upon update."
                  aria-disabled="true"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-surface/30 border border-border/50 text-muted/60 font-medium text-sm sm:text-base cursor-not-allowed select-none min-h-[44px]"
                >
                  <FileText className="w-4 h-4 text-muted/50" />
                  <span>Resume</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface border border-border/60 text-muted/70">Soon</span>
                </span>
              )}
            </motion.div>

            {/* Quick Terminal Shortcut */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-muted font-mono"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span>Quick Access: Press <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-foreground font-bold font-mono">Ctrl + K</kbd> for Command Palette</span>
              </div>
              <button
                onClick={() => scrollTo("terminal")}
                className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Developer Shell ↓</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Technical Illustration & Blueprint Status (5 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="editorial-card rounded-3xl p-6 sm:p-7 border border-border bg-surface/90 shadow-2xl relative overflow-hidden">
              {/* Subtle accent corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[80px] pointer-events-none" />

              {/* Header: System Blueprint Spec */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-accent-muted text-accent">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">
                      Engineering Spec & Status
                    </h3>
                    <p className="text-[11px] font-mono text-muted">Node.js • PostgreSQL • AI Workflows</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-muted text-accent font-mono text-xs font-semibold">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>{latency}ms</span>
                </div>
              </div>

              {/* Architecture Blueprint Nodes */}
              <div className="space-y-3 font-mono text-xs sm:text-[13px]">
                <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">Core Architecture</p>
                      <p className="text-[11px] text-muted">Modular REST & Event-Driven Engine</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface border border-border text-[11px] text-accent font-bold">
                    ACTIVE
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-accent-secondary" />
                    <div>
                      <p className="font-semibold text-foreground">Data Consistency</p>
                      <p className="text-[11px] text-muted">Prisma ORM • Supabase PostgreSQL</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface border border-border text-[11px] text-foreground/80 font-bold">
                    ACID
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-secondary/70 border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">Intelligent Layer</p>
                      <p className="text-[11px] text-muted">LLM Tool Call Protocols & Multi-Agent Loops</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface border border-border text-[11px] text-accent font-bold">
                    AUGMENTED
                  </span>
                </div>
              </div>

              {/* Live telemetry bar */}
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span>Cluster: Primary</span>
                </span>
                <span className="text-foreground font-semibold">Uptime: 99.98%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
