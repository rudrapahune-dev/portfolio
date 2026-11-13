"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { projects, type Project } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative rounded-2xl border border-border overflow-hidden transition-all duration-500",
        isFeatured
          ? "md:col-span-2 bg-gradient-to-br from-surface/80 to-surface/40 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5"
          : "bg-surface/30 hover:bg-surface/50 hover:border-border/80"
      )}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      {/* Project image / placeholder */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-surface-secondary to-background",
          isFeatured ? "h-48 md:h-64" : "h-40"
        )}
      >
        {project.image && project.status !== "Planned" ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted/30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center">
                <span className="text-2xl font-heading font-bold gradient-text">
                  {project.title[0]}
                </span>
              </div>
              <span className="text-xs font-mono">{project.category}</span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted/30">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-white/5 flex items-center justify-center">
                <span className="text-lg font-heading font-bold text-muted/40">
                  {project.title[0]}
                </span>
              </div>
              <span className="text-xs font-mono">{project.status}</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={cn("p-6", isFeatured && "md:p-8")}>
        {/* Status */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "inline-block w-1.5 h-1.5 rounded-full",
              project.status === "In Development"
                ? "bg-amber-400"
                : project.status === "Completed"
                ? "bg-emerald-400"
                : "bg-muted"
            )}
          />
          <span className="text-xs text-muted font-medium">{project.status}</span>
        </div>

        <h3
          className={cn(
            "font-heading font-bold text-foreground mb-2",
            isFeatured ? "text-xl md:text-2xl" : "text-lg"
          )}
        >
          {project.title}
        </h3>

        <p className="text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Features (for featured project) */}
        {isFeatured && project.features.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
              Key Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {project.features.slice(0, 6).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/5 text-muted border border-border/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          {!project.github && !project.live && project.status !== "Planned" && (
            <span className="text-xs text-muted/60 italic">Links coming soon</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-wide">
        <SectionHeading
          label="Projects"
          title="What I've Built"
          description="A showcase of my work, from AI-powered platforms to full-stack applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
