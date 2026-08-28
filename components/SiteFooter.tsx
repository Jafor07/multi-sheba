import Link from "next/link";
import { siteConfig, siteLinks } from "@/lib/siteConfig";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-ink/60 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xl text-ink"><em className="text-seal">Multi</em> Sheba</p>
          <p className="mt-2 max-w-xs leading-relaxed">{siteConfig.address_bn} · প্রতিদিন {siteConfig.openingTime} - {siteConfig.closingTime}</p>
          <p className="mt-3 text-xs">© ২০২৬ মাল্টি সেবা · প্রতিষ্ঠিত ২০১৫</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2">
          <Link href="/about" className="hover:text-seal">আমাদের সম্পর্কে</Link>
          <Link href="/faq" className="hover:text-seal">সাধারণ জিজ্ঞাসা</Link>
          <Link href="/contact" className="hover:text-seal">যোগাযোগ</Link>
          <Link href="/delivery" className="hover:text-seal">ডেলিভারি এলাকা</Link>
        </nav>
        <nav aria-label="Policies" className="grid content-start gap-2">
          <Link href="/terms" className="hover:text-seal">সেবার শর্তাবলি</Link>
          <Link href="/privacy" className="hover:text-seal">গোপনীয়তা নীতি</Link>
          <Link href="/refund" className="hover:text-seal">রিফান্ড ও বাতিল নীতি</Link>
          <a href={siteLinks.phone} className="mt-1 font-medium text-seal hover:text-sealDeep">{siteConfig.phone}</a>
        </nav>
      </div>
    </footer>
  );
}