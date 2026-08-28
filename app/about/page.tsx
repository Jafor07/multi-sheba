import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "আমাদের সম্পর্কে | Multi Sheba", description: "Multi Sheba সম্পর্কে জানুন।" };

export default function AboutPage() {
  return <InfoPage title_bn="আমাদের সম্পর্কে" title="About Us" intro_bn="মাল্টি সেবা শুরু হয়েছে একটি সহজ চিন্তা থেকে: সাধারণ মানুষকে সরকারি কাগজপত্র, ফর্ম পূরণ, প্রিন্টিং এবং বিল পরিশোধের জন্য লম্বা লাইনে দাঁড়ানো থেকে মুক্তি দেওয়া।" intro="Multi Sheba started with a simple idea: save people from standing in long lines for government paperwork, form submissions, printing, and bill payments." sections={[
    { heading_bn: "কে পরিচালনা করেন", heading: "Who runs Multi Sheba", body_bn: "আবু জাফর দ্বারা পরিচালিত, আমরা কলেজ রোড, কাশীনগর-এ ২০১৫ সাল থেকে কাজ করছি।", body: "Run by Abu Jafor, we have been serving College Road, Kashinagar since 2015." },
    { heading_bn: "কেন আমাদের বিশ্বাস করবেন", heading: "Why customers trust us", body_bn: "প্রতিটি অর্ডার যত্ন সহকারে যাচাই করে সম্পন্ন করা হয়। আপনার NID, জন্মসনদ বা অন্যান্য সংবেদনশীল ডকুমেন্ট শুধু অনুরোধ করা সেবা সম্পন্ন করার জন্য ব্যবহার করা হয় এবং প্রয়োজন শেষ হলে মুছে ফেলা হয়।", body: "Every order is carefully verified before completion. Your NID, birth certificate, or other sensitive documents are used only to provide the requested service and deleted when they are no longer needed." },
    { heading_bn: "আমাদের ঠিকানা ও সময়", heading: "Visit or contact us", body_bn: "কলেজ রোড, কাশীনগর। প্রতিদিন সকাল ৯টা থেকে রাত ১০টা পর্যন্ত।", body: "College Road, Kashinagar. Open every day from 9:00 AM to 10:00 PM." },
  ]} />;
}
