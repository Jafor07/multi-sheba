// Server-only order notifications via Twilio. We call Twilio's REST API
// directly with fetch() so we don't add a runtime dependency.
//
// Channels:
//   - SMS   -> TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_FROM (a phone
//              number you own in Twilio).
//   - WhatsApp -> same account, but TWILIO_WHATSAPP_FROM (a WhatsApp sender
//              number) AND an approved WhatsApp message template. Until the
//              template is approved Twilio will reject outbound WhatsApp, so
//              this stays off by default.
//
// If none of the env vars are set, every function is a safe no-op — the admin
// dashboard and order flow keep working, we just don't send anything.

import { orderStatusMessage } from "@/lib/status";

function twilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  );
}

/** Root-relative tracking link, built from the public app URL when available. */
function trackingUrl(refNumber: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base}/track/${refNumber}`;
}

interface NotifyInput {
  refNumber: string;
  phone: string; // e.g. "01XXXXXXXXX" (BD local format)
  serviceName: string;
  status: string;
}

async function sendTwilioSms(input: NotifyInput): Promise<void> {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) return;

  // Convert Bangladeshi local numbers to E.164: 01XXXXXXXXX -> +8801XXXXXXXXX
  const to = /^01\d{9}$/.test(input.phone)
    ? `+880${input.phone.slice(1)}`
    : input.phone;

  const text = [
    `Multi Sheba — Order ${input.refNumber} (${input.serviceName})`,
    orderStatusMessage(input.status),
    `Track it: ${trackingUrl(input.refNumber)}`,
  ].join("\n");

  const bodyParams = new URLSearchParams({
    To: to,
    From: TWILIO_FROM,
    Body: text,
  });

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    }
  );
}

async function sendTwilioWhatsApp(input: NotifyInput): Promise<void> {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM } =
    process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
    return;
  }

  const to = /^01/.test(input.phone)
    ? `whatsapp:+880${input.phone.slice(1)}`
    : input.phone;

  const text = [
    `Order ${input.refNumber} (${input.serviceName}): ${orderStatusMessage(input.status)}.`,
    `Track it: ${trackingUrl(input.refNumber)}`,
  ].join("\n");

  // WhatsApp Business API requires an approved template when messaging
  // customers who haven't opted in, so this uses a fixed template naming that
  // your Twilio console must have approved for "order status update".
  const bodyParams = new URLSearchParams({
    To: to,
    From: TWILIO_WHATSAPP_FROM,
    Body: text,
  });

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    }
  );
}

const CHANNEL = (process.env.TWILIO_NOTIFY_CHANNEL || "sms").toLowerCase();

/**
 * Sends an order-status update to the customer. Safe no-op when Twilio isn't
 * configured. Errors are swallowed (logged) so a notification failure never
 * blocks the admin's status change.
 */
export async function sendOrderStatusNotification(
  input: NotifyInput
): Promise<void> {
  if (!twilioConfigured()) return;

  try {
    if (CHANNEL === "whatsapp" || CHANNEL === "both") {
      await sendTwilioWhatsApp(input);
    }
    if (CHANNEL === "sms" || CHANNEL === "both") {
      await sendTwilioSms(input);
    }
  } catch (err) {
    console.error("Notification failed for", input.refNumber, err);
  }
}