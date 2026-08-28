import { NextResponse } from "next/server";
import { faqs } from "@/lib/faq";
import { services } from "@/lib/services";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[]; lang?: "en" | "bn" };
    const messages = body.messages?.slice(-8) ?? [];
    const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ configured: false }, { status: 503 });
    }

    const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
    const model = process.env.AI_MODEL || "gpt-4o-mini";
    const language = body.lang === "bn" ? "Bangla" : "English";
    const serviceContext = services
      .map((service) => `${service.name} (${service.name_bn}): ৳${service.price}, ${service.turnaround}`)
      .join("\n");
    const faqContext = faqs.map((faq) => `Q: ${faq.q}\nA: ${faq.a}`).join("\n\n");

    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content: `You are the helpful customer support assistant for Multi Sheba, a Bangladesh paperwork service. Reply in ${language}. Be concise, warm, and practical. Only state prices, turnaround times, and policies supported by the context below. If you cannot answer from the context, say so and suggest WhatsApp. Never invent government fees or promise approval.\n\nSERVICES:\n${serviceContext}\n\nFAQ:\n${faqContext}`,
          },
          ...messages.filter((message) => message.role === "user" || message.role === "assistant"),
        ],
      }),
    });

    if (!upstream.ok) {
      return NextResponse.json({ configured: true, error: "AI service unavailable" }, { status: 502 });
    }

    const result = (await upstream.json()) as { choices?: [{ message?: { content?: string } }] };
    const content = result.choices?.[0]?.message?.content?.trim();
    if (!content) return NextResponse.json({ configured: true, error: "Empty AI response" }, { status: 502 });
    return NextResponse.json({ configured: true, message: content });
  } catch {
    return NextResponse.json({ configured: true, error: "Unable to reach AI service" }, { status: 500 });
  }
}
