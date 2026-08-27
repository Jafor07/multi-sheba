"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center border border-ink/20 rounded-sm overflow-hidden text-xs font-mono">
      <button
        onClick={() => setLang("bn")}
        className={`px-2 py-1 ${lang === "bn" ? "bg-seal text-paper" : "hover:bg-line/60"}`}
        aria-pressed={lang === "bn"}
      >
        বাংলা
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 ${lang === "en" ? "bg-seal text-paper" : "hover:bg-line/60"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
