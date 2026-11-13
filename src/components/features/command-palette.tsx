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
  Bot,
  Download,
  Sun,
  Moon,
  Command,
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
        keywords: ["hero", "top"],
      },
      {
        id: "about",
        label: "Go to About",
        icon: <User className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("about"),
      },
      {
        id: "skills",
        label: "Go to Skills",
        icon: <Code2 className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("skills"),
        keywords: ["tech", "technologies"],
      },
      {
        id: "projects",
        label: "Go to Projects",
        icon: <Folder className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("projects"),
        keywords: ["work", "portfolio"],
      },
      {
        id: "experience",
        label: "Go to Experience",
        icon: <Clock className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("experience"),
        keywords: ["timeline", "journey"],
      },
      {
        id: "contact",
        label: "Go to Contact",
        icon: <Mail className="w-4 h-4" />,
        category: "Navigation",
        action: () => scrollTo("contact"),
        keywords: ["email", "message"],
      },
      {
        id: "github",
        label: "Open GitHub",
        icon: <Github className="w-4 h-4" />,
        category: "Links",
        action: () => {
          window.open(siteConfig.links.github, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "resume",
        label: "Download Resume",
        icon: <Download className="w-4 h-4" />,
        category: "Links",
        action: () => {
          window.open(siteConfig.resume, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
        category: "Actions",
        action: () => {
          toggleTheme();
          setIsOpen(false);
        },
        keywords: ["dark", "light", "mode"],
      },
      {
        id: "ai",
        label: "Open AI Assistant",
        icon: <Bot className="w-4 h-4" />,
        category: "Actions",
        action: () => {
          setIsOpen(false);
          // Dispatch custom event to open AI chat
          window.dispatchEvent(new CustomEvent("open-ai-chat"));
        },
        keywords: ["chat", "assistant", "ask"],
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

  // Keyboard shortcut
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

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
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

  // Group by category
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
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-surface shadow-2xl shadow-black/30 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="w-4 h-4 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNav}
                placeholder="Type a command or search..."
                className="flex-1 py-3.5 text-sm bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono text-muted bg-white/5 border border-border">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-center text-muted text-sm py-6">No results found.</p>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="px-4 py-1.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                      {category}
                    </p>
                    {items.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors",
                            globalIdx === selectedIndex
                              ? "bg-white/5 text-foreground"
                              : "text-muted hover:text-foreground"
                          )}
                        >
                          <span className={cn(
                            globalIdx === selectedIndex ? "text-cyan-400" : "text-muted"
                          )}>
                            {cmd.icon}
                          </span>
                          <span className="text-sm">{cmd.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] text-muted">
              <span>Navigate with ↑↓ · Select with ↵</span>
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />K to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
