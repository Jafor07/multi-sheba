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
        ? `${name} — সার্ভিস চার্জ ৳${matchedService.price}, সময় লাগবে ${turnaround}। অর্ডার করতে নিচের লিংকে ক্লিক করুন।`
        : `${name} — service charge ৳${matchedService.price}, turnaround ${turnaround}. Tap below to order.`;
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
        ? "এই বিষয়ে আমি নিশ্চিত নই — নিচে ট্যাপ করে সরাসরি হোয়াটসঅ্যাপে জিজ্ঞাসা করুন।"
        : "I'm not sure about that one — tap below to ask us directly on WhatsApp.",
  };
}

export default function Chatbot() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
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

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { from: "user", text: input.trim() };
    const botMsg = findAnswer(input, lang);
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  const lastBotWantsWhatsapp =
    messages.length > 0 &&
    messages[messages.length - 1].from === "bot" &&
    messages[messages.length - 1].text.includes(lang === "bn" ? "হোয়াটসঅ্যাপ" : "WhatsApp");

  return (
    <div className="fixed bottom-5 right-5 z-50 font-body">
      {open && (
        <div className="mb-3 w-[320px] max-w-[90vw] h-[420px] bg-paper border border-ink/20 rounded-sm shadow-xl flex flex-col overflow-hidden">
          <div className="bg-ink text-paper px-4 py-3 flex items-center justify-between">
            <span className="font-display text-sm">{t("chatbot_title")}</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-paper/70 hover:text-paper">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-sm px-3 py-2 text-sm max-w-[85%] leading-relaxed ${
                    m.from === "user" ? "bg-seal text-paper" : "bg-line/60 text-ink"
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
            {lastBotWantsWhatsapp && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center rounded-sm bg-seal text-paper px-3 py-2 text-sm font-medium hover:bg-sealDeep"
              >
                {t("chatbot_whatsapp_cta")}
              </a>
            )}
          </div>

          <form onSubmit={handleSend} className="border-t border-line p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatbot_placeholder")}
              className="flex-1 border border-line rounded-sm px-3 py-2 text-sm bg-paper focus:border-seal outline-none"
            />
            <button type="submit" className="rounded-sm bg-seal text-paper px-3 py-2 text-sm font-medium hover:bg-sealDeep">
              {t("chatbot_send")}
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full bg-seal text-paper h-14 w-14 shadow-xl flex items-center justify-center hover:bg-sealDeep transition-colors"
        aria-label={t("chatbot_open")}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
