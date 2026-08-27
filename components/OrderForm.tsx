"use client";

import { useState } from "react";
import { getBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Service } from "@/lib/services";

type Step = "form" | "payment" | "done";

const PAYMENT_NUMBER = "01XXXXXXXXX"; // TODO: replace with the real bKash/Nagad merchant number

export default function OrderForm({ service }: { service: Service }) {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<Step>("form");
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refNumber, setRefNumber] = useState<string | null>(null);
  const [txnId, setTxnId] = useState("");

  const errMissingRequired = (l: string) => (lang === "bn" ? `"${l}" আবশ্যক।` : `"${l}" is required.`);
  const errUpload = (l: string) => (lang === "bn" ? `অনুগ্রহ করে "${l}" আপলোড করুন।` : `Please upload "${l}".`);
  const errPhone = lang === "bn" ? "যোগাযোগের জন্য ফোন নম্বর দিন।" : "Please provide a phone number so we can reach you.";
  const errGeneric = lang === "bn" ? "কিছু ভুল হয়েছে।" : "Something went wrong.";
  const errCreateOrder = lang === "bn" ? "অর্ডার তৈরি করা যায়নি, আবার চেষ্টা করুন।" : "Could not create the order. Please try again.";
  const errConfirm = lang === "bn" ? "পেমেন্ট নিশ্চিত করা যায়নি, আবার চেষ্টা করুন।" : "Could not confirm payment. Please try again.";
  const errTxn = lang === "bn" ? "আপনার বিকাশ/নগদ পেমেন্টের ট্রানজেকশন আইডি দিন।" : "Enter the Transaction ID from your bKash/Nagad payment.";

  function setField(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  async function uploadFiles(): Promise<Record<string, string>> {
    const hasAnyFile = Object.values(files).some((f) => !!f);
    if (!hasAnyFile) return {};

    if (!isSupabaseConfigured()) {
      throw new Error(
        lang === "bn"
          ? "সার্ভার এখনো Supabase দিয়ে কনফিগার করা হয়নি — সাইট মালিকের সাথে যোগাযোগ করুন।"
          : "This site isn't connected to storage yet (Supabase isn't configured). Contact the site owner — see .env.example."
      );
    }

    const supabase = getBrowserSupabase();
    const urls: Record<string, string> = {};
    for (const [fieldId, file] of Object.entries(files)) {
      if (!file) continue;
      const path = `${service.slug}/${Date.now()}-${fieldId}-${file.name}`;
      const { error: upErr } = await supabase.storage
        .from("order-documents")
        .upload(path, file, { upsert: false });
      if (upErr) throw new Error(`Upload failed for ${fieldId}: ${upErr.message}`);
      const { data } = supabase.storage.from("order-documents").getPublicUrl(path);
      urls[fieldId] = data.publicUrl;
    }
    return urls;
  }

  async function handleSubmitDetails(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    for (const f of service.fields) {
      const label = lang === "bn" ? f.label_bn : f.label;
      if (f.required && f.type !== "file" && !values[f.id]) {
        setError(errMissingRequired(label));
        return;
      }
      if (f.required && f.type === "file" && !files[f.id]) {
        setError(errUpload(label));
        return;
      }
    }
    if (!phone) {
      setError(errPhone);
      return;
    }

    setSubmitting(true);
    try {
      const fileUrls = await uploadFiles();
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_slug: service.slug,
          service_name: service.name,
          price: service.price,
          phone,
          field_values: values,
          file_urls: fileUrls,
        }),
      });
      if (!res.ok) throw new Error(errCreateOrder);
      const { ref_number } = await res.json();
      setRefNumber(ref_number);
      setStep("payment");
    } catch (err: any) {
      setError(err.message ?? errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirmPayment(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!txnId) {
      setError(errTxn);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/orders/${refNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txn_id: txnId, status: "pending_verification" }),
      });
      if (!res.ok) throw new Error(errConfirm);
      setStep("done");
    } catch (err: any) {
      setError(err.message ?? errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done") {
    return (
      <div className="border border-seal/40 bg-seal/5 rounded-sm p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-seal mb-2">
          {t("success_title")}
        </p>
        <h2 className="font-display text-2xl mb-2">
          {lang === "bn" ? "রেফারেন্স" : "Reference"}: {refNumber}
        </h2>
        <p className="text-ink/70 leading-relaxed">
          {t("success_desc_1")} <strong>{phone}</strong>. {t("success_desc_2")}
        </p>
      </div>
    );
  }

  if (step === "payment" && refNumber) {
    return (
      <form onSubmit={handleConfirmPayment} className="space-y-5">
        <div className="border border-brass/40 bg-brass/5 rounded-sm p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-brass mb-2">
            {t("payment_step_label")}
          </p>
          <p className="text-sm leading-relaxed">
            {t("payment_instruction_1")} <strong>৳{service.price}</strong>{" "}
            {t("payment_instruction_2")} <span className="font-mono">{PAYMENT_NUMBER}</span>,{" "}
            {t("payment_instruction_3")} <span className="font-mono">{refNumber}</span> —{" "}
            {t("payment_instruction_4")}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="txn">
            {t("txn_label")}
          </label>
          <input
            id="txn"
            className="w-full border border-line rounded-sm px-3 py-2 bg-paper focus:border-seal outline-none"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            placeholder={t("txn_placeholder")}
          />
        </div>
        {error && <p className="text-clay text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-sm bg-seal text-paper px-6 py-3 font-medium hover:bg-sealDeep disabled:opacity-50"
        >
          {submitting ? t("confirming") : t("confirm_button")}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmitDetails} className="space-y-5">
      {service.fields.map((f) => {
        const label = lang === "bn" ? f.label_bn : f.label;
        const options = lang === "bn" && f.options_bn ? f.options_bn : f.options;
        return (
          <div key={f.id}>
            <label className="block text-sm font-medium mb-1" htmlFor={f.id}>
              {label} {f.required && <span className="text-clay">*</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={f.id}
                rows={3}
                className="w-full border border-line rounded-sm px-3 py-2 bg-paper focus:border-seal outline-none"
                value={values[f.id] ?? ""}
                onChange={(e) => setField(f.id, e.target.value)}
              />
            ) : f.type === "select" ? (
              <select
                id={f.id}
                className="w-full border border-line rounded-sm px-3 py-2 bg-paper focus:border-seal outline-none"
                value={values[f.id] ?? ""}
                onChange={(e) => setField(f.id, e.target.value)}
              >
                <option value="">{lang === "bn" ? "নির্বাচন করুন…" : "Select…"}</option>
                {(f.options ?? []).map((opt, i) => (
                  <option key={opt} value={opt}>
                    {options ? options[i] : opt}
                  </option>
                ))}
              </select>
            ) : f.type === "file" ? (
              <input
                id={f.id}
                type="file"
                className="w-full text-sm"
                onChange={(e) =>
                  setFiles((prev) => ({ ...prev, [f.id]: e.target.files?.[0] ?? null }))
                }
              />
            ) : (
              <input
                id={f.id}
                type={f.type}
                className="w-full border border-line rounded-sm px-3 py-2 bg-paper focus:border-seal outline-none"
                value={values[f.id] ?? ""}
                onChange={(e) => setField(f.id, e.target.value)}
              />
            )}
            {f.helpText && <p className="mt-1 text-xs text-ink/50">{f.helpText}</p>}
          </div>
        );
      })}

      <div className="ledger-rule pt-5">
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          {t("phone_label")} <span className="text-clay">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full border border-line rounded-sm px-3 py-2 bg-paper focus:border-seal outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="01XXXXXXXXX"
        />
        <p className="mt-1 text-xs text-ink/50">{t("phone_help")}</p>
      </div>

      {error && <p className="text-clay text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm bg-seal text-paper px-6 py-3 font-medium hover:bg-sealDeep disabled:opacity-50"
      >
        {submitting ? t("form_submitting") : t("form_continue")}
      </button>
    </form>
  );
}
