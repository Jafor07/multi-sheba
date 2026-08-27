import { cookies } from "next/headers";
import { getServerSupabase } from "@/lib/supabase";
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

  return (
    <main className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <h1 className="font-display text-xl">Order Register</h1>
          <form action="/api/admin/logout" method="post">
            <button className="font-mono text-xs text-ink/50 hover:text-clay" formAction="/api/admin/logout">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8 overflow-x-auto">
        {error && <p className="text-clay">Could not load orders: {error.message}</p>}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-ink/20 text-xs uppercase tracking-wide text-ink/50">
              <th className="py-2 pr-4">Ref</th>
              <th className="py-2 pr-4">Service</th>
              <th className="py-2 pr-4">Phone</th>
              <th className="py-2 pr-4">Charge</th>
              <th className="py-2 pr-4">Txn ID</th>
              <th className="py-2 pr-4">Files</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o) => (
              <AdminOrderRow key={o.ref_number} order={o} />
            ))}
          </tbody>
        </table>
        {orders?.length === 0 && (
          <p className="text-ink/50 mt-6">No orders yet.</p>
        )}
      </section>
    </main>
  );
}
