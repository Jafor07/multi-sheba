"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";
import OrderForm from "@/components/OrderForm";
import type { Service } from "@/lib/services";

export default function OrderPageClient({ service }: { service: Service }) {
  const { lang, t } = useLanguage();

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

      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-10">
        <p className="font-mono text-xs tracking-widest uppercase text-seal mb-3">
          {lang === "bn" ? service.category_bn : service.category}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl leading-tight">
          {lang === "bn" ? service.name_bn : service.name}
        </h1>
        <p className="mt-3 text-ink/70 leading-relaxed text-sm sm:text-base">
          {lang === "bn" ? service.summary_bn : service.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 sm:gap-6 font-mono text-xs sm:text-sm">
          <span>
            {t("service_charge_label")}: <strong className="text-brass">৳{service.price}</strong>
          </span>
          <span className="text-ink/50">
            {t("turnaround_label")}: {lang === "bn" ? service.turnaround_bn : service.turnaround}
          </span>
          {service.deliveryMode === "physical" && (
            <span className="px-1.5 py-0.5 border border-clay/40 text-clay rounded-sm uppercase tracking-wide text-[10px]">
              {lang === "bn" ? "পিকআপ/কুরিয়ার প্রয়োজন" : "Requires pickup/courier"}
            </span>
          )}
        </div>

        <div className="ledger-rule my-6 sm:my-8" />

        <OrderForm service={service} />
      </section>
    </main>
  );
}
