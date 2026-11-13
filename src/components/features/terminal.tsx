"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Minimize2 } from "lucide-react";
import { personalInfo, skills, projects } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-accent font-semibold">⚡ Rudra Pahune Developer Shell v2.1.0</p>
          <p className="text-muted">Type <span className="text-accent font-mono font-bold">help</span> to view available system commands.</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [expanded, setExpanded] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    const cmd = raw.toLowerCase();

    if (!raw) return;

    // Track command in history for up/down arrow cycling
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-muted-foreground font-semibold">Available commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4 text-foreground/90">
              <div><span className="text-accent font-bold">about</span> - Brief background & education</div>
              <div><span className="text-accent font-bold">skills</span> - Full engineering tech stack</div>
              <div><span className="text-accent font-bold">projects</span> - Flagship & featured works</div>
              <div><span className="text-accent font-bold">github</span> - GitHub profile link & info</div>
              <div><span className="text-accent font-bold">contact</span> - Reach out / social links</div>
              <div><span className="text-accent font-bold">whoami</span> - Identity context</div>
              <div><span className="text-accent font-bold">date</span> - Display current local time</div>
              <div><span className="text-accent font-bold">clear</span> - Clear terminal session</div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs font-mono leading-relaxed">
            <p className="text-foreground font-semibold">{personalInfo.name} — {personalInfo.headline}</p>
            <p className="text-muted">{personalInfo.shortBio}</p>
            <p className="text-accent">
              🎓 {personalInfo.education.degree} @ {personalInfo.education.institution} (Exp: {personalInfo.education.expectedGraduation})
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono">
            {skills.categories.map((cat) => (
              <div key={cat.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="text-accent font-semibold min-w-[170px]">{cat.name}:</span>
                <span className="text-muted">{cat.items.map((i) => i.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3 text-xs font-mono">
            {projects.filter((p) => p.status !== "Planned").map((p) => (
              <div key={p.id} className="p-2 rounded bg-surface border border-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold">{p.title}</span>
                  <span className="text-[10px] text-muted px-1.5 py-0.5 rounded bg-surface-secondary">{p.status}</span>
                </div>
                <p className="text-muted">{p.description}</p>
                <p className="text-muted-foreground text-[10px]">Stack: {p.tech.join(" • ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "github":
        output = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-foreground">Official GitHub: <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:text-accent-light">{siteConfig.links.github}</a></p>
            <p className="text-muted">Username: @{siteConfig.github.username}</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-foreground">Connect with Rudra:</p>
            <p className="text-muted">• GitHub: <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-accent underline">{siteConfig.links.github}</a></p>
            <p className="text-muted">• LinkedIn: <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-accent underline">{siteConfig.links.linkedin}</a></p>
            <p className="text-muted">• Email: Contact via form on site or {siteConfig.links.email.replace("mailto:", "")}</p>
          </div>
        );
        break;

      case "whoami":
        output = <p className="text-xs font-mono text-muted">guest@rudrapahune-portfolio: exploring systems & software.</p>;
        break;

      case "date":
        output = <p className="text-xs font-mono text-muted">{new Date().toString()}</p>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-xs font-mono text-accent-secondary">
            Command not recognized: <span className="font-bold">{raw}</span>. Type <span className="text-accent underline">help</span> for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="terminal" className="section-padding py-12 md:py-16">
      <div className="container-wide max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-sm font-mono font-bold tracking-wider text-muted uppercase">
              Interactive Dev Terminal
            </h3>
          </div>
          <span className="text-xs font-mono text-muted hidden sm:inline-block">
            Try: <button onClick={() => handleCommand("help")} className="text-accent underline">help</button> | <button onClick={() => handleCommand("skills")} className="text-accent underline">skills</button> | <button onClick={() => handleCommand("projects")} className="text-accent underline">projects</button>
          </span>
        </div>

        {/* Terminal Window */}
        <div
          className={`editorial-card rounded-xl border border-border bg-[#11120F] text-[#F3F0E7] shadow-xl overflow-hidden transition-all duration-300 font-mono ${
            expanded ? "h-[500px]" : "h-[340px]"
          } flex flex-col`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#191A14] border-b border-border/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E05F55] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#E0AF55] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#5FB865] inline-block" />
              <span className="ml-2 font-mono text-muted text-[11px] font-medium hidden sm:inline">
                rudra@portfolio: ~ (bash)
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="p-1 rounded text-muted hover:text-foreground transition-colors"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs selection:bg-accent selection:text-[#141512]">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-accent font-bold">rudra@portfolio:~$</span>
                  <span className="text-foreground font-semibold">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-border/40 text-foreground/90">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-accent font-bold whitespace-nowrap">rudra@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground border-none outline-none font-mono focus:ring-0 p-0 text-xs caret-accent"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <CornerDownLeft className="w-3 h-3 text-muted/60" />
            </div>
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
