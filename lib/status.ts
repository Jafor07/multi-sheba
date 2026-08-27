// Living definition of order statuses, their human-readable labels, and the
// customer-facing message for each. Shared by the admin dashboard, the
// notifications module, and the public /track/[ref] page so wording stays in
// one place.

export const ORDER_STATUSES = [
  "awaiting_payment",
  "pending_verification",
  "paid",
  "processing",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  awaiting_payment: "Awaiting payment",
  pending_verification: "Payment under review",
  paid: "Paid — verification complete",
  processing: "In progress",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

/** Human-friendly message we send by SMS/ when an order moves to this status. */
export const STATUS_NOTIFICATION_MESSAGE: Record<OrderStatus, string> = {
  awaiting_payment: "Your order has been created and is awaiting payment.",
  pending_verification:
    "We received your payment confirmation and are verifying it.",
  paid: "Payment verified. We're starting on your order.",
  processing: "Good news: your order is now being processed.",
  delivered: "Your order has been delivered. Thank you for using Multi Sheba.",
  cancelled:
    "Your order was cancelled. Contact us if that doesn't look right.",
};

export function orderStatusLabel(status: string): string {
  if (status in STATUS_LABELS) return STATUS_LABELS[status as OrderStatus];
  return status.replace(/_/g, " ");
}

export function orderStatusMessage(status: string): string {
  if (status in STATUS_NOTIFICATION_MESSAGE) {
    return STATUS_NOTIFICATION_MESSAGE[status as OrderStatus];
  }
  return `Your order status is now: ${orderStatusLabel(status)}.`;
}