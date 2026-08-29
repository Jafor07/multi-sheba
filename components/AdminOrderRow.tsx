"use client";

import { useState } from "react";
import { MessageCircle, Check } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";
import { toWhatsAppNumber } from "@/lib/phone";

const STATUSES = [
  "awaiting_payment",
  "pending_verification",
  "paid",
  "processing",
  "delivered",
  "cancelled",
] as const;

const STATUS_DOT: Record<string, string> = {
  awaiting_payment: "bg-gray-400",
  pending_verification: "bg-amber-500",
  paid: "bg-blue-500",
  processing: "bg-indigo-500",
  delivered: "bg-emerald-500",
  cancelled: "bg-rose-500",
};

export default function AdminOrderRow({ order }: { order: any }) {
  const [status, setStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  async function updateStatus(newStatus: string) {
    setSaving(true);
    setStatus(newStatus);
    await fetch(`/api/orders/${order.ref_number}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, txn_id: order.txn_id }),
    });
    setSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  }

  const waLink = `https://wa.me/${toWhatsAppNumber(order.phone)}`;

  return (
    <>
      {/* Desktop row */}
      <tr className="hidden sm:table-row border-b border-border align-top hover:bg-canvas/60">
        <td className="py-3 px-4 font-mono text-xs text-ink/70">{order.ref_number}</td>
        <td className="py-3 px-4 text-ink">{order.service_name}</td>
        <td className="py-3 px-4">
          <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700">
            <MessageCircle size={13} /> {order.phone}
          </a>
        </td>
        <td className="py-3 px-4 font-mono text-ink">৳{order.price}</td>
        <td className="py-3 px-4 font-mono text-xs text-ink/60">{order.txn_id || "—"}</td>
        <td className="py-3 px-4">
          {order.file_urls &&
            Object.entries(order.file_urls as Record<string, string>).map(([k, url]) => (
              <a key={k} href={url as string} target="_blank" rel="noreferrer" className="block text-brand-600 underline text-xs">
                {k}
              </a>
            ))}
        </td>
        <td className="py-3 px-4 text-xs text-ink/40 whitespace-nowrap">{timeAgo(order.created_at)}</td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            <select
              value={status}
              disabled={saving}
              onChange={(e) => updateStatus(e.target.value)}
              className="border border-border rounded-lg px-2 py-1.5 text-xs bg-canvas outline-none focus:border-brand-400"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {justSaved && <Check size={14} className="text-brand-500 shrink-0" />}
          </div>
        </td>
      </tr>

      {/* Mobile card */}
      <tr className="sm:hidden block border-b border-border">
        <td className="block p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-mono text-xs text-ink/50">{order.ref_number}</p>
              <p className="font-medium text-ink text-sm">{order.service_name}</p>
            </div>
            <span className="font-mono text-sm font-semibold text-ink shrink-0">৳{order.price}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink/60 mb-3">
            <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand-600">
              <MessageCircle size={12} /> {order.phone}
            </a>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
            <span>{timeAgo(order.created_at)}</span>
          </div>
          {order.file_urls && Object.keys(order.file_urls).length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {Object.entries(order.file_urls as Record<string, string>).map(([k, url]) => (
                <a key={k} href={url as string} target="_blank" rel="noreferrer" className="text-xs text-brand-600 underline">
                  {k}
                </a>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <select
              value={status}
              disabled={saving}
              onChange={(e) => updateStatus(e.target.value)}
              className="flex-1 border border-border rounded-lg px-2 py-2 text-xs bg-canvas outline-none focus:border-brand-400"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {justSaved && <Check size={16} className="text-brand-500 shrink-0" />}
          </div>
        </td>
      </tr>
    </>
  );
}