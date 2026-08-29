"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import AdminOrderRow from "@/components/AdminOrderRow";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "pending_verification", label: "Needs verification" },
  { key: "awaiting_payment", label: "Awaiting payment" },
  { key: "paid", label: "Paid" },
  { key: "processing", label: "Processing" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
] as const;

export default function AdminOrdersTable({ orders }: { orders: any[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending_verification");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        o.ref_number?.toLowerCase().includes(q) ||
        o.phone?.toLowerCase().includes(q) ||
        o.service_name?.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [orders, query, statusFilter]);

  const countFor = (key: string) =>
    key === "all" ? orders.length : orders.filter((o) => o.status === key).length;

  return (
    <div>
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by reference, phone, or service…"
          className="w-full border border-border rounded-xl pl-10 pr-4 py-2.5 bg-surface focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none transition-all text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 mb-4 no-scrollbar">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
              statusFilter === f.key
                ? "bg-brand-500 text-white border-brand-500"
                : "bg-surface text-ink/60 border-border hover:border-brand-300"
            }`}
          >
            {f.label}
            <span className={statusFilter === f.key ? "text-white/70" : "text-ink/35"}>{countFor(f.key)}</span>
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="hidden sm:table-header-group">
            <tr className="text-left border-b border-border text-xs uppercase tracking-wide text-ink/50">
              <th className="py-3 px-4">Ref</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Charge</th>
              <th className="py-3 px-4">Txn ID</th>
              <th className="py-3 px-4">Files</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <AdminOrderRow key={o.ref_number} order={o} />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-ink/50 p-6 text-center text-sm">
            {orders.length === 0 ? "No orders yet." : "No orders match this search/filter."}
          </p>
        )}
      </div>
    </div>
  );
}