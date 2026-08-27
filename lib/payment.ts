// Server-only SSLCommerz integration. This is the Phase-2 replacement for the
// manual bKash/Nagad txn-ID flow. It's deliberately gated: until you've set
// SSLCOMMERZ_STORE_ID and SSLCOMMERZ_STORE_PASSWD (which require a trade
// licence + DBID), every function here reports "disabled" and the order form
// falls back to the manual flow — so you can keep launching on the free tiers
// without any code change when the merchant account is approved.
//
// We hit SSLCommerz's HTTP API directly with fetch(), so no SDK dependency.

export interface PaymentInitResult {
  enabled: boolean;
  gatewayPageUrl?: string;
  sessionKey?: string;
  error?: string;
}

export function isPaymentEnabled(): boolean {
  return Boolean(
    process.env.SSLCOMMERZ_STORE_ID && process.env.SSLCOMMERZ_STORE_PASSWD
  );
}

function paymentEndpoint(): string {
  const sandbox =
    process.env.SSLCOMMERZ_SANDBOX === undefined ||
    process.env.SSLCOMMERZ_SANDBOX === "true" ||
    process.env.SSLCOMMERZ_SANDBOX === "1";
  return sandbox
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";
}

/** Server-side only — never exposed to the browser. */
function appBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

interface PaymentInput {
  refNumber: string; // tran_id (max 30 chars) — our refs are within that
  amount: number; // BDT
  phone: string;
  productName: string;
  customerName?: string;
}

/**
 * Creates an SSLCommerz payment session for an order. When the gateway isn't
 * configured, returns { enabled: false } and the UI falls back to manual
 * payment.
 */
export async function initPaymentSession({
  refNumber,
  amount,
  phone,
  productName,
  customerName,
}: PaymentInput): Promise<PaymentInitResult> {
  if (!isPaymentEnabled()) {
    return { enabled: false };
  }

  const successUrl = `${appBaseUrl()}/track/${refNumber}?payment=success`;
  const failUrl = `${appBaseUrl()}/track/${refNumber}?payment=failed`;
  const cancelUrl = `${appBaseUrl()}/track/${refNumber}?payment=cancelled`;

  const params = new URLSearchParams({
    store_id: process.env.SSLCOMMERZ_STORE_ID!,
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWD!,
    total_amount: String(amount),
    currency: "BDT",
    tran_id: refNumber,
    success_url: successUrl,
    fail_url: failUrl,
    cancel_url: cancelUrl,
    ipn_url: `${appBaseUrl()}/api/payment/ipn`,
    cus_name: customerName || "Multi Sheba Customer",
    cus_email: "",
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1200",
    cus_country: "Bangladesh",
    cus_phone: phone,
    shipping_method: "NO",
    product_name: productName,
    product_category: "Services",
    product_profile: "general",
  });

  try {
    const res = await fetch(paymentEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const json = await res.json();

    if (json.status === "SUCCESS" && json.GatewayPageURL) {
      return {
        enabled: true,
        gatewayPageUrl: json.GatewayPageURL,
        sessionKey: json.sessionkey,
      };
    }
    return {
      enabled: true,
      error: json.failedreason || json.status || "Payment gateway returned an error",
    };
  } catch (err) {
    console.error("SSLCommerz init failed:", err);
    return { enabled: true, error: "Could not reach the payment gateway" };
  }
}

/**
 * Validates a payment after SSLCommerz posts back on success / IPN. Returns
 * true only when the gateway confirms the transaction against the store.
 */
export async function validatePayment(
  valId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isPaymentEnabled() || !valId) {
    return { ok: false, error: "Not configured or missing val_id" };
  }

  const params = new URLSearchParams({
    val_id: valId,
    store_id: process.env.SSLCOMMERZ_STORE_ID!,
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWD!,
    format: "json",
  });

  try {
    const res = await fetch(paymentEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const json = await res.json();
    // status: VALID / VALIDATED / INVALID / FAILED
    const ok = json.status === "VALID" || json.status === "VALIDATED";
    return ok ? { ok: true } : { ok: false, error: json.status || "Invalid" };
  } catch (err) {
    console.error("SSLCommerz validation failed:", err);
    return { ok: false, error: "Could not validate payment" };
  }
}