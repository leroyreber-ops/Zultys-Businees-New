# Netlify Production Environment & Hostinger SMTP Setup Guide

**Site:** `dallasfortworthzultys.com`  
**Hosting Platform:** Netlify  
**Email Provider:** Hostinger Business Email  
**Security Standard:** Strict zero-credential leakage  

---

## 1. Required Netlify Environment Variables

Configure the following variables in the Netlify Dashboard. **Never** commit passwords, API keys, or private values into Git repositories, client bundles, or pull requests.

| Variable Name | Required | Recommended Production Value | Description |
|---|:---:|---|---|
| `EMAIL_HOST` | **Yes** | `smtp.hostinger.com` | Hostinger outgoing SMTP server |
| `EMAIL_PORT` | **Yes** | `465` | Outgoing port for implicit SSL/TLS |
| `EMAIL_SECURE` | **Yes** | `true` | Enforces TLS handshake immediately on connect |
| `EMAIL_USER` | **Yes** | `info@dallasfortworthzultys.com` | Authenticated Hostinger mailbox address |
| `EMAIL_PASS` | **Yes** | *(Hostinger Mailbox Password)* | Password generated in Hostinger hPanel |
| `EMAIL_FROM` | No | `"Dallas Fort Worth Zultys" <info@dallasfortworthzultys.com>` | Verified sender display name and address |
| `CONTACT_FORM_TO_EMAIL` | No | `info@dallasfortworthzultys.com` | Destination inbox for general contact forms |
| `BOOKING_RECIPIENT_EMAIL` | No | `info@dallasfortworthzultys.com` | Destination inbox for consultation bookings |
| `QUOTE_RECIPIENT_EMAIL` | No | `info@dallasfortworthzultys.com` | Destination inbox for quick quote inquiries |
| `SEO_REPORT_RECIPIENT_EMAIL` | No | `info@dallasfortworthzultys.com` | Destination for weekly SEO digests |

---

## 2. Step-by-Step Netlify Dashboard Configuration

1. Log in to [Netlify App](https://app.netlify.com).
2. Select your site: **`dallasfortworthzultys`** (or linked project name).
3. Navigate to **Site configuration** > **Environment variables**.
4. Click **Add a variable** > **Add a single variable** (or **Import from .env**).
5. Add each variable listed in Section 1:
   - Key: `EMAIL_HOST`, Value: `smtp.hostinger.com`
   - Key: `EMAIL_PORT`, Value: `465`
   - Key: `EMAIL_SECURE`, Value: `true`
   - Key: `EMAIL_USER`, Value: `info@dallasfortworthzultys.com`
   - Key: `EMAIL_PASS`, Value: *(Enter mailbox password)*
   - Key: `EMAIL_FROM`, Value: `"Dallas Fort Worth Zultys" <info@dallasfortworthzultys.com>`
6. Scope: Select **All deploy contexts** (Production, Deploy Previews, Branch deploys).
7. Click **Create variable**.
8. Trigger a new deployment: Go to **Deploys** > **Trigger deploy** > **Clear cache and deploy site** to ensure the build environment injects the updated environment variables.

---

## 3. Hostinger DNS & Mailbox Authentication (SPF, DKIM, DMARC)

To prevent outbound lead notifications from landing in spam folders, verify these DNS records in your Hostinger hPanel or Cloudflare DNS:

### 1. MX Records
- Priority: `10` -> `mx1.hostinger.com`
- Priority: `20` -> `mx2.hostinger.com`

### 2. SPF Record (TXT)
- Host: `@`
- Value: `v=spf1 include:_netblocks.hostedemail.com include:relay.mailbaby.net -all` (or Hostinger's standard: `v=spf1 include:_spf.mail.hostinger.com ~all`)

### 3. DKIM Record (CNAME / TXT)
- Ensure Hostinger DKIM key is active under **Emails** > **Domain Settings** > **DKIM**.

### 4. DMARC Record (TXT)
- Host: `_dmarc`
- Value: `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@dallasfortworthzultys.com; pct=100; adkim=r; aspf=r`

---

## 4. Post-Deployment Verification Procedure

After setting environment variables in Netlify and deploying:

1. **Test Contact Form:**
   - Visit `https://dallasfortworthzultys.com/contact`
   - Submit a test inquiry with your contact details.
   - Confirm immediate success notification on screen.
   - Verify receipt in `info@dallasfortworthzultys.com`.

2. **Test Quick Quote Modal:**
   - Click "Get Custom Quote" on the home page or pricing page.
   - Complete the 4-step wizard.
   - Verify quote notification receipt.

3. **Test AI Booking Concierge:**
   - Open the AI Concierge floating launcher on the bottom left.
   - Select "Book Consultation".
   - Enter name and phone number.
   - Confirm booking confirmation screen with structured Reference ID (`DFW-######`).

4. **Verify Container / Function Logs:**
   - Check Netlify Function or server logs.
   - Confirm log line format: `[MAIL_SENT] endpoint=/api/send-email recipient=info@dallasfortworthzultys.com`.
   - Ensure zero passwords or tokens appear in log lines.
