# AI Concierge Test Matrix & Routing Validation
**Project:** Dallas Fort Worth Zultys (`https://dallasfortworthzultys.com`)  
**Component:** AI Booking Concierge & Hero Concierge Card  
**Audit Reference:** `AI_CONCIERGE_AUDIT_AND_REPAIR_PLAN.md`  
**Allowlist Reference:** `src/data/conciergeDestinations.ts`  
**Intent Router:** `src/utils/conciergeRouter.ts`  
**Status:** All 12/12 Test Scenarios Passed (100% Deterministic & Canonical)

---

## Architecture Validation Rules
1. **Zero Hallucinated URLs:** The LLM generates natural conversational text, but all interactive destination buttons/pills are populated exclusively from `CONCIERGE_DESTINATIONS` allowlist.
2. **Strict Route Validation:** Any destination must exist in `VALID_PATHS`. The build fails if an invalid destination is added to the allowlist.
3. **Markdown Link Stripping:** Accidental markdown links in raw AI output (e.g. `[link](/some-fake-url)`) are sanitized and stripped before client delivery.
4. **Verified Human Fallback:** Every routing scenario provides direct phone contact (`tel:817-231-2962`) and a disclaimer that an authorized specialist can confirm final configuration details.

---

## Test Scenarios & Verification Results

| Scenario ID | User Query / Intent | Matched Category | Primary Action Pill | Secondary Action Pill | Fallback Phone | Status |
|---|---|---|---|---|---|---|
| **TC-01** | "How much does a 15-person cloud VoIP system cost?" | Pricing & Seat Calculation | **View Pricing Guide** (`/zultys-pricing`) | **Request DFW Quote** (`/contact?service=Cloud+PBX`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-02** | "We want to replace our old PBX with a hosted cloud phone system" | Cloud PBX / Hosted VoIP | **Explore Cloud PBX** (`/zultys-cloud-services`) | **Contact Specialist** (`/contact?service=Cloud+PBX`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-03** | "Do you sell on-premise hardware like the MX250 or MX-SE server?" | On-Premise IP-PBX | **Explore On-Premise MX** (`/fort-worth-zultys-on-premise`) | **Compare Cloud vs On-Prem** (`/blog/on-premise-vs-cloud-which-zultys-deployment-is-right-for-you`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-04** | "Can Zultys connect to Microsoft Teams for calling?" | Microsoft Teams Integration | **Teams Direct Routing** (`/zultys-vs-microsoft-teams`) | **Explore Solutions** (`/solutions`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-05** | "What IP phones do you offer? Looking for ZIP 49G gigabit phones" | Hardware & Desk Phones | **Browse IP Phones** (`/zultys-ip-phones`) | **Compare Hardware Specs** (`/products`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-06** | "Our office phones in Fort Worth are down, we need emergency repair" | Emergency DFW Support & Repair | **Request Urgent Repair** (`/contact?service=Installation+or+support`) | **Call Dispatch** (`tel:817-231-2962`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-07** | "We have 40 call center agents needing queue monitoring and recording" | Contact Center & Queues | **Contact Center Features** (`/fort-worth-zultys-contact-center`) | **Request Demo** (`/contact?service=Contact+center`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-08** | "We need Cat6 structured cabling and PoE network switches installed" | Cabling & Network Infrastructure | **Installation Services** (`/fort-worth-zultys-installation`) | **Network Readiness Guide** (`/blog/how-to-optimize-your-office-network-for-voip-performance`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-09** | "How does Zultys compare to RingCentral or Nextiva?" | Competitor Comparison | **Zultys vs RingCentral** (`/zultys-vs-ringcentral`) | **All Competitor Reviews** (`/zultys-vs-competitors`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-10** | "Do you service Arlington, Plano, and Frisco?" | DFW Regional Coverage | **Dallas Phone Systems** (`/dallas-zultys-phones`) | **Fort Worth Systems** (`/fort-worth-zultys-systems`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-11** | "Schedule an on-site survey and live phone demonstration" | Free Consultation / Booking | **Schedule Site Survey** (`/contact?service=Phone+system`) | **Call DFW Office** (`tel:817-231-2962`) | Call 817-231-2962 | ✅ PASS (200) |
| **TC-12** | "Tell me about weather in Dallas" (Unrelated / Out of Scope) | General / Fallback | **Explore Business Phone Systems** (`/`) | **Contact Specialist** (`/contact`) | Call 817-231-2962 | ✅ PASS (200) |

---

## Security & Reliability Verification

### 1. Rate Limiting Test
- **Endpoint:** `POST /api/ai-concierge`
- **Limit:** 30 requests per minute per IP address
- **Behavior:** Requests exceeding limit return HTTP 429 with fallback to deterministic intent router and direct telephone contact.
- **Verification:** Verified in `server.ts`.

### 2. Input Sanitization Test
- **Payload:** Overly long inputs (> 500 characters) or potential script tags.
- **Behavior:** Truncated to 500 characters, angle brackets stripped, and safely passed to model.
- **Verification:** Verified in `server.ts`.

### 3. Client Offline & Network Failure Graceful Fallback
- **Scenario:** Dev server stopped or AI provider API timeout.
- **Client Handling (`AIBookingConcierge.tsx` & `HeroAIConciergeCard.tsx`):**
  - Catches network failure.
  - Automatically executes client-side `routeConciergeIntent(userText)`.
  - Displays verified answer, action buttons, and direct phone link.
  - No empty message bubbles or unhandled rejection errors.
