"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Cpu,
  Database,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  CheckCircle2,
  Activity,
  Terminal,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ArchitectureStep {
  id: string;
  label: string;
  subtitle: string;
  tech: string;
  latency: string;
  role: string;
  pattern: string;
  throughput: string;
}

interface ArchitectureScenario {
  id: string;
  name: string;
  badge: string;
  description: string;
  steps: ArchitectureStep[];
}

const scenarios: ArchitectureScenario[] = [
  {
    id: "ai-agent",
    name: "Autonomous AI Agent Loop",
    badge: "AI & LLM Systems",
    description: "Self-correcting prompt orchestration, tool execution, and context persistence.",
    steps: [
      {
        id: "prompt",
        label: "User Prompt Ingest",
        subtitle: "Client Session",
        tech: "Next.js 15 • WebSocket / SSE",
        latency: "< 12ms",
        role: "Captures natural language query and hydrates user session context.",
        pattern: "Streaming Token Pipeline",
        throughput: "2,500 conn/s",
      },
      {
        id: "planner",
        label: "Intent & Tool Planner",
        subtitle: "Orchestration Engine",
        tech: "Gemini API • LangChain / Custom DAG",
        latency: "~240ms",
        role: "Decomposes complex requests into deterministic execution sub-tasks.",
        pattern: "ReAct / Thought-Action-Observation",
        throughput: "Concurrency Pool",
      },
      {
        id: "sandbox",
        label: "Sandboxed Tool Runner",
        subtitle: "Execution Isolation",
        tech: "Node.js VM • Isolated Context",
        latency: "18ms",
        role: "Executes code evaluation, database lookups, or API external fetching.",
        pattern: "Strict Process Isolation",
        throughput: "Stateless Worker Pool",
      },
      {
        id: "synthesis",
        label: "Verified Synthesis",
        subtitle: "Final Output Stream",
        tech: "Server-Sent Events • Markdown Parser",
        latency: "< 35ms",
        role: "Validates schema compliance, formats markdown, and streams result to user.",
        pattern: "Idempotent Response Cache",
        throughput: "Sub-50ms TTFT",
      },
    ],
  },
  {
    id: "scalable-api",
    name: "High-Throughput REST & Data Pipeline",
    badge: "Backend Engineering",
    description: "Sub-50ms API routing, Redis token-bucket rate limiting, and relational ACID storage.",
    steps: [
      {
        id: "gateway",
        label: "Edge API Gateway",
        subtitle: "Request Routing",
        tech: "Next.js Edge / Express Router",
        latency: "< 6ms",
        role: "Handles SSL termination, CORS policies, and request payload normalization.",
        pattern: "Reverse Proxy & Load Balancing",
        throughput: "12,000 req/s",
      },
      {
        id: "ratelimit",
        label: "Auth & Rate Limiter",
        subtitle: "Security Boundary",
        tech: "Redis In-Memory • Token Bucket",
        latency: "< 3ms",
        role: "Enforces IP rate limits, validates JWT bearer signatures, and blocks abuse.",
        pattern: "Sliding Window Counter",
        throughput: "45,000 ops/s",
      },
      {
        id: "orm",
        label: "Prisma Query Engine",
        subtitle: "Type-Safe Data Layer",
        tech: "Prisma ORM • Connection Pool",
        latency: "5–8ms",
        role: "Translates typed domain models into parameterized SQL with connection pooling.",
        pattern: "Repository Pattern & Prepared Statements",
        throughput: "Pooled 50 Max Conn",
      },
      {
        id: "postgres",
        label: "PostgreSQL Replica",
        subtitle: "Relational Persistence",
        tech: "Supabase Hosted Postgres 16",
        latency: "< 14ms",
        role: "Executes queries across indexed tables guaranteeing strict ACID transactions.",
        pattern: "B-Tree Indexes & Foreign Key Constraints",
        throughput: "Write-Ahead Logging",
      },
    ],
  },
  {
    id: "event-broker",
    name: "Asynchronous Queue Broker",
    badge: "Distributed Systems",
    description: "Decoupled background processing, worker clusters, and fault-tolerant retry policies.",
    steps: [
      {
        id: "producer",
        label: "Event Producer",
        subtitle: "Fast Ingestion API",
        tech: "Node.js REST Endpoint",
        latency: "< 8ms ACK",
        role: "Receives high-velocity event streams, returns instant 202 Accepted, queues event.",
        pattern: "Fire-and-Forget Ingestion",
        throughput: "8,000 events/s",
      },
      {
        id: "queue",
        label: "Distributed Queue",
        subtitle: "Message Buffer",
        tech: "Redis BullMQ / Kafka Topics",
        latency: "< 2ms publish",
        role: "Buffers messages in memory with disk persistence to absorb burst traffic.",
        pattern: "FIFO Order & Backpressure Handling",
        throughput: "30,000 msgs/s",
      },
      {
        id: "worker",
        label: "Worker Node Cluster",
        subtitle: "Background Processing",
        tech: "Autonomous Node.js Workers",
        latency: "Async background",
        role: "Processes jobs, generates emails/reports, and executes heavy calculations.",
        pattern: "Exponential Backoff & Retries",
        throughput: "Auto-scaled instances",
      },
      {
        id: "audit",
        label: "Audit Log & DLQ",
        subtitle: "Dead-Letter Reliability",
        tech: "PostgreSQL Event Store",
        latency: "Batch commit",
        role: "Records successful job state transitions and stores failed jobs in DLQ.",
        pattern: "Event Sourcing & Dead-Letter Queue",
        throughput: "Immutable Log",
      },
    ],
  },
];

export function ArchitectureExplorer() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("ai-agent");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedStep, setSimulatedStep] = useState<number | null>(null);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  const scenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
  const activeStep = scenario.steps[activeStepIndex] || scenario.steps[0];

  useEffect(() => {
    setActiveStepIndex(0);
    setSimulatedStep(null);
    setTelemetryLogs([
      `[SYSTEM] Initialized architecture scenario: "${scenario.name}"`,
      `[TOPOLOGY] ${scenario.steps.length} distributed nodes verified and healthy.`,
    ]);
  }, [activeScenarioId, scenario]);

  const runSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setSimulatedStep(0);
    setActiveStepIndex(0);

    const logs: string[] = [
      `[SIMULATION START] Dispatched test packet into "${scenario.name}"...`,
    ];
    setTelemetryLogs(logs);

    scenario.steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulatedStep(index);
        setActiveStepIndex(index);
        setTelemetryLogs((prev) => [
          ...prev,
          `[STEP ${index + 1}/${scenario.steps.length}] Traversed ${step.label} (${step.tech}) • Latency: ${step.latency}`,
        ]);

        if (index === scenario.steps.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setTelemetryLogs((prev) => [
              ...prev,
              `[SUCCESS] Request lifecycle completed with 0 errors. All SLAs satisfied.`,
            ]);
          }, 700);
        }
      }, (index + 1) * 750);
    });
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulatedStep(null);
    setActiveStepIndex(0);
    setTelemetryLogs([
      `[SYSTEM] Reset packet tracer for "${scenario.name}". Ready.`,
    ]);
  };

  return (
    <section id="architecture" className="section-padding relative border-t border-foreground/20">
      <div className="container-wide relative z-10">
        <SectionHeading
          label="05 / Systems Engineering"
          title="Architecture & Simulation Explorer"
          description="Interactive flow traces exploring distributed systems, latency budgets, and packet lifecycles."
        />

        {/* Scenario Switcher Tabs (Editorial Pills) */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 mb-10">
          {scenarios.map((sc) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={cn(
                  "px-4 py-2.5 rounded-full font-mono text-xs sm:text-[13px] font-bold transition-all flex items-center gap-2 min-h-[42px] cursor-pointer",
                  isSelected
                    ? "bg-foreground text-background shadow-xs border border-foreground"
                    : "bg-surface border border-foreground/30 text-foreground hover:border-foreground"
                )}
              >
                <span>{sc.name}</span>
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider",
                    isSelected ? "bg-background text-foreground" : "bg-black/5 text-muted"
                  )}
                >
                  {sc.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Diagram & Telemetry Studio */}
        <div className="editorial-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-foreground bg-surface shadow-[4px_4px_0px_#080808] relative overflow-hidden">
          {/* Top Bar: Title + Simulation Trigger */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-foreground/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground">
                  {scenario.name}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted font-sans max-w-xl">
                {scenario.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold transition-all min-h-[42px] cursor-pointer",
                  isSimulating
                    ? "bg-foreground/40 text-background cursor-wait"
                    : "bg-foreground text-background hover:opacity-85 shadow-xs"
                )}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? "Tracing Request..." : "Simulate Request"}</span>
              </button>

              <button
                onClick={resetSimulation}
                disabled={isSimulating}
                title="Reset simulation"
                className="p-2.5 rounded-xl bg-surface-secondary border border-border text-muted hover:text-foreground transition-colors min-h-[42px]"
                aria-label="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Pipeline Graph (Horizontal stepper on desktop, vertical on mobile) */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {scenario.steps.map((step, idx) => {
                const isCurrentActive = idx === activeStepIndex;
                const isPacketHere = simulatedStep === idx;
                const hasPassed = simulatedStep !== null && simulatedStep > idx;

                return (
                  <motion.div
                    key={step.id}
                    onClick={() => setActiveStepIndex(idx)}
                    whileHover={{ y: -3 }}
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group select-none",
                      isCurrentActive
                        ? "bg-surface-secondary border-accent shadow-md shadow-accent/10"
                        : "bg-surface/60 border-border/80 hover:border-border hover:bg-surface-secondary/40",
                      isPacketHere && "ring-2 ring-accent border-accent bg-accent-muted/30"
                    )}
                  >
                    {/* Active packet indicator light */}
                    {isPacketHere && (
                      <motion.div
                        layoutId="active-packet"
                        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-[#141512] text-[10px] font-mono font-bold animate-pulse"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>PACKET</span>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                      <span className="font-bold text-accent">0{idx + 1} // NODE</span>
                      <span className="text-[11px] font-mono">{step.latency}</span>
                    </div>

                    <h4 className="font-heading font-bold text-base sm:text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                      {step.label}
                    </h4>

                    <p className="text-xs text-muted font-mono mb-3">
                      {step.subtitle}
                    </p>

                    <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-foreground/80 flex items-center justify-between">
                      <span className="truncate">{step.tech.split("•")[0].trim()}</span>
                      <span className="text-accent text-[10px] uppercase font-bold">Inspect →</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Detailed Node Inspector & Live Telemetry Console (Split View) */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Node Spec Details (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-surface-secondary/50 border border-border space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-accent-muted text-accent">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-foreground">
                      Node Spec: {activeStep.label}
                    </h4>
                    <p className="text-xs font-mono text-muted">{activeStep.subtitle}</p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-accent font-bold">{activeStep.latency}</span>
                  <span className="text-muted block text-[10px]">Avg Latency</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                {activeStep.role}
              </p>

              {/* Technical Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <span className="text-muted text-[10px] uppercase block">Runtime & Tech</span>
                  <span className="font-semibold text-foreground">{activeStep.tech}</span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <span className="text-muted text-[10px] uppercase block">Design Pattern</span>
                  <span className="font-semibold text-accent">{activeStep.pattern}</span>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <span className="text-muted text-[10px] uppercase block">Throughput Target</span>
                  <span className="font-semibold text-foreground">{activeStep.throughput}</span>
                </div>
              </div>
            </div>

            {/* Right: Live Telemetry Stream Console (5 cols) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F100D] border border-border text-foreground font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                  <div className="flex items-center gap-2 text-accent text-xs">
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="font-bold">LIVE TELEMETRY TRACE</span>
                  </div>
                  <span className="text-[10px] text-muted flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    STREAMING
                  </span>
                </div>

                <div className="space-y-1.5 max-h-[160px] overflow-y-auto text-[11px] leading-relaxed text-muted pr-2">
                  {telemetryLogs.map((log, idx) => (
                    <p
                      key={idx}
                      className={cn(
                        log.includes("SUCCESS") && "text-accent font-bold",
                        log.includes("SIMULATION START") && "text-foreground font-semibold",
                        log.includes("STEP") && "text-[#F5F2EB]"
                      )}
                    >
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[10px] text-muted font-mono">
                <span>Scenario: {scenario.id}</span>
                <span>STATUS: VERIFIED HEALTHY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
