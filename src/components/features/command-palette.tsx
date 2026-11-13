"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Code2,
  Folder,
  Clock,
  Mail,
  Github,
  Linkedin,
  Bot,
  Download,
  Sun,
  Moon,
  Command,
  Terminal,
} from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "Go to Home",
        icon: <Home className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("home"),
        keywords: ["hero", "top", "intro"],
      },
      {
        id: "about",
        label: "Go to About",
        icon: <User className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("about"),
        keywords: ["bio", "education", "experience"],
      },
      {
        id: "skills",
        label: "Go to Skills",
        icon: <Code2 className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("skills"),
        keywords: ["tech", "technologies", "stack", "node", "python", "postgres"],
      },
      {
        id: "projects",
        label: "Go to Projects",
        icon: <Folder className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("projects"),
        keywords: ["work", "intervia", "featured"],
      },
      {
        id: "terminal",
        label: "Launch Interactive Terminal",
        icon: <Terminal className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("terminal"),
        keywords: ["shell", "bash", "cli"],
      },
      {
        id: "github-sec",
        label: "Go to GitHub Activity",
        icon: <Github className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("github"),
        keywords: ["repos", "open source", "commits"],
      },
      {
        id: "experience",
        label: "Go to Experience Timeline",
        icon: <Clock className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("experience"),
        keywords: ["timeline", "journey", "milestones"],
      },
      {
        id: "contact",
        label: "Go to Contact",
        icon: <Mail className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("contact"),
        keywords: ["email", "message", "form"],
      },
      {
        id: "github",
        label: "Open GitHub Profile (rudrapahune-dev)",
        icon: <Github className="w-4 h-4" />,
        category: "Direct Profiles",
        action: () => {
          window.open(siteConfig.links.github, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn Profile (Rudra Pahune)",
        icon: <Linkedin className="w-4 h-4 text-[#0077B5]" />,
        category: "Direct Profiles",
        action: () => {
          window.open(siteConfig.links.linkedin, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "resume",
        label: "Download Resume",
        icon: <Download className="w-4 h-4" />,
        category: "Documents",
        action: () => {
          window.open(siteConfig.resume, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        icon: theme === "dark" ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />,
        category: "Preferences",
        action: () => {
          toggleTheme();
          setIsOpen(false);
        },
        keywords: ["dark", "light", "mode", "toggle"],
      },
      {
        id: "ai",
        label: "Open Personal AI Twin",
        icon: <Bot className="w-4 h-4 text-accent" />,
        category: "Intelligence",
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent("open-ai-chat"));
        },
        keywords: ["chat", "assistant", "ask", "ai", "twin"],
      },
    ],
    [theme, toggleTheme]
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.keywords?.some((k) => k.includes(q))
    );
  }, [query, commands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filtered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-2xl border border-border bg-surface text-foreground shadow-2xl overflow-hidden font-sans"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 border-b border-border bg-surface-secondary/40">
              <Search className="w-4 h-4 text-accent" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNav}
                placeholder="Type a command, project, or section..."
                className="flex-1 py-4 text-sm bg-transparent border-none outline-none font-sans placeholder:text-muted/60"
              />
              <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono text-muted bg-surface border border-border">
                ESC
              </kbd>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="text-center text-muted text-sm py-8 font-mono">No matching commands found.</p>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    <p className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted font-semibold">
                      {category}
                    </p>
                    {items.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      const isSelected = globalIdx === selectedIndex;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={cn(
                            "flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-left transition-all",
                            isSelected
                              ? "bg-accent-muted text-foreground font-semibold"
                              : "text-muted hover:text-foreground"
                          )}
                        >
                          <span className={cn(isSelected ? "text-accent" : "text-muted")}>
                            {cmd.icon}
                          </span>
                          <span className="text-sm flex-1">{cmd.label}</span>
                          {isSelected && (
                            <span className="text-[10px] font-mono text-accent">↵ Select</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-border bg-surface-secondary/30 text-[11px] font-mono text-muted">
              <span>Use ↑↓ to navigate · Enter to execute</span>
              <span className="flex items-center gap-1 text-accent">
                <Command className="w-3 h-3" />K
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
