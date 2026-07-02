import fs from "fs";
import path from "path";

/**
 * Interface representing a route's SEO configuration.
 */
interface RouteSEO {
  path: string;
  priority: string;
  changefreq: string;
}

/**
 * Returns the appropriate SEO priority and changefreq for any given route path.
 */
export function getRouteSEO(route: string): RouteSEO {
  const normalized = route.toLowerCase();

  // Root/Home
  if (normalized === "" || normalized === "/" || normalized === "/index.html") {
    return { path: route, priority: "1.0", changefreq: "daily" };
  }

  // Core High-Priority Pages
  const highPriority = [
    "/products",
    "/solutions",
    "/about",
    "/contact",
    "/zultys-pricing",
    "/free-voip-site-audit",
    "/case-studies"
  ];
  if (highPriority.includes(normalized)) {
    return { path: route, priority: "0.9", changefreq: "weekly" };
  }

  // SEO Power Hubs
  const seoHubs = [
    "/zultys-business-phone-systems",
    "/dallas-zultys-phones",
    "/fort-worth-zultys-systems",
    "/fort-worth-zultys-business-phone-systems",
    "/fort-worth-zultys-voip-phone-system",
    "/fort-worth-zultys-cloud-phone-system"
  ];
  if (seoHubs.includes(normalized)) {
    return { path: route, priority: "0.85", changefreq: "weekly" };
  }

  // Major Cities, Services, or Hardware Pages
  if (
    normalized === "/dallas" ||
    normalized === "/fort-worth" ||
    normalized.includes("ip-pbx") ||
    normalized.includes("voip-solutions") ||
    normalized.includes("phone-systems") ||
    normalized.includes("business-phones") ||
    normalized.includes("ip-phones") ||
    normalized.includes("zultys-dealer") ||
    normalized.includes("business-communications") ||
    normalized.includes("business-voip") ||
    normalized.includes("-phone") ||
    normalized.includes("-zac") ||
    normalized.includes("-mxmobile") ||
    normalized.includes("-mxconference") ||
    normalized.includes("gateways") ||
    normalized.includes("mx-series") ||
    normalized.includes("mx-se")
  ) {
    return { path: route, priority: "0.8", changefreq: "weekly" };
  }

  // Industry Vertical Pages
  if (
    normalized.includes("zultys-for-") ||
    normalized.includes("healthcare") ||
    normalized.includes("professional-services") ||
    normalized.includes("real-estate") ||
    normalized.includes("education") ||
    normalized.includes("retail-automotive") ||
    normalized.includes("enterprise") ||
    normalized.includes("multi-location")
  ) {
    return { path: route, priority: "0.75", changefreq: "monthly" };
  }

  // Competitor Comparison Pages
  if (normalized.includes("zultys-vs-")) {
    return { path: route, priority: "0.7", changefreq: "weekly" };
  }

  // Blog Posts
  if (normalized.startsWith("/blog/")) {
    return { path: route, priority: "0.55", changefreq: "weekly" };
  }

  // Blog Home
  if (normalized === "/blog") {
    return { path: route, priority: "0.6", changefreq: "daily" };
  }

  // Technical Resources & Miscellaneous Utilities
  const utilities = [
    "/privacy",
    "/terms",
    "/zultys-faq",
    "/voip-glossary",
    "/our-team",
    "/certifications-awards",
    "/zultys-user-guides",
    "/zultys-migration-guide-dfw",
    "/zultys-crm-integration-guide",
    "/remote-work-solutions",
    "/voip-security-encryption"
  ];
  if (utilities.includes(normalized)) {
    return { path: route, priority: "0.5", changefreq: "monthly" };
  }

  // Default fallback (e.g. general city-pages, newly added pages)
  return { path: route, priority: "0.6", changefreq: "monthly" };
}

/**
 * Extracts all routes from App.tsx by parsing code statements.
 */
export function extractRoutesFromApp(): string[] {
  try {
    const appPath = path.join(process.cwd(), "src", "App.tsx");
    if (!fs.existsSync(appPath)) {
      console.warn("⚠️ App.tsx not found at", appPath);
      return [];
    }
    const content = fs.readFileSync(appPath, "utf8");

    // Matches 'normalizedPath === "/path"' or 'normalizedPath === '\''/path'\'''
    const regex = /normalizedPath\s*===\s*['"]([^'"]+)['"]/g;
    const routes = new Set<string>();
    let match;

    while ((match = regex.exec(content)) !== null) {
      const route = match[1];
      // Skip root index duplicates, wildcards, placeholders, or external links
      if (
        route &&
        route.startsWith("/") &&
        !route.includes("*") &&
        route !== "/index.html"
      ) {
        routes.add(route);
      }
    }

    // Always ensure the home route is present at the top
    const sortedRoutes = Array.from(routes).sort();
    if (!sortedRoutes.includes("/")) {
      sortedRoutes.unshift("/");
    } else {
      // Move "/" to the first index
      const homeIdx = sortedRoutes.indexOf("/");
      if (homeIdx > 0) {
        sortedRoutes.splice(homeIdx, 1);
        sortedRoutes.unshift("/");
      }
    }

    return sortedRoutes;
  } catch (err) {
    console.error("❌ Failed to extract routes from App.tsx:", err);
    return [];
  }
}

/**
 * Writes the generated sitemap to public/sitemap.xml and (if exists) dist/sitemap.xml
 */
export function generateSitemapFiles(): void {
  try {
    const xml = buildSitemapXml();
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicSitemapPath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(publicSitemapPath, xml, "utf8");
    console.log(`[Sitemap] Automatically updated public/sitemap.xml`);

    const distDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      const distSitemapPath = path.join(distDir, "sitemap.xml");
      fs.writeFileSync(distSitemapPath, xml, "utf8");
      console.log(`[Sitemap] Automatically updated dist/sitemap.xml`);
    }
  } catch (err) {
    console.error("❌ [Sitemap] Failed to generate sitemap files:", err);
  }
}

/**
 * Watches App.tsx and automatically regenerates sitemap files when it changes.
 */
export function watchAndGenerateSitemap(): void {
  const appPath = path.join(process.cwd(), "src", "App.tsx");
  if (!fs.existsSync(appPath)) {
    console.warn("⚠️ Cannot watch App.tsx, file does not exist at:", appPath);
    return;
  }

  console.log(`👀 Watching ${appPath} for automatic sitemap updates...`);

  let debounceTimer: NodeJS.Timeout | null = null;
  fs.watch(appPath, (eventType) => {
    if (eventType === "change") {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log(`⚡ Detected change in App.tsx. Regenerating sitemap.xml...`);
        generateSitemapFiles();
      }, 500); // 500ms debounce
    }
  });

  // Initial generation at startup
  generateSitemapFiles();
}

/**
 * Dynamically builds a standard, valid XML sitemap string based on the active routes.
 */
export function buildSitemapXml(): string {
  const routes = extractRoutesFromApp();
  const lastmod = new Date().toISOString().split("T")[0];

  const xmlEntries = routes
    .map((route) => {
      const seo = getRouteSEO(route);
      return `  <url>
    <loc>https://dallasfortworthzultys.com${seo.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${seo.changefreq}</changefreq>
    <priority>${seo.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}
