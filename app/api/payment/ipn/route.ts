import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { validatePayment } from "@/lib/payment";
import { sendOrderStatusNotification } from "@/lib/notifications";

// POST /api/payment/ipn
// SSLCommerz Instant Payment Notification (IPN) — called by the gateway on
// payment success/failure. We verify with the gateway and mark the order paid.
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const status = String(form.get("status") ?? "");
  const valId = String(form.get("val_id") ?? "");
  const tranId = String(form.get("tran_id") ?? "");

  // Always ack the gateway quickly; only take action on a confirmed success.
  if (status === "VALID" && valId && tranId) {
    const { ok } = await validatePayment(valId);
    if (ok) {
      const supabase = getServerSupabase();
      const { data: order } = await supabase
        .from("orders")
        .select("*")
        .eq("ref_number", tranId)
        .single();

      if (order) {
        await supabase
          .from("orders")
          .update({ status: "paid", txn_id: valId, last_notified_status: "paid" })
          .eq("ref_number", tranId);

        await sendOrderStatusNotification({
          refNumber: order.ref_number,
          phone: order.phone,
          serviceName: order.service_name,
          status: "paid",
        });
      }
    }
  }

  return NextResponse.json({ status: "ok" });
}