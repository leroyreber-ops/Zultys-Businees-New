# Sitemap and Canonical Strategy Plan
**Production Domain:** `https://dallasfortworthzultys.com`  
**Document:** `SEO_SITEMAP_AND_CANONICAL_PLAN.md`  
**Purpose:** Comprehensive architectural blueprint to eliminate sitemap 404s, resolve canonical discrepancies, enforce crawl-budget efficiency, and guarantee 100% 200 OK indexable URLs.

---

## 1. Executive Problem Statement

The production site currently exhibits significant sitemap and canonical hygiene defects:
1. **39 Phantom URLs in `public/sitemap.xml`:**  
   `SitemapIndexProvider.ts` appended automated `/${slug}-tx-zultys-phone-systems` paths for 39 cities that already had distinct custom routes (e.g., `/arlington-ip-pbx`, `/allen-tx-zultys-voip`). Because these phantom paths were never registered in `App.tsx` or `src/routes.ts`, Netlify's edge function returned HTTP 404 with `noindex, nofollow`.
2. **Canonical Mismatches & Discrepancies:**  
   127 bare city URLs (e.g., `/dallas`, `/fort-worth`, `/frisco`) exist in the routing table with canonical tags pointing to keyword-optimized equivalents (`/dallas-zultys-phones`, etc.). While search engines respect this (resulting in GSC's "Alternate page with proper canonical tag"), any inconsistencies between internal links, sitemaps, and redirects create crawl waste.
3. **Internal Links to Non-Canonical / Redirected Paths:**  
   Certain components link to `/sitemap` instead of `/sitemap.html`, or `/contact-us` instead of `/contact`.

---

## 2. Canonical Normalization Architecture

### Core Canonical Rules
1. **Absolute HTTPS Protocol Only:** Every canonical tag MUST be fully qualified:
   `https://dallasfortworthzultys.com[path]`
   No relative paths (`/path`), no HTTP (`http://`), no trailing slashes on subpages, and no query parameters.
2. **Homepage Canonical:** Must strictly be `https://dallasfortworthzultys.com/` (never `/index.html`).
3. **Self-Referential Canonicals on Indexable Pages:**  
   Every primary target page (all 241 indexable pages) must have an exact self-referential canonical tag matching its URL.
4. **Alias Slugs & Secondary Routes:**  
   Any alternate entry URL (such as bare city slugs `/plano`, `/dallas`, `/fort-worth`) must point directly to its keyword-rich canonical target.
5. **XML Sitemap Exclusivity:**  
   Only self-referential, canonical URLs returning HTTP 200 OK may be included in `sitemap.xml`. Non-canonical URLs, redirects (301/302), 404s, and utility/admin paths MUST be excluded.

### Canonical Mapping Policy Table (Sample of Key Routes)

| Requested Request Path | HTTP Response Code | Canonical Tag Target | Sitemap Inclusion |
| :--- | :---: | :--- | :---: |
| `/` | 200 | `https://dallasfortworthzultys.com/` | Yes (Priority 1.0) |
| `/index.html` | 301 Redirect to `/` | `https://dallasfortworthzultys.com/` | No |
| `/dallas-zultys-phones` | 200 | `https://dallasfortworthzultys.com/dallas-zultys-phones` | Yes (Priority 0.85) |
| `/dallas` | 200 (or 301) | `https://dallasfortworthzultys.com/dallas-zultys-phones` | No |
| `/fort-worth-zultys-systems` | 200 | `https://dallasfortworthzultys.com/fort-worth-zultys-systems` | Yes (Priority 0.85) |
| `/fort-worth` | 200 (or 301) | `https://dallasfortworthzultys.com/fort-worth-zultys-systems` | No |
| `/arlington-ip-pbx` | 200 | `https://dallasfortworthzultys.com/arlington-ip-pbx` | Yes (Priority 0.80) |
| `/arlington` | 200 (or 301) | `https://dallasfortworthzultys.com/arlington-ip-pbx` | No |
| `/sitemap.html` | 200 | `https://dallasfortworthzultys.com/sitemap.html` | Yes (Priority 0.50) |
| `/sitemap` | 301 Redirect to `/sitemap.html` | `https://dallasfortworthzultys.com/sitemap.html` | No |
| `/allen-tx-zultys-phone-systems` | 301 Redirect to `/allen-tx-zultys-voip` | `https://dallasfortworthzultys.com/allen-tx-zultys-voip` | No |

---

## 3. Sitemap Generation Engine Fix

### Root-Cause Analysis of Current Generator
In `src/utils/sitemapGenerator.ts`:
```ts
// Flawed logic:
const dynamicCityRoutes = SitemapIndexProvider.getDynamicCityRoutes();
dynamicCityRoutes.forEach((route) => {
  if (!routes.has(route)) {
    routes.add(route);
  }
});
```
And inside `src/utils/SitemapIndexProvider.ts`:
```ts
KNOWN_CITIES.forEach(city => {
  const fullPath = `/${slug}-tx-zultys-phone-systems`;
  routes.push(fullPath); // Blindly created phantom paths!
});
```

### Required Implementation in `src/utils/SitemapIndexProvider.ts`
1. Deprecate the blind generation of `/${slug}-tx-zultys-phone-systems`.
2. Re-architect `getDynamicCityRoutes()` to derive only from `VALID_PATHS` in `src/routes.ts` or validated components in `src/App.tsx`.
3. Filter out any route that:
   - Does not exist in `VALID_PATHS`.
   - Has `canonicalMap[route] && canonicalMap[route] !== route` (non-canonical alias).
   - Starts with `/admin/` or is an internal diagnostic tool (`/seo-dashboard`, `/seo-admin`, `/citation-health`).
   - Is a redirect source in `public/_redirects`.

### Exact Sitemap XML Template Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dallasfortworthzultys.com/</loc>
    <lastmod>2026-09-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Only clean 200 OK canonical routes follow -->
</urlset>
```

---

## 4. Netlify `_redirects` Remediation Plan

To resolve existing crawler queues, external backlinks, and historical GSC 404 records, we will implement clean 301 redirects in `public/_redirects` for all 39 phantom paths:

```apache
# 39 Legacy Sitemap Phantom Path 301 Redirects to Authoritative Canonicals
/allen-tx-zultys-phone-systems /allen-tx-zultys-voip 301!
/arlington-tx-zultys-phone-systems /arlington-ip-pbx 301!
/balch-springs-tx-zultys-phone-systems /balch-springs-tx-zultys-voip 301!
/bedford-tx-zultys-phone-systems /bedford-zultys-solutions 301!
/benbrook-tx-zultys-phone-systems /benbrook-phone-systems 301!
/carrollton-tx-zultys-phone-systems /carrollton-zultys 301!
/cedar-hill-tx-zultys-phone-systems /cedar-hill-tx-zultys-voip 301!
/colleyville-tx-zultys-phone-systems /colleyville-voip 301!
/dallas-tx-zultys-phone-systems /dallas-zultys-phones 301!
/denton-tx-zultys-phone-systems /denton-business-phone-systems 301!
/duncanville-tx-zultys-phone-systems /duncanville-tx-zultys-voip 301!
/euless-tx-zultys-phone-systems /euless-business-phones 301!
/flower-mound-tx-zultys-phone-systems /flower-mound-business-phones 301!
/fort-worth-tx-zultys-phone-systems /fort-worth-zultys-systems 301!
/frisco-tx-zultys-phone-systems /frisco-voip-solutions 301!
/garland-tx-zultys-phone-systems /garland-business-voip 301!
/grand-prairie-tx-zultys-phone-systems /grand-prairie-zultys 301!
/grapevine-tx-zultys-phone-systems /grapevine-business-voip 301!
/haltom-city-tx-zultys-phone-systems /haltom-city-zultys 301!
/hurst-tx-zultys-phone-systems /hurst-ip-pbx 301!
/irving-tx-zultys-phone-systems /irving-business-phone-systems 301!
/keller-tx-zultys-phone-systems /keller-zultys-dealer 301!
/lancaster-tx-zultys-phone-systems /lancaster-tx-zultys-dealer 301!
/lewisville-tx-zultys-phone-systems /lewisville-voip-solutions 301!
/mckinney-tx-zultys-phone-systems /mckinney-zultys-dealer 301!
/mesquite-tx-zultys-phone-systems /mesquite-zultys-phone-systems 301!
/murphy-tx-zultys-phone-systems /murphy-tx-zultys-voip 301!
/north-richland-hills-tx-zultys-phone-systems /north-richland-hills-zultys 301!
/plano-tx-zultys-phone-systems /plano-zultys-dealer 301!
/richardson-tx-zultys-phone-systems /richardson-phone-systems 301!
/river-oaks-tx-zultys-phone-systems /river-oaks-zultys 301!
/rowlett-tx-zultys-phone-systems /rowlett-tx-zultys-dealer 301!
/sachse-tx-zultys-phone-systems /sachse-tx-zultys-dealer 301!
/saginaw-tx-zultys-phone-systems /saginaw-business-communications 301!
/southlake-tx-zultys-phone-systems /southlake-ip-phones 301!
/the-colony-tx-zultys-phone-systems /the-colony-tx-zultys-voip 301!
/watauga-tx-zultys-phone-systems /watauga-voip-solutions 301!
/westworth-village-tx-zultys-phone-systems /westworth-village-zultys 301!
/white-settlement-tx-zultys-phone-systems /white-settlement-business-phones 301!

# Broken Link Fixes & Direct Redirects
/contact-us /contact 301!
/sitemap /sitemap.html 301!
```

---

## 5. Build-Time Validation Gate (`scripts/seo-build.ts`)

To ensure that no regression can occur in future deployments, `scripts/seo-build.ts` will enforce the following automated checks before Vite compilation completes:
1. **Sitemap 404 Check:** Parse `public/sitemap.xml`. Verify that every URL exists in `VALID_PATHS`.
2. **Canonical Matching Check:** Verify that every URL in `public/sitemap.xml` is its own canonical target. If `canonicalMap[url] !== url`, the build immediately fails with an error.
3. **Noindex Guard:** Verify that no URL marked `noindex` or disallowed in `robots.txt` appears in `public/sitemap.xml`.
4. **Duplicate Detection:** Guarantee zero duplicate `<loc>` entries.

---
*End of Report 3 (Sitemap and Canonical Strategy Plan)*
