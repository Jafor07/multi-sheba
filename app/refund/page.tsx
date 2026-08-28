import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "রিফান্ড ও বাতিল নীতি | Multi Sheba", description: "Multi Sheba-এর রিফান্ড ও অর্ডার বাতিলের নীতি।" };

export default function RefundPage() {
  return <InfoPage title_bn="রিফান্ড ও বাতিল নীতি" title="Refund & Cancellation Policy" intro_bn="রিফান্ডের সিদ্ধান্ত অর্ডারের অবস্থা, কাজ শুরুর সময় এবং সমস্যার কারণ বিবেচনা করে নেওয়া হয়।" intro="Refund decisions consider the order status, whether processing has started, and the reason the service could not be completed." sections={[
    { heading_bn: "Multi Sheba-এর কারণে সেবা অসম্পন্ন হলে", heading: "When we cannot complete the service", body_bn: "কোনো সেবা Multi Sheba-এর কারণে সম্পন্ন করা সম্ভব না হলে সেই অর্ডারের জন্য রিফান্ড বিবেচনা করা হবে।", body: "If a service cannot be completed because of Multi Sheba, a refund will be considered for that order." },
    { heading_bn: "গ্রাহকের তথ্যের ভুল হলে", heading: "Customer-provided errors", body_bn: "গ্রাহকের ভুল বা অসম্পূর্ণ তথ্য, ভুল ডকুমেন্ট অথবা অন্যান্য গ্রাহক-সম্পর্কিত কারণে সেবা সম্পন্ন করা সম্ভব না হলে রিফান্ড প্রযোজ্য নাও হতে পারে।", body: "A refund may not apply when the service cannot be completed because of incorrect or incomplete information, incorrect documents, or another customer-related reason." },
    { heading_bn: "বাতিল ও যোগাযোগ", heading: "Cancellation and contact", body_bn: "অর্ডার প্রক্রিয়া শুরু হওয়ার পর রিফান্ডের ক্ষেত্রে অর্ডারের অবস্থা বিবেচনা করা হবে। অনুমোদিত রিফান্ডের পরিমাণ ও পদ্ধতি ব্যবহৃত পেমেন্ট পদ্ধতি ও পরিস্থিতির ওপর নির্ভর করবে। সমস্যা বা অভিযোগ থাকলে যত দ্রুত সম্ভব সাপোর্ট টিমের সঙ্গে যোগাযোগ করুন।", body: "After processing starts, the order status will be considered. An approved refund's amount and method depend on the payment method and circumstances. Contact support as soon as possible with any issue or complaint." },
  ]} />;
}
