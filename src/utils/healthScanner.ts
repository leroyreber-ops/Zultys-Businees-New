import fs from "fs";
import path from "path";
import { extractRoutesFromApp } from "./sitemapGenerator";

export interface BrokenLinkIssue {
  type: "broken-link";
  filePath: string;
  targetLink: string;
  foundInCode: string;
  suggestedFix: string;
  fixed: boolean;
}

export interface MissingDescriptionIssue {
  type: "missing-description";
  route: string;
  filePath: string;
  pageName: string;
  suggestedFix: string;
  fixed: boolean;
}

export interface HealthCheckReport {
  timestamp: string;
  success: boolean;
  brokenLinks: BrokenLinkIssue[];
  missingDescriptions: MissingDescriptionIssue[];
  totalIssues: number;
  fixedCount: number;
}

// Levenshtein distance for finding closest route
function getLevenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

export function findClosestRoute(brokenRoute: string, validRoutes: string[]): string {
  if (validRoutes.length === 0) return "/";
  
  // Custom manual mappings for common mistakes
  const lower = brokenRoute.toLowerCase().trim();
  if (lower === "/contact-us" || lower === "/contactus") return "/contact";
  if (lower === "/pricing-plans" || lower === "/pricing-details" || lower === "/plans") return "/zultys-pricing";
  if (lower === "/about-us" || lower === "/aboutus") return "/about";
  if (lower === "/privacy") return "/privacy-policy";
  if (lower === "/terms") return "/terms-of-service";
  if (lower === "/home" || lower === "/index") return "/";
  if (lower === "/guides" || lower === "/manuals") return "/zultys-user-guides";
  if (lower === "/faq") return "/zultys-faq";
  if (lower === "/audit" || lower === "/free-audit") return "/free-voip-site-audit";
  if (lower === "/migration") return "/zultys-migration-guide-dfw";
  if (lower === "/crm") return "/zultys-crm-integration-guide";

  let minDistance = Infinity;
  let closest = "/";

  for (const route of validRoutes) {
    if (route === "/*" || route === "*") continue;
    
    // Direct substring matches take priority
    if (route !== "/" && (route.includes(lower) || lower.includes(route))) {
      return route;
    }
    
    const distance = getLevenshteinDistance(lower, route.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closest = route;
    }
  }

  return closest;
}

/**
 * Scans the workspace directory recursively for .tsx files
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== "node_modules" && file !== "dist" && file !== ".git" && file !== "build") {
        getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Runs the comprehensive Health Check Audit
 */
export function runHealthCheckAudit(): HealthCheckReport {
  const timestamp = new Date().toISOString();
  const validRoutes = extractRoutesFromApp();
  
  // Clean valid routes list
  const cleanValidRoutes = validRoutes.filter(r => r && r !== "/*" && r !== "*");
  
  const brokenLinks: BrokenLinkIssue[] = [];
  const missingDescriptions: MissingDescriptionIssue[] = [];

  const srcDir = path.join(process.cwd(), "src");
  const allFiles = getAllFiles(srcDir);

  // 1. Scan for broken internal links in all components and pages
  const linkRegex = /(?:to|href)\s*=\s*{?\s*["']([^"']+)["']\s*}?/g;
  
  for (const filePath of allFiles) {
    // Relative path for neat display
    const relativePath = path.relative(process.cwd(), filePath);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      let match;
      
      // Reset regex index
      linkRegex.lastIndex = 0;
      
      while ((match = linkRegex.exec(content)) !== null) {
        const fullLink = match[1];
        
        // Filter: Only internal page routes (start with / and don't have file extension or protocol)
        if (
          fullLink &&
          fullLink.startsWith("/") &&
          !fullLink.startsWith("//") &&
          !fullLink.includes(":") && // no mailto:, tel:, http:
          !fullLink.startsWith("/api/") && // skip backend api
          !fullLink.endsWith(".xml") &&
          !fullLink.endsWith(".png") &&
          !fullLink.endsWith(".jpg") &&
          !fullLink.endsWith(".svg") &&
          !fullLink.endsWith(".xsl") &&
          fullLink !== "/*"
        ) {
          // Strip hash fragments or query parameters for route matching
          const routeOnly = fullLink.split("#")[0].split("?")[0];
          
          if (routeOnly && routeOnly !== "/" && !cleanValidRoutes.includes(routeOnly)) {
            // Check if this issue is already registered for this file
            const alreadyLogged = brokenLinks.some(
              (issue) => issue.filePath === relativePath && issue.targetLink === fullLink
            );
            
            if (!alreadyLogged) {
              const suggested = findClosestRoute(routeOnly, cleanValidRoutes);
              brokenLinks.push({
                type: "broken-link",
                filePath: relativePath,
                targetLink: fullLink,
                foundInCode: match[0],
                suggestedFix: suggested,
                fixed: false
              });
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error reading file ${filePath} during link check:`, err);
    }
  }

  // 2. Scan pages for missing meta descriptions
  const pagesDir = path.join(process.cwd(), "src", "pages");
  const pageFiles = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir).filter(f => f.endsWith(".tsx")) : [];

  for (const pageFile of pageFiles) {
    const filePath = path.join(pagesDir, pageFile);
    const relativePath = path.relative(process.cwd(), filePath);
    const pageName = pageFile.replace(".tsx", "");
    
    // Skip general utility pages or dashboard page itself unless desired
    if (pageName === "SEODashboard" || pageName === "NotFound" || pageName === "Sitemap") {
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, "utf8");
      
      // Check if self-declared meta description is present in file
      const hasDescriptionKeyword = 
        content.includes("description:") || 
        content.includes("metaDescription") || 
        content.includes("meta.content =") ||
        content.includes("useSEO({");

      if (!hasDescriptionKeyword) {
        // Derive route for this page
        const route = mapPageToRoute(pageName, content);
        if (route) {
          // Generate a high-quality suggested description based on the route or page name
          const suggestedDesc = generateHeuristicDescription(pageName, route);
          
          missingDescriptions.push({
            type: "missing-description",
            route,
            filePath: relativePath,
            pageName,
            suggestedFix: suggestedDesc,
            fixed: false
          });
        }
      }
    } catch (err) {
      console.error(`Error reading page file ${filePath} for description check:`, err);
    }
  }

  return {
    timestamp,
    success: true,
    brokenLinks,
    missingDescriptions,
    totalIssues: brokenLinks.length + missingDescriptions.length,
    fixedCount: 0
  };
}

/**
 * Maps a page name to its expected route URL
 */
function mapPageToRoute(pageName: string, fileContent: string): string | null {
  const lower = pageName.toLowerCase();
  if (lower === "home") return "/";
  if (lower === "about") return "/about";
  if (lower === "contact") return "/contact";
  if (lower === "pricing") return "/zultys-pricing";
  if (lower === "blog") return "/blog";
  if (lower === "blogbestchoice") return "/blog/best-choice-voip-dfw";
  if (lower === "blogcloudvsonpremise") return "/blog/cloud-vs-on-premise-voip";
  if (lower === "blognetworkoptimization") return "/blog/network-optimization-voip";

  // Search app.tsx references if needed, or fall back to standard city/topic slug
  // For city pages like "Addison" -> "/addison-tx-zultys-phone-systems" or similar
  try {
    const appPath = path.join(process.cwd(), "src", "App.tsx");
    if (fs.existsSync(appPath)) {
      const appContent = fs.readFileSync(appPath, "utf8");
      const regex = new RegExp(`normalizedPath\\s*===\\s*['"]([^'"]+)['"]\\s*return\\s*<${pageName}\\s*\\/?>`, "i");
      const match = appContent.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (e) {}

  // Fallback slug mapping
  return `/${lower}`;
}

/**
 * Generates an elegant, highly optimized meta description based on page context
 */
function generateHeuristicDescription(pageName: string, route: string): string {
  const formattedName = pageName
    .replace(/([A-Z])/g, " $1")
    .trim();
  
  if (route.includes("vs")) {
    const parts = formattedName.split(" Vs ");
    const competitor = parts[1] || "Competitors";
    return `Compare Zultys vs ${competitor} business phone systems in Dallas-Fort Worth. Discover major cost savings, advanced features, and elite local support.`;
  }

  if (route.startsWith("/blog/")) {
    return `Read our expert certified telecom insights on ${formattedName}. Learn how to optimize your Dallas-Fort Worth office connectivity and reduce VoIP bills.`;
  }

  return `Expert ${formattedName} solutions for Dallas-Fort Worth businesses. Authorized local Zultys partner providing unified communications, cloud phone systems, and 24/7 on-site support.`;
}

/**
 * Automatically applies heals/fixes for selected issues
 */
export function applyAutomatedFixes(
  brokenLinksToFix: BrokenLinkIssue[],
  missingDescriptionsToFix: MissingDescriptionIssue[]
): { fixedLinksCount: number; fixedDescriptionsCount: number; logs: string[] } {
  let fixedLinksCount = 0;
  let fixedDescriptionsCount = 0;
  const logs: string[] = [];

  // 1. Fix Broken Links by rewriting the files
  for (const issue of brokenLinksToFix) {
    const fullPath = path.join(process.cwd(), issue.filePath);
    if (!fs.existsSync(fullPath)) {
      logs.push(`⚠️ Skipped broken link fix: File not found at ${issue.filePath}`);
      continue;
    }

    try {
      let content = fs.readFileSync(fullPath, "utf8");
      
      // We look for the exact reference. Let's make sure we replace the route safely
      // e.g. replacing 'to="/contact-us"' with 'to="/contact"'
      const brokenRef = issue.targetLink;
      const fixedRef = issue.suggestedFix;

      // Escape regex chars in brokenRef to make sure it matches correctly
      const escapedRef = brokenRef.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      
      // Match "brokenRef" inside quotes
      const refRegex = new RegExp(`(["'])${escapedRef}(["'])`, "g");
      
      if (refRegex.test(content)) {
        content = content.replace(refRegex, `$1${fixedRef}$2`);
        fs.writeFileSync(fullPath, content, "utf8");
        fixedLinksCount++;
        logs.push(`✅ Fixed link in ${issue.filePath}: Replaced "${brokenRef}" with "${fixedRef}"`);
      } else {
        // Fallback simple string replacement
        if (content.includes(`"${brokenRef}"`)) {
          content = content.replace(`"${brokenRef}"`, `"${fixedRef}"`);
          fs.writeFileSync(fullPath, content, "utf8");
          fixedLinksCount++;
          logs.push(`✅ Fixed link in ${issue.filePath} (fallback): Replaced "${brokenRef}" with "${fixedRef}"`);
        } else if (content.includes(`'${brokenRef}'`)) {
          content = content.replace(`'${brokenRef}'`, `'${fixedRef}'`);
          fs.writeFileSync(fullPath, content, "utf8");
          fixedLinksCount++;
          logs.push(`✅ Fixed link in ${issue.filePath} (fallback): Replaced "${brokenRef}" with "${fixedRef}"`);
        } else {
          logs.push(`⚠️ Could not find exact code string for "${brokenRef}" in ${issue.filePath}`);
        }
      }
    } catch (err: any) {
      logs.push(`❌ Failed to repair link in ${issue.filePath}: ${err.message}`);
    }
  }

  // 2. Fix Missing Descriptions by updating the centralized seoOverrides configuration file
  if (missingDescriptionsToFix.length > 0) {
    try {
      const overridesPath = path.join(process.cwd(), "src", "utils", "seoOverrides.ts");
      let overrides: Record<string, { title?: string; description?: string }> = {};

      if (fs.existsSync(overridesPath)) {
        try {
          const fileContent = fs.readFileSync(overridesPath, "utf8");
          // Extract the JSON object from code: export const seoOverrides: Record<string, any> = { ... };
          const match = fileContent.match(/export\s+const\s+seoOverrides(?::\s*Record<string,\s*any>)?\s*=\s*({[\s\S]*});/);
          if (match && match[1]) {
            // Safe evaluation or parsing of the object
            // To make it fully safe, let's write it in a clean format
            const cleanObjStr = match[1]
              .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
              .replace(/\/\/.*$/gm, ""); // remove inline comments
            // Since it's a TS file, we can parse it safely or overwrite
          }
        } catch (e) {}
      }

      // Read current overrides.json if it exists, otherwise create it
      const overridesJsonPath = path.join(process.cwd(), "seo-overrides.json");
      let currentOverrides: Record<string, { title?: string; description?: string }> = {};
      if (fs.existsSync(overridesJsonPath)) {
        try {
          currentOverrides = JSON.parse(fs.readFileSync(overridesJsonPath, "utf8") || "{}");
        } catch (e) {}
      }

      for (const issue of missingDescriptionsToFix) {
        const normalizedRoute = issue.route.toLowerCase();
        currentOverrides[normalizedRoute] = {
          title: `${issue.pageName.replace(/([A-Z])/g, " $1").trim()} | DFW Zultys Partner`,
          description: issue.suggestedFix
        };
        fixedDescriptionsCount++;
        logs.push(`✅ Dynamic override saved for route ${issue.route}: Assigned Meta Description.`);
      }

      // Write updated overrides to seo-overrides.json
      fs.writeFileSync(overridesJsonPath, JSON.stringify(currentOverrides, null, 2), "utf8");

      // Write compiled TS file of overrides for client-side compile safety
      const tsCode = `/**
 * Dynamic SEO Overrides Calibration File
 * Generated automatically by the daily SEO Health Check healing engine.
 */
export const seoOverrides: Record<string, { title?: string; description?: string }> = ${JSON.stringify(currentOverrides, null, 2)};
`;
      fs.writeFileSync(overridesPath, tsCode, "utf8");
    } catch (err: any) {
      logs.push(`❌ Failed to commit SEO metadata overrides: ${err.message}`);
    }
  }

  return {
    fixedLinksCount,
    fixedDescriptionsCount,
    logs
  };
}
