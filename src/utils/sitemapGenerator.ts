import fs from "fs";
import path from "path";
import { isGoogleConfigured, notifyGoogleUrlChange, submitSitemapToGoogle, logIndexingActivity } from "./googleIndexer.js";
import { SitemapIndexProvider } from "./SitemapIndexProvider.js";
import { GoogleIndexingAdminService } from "./googleIndexingAdminService.js";

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

    // Merge dynamic city routes to guarantee Google search discovery
    const dynamicCityRoutes = SitemapIndexProvider.getDynamicCityRoutes();
    dynamicCityRoutes.forEach((route) => {
      if (!routes.has(route)) {
        routes.add(route);
      }
    });

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

    // Check if new city or product pages require programmatic Google Indexing Auto-Pings
    const routes = extractRoutesFromApp();
    checkAndTriggerAutoPing(routes);

    // Automatically update robots.txt file to link to the generated XML sitemap
    SitemapIndexProvider.updateRobotsTxt();
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
    .filter((route) => {
      const normalized = route.toLowerCase();
      return !(
        normalized === "/seo-dashboard" ||
        normalized === "/citation-health" ||
        normalized === "/admin/search-console" ||
        normalized === "/admin/citations" ||
        normalized.startsWith("/admin/")
      );
    })
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

export function isCityOrProductRoute(route: string): boolean {
  const normalized = route.toLowerCase();
  
  // Blog page check using GoogleIndexingAdminService
  const isBlog = GoogleIndexingAdminService.isCityOrBlogRoute(route);

  // City page check
  const isCity = 
    normalized.includes("-tx-zultys") || 
    normalized.endsWith("-zultys-phones") ||
    normalized === "/dallas" ||
    normalized === "/fort-worth" ||
    normalized === "/dfw" ||
    normalized.includes("dallas") ||
    normalized.includes("fort-worth") ||
    isBlog;
    
  // Product page check
  const isProduct = 
    normalized === "/products" ||
    normalized.includes("zip") || 
    normalized.includes("z21") || 
    normalized.includes("z22") || 
    normalized.includes("z23") || 
    normalized.includes("mx-") || 
    normalized.includes("mxse") || 
    normalized.includes("mxseries") || 
    normalized.includes("phone-system") || 
    normalized.includes("telephone");
    
  return isCity || isProduct;
}

export function checkAndTriggerAutoPing(currentRoutes: string[]): void {
  try {
    const configPath = path.join(process.cwd(), "seo-config.json");
    let autoPingEnabled = false;
    
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8") || "{}");
        autoPingEnabled = !!config.autoPingEnabled;
      } catch (e) {
        console.error("Error reading seo-config.json:", e);
      }
    }

    const knownRoutesPath = path.join(process.cwd(), "known-routes.json");
    let knownRoutes: string[] = [];
    
    const firstRun = !fs.existsSync(knownRoutesPath);
    if (!firstRun) {
      try {
        knownRoutes = JSON.parse(fs.readFileSync(knownRoutesPath, "utf8") || "[]");
      } catch (e) {
        console.error("Error reading known-routes.json:", e);
      }
    }

    // Filter current routes to only keep valid ones
    const activeRoutes = currentRoutes.filter(r => r && r !== "/*");

    if (firstRun) {
      // First run: just initialize known-routes with existing pages
      fs.writeFileSync(knownRoutesPath, JSON.stringify(activeRoutes, null, 2), "utf8");
      console.log(`[Auto-Ping] Initialized known-routes.json with ${activeRoutes.length} existing routes.`);
      return;
    }

    // Find new routes that are NOT in knownRoutes
    const newRoutes = activeRoutes.filter(route => !knownRoutes.includes(route));

    if (newRoutes.length > 0) {
      console.log(`[Auto-Ping] Found ${newRoutes.length} new routes:`, newRoutes);
      
      const targetNewPages = newRoutes.filter(route => isCityOrProductRoute(route));
      
      if (targetNewPages.length > 0) {
        console.log(`[Auto-Ping] Detected ${targetNewPages.length} new city or product routes:`, targetNewPages);
        
        if (autoPingEnabled) {
          const configured = isGoogleConfigured();
          
          for (const route of targetNewPages) {
            const targetUrl = `https://dallasfortworthzultys.com${route}`;
            
            if (configured) {
              console.log(`[Auto-Ping] GSC is configured. Sending live ping to Google for: ${targetUrl}`);
              notifyGoogleUrlChange(targetUrl, "URL_UPDATED")
                .then(() => {
                  console.log(`[Auto-Ping] Live re-crawl request accepted by Google for ${targetUrl}`);
                })
                .catch((err) => {
                  console.error(`[Auto-Ping] Live re-crawl request failed for ${targetUrl}:`, err.message);
                });
            } else {
              // Sandbox demo mode logging fallback
              console.log(`[Auto-Ping Sandbox] GSC unconfigured. Logging simulated success for: ${targetUrl}`);
              logIndexingActivity({
                type: 'indexing',
                url: targetUrl,
                status: 'SUCCESS',
                action: 'URL_UPDATED',
                message: `[Auto-Ping Sandbox Mode] Programmatic re-crawl simulation accepted. Go to settings to configure Google Credentials.`,
                timestamp: new Date().toISOString()
              });
            }
          }

          // Trigger sitemap submission to Google Search Console
          const siteUrl = "https://dallasfortworthzultys.com";
          const sitemapUrl = "https://dallasfortworthzultys.com/sitemap.xml";
          
          if (configured) {
            submitSitemapToGoogle(siteUrl, sitemapUrl)
              .then(() => {
                console.log(`[Auto-Ping] Google Search Console sitemap update successfully triggered.`);
              })
              .catch((err) => {
                console.error(`[Auto-Ping] Google Search Console sitemap update failed:`, err.message);
              });
          } else {
            logIndexingActivity({
              type: 'sitemap',
              url: sitemapUrl,
              status: 'SUCCESS',
              message: `[Auto-Ping Sandbox Mode] Sitemap submission simulation completed. Go to settings to configure Google Credentials.`,
              timestamp: new Date().toISOString()
            });
          }
        } else {
          console.log(`[Auto-Ping] Auto-Ping is disabled. Bypassing Google notification.`);
        }
      }
      
      // Update known routes to include these new routes so we don't notify again
      fs.writeFileSync(knownRoutesPath, JSON.stringify(activeRoutes, null, 2), "utf8");
    }
  } catch (err: any) {
    console.error("❌ [Auto-Ping] Error in checkAndTriggerAutoPing:", err);
  }
}
