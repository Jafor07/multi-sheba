import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "ডেলিভারি এলাকা | Multi Sheba", description: "Multi Sheba-এর কাউন্টার ও ডেলিভারি কভারেজ।" };

export default function DeliveryPage() {
  return <InfoPage title_bn="ডেলিভারি এলাকা" title="Delivery coverage" intro_bn="ডিজিটাল ফলাফল অনলাইনে পাওয়া যায়। প্রিন্ট ও physical document-এর জন্য কাউন্টার pickup বা কুরিয়ার বেছে নিতে পারেন।" intro="Digital results are delivered online. For printed and physical documents, choose counter pickup or courier delivery." sections={[
    { heading_bn: "কাউন্টার pickup", heading: "Counter pickup", body_bn: "কলেজ রোড, কাশীনগর-এর কাউন্টার নং ০১ থেকে অর্ডার সংগ্রহ করা যাবে। খোলার সময় প্রতিদিন সকাল ৯টা থেকে রাত ১০টা।", body: "Collect orders from Counter No. 01 at College Road, Kashinagar. Open daily from 9:00 AM to 10:00 PM." },
    { heading_bn: "কুরিয়ার", heading: "Courier delivery", body_bn: "কুরিয়ার সুবিধা বর্তমানে কাশীনগর ও আশপাশের এলাকায় পাওয়া যায়। অর্ডার করার সময় আপনার ঠিকানা দিলে অতিরিক্ত চার্জ ও সম্ভাব্য সময় জানিয়ে দেওয়া হবে।", body: "Courier service is currently available in Kashinagar and nearby areas. Provide your address during ordering and we will confirm the extra charge and estimated timing." },
  ]} />;
}
