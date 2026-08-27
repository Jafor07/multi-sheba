import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { getServiceBySlug } from "@/lib/services";

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Server is not configured yet — Supabase env vars are missing. See .env.example." },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { service_slug, phone, field_values, file_urls } = body;

  const service = getServiceBySlug(service_slug);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  const supabase = getServerSupabase();

  // Human-readable reference: PREFIX-YYMMDD-#### (last 4 of a random-ish counter)
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  const refNumber = `${service.refPrefix}-${datePart}-${suffix}`;

  const { error } = await supabase.from("orders").insert({
    ref_number: refNumber,
    service_slug,
    service_name: service.name,
    price: service.price,
    phone,
    field_values,
    file_urls,
    status: "awaiting_payment",
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save order" }, { status: 500 });
  }

  return NextResponse.json({ ref_number: refNumber });
}
