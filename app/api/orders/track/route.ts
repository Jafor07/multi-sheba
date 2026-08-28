import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Server is not configured yet - Supabase env vars are missing." },
      { status: 500 }
    );
  }

  const { phone } = await req.json();
  if (!phone || typeof phone !== "string") {
    return NextResponse.json({ error: "Phone number required" }, { status: 400 });
  }

  const supabase = getServerSupabase();

  const { data, error } = await supabase
    .from("orders")
    .select("ref_number, service_name, price, status, created_at")
    .eq("phone", phone.trim())
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not look up orders" }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}