import fs from "fs";
import path from "path";
import { extractRoutesFromApp } from "./sitemapGenerator";

export interface HeadingIssue {
  type: 'missing-h1' | 'multiple-h1' | 'skipped-level';
  severity: 'critical' | 'warning';
  message: string;
  contextSnippet?: string;
  suggestedFix: string;
  id?: string;
}

export interface PageAccessibilityReport {
  filePath: string;
  pageName: string;
  route: string;
  headings: Array<{ level: number; text: string }>;
  issues: HeadingIssue[];
  score: number;
}

/**
 * Recursively gets all .tsx pages in the src/pages directory
 */
function getPageFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getPageFiles(filePath, arrayOfFiles);
    } else {
      if (file.endsWith(".tsx")) {
        // Skip administrative / dashboard / template pages
        if (
          file !== "SEODashboard.tsx" &&
          file !== "NotFound.tsx" &&
          file !== "Sitemap.tsx" &&
          file !== "BlogPost.tsx"
        ) {
          arrayOfFiles.push(filePath);
        }
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Maps a page component name to its route in App.tsx
 */
function getRouteForPage(pageName: string): string {
  const lower = pageName.toLowerCase();
  if (lower === "home") return "/";
  if (lower === "about") return "/about";
  if (lower === "contact") return "/contact";
  if (lower === "pricing") return "/zultys-pricing";
  if (lower === "blog") return "/blog";

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
  } catch (e) {
    console.error("Error mapping page to route in App.tsx:", e);
  }

  // Fallback slugify
  return `/${lower.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase()}`;
}

/**
 * Cleans heading text by stripping HTML tags and trimming whitespace
 */
function cleanHeadingText(rawText: string): string {
  // Remove JSX/HTML tags
  let cleaned = rawText.replace(/<\/?[^>]+(>|$)/g, "");
  // Remove curly braces from JSX expressions, e.g. {cityName} -> cityName
  cleaned = cleaned.replace(/[{}]/g, "");
  // Remove multiple whitespaces and trim
  return cleaned.replace(/\s+/g, " ").trim();
}

/**
 * Scans all page files for heading elements and checks their outline hierarchy
 */
export function scanAccessibilityAndSEO(): PageAccessibilityReport[] {
  const reports: PageAccessibilityReport[] = [];
  const pagesDir = path.join(process.cwd(), "src", "pages");
  const pageFiles = getPageFiles(pagesDir);

  for (const filePath of pageFiles) {
    const relativePath = path.relative(process.cwd(), filePath);
    const fileName = path.basename(filePath, ".tsx");
    const route = getRouteForPage(fileName);

    try {
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, "utf8");

      // Extract all H1-H6 headings using a robust regex
      // Supports className, multi-lines, dynamic attributes, etc.
      const headingRegex = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
      const headings: Array<{ level: number; text: string }> = [];
      let match;

      while ((match = headingRegex.exec(content)) !== null) {
        const level = parseInt(match[1], 10);
        const rawText = match[2];
        const text = cleanHeadingText(rawText);
        headings.push({ level, text });
      }

      // If the page imports/uses the <Hero component, we know it will render exactly one H1 tag with its title.
      const hasHeroComponent = content.includes("<Hero");
      if (hasHeroComponent) {
        // Try to parse the title from the <Hero component title={...}
        // It could be title={<>...</>} or title="..."
        const heroTitleRegex = /<Hero\b[\s\S]*?title=\{([\s\S]*?)\}/i;
        const heroTitleMatch = content.match(heroTitleRegex);
        let heroTitle = `${fileName.replace(/([A-Z])/g, " $1").trim()} Zultys Business Phone Systems`;
        if (heroTitleMatch && heroTitleMatch[1]) {
          const rawTitle = heroTitleMatch[1];
          // Strip JSX fragments and html tags
          heroTitle = cleanHeadingText(rawTitle)
            .replace(/^<>\s*/, "")
            .replace(/\s*<\/>$/, "")
            .trim();
        } else {
          // Try literal string title="..."
          const literalTitleRegex = /<Hero\b[\s\S]*?title=["']([^"']+)["']/i;
          const literalTitleMatch = content.match(literalTitleRegex);
          if (literalTitleMatch && literalTitleMatch[1]) {
            heroTitle = cleanHeadingText(literalTitleMatch[1]);
          }
        }
        
        // Unshift this as H1 if there's no raw h1 already at the very beginning of headings
        const alreadyHasH1 = headings.some(h => h.level === 1);
        if (!alreadyHasH1) {
          headings.unshift({ level: 1, text: heroTitle });
        }
      }

      const issues: HeadingIssue[] = [];
      const h1Count = headings.filter(h => h.level === 1).length;

      // 1. Missing primary header (H1)
      if (h1Count === 0) {
        issues.push({
          id: `${fileName}-missing-h1`,
          type: "missing-h1",
          severity: "critical",
          message: "Missing primary header (H1). Every page must have exactly one H1 tag to declare its primary topic for search crawlers.",
          suggestedFix: "Add a prominent <h1> tag near the top of the page (e.g. within the Hero component) describing the page's primary service and region."
        });
      }

      // 2. Multiple H1 headers
      if (h1Count > 1) {
        issues.push({
          id: `${fileName}-multiple-h1`,
          type: "multiple-h1",
          severity: "warning",
          message: `Multiple H1 tags found (${h1Count}). High-authority pages should consolidate down to a single primary H1 heading to prevent topic dilution.`,
          suggestedFix: "Change auxiliary H1 headers into styled H2 or H3 tags to maintain a clean outline hierarchy."
        });
      }

      // 3. Skipped Heading Hierarchy Levels
      let skippedDeductionCount = 0;
      headings.forEach((h, idx) => {
        if (idx === 0) {
          if (h.level > 2) {
            issues.push({
              id: `${fileName}-start-level-${idx}`,
              type: "skipped-level",
              severity: "warning",
              message: `Page starts with a low-level heading (H${h.level}: "${h.text}"). Documents should ideally begin with H1 or H2.`,
              contextSnippet: `<h${h.level}>${h.text}</h${h.level}>`,
              suggestedFix: "Promote this heading to an H1 or H2, or place a primary H1 heading above it."
            });
            skippedDeductionCount++;
          }
        } else {
          const prev = headings[idx - 1];
          if (h.level - prev.level > 1) {
            issues.push({
              id: `${fileName}-skip-level-${idx}`,
              type: "skipped-level",
              severity: "warning",
              message: `Skipped heading level: H${prev.level} ("${prev.text}") directly to H${h.level} ("${h.text}"). This disrupts screen readers and crawler outlines.`,
              contextSnippet: `<h${prev.level}>...</h${prev.level}> followed by <h${h.level}>...</h${h.level}>`,
              suggestedFix: `Change the H${h.level} tag to H${prev.level + 1}, or insert an intermediate H${prev.level + 1} header before it.`
            });
            skippedDeductionCount++;
          }
        }
      });

      // Calculate score
      let score = 100;
      if (h1Count === 0) {
        score -= 40;
      } else if (h1Count > 1) {
        score -= (h1Count - 1) * 15;
      }
      score -= skippedDeductionCount * 10;
      score = Math.max(0, Math.min(100, score));

      reports.push({
        filePath: relativePath,
        pageName: fileName,
        route,
        headings,
        issues,
        score
      });
    } catch (err) {
      console.error(`Error auditing accessibility/headings in file ${filePath}:`, err);
    }
  }

  // Sort reports so pages with the lowest score (most issues) are first
  return reports.sort((a, b) => a.score - b.score);
}
