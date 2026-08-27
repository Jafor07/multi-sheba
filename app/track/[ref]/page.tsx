import Link from "next/link";
import TrackOrder from "@/components/TrackOrder";

export const dynamic = "force-dynamic";

export default function TrackPage({
  params,
  searchParams,
}: {
  params: { ref: string };
  searchParams?: { payment?: string };
}) {
  const ref = params.ref;

  return (
    <main className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto max-w-2xl px-6 py-5">
          <Link href="/" className="font-mono text-xs text-ink/50 hover:text-seal">
            ← Back to Multi Sheba
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-10">
        <p className="font-mono text-xs tracking-widest uppercase text-seal mb-3">
          Order tracking
        </p>
        <h1 className="font-display text-3xl mb-6">Reference: {ref}</h1>

        <TrackOrder refNumber={ref} paymentStatus={searchParams?.payment} />

        <div className="mt-8 border-t border-line pt-5 text-sm text-ink/60 leading-relaxed">
          Questions about this order?{" "}
          <a
            href="https://wa.me/8801606928275"
            className="text-seal underline hover:text-sealDeep"
          >
            WhatsApp us
          </a>{" "}
          and quote your reference number.
        </div>
      </section>
    </main>
  );
}