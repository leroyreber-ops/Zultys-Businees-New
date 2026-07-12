import fs from "fs";
import path from "path";
import { auditSite } from "../src/seo/seoAudit";
import { VALID_PATHS } from "../src/routes";

console.log("\n==================================================");
console.log("🚀 STARTING PRE-DEPLOYMENT SEO BUILD GATE & AUDIT");
console.log("==================================================");

let hasErrors = false;

// 1. Verify sitemap.xml exists in public/
const publicSitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
if (!fs.existsSync(publicSitemapPath)) {
  console.error("❌ ERROR: public/sitemap.xml is missing! Build sitemap first.");
  hasErrors = true;
} else {
  console.log("✅ sitemap.xml exists in public directory.");
}

// 2. Verify robots.txt exists and contains Sitemap link
const robotsPath = path.join(process.cwd(), "public", "robots.txt");
if (!fs.existsSync(robotsPath)) {
  console.error("❌ ERROR: public/robots.txt is missing!");
  hasErrors = true;
} else {
  const robotsContent = fs.readFileSync(robotsPath, "utf8");
  if (!robotsContent.toLowerCase().includes("sitemap:")) {
    console.error("❌ ERROR: robots.txt is missing the 'Sitemap:' crawler directive!");
    hasErrors = true;
  } else {
    console.log("✅ robots.txt contains active Sitemap crawler link.");
  }
}

// 3. Verify netlify.toml exists and has the edge function binding
const netlifyTomlPath = path.join(process.cwd(), "netlify.toml");
if (!fs.existsSync(netlifyTomlPath)) {
  console.warn("⚠️ WARNING: netlify.toml is missing from root workspace.");
} else {
  const netlifyContent = fs.readFileSync(netlifyTomlPath, "utf8");
  if (!netlifyContent.includes("spa-404")) {
    console.error("❌ ERROR: netlify.toml is missing the 'spa-404' edge function declaration!");
    hasErrors = true;
  } else {
    console.log("✅ netlify.toml is declared with correct spa-404 edge function handler.");
  }
}

// 4. Run the pure audit tool on all active routes
try {
  const report = auditSite(VALID_PATHS);
  const criticalFindings = report.findings.filter(f => f.severity === "Critical");
  
  if (criticalFindings.length > 0) {
    console.error(`\n❌ ERROR: Detected ${criticalFindings.length} Critical SEO Violations:\n`);
    criticalFindings.forEach((finding) => {
      console.error(`   - Route: ${finding.path}`);
      console.error(`     Issue: ${finding.rule}`);
      console.error(`     Current: ${finding.current}`);
      console.error(`     Recommendation: ${finding.recommended}\n`);
    });
    hasErrors = true;
  } else {
    console.log(`✅ SEO Title & Meta Tag validation passed. Health Score: ${report.summary.score}%`);
  }
} catch (err) {
  console.error("❌ Failed to perform SEO build-gate audit checks:", err);
  hasErrors = true;
}

console.log("==================================================");
if (hasErrors) {
  console.error("❌ SEO BUILD GATE: FAILED. Please resolve the critical violations listed above.");
  console.log("==================================================\n");
  process.exit(1);
} else {
  console.log("🎉 SEO BUILD GATE: SUCCESS! Site complies fully with Search Engine standards.");
  console.log("==================================================\n");
  process.exit(0);
}
