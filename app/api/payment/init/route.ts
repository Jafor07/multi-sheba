import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { initPaymentSession } from "@/lib/payment";

// POST /api/payment/init
// Loads an order by reference and creates an SSLCommerz payment session for it.
// If the gateway isn't configured it returns { enabled: false } and the client
// keeps using the manual bKash/Nagad flow.
export async function POST(req: NextRequest) {
  const { ref_number } = await req.json();
  if (!ref_number) {
    return NextResponse.json({ error: "ref_number is required" }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("ref_number", ref_number)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const result = await initPaymentSession({
    refNumber: order.ref_number,
    amount: order.price,
    phone: order.phone,
    productName: order.service_name,
  });

  if (!result.enabled) {
    return NextResponse.json({ enabled: false });
  }
  if (result.error) {
    return NextResponse.json({ enabled: true, error: result.error }, { status: 502 });
  }
  return NextResponse.json({ enabled: true, gatewayPageUrl: result.gatewayPageUrl });
}