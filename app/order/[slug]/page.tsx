import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import OrderPageClient from "@/components/OrderPageClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function OrderPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return notFound();
  return <OrderPageClient service={service} />;
}
