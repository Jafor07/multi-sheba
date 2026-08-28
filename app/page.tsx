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
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Multi Sheba home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal font-mono text-sm font-semibold text-white shadow-lg shadow-seal/20">MS</span>
            <span className="font-display text-xl tracking-tight sm:text-2xl"><em className="text-seal">Multi</em> Sheba</span>
          </Link>
          <Link href="/track" className="px-3 py-2 rounded-lg text-ink/70 hover:text-ink hover:bg-canvas transition-colors">
  {t("nav_track")}
</Link>

          <div className="hidden items-center gap-7 sm:flex">
            <div className="flex items-center gap-6 text-sm font-medium text-ink/70">
              <a href="#services" className="transition-colors hover:text-seal">{t("nav_services")}</a>
              <Link href="/faq" className="transition-colors hover:text-seal">{t("nav_faq")}</Link>
            </div>
            <LangToggle />
            <a href="https://wa.me/8801000000000" className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition hover:-translate-y-0.5 hover:bg-seal">
              {t("nav_whatsapp")}
            </a>
          </div>

          <div className="flex items-center gap-3 sm:hidden">
            <LangToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-lg"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-white px-4 py-4 sm:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold">
            <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-seal">{t("nav_services")}</a>
            <Link href="/faq" onClick={() => setMenuOpen(false)} className="hover:text-seal">{t("nav_faq")}</Link>
            <a href="https://wa.me/8801000000000" className="rounded-xl bg-ink px-4 py-3 text-center text-white hover:bg-seal">
              {t("nav_whatsapp")}
            </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="hero-wash border-b border-line/80">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_310px]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-seal/20 bg-white/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-seal shadow-sm sm:text-xs">
              {t("hero_eyebrow")}
            </p>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
              {t("hero_title_pre")}
              <em className="italic text-seal">{t("hero_title_em")}</em>
              {t("hero_title_post")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
              {t("hero_desc")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
              <a
                href="#services"
                className="rounded-xl bg-seal px-5 py-3 font-semibold text-white shadow-xl shadow-seal/20 transition hover:-translate-y-0.5 hover:bg-sealDeep sm:px-6"
              >
                {t("hero_cta_services")}
              </a>
              <a
                href="#how"
                className="rounded-xl border border-ink/15 bg-white/70 px-5 py-3 font-semibold transition hover:border-seal hover:text-seal sm:px-6"
              >
                {t("hero_cta_how")}
              </a>
            </div>
          </div>

          <div
            aria-hidden
            className="soft-panel relative hidden h-64 w-full rotate-2 items-center justify-center rounded-[2rem] border-0 bg-ink p-8 text-white md:flex"
          >
            <div className="absolute inset-4 rounded-[1.5rem] border border-white/15" />
            <div className="relative text-center">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-brass">{t("stamp_verified")}</div>
              <div className="font-display text-4xl italic">{t("stamp_order")}</div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">{t("stamp_tracked")}</div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Service ledger */}
      <section id="services" className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        {grouped.map(({ category, category_bn, items }) => (
          <div key={category} className="mb-10 sm:mb-12">
            <div className="flex items-baseline gap-3 mb-4 flex-wrap">
              <h2 className="font-display text-lg sm:text-xl">{lang === "bn" ? category_bn : category}</h2>
              <span className="ledger-rule flex-1 min-w-[24px]" />
              <span className="font-mono text-xs text-ink/50 whitespace-nowrap">
                {items.length} {t("services_suffix")}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((s) => (
                <Link
                  key={s.slug}
                  href={`/order/${s.slug}`}
                  className="soft-panel group rounded-2xl p-5 transition duration-200 hover:-translate-y-1 hover:border-seal/30 hover:shadow-xl hover:shadow-seal/10 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3 className="font-medium leading-snug group-hover:text-seal text-sm sm:text-base">
                      {lang === "bn" ? s.name_bn : s.name}
                    </h3>
                    <span className="whitespace-nowrap rounded-full bg-mint px-3 py-1 font-mono text-sm font-semibold text-seal shrink-0">
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
