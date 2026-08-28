import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "গোপনীয়তা নীতি | Multi Sheba", description: "Multi Sheba কীভাবে আপনার তথ্য ও ডকুমেন্ট সংরক্ষণ করে।" };

export default function PrivacyPage() {
  return <InfoPage title_bn="গোপনীয়তা নীতি" title="Privacy Policy" intro_bn="Multi Sheba আপনার অর্ডার সম্পন্ন করার জন্য প্রয়োজনীয় ব্যক্তিগত তথ্য ও ডকুমেন্ট সংগ্রহ করতে পারে।" intro="Multi Sheba may collect information and documents that are necessary to complete a customer's requested service." sections={[
    { heading_bn: "তথ্যের ব্যবহার", heading: "How we use information", body_bn: "আপনার দেওয়া তথ্য শুধুমাত্র আপনার অনুরোধ করা সেবা প্রদান ও অর্ডার সম্পন্ন করার প্রয়োজনেই ব্যবহার করা হবে।", body: "We use your information only for processing the order and providing the requested service." },
    { heading_bn: "ডকুমেন্ট সংরক্ষণ ও মুছে ফেলা", heading: "Retention and deletion", body_bn: "আপনার আপলোড করা ডকুমেন্ট অর্ডার সম্পন্ন করার জন্য যতদিন প্রয়োজন ততদিন সংরক্ষণ করা হবে। অর্ডার সম্পন্ন হওয়ার পর এবং ডকুমেন্টগুলোর আর প্রয়োজন না থাকলে সেগুলো আমাদের সিস্টেম থেকে মুছে ফেলা হবে।", body: "Uploaded documents are kept only for as long as necessary to complete the order. After the order is completed and the documents are no longer required, they are deleted from our system." },
    { heading_bn: "তৃতীয় পক্ষ ও নিরাপত্তা", heading: "Sharing and security", body_bn: "আমরা গ্রাহকের ব্যক্তিগত তথ্য বা ডকুমেন্ট বিক্রি করি না এবং অপ্রয়োজনে তৃতীয় পক্ষের সঙ্গে শেয়ার করি না। তবে সেবা সম্পন্ন করার জন্য প্রয়োজন হলে অথবা আইনগতভাবে বাধ্য হলে প্রয়োজনীয় তথ্য শেয়ার করা হতে পারে।", body: "We do not intentionally sell or share customer documents or personal information with third parties except when necessary to complete a requested service or when required by law." },
    { heading_bn: "গ্রাহকের দায়িত্ব", heading: "Your responsibility", body_bn: "শুধুমাত্র আপনার নির্দিষ্ট সেবা সম্পন্ন করার জন্য প্রয়োজনীয় ডকুমেন্ট আপলোড করুন।", body: "Please upload only the documents necessary for your requested service." },
  ]} />;
}
