"use client";

import { useState } from "react";
import Link from "next/link";
import { groupByCategory } from "@/lib/services";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";

export default function HomePage() {
  const { lang, t } = useLanguage();
  const grouped = groupByCategory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Masthead */}
      <header className="border-b border-line sticky top-0 bg-paper/95 backdrop-blur z-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display italic text-xl sm:text-2xl text-seal">Multi</span>
            <span className="font-display text-xl sm:text-2xl">Sheba</span>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <a href="#services" className="hover:text-seal">{t("nav_services")}</a>
            <Link href="/faq" className="hover:text-seal">{t("nav_faq")}</Link>
            <a
              href="https://wa.me/8801000000000"
              className="rounded-sm bg-ink text-paper px-4 py-2 hover:bg-seal transition-colors"
            >
              {t("nav_whatsapp")}
            </a>
            <LangToggle />
          </nav>

          <div className="flex sm:hidden items-center gap-3">
            <LangToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              className="h-9 w-9 flex items-center justify-center border border-ink/20 rounded-sm"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden border-t border-line px-4 py-3 flex flex-col gap-3 text-sm font-medium bg-paper">
            <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-seal">{t("nav_services")}</a>
            <Link href="/faq" onClick={() => setMenuOpen(false)} className="hover:text-seal">{t("nav_faq")}</Link>
            <a
              href="https://wa.me/8801000000000"
              className="rounded-sm bg-ink text-paper px-4 py-2 text-center hover:bg-seal transition-colors"
            >
              {t("nav_whatsapp")}
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-14">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 sm:gap-10 items-end">
          <div>
            <p className="font-mono text-[11px] sm:text-xs tracking-widest uppercase text-seal mb-3 sm:mb-4">
              {t("hero_eyebrow")}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] sm:leading-[1.1] max-w-xl">
              {t("hero_title_pre")}
              <em className="italic text-seal">{t("hero_title_em")}</em>
              {t("hero_title_post")}
            </h1>
            <p className="mt-4 sm:mt-5 max-w-md text-ink/70 leading-relaxed text-sm sm:text-base">
              {t("hero_desc")}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-sm bg-seal text-paper px-5 sm:px-6 py-3 font-medium hover:bg-sealDeep transition-colors text-sm sm:text-base"
              >
                {t("hero_cta_services")}
              </a>
              <a
                href="#how"
                className="rounded-sm border border-ink/20 px-5 sm:px-6 py-3 font-medium hover:border-seal hover:text-seal transition-colors text-sm sm:text-base"
              >
                {t("hero_cta_how")}
              </a>
            </div>
          </div>

          <div
            aria-hidden
            className="hidden md:flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-[3px] border-brass text-brass rotate-[-8deg] select-none"
            style={{ borderStyle: "double" }}
          >
            <div className="text-center font-mono leading-tight">
              <div className="text-[10px] tracking-[0.2em] uppercase">{t("stamp_verified")}</div>
              <div className="text-lg font-semibold my-1">{t("stamp_order")}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase">{t("stamp_tracked")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service ledger */}
      <section id="services" className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 sm:pb-20">
        {grouped.map(({ category, category_bn, items }) => (
          <div key={category} className="mb-10 sm:mb-12">
            <div className="flex items-baseline gap-3 mb-4 flex-wrap">
              <h2 className="font-display text-lg sm:text-xl">{lang === "bn" ? category_bn : category}</h2>
              <span className="ledger-rule flex-1 min-w-[24px]" />
              <span className="font-mono text-xs text-ink/50 whitespace-nowrap">
                {items.length} {t("services_suffix")}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
              {items.map((s) => (
                <Link
                  key={s.slug}
                  href={`/order/${s.slug}`}
                  className="bg-paper p-4 sm:p-5 hover:bg-seal/5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3 className="font-medium leading-snug group-hover:text-seal text-sm sm:text-base">
                      {lang === "bn" ? s.name_bn : s.name}
                    </h3>
                    <span className="font-mono text-sm whitespace-nowrap text-brass shrink-0">
                      ৳{s.price}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-ink/60 leading-relaxed">
                    {lang === "bn" ? s.summary_bn : s.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wide text-ink/40">
                      {t("turnaround_label")}: {lang === "bn" ? s.turnaround_bn : s.turnaround}
                    </p>
                    {s.deliveryMode === "physical" && (
                      <span className="font-mono text-[10px] uppercase tracking-wide px-1.5 py-0.5 border border-clay/40 text-clay rounded-sm">
                        {lang === "bn" ? "পিকআপ/কুরিয়ার" : "Pickup/Courier"}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {(t("how_steps") as [string, string][]).map(([title, desc], i) => (
            <div key={title}>
              <div className="font-mono text-xs text-brass mb-2">0{i + 1}</div>
              <h3 className="font-display text-base sm:text-lg mb-1">{title}</h3>
              <p className="text-xs sm:text-sm text-paper/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 text-xs text-ink/50 flex flex-col sm:flex-row flex-wrap justify-between gap-3 sm:gap-4">
        <span>{t("footer_note")}</span>
        <a href="mailto:hello@multisheba.example" className="hover:text-seal">hello@multisheba.example</a>
      </footer>
    </main>
  );
}
