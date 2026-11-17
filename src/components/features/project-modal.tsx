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
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border border-border shadow-2xl z-10 p-6 sm:p-8 space-y-6 text-foreground font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-[13px]">
                <span className="editorial-tag">{project.category}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-secondary border border-border text-muted">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-foreground">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-muted hover:text-foreground hover:bg-surface-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Overview */}
          <div className="space-y-2.5">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Project Overview</span>
            </h3>
            <p className="text-[15px] sm:text-[17px] text-foreground/90 leading-relaxed font-sans">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* 2. Problem Statement */}
          <div className="space-y-2.5 p-5 rounded-2xl bg-surface-secondary/50 border border-border">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent-secondary" />
              <span>Problem Statement & Motivation</span>
            </h3>
            <p className="text-[14px] sm:text-[15px] text-muted leading-relaxed font-sans">
              Technical interview candidates often struggle because static problem-solving does not replicate the dynamic dialogue, cognitive pressure, and adaptive questioning of real engineering interviews. Intervia creates an authentic AI-driven simulation loop to bridge this gap.
            </p>
          </div>

          {/* 3. Architecture & Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Architecture & Engineering Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono bg-surface-secondary border border-border text-foreground font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Major Features */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Key Features & Architecture Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-muted">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-border">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90 leading-relaxed font-sans">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Close Action */}
          <div className="pt-4 border-t border-border flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-accent text-[#141512] font-semibold text-xs sm:text-sm hover:brightness-110 transition-all min-h-[44px]"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
