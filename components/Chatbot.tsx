"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqs } from "@/lib/faq";
import { services } from "@/lib/services";

interface Message {
  from: "bot" | "user";
  text: string;
  serviceLink?: { slug: string; label: string };
}

const WHATSAPP_NUMBER = "8801000000000"; // TODO: replace with the real business number

function findAnswer(input: string, lang: "en" | "bn"): Message {
  const q = input.toLowerCase().trim();

  // 1. Try to match a specific service by name (English or Bangla)
  const matchedService = services.find((s) => {
    const nameEn = s.name.toLowerCase();
    const nameBn = s.name_bn;
    const firstWord = nameEn.split(" ")[0];
    return (firstWord.length > 3 && q.includes(firstWord)) || (q.length > 2 && nameBn.includes(q));
  });

  if (matchedService) {
    const name = lang === "bn" ? matchedService.name_bn : matchedService.name;
    const turnaround = lang === "bn" ? matchedService.turnaround_bn : matchedService.turnaround;
    const text =
      lang === "bn"
        ? `${name} - সার্ভিস চার্জ ৳${matchedService.price}, সময় লাগবে ${turnaround}। অর্ডার করতে নিচের লিংকে ক্লিক করুন।`
        : `${name} - service charge ৳${matchedService.price}, turnaround ${turnaround}. Tap below to order.`;
    return {
      from: "bot",
      text,
      serviceLink: { slug: matchedService.slug, label: lang === "bn" ? "অর্ডার করুন" : "Order this" },
    };
  }

  // 2. Try to match an FAQ by keyword
  const matchedFaq = faqs.find((f) => f.keywords.some((k) => q.includes(k.toLowerCase())));
  if (matchedFaq) {
    return { from: "bot", text: lang === "bn" ? matchedFaq.a_bn : matchedFaq.a };
  }

  // 3. Fallback
  return {
    from: "bot",
    text:
      lang === "bn"
        ? "এই বিষয়ে আমি নিশ্চিত নই - নিচে ট্যাপ করে সরাসরি হোয়াটসঅ্যাপে জিজ্ঞাসা করুন।"
        : "I'm not sure about that one - tap below to ask us directly on WhatsApp.",
  };
}

export default function Chatbot() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: t("chatbot_greeting") }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;
    const userMsg: Message = { from: "user", text: question };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: nextMessages.map((message) => ({
            role: message.from === "user" ? "user" : "assistant",
            content: message.text,
          })),
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok || !result.message) throw new Error("AI unavailable");
      setMessages((prev) => [...prev, { from: "bot", text: result.message! }]);
    } catch {
      setMessages((prev) => [...prev, findAnswer(question, lang)]);
    } finally {
      setIsLoading(false);
    }
  }

  const lastBotWantsWhatsapp =
    messages.length > 0 &&
    messages[messages.length - 1].from === "bot" &&
    messages[messages.length - 1].text.includes(lang === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp");

  return (
    <div className="fixed bottom-5 right-2 z-50 font-body sm:right-5">
      {open && (
        <div className="mb-3 flex h-[min(520px,calc(100vh-100px))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl shadow-ink/20">
          <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal font-mono text-xs font-semibold">AI</span>
              <div>
                <span className="block font-display text-base">{t("chatbot_title")}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">Online support</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white/65 hover:bg-white/10 hover:text-white">
              ×
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-paper/50 px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user" ? "rounded-br-md bg-seal text-white" : "rounded-bl-md border border-line bg-white text-ink shadow-sm"
                  }`}
                >
                  {m.text}
                  {m.serviceLink && (
                    <Link
                      href={`/order/${m.serviceLink.slug}`}
                      className="block mt-2 underline font-medium text-seal"
                      onClick={() => setOpen(false)}
                    >
                      {m.serviceLink.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-sm text-ink/50 shadow-sm">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            {lastBotWantsWhatsapp && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl bg-brass px-3 py-2.5 text-center text-sm font-semibold text-ink transition hover:brightness-95"
              >
                {t("chatbot_whatsapp_cta")}
              </a>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 border-t border-line bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot_placeholder")}
              className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-seal focus:ring-2 focus:ring-seal/10"
            />
            <button type="submit" disabled={isLoading} aria-label={t("chatbot_send")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-seal text-lg text-white transition hover:bg-sealDeep disabled:cursor-not-allowed disabled:opacity-50">
              ↑
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-seal text-2xl text-white shadow-xl shadow-seal/25 transition hover:-translate-y-1 hover:bg-sealDeep"
        aria-label={t("chatbot_open")}
      >
        {open ? "×" : "✦"}
      </button>
    </div>
  );
}
