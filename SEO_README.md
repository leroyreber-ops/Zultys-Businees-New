# DFW Zultys SEO Architecture & Control Panel Documentation

This module contains a comprehensive, highly optimized SEO Engine designed to eliminate Google Search Console (GSC) indexing coverage errors and boost keyword rankings across the Dallas-Fort Worth region.

---

## 🛠️ The Architecture

Our SEO system is built on four core pillars that bridge the gap between our React Single Page Application (SPA) and server/edge rendering.

### 1. Centralized SEO Metadata (Single Source of Truth)
- **`src/routes.ts`**: Programmatically synchronized list of all registered paths in `src/App.tsx`.
- **`src/seo/seoConfig.ts`**: Centralized configuration rules defining our canonical host (`https://dallasfortworthzultys.com`), maximum character limits for titles (60 chars) and descriptions (160 chars), default Open Graph visuals, and crawler instructions (`index, follow`).
- **`src/seo/seoAudit.ts`**: Pure validation functions checking for meta anomalies, duplicate tags, thin landing copy (<300 words), and sitemap misalignment.
- **`src/seo/seoFix.ts`**: Automation script executing server-side file updates, route synchronization, and `sitemap.xml`/`robots.txt` generation.

### 2. Edge-Level Soft 404 Handling (Netlify Edge Interceptor)
To prevent Google from indexing invalid pages (typos, legacy broken links) as "Duplicate, Google chose different canonical", we have deployed a Netlify Edge Function:
- **`netlify/edge-functions/spa-404.ts`**: Intercepts inbound traffic. If a route is NOT in `VALID_PATHS`, it halts execution and returns a **true HTTP 404 status code** alongside our static `public/404.html` layout and a `X-Robots-Tag: noindex, nofollow` header. If valid, it forwards standard execution to the SPA.

### 3. Integrated Build-Gate Protection
- **`scripts/seo-build.ts`**: Pre-deployment gate. Executed automatically inside the `npm run build` process. If any active page violates critical GSC guidelines (e.g. missing titles, missing sitemaps, misaligned canonical mappings), it halts compilation with `exit 1`, guaranteeing that sub-standard configurations never reach production.

### 4. Direct Admin Console
- **Path**: `/seo-admin` (Protected route, excluded from sitemap and explicitly marked `noindex`).
- **Credentials**: Gatekeeper-protected using passcode `zultys-seo-2026`.
- **Operations**: One-click **Scan & Fix** that programmatically executes workspace updates and outputs a human-readable GSC-style TODO checklist for on-site copywriting improvements.

---

## 📝 Guide: Adding New Pages & Maintaining Compliance

To add a new landing page or regional city route:

1. **Register the Route**:
   Declare your component and route matching condition in `/src/App.tsx`.
   
2. **Synchronize Routes & Metadata**:
   Navigate to `/seo-admin`, authenticate using `zultys-seo-2026`, and click **Scan & Fix**.
   - This automatically parses `App.tsx` and appends your path to `src/routes.ts`.
   - Re-compiles `public/sitemap.xml` and syncs `robots.txt`.
   
3. **Verify Compliance**:
   Run `npm run build` locally. If there are any missing titles or overly long descriptions, the build console will flag them and specify exactly how to optimize them.

4. **Trigger Google Re-indexing**:
   Once deployed, use the Search Console or our built-in Indexer triggers on the admin panels to notify Googlebot of your newly added content immediately.
