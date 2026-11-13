import { NextResponse } from "next/server";
import { personalInfo, skills, projects, buildingAndExploring } from "@/config/portfolio";
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

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Message history is required." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = String(lastMessage?.content || "").trim().toLowerCase();

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `You are "Rudra's AI Assistant", representing Rudra Pahune and his developer portfolio.
CRITICAL RULES:
1. ONLY answer using verified facts about Rudra provided below.
2. NEVER fabricate internships, employment history, certifications, awards, statistics, or claims not stated here.
3. If asked about something not covered in these facts, politely and honestly state that you only have information verified by Rudra.
4. Maintain a warm, confident, slightly developer-oriented personality.
5. Do NOT over-emphasize or excessively talk about Intervia unless the user specifically asks about it. Represent his COMPLETE skillset and journey.
6. Use Markdown formatting (bullet points, bold text, code spans like \`Node.js\`) when beneficial.

VERIFIED FACTS:
- Name: Rudra Pahune
- Roles: Backend Developer, AI Enthusiast, Full-Stack Developer, Problem Solver
- College: B.Tech in Artificial Intelligence & Data Science at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur (Expected Graduation: 2029)
- Core Focus: Backend Architecture, Artificial Intelligence, Generative AI, AI Agents, Database Design, System Design, Data Structures & Algorithms
- Languages: Java, Python, JavaScript, C
- Frontend: HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs
- Databases: PostgreSQL, Supabase, Prisma ORM
- Tools: Git, GitHub, VS Code, Postman, Vercel
- What He's Building & Exploring:
  • Backend Engineering (modular RESTful architectures)
  • AI Agents (autonomous multi-step execution loops)
  • Generative AI (LLM workflows, streaming, prompt engineering)
  • Machine Learning (algorithms, predictive modeling)
  • Advanced DSA (graph algorithms, dynamic programming)
  • Full-Stack Development (Next.js, TypeScript, PostgreSQL)
- Projects:
  • Intervia: An AI-powered technical interview simulation platform featuring an interactive code editor, AI-driven question generation, and OTP email auth. Built with React, Node.js, Express, Prisma, PostgreSQL, Supabase.
  • Multi-Agent Coordination Engine (Planned research into autonomous workflows)
  • High-Throughput Event Broker (Planned backend messaging architecture)
- Social Profiles:
  • GitHub: https://github.com/rudrapahune-dev
  • LinkedIn: https://www.linkedin.com/in/rudra-pahune-0b1257279/
  • Email: rudrapahune@gmail.com`;

    // 1. If Gemini API is configured
    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${lastMessage.content}` }],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ response: reply.trim() });
          }
        }
      } catch (err) {
        console.warn("External Gemini API call failed, falling back to local engine:", err);
      }
    }

    // 2. High-Quality Multi-Intent Response Engine (Zero-API Fallback)
    let reply = "";

    // Question 1: Who is Rudra?
    if (
      userQuery.includes("who is rudra") ||
      userQuery.includes("tell me about rudra") ||
      userQuery.includes("who are you") ||
      userQuery.includes("introduction") ||
      userQuery === "who is rudra?"
    ) {
      reply = `**Rudra Pahune** is a Backend Developer, Full-Stack Developer, and AI & Data Science Engineering student at **Yeshwantrao Chavan College of Engineering (YCCE), Nagpur** (graduating class of 2029).

He is deeply passionate about understanding what happens *under the hood*—deconstructing event loops, architecting scalable backend systems, designing relational databases, and integrating intelligent AI agent workflows into production software.`;

    // Question 2: What technologies does he work with?
    } else if (
      userQuery.includes("technolog") ||
      userQuery.includes("tech stack") ||
      userQuery.includes("skills") ||
      userQuery.includes("languages") ||
      userQuery.includes("what does he use") ||
      userQuery === "what technologies does he work with?"
    ) {
      reply = `Rudra works across modern backend, frontend, and database systems:

• **Programming Languages:** Java, Python, JavaScript, C  
• **Backend:** \`Node.js\`, \`Express.js\`, REST APIs  
• **Databases & ORMs:** \`PostgreSQL\`, \`Supabase\`, \`Prisma ORM\`  
• **Frontend:** \`React\`, \`Next.js\`, \`Tailwind CSS\`, HTML/CSS  
• **Tools & Platforms:** Git, GitHub, VS Code, Postman, Vercel  
• **AI & Algorithms:** Generative AI, AI Agents, Machine Learning, Data Structures & Algorithms`;

    // Question 3: What kind of developer is he?
    } else if (
      userQuery.includes("kind of developer") ||
      userQuery.includes("what kind") ||
      userQuery.includes("philosophy") ||
      userQuery.includes("developer personality") ||
      userQuery === "what kind of developer is he?"
    ) {
      reply = `Rudra is a **foundations-first, systems-oriented developer**. 

Rather than relying blindly on abstractions, he values understanding how software operates internally—from database index strategies and transaction boundaries to asynchronous event lifecycles. He combines rigorous computer science fundamentals (DSA, systems design) with practical engineering execution in modern TypeScript and Node.js.`;

    // Question 4: Tell me about his projects
    } else if (
      userQuery.includes("projects") ||
      userQuery.includes("what has he built") ||
      userQuery.includes("work showcase") ||
      userQuery === "tell me about his projects."
    ) {
      reply = `Rudra focuses on building real-world software and architectural blueprints:

1. **Intervia (Flagship Project):** An AI-powered interview simulation platform featuring realistic AI question generation, a LeetCode-inspired in-browser code editor, 6-digit OTP email verification, and session analytics. Built with \`React\`, \`Node.js\`, \`Express\`, \`Prisma\`, \`PostgreSQL\`, and \`Supabase\`.
2. **Multi-Agent Coordination Engine (Active Research):** Exploring autonomous agent execution loops that break complex tasks into verifiable sub-steps.
3. **High-Throughput Event Broker (Architecture Design):** A distributed backend messaging design targeting sub-50ms global response latencies.

You can inspect the source code of his projects on his [GitHub profile](https://github.com/rudrapahune-dev).`;

    // Specific Intervia inquiry
    } else if (userQuery.includes("intervia")) {
      reply = `**Intervia** is an AI-powered technical interview simulation platform that Rudra is developing. 

Key capabilities:
• Real-time AI-generated technical interview questions  
• LeetCode-inspired coding environment with syntax highlighting  
• User authentication with 6-digit OTP email verification  
• Dynamic interview room and session evaluation  
• Built using \`React\`, \`Node.js\`, \`Express.js\`, \`Prisma\`, \`PostgreSQL\`, and \`Supabase\`.`;

    // Question 5: What is he currently learning/building?
    } else if (
      userQuery.includes("learning") ||
      userQuery.includes("currently exploring") ||
      userQuery.includes("building") ||
      userQuery.includes("future") ||
      userQuery === "what is he currently learning?"
    ) {
      reply = `Rudra is currently focusing on six active technical areas:

• **Backend Engineering:** Resilient RESTful micro-architectures with strict transaction boundaries.  
• **AI Agents:** Autonomous agent loops with tool-calling and execution memory.  
• **Generative AI:** Integrating LLMs with structured JSON responses and streaming pipelines.  
• **Machine Learning:** Algorithmic modeling and predictive data patterns.  
• **Advanced DSA:** Graph algorithms, dynamic programming, and asymptotic complexity optimization.  
• **Full-Stack Development:** End-to-end type-safe apps with Next.js, TypeScript, and PostgreSQL.`;

    // Question 6: How can I contact him?
    } else if (
      userQuery.includes("contact") ||
      userQuery.includes("reach") ||
      userQuery.includes("email") ||
      userQuery.includes("hire") ||
      userQuery.includes("linkedin") ||
      userQuery === "how can i contact him?"
    ) {
      reply = `You can easily connect with Rudra through:

• **Direct Email:** [rudrapahune@gmail.com](mailto:rudrapahune@gmail.com)  
• **LinkedIn:** [linkedin.com/in/rudra-pahune-0b1257279/](https://www.linkedin.com/in/rudra-pahune-0b1257279/)  
• **GitHub:** [github.com/rudrapahune-dev](https://github.com/rudrapahune-dev)  
• **Contact Form:** You can also submit a message directly via the contact form at the bottom of this portfolio!`;

    // Education
    } else if (userQuery.includes("education") || userQuery.includes("college") || userQuery.includes("degree") || userQuery.includes("ycce")) {
      reply = `Rudra is pursuing his **B.Tech in Artificial Intelligence and Data Science** at **Yeshwantrao Chavan College of Engineering (YCCE)** in Nagpur, India, with an expected graduation in **2029**.`;

    // Backend specific
    } else if (userQuery.includes("backend") || userQuery.includes("node") || userQuery.includes("database") || userQuery.includes("postgres")) {
      reply = `Backend engineering is Rudra's primary focus. He builds with:
• **Runtime & Frameworks:** \`Node.js\`, \`Express.js\`, and Next.js Route Handlers  
• **Databases:** \`PostgreSQL\` hosted via \`Supabase\`, managed with \`Prisma ORM\`  
• **Design Priorities:** ACID compliance, clean schema migrations, REST API idempotency, and secure authentication (JWT, OTP).`;

    // Fallback response
    } else {
      reply = `I am Rudra's AI assistant. I have verified information regarding his engineering background, backend & full-stack skillset, education at YCCE Nagpur, and current projects.

Feel free to ask me questions like:
• *"Who is Rudra?"*
• *"What technologies does he work with?"*
• *"What kind of developer is he?"*
• *"Tell me about his projects."*
• *"How can I contact him?"*`;
    }

    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("AI chat endpoint error:", err);
    return NextResponse.json(
      { error: "Internal assistant error. Please retry." },
      { status: 500 }
    );
  }
}
