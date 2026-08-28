"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LangToggle from "@/components/LangToggle";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig, siteLinks } from "@/lib/siteConfig";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = lang === "bn" ? `নাম: ${form.name}\nফোন: ${form.phone}\nবার্তা: ${form.message}` : `Name: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(`${siteLinks.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }
  return <main className="min-h-screen"><header className="border-b border-line bg-paper/90"><div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6"><Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-seal"><ArrowLeft size={15} /> {t("back_to_services")}</Link><LangToggle /></div></header><section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16"><h1 className="font-display text-3xl sm:text-5xl">{lang === "bn" ? "যোগাযোগ করুন" : "Contact us"}</h1><p className="mt-3 text-ink/60">{lang === "bn" ? "প্রশ্ন থাকলে ফোন, WhatsApp বা নিচের ফর্মে জানান।" : "Call, WhatsApp, or use the form below for help."}</p><div className="mt-8 grid gap-3 sm:grid-cols-3"><a href={siteLinks.phone} className="soft-panel rounded-xl p-4 hover:border-seal/30"><Phone size={18} className="text-seal" /><p className="mt-2 text-sm font-semibold">{siteConfig.phone}</p><p className="text-xs text-ink/50">{lang === "bn" ? "ফোন করুন" : "Call us"}</p></a><a href={siteLinks.whatsapp} className="soft-panel rounded-xl p-4 hover:border-seal/30"><MessageCircle size={18} className="text-seal" /><p className="mt-2 text-sm font-semibold">WhatsApp</p><p className="text-xs text-ink/50">{siteConfig.phone}</p></a><div className="soft-panel rounded-xl p-4"><p className="font-semibold text-seal">{siteConfig.address_bn}</p><p className="mt-1 text-xs text-ink/50">প্রতিদিন {siteConfig.openingTime} - {siteConfig.closingTime}</p></div></div><form onSubmit={submit} className="mt-10 space-y-4 border-t border-line pt-6"><label className="block text-sm font-medium">{lang === "bn" ? "আপনার নাম" : "Your name"}<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 outline-none focus:border-seal" /></label><label className="block text-sm font-medium">{lang === "bn" ? "ফোন নম্বর" : "Phone number"}<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 outline-none focus:border-seal" /></label><label className="block text-sm font-medium">{lang === "bn" ? "বার্তা" : "Message"}<textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 outline-none focus:border-seal" /></label><button type="submit" className="rounded-xl bg-seal px-5 py-3 font-semibold text-white hover:bg-sealDeep">{lang === "bn" ? "WhatsApp-এ পাঠান" : "Send via WhatsApp"}</button></form></section><SiteFooter /></main>;
}
