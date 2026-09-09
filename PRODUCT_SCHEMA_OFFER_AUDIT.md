# Comprehensive Product Schema & Offer Audit

**Date:** September 9, 2026  
**Project:** Zultys-Businees-New (Dallas-Fort Worth Zultys Phone Systems)  
**Production Domain:** `https://dallasfortworthzultys.com`  
**Google Search Console Error:** Missing field "lowPrice" (in "offers")  
**Primary Affected URL:** `https://dallasfortworthzultys.com/fort-worth-zultys-z23g-phone`  
**Reported Item Name:** Zultys Z 23GE IP Phone  
**Last Google Crawl Reported:** August 14, 2026  

---

## 1. Executive Summary & Root Cause Diagnosis

Google Search Console reported a critical structured data validation error on `https://dallasfortworthzultys.com/fort-worth-zultys-z23g-phone`:
> **Missing field "lowPrice" (in "offers")**

### Root Cause Analysis:
1. **Client-Side Injection in `src/pages/Z23GE.tsx`**:
   The React page component for the Z 23GE phone dynamically injects a JSON-LD `<script type="application/ld+json">` during mount (`useEffect`). The injected schema declared:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Product",
     "name": "Zultys Z 23GE IP Phone",
     "description": "Professional Gigabit IP phone with 2.8-inch color display and dual-port Gigabit Ethernet.",
     "brand": { "@type": "Brand", "name": "Zultys" },
     "offers": {
       "@type": "AggregateOffer",
       "availability": "https://schema.org/InStock",
       "priceCurrency": "USD",
       "seller": {
         "@type": "Organization",
         "name": "DFW Business Communications"
       }
     }
   }
   ```
   Under Schema.org and Google Search Central specifications, if an `AggregateOffer` is defined, it **strictly requires** a numeric `lowPrice` (and typically `highPrice` or `offerCount`). Omitting `lowPrice` causes Google's structured data parser to immediately invalidate the offer and issue the GSC error.

2. **Static Prerendering in `scripts/seo-prerender.ts`**:
   During the static site build, `scripts/seo-prerender.ts` also constructed Product schema with an invalid `Offer` object:
   ```json
   "offers": {
     "@type": "Offer",
     "priceCurrency": "USD",
     "price": "Contact for Quote",
     "availability": "https://schema.org/InStock",
     "seller": { "@id": "https://dallasfortworthzultys.com/#organization" }
   }
   ```
   Schema.org and Google Rich Results guidelines strictly mandate that `price` must be a real numerical value. Placeholder text strings like `"Contact for Quote"`, `"$0"`, or `"TBD"` are strictly prohibited and trigger structured data warnings/errors.
   Furthermore, `scripts/seo-prerender.ts` only matched `normPath.includes('z-23ge')` and omitted `normPath.includes('z23g')`, causing the prerendered HTML on `/fort-worth-zultys-z23g-phone` to fall through to `ProfessionalService` while the client runtime injected the broken `Product` schema.

3. **Page Archetype & Nature of the Website**:
   - `https://dallasfortworthzultys.com` is a B2B enterprise telecommunications lead-generation and authorized dealership website.
   - It is **not an e-commerce store**. There is no online shopping cart, no checkout gateway, no publicly listed retail price, and no real-time inventory feed.
   - All phone installations, appliances, and licensing are custom-quoted according to seat count, line capacity, wiring, and SLA terms.
   - Visible call to actions on the page are **"Request Pricing"** and **"Call 817-231-2962"**.

---

## 2. Page Classification: Is Z23G a Product-Detail Page?

- **Verdict:** **Yes, it is genuinely a Product Detail Page (PDP).**
- **Justification:**
  - The page content specifically focuses on a tangible physical hardware item: the **Zultys Z 23GE IP Phone**.
  - It features high-resolution hardware imagery (`ZULTYS_Z23G`), technical specifications (2.8" 320x240 color display, dual-port Gigabit Ethernet, 8 programmable line/feature keys, HD audio, full duplex speakerphone, PoE support), and hardware deployment guidance for Dallas-Fort Worth offices.
  - It is not a generic service landing page or a multi-product catalog.
- **Appropriate Schema Decision:**
  - Retain truthful `@type: "Product"` schema.
  - **Completely remove the `offers` object** (`AggregateOffer` or `Offer`) from the schema, as no public, fixed price is displayed on the page or confirmed by the business owner.
  - Retain truthful, visible entity attributes: `@context`, `@type: "Product"`, `@id`, `name`, `description`, `image`, `brand`, and `url`.
  - Do not encode calls to action ("Request Pricing") as a fake `$0` or placeholder `Offer`.

---

## 3. Detailed Audit of Affected Routes & Components

| Affected URL | Source File | Current Rendered Schema | Current Visible Pricing Status | Proposed Schema Decision |
| :--- | :--- | :--- | :--- | :--- |
| `https://dallasfortworthzultys.com/fort-worth-zultys-z23g-phone` | `src/pages/Z23GE.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (no `lowPrice`) in React; `ProfessionalService` in prerender | No visible price. Visible CTA: "Request Pricing" button triggering quote modal. | Keep truthful `Product` schema; remove `offers` entirely. Align prerender router. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-z-23ge-phone` | `src/pages/Z23GE.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` in React; `Offer` with `price: "Contact for Quote"` in prerender | No visible price. Visible CTA: "Request Pricing". | Keep truthful `Product` schema; remove `offers` entirely. Set exact canonical URL. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-z-22g-phone` | `src/pages/Z22G.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (missing `lowPrice`) in React; `Offer` with string price in prerender | No visible price. Visible CTA: "Request Pricing". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-z-21i-phone` | `src/pages/Z21i.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (missing `lowPrice`) in React; `Offer` with string price in prerender | No visible price. Visible CTA: "Request Pricing". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-zip-43g-phone` | `src/pages/ZIP43G.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (missing `lowPrice`) in React; `Offer` with string price in prerender | No visible price. Visible CTA: "Request a Quote". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-zip-45g-phone` | `src/pages/ZIP45G.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (missing `lowPrice`) in React; `Offer` with string price in prerender | No visible price. Visible CTA: "Request a Quote". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-zip-47g-phone` | `src/pages/ZIP47G.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (missing `lowPrice`) in React; `Offer` with string price in prerender | No visible price. Visible CTA: "Request a Quote". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-zip-49g-phone` | `src/pages/ZIP49G.tsx` & `scripts/seo-prerender.ts` | `Product` with `AggregateOffer` (missing `lowPrice`) in React; `Offer` with string price in prerender | No visible price. Visible CTA: "Request a Quote". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-mx-se` | `src/pages/MXSE.tsx` & `scripts/seo-prerender.ts` | `Product` with `Offer` (no `price`) in React; string price in prerender | No visible price. Visible CTA: "Request a Quote". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| `https://dallasfortworthzultys.com/fort-worth-zultys-mx-series` | `src/pages/MXSeries.tsx` & `scripts/seo-prerender.ts` | `Product` with `Offer` (no `price`) in React; string price in prerender | No visible price. Visible CTA: "Request a Quote". | Keep truthful `Product` schema; remove `offers` entirely. Fix canonical link. |
| All service routes using `src/components/ServiceSchema.tsx` | `src/components/ServiceSchema.tsx` | `Service` with `Offer` having `price: "0.00"` and `priceType: "Custom Quote"` | Services are custom quoted; $0.00 is a prohibited placeholder. | Remove `offers` from `ServiceSchema.tsx`. Service schema does not require offers. |
| All pages rendering `src/components/AIBookingSchema.tsx` | `src/components/AIBookingSchema.tsx` | `LocalBusiness` with `OfferCatalog` -> `Service` with `AggregateOffer` (`lowPrice: "19.00"`, `highPrice: "35.00"`) | The website has no public $19-$35 pricing published on the pages. | Remove `offers` object from `hasOfferCatalog` service item. |
| All city routes generated by `server.ts` | `server.ts` (lines 362-366) | `LocalBusiness` with hardcoded `AggregateRating` (`ratingValue: "5.0"`, `reviewCount: "48"`) | Fabricated review markup violates Google quality guidelines. | Remove fabricated `aggregateRating` from `server.ts`. |
| Competitor comparison pages in `server.ts` | `server.ts` (lines 3253-3257) | `ProductCollection` with `AggregateOffer` (`lowPrice: "19.99"`) | Unverified fabricated price. | Remove fabricated `offers` object from `server.ts`. |
| Shared helper `src/utils/seoHelpers.ts` | `src/utils/seoHelpers.ts` (lines 154-165) | `applyProductSEO` auto-generates `offers` with fallback InStock even if price is absent | Utility generator | Modify `applyProductSEO` and `applySEO` to only emit `offers` if an explicit, valid price is supplied. |

---

## 4. Owner Verification Rules Before Adding Future Price-Bearing Schema

Before any `Offer` or `AggregateOffer` schema can ever be published on any page on `dallasfortworthzultys.com`:
1. **Written Confirmation from Business Owner**: The business owner must provide written confirmation of the exact current pricing or pricing range.
2. **Visible On-Page Display**: The exact numerical price (e.g., "$249.00" or "$199.00 - $299.00") must be visibly rendered on the page in clear text.
3. **Single Purchase Price**:
   - Must use `@type: "Offer"`
   - `price`: Numeric string (e.g., `"249.00"` or `249`)
   - `priceCurrency`: `"USD"`
   - `url`: Canonical page URL
   - `availability`: Only when real stock status is visibly confirmed (e.g., `"https://schema.org/InStock"`).
4. **Range / Multiple Real Offers**:
   - Must use `@type: "AggregateOffer"`
   - `lowPrice`: Real lowest price as a numeric value
   - `highPrice`: Real highest price as a numeric value
   - `priceCurrency`: `"USD"`
   - `offerCount`: True count of distinct offers
5. **Strict Prohibitions**:
   - Under no circumstances may `lowPrice`, `highPrice`, or `price` be set to `"0"`, `"0.00"`, `"Contact for Quote"`, `"Call for Price"`, or any other placeholder.
   - `AggregateOffer` must never be used solely to qualify for rich snippet display if no genuine price range exists.
