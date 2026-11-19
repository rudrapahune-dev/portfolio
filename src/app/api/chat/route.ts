import { NextResponse } from "next/server";
import { personalInfo, skills, projects } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

// In-memory rate limiting (30 requests per minute per IP)
const ipRequests = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 30;
  const windowMs = 60 * 1000;

  const record = ipRequests.get(ip);
  if (!record || now > record.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

const SYSTEM_INSTRUCTION = `You are Rudra's personal portfolio AI assistant. You represent Rudra Pahune and help visitors understand his background, education, technical skills, projects and engineering interests.

You also act as a helpful general-purpose AI assistant. You can answer technical, educational, programming and general knowledge questions even when they are unrelated to Rudra's portfolio.

When asked about Rudra, use only verified information supplied in the portfolio context. Never invent qualifications, experience, project results or personal achievements.

When asked general questions, answer naturally and helpfully using your general knowledge.

When asked a technical question, explain concepts clearly and provide examples when useful.

When you do not know something about Rudra, honestly say that the information is not available rather than making it up.

Keep responses conversational, useful and concise by default. Adapt the level of detail to the question.

Do not force every conversation back to Rudra's portfolio.

VERIFIED RUDRA CONTEXT:
- Name: Rudra Pahune
- Roles: Backend Developer, AI Enthusiast, Full-Stack Developer, Problem Solver
- Education: Pursuing B.Tech in Artificial Intelligence & Data Science at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur (Expected Graduation: 2029)
- Core Focus Areas: Backend Architecture, Artificial Intelligence, Generative AI, AI Agents, Database Design, System Design, Data Structures & Algorithms
- Programming Languages: Java, Python, JavaScript, C
- Frontend: HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs
- Databases: PostgreSQL, Supabase, Prisma ORM
- Tools & Platforms: Git, GitHub, VS Code, Postman, Vercel
- Active Explorations:
  • Backend Engineering (modular RESTful architectures, transaction safety, idempotency)
  • AI Agents (autonomous multi-step execution loops, memory, tool use)
  • Generative AI (LLM workflows, streaming responses, structured JSON prompt engineering)
  • Machine Learning (algorithms, predictive modeling, data pipelines)
  • Advanced DSA (graph algorithms, dynamic programming, algorithmic complexity)
  • Full-Stack Development (Next.js, TypeScript, PostgreSQL)
- Projects:
  • Intervia: An AI-powered technical interview simulation platform featuring an interactive code editor, dynamic AI-driven question generation, and 6-digit OTP email authentication. Built with React, Node.js, Express, Prisma, PostgreSQL, Supabase.
  • Multi-Agent Coordination Engine (Planned research into autonomous workflows and verifiable task loops)
  • High-Throughput Event Broker (Planned backend messaging architecture for sub-50ms distributed pipelines)
- Social & Contact Channels:
  • GitHub: https://github.com/rudrapahune-dev
  • LinkedIn: https://www.linkedin.com/in/rudra-pahune-0b1257279/
  • Email: rudrapahune@gmail.com
  • Portfolio: Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.`;

export async function POST(req: Request) {
  try {
    // 1. IP extraction for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Message history is required." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const rawContent = String(lastMessage?.content || "").slice(0, 1000).trim();

    if (!rawContent) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY?.trim();

    // 2. Format multi-turn conversation history for Gemini API
    const recentMessages = messages.slice(-10); // preserve up to 10 conversation turns
    const geminiContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    for (const msg of recentMessages) {
      const role = msg.role === "assistant" ? "model" : "user";
      const text = String(msg.content || "").slice(0, 1000).trim();
      if (!text) continue;

      // Merge consecutive identical roles if necessary to keep Gemini happy
      const lastEntry = geminiContents[geminiContents.length - 1];
      if (lastEntry && lastEntry.role === role) {
        lastEntry.parts[0].text += "\n\n" + text;
      } else {
        geminiContents.push({ role, parts: [{ text }] });
      }
    }

    // Ensure the conversation starts with a user message
    if (geminiContents.length === 0 || geminiContents[0].role !== "user") {
      geminiContents.unshift({ role: "user", parts: [{ text: rawContent }] });
    }

    // 3. If Gemini API is configured: Call models in resilient fallback chain
    if (geminiKey && geminiKey.length > 0) {
      const candidateModels = ["gemini-3-flash-preview", "gemini-flash-latest", "gemini-3.5-flash"];

      for (const model of candidateModels) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 9000);

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": geminiKey,
              },
              signal: controller.signal,
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                contents: geminiContents,
              }),
            }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply && typeof reply === "string" && reply.trim().length > 0) {
              return NextResponse.json({
                response: reply.trim(),
                provider: "gemini",
                model,
              });
            }
          }
        } catch {
          // Continue to next model in fallback chain
        }
      }
    }

    // 4. Intelligent Context-Aware Engine (Handles both portfolio & technical/general queries seamlessly)
    const q = rawContent.toLowerCase();
    let fallbackReply = "";

    // Technical question: Node.js async & event loop
    if (q.includes("node") && (q.includes("async") || q.includes("event loop") || q.includes("operation"))) {
      fallbackReply = `Node.js handles asynchronous operations using an **event-driven, non-blocking I/O model** powered by **libuv** and the V8 JavaScript engine.

1. **Single-Threaded Call Stack:** Synchronous JavaScript execution runs on a single main thread.
2. **Background Thread Pool / Kernel Delegation:** Heavy I/O operations (file system, network sockets, DNS) are delegated to the underlying operating system kernel or libuv's worker thread pool.
3. **Event Loop & Callback Queues:** As tasks finish, their callbacks are placed in specific queues (microtask queue for Promises/process.nextTick, macrotask queue for timers/I/O). The event loop continuously transfers completed callbacks back onto the call stack once it is empty.

This enables Node.js to comfortably service tens of thousands of concurrent network connections without thread-per-client overhead.`;

    // Technical question: SQL vs NoSQL
    } else if (q.includes("sql") && q.includes("nosql")) {
      fallbackReply = `Here is the core difference between SQL and NoSQL:

• **Data Modeling & Schema:** **SQL databases** (like PostgreSQL) are relational and require structured, predefined schemas with strict data types and foreign key relationships. **NoSQL databases** (like MongoDB, Redis, Cassandra) are non-relational and offer dynamic schemas using documents, key-value pairs, or graphs.
• **Scaling & Guarantees:** SQL systems excel at **ACID transactions** and relational integrity, typically scaling vertically. NoSQL systems are optimized for horizontal partitioning (sharding) across distributed clusters where rapid schema evolution or massive throughput is required.`;

    // Technical question: AI Agents
    } else if (q.includes("agent") || q.includes("ai agent")) {
      fallbackReply = `An **AI agent** is an autonomous software system that uses a large language model (LLM) as its reasoning engine to perceive an environment, formulate multi-step plans, make decisions, execute external tools/APIs, and evaluate feedback to accomplish goals.

Key components of an agentic architecture:
1. **Perception & Goal:** Interprets user intent or system state.
2. **Planning & Decomposition:** Breaks complex objectives into manageable sub-tasks.
3. **Tool Calling & Execution:** Interacts with databases, APIs, code interpreters, and web services.
4. **Memory:** Maintains short-term conversation context and long-term vector/state memory.
5. **Reflection / Self-Correction:** Evaluates execution results and iteratively adjusts its approach.`;

    // Technical question: REST vs GraphQL
    } else if (q.includes("rest") && q.includes("graphql")) {
      fallbackReply = `Here is how REST and GraphQL compare:

• **Endpoints & Over-fetching:** **REST** uses fixed endpoints per resource (e.g. \`GET /api/users\`), which often results in over-fetching or under-fetching data. **GraphQL** exposes a single endpoint where clients request the exact fields and relationships they need in a single query.
• **Caching & Simplicity:** REST leverages native HTTP caching (\`ETags\`, status codes \`200\`, \`404\`, \`500\`), making it predictable and straightforward. GraphQL requires specialized client-side cache normalization (like Apollo Client) and moves complexity to the server query resolver layer.`;

    // Technical question: React Hooks
    } else if (q.includes("react hook") || (q.includes("hook") && q.includes("react"))) {
      fallbackReply = `**React Hooks** are functions that let functional components manage state, side effects, and lifecycle events without writing class components.

Core hooks:
• \`useState\`: Tracks local state across renders.
• \`useEffect\`: Coordinates side effects (data fetching, DOM listeners, timers).
• \`useMemo\` & \`useCallback\`: Cache computed values and function references to prevent unnecessary recalculations or re-renders.
• \`useRef\`: Persists mutable values without triggering a re-render and references DOM nodes directly.`;

    // General: Joke
    } else if (q.includes("joke") || q.includes("humor") || q.includes("funny")) {
      fallbackReply = `Why do programmers always prefer dark mode?

Because light attracts bugs! 😄`;

    // General: Quantum Computing
    } else if (q.includes("quantum")) {
      fallbackReply = `**Quantum computing** is a fundamentally new type of computation that uses quantum mechanics to process information.

Instead of classical bits (which must be strictly **0** or **1**), quantum computers use **qubits** that can exist in a state of **superposition** (representing probabilities of both 0 and 1 simultaneously). Paired with **entanglement**, this allows quantum computers to evaluate vast combinatorial possibilities concurrently—making them extraordinarily powerful for cryptography, molecular modeling, and complex optimization.`;

    // General: Java vs JavaScript
    } else if (q.includes("java") && q.includes("javascript")) {
      fallbackReply = `Despite the similar names, **Java** and **JavaScript** are entirely distinct technologies:

• **Java:** A statically typed, class-based, object-oriented language compiled to bytecode that runs on the Java Virtual Machine (JVM). It is widely used for enterprise backends, Android development, and large-scale distributed systems.
• **JavaScript:** A dynamically typed, interpreted/JIT-compiled, multi-paradigm language originally built for browsers and now widely used across both frontends and backends (via Node.js).`;

    // General: Career in AI
    } else if (q.includes("career") || (q.includes("job") && q.includes("ai"))) {
      fallbackReply = `Career opportunities in AI engineering are growing rapidly across three main paths:

1. **AI / ML Engineers:** Design pipelines, fine-tune models, and deploy production inference endpoints.
2. **AI Systems / Backend Engineers:** Integrate LLMs, build multi-agent loops, manage vector databases, and engineer low-latency retrieval-augmented generation (RAG) architectures.
3. **Applied AI Product Engineers:** Build user interfaces, autonomous workflows, and intelligent software applications that leverage foundation models to solve specific domain problems.`;

    // Portfolio: Who is Rudra?
    } else if (q.includes("who is rudra") || q.includes("tell me about rudra") || q.includes("background") || q.includes("who are you")) {
      fallbackReply = `**Rudra Pahune** is a Backend Developer, AI Enthusiast, and engineering student pursuing his **B.Tech in Artificial Intelligence & Data Science** at **Yeshwantrao Chavan College of Engineering (YCCE), Nagpur** (graduating class of 2029).

He is deeply passionate about understanding software from first principles—architecting scalable backend systems, designing robust relational databases with PostgreSQL, and building production-grade AI applications like **Intervia**.`;

    // Portfolio: Intervia
    } else if (q.includes("intervia")) {
      fallbackReply = `**Intervia** is Rudra's flagship full-stack project: an AI-powered technical interview simulation platform.

Key highlights:
• **AI Interview Room:** Generates adaptive coding questions and evaluates responses in real time.
• **LeetCode-Style Editor:** In-browser coding environment with syntax highlighting and interactive execution simulation.
• **Secure Auth Flow:** 6-digit OTP email authentication.
• **Tech Stack:** React, Node.js, Express, Prisma ORM, PostgreSQL, and Supabase.`;

    // Portfolio: What is he currently building?
    } else if (q.includes("building") || q.includes("learning") || q.includes("currently exploring")) {
      fallbackReply = `Rudra is currently focused on:
1. **Intervia Platform:** Advancing the interactive AI interview evaluation and voice-driven question simulation loops.
2. **Multi-Agent Coordination Engine:** Researching autonomous agent execution loops that break complex tasks into verifiable sub-steps.
3. **High-Throughput Event Broker:** Designing distributed messaging patterns targeting sub-50ms latency.
4. **Advanced Backend Systems:** Deepening mastery of PostgreSQL index tuning, database isolation levels, and REST API idempotency.`;

    // Portfolio: Tech Stack / Skills
    } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("languages")) {
      fallbackReply = `Rudra's core engineering tech stack includes:

• **Languages:** Java, Python, JavaScript, C
• **Backend:** Node.js, Express.js, REST APIs
• **Databases:** PostgreSQL, Supabase, Prisma ORM
• **Frontend:** React, Next.js, Tailwind CSS, HTML/CSS
• **Tools:** Git, GitHub, VS Code, Postman, Vercel
• **AI & Systems:** Generative AI, AI Agents, Machine Learning, Data Structures & Algorithms`;

    // Portfolio: Contact
    } else if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("linkedin")) {
      fallbackReply = `You can connect with Rudra directly:
• **Email:** [rudrapahune@gmail.com](mailto:rudrapahune@gmail.com)
• **LinkedIn:** [linkedin.com/in/rudra-pahune-0b1257279/](https://www.linkedin.com/in/rudra-pahune-0b1257279/)
• **GitHub:** [github.com/rudrapahune-dev](https://github.com/rudrapahune-dev)
• **Direct Message:** Submit via the contact form on this portfolio!`;

    // Universal Helpful Fallback
    } else {
      fallbackReply = `I am Rudra's AI assistant. I can answer questions about Rudra's engineering background, projects (like Intervia), skills, and education, as well as general technical questions about programming, backend architectures, AI agents, databases, or computer science concepts.

Feel free to ask me anything—whether it's about Rudra's work or a technical topic you'd like explained!`;
    }

    return NextResponse.json({
      response: fallbackReply,
      provider: "local-intelligent-engine",
    });
  } catch (err) {
    console.error("AI chat endpoint error:", err);
    return NextResponse.json(
      { error: "Internal assistant error. Please retry." },
      { status: 500 }
    );
  }
}
