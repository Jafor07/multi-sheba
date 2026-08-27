"use client";

import { useEffect, useState } from "react";
import {
  ORDER_STATUSES,
  STATUS_LABELS,
  orderStatusLabel,
} from "@/lib/status";

interface OrderRecord {
  ref_number: string;
  service_name: string;
  price: number;
  phone: string;
  status: string;
  created_at: string;
  field_values?: Record<string, string>;
}

export default function TrackOrder({
  refNumber,
  paymentStatus,
}: {
  refNumber: string;
  paymentStatus?: string;
}) {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/orders/${encodeURIComponent(refNumber)}`)
      .then(async (res) => {
        if (res.status === 404) {
          if (active) setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error("Could not load the order.");
        const data = await res.json();
        if (active) setOrder(data);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [refNumber]);

  if (loading) {
    return <p className="text-ink/50">Looking up your order…</p>;
  }

  if (notFound || !order) {
    return (
      <div className="border border-clay/40 bg-clay/5 rounded-sm p-6">
        <h2 className="font-display text-xl mb-2">Order not found</h2>
        <p className="text-ink/70 leading-relaxed">
          We couldn&apos;t find an order with reference <strong>{refNumber}</strong>.
          Double-check the reference number you were given, or contact us on
          WhatsApp and quote this reference.
        </p>
      </div>
    );
  }

  const statusIndex = ORDER_STATUSES.indexOf(order.status as any);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="space-y-6">
      {paymentStatus === "success" && (
        <div className="border border-seal/40 bg-seal/5 rounded-sm p-4 text-sm">
          ✓ Payment received — your order is now being processed.
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div className="border border-brass/40 bg-brass/5 rounded-sm p-4 text-sm">
          Payment was cancelled. If you&apos;d still like to pay, contact us on WhatsApp.
        </div>
      )}
      {paymentStatus === "failed" && (
        <div className="border border-clay/40 bg-clay/5 rounded-sm p-4 text-sm">
          Payment didn&apos;t go through. Please try again or pay manually.
        </div>
      )}

      <div className="border border-line rounded-sm p-6 bg-paper">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl">{order.service_name}</h2>
          <span className="font-mono text-sm text-brass">৳{order.price}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-ink/50">
          <span>Ref: {order.ref_number}</span>
          <span>Ordered: {new Date(order.created_at).toLocaleDateString("en-GB")}</span>
        </div>
        <p className="mt-3 inline-block rounded-sm border border-seal/40 bg-seal/5 px-3 py-1 text-sm font-medium text-sealDeep">
          {isCancelled ? "Cancelled" : orderStatusLabel(order.status)}
        </p>
      </div>

      {/* Status timeline */}
      {!isCancelled && (
        <ol className="border border-line rounded-sm bg-paper divide-y divide-line">
          {ORDER_STATUSES.map((s) => {
            const reached = ORDER_STATUSES.indexOf(s) <= statusIndex;
            return (
              <li key={s} className="flex items-center gap-3 px-5 py-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    reached ? "bg-seal text-paper" : "bg-line text-ink/40"
                  }`}
                >
                  {reached ? "✓" : ""}
                </span>
                <span className={`text-sm ${reached ? "text-ink" : "text-ink/40"}`}>
                  {STATUS_LABELS[s]}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {order.field_values && (
        <div className="border border-line rounded-sm bg-paper p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">
            Your submitted details
          </p>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(order.field_values).map(([k, v]) => (
              <div key={k}>
                <dt className="text-ink/50 capitalize">{k.replace(/_/g, " ")}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}