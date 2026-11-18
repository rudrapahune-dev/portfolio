import { NextResponse } from "next/server";

// Serverless In-Memory Rate Limiter (Fallback for when Redis/KV is not attached)
// Limit: 5 submissions per 15 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkLocalRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxLimit = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxLimit) {
    return false;
  }

  record.count++;
  return true;
}

// Optional distributed rate limiting via Upstash Redis REST API
// If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in Vercel,
// this enforces true global limits across all serverless regions and instances.
async function checkDistributedRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // If Upstash is not configured, fall back to instance limiter
    return checkLocalRateLimit(ip);
  }

  try {
    const key = `rate_limit:contact:${ip}`;
    const windowSeconds = 15 * 60; // 15 min
    const maxLimit = 5;

    // Upstash pipeline: INCR then EXPIRE if new
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSeconds],
      ]),
    });

    if (response.ok) {
      const results = await response.json();
      const currentCount = results[0]?.result;
      if (typeof currentCount === "number" && currentCount > maxLimit) {
        return false;
      }
      return true;
    }
  } catch (err) {
    console.warn("Distributed rate limiter error, falling back to local:", err);
  }

  return checkLocalRateLimit(ip);
}

// Sanitize string to prevent Header Injection (CRLF) and strip dangerous control characters
function sanitizeHeader(val: string): string {
  return val.replace(/[\r\n\x00-\x1F\x7F]/g, " ").trim();
}

// Strip HTML tags and control chars from message body
function sanitizeBody(val: string): string {
  return val
    .replace(/<[^>]*>?/gm, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    // 1. Client IP Extraction (handles Vercel Edge / proxies)
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwarded
      ? forwarded.split(",")[0].trim()
      : realIp || "127.0.0.1";

    // 2. Rate limiting check (distributed if configured, local fallback)
    const isAllowed = await checkDistributedRateLimit(clientIp);
    if (!isAllowed) {
      return NextResponse.json(
        {
          error:
            "Too many messages sent from this network. Please wait 15 minutes before sending another message, or email directly at rudrapahune@gmail.com.",
        },
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

    // 3. Honeypot check (anti-bot)
    // If the hidden 'website' field is filled, reject silently to discard spam bots
    if (body.website && String(body.website).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    const { name, email, subject, message } = body;

    // 4. Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (Name, Email, Subject, Message) are required." },
        { status: 400 }
      );
    }

    const rawName = String(name).trim();
    const rawEmail = String(email).trim();
    const rawSubject = String(subject).trim();
    const rawMessage = String(message).trim();

    // Length constraints
    if (rawName.length < 2 || rawName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    // RFC 5322 standard email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (rawEmail.length > 100 || !emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (rawSubject.length < 3 || rawSubject.length > 200) {
      return NextResponse.json(
        { error: "Subject must be between 3 and 200 characters." },
        { status: 400 }
      );
    }

    if (rawMessage.length < 10 || rawMessage.length > 3000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 3,000 characters." },
        { status: 400 }
      );
    }

    // 5. Input sanitization
    const cleanName = sanitizeHeader(rawName);
    const cleanEmail = sanitizeHeader(rawEmail);
    const cleanSubject = sanitizeHeader(rawSubject);
    const cleanMessage = sanitizeBody(rawMessage);

    // 6. Resend Email Delivery
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL || "rudrapahune@gmail.com";
    // For Resend: use verified domain e.g. contact@rudrapahune.dev or onboarding@resend.dev during testing
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    // If Resend API Key is not yet configured, return honest status
    if (!resendApiKey) {
      console.warn(
        "[Contact Route] RESEND_API_KEY is not configured in environment variables. Email could not be sent."
      );
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error:
            "The direct contact service is currently awaiting email provider configuration (RESEND_API_KEY). Please send an email directly to rudrapahune@gmail.com.",
        },
        { status: 503 }
      );
    }

    // Call Resend REST API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: cleanEmail,
        subject: `[Portfolio] ${cleanSubject} - ${cleanName}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Portfolio Contact</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f7f7; color: #141512;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e2e2; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #141512; padding: 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Portfolio Inquiry</h2>
      <p style="margin: 6px 0 0; font-size: 13px; color: #C5E86C;">rudrapahune.dev contact transmission</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #777; width: 80px;">From:</td>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #141512;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #777;">Email:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #141512;"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #0066cc; text-decoration: none;">${escapeHtml(cleanEmail)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #777;">Subject:</td>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #141512;">${escapeHtml(cleanSubject)}</td>
        </tr>
      </table>
      <div style="background-color: #f5f5f5; border-left: 3px solid #C5E86C; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #222;">${escapeHtml(cleanMessage)}</p>
      </div>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
        <p style="margin: 0;">Sent via Portfolio Contact Form on ${new Date().toUTCString()}</p>
        <p style="margin: 4px 0 0;">Reply directly to this email to respond to ${escapeHtml(cleanName)}.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
        text: `New Portfolio Message\n\nFrom: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\nDate: ${new Date().toUTCString()}\n\nMessage:\n${cleanMessage}\n`,
      }),
    });

    if (!resendResponse.ok) {
      const errData = await resendResponse.json().catch(() => ({}));
      console.error("[Contact Route] Resend API error:", errData);
      return NextResponse.json(
        {
          error:
            "Failed to transmit email through provider. Please reach out directly to rudrapahune@gmail.com.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        delivered: true,
        message: "Your message was delivered successfully to Rudra's inbox!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact Route] Unexpected error:", err);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred. Please email rudrapahune@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
