"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  User,
  RotateCcw,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestedQuestions = [
  "Who is Rudra?",
  "What technologies does he work with?",
  "What kind of developer is he?",
  "Tell me about his projects.",
  "What is he currently learning?",
  "How can I contact him?",
];

function formatTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

// Markdown and Code Block Renderer for Chat Messages
function FormattedMessage({ content }: { content: string }) {
  // Check for code blocks ```lang ... ```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const firstLine = lines[0].trim();
          const hasLang = firstLine.length > 0 && !firstLine.includes(" ") && lines.length > 1;
          const language = hasLang ? firstLine : "code";
          const code = hasLang ? lines.slice(1).join("\n") : lines.join("\n");

          return <CodeBlock key={index} code={code} language={language} />;
        }

        // Parse regular text lines (bullets, bold, inline code)
        const lines = part.split("\n");
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) {
                return <div key={lIdx} className="h-1.5" />;
              }

              // Bullet points
              if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const bulletText = trimmed.replace(/^([•\-\*]\s*)/, "");
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                    <span className="text-accent font-bold select-none text-[12px] leading-tight mt-0.5">
                      ▹
                    </span>
                    <span className="flex-1">{renderInline(bulletText)}</span>
                  </div>
                );
              }

              // Numbered points e.g. "1. "
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                    <span className="text-accent font-mono text-[11px] font-bold select-none mt-0.5">
                      {numMatch[1]}.
                    </span>
                    <span className="flex-1">{renderInline(numMatch[2])}</span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="leading-relaxed">
                  {renderInline(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  // Parse inline `code` and **bold**
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-surface border border-border text-accent font-mono text-[11px]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }
    return token;
  });
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="my-2 rounded-xl border border-border overflow-hidden bg-background text-foreground font-mono text-xs shadow-sm">
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface border-b border-border text-[11px] text-muted">
        <span className="flex items-center gap-1.5 text-accent">
          <Terminal className="w-3 h-3" />
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-surface-secondary text-muted hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
          <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[11px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>("");
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Listen to open-ai-chat event from command palette or external triggers
  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", onOpen);
    return () => window.removeEventListener("open-ai-chat", onOpen);
  }, []);

  // Lock body scroll on small mobile screens when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userPrompt = content.trim();
    setLastPrompt(userPrompt);

    const userMsg: Message = {
      id: "u-" + Date.now().toString(),
      role: "user",
      content: userPrompt,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: "a-" + (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: formatTime(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to Rudra's AI assistant. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleRetry = () => {
    if (lastPrompt) {
      sendMessage(lastPrompt);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setLastPrompt("");
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-[80] group flex items-center gap-3 px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300",
          "bg-accent text-[#141512] font-semibold border border-accent/40",
          "hover:scale-105 hover:brightness-105 shadow-accent/20",
          isOpen && "pointer-events-none opacity-0 scale-90"
        )}
        aria-label="Open Rudra's AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#141512] opacity-50" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#141512]" />
        </span>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#141512]" />
          <span className="hidden sm:inline text-xs font-mono tracking-wide uppercase font-bold text-[#141512]">
            Ask AI
          </span>
        </div>
      </motion.button>

      {/* Main chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "fixed z-[85] flex flex-col font-sans",
              "inset-0 sm:inset-auto sm:bottom-6 sm:right-6",
              "w-full sm:w-[420px] h-full sm:h-[620px] sm:max-h-[85vh]",
              "rounded-none sm:rounded-2xl border-0 sm:border border-border",
              "bg-surface text-foreground shadow-2xl overflow-hidden"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface-secondary/40 select-none">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative p-2.5 rounded-xl bg-accent-muted text-accent border border-accent/20 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-heading font-bold text-foreground truncate">
                      Rudra&apos;s AI Assistant
                    </h3>
                    <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-mono font-medium bg-accent-muted text-accent border border-accent/20">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-muted truncate">
                    Ask me about Rudra, his work, skills and interests.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    title="Clear conversation"
                    className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary transition-all"
                    aria-label="Clear chat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary transition-all"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.length === 0 && (
                <div className="text-center pt-4 pb-2 animate-fade-in">
                  <div className="w-13 h-13 mx-auto mb-3.5 rounded-2xl bg-accent-muted text-accent flex items-center justify-center border border-accent/20 shadow-md">
                    <Bot className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-heading font-bold text-foreground mb-1">
                    Hi! I&apos;m Rudra&apos;s AI Assistant
                  </h4>
                  <p className="text-xs text-muted mb-5 leading-relaxed max-w-xs mx-auto">
                    I have complete context on Rudra&apos;s background, skills, architecture decisions, and current focus areas.
                  </p>

                  <div className="text-left">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-2 px-1 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-accent" />
                      Suggested questions
                    </p>
                    <div className="space-y-1.5">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl border border-border text-xs text-foreground/90 bg-surface-secondary/50 hover:bg-surface-secondary hover:border-accent/40 hover:text-accent transition-all duration-200 flex items-center justify-between group"
                        >
                          <span className="truncate">{q}</span>
                          <span className="text-muted group-hover:text-accent font-mono text-[10px] ml-2">
                            ↵
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col gap-1",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex gap-2.5 max-w-[88%]",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {/* Avatar */}
                    {msg.role === "assistant" ? (
                      <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-accent-muted text-accent flex items-center justify-center mt-1 border border-accent/20">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-surface-secondary border border-border flex items-center justify-center mt-1 text-muted">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={cn(
                        "relative group px-4 py-3 rounded-2xl",
                        msg.role === "user"
                          ? "bg-accent text-[#141512] font-medium rounded-tr-xs shadow-sm"
                          : "bg-surface-secondary border border-border text-foreground rounded-tl-xs shadow-sm"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <FormattedMessage content={msg.content} />
                      ) : (
                        <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      )}

                      {/* Assistant copy action */}
                      {msg.role === "assistant" && (
                        <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted font-mono">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 hover:text-accent transition-colors"
                            title="Copy response"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-accent" />
                                <span className="text-accent">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <span className="text-[10px] font-mono text-muted pr-9">
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-accent-muted text-accent flex items-center justify-center border border-accent/20">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-surface-secondary border border-border">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-muted">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error feedback with retry */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">⚠</span>
                    <p className="flex-1">{error}</p>
                  </div>
                  {lastPrompt && (
                    <button
                      onClick={handleRetry}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-sans font-medium transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Retry question
                    </button>
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form
              onSubmit={handleSubmit}
              className="p-3.5 sm:p-4 border-t border-border bg-surface-secondary/30"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Rudra's work, skills, projects..."
                  maxLength={500}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-surface text-foreground text-xs sm:text-sm font-sans placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className={cn(
                    "p-2.5 rounded-xl bg-accent text-[#141512] transition-all flex items-center justify-center font-bold",
                    input.trim() && !isLoading
                      ? "hover:brightness-110 shadow-md shadow-accent/20 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#141512]" />
                  ) : (
                    <Send className="w-4 h-4 text-[#141512]" />
                  )}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted font-mono px-1">
                <span>Markdown & code supported</span>
                <span>{input.length}/500</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
