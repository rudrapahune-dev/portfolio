"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Cpu, Code2 } from "lucide-react";
import { type Project } from "@/config/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-border shadow-2xl z-10 p-6 sm:p-8 space-y-6 text-foreground font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="editorial-tag">{project.category}</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-secondary border border-border text-muted">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Overview */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Overview</span>
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* 2. Problem Statement */}
          <div className="space-y-2 p-4 rounded-xl bg-surface-secondary/50 border border-border">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent-secondary" />
              <span>Problem Statement</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Technical interview candidates often struggle because static problem-solving does not replicate the dynamic dialogue, cognitive pressure, and adaptive questioning of real engineering interviews. Intervia creates an authentic AI-driven simulation loop to bridge this gap.
            </p>
          </div>

          {/* 3. Architecture & Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Architecture & Engineering Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface-secondary border border-border text-foreground font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Major Features */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Features & Capabilities</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted font-mono">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-surface-secondary/40 border border-border/60">
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Development Challenges */}
          <div className="space-y-2 p-4 rounded-xl bg-surface-secondary/30 border border-border">
            <h3 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-accent" />
              <span>Development Insights & Challenges</span>
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Managing asynchronous streaming responses while keeping the LeetCode-style code editor synchronized required careful state orchestration. Implementing reliable 6-digit OTP delivery with expiration handling and rate limits reinforced robust backend verification paradigms.
            </p>
          </div>

          {/* Actions & Links */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-secondary border border-border text-xs font-medium hover:border-accent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-muted">
                  Source: Available on request / in development
                </span>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-[#141512] font-semibold text-xs hover:brightness-110 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-muted hover:text-foreground transition-colors"
            >
              Close Window [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
