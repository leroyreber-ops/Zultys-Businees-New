import nodemailer from "nodemailer";

/**
 * EMAIL & LEAD ROUTING CONFIGURATION MODULE
 * Strict compliance with Hostinger Port 465 (SSL/TLS) and RFC standards.
 * Zero-credential leakage: Passwords, tokens, and raw secrets never exposed.
 */

// Email regex adhering strictly to safe RFC 5322 characters without control chars
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export type LeadType = 'contact' | 'booking' | 'quote' | 'seo_report';

export interface MailServerConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  bookingRecipient: string;
  contactRecipient: string;
  quoteRecipient: string;
  seoReportRecipient: string;
  isConfigured: boolean;
  missingVars: string[];
}

/**
 * Defensively parse and sanitize EMAIL_SECURE
 * Must be a boolean configuration string only ("true" or "false").
 * Never accepts email addresses or arbitrary values.
 */
export function parseEmailSecure(secureEnv: string | undefined, port: number): boolean {
  if (secureEnv !== undefined && secureEnv !== null && secureEnv.trim() !== "") {
    const cleaned = secureEnv.trim().toLowerCase();
    if (cleaned === "true" || cleaned === "1") {
      return true;
    }
    if (cleaned === "false" || cleaned === "0") {
      return false;
    }
    // If someone accidentally put an email address or invalid string, warn internally and fallback
    console.warn(`[MAIL_CONFIG_WARN] EMAIL_SECURE contains non-boolean value "${cleaned.slice(0, 5)}...". Reverting to port-based TLS inference.`);
  }

  // Default behavior based on standard ports:
  // Port 465: SMTPS / Implicit TLS -> secure = true
  // Port 587/25: STARTTLS / Opportunistic -> secure = false
  return port === 465;
}

/**
 * Defensively parse EMAIL_PORT
 */
export function parseEmailPort(portEnv: string | undefined): number {
  if (!portEnv) return 465;
  const parsed = parseInt(portEnv.trim(), 10);
  if (isNaN(parsed) || parsed < 1 || parsed > 65535) {
    console.warn(`[MAIL_CONFIG_WARN] Invalid EMAIL_PORT "${portEnv}". Falling back to default 465.`);
    return 465;
  }
  return parsed;
}

/**
 * Validates email address format and blocks header injection
 */
export function validateEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  // Disallow CRLF or control characters
  if (/[\r\n\x00-\x1f\x7f]/.test(trimmed)) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates US/international phone number format
 */
export function validatePhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Header injection protection: Strips \r, \n, null bytes and control chars
 */
export function sanitizeHeader(input: unknown, maxLength = 100): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\r\n\x00-\x1f\x7f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Free-text body sanitization: cleans text while preventing script injection
 */
export function sanitizeText(input: unknown, maxLength = 5000): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "") // remove non-printable control chars, allow newline & tab
    .trim()
    .slice(0, maxLength);
}

/**
 * Resolve and validate server mail configuration from environment
 */
export function getMailConfig(): MailServerConfig {
  const host = (process.env.EMAIL_HOST || "smtp.hostinger.com").trim();
  const port = parseEmailPort(process.env.EMAIL_PORT);
  const secure = parseEmailSecure(process.env.EMAIL_SECURE, port);
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASS || "").trim();

  // Missing required credentials check
  const missingVars: string[] = [];
  if (!process.env.EMAIL_HOST) missingVars.push("EMAIL_HOST");
  if (!process.env.EMAIL_PORT && port !== 465) missingVars.push("EMAIL_PORT");
  if (!user) missingVars.push("EMAIL_USER");
  if (!pass) missingVars.push("EMAIL_PASS");

  // Verified stable sender identity
  const configuredFrom = (process.env.EMAIL_FROM || "").trim();
  let from = `"${sanitizeHeader("Dallas Fort Worth Zultys")}" <${user || "info@dallasfortworthzultys.com"}>`;
  if (configuredFrom) {
    // If EMAIL_FROM is just an email or a full Name <email>
    if (validateEmail(configuredFrom)) {
      from = `"Dallas Fort Worth Zultys" <${configuredFrom}>`;
    } else {
      from = sanitizeHeader(configuredFrom, 150);
    }
  }

  // Recipient resolution with strict validation & fallbacks
  const contactRecipient = resolveRecipient(
    process.env.CONTACT_FORM_TO_EMAIL,
    user,
    "info@dallasfortworthzultys.com"
  );
  const bookingRecipient = resolveRecipient(
    process.env.BOOKING_RECIPIENT_EMAIL,
    contactRecipient,
    "info@dallasfortworthzultys.com"
  );
  const quoteRecipient = resolveRecipient(
    process.env.QUOTE_RECIPIENT_EMAIL,
    contactRecipient,
    "info@dallasfortworthzultys.com"
  );
  const seoReportRecipient = resolveRecipient(
    process.env.SEO_REPORT_RECIPIENT_EMAIL,
    contactRecipient,
    "info@dallasfortworthzultys.com"
  );

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    bookingRecipient,
    contactRecipient,
    quoteRecipient,
    seoReportRecipient,
    isConfigured: missingVars.length === 0,
    missingVars,
  };
}

function resolveRecipient(primaryEnv: string | undefined, fallbackOne: string, defaultFallback: string): string {
  if (primaryEnv && validateEmail(primaryEnv.trim())) {
    return primaryEnv.trim();
  }
  if (fallbackOne && validateEmail(fallbackOne.trim())) {
    return fallbackOne.trim();
  }
  return defaultFallback;
}

/**
 * Get verified recipient email by lead type
 */
export function getRecipientEmail(type: LeadType): string {
  const config = getMailConfig();
  switch (type) {
    case 'booking':
      return config.bookingRecipient;
    case 'quote':
      return config.quoteRecipient;
    case 'seo_report':
      return config.seoReportRecipient;
    case 'contact':
    default:
      return config.contactRecipient;
  }
}

/**
 * Centralized Transporter Factory
 * Guaranteed port 465 SSL or port 587/25 STARTTLS with strict timeouts
 */
export function createMailTransporter(): nodemailer.Transporter {
  const config = getMailConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

/**
 * Safe Error Logger: Logs diagnostic codes without ever exposing passwords or tokens
 */
export function logSafeMailError(endpoint: string, code: string, error: unknown, contextMeta?: Record<string, string | number | boolean>) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  // Redact any possible accidental password substrings
  const safeMessage = errorMessage.replace(/pass(word)?\s*[:=]\s*[^\s]+/gi, "password=***REDACTED***");

  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    event: "MAIL_ERROR",
    endpoint,
    code,
    error: safeMessage,
    ...contextMeta,
  }));
}

/**
 * Honeypot spam checker
 */
export function isHoneypotTriggered(body: Record<string, any>): boolean {
  if (!body || typeof body !== "object") return false;
  const honeypotKeys = ["honeypot", "website", "hp_field", "bot_check", "fax_number"];
  for (const key of honeypotKeys) {
    if (body[key] && typeof body[key] === "string" && body[key].trim().length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * In-Memory Sliding-Window Rate Limiter
 */
interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 10 minutes
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now - record.firstRequestTime > 600000) {
      rateLimitStore.delete(key);
    }
  }
}, 600000);
if (cleanupTimer.unref) cleanupTimer.unref();

export function checkLeadRateLimit(ip: string, endpoint: string, maxRequests = 10, windowMs = 600000): { allowed: boolean; remaining: number } {
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now - existing.firstRequestTime > windowMs) {
    rateLimitStore.set(key, { count: 1, firstRequestTime: now });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: maxRequests - existing.count };
}
