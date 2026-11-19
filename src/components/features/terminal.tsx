"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { CornerDownLeft, Maximize2, Minimize2, Terminal as TerminalIcon } from "lucide-react";
import { personalInfo, skills, projects } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";

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
          <p className="text-[#A3A39A]">Type <span className="text-foreground font-mono font-bold underline">help</span> to view available system commands.</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [expanded, setExpanded] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current && history.length > 1) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    const cmd = raw.toLowerCase();

    if (!raw) return;

    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[#A3A39A] font-semibold">Available commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4 text-foreground/90">
              <div><span className="text-accent font-bold">about</span> - Background & education</div>
              <div><span className="text-accent font-bold">skills</span> - Full engineering tech stack</div>
              <div><span className="text-accent font-bold">projects</span> - Flagship & featured works</div>
              <div><span className="text-accent font-bold">github</span> - GitHub profile link & info</div>
              <div><span className="text-accent font-bold">contact</span> - Reach out / direct email</div>
              <div><span className="text-accent font-bold">whoami</span> - Identity context</div>
              <div><span className="text-accent font-bold">date</span> - Display current local time</div>
              <div><span className="text-accent font-bold">clear</span> - Clear terminal session</div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1.5 text-xs font-mono leading-relaxed">
            <p className="text-foreground font-semibold">{personalInfo.name} — {personalInfo.headline}</p>
            <p className="text-[#A3A39A]">{personalInfo.shortBio}</p>
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
                <span className="text-[#D4D4CE]">{cat.items.map((i) => i.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2.5 text-xs font-mono">
            {projects.filter((p) => p.status !== "Planned").map((p) => (
              <div key={p.id} className="p-2.5 rounded-lg bg-[#141512] border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold">{p.title}</span>
                  <span className="text-[10px] text-muted px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{p.status}</span>
                </div>
                <p className="text-[#A3A39A]">{p.description}</p>
                <p className="text-accent text-[11px]">Stack: {p.tech.join(" • ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "github":
        output = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-foreground">Official GitHub: <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-accent underline font-semibold hover:opacity-80">{siteConfig.links.github}</a></p>
            <p className="text-[#A3A39A]">Username: @{siteConfig.github.username}</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-foreground">Connect with Rudra:</p>
            <p className="text-[#A3A39A]">• GitHub: <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-accent underline">{siteConfig.links.github}</a></p>
            <p className="text-[#A3A39A]">• LinkedIn: <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-accent underline">{siteConfig.links.linkedin}</a></p>
            <p className="text-[#A3A39A]">• Email: Contact via form on site or {siteConfig.links.email.replace("mailto:", "")}</p>
          </div>
        );
        break;

      case "whoami":
        output = <p className="text-xs font-mono text-[#A3A39A]">guest@rudrapahune: exploring distributed architectures & intelligence.</p>;
        break;

      case "date":
        output = <p className="text-xs font-mono text-[#A3A39A]">{new Date().toString()}</p>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-xs font-mono text-red-400">
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
    <section id="terminal" className="section-padding py-16 md:py-20 border-b border-foreground/20">
      <div className="container-wide max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          number="04"
          title="INTERACTIVE SHELL"
          description="Direct command-line interface to inspect system architecture, credentials, and projects."
        />

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
            <h3 className="text-xs font-mono font-bold tracking-widest text-muted uppercase">
              Terminal v2.1.0 • Bourne Again Shell
            </h3>
          </div>
          <span className="text-xs font-mono text-muted hidden sm:inline-block">
            Quick commands:{" "}
            <button onClick={() => handleCommand("help")} className="font-bold underline hover:text-cobalt transition-colors">help</button> |{" "}
            <button onClick={() => handleCommand("skills")} className="font-bold underline hover:text-cobalt transition-colors">skills</button> |{" "}
            <button onClick={() => handleCommand("projects")} className="font-bold underline hover:text-cobalt transition-colors">projects</button>
          </span>
        </div>

        {/* Terminal Window */}
        <div
          className={`rounded-2xl border-2 border-foreground bg-[#0B0C0A] text-[#F3F0E7] shadow-[5px_5px_0px_#080808] overflow-hidden transition-all duration-300 font-mono ${
            expanded ? "h-[520px]" : "h-[360px]"
          } flex flex-col`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#141512] border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E05F55] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#E0AF55] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#5FB865] inline-block" />
              <span className="ml-3 font-mono text-[#A3A39A] text-[11px] font-medium hidden sm:inline">
                rudra@portfolio: ~ (bash)
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="p-1 rounded text-[#A3A39A] hover:text-white transition-colors"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Terminal Body */}
          <div ref={terminalBodyRef} className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-[13px] selection:bg-accent selection:text-[#080808]">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-[#A3A39A]">
                  <span className="text-accent font-bold">rudra@portfolio:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-white/15 text-white/90">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px]">
              <span className="text-accent font-bold whitespace-nowrap">rudra@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white border-none outline-none font-mono focus:ring-0 p-0 text-xs sm:text-[13px] caret-accent"
                spellCheck={false}
                autoComplete="off"
              />
              <CornerDownLeft className="w-3.5 h-3.5 text-[#A3A39A]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
