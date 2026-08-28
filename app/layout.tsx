import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Chatbot from "@/components/Chatbot";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://multisheba.netlify.app"),
  title: "Multi Sheba - সব সেবা এক জায়গায়",
  description:
    "Order government paperwork, applications, and document services online. One counter, every service, tracked from order to delivery.",
  openGraph: {
    title: "Multi Sheba - সব সেবা এক জায়গায়",
    description: "সরকারি কাগজপত্র, আবেদন, প্রিন্টিং ও বিল পেমেন্টের সেবা এক জায়গায়।",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: { card: "summary_large_image", title: "Multi Sheba", description: "সব সেবা এক জায়গায়।", images: ["/opengraph-image"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
