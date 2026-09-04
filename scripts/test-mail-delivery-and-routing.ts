import {
  getMailConfig,
  validateEmail,
  validatePhone,
  sanitizeHeader,
  sanitizeText,
  isHoneypotTriggered,
  checkLeadRateLimit,
  getRecipientEmail,
  createMailTransporter
} from "../src/utils/mailConfig";
import { routeConciergeIntent } from "../src/utils/conciergeRouter";

interface TestResult {
  id: number;
  name: string;
  category: string;
  status: "PASS" | "FAIL";
  details: string;
}

const results: TestResult[] = [];

function runTest(id: number, name: string, category: string, fn: () => { pass: boolean; details: string }) {
  try {
    const outcome = fn();
    results.push({
      id,
      name,
      category,
      status: outcome.pass ? "PASS" : "FAIL",
      details: outcome.details
    });
  } catch (err: any) {
    results.push({
      id,
      name,
      category,
      status: "FAIL",
      details: `Exception thrown: ${err.message}`
    });
  }
}

console.log("=================================================");
console.log("EXECUTING 11 EMAIL DELIVERY & LEAD ROUTING TESTS");
console.log("=================================================");

// Test 1: Valid contact submission with email only
runTest(1, "Valid contact submission with email only", "Validation & Contact", () => {
  const email = "client.test@company.com";
  const phone = "";
  const hasValidEmail = validateEmail(email);
  const hasValidPhone = validatePhone(phone);
  const pass = hasValidEmail && !hasValidPhone;
  return {
    pass,
    details: `Email validation: ${hasValidEmail} (true expected), Phone validation: ${hasValidPhone} (false expected)`
  };
});

// Test 2: Valid contact submission with phone only
runTest(2, "Valid contact submission with phone only", "Validation & Contact", () => {
  const email = "";
  const phone = "(817) 555-0199";
  const hasValidEmail = validateEmail(email);
  const hasValidPhone = validatePhone(phone);
  const pass = !hasValidEmail && hasValidPhone;
  return {
    pass,
    details: `Email validation: ${hasValidEmail} (false expected), Phone validation: ${hasValidPhone} (true expected)`
  };
});

// Test 3: Valid contact submission with both email and phone
runTest(3, "Valid contact submission with both email and phone", "Validation & Contact", () => {
  const email = "operations@logisticsdfw.com";
  const phone = "817-231-2962";
  const hasValidEmail = validateEmail(email);
  const hasValidPhone = validatePhone(phone);
  const pass = hasValidEmail && hasValidPhone;
  return {
    pass,
    details: `Both validated successfully: email=${hasValidEmail}, phone=${hasValidPhone}`
  };
});

// Test 4: Submission with missing name
runTest(4, "Submission with missing name", "Input Validation", () => {
  const rawName = "   \n  \t";
  const cleanName = sanitizeHeader(rawName, 80);
  const pass = cleanName === "";
  return {
    pass,
    details: `Sanitized empty name evaluates to empty string: '${cleanName}'`
  };
});

// Test 5: Submission with missing email and phone
runTest(5, "Submission with missing email and phone", "Input Validation", () => {
  const email = "";
  const phone = "";
  const hasValidEmail = validateEmail(email);
  const hasValidPhone = validatePhone(phone);
  const pass = !hasValidEmail && !hasValidPhone;
  return {
    pass,
    details: `Rejection triggered because neither valid email nor valid phone provided`
  };
});

// Test 6: Submission with invalid email format
runTest(6, "Submission with invalid email format", "Input Validation", () => {
  const badEmails = [
    "invalid-at-domain",
    "plainaddress",
    "@missingusername.com",
    "bad.email@domain..com",
    "attacker@domain.com\r\nBcc: victim@domain.com"
  ];
  const allInvalid = badEmails.every(e => !validateEmail(e));
  return {
    pass: allInvalid,
    details: `All 5 malicious/malformed email addresses correctly rejected: ${allInvalid}`
  };
});

// Test 7: Submission with oversized payload / injection
runTest(7, "Submission with oversized payload & header injection", "Security & Sanitization", () => {
  const attackHeader = "Leroy Reber\r\nBcc: evil@phishing.com\nSubject: Spoofed";
  const sanitizedHeader = sanitizeHeader(attackHeader, 50);
  const hugeMessage = "A".repeat(10000);
  const sanitizedMessage = sanitizeText(hugeMessage, 4000);

  const headerSafe = !sanitizedHeader.includes("\r") && !sanitizedHeader.includes("\n");
  const lengthSafe = sanitizedMessage.length <= 4000;
  return {
    pass: headerSafe && lengthSafe,
    details: `Newline stripping: ${headerSafe}, Message capped at 4000 chars: ${lengthSafe} (actual: ${sanitizedMessage.length})`
  };
});

// Test 8: Rate-limit behavior
runTest(8, "Rate-limit behavior (10 requests per window)", "Rate Limiting", () => {
  const testIp = "192.0.2.42";
  const endpoint = "/api/test-rate-limit";
  let blocked = false;
  for (let i = 0; i < 15; i++) {
    const check = checkLeadRateLimit(testIp, endpoint, 5, 60000);
    if (!check.allowed) {
      blocked = true;
      break;
    }
  }
  return {
    pass: blocked,
    details: `Rate limiter triggered and blocked excess requests: ${blocked}`
  };
});

// Test 9: Missing SMTP environment variable handling
runTest(9, "Missing SMTP environment variable handling", "SMTP Configuration", () => {
  // Test isolation with clean env
  const origHost = process.env.EMAIL_HOST;
  delete process.env.EMAIL_HOST;
  const config = getMailConfig();
  process.env.EMAIL_HOST = origHost;

  const pass = !config.isConfigured && config.missingVars.includes("EMAIL_HOST");
  return {
    pass,
    details: `Properly detected unconfigured state: isConfigured=${config.isConfigured}, missing=[${config.missingVars.join(",")}]`
  };
});

// Test 10: AI Concierge handoff to quote/contact/booking
runTest(10, "AI Concierge handoff to quote/contact/booking", "Lead Routing", () => {
  const qContact = routeConciergeIntent("I need to talk to someone about an office phone system");
  const qQuote = routeConciergeIntent("Can I get a quote for 25 cloud phones?");
  const qSupport = routeConciergeIntent("I need Zultys technician support in Fort Worth");

  const contactHasRoute = qContact.actions.some(a => a.url.startsWith("/contact"));
  const quoteHasRoute = qQuote.actions.some(a => a.url.startsWith("/pricing") || a.url.startsWith("/contact"));
  const supportHasRoute = qSupport.actions.some(a => a.url.includes("installation") || a.url.startsWith("/contact"));
  const allHavePhoneFallback = [qContact, qQuote, qSupport].every(r => r.fallback.phone === "817-231-2962");

  const pass = contactHasRoute && quoteHasRoute && supportHasRoute && allHavePhoneFallback;
  return {
    pass,
    details: `Contact route: ${contactHasRoute}, Quote route: ${quoteHasRoute}, Support route: ${supportHasRoute}, Phone fallback 817-231-2962: ${allHavePhoneFallback}`
  };
});

// Test 11: Port 465 SSL/TLS configuration resolution (EMAIL_SECURE=true)
runTest(11, "Port 465 SSL/TLS configuration resolution", "Hostinger SMTP", () => {
  const origPort = process.env.EMAIL_PORT;
  const origSecure = process.env.EMAIL_SECURE;

  process.env.EMAIL_PORT = "465";
  process.env.EMAIL_SECURE = "true";
  const config465 = getMailConfig();

  process.env.EMAIL_PORT = "587";
  process.env.EMAIL_SECURE = "false";
  const config587 = getMailConfig();

  // Restore
  if (origPort) process.env.EMAIL_PORT = origPort; else delete process.env.EMAIL_PORT;
  if (origSecure) process.env.EMAIL_SECURE = origSecure; else delete process.env.EMAIL_SECURE;

  const pass = config465.port === 465 && config465.secure === true &&
               config587.port === 587 && config587.secure === false;

  return {
    pass,
    details: `Port 465 secure=${config465.secure} (expected true), Port 587 secure=${config587.secure} (expected false)`
  };
});

console.log("\n=================================================");
console.log("TEST EXECUTION RESULTS:");
console.log("=================================================");
results.forEach(r => {
  const symbol = r.status === "PASS" ? "✅" : "❌";
  console.log(`${symbol} Scenario ${r.id}: ${r.name}`);
  console.log(`   Category: ${r.category} | Status: ${r.status}`);
  console.log(`   Details:  ${r.details}\n`);
});

const passCount = results.filter(r => r.status === "PASS").length;
const totalCount = results.length;
console.log(`Summary: ${passCount}/${totalCount} tests PASSED.`);
if (passCount !== totalCount) {
  process.exit(1);
}
