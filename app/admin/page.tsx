import { cookies } from "next/headers";
import { Wallet, Clock, ListChecks, TrendingUp } from "lucide-react";
import { getServerSupabase } from "@/lib/supabase";
import { computeOrderStats } from "@/lib/orderStats";
import AdminLogin from "@/components/AdminLogin";
import AdminOrderRow from "@/components/AdminOrderRow";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed =
    cookies().get("admin_auth")?.value === process.env.ADMIN_PASSWORD &&
    !!process.env.ADMIN_PASSWORD;

  if (!authed) return <AdminLogin />;

  const supabase = getServerSupabase();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const stats = computeOrderStats(orders ?? []);

  const statCards = [
    {
      label: "Confirmed revenue",
      value: `৳${stats.confirmedRevenue}`,
      hint: "paid + processing + delivered",
      icon: Wallet,
      solid: "bg-brand-500 text-white",
    },
    {
      label: "Awaiting verification",
      value: `৳${stats.pendingVerificationValue}`,
      hint: `${stats.pendingVerificationCount} order(s) - needs your review`,
      icon: Clock,
      solid: "bg-amber-500 text-white",
    },
    {
      label: "Today",
      value: `৳${stats.todayValue}`,
      hint: `${stats.todayCount} order(s) today`,
      icon: TrendingUp,
      solid: "bg-blue-500 text-white",
    },
    {
      label: "Total orders",
      value: `${stats.totalOrders}`,
      hint: `৳${stats.totalValue} total order value (excl. cancelled)`,
      icon: ListChecks,
      solid: "bg-indigo-500 text-white",
    },
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <header className="bg-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-ink">Order Register</h1>
          <form action="/api/admin/logout" method="post">
            <button className="font-mono text-xs text-ink/50 hover:text-rose-600" formAction="/api/admin/logout">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((c) => (
            <div key={c.label} className="bg-surface border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-ink/50 uppercase tracking-wide">{c.label}</span>
                <span className={`h-8 w-8 rounded-lg flex items-center justify-center ${c.solid}`}>
                  <c.icon size={15} />
                </span>
              </div>
              <p className="font-display text-2xl font-semibold text-ink">{c.value}</p>
              <p className="text-xs text-ink/40 mt-1">{c.hint}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-2xl shadow-card overflow-x-auto">
          {error && <p className="text-rose-600 p-5">Could not load orders: {error.message}</p>}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border text-xs uppercase tracking-wide text-ink/50">
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Charge</th>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Files</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o) => (
                <AdminOrderRow key={o.ref_number} order={o} />
              ))}
            </tbody>
          </table>
          {orders?.length === 0 && <p className="text-ink/50 p-6">No orders yet.</p>}
        </div>
      </section>
    </main>
  );
}