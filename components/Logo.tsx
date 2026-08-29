import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  href?: string;
}

export default function Logo({
  variant = "full",
  className = "",
  href = "/",
}: LogoProps) {
  const logoContent =
    variant === "full" ? (
      <Image
        src="/logo.png"
        alt="Multi Sheba - সব সেবা এক জায়গায়"
        width={240}
        height={80}
        priority
        className={className}
      />
    ) : (
      <Image
        src="/logo-icon.png"
        alt="Multi Sheba"
        width={48}
        height={48}
        priority
        className={className}
      />
    );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
}
