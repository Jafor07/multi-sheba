"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";
import { getStatusMeta } from "@/lib/orderStatus";

interface TrackedOrder {
  ref_number: string;
  service_name: string;
  price: number;
  status: string;
  created_at: string;
}

export default function TrackPage() {
  const { lang, t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<TrackedOrder[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError(null);
    setOrders(null);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("track_error"));
      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message ?? t("track_error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas">
      <header className="bg-surface border-b border-border">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-brand-600 transition-colors">
            <ArrowLeft size={15} /> {t("back_to_services")}
          </Link>
          <LangToggle />
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-2">{t("track_title")}</h1>
        <p className="text-ink/50 mb-6">{t("track_subtitle")}</p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("track_phone_placeholder")}
            className="flex-1 border border-border rounded-xl px-3.5 py-2.5 bg-surface focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 text-white px-5 py-2.5 font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            <Search size={15} /> {loading ? t("track_searching") : t("track_search_button")}
          </button>
        </form>
        <p className="flex items-center gap-1.5 text-xs text-ink/40 mb-8">
          <ShieldCheck size={13} /> {t("track_privacy_note")}
        </p>

        {error && <p className="text-rose-600 text-sm mb-4">{error}</p>}

        {orders && orders.length === 0 && (
          <p className="text-ink/50 text-center py-8">{t("track_no_orders")}</p>
        )}

        {orders && orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((o) => {
              const meta = getStatusMeta(o.status);
              return (
                <div key={o.ref_number} className="bg-surface border border-border rounded-2xl shadow-card p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-mono text-xs text-ink/40 mb-1">{o.ref_number}</p>
                      <h3 className="font-semibold text-ink text-sm sm:text-base">{o.service_name}</h3>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${meta.color}`}>
                      {lang === "bn" ? meta.bn : meta.en}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-ink/50">
                    <span>৳{o.price}</span>
                    <span>{new Date(o.created_at).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}