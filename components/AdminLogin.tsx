"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const { error } = await res.json();
      setError(error ?? "Login failed");
      return;
    }
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xs bg-surface border border-border p-6 rounded-2xl shadow-card">
        <h1 className="font-display text-xl font-semibold text-ink mb-4">Admin — Multi Sheba</h1>
        <label className="block text-sm font-medium mb-1 text-ink" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border border-border rounded-xl px-3.5 py-2.5 mb-3 bg-canvas focus:border-brand-400 focus:ring-4 focus:ring-brand-50 outline-none transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-rose-600 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-500 text-white px-4 py-2.5 font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}