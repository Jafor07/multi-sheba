export interface FaqItem {
  q: string;
  q_bn: string;
  a: string;
  a_bn: string;
  keywords: string[]; // lowercase keywords for chatbot matching, English + Banglish
}

export const faqs: FaqItem[] = [
  {
    q: "How do I pay?",
    q_bn: "আমি কীভাবে পেমেন্ট করব?",
    a: "After you submit your order form, we show you a bKash/Nagad number and the amount. Send the money, then enter the Transaction ID on the same page - that's it.",
    a_bn: "অর্ডার ফর্ম জমা দেওয়ার পর আপনাকে একটি বিকাশ/নগদ নম্বর ও পরিমাণ দেখানো হবে। টাকা পাঠিয়ে সেই পাতায় ট্রানজেকশন আইডি লিখে দিন - এটুকুই।",
    keywords: ["pay", "payment", "bkash", "nagad", "taka", "poy", "payment kivabe", "টাকা", "পেমেন্ট", "বিকাশ", "নগদ"],
  },
  {
    q: "How long does it take?",
    q_bn: "কত সময় লাগবে?",
    a: "Turnaround is listed on each service - most digital services are same-day or within a few hours after payment is verified.",
    a_bn: "প্রতিটি সেবার পাশে সময় উল্লেখ করা আছে - বেশিরভাগ ডিজিটাল সেবা পেমেন্ট যাচাইয়ের পর একই দিনে বা কয়েক ঘণ্টার মধ্যে সম্পন্ন হয়।",
    keywords: ["time", "turnaround", "how long", "koto shomoy", "somoy", "কত সময়", "সময়"],
  },
  {
    q: "Is my payment verified automatically?",
    q_bn: "পেমেন্ট কি স্বয়ংক্রিয়ভাবে যাচাই হয়?",
    a: "No - we verify each Transaction ID by hand before starting work. This is manual by design right now, so verification can take up to a few hours during business hours.",
    a_bn: "না - আমরা প্রতিটি ট্রানজেকশন আইডি নিজে হাতে যাচাই করি কাজ শুরুর আগে। এটি এখন ইচ্ছাকৃতভাবে ম্যানুয়াল, তাই যাচাই করতে কর্মঘণ্টায় কয়েক ঘণ্টা লাগতে পারে।",
    keywords: ["verify", "verification", "automatic", "jachai", "যাচাই"],
  },
  {
    q: "Can I track my order?",
    q_bn: "আমি কি অর্ডার ট্র্যাক করতে পারব?",
    a: "Yes. Every order gets a reference number (e.g. JOB-260826-4821). Keep it - you can message us with it to check status anytime.",
    a_bn: "হ্যাঁ। প্রতিটি অর্ডারে একটি রেফারেন্স নম্বর দেওয়া হয় (যেমন JOB-260826-4821)। এটি সংরক্ষণ করুন - যেকোনো সময় এটি দিয়ে স্ট্যাটাস জানতে পারবেন।",
    keywords: ["track", "order status", "reference", "ref number", "ট্র্যাক", "রেফারেন্স", "অর্ডার স্ট্যাটাস"],
  },
  {
    q: "Do you do photocopying, lamination, or physical printing?",
    q_bn: "আপনারা কি ফটোকপি, লেমিনেশন বা ফিজিক্যাল প্রিন্টিং করেন?",
    a: "Not yet - we currently handle services that can be completed and delivered fully online (forms, applications, document editing, bill payments). Physical printing services aren't available on the site right now.",
    a_bn: "এখনো না - আমরা বর্তমানে এমন সেবা দিই যা সম্পূর্ণ অনলাইনে সম্পন্ন করা যায় (ফর্ম, আবেদন, ডকুমেন্ট এডিটিং, বিল পেমেন্ট)। ফিজিক্যাল প্রিন্টিং সেবা এখন সাইটে নেই।",
    keywords: ["photocopy", "lamination", "print", "printing", "ফটোকপি", "লেমিনেশন", "প্রিন্ট"],
  },
  {
    q: "What if I made a mistake in my order?",
    q_bn: "অর্ডারে ভুল হয়ে গেলে কী করব?",
    a: "Message us on WhatsApp with your reference number as soon as possible - if we haven't started processing yet, we can update the details.",
    a_bn: "যত দ্রুত সম্ভব আপনার রেফারেন্স নম্বরসহ হোয়াটসঅ্যাপে জানান - যদি আমরা তখনো কাজ শুরু না করে থাকি, তথ্য পরিবর্তন করা যাবে।",
    keywords: ["mistake", "wrong", "edit order", "change", "ভুল", "পরিবর্তন"],
  },
  {
    q: "Are government fees included in the price shown?",
    q_bn: "প্রদর্শিত মূল্যে কি সরকারি ফি অন্তর্ভুক্ত?",
    a: "No. The price shown is our service charge only. If the process itself has an official government fee, that's separate and we'll tell you the exact amount before proceeding.",
    a_bn: "না। প্রদর্শিত মূল্য শুধু আমাদের সার্ভিস চার্জ। প্রক্রিয়ার সরকারি ফি থাকলে তা আলাদা, এবং কাজ শুরুর আগে আমরা সঠিক পরিমাণ জানিয়ে দেব।",
    keywords: ["government fee", "official fee", "included", "সরকারি ফি", "ফি"],
  },
  {
    q: "What is your refund and cancellation policy?",
    q_bn: "রিফান্ড ও অর্ডার বাতিলের নীতি কী?",
    a: "If Multi Sheba cannot complete a service, a refund will be considered. Customer errors or cancellations after processing starts may not qualify. See our full Refund & Cancellation Policy.",
    a_bn: "Multi Sheba-এর কারণে সেবা সম্পন্ন না হলে রিফান্ড বিবেচনা করা হবে। গ্রাহকের ভুল বা কাজ শুরু হওয়ার পর বাতিল করলে রিফান্ড নাও প্রযোজ্য হতে পারে। বিস্তারিত রিফান্ড ও বাতিল নীতি পাতায় দেখুন।",
    keywords: ["refund", "cancel", "cancellation", "ফেরত", "রিফান্ড", "বাতিল"],
  },
  {
    q: "What happens if an application is rejected by a government office?",
    q_bn: "সরকারি অফিস আবেদন প্রত্যাখ্যান করলে কী হবে?",
    a: "Government offices make the final decision. We can explain the stated reason and advise on next steps, but approval is not guaranteed by our service charge.",
    a_bn: "সরকারি অফিসই চূড়ান্ত সিদ্ধান্ত নেয়। প্রত্যাখ্যানের কারণ জানালে আমরা পরবর্তী করণীয় বুঝিয়ে দিতে পারি, তবে সার্ভিস চার্জের বিনিময়ে অনুমোদনের নিশ্চয়তা দেওয়া হয় না।",
    keywords: ["rejected", "reject", "government office", "প্রত্যাখ্যান", "বাতিল আবেদন"],
  },
  {
    q: "How long are uploaded files retained?",
    q_bn: "আপলোড করা ফাইল কতদিন রাখা হয়?",
    a: "Files are retained only as long as needed to complete the order, then deleted when they are no longer required.",
    a_bn: "অর্ডার সম্পন্ন করার জন্য যতদিন প্রয়োজন ততদিন ফাইল রাখা হয়। প্রয়োজন শেষ হলে সেগুলো মুছে ফেলা হয়।",
    keywords: ["retention", "stored", "delete", "document", "সংরক্ষণ", "মুছে", "ডকুমেন্ট"],
  },
  {
    q: "Where do you offer pickup and courier delivery?",
    q_bn: "কোথায় pickup ও courier delivery পাওয়া যায়?",
    a: "Counter pickup is available at College Road, Kashinagar. Courier currently covers Kashinagar and nearby areas; confirm your address while ordering.",
    a_bn: "কলেজ রোড, কাশীনগার কাউন্টার থেকে pickup করা যায়। কুরিয়ার বর্তমানে কাশীনগর ও আশপাশের এলাকায় পাওয়া যায়; অর্ডারের সময় ঠিকানা নিশ্চিত করুন।",
    keywords: ["delivery", "pickup", "courier", "area", "ডেলিভারি", "কুরিয়ার", "এলাকা"],
  },
];
