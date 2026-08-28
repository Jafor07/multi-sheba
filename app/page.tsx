"use client";

import { useState } from "react";
import Link from "next/link";
import { groupByCategory, services } from "@/lib/services";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { popularServiceSlugs, siteConfig, siteLinks, testimonials, trustStats, turnaroundOverview } from "@/lib/siteConfig";

export default function HomePage() {
  const { lang, t } = useLanguage();
  const grouped = groupByCategory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredServices = services.filter((service) => {
    const search = query.toLowerCase().trim();
    return !search || `${service.name} ${service.name_bn} ${service.summary} ${service.summary_bn}`.toLowerCase().includes(search);
  });
  const popularServices = popularServiceSlugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);

  return (
    <main className="min-h-screen">
      {/* Masthead */}
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Multi Sheba home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal font-mono text-sm font-semibold text-white shadow-lg shadow-seal/20">MS</span>
            <span className="font-display text-xl tracking-tight sm:text-2xl"><em className="text-seal">Multi</em> Sheba</span>
          </Link>
          <div className="hidden text-right text-[11px] leading-tight text-ink/55 md:block">
            <p className="font-semibold text-ink/75">কাউন্টার নং ০১ · {siteConfig.address_bn}</p>
            <p>{siteConfig.openingTime} - {siteConfig.closingTime} · <a href={siteLinks.phone} className="hover:text-seal">{siteConfig.phone}</a></p>
          </div>
          <Link href="/track" className="rounded-lg px-3 py-2 text-ink/70 transition-colors hover:bg-canvas hover:text-ink">
            {t("nav_track")}
          </Link>

          <div className="hidden items-center gap-7 sm:flex">
            <div className="flex items-center gap-6 text-sm font-medium text-ink/70">
              <a href="#services" className="transition-colors hover:text-seal">{t("nav_services")}</a>
              <Link href="/faq" className="transition-colors hover:text-seal">{t("nav_faq")}</Link>
            </div>
            <LangToggle />
            <a href={siteLinks.whatsapp} className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition hover:-translate-y-0.5 hover:bg-seal">
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
            <a href={siteLinks.whatsapp} className="rounded-xl bg-ink px-4 py-3 text-center text-white hover:bg-seal">
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

      <section aria-label="Trust statistics" className="border-b border-line bg-white/70">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-line px-4 py-5 sm:px-6">
          {trustStats.map((stat) => <div key={stat.value} className="px-3 text-center first:pl-0 last:pr-0"><p className="font-display text-xl text-seal sm:text-2xl">{lang === "bn" ? stat.value : stat.value.replace("৫০০+", "500+").replace("২০১৫", "2015").replace("১০০%", "100%")}</p><p className="mt-1 text-[10px] uppercase tracking-wide text-ink/50 sm:text-xs">{lang === "bn" ? stat.label_bn : stat.label}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-10 sm:px-6 sm:pt-14">
        <div className="flex items-end justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-seal">{lang === "bn" ? "দ্রুত শুরু করুন" : "Start here"}</p><h2 className="mt-1 font-display text-2xl sm:text-3xl">{lang === "bn" ? "জনপ্রিয় সেবা" : "Popular services"}</h2></div><Link href="#services" className="text-sm font-medium text-seal hover:text-sealDeep">{t("hero_cta_services")} →</Link></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">{popularServices.map((service) => service && <Link key={service.slug} href={`/order/${service.slug}`} className="soft-panel rounded-xl p-4 transition hover:-translate-y-0.5 hover:border-seal/30"><p className="font-medium leading-snug">{lang === "bn" ? service.name_bn : service.name}</p><p className="mt-3 font-mono text-xs text-seal">{lang === "bn" ? `শুরু ৳${service.price} থেকে` : `From ৳${service.price}`}</p></Link>)}</div>
      </section>

      {/* Service ledger */}
      <section id="services" className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-2xl sm:text-3xl">{lang === "bn" ? "সব সেবা" : "All services"}</h2><p className="mt-1 text-sm text-ink/55">{lang === "bn" ? "নাম বা সেবার ধরন দিয়ে খুঁজুন" : "Search by service name or type"}</p></div><label className="flex w-full items-center rounded-xl border border-line bg-white px-3 py-2.5 sm:max-w-xs"><span className="mr-2 text-ink/40">⌕</span><span className="sr-only">Search services</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "bn" ? "সেবা খুঁজুন..." : "Search services..."} className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label></div>
        {grouped.map(({ category, category_bn }) => {
          const items = filteredServices.filter((service) => service.category === category);
          if (!items.length) return null;
          return (
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
                      {lang === "bn" ? `শুরু ৳${s.price} থেকে` : `From ৳${s.price}`}
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
          );
        })}
        {!filteredServices.length && <p className="border border-dashed border-line py-12 text-center text-sm text-ink/55">{lang === "bn" ? "এই নামে কোনো সেবা পাওয়া যায়নি।" : "No services found for this search."}</p>}
      </section>

      <section className="border-t border-line bg-mint/40"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-seal">{lang === "bn" ? "আমাদের প্রতিশ্রুতি" : "Our promise"}</p><h2 className="mt-2 font-display text-2xl">{lang === "bn" ? "২০১৫ সাল থেকে আপনার পাশে" : "Serving you since 2015"}</h2><p className="mt-3 max-w-xl leading-relaxed text-ink/65">{lang === "bn" ? "আবু জাফর দ্বারা পরিচালিত, কলেজ রোড, কাশীনগার থেকে আমরা সরকারি কাগজপত্র, ফর্ম, প্রিন্টিং এবং বিল পেমেন্টের কাজ যত্নসহকারে করি।" : "Run by Abu Jafor from College Road, Kashinagar, we carefully handle government paperwork, forms, printing, and bill payments."}</p><Link href="/about" className="mt-4 inline-block font-medium text-seal hover:text-sealDeep">{lang === "bn" ? "আমাদের সম্পর্কে পড়ুন" : "Read about us"} →</Link></div><div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl border border-line bg-white/75 p-4"><p className="font-semibold text-seal">{lang === "bn" ? "সুরক্ষিত" : "Private"}</p><p className="mt-1 text-ink/60">{lang === "bn" ? "কাজ শেষ হলে প্রয়োজনহীন ডকুমেন্ট মুছে ফেলা হয়" : "Documents are deleted when no longer needed"}</p></div><div className="rounded-xl border border-line bg-white/75 p-4"><p className="font-semibold text-seal">{lang === "bn" ? "স্বচ্ছ" : "Clear"}</p><p className="mt-1 text-ink/60">{lang === "bn" ? "সার্ভিস চার্জ ও সময় আগে থেকেই জানানো হয়" : "Charges and timing are shown upfront"}</p></div></div></div></section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_.9fr]"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-seal">{lang === "bn" ? "সময়সীমার ধারণা" : "Typical timing"}</p><h2 className="mt-2 font-display text-2xl sm:text-3xl">{lang === "bn" ? "কাজ কত দ্রুত হবে?" : "How quickly will it be done?"}</h2><div className="mt-5 grid gap-3">{turnaroundOverview.map((item) => <div key={item.title} className="flex items-center gap-4 border-b border-line pb-3"><strong className="min-w-24 font-display text-lg text-seal">{lang === "bn" ? item.title_bn : item.title}</strong><span className="text-sm text-ink/60">{lang === "bn" ? item.detail_bn : item.detail}</span></div>)}</div></div><div className="soft-panel rounded-2xl border-seal/20 bg-white p-6"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-seal">{lang === "bn" ? "নমুনা আউটপুট" : "Sample output"}</p><div className="mt-4 border border-dashed border-ink/20 bg-paper p-5"><p className="text-center font-mono text-[10px] text-ink/40">MULTI SHEBA · DOCUMENT COPY</p><div className="mt-4 space-y-2"><div className="h-2 w-3/4 bg-ink/10" /><div className="h-2 w-full bg-ink/10" /><div className="h-2 w-5/6 bg-ink/10" /><div className="mt-5 h-10 w-24 bg-seal/15" /></div><p className="mt-5 text-center text-xs text-ink/45">{lang === "bn" ? "ব্যক্তিগত তথ্য বাদ দেওয়া নমুনা" : "Redacted sample for demonstration"}</p></div></div></section>

      <section className="border-t border-line bg-sky/50"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-seal">{lang === "bn" ? "গ্রাহকের কথা" : "Customer notes"}</p><h2 className="mt-2 font-display text-2xl sm:text-3xl">{lang === "bn" ? "আমাদের সেবা কেমন লাগল" : "What customers say"}</h2></div><Link href="/contact" className="font-medium text-seal hover:text-sealDeep">{lang === "bn" ? "যোগাযোগ করুন" : "Talk to us"} →</Link></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{testimonials.map((item) => <figure key={item.name} className="rounded-xl border border-line bg-white/80 p-5"><div className="text-brass" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}</div><blockquote className="mt-3 leading-relaxed text-ink/75">“{lang === "bn" ? item.quote : item.quote_en}”</blockquote><figcaption className="mt-4 text-sm font-semibold">{item.name}</figcaption></figure>)}</div></div></section>

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

      <SiteFooter />
    </main>
  );
}
