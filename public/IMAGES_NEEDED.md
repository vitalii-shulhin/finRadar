# Required Images for SEO

## Favicon and App Icons

Place these files in the `src/app/` directory (Next.js will automatically detect them):

### Required Files:

1. **favicon.ico** (32x32 or 16x16)
   - Classic favicon for browser tabs
   - Place at: `src/app/favicon.ico`

2. **icon.png** (512x512 recommended)
   - App icon for PWA and mobile
   - Place at: `src/app/icon.png`

3. **apple-icon.png** (180x180 recommended)
   - Apple touch icon for iOS devices
   - Place at: `src/app/apple-icon.png`

4. **og-image.png** (1200x630)
   - Open Graph image for social media sharing
   - Place at: `public/og-image.png`
   - Currently referenced in metadata but missing

## Design Guidelines

### Favicon (favicon.ico)
- Simple, recognizable icon
- Works well at small sizes (16x16, 32x32)
- Suggested: "F" letter or financial symbol (₴, $)
- Colors: Blue (#3B82F6) and white

### App Icons (icon.png, apple-icon.png)
- Dimensions: 512x512 (will be scaled automatically)
- Background: Blue gradient (from-blue-500 to-blue-600)
- Icon: White "F" or FinRadar logo
- Padding: 20% around edges

### Open Graph Image (og-image.png)
- Dimensions: 1200x630 (Facebook/Twitter optimal size)
- Design elements:
  - Background: Gradient (from-slate-900 to-slate-800)
  - Title: "FinRadar" in large bold text
  - Subtitle: "Фінансовий портал України"
  - Icons: Currency symbols, charts, or financial icons
  - Colors: Blue (#3B82F6), White, Gray

## Current Status

✅ Metadata configured to use these images
❌ Image files need to be created
❌ Logo file (logo.png) also referenced in structured data

## Tools for Creation

- **Figma**: Design the images
- **Canva**: Quick templates for social media images
- **GIMP/Photoshop**: Professional image editing
- **Favicon.io**: Generate favicon from text or image
- **RealFaviconGenerator**: Generate all sizes automatically

## Next Steps

1. Create the images using the guidelines above
2. Place them in the correct directories
3. Test with:
   - Browser tabs (favicon)
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Alternative: Next.js Image Generation

You can also use Next.js's built-in image generation by creating:
- `src/app/icon.tsx` - Dynamic icon generation
- `src/app/opengraph-image.tsx` - Dynamic OG image generation

See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
