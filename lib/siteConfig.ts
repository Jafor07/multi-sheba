export const siteConfig = {
  name: "Multi Sheba",
  name_bn: "মাল্টি সেবা",
  owner: "Abu Jafor",
  owner_bn: "আবু জাফর",
  phone: "01606928275",
  whatsapp: "8801606928275",
  email: "jafor.cse07@gmail.com",
  address: "College Road, Kashinagar",
  address_bn: "কলেজ রোড, কাশীনগর",
  openingTime: "9:00 AM",
  closingTime: "10:00 PM",
  established: "2015",
} as const;

export const siteLinks = {
  whatsapp: `https://wa.me/${siteConfig.whatsapp}`,
  phone: `tel:${siteConfig.phone}`,
  email: `mailto:${siteConfig.email}`,
} as const;

export const trustStats = [
  { value: "৫০০+", label_bn: "সফল অর্ডার", label: "successful orders" },
  { value: "২০১৫", label_bn: "থেকে সেবা দিচ্ছি", label: "serving since" },
  { value: "১০০%", label_bn: "যাচাই করা অর্ডার", label: "verified orders" },
] as const;

export const popularServiceSlugs = [
  "birth-cert-printing",
  "certificate-document-printing",
  "pdf-printing",
  "job-application",
  "passport-application-assistance",
] as const;

export const turnaroundOverview = [
  { title_bn: "কয়েক ঘণ্টা", title: "A few hours", detail_bn: "বিল পেমেন্ট ও অনলাইন সহায়তা", detail: "Bill payments and online assistance" },
  { title_bn: "একই দিন", title: "Same day", detail_bn: "প্রিন্টিং ও সাধারণ ডকুমেন্ট কাজ", detail: "Printing and standard document work" },
  { title_bn: "১-২ দিন", title: "1-2 days", detail_bn: "সরকারি আবেদন ও যাচাই-নির্ভর সেবা", detail: "Government applications and verification-led services" },
] as const;

export const testimonials = [
  { name: "সুমাইয়া আক্তার", quote: "লাইনে না দাঁড়িয়ে কাজটা হয়ে গেছে, আপডেটও পেয়েছি।", quote_en: "My work was done without standing in line, and I received updates.", rating: 5 },
  { name: "রাকিব হাসান", quote: "ডকুমেন্ট পাঠানো ও অর্ডার ট্র্যাক করা খুব সহজ ছিল।", quote_en: "Sending documents and tracking the order was straightforward.", rating: 5 },
] as const;