import fs from 'fs';
import path from 'path';
import { isGoogleConfigured, notifyGoogleUrlChange, logIndexingActivity } from './googleIndexer.js';
import { KNOWN_CITIES } from './SitemapIndexProvider.js';

export interface IndexingResult {
  url: string;
  success: boolean;
  message: string;
  error?: string;
  timestamp: string;
}

export class GoogleIndexingAdminService {
  /**
   * Checks if a route is a city page or blog post page.
   */
  static isCityOrBlogRoute(route: string): boolean {
    const normalized = route.toLowerCase().split('?')[0].split('#')[0];

    // Blog post check
    const isBlog = 
      normalized.startsWith('/blog') || 
      normalized.includes('blog-') || 
      normalized.includes('-blog') || 
      normalized.includes('blogpost') ||
      normalized.includes('blog-post');

    // City page check (including KNOWN_CITIES slugs)
    const isCity = KNOWN_CITIES.some(city => {
      const slug = city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return normalized === `/${slug}` || normalized.includes(slug);
    }) || 
    normalized.includes('-tx-zultys') || 
    normalized.endsWith('-zultys-phones') ||
    normalized === '/dallas' ||
    normalized === '/fort-worth' ||
    normalized === '/dfw';

    return isCity || isBlog;
  }

  /**
   * Automatically ping Google Search Console via Indexing API for a published route.
   */
  static async pingForPublishedRoute(route: string): Promise<IndexingResult> {
    const timestamp = new Date().toISOString();
    
    // Ensure the route starts with slash
    let formattedRoute = route.startsWith('/') ? route : `/${route}`;
    const targetUrl = `https://dallasfortworthzultys.com${formattedRoute}`;

    console.log(`[Google Indexing Admin Service] Automatic ping requested for: ${targetUrl}`);

    // Verify it is a city page or blog post
    if (!this.isCityOrBlogRoute(formattedRoute)) {
      const msg = `Route is neither a city page nor a blog post. Bypassing indexing ping.`;
      console.log(`[Google Indexing Admin Service] ${msg}`);
      return {
        url: targetUrl,
        success: false,
        message: msg,
        timestamp
      };
    }

    const configured = isGoogleConfigured();
    if (!configured) {
      const msg = `[Sandbox Mode] Google Credentials are not configured in .env. Logged simulated re-crawl for ${targetUrl}`;
      console.log(`[Google Indexing Admin Service] ${msg}`);
      
      logIndexingActivity({
        type: 'indexing',
        url: targetUrl,
        status: 'SUCCESS',
        action: 'URL_UPDATED',
        message: `[Auto-Ping Sandbox] Programmatic re-crawl accepted. (GOOGLE_SERVICE_ACCOUNT_JSON or credentials missing in .env)`,
        timestamp
      });

      return {
        url: targetUrl,
        success: true,
        message: msg,
        timestamp
      };
    }

    try {
      console.log(`[Google Indexing Admin Service] Dispatched live API ping to Google for ${targetUrl}`);
      const response = await notifyGoogleUrlChange(targetUrl, 'URL_UPDATED');
      
      const msg = `Live re-crawl request accepted by Google Indexing API for ${targetUrl}`;
      console.log(`[Google Indexing Admin Service] ${msg}`);

      return {
        url: targetUrl,
        success: true,
        message: msg,
        timestamp
      };
    } catch (err: any) {
      const errMsg = err.message || 'Unknown error occurred';
      console.error(`[Google Indexing Admin Service] Live ping failed for ${targetUrl}:`, errMsg);

      logIndexingActivity({
        type: 'indexing',
        url: targetUrl,
        status: 'FAILED',
        action: 'URL_UPDATED',
        message: `Google Indexing API error: ${errMsg}`,
        timestamp
      });

      return {
        url: targetUrl,
        success: false,
        message: `Live ping failed: ${errMsg}`,
        error: errMsg,
        timestamp
      };
    }
  }

  /**
   * Scans App.tsx and returns all blog and city routes currently registered.
   */
  static getRegisteredCityAndBlogRoutes(): string[] {
    try {
      const appPath = path.join(process.cwd(), "src", "App.tsx");
      if (!fs.existsSync(appPath)) {
        return [];
      }
      const content = fs.readFileSync(appPath, "utf8");
      const regex = /normalizedPath\s*===\s*['"]([^'"]+)['"]/g;
      const routes = new Set<string>();
      let match;

      while ((match = regex.exec(content)) !== null) {
        const route = match[1];
        if (route && route.startsWith("/") && !route.includes("*") && route !== "/index.html") {
          if (this.isCityOrBlogRoute(route)) {
            routes.add(route);
          }
        }
      }

      return Array.from(routes).sort();
    } catch (err) {
      console.error("[Google Indexing Admin Service] Failed to retrieve routes:", err);
      return [];
    }
  }
}
