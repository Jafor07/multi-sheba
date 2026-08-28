import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Multi Sheba - সব সেবা এক জায়গায়";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#F4FBF7", color: "#19252A", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", width: "100%", height: "100%" }}>
      <div style={{ color: "#087F6E", fontSize: 30, letterSpacing: 5 }}>COUNTER NO. 01 · ESTD. 2015</div>
      <div style={{ fontSize: 76, fontWeight: 600, marginTop: 28 }}>Multi Sheba</div>
      <div style={{ color: "#087F6E", fontSize: 42, marginTop: 16 }}>সব সেবা এক জায়গায়</div>
      <div style={{ color: "#536268", fontSize: 25, marginTop: 36 }}>সরকারি কাগজপত্র · প্রিন্টিং · বিল পেমেন্ট</div>
    </div>,
    { ...size },
  );
}