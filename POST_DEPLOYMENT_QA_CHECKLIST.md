# Post-Deployment QA Checklist — Phase D Verification Protocol

**Project:** DFW Business Communications (Authorized Zultys Partner)  
**Target Domain:** `https://dallasfortworthzultys.com`  
**Environment:** Production (Post-Merge)  
**Auditor:** Technical SEO & Full-Stack Engineering Team  

---

## Instructions
Execute each verification item below immediately following deployment to Netlify. Record the HTTP response code, response headers, and visual findings. Any non-compliance requires immediate escalation.

---

## 1. HTTP Response & Header Verification

- [ ] **1.1 Canonical Root URL:**
  ```bash
  curl -I -s https://dallasfortworthzultys.com/ | grep -E "HTTP|x-robots-tag|link"
  ```
  - *Expected:* `HTTP/2 200`, no restrictive `noindex` headers.
- [ ] **1.2 HTTP to HTTPS Redirect:**
  ```bash
  curl -I -s http://dallasfortworthzultys.com/ | grep -E "HTTP|location"
  ```
  - *Expected:* `HTTP/1.1 301 Moved Permanently` pointing to `https://dallasfortworthzultys.com/`.
- [ ] **1.3 Non-WWW to WWW Canonical Consistency:**
  ```bash
  curl -I -s https://www.dallasfortworthzultys.com/ | grep -E "HTTP|location"
  ```
  - *Expected:* `HTTP/2 301` redirecting to apex domain `https://dallasfortworthzultys.com/`.
- [ ] **1.4 Trailing Slash Normalization:**
  ```bash
  curl -I -s https://dallasfortworthzultys.com/fort-worth-zultys-systems/ | grep -E "HTTP|location"
  ```
  - *Expected:* Normalizes or serves canonical self-referential header.

---

## 2. Legacy Alias 301 Redirects (Zero 404s)

Verify that all retired, consolidated, or alias URLs return `HTTP/2 301` to their new canonical destinations:

- [ ] **2.1 `/pricing`** -> `https://dallasfortworthzultys.com/zultys-pricing`
  ```bash
  curl -I -s https://dallasfortworthzultys.com/pricing | grep -E "HTTP|location"
  ```
- [ ] **2.2 `/cloud-services`** -> `https://dallasfortworthzultys.com/zultys-cloud-services`
  ```bash
  curl -I -s https://dallasfortworthzultys.com/cloud-services | grep -E "HTTP|location"
  ```
- [ ] **2.3 `/contact-center`** -> `https://dallasfortworthzultys.com/fort-worth-zultys-contact-center`
  ```bash
  curl -I -s https://dallasfortworthzultys.com/contact-center | grep -E "HTTP|location"
  ```
- [ ] **2.4 `/zip-49g-ip-phone`** -> `https://dallasfortworthzultys.com/fort-worth-zultys-zip-49g-phone`
  ```bash
  curl -I -s https://dallasfortworthzultys.com/zip-49g-ip-phone | grep -E "HTTP|location"
  ```
- [ ] **2.5 `/zip-47g-ip-phone`** -> `https://dallasfortworthzultys.com/fort-worth-zultys-zip-47g-phone`
  ```bash
  curl -I -s https://dallasfortworthzultys.com/zip-47g-ip-phone | grep -E "HTTP|location"
  ```
- [ ] **2.6 `/mx-se-hardware-appliance`** -> `https://dallasfortworthzultys.com/fort-worth-zultys-mx-se`
  ```bash
  curl -I -s https://dallasfortworthzultys.com/mx-se-hardware-appliance | grep -E "HTTP|location"
  ```
- [ ] **2.7 Phantom City Route Example:**
  ```bash
  curl -I -s https://dallasfortworthzultys.com/allen-tx-zultys-phone-systems | grep -E "HTTP|location"
  ```
  - *Expected:* `HTTP/2 301` to `https://dallasfortworthzultys.com/allen-tx-zultys-voip`.

---

## 3. Robots & Sitemap Integrity

- [ ] **3.1 `robots.txt` Accessibility:**
  ```bash
  curl -s https://dallasfortworthzultys.com/robots.txt
  ```
  - *Expected:* Status 200, Disallow `/admin/`, Disallow `/seo-dashboard`, Disallow `/citation-health`, Disallow `/seo-admin`.
  - *Expected:* Explicit declaration: `Sitemap: https://dallasfortworthzultys.com/sitemap.xml`.
- [ ] **3.2 `sitemap.xml` Cleanliness:**
  ```bash
  curl -s https://dallasfortworthzultys.com/sitemap.xml | grep -o '<loc>.*</loc>' | wc -l
  ```
  - *Expected:* Exactly 241 indexable canonical URLs.
  - *Expected:* 0 occurrences of `/admin/`, `/seo-dashboard`, `/citation-health`, `/pricing`, `/cloud-services`.
- [ ] **3.3 Submit Sitemap to Google Search Console (GSC):**
  - Navigate to **Sitemaps** in GSC for `https://dallasfortworthzultys.com/`.
  - Resubmit `sitemap.xml`.
  - Confirm status: "Success".

---

## 4. Prerendering & Static HTML Crawl Verification

Use `curl` with Googlebot user-agent to verify raw static HTML served prior to JavaScript execution:

- [ ] **4.1 Root Page Static HTML:**
  ```bash
  curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://dallasfortworthzultys.com/ | grep -E "<h1|<nav|class=\"prerender-wrapper\""
  ```
  - *Expected:* Visible H1 present, nav links present, prerender body populated.
- [ ] **4.2 Static Word Count on Core Pages:**
  - Sample check: Fort Worth, Dallas, Arlington, Cloud Services, Pricing, ZIP 49G.
  - Each page must return >1,000 words of static text inside the raw server response.
- [ ] **4.3 Static Internal Anchor Links:**
  - Confirm that `<a href="...">` links point to canonical destinations with no redirect hops.

---

## 5. Schema & Structured Data Validation

- [ ] **5.1 Google Rich Results Test:**
  - Run the live URL `https://dallasfortworthzultys.com/` through [Google Rich Results Test](https://search.google.com/test/rich-results).
  - Verify detection of `LocalBusiness` / `ProfessionalService`.
  - Confirm **0 warnings** and **0 errors**.
  - Confirm **ZERO** presence of `AggregateRating` or artificial `Review` entities.
- [ ] **5.2 Product Schema Verification on Hardware Pages:**
  - Test `https://dallasfortworthzultys.com/fort-worth-zultys-zip-49g-phone`.
  - Verify valid `Product` schema with name, description, brand, and DFW Business Communications offer.
- [ ] **5.3 Schema Absence on Non-Product Pages:**
  - Test `https://dallasfortworthzultys.com/fort-worth-zultys-systems`.
  - Confirm no rogue `Product` schema is emitted for city landing pages.

---

## 6. Real-Time Client Hydration & Console Health

- [ ] **6.1 SPA Transition & Hydration:**
  - Open Chrome DevTools > Console.
  - Navigate across multiple links (Home -> Cloud Services -> Products -> Contact).
  - Verify seamless React component hydration without throwing invariant errors or replacing prerendered DOM aggressively.
- [ ] **6.2 Console Error Audit:**
  - Confirm 0 fatal JavaScript exceptions, uncaught runtime errors, or 404 network fetch failures.
