import { createClient } from "@supabase/supabase-js";

// Cheap check used before touching Supabase from the browser, so we can
// show a clear message instead of letting supabase-js throw a raw
// "supabaseUrl is required" error when .env.local hasn't been set up yet.
export function isSupabaseConfigured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("xxxxxxxxxxxx")
  );
}

// Public client — safe for the browser, uses the anon key which only
// has the permissions you grant it via Supabase Row Level Security (RLS).
export function getBrowserSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Server client — used inside API routes / server components only.
// Uses the service role key, which bypasses RLS, so it must never be
// exposed to the browser. Only import this file from server-side code.
export function getServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
