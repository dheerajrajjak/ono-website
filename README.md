# ONO Fitness — website (static export)

Plain HTML/CSS/JS. No build step and no external dependencies; fonts are self-hosted.

## Structure
```
index.html            Homepage
contact/index.html    /contact/
terms/index.html      /terms/
privacy/index.html    /privacy/
404.html              Not-found page
assets/site.css       All styles (incl. @font-face)
assets/site.js        Shared: mobile menu, copy buttons
assets/home.js        Homepage: carousel, plans toggle, formats, animations
assets/img/*.webp     Images (WebP, with -sm variants for phones)
assets/fonts/*.woff2  Jost + Inter (latin + latin-ext, so ₹ renders)
assets/icons/         Favicon SVG, app icons
favicon.ico, site.webmanifest, robots.txt, sitemap.xml
_headers              Cache/security headers (Netlify / Cloudflare Pages)
.htaccess             Same, for Apache hosting
```

## Deploy
Upload the whole folder to the **root** of ono.fitness. Links and assets use root paths (`/assets/...`), so the site must be served from the domain root.
Works as-is on Netlify, Cloudflare Pages, Vercel, GitHub Pages, Hostinger and other static hosts.

Local preview: `npx serve .` (or `python3 -m http.server`) in this folder, then open http://localhost:3000 (or :8000).
Opening index.html directly from disk will not load assets.

## SEO included
- Unique title, description and canonical URL on every page
- Open Graph + Twitter card (assets/img/og-image.jpg, 1200×630)
- JSON-LD: Organization, LocalBusiness (areas served, plans as offers), WebSite, FAQPage; Breadcrumbs on sub-pages
- robots.txt, sitemap.xml, lang="en-IN", geo meta

## After going live
1. Submit https://ono.fitness/sitemap.xml in Google Search Console.
2. Create / claim a Google Business Profile (service-area business, hide the address if you don't receive walk-ins).
3. Check rich results at https://search.google.com/test/rich-results
4. Opening hours in the JSON-LD are set to 06:00–21:00 daily — edit in index.html if different.

## Editing
- Booking WhatsApp number: search for `919289558919`.
- Plan prices: `#pricing` section in index.html and the JSON-LD offers in the <head>.
- Format images/text: the `window.ONO_FORMATS` list at the top of assets/home.js.
