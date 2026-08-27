"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackLookup() {
  const [ref, setRef] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = ref.trim().toUpperCase();
    if (!id) return;
    router.push(`/track/${encodeURIComponent(id)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2"
      role="search"
    >
      <label htmlFor="track-ref" className="sr-only">
        Order reference number
      </label>
      <input
        id="track-ref"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        placeholder="Enter reference, e.g. JOB-260826-1234"
        className="min-w-0 flex-1 rounded-sm border border-line bg-paper px-3 py-2 text-sm focus:border-seal outline-none"
      />
      <button
        type="submit"
        className="rounded-sm bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-seal"
      >
        Track order
      </button>
    </form>
  );
}