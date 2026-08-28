import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "সেবার শর্তাবলি | Multi Sheba", description: "Multi Sheba ব্যবহার ও অর্ডারের শর্তাবলি।" };

export default function TermsPage() {
  return <InfoPage title_bn="শর্তাবলি" title="Terms of Service" intro_bn="Multi Sheba ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলিতে সম্মত হচ্ছেন।" intro="By using Multi Sheba, you agree to the following terms." sections={[
    { heading_bn: "সঠিক তথ্য প্রদান", heading: "Accurate information", body_bn: "সেবা গ্রহণের সময় সঠিক ও সম্পূর্ণ তথ্য এবং প্রয়োজনীয় ডকুমেন্ট প্রদান করতে হবে। ভুল, অসম্পূর্ণ বা বিভ্রান্তিকর তথ্যের কারণে সেবা সম্পন্ন করা সম্ভব না হলে তার দায় গ্রাহকের।", body: "You must provide accurate, complete information and required documents. Customers are responsible when incorrect or incomplete information prevents completion." },
    { heading_bn: "অতিরিক্ত তথ্য", heading: "Additional information", body_bn: "কোনো অর্ডার সম্পন্ন করার জন্য অতিরিক্ত তথ্য বা ডকুমেন্ট প্রয়োজন হলে Multi Sheba-এর পক্ষ থেকে গ্রাহকের সঙ্গে যোগাযোগ করা হতে পারে।", body: "We may contact you when additional information or documents are needed to complete an order." },
    { heading_bn: "সময়সীমা ও অর্ডার গ্রহণ", heading: "Timing and acceptance", body_bn: "সেবার ধরন, তৃতীয় পক্ষের নির্ভরতা এবং অন্যান্য অনিবার্য কারণে নির্ধারিত সময়ের চেয়ে বেশি সময় লাগতে পারে। অসম্পূর্ণ, ভুল বা অনুপযুক্ত তথ্যযুক্ত অর্ডার গ্রহণ বা বাতিল করার অধিকার Multi Sheba সংরক্ষণ করে।", body: "Third-party dependencies and other unavoidable circumstances may delay service. Multi Sheba may accept or cancel orders containing incomplete, incorrect, or unsuitable information." },
  ]} />;
}
