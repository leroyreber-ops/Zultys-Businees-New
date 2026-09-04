# Email Delivery and Lead Routing Architecture Audit

**Repository:** `Zultys-Businees-New`  
**Target Domain:** `https://dallasfortworthzultys.com`  
**SMTP Service Provider:** Hostinger  
**SMTP Configuration:** `smtp.hostinger.com:465` (SSL/TLS, `EMAIL_SECURE=true`)  
**Audit Date:** September 2026  
**Status:** Completed & Centralized  

---

## 1. Executive Summary

This audit establishes a hardened, centralized email delivery and lead-routing architecture across the Dallas Fort Worth Zultys production web application. It addresses the historical socket hang / timeout defect (`Greeting never received`), prevents header injection vulnerabilities, implements in-memory sliding-window rate limiting, establishes strict sender identity compliance, and validates canonical AI Concierge routing.

---

## 2. Environment Variables & Configuration Matrix

All email dispatch mechanisms are centralized in `/src/utils/mailConfig.ts` and consumed server-side in `server.ts`. Client-side bundles and browser requests have zero access to credentials.

| Variable Name | Required | Default Value | Description & Security Boundaries |
|---|:---:|---|---|
| `EMAIL_HOST` | **Yes** | `smtp.hostinger.com` | Hostinger outgoing SMTP server. |
| `EMAIL_PORT` | **Yes** | `465` | Target port. 465 triggers implicit TLS/SSL. |
| `EMAIL_SECURE` | **Yes** | `true` | Boolean flag parsed strictly. Enforces TLS on port 465. |
| `EMAIL_USER` | **Yes** | *(None)* | Authenticated mailbox (e.g., `info@dallasfortworthzultys.com`). |
| `EMAIL_PASS` | **Yes** | *(None)* | Mailbox password. Never exposed, printed, or logged. |
| `EMAIL_FROM` | No | `"Dallas Fort Worth Zultys" <EMAIL_USER>` | RFC-compliant sender header. |
| `CONTACT_FORM_TO_EMAIL` | No | `EMAIL_USER` / `info@dallasfortworthzultys.com` | Primary inbox for contact form leads. |
| `BOOKING_RECIPIENT_EMAIL` | No | `CONTACT_FORM_TO_EMAIL` | Inbox for consultation scheduling. |
| `QUOTE_RECIPIENT_EMAIL` | No | `CONTACT_FORM_TO_EMAIL` | Dedicated inbox for multi-user quote inquiries. |
| `SEO_REPORT_RECIPIENT_EMAIL` | No | `CONTACT_FORM_TO_EMAIL` | Recipient for weekly automated SEO digests. |

---

## 3. Hostinger SMTP & TLS Socket Resolution

### The "Greeting never received" Root Cause
Hostinger Port 465 requires an immediate SSL/TLS handshake upon TCP socket connection. If a transporter connects with `secure: false` (standard for port 587 STARTTLS) to port 465, the client expects cleartext greeting while the server expects TLS ClientHello, causing the socket to hang indefinitely until a timeout error is thrown:
`Error: Greeting never received at SMTPConnection._formatError`.

### Corrective Implementation in `mailConfig.ts`
1. **Strict Boolean Parsing:** `EMAIL_SECURE` is normalized (`true` / `1` -> `true`). If not set, port 465 defaults automatically to `secure: true`.
2. **Deterministic Socket Timeouts:** Explicit network timeouts prevent hanging server connections:
   - `connectionTimeout`: `15,000ms` (TCP connection establishment)
   - `greetingTimeout`: `15,000ms` (Hostinger SMTP greeting reception)
   - `socketTimeout`: `20,000ms` (Data payload transfer)
3. **No Unencrypted Fallback on 465:** Prevents downgrade attacks or cleartext password leakage over public networks.

---

## 4. Security, Spam Protection & Injection Defenses

### A. Header Injection Prevention
- All user-supplied fields mapped to email headers (`From`, `To`, `Reply-To`, `Subject`) are sanitized using `sanitizeHeader()`.
- Strips CR (`\r`), LF (`\n`), null bytes (`\0`), and control characters (`\x00-\x1f\x7f`).
- Enforces strict length limits (Subject: 120 chars, Name: 80 chars).

### B. Honeypot Anti-Bot Field
- Lead forms include hidden honeypot parameters (`website_url`, `bot_trap`).
- Submissions containing values in honeypot fields are rejected with HTTP 400 (`Automated submission detected and blocked`).

### C. In-Memory Sliding-Window Rate Limiting
- `checkLeadRateLimit(ip, endpoint, maxAllowed = 10, windowMs = 600,000)` enforces a maximum of 10 submissions per 10-minute window per client IP.
- Rate-limited clients receive HTTP 429 (`Too many submission attempts. Please call 817-231-2962`).

### D. Safe Error Logging & Credential Masking
- The `logSafeMailError()` utility logs error codes, safe messages, and sanitized context.
- Strips email passwords, auth tokens, and raw socket stacks from output logs.

---

## 5. Audited Endpoints & Lead Routing Architecture

### 1. `/api/send-email` (Contact & Quote Submissions)
- **Validation:** Requires non-empty name and at least ONE valid contact method (valid email or valid phone number).
- **Sender (From):** Fixed authenticated mailbox (`mailConfig.from`). Never spoofed to visitor's address.
- **Reply-To:** Visitor's email (if provided and validated). Fallback to authenticated mailbox.
- **Recipient (To):** Route dynamically to `QUOTE_RECIPIENT_EMAIL` if quote fields are present; otherwise `CONTACT_FORM_TO_EMAIL`.
- **Truthful Status:** Returns HTTP 200 on successful SMTP delivery; HTTP 503 if credentials unconfigured; HTTP 500 on SMTP dispatch error.

### 2. `/api/book-consultation` (Consultation Scheduling)
- **Validation:** Name, at least one contact channel, appointment parameters.
- **Reference ID:** Generates structured reference ID (e.g., `DFW-######`).
- **Sender (From):** Verified corporate identity.
- **Recipient (To):** `BOOKING_RECIPIENT_EMAIL`.
- **Error Behavior:** No false successes. If delivery fails, client receives an error with the telephone hotline `817-231-2962`.

### 3. `/api/seo/send-scheduled-report` (Weekly Visibility Digest)
- **Validation:** Recipient validated with `validateEmail()`.
- **Sender (From):** `"Dallas Fort Worth Zultys" <EMAIL_USER>`.
- **Dispatch:** Directly uses `createMailTransporter()`. Returns accurate status (`sent: true` or `sent: false`).

---

## 6. AI Concierge & Front-End Routing Review

All forms and AI Concierge intents resolve to verified canonical URLs and direct phone lines:
- **Phone Calls:** `tel:817-231-2962` (Dallas–Fort Worth Local Communications Desk).
- **Quote Requests:** `/pricing` or `/contact?service=Pricing+%26+Quote`.
- **Consultation Booking:** `/contact` or interactive consultation modal.
- **Support & Dispatch:** `/services/phone-system-installation-dallas-fort-worth` or direct call `817-231-2962`.
