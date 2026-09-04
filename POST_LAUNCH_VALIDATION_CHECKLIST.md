# DallasFortWorthZultys.com Post-Launch SEO & Technical Validation Checklist

This checklist provides the exact post-deployment QA and validation steps to ensure maximum indexation, ranking stability, and conversion tracking integrity across Dallas–Fort Worth.

---

## 1. Google Search Console & URL Inspection
- [ ] **Sitemap Submission**: Submit `https://dallasfortworthzultys.com/sitemap.xml` in GSC and verify that all 180+ submitted URLs report 200 OK status with 0 errors.
- [ ] **URL Inspection on Priority Pages**:
  - `https://dallasfortworthzultys.com/` (DFW Home)
  - `https://dallasfortworthzultys.com/zultys-business-phone-systems` (Core Systems)
  - `https://dallasfortworthzultys.com/cloud-services` (Cloud PBX)
  - `https://dallasfortworthzultys.com/pricing` (Pricing)
  - `https://dallasfortworthzultys.com/dallas-zultys-phones` (Dallas Anchor)
  - `https://dallasfortworthzultys.com/fort-worth-zultys-systems` (Fort Worth Anchor)
- [ ] **Request Indexing**: Request live testing and re-indexing on updated pages.

---

## 2. Schema.org & Rich Results Validation
- [ ] **Google Rich Results Test**: Test URLs via [Google Rich Results Test](https://search.google.com/test/rich-results) to verify:
  - `LocalBusiness` / `TelecommunicationsProvider` schema
  - `Product` & `Offer` schema on hardware pages
  - `Service` schema on installation, cloud, and support pages
  - `FAQPage` schema on pricing and FAQ pages
  - `BreadcrumbList` structured data hierarchy
- [ ] **Schema Markup Validator (Schema.org)**: Confirm zero syntax warnings or unresolved reference IDs.

---

## 3. Canonical & Redirect Status Code Verification
- [ ] **Verify 301 Status**: Test legacy URLs with curl or HTTP status checker:
  - `curl -I https://dallasfortworthzultys.com/dallas` -> `HTTP/2 301` -> `Location: /dallas-zultys-phones`
  - `curl -I https://dallasfortworthzultys.com/fort-worth` -> `HTTP/2 301` -> `Location: /fort-worth-zultys-systems`
  - `curl -I https://dallasfortworthzultys.com/request-a-quote` -> `HTTP/2 301` -> `Location: /contact`
- [ ] **Verify Self-Referential Canonicals**: Ensure `<link rel="canonical">` matches `<loc>` in `sitemap.xml`.

---

## 4. Mobile UX & Floating Widget Layout QA
- [ ] **No Floating Widget Overlaps**:
  - Verify on desktop: Customer "Text Us Now" button (`FloatingTextCTA`) is docked at **bottom-right** (`bottom-6 right-6`), and AI Grounding Assistant (`FloatingSEOAssistant`) is docked at **bottom-left** (`bottom-6 left-6`).
  - Verify on mobile: Sticky bottom action bar (`mobile-sticky-cta-bar`) sits at `bottom-0` with full-width Call & Text buttons, while AI Assistant sits at `bottom-20 left-4` without collision.
- [ ] **Touch Target Sizing**: Verify all phone and SMS buttons are ≥48px height for touch accuracy.

---

## 5. Core Web Vitals & Performance Monitoring
- [ ] **LCP (Largest Contentful Paint)**: < 2.5s on desktop & 4G mobile.
- [ ] **FID / INP (Interaction to Next Paint)**: < 200ms for smooth interaction.
- [ ] **CLS (Cumulative Layout Shift)**: < 0.1 during initial load and tooltip appearances.
- [ ] **Live HUD Verification**: Confirm the built-in HUD (`PerformanceMonitor`) registers high scores (90-100).

---

## 6. Lead Generation & Conversion Tracking QA
- [ ] **Click-to-Call**: Tap `tel:817-231-2962` across header, sticky bar, and footer; verify dialer opens.
- [ ] **SMS Link**: Tap `sms:817-231-2962` on mobile; verify pre-filled SMS opens.
- [ ] **Quote Builder Modal**: Complete full submission; verify submission state and email dispatch handler (`/api/contact`).
- [ ] **Free VoIP Audit Form**: Submit test audit request; verify form validation and confirmation.
