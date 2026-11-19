"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
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
  ArrowUpRight,
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
  "What is his core tech stack?",
  "Tell me about Intervia.",
  "How does Node.js handle async operations?",
  "What is the difference between SQL and NoSQL?",
  "How can I contact him?",
];

function formatTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function FormattedMessage({ content }: { content: string }) {
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

        const lines = part.split("\n");
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) {
                return <div key={lIdx} className="h-1.5" />;
              }

              if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const bulletText = trimmed.replace(/^([•\-\*]\s*)/, "");
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                    <span className="text-cobalt font-bold select-none text-[12px] leading-tight mt-0.5">
                      ▹
                    </span>
                    <span className="flex-1">{renderInline(bulletText)}</span>
                  </div>
                );
              }

              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                    <span className="font-mono text-[11px] font-bold select-none mt-0.5 text-cobalt">
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
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-background border border-foreground/20 font-mono text-[11px] font-bold text-cobalt"
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
    <div className="my-2 rounded-xl border border-foreground/20 overflow-hidden bg-[#0B0C0A] text-[#F3F0E7] font-mono text-xs shadow-sm">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#141512] border-b border-white/10 text-[11px] text-[#A3A39A]">
        <span className="flex items-center gap-1.5 text-cobalt font-bold">
          <Terminal className="w-3 h-3" />
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/10 text-[#A3A39A] hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3 h-3 text-cobalt" /> : <Copy className="w-3 h-3" />}
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", onOpen);
    return () => window.removeEventListener("open-ai-chat", onOpen);
  }, []);

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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        sendMessage(input);
      }
    }
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
      {/* Floating launcher trigger with Electric Cobalt accent */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-[80] group flex items-center gap-2.5 px-5 py-3 rounded-full shadow-[4px_4px_0px_#080808] transition-all duration-300",
          "bg-foreground text-background font-mono font-bold border-2 border-foreground",
          "hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#080808] hover:border-cobalt",
          isOpen && "pointer-events-none opacity-0 scale-90"
        )}
        aria-label="Open Rudra's AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cobalt" />
        </span>
        <Bot className="w-4 h-4 group-hover:text-cobalt transition-colors" />
        <span className="text-xs uppercase tracking-wider font-extrabold">
          Ask AI
        </span>
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
              "w-full sm:w-[440px] h-full sm:h-[640px] sm:max-h-[85vh]",
              "rounded-none sm:rounded-2xl border-2 border-foreground",
              "bg-surface text-foreground shadow-[8px_8px_0px_#080808] overflow-hidden"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-foreground/20 bg-background select-none">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-foreground text-background flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-cobalt" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-heading font-extrabold text-foreground truncate">
                      Rudra&apos;s AI Assistant
                    </h3>
                    <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-foreground text-background">
                      <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-muted truncate">
                    Powered by Gemini • Knows Rudra &amp; general CS topics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    title="Clear conversation / New chat"
                    className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    aria-label="Clear conversation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-surface">
              {messages.length === 0 && (
                <div className="text-center pt-3 pb-2 animate-fade-in">
                  <div className="w-12 h-12 mx-auto mb-3.5 rounded-2xl bg-foreground text-background flex items-center justify-center border border-foreground shadow-[3px_3px_0px_var(--cobalt)]">
                    <Bot className="w-6 h-6 text-cobalt" />
                  </div>
                  <h4 className="text-base font-heading font-extrabold text-foreground mb-1">
                    Hi! I&apos;m Rudra&apos;s AI Assistant
                  </h4>
                  <p className="text-xs text-muted mb-4 leading-relaxed max-w-xs mx-auto">
                    Ask me about Rudra&apos;s background, projects, or any technical question regarding backend systems, AI agents, databases, and programming.
                  </p>

                  <div className="text-left">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted mb-2 px-1 flex items-center gap-1.5 font-bold">
                      <MessageSquare className="w-3 h-3 text-cobalt" />
                      Suggested questions
                    </p>
                    <div className="space-y-1.5">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="w-full text-left px-3.5 py-2 rounded-xl border border-foreground/20 text-xs text-foreground bg-background hover:border-cobalt hover:text-cobalt transition-all duration-150 flex items-center justify-between group shadow-2xs hover:shadow-[2px_2px_0px_var(--cobalt)]"
                        >
                          <span className="truncate font-sans font-medium">{q}</span>
                          <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-cobalt transition-colors ml-2 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex flex-col gap-1",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex gap-2.5 max-w-[90%]",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-foreground text-background flex items-center justify-center mt-1">
                        <Bot className="w-3.5 h-3.5 text-cobalt" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-background border border-foreground/30 flex items-center justify-center mt-1 text-foreground">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "relative group px-4 py-3 rounded-2xl",
                        msg.role === "user"
                          ? "bg-foreground text-background font-medium rounded-tr-xs shadow-xs"
                          : "bg-background border border-foreground/20 text-foreground rounded-tl-xs shadow-xs"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <FormattedMessage content={msg.content} />
                      ) : (
                        <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      )}

                      {msg.role === "assistant" && (
                        <div className="mt-2.5 pt-2 border-t border-foreground/10 flex items-center justify-between text-[10px] text-muted font-mono">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 hover:text-cobalt transition-colors"
                            title="Copy response"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-cobalt" />
                                <span className="text-cobalt">Copied</span>
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
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-foreground text-background flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-cobalt" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-background border border-foreground/20 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-[11px] font-mono text-muted">Reasoning with Gemini...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">⚠</span>
                    <p className="flex-1">{error}</p>
                  </div>
                  {lastPrompt && (
                    <button
                      onClick={handleRetry}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-300 text-[11px] font-medium transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Retry question
                    </button>
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input form supporting Enter to send & Shift+Enter for newline */}
            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-3.5 border-t border-foreground/20 bg-background"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any question... (Enter to send, Shift+Enter for newline)"
                  maxLength={1000}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-foreground/30 bg-surface text-foreground text-xs sm:text-sm font-sans placeholder:text-muted focus:outline-none focus:border-cobalt transition-colors resize-none max-h-32 min-h-[42px]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className={cn(
                    "p-2.5 rounded-xl transition-all flex items-center justify-center font-bold min-h-[42px] min-w-[42px]",
                    input.trim() && !isLoading
                      ? "bg-cobalt text-white hover:opacity-90 shadow-[2px_2px_0px_#080808] cursor-pointer"
                      : "bg-foreground/20 text-muted cursor-not-allowed opacity-50"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted font-mono px-1">
                <span>Enter to send • Shift+Enter for newline</span>
                <span>{input.length}/1000</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
