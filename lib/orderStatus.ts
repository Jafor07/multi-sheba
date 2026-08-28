export interface StatusMeta {
  en: string;
  bn: string;
  color: string;
}

export const statusMeta: Record<string, StatusMeta> = {
  awaiting_payment: { en: "Awaiting payment", bn: "পেমেন্টের অপেক্ষায়", color: "bg-gray-100 text-gray-700" },
  pending_verification: { en: "Verifying payment", bn: "পেমেন্ট যাচাই চলছে", color: "bg-amber-100 text-amber-700" },
  paid: { en: "Paid", bn: "পরিশোধিত", color: "bg-blue-100 text-blue-700" },
  processing: { en: "Processing", bn: "প্রক্রিয়াধীন", color: "bg-indigo-100 text-indigo-700" },
  delivered: { en: "Delivered", bn: "সম্পন্ন হয়েছে", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { en: "Cancelled", bn: "বাতিল", color: "bg-rose-100 text-rose-700" },
};

export function getStatusMeta(status: string): StatusMeta {
  return statusMeta[status] ?? statusMeta.awaiting_payment;
}