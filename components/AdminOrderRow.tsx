"use client";

import { useState } from "react";

const STATUSES = [
  "awaiting_payment",
  "pending_verification",
  "paid",
  "processing",
  "delivered",
  "cancelled",
] as const;

export default function AdminOrderRow({ order }: { order: any }) {
  const [status, setStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);

  async function updateStatus(newStatus: string) {
    setSaving(true);
    setStatus(newStatus);
    await fetch(`/api/orders/${order.ref_number}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, txn_id: order.txn_id }),
    });
    setSaving(false);
  }

  return (
    <tr className="border-b border-line align-top">
      <td className="py-3 pr-4 font-mono text-xs">{order.ref_number}</td>
      <td className="py-3 pr-4">{order.service_name}</td>
      <td className="py-3 pr-4">{order.phone}</td>
      <td className="py-3 pr-4 font-mono">৳{order.price}</td>
      <td className="py-3 pr-4 font-mono text-xs">{order.txn_id || "-"}</td>
      <td className="py-3 pr-4">
        {order.file_urls &&
          Object.entries(order.file_urls as Record<string, string>).map(([k, url]) => (
            <a
              key={k}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="block text-seal underline text-xs"
            >
              {k}
            </a>
          ))}
      </td>
      <td className="py-3">
        <select
          value={status}
          disabled={saving}
          onChange={(e) => updateStatus(e.target.value)}
          className="border border-line rounded-sm px-2 py-1 text-xs bg-paper"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
