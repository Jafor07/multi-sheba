import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { ref: string } }
) {
  const { txn_id, status } = await req.json();
  const supabase = getServerSupabase();

  const { error } = await supabase
    .from("orders")
    .update({ txn_id, status: status ?? "pending_verification" })
    .eq("ref_number", params.ref);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not update order" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { ref: string } }
) {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("ref_number", params.ref)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}
