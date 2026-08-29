# Logo & Favicon Implementation Guide

## Files to Create in `public/` Folder

I've prepared your project to use the logos. Now you need to save the image files from the attachments to the `public` folder:

### 1. **Logo Files to Add**

Save these files in the `public/` folder at the root of your project:

- **logo.png** - The full "Multi Sheba" logo with text (colorful version)
  - Save the detailed Multi Sheba logo as `public/logo.png`
  - Recommended dimensions: 240x80px (or larger for retina)

- **logo-icon.png** - The simplified "M" checkmark icon (monochrome version)
  - Save the simple M checkmark logo as `public/logo-icon.png`
  - Recommended dimensions: 512x512px (or 48x48px minimum)

### 2. **Favicon Files**

- **favicon.ico** - Browser tab icon
  - Use the simple M checkmark logo (logo-icon.png)
  - Convert to ICO format using an online converter like https://convertio.co/png-ico/
  - Save as `public/favicon.ico`

- **apple-touch-icon.png** - Apple device icon (for bookmarking)
  - Use the simple M logo
  - Dimensions: 180x180px
  - Save as `public/apple-touch-icon.png`

- **favicon-32x32.png** - Small favicon
  - Use the simple M logo
  - Dimensions: 32x32px
  - Save as `public/favicon-32x32.png`

## Using the Logo Component

Once you've added the images, you can use the Logo component in your pages:

```tsx
import Logo from "@/components/Logo";

// Full logo with link to home
<Logo href="/" />

// Icon only
<Logo variant="icon" />

// Custom styling
<Logo className="h-12 w-auto" />
```

## Verification Checklist

After adding the files:

- [ ] Public folder structure looks like:
  ```
  public/
  ├── logo.png
  ├── logo-icon.png
  ├── favicon.ico
  ├── favicon-32x32.png
  └── apple-touch-icon.png
  ```

- [ ] Update your layout.tsx (already done) references these files

- [ ] Test by running `npm run dev` and checking:
  - Browser tab shows the favicon
  - Logo components display correctly
  - Mobile devices show the apple-touch-icon when bookmarked

## Quick Steps to Create ICO from PNG

If you don't have favicon.ico:

1. Go to https://convertio.co/png-ico/ or https://icoconvert.com/
2. Upload `logo-icon.png`
3. Download the `favicon.ico` file
4. Save it to `public/favicon.ico`

Alternatively, use a tool like ImageMagick:
```bash
convert public/logo-icon.png -define icon:auto-resize=256,128,96,64,48,32,16 public/favicon.ico
```
