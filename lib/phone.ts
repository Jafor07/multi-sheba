// Normalizes a Bangladeshi phone number into the digits-only, country-code
// prefixed format wa.me links require (e.g. "8801840661455").
// Handles the common ways a customer might type their number:
//   01840661455    -> 8801840661455
//   +8801840661455 -> 8801840661455
//   8801840661455  -> 8801840661455
//   1840661455     -> 8801840661455 (missing leading 0, assume it's still BD)
export function toWhatsAppNumber(rawPhone: string): string {
  const digits = rawPhone.replace(/[^\d]/g, ""); // strip spaces, dashes, +, etc.

  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return "880" + digits.slice(1);
  if (digits.length === 10) return "880" + digits; // bare 10-digit number, no leading 0
  return digits; // fallback: pass through as-is rather than guess wrong
}