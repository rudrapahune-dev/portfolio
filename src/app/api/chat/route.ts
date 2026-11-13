import { NextResponse } from "next/server";
import { personalInfo, skills, projects, timeline } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

// In-memory rate limiting
const ipRequests = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 30; // max requests
  const windowMs = 60 * 1000; // 1 minute

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
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Messages array is required." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = String(lastMessage?.content || "").trim().toLowerCase();

    // Check if an external LLM API key is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `You are the personal AI digital twin for Rudra Pahune.
CRITICAL RULES:
- ONLY answer based on verified facts about Rudra.
- NEVER fabricate internships, work history, achievements, or claims not stated here.
- If you don't know something, politely state that you only have information verified by Rudra.
- Maintain a warm, friendly, concise, and professional tone.

VERIFIED FACTS ABOUT RUDRA:
- Name: Rudra Pahune
- Roles: Backend Developer, AI & Data Science Engineering Student, Full-Stack Developer, Aspiring AI Engineer
- Education: B.Tech in Artificial Intelligence and Data Science at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur (Expected graduation: 2029)
- Technical Interests: Backend Development, AI, Machine Learning, Generative AI, AI Agents, DSA, Full-Stack Development
- Programming Languages: Java, JavaScript, Python, C
- Frontend: HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs
- Databases: PostgreSQL, Supabase, Prisma ORM
- Tools: Git, GitHub, VS Code, Postman, Vercel
- Currently Exploring: AI Agents, Generative AI, Backend Architecture, Machine Learning, Advanced DSA
- Key Project: Intervia — An AI-powered interview simulation platform featuring AI-driven question generation, interactive LeetCode-inspired coding environment, OTP email authentication, interview management dashboard, built with React, Node.js, Express.js, Prisma, PostgreSQL, Supabase, and Framer Motion.
- Contact: Use the contact form on this website or check the links section.`;

    if (geminiKey) {
      // Use Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${userQuery}` }],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return NextResponse.json({ response: reply });
        }
      }
    }

    // High quality built-in knowledge response engine (Zero-API fallback)
    let reply = "";

    if (userQuery.includes("who is") || userQuery.includes("about") || userQuery.includes("rudra")) {
      reply = `Rudra Pahune is a Backend Developer, Full-Stack Developer, and AI & Data Science Engineering student at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur (graduating 2029). He specializes in scalable backends, clean architecture, and modern AI technologies.`;
    } else if (userQuery.includes("intervia") || userQuery.includes("project")) {
      reply = `Intervia is Rudra's flagship project — an AI-powered interview simulator. It features realistic technical interview simulation with AI question generation, a LeetCode-style code editor, 6-digit OTP email verification, and an interview management dashboard. Built with React, Node.js, Express, Prisma, PostgreSQL, and Supabase.`;
    } else if (userQuery.includes("skill") || userQuery.includes("tech") || userQuery.includes("stack") || userQuery.includes("language")) {
      reply = `Rudra works with:
• Languages: Java, Python, JavaScript, C
• Frontend: React, Next.js, Tailwind CSS
• Backend: Node.js, Express.js, REST APIs
• Databases: PostgreSQL, Supabase, Prisma ORM
• Tools: Git, GitHub, VS Code, Postman, Vercel`;
    } else if (userQuery.includes("learning") || userQuery.includes("exploring") || userQuery.includes("future")) {
      reply = `Currently, Rudra is actively exploring AI Agents, Generative AI, resilient Backend Architecture, Machine Learning, and Advanced Data Structures & Algorithms (DSA).`;
    } else if (userQuery.includes("education") || userQuery.includes("college") || userQuery.includes("degree")) {
      reply = `Rudra is pursuing his B.Tech in Artificial Intelligence and Data Science at Yeshwantrao Chavan College of Engineering (YCCE) in Nagpur, India, with an expected graduation in 2029.`;
    } else if (userQuery.includes("contact") || userQuery.includes("reach") || userQuery.includes("email") || userQuery.includes("hire")) {
      reply = `You can easily reach Rudra through the Contact form right below on this portfolio, or connect via GitHub and LinkedIn!`;
    } else {
      reply = `I am Rudra's personal AI twin! You can ask me about his engineering background, his skills in Node.js/PostgreSQL/AI, his flagship project Intervia, or what he is currently learning. What would you like to know?`;
    }

    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
