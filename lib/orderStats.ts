export interface OrderStats {
  totalOrders: number;
  totalValue: number;
  confirmedRevenue: number;
  pendingVerificationCount: number;
  pendingVerificationValue: number;
  todayCount: number;
  todayValue: number;
}

export function computeOrderStats(orders: any[]): OrderStats {
  const today = new Date().toISOString().slice(0, 10);
  let totalValue = 0,
    confirmedRevenue = 0,
    pendingVerificationCount = 0,
    pendingVerificationValue = 0,
    todayCount = 0,
    todayValue = 0;

  for (const o of orders) {
    if (o.status === "cancelled") continue;
    totalValue += o.price;
    if (["paid", "processing", "delivered"].includes(o.status)) {
      confirmedRevenue += o.price;
    }
    if (o.status === "pending_verification") {
      pendingVerificationCount++;
      pendingVerificationValue += o.price;
    }
    if (o.created_at && o.created_at.slice(0, 10) === today) {
      todayCount++;
      todayValue += o.price;
    }
  }

  return {
    totalOrders: orders.length,
    totalValue,
    confirmedRevenue,
    pendingVerificationCount,
    pendingVerificationValue,
    todayCount,
    todayValue,
  };
}