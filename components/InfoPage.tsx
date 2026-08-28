"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";

export interface InfoSection { heading_bn: string; heading: string; body_bn: string; body: string }

export default function InfoPage({ title_bn, title, intro_bn, intro, sections }: { title_bn: string; title: string; intro_bn: string; intro: string; sections: InfoSection[] }) {
  const { lang, t } = useLanguage();
  return (
    <main className="min-h-screen">
      <header className="border-b border-line bg-paper/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-seal"><ArrowLeft size={15} /> {t("back_to_services")}</Link>
          <LangToggle />
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl text-ink sm:text-5xl">{lang === "bn" ? title_bn : title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">{lang === "bn" ? intro_bn : intro}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => <section key={section.heading} className="border-t border-line pt-5"><h2 className="font-display text-xl text-ink">{lang === "bn" ? section.heading_bn : section.heading}</h2><p className="mt-2 leading-8 text-ink/70">{lang === "bn" ? section.body_bn : section.body}</p></section>)}
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}