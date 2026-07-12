import { VALID_PATHS } from "../routes";
import { generateEliteMetadata } from "../utils/seoHelpers";

export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
}

export const SEO_CONFIG = {
  defaultHost: "https://dallasfortworthzultys.com",
  titleMaxLength: 60,
  descriptionMaxLength: 160,
  brandSuffix: " | Zultys DFW",
  robotsIndex: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  robotsNoindex: "noindex, nofollow, noarchive",
  defaultOgImage: "https://dallasfortworthzultys.com/og-image.jpg"
};

// Returns standard SEO configuration for any path
export function getSEOForPath(path: string): SEOProps {
  let normPath = path.toLowerCase().split('?')[0].split('#')[0];
  if (normPath.endsWith('/') && normPath.length > 1) {
    normPath = normPath.slice(0, -1);
  }
  if (normPath === "" || normPath === "/index.html") {
    normPath = "/";
  }

  // Generate metadata from our elite seoHelpers fallbacks
  const metadata = generateEliteMetadata(normPath);

  // Construct absolute canonical URL
  const canonicalUrl = `${SEO_CONFIG.defaultHost}${normPath === "/" ? "" : normPath}`;

  // Determine Robots directives
  const isNoIndex = 
    normPath === "/seo-dashboard" || 
    normPath === "/admin/search-console" || 
    normPath === "/citation-health" || 
    normPath === "/admin/citations" ||
    normPath === "/seo-admin" ||
    normPath.startsWith("/admin/");

  const robots = isNoIndex ? SEO_CONFIG.robotsNoindex : SEO_CONFIG.robotsIndex;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    canonicalUrl,
    robots
  };
}

export { VALID_PATHS };
