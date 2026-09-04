# Schema.org Structured Data Repair and Validation Plan
**Production Domain:** `https://dallasfortworthzultys.com`  
**Document:** `SEO_SCHEMA_REPAIR_PLAN.md`  
**Purpose:** Remediate 241 schema validation errors, eradicate fabricated ratings, eliminate schema syntax violations, and establish a validated Schema.org graph for Google Rich Results.

---

## 1. Audit of Existing Schema Failures

Ahrefs and Google Rich Results tools detected **241 pages with schema.org validation errors**.
Inspection of `scripts/seo-prerender.ts` revealed three critical violations:

### Violation 1: Fabricated `AggregateRating`
Lines 288-292 of `scripts/seo-prerender.ts` automatically stamped every regional landing page with:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "48"
}
```
**Google Violation:** Google's Structured Data Quality Guidelines state that `AggregateRating` markup must reflect genuine, authentic user reviews visibly displayed on the webpage itself. Marking up an unsubstantiated "5.0 / 48 reviews" across hundreds of automated regional landing pages is classified by Google as **Structured Data Spam**, resulting in rich result removal or algorithmic demotion.

### Violation 2: Non-Standard `PostalAddress`
The injected address contained:
```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Local DFW Mobile Dispatch",
  "addressLocality": "Fort-worth",
  "addressRegion": "TX",
  "postalCode": "76102",
  "addressCountry": "US"
}
```
**Schema Violation:** `"Local DFW Mobile Dispatch"` is not a valid street address. For service businesses operating on mobile dispatch across a metropolitan area, Schema.org supports defining `areaServed` (GeoShape, City, or AdministrativeArea) without fabricating street numbers.

### Violation 3: Fragmented Node Graphs
Instead of an interconnected `@graph`, pages injected multiple detached `<script type="application/ld+json">` tags with duplicate, unlinked, or colliding `@id` fragments.

---

## 2. The Validated Schema.org Graph Specification

During Phase C, all JSON-LD schemas will be unified into a single, cohesive, fully-nested `@graph` array per page.

### 1. Global Entity: `Organization` (Publisher & Provider)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dallasfortworthzultys.com/#organization",
      "name": "DFW Business Communications",
      "url": "https://dallasfortworthzultys.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://dallasfortworthzultys.com/#logo",
        "url": "https://dallasfortworthzultys.com/zultys-logo.png",
        "caption": "DFW Business Communications - Authorized Zultys Partner"
      },
      "telephone": "+1-817-231-2962",
      "email": "info@dallasfortworthzultys.com",
      "sameAs": [
        "https://www.facebook.com/zultys",
        "https://www.linkedin.com/company/zultys-inc-"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-817-231-2962",
          "contactType": "customer service",
          "areaServed": "US-TX",
          "availableLanguage": "en"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+1-817-231-2962",
          "contactType": "sales",
          "areaServed": "US-TX",
          "availableLanguage": "en"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://dallasfortworthzultys.com/#website",
      "url": "https://dallasfortworthzultys.com",
      "name": "DFW Business Communications - Zultys Business Phone Systems",
      "description": "Authorized Zultys partner providing VoIP phone systems, cloud PBX, and unified communications in Dallas-Fort Worth.",
      "publisher": {
        "@id": "https://dallasfortworthzultys.com/#organization"
      }
    }
  ]
}
```

---

### 2. Regional Landing Page Entity: `ProfessionalService` & `Service`

For local service pages (e.g., `/fort-worth-zultys-systems`):
```json
{
  "@type": "ProfessionalService",
  "@id": "https://dallasfortworthzultys.com/fort-worth-zultys-systems#service-provider",
  "name": "DFW Business Communications - Fort Worth Zultys Phone Systems",
  "url": "https://dallasfortworthzultys.com/fort-worth-zultys-systems",
  "parentOrganization": {
    "@id": "https://dallasfortworthzultys.com/#organization"
  },
  "telephone": "+1-817-231-2962",
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "Fort Worth",
    "sameAs": "https://en.wikipedia.org/wiki/Fort_Worth,_Texas"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.7555,
    "longitude": -97.3308
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Zultys Telecommunication Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zultys Cloud PBX & Hosted VoIP Installation",
          "description": "On-site and cloud deployment of Zultys unified communications phone systems for Fort Worth businesses."
        }
      }
    ]
  }
}
```
*(Notice: Fabricated `AggregateRating` is completely eliminated. Address format conforms strictly to valid mobile dispatch service provider criteria).*

---

### 3. Hardware / Product Entity: `Product`
For hardware pages (`/fort-worth-zultys-zip-49g-phone`):
```json
{
  "@type": "Product",
  "@id": "https://dallasfortworthzultys.com/fort-worth-zultys-zip-49g-phone#product",
  "name": "Zultys ZIP 49G Executive IP Phone",
  "description": "Executive color touchscreen business IP phone featuring gigabit ethernet, integrated Bluetooth, and unified communications support.",
  "brand": {
    "@type": "Brand",
    "name": "Zultys"
  },
  "model": "ZIP 49G",
  "category": "Telecommunications Equipment",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://dallasfortworthzultys.com/fort-worth-zultys-zip-49g-phone",
    "seller": {
      "@id": "https://dallasfortworthzultys.com/#organization"
    }
  }
}
```

---

### 4. Canonical `BreadcrumbList` Entity
```json
{
  "@type": "BreadcrumbList",
  "@id": "https://dallasfortworthzultys.com/fort-worth-zultys-systems#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dallasfortworthzultys.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Service Areas",
      "item": "https://dallasfortworthzultys.com/sitemap.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Fort Worth Zultys Phone Systems",
      "item": "https://dallasfortworthzultys.com/fort-worth-zultys-systems"
    }
  ]
}
```

---

## 3. Automated Validation Protocol

In Phase C, `scripts/seo-build.ts` will validate all generated JSON-LD schema blocks against Schema.org constraints before writing to `dist/`:
1. Verify `@context` is `https://schema.org`.
2. Confirm zero presence of `AggregateRating` without attached, verifiable review items.
3. Validate that every `@id` reference points to a valid node within the graph.
4. Ensure valid telephone and URL formats.

---
*End of Report 5 (Schema.org Structured Data Repair and Validation Plan)*
