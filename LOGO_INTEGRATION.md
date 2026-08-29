# Logo Integration Examples

This file shows how to integrate the Logo component throughout your app.

## 1. Update Homepage Header (app/page.tsx)

Replace the current text-based logo in your header:

```tsx
// OLD CODE:
<Link href="/" className="flex items-center gap-2.5" aria-label="Multi Sheba home">
  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal font-mono text-sm font-semibold text-white shadow-lg shadow-seal/20">MS</span>
  <span className="font-display text-xl tracking-tight sm:text-2xl"><em className="text-seal">Multi</em> Sheba</span>
</Link>

// NEW CODE:
<Logo href="/" className="h-9 sm:h-10" />
```

## 2. Update Footer (components/SiteFooter.tsx)

Replace the text branding with the logo:

```tsx
// OLD CODE:
<p className="font-display text-xl text-ink"><em className="text-seal">Multi</em> Sheba</p>

// NEW CODE:
<Logo variant="icon" className="h-8 w-8 mb-2" />
```

Or use the full logo in footer:

```tsx
<Logo variant="full" className="h-auto w-32" />
```

## 3. Use in Admin Pages

For admin dashboard or other pages:

```tsx
import Logo from "@/components/Logo";

export default function AdminLayout() {
  return (
    <header>
      <Logo href="/admin" variant="icon" className="h-10 w-10" />
      <h1>Admin Dashboard</h1>
    </header>
  );
}
```

## 4. Use in Metadata/OG Image

Already configured in `app/layout.tsx` to reference the favicon.

## Component API Reference

### Logo Component Props

```tsx
interface LogoProps {
  variant?: "full" | "icon";        // Default: "full"
  className?: string;                // Custom Tailwind classes
  href?: string;                     // Link destination, default: "/"
}
```

### Examples

```tsx
// Full logo linking to home (default)
<Logo />

// Full logo with custom styling
<Logo className="h-12 w-auto" />

// Icon only
<Logo variant="icon" />

// Icon with link to admin
<Logo variant="icon" href="/admin" className="h-8 w-8" />

// No link, just display
<Logo href={undefined} />
```

## File Requirements (in public/)

Make sure these files exist after following LOGO_SETUP.md:

```
public/
├── logo.png              (240x80px or larger)
├── logo-icon.png         (512x512px or 48x48px)
├── favicon.ico
├── favicon-32x32.png
└── apple-touch-icon.png  (180x180px)
```

## Styling Tips

Use Tailwind classes to size the logo:

```tsx
// Small (header icon)
<Logo variant="icon" className="h-8 w-8" />

// Medium (header logo)
<Logo className="h-10 w-auto" />

// Large (hero section)
<Logo className="h-16 w-auto" />

// Responsive
<Logo className="h-8 sm:h-10 md:h-12 w-auto" />
```
