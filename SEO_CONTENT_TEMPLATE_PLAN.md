# SEO Content Template and Heading Structure Plan
**Production Domain:** `https://dallasfortworthzultys.com`  
**Document:** `SEO_CONTENT_TEMPLATE_PLAN.md`  
**Purpose:** Standardize H1 headings, eradicate low word count, correct skipped heading levels, enforce strict 140-155 character meta descriptions, and provide editorial templates across all page archetypes.

---

## 1. Audit Findings: Content & Heading Deficiencies

1. **Missing or Empty H1 (241 Pages):**  
   Because prerendered static HTML files in `dist/[route]/index.html` contained only `<div id="root"></div>`, audit crawlers recorded missing H1 tags on all 241 indexable pages.
2. **Low Word Count (241 Pages):**  
   Raw static HTML word count was recorded as 0 words. Even upon client-side execution, several municipal pages relied heavily on boilerplate cards rather than substantive, localized content.
3. **Overly Long Meta Descriptions (396 Pages):**  
   All generated meta descriptions averaged 227 characters, far exceeding the 160-character desktop truncation limit.
4. **Skipped Heading Levels (201 Heading Violations):**  
   Audit checks revealed repeated semantic hierarchy breaks, such as jumping directly from `<h1>` to `<h3>` without an intermediate `<h2>`, or `<h2>` directly to `<h4>`.

---

## 2. Universal Standards for All Pages

### Heading Hierarchy Rule (Zero Skipped Levels)
Every page MUST maintain a strict mathematical heading hierarchy:
- Exactly **one `<h1>`** per page, containing the primary geo/service keyword.
- Major conceptual divisions must use **`<h2>`**.
- Subsections or individual features within an `<h2>` block must use **`<h3>`**.
- FAQs or fine-grained specifications within an `<h3>` block may use **`<h4>`**.
- **Forbidden:** Never skip levels (e.g., `<h1>` directly to `<h3>`, or `<h2>` directly to `<h4>`).

### Meta Description Standards
- **Length Constraint:** Strictly **140 to 155 characters**.
- **Structure:** `[Core Solution] in [City/DFW], TX. [Key Value Proposition / Feature]. Call 817-231-2962 for local setup.`

---

## 3. Template Specifications by Archetype

### Archetype 1: Regional & City Pages (130+ North Texas Municipalities)

#### 1. Title & Meta Specification
- **`<title>` Formula:**  
  `Zultys Phone Systems [City] TX | Local VoIP Support` *(45-55 characters)*
- **`<meta name="description">` Formula:**  
  `Certified Zultys business phone systems in [City], TX. Cloud PBX, unified communications, and local on-site DFW support. Call 817-231-2962.` *(142 characters)*

#### 2. Heading Architecture
- **`<h1>` Formula:**  
  `[City] Zultys Business Phone Systems & Cloud VoIP Solutions`
- **`<h2>` Section 1:**  
  `Reliable Hosted PBX & Unified Communications for [City] Businesses`
  - **`<h3>` Subsections:**  
    - `Zultys Advanced Communicator (ZAC) for Desktop & Mobile`
    - `On-Premise Appliance or Secure Hosted Cloud PBX`
    - `Seamless Number Porting with Zero Business Downtime`
- **`<h2>` Section 2:**  
  `Local On-Site Installation and Dedicated DFW Engineering Support`
  - **`<h3>` Subsections:**  
    - `Same-Day Technician Dispatch Across [County] County`
    - `Custom Call Routing, Auto-Attendant & CRM Integration`
- **`<h2>` Section 3:**  
  `Frequently Asked Questions About Business Phone Systems in [City]`
  - **`<h3>` Questions:** (Formatted with semantic FAQ schema)
    - `Can our [City] company keep our existing telephone numbers?`
    - `How quickly can DFW Business Communications deploy our system?`

#### 3. Target Word Count: 650 – 850 words.

---

### Archetype 2: Hardware & IP Phone Pages (ZIP 49G, ZIP 47G, MX-Series)

#### 1. Title & Meta Specification
- **`<title>` Formula:**  
  `Zultys [Model] IP Phone | DFW Business Communications` *(52 characters)*
- **`<meta name="description">` Formula:**  
  `Deploy the Zultys [Model] IP phone in your Dallas-Fort Worth office. Color touchscreen, Gigabit audio & local on-site setup. Call 817-231-2962.` *(147 characters)*

#### 2. Heading Architecture
- **`<h1>` Formula:**  
  `Zultys [Model] Enterprise IP Phone`
- **`<h2>` Section 1:**  
  `Executive Touchscreen Communications & High-Definition Audio`
  - **`<h3>` Subsections:**  
    - `Gigabit Network Connectivity and Integrated PoE`
    - `Bluetooth & Headset Integration for Executive Workstations`
- **`<h2>` Section 2:**  
  `Native Integration with Zultys MX-Series and Cloud Platforms`
  - **`<h3>` Subsections:**  
    - `Visual Voicemail & Contact Center Status Monitoring`
    - `Remote Worker Support via Secure Softphone Mirroring`
- **`<h2>` Section 3:**  
  `Dallas-Fort Worth Hardware Deployment, Provisioning & Warranty`

#### 3. Target Word Count: 700 – 900 words.

---

### Archetype 3: Competitor Comparison Pages (Zultys vs. RingCentral, 8x8, Teams)

#### 1. Title & Meta Specification
- **`<title>` Formula:**  
  `Zultys vs [Competitor] | Dallas-Fort Worth PBX Comparison` *(56 characters)*
- **`<meta name="description">` Formula:**  
  `Compare Zultys vs [Competitor] for your DFW business. Transparent pricing, all-in-one licensing & local on-site support. Call 817-231-2962.` *(143 characters)*

#### 2. Heading Architecture
- **`<h1>` Formula:**  
  `Zultys vs. [Competitor]: DFW Business Phone System Comparison`
- **`<h2>` Section 1:**  
  `Key Architectural Differences: Total Cost of Ownership & All-in-One Licensing`
  - **`<h3>` Subsections:**  
    - `No Hidden Per-Feature Add-on Fees`
    - `Deployment Flexibility: Cloud, On-Premise, or Hybrid Survivability`
- **`<h2>` Section 2:**  
  `Local DFW On-Site Support vs. Nationwide 1-800 Call Centers`
  - **`<h3>` Subsections:**  
    - `Direct Access to Certified North Texas Telephony Engineers`
    - `Emergency On-Site Hardware Replacement and Dispatch`
- **`<h2>` Section 3:**  
  `Feature-by-Feature Telecom Matrix`

#### 3. Target Word Count: 1,000 – 1,300 words.

---

### Archetype 4: Industry Solutions Pages (Healthcare, Legal, Real Estate, Automotive)

#### 1. Title & Meta Specification
- **`<title>` Formula:**  
  `Zultys Phone Systems for [Industry] | DFW Telecom` *(49 characters)*
- **`<meta name="description">` Formula:**  
  `Tailored Zultys VoIP phone solutions for DFW [industry] organizations. Secure call recording, CRM integration & local setup. Call 817-231-2962.` *(147 characters)*

#### 2. Heading Architecture
- **`<h1>` Formula:**  
  `Zultys Business Communications for Dallas-Fort Worth [Industry]`
- **`<h2>` Section 1:**  
  `Meeting Compliance, Reliability, and High-Volume Call Demands`
  - **`<h3>` Subsections:**  
    - `Security, Encryption & Regulatory Standards`
    - `Intelligent Call Queues & Multi-Department Routing`
- **`<h2>` Section 2:**  
  `Mobility and Remote Communications for [Industry] Teams`
- **`<h2>` Section 3:**  
  `Implementation Case Studies & Client Success Stories in North Texas`

#### 3. Target Word Count: 800 – 1,100 words.

---
*End of Report 6 (SEO Content Template and Heading Structure Plan)*
