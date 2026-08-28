"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/lib/faq";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { siteLinks } from "@/lib/siteConfig";

export default function FaqPage() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Link href="/" className="font-mono text-xs text-ink/50 hover:text-seal">
            {t("back_to_services")}
          </Link>
          <LangToggle />
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-display text-3xl mb-2">{t("faq_title")}</h1>
        <p className="text-ink/60 mb-8">{t("faq_subtitle")}</p>

        <div className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{lang === "bn" ? f.q_bn : f.q}</span>
                  <span className="font-mono text-seal shrink-0">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p className="pb-4 text-ink/70 leading-relaxed">
                    {lang === "bn" ? f.a_bn : f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 border border-line rounded-sm p-5 text-center">
          <p className="text-sm text-ink/60 mb-3">
            {lang === "bn" ? "আরও প্রশ্ন আছে?" : "Still have a question?"}
          </p>
          <a
            href={siteLinks.whatsapp}
            className="inline-block rounded-sm bg-seal text-paper px-5 py-2.5 font-medium hover:bg-sealDeep"
          >
            {t("nav_whatsapp")}
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
