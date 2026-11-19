"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Layers, Cpu } from "lucide-react";
import { type Project } from "@/config/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isOpen?: boolean;
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
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border-2 border-foreground shadow-[8px_8px_0px_#080808] z-10 p-6 sm:p-8 space-y-6 text-foreground font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-foreground/20 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-[13px]">
                <span className="editorial-tag">{project.category}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-foreground text-background font-mono text-[11px] font-bold">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-foreground">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-foreground/30 hover:bg-foreground hover:text-background text-foreground transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Overview */}
          <div className="space-y-2.5">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-muted font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-foreground" />
              <span>Project Overview</span>
            </h3>
            <p className="text-[15px] sm:text-[17px] text-muted leading-relaxed font-sans">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* 2. Problem Statement */}
          <div className="space-y-2.5 p-5 rounded-xl bg-background border border-foreground/20">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-foreground font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-foreground" />
              <span>Problem Statement & Motivation</span>
            </h3>
            <p className="text-[14px] sm:text-[15px] text-muted leading-relaxed font-sans">
              Technical interview candidates often struggle because static problem-solving does not replicate the dynamic dialogue, cognitive pressure, and adaptive questioning of real engineering interviews. Intervia creates an authentic AI-driven simulation loop to bridge this gap.
            </p>
          </div>

          {/* 3. Architecture & Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-muted font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-foreground" />
              <span>Architecture & Engineering Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs sm:text-[13px] font-mono border border-foreground/30 bg-background text-foreground font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Major Features */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs sm:text-[13px] uppercase tracking-wider text-muted font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-foreground" />
              <span>Key Features & Architecture Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono text-muted">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-foreground/15">
                  <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed font-sans">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Close Action */}
          <div className="pt-4 border-t border-foreground/20 flex justify-end">
            <button
              onClick={onClose}
              className="editorial-btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold min-h-[44px]"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
