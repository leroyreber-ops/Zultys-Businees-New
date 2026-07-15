import { useEffect } from 'react';
import { generateEliteMetadata, canonicalMap } from '../utils/seoHelpers';

const PURGE_SELECTORS = [
  'link[rel="canonical"]',
  'meta[name="description"]',
  'meta[name="keywords"]',
  'meta[name="robots"]',
  'meta[name="googlebot"]',
  'meta[name="author"]',
  'meta[name="geo.region"]',
  'meta[name="geo.placename"]',
  'meta[name="geo.position"]',
  'meta[name="ICBM"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]'
];

/**
 * A centralized SEO Head Manager hook that purges duplicate/stale tags
 * before injecting fresh optimized nodes, ensuring the head section remains optimized.
 */
export function useSEOHeadManager(currentPath: string) {
  useEffect(() => {
    const normalized = currentPath.toLowerCase().endsWith('/') && currentPath.length > 1 
      ? currentPath.toLowerCase().slice(0, -1) 
      : currentPath.toLowerCase();
    
    const canonicalPath = canonicalMap[normalized] || normalized;
    const canonicalUrl = `https://dallasfortworthzultys.com${canonicalPath}`;

    // Get optimized elite metadata
    const { title, description, keywords } = generateEliteMetadata(currentPath);

    const applySEO = () => {
      // 1. Purge existing elements matching our SEO selectors
      PURGE_SELECTORS.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });

      // Also clean any previous dynamically appended titles if duplicates exist
      const titleTags = document.querySelectorAll('title');
      if (titleTags.length > 1) {
        for (let i = 1; i < titleTags.length; i++) {
          titleTags[i].remove();
        }
      }

      // 2. Set the main Document Title
      document.title = title;

      // 3. Helper to create and inject clean elements with data-seo attribute
      const createMeta = (attributes: Record<string, string>) => {
        const meta = document.createElement('meta');
        meta.setAttribute('data-seo', 'true');
        Object.entries(attributes).forEach(([key, val]) => {
          meta.setAttribute(key, val);
        });
        document.head.appendChild(meta);
      };

      // 4. Inject Meta Tags
      createMeta({ name: 'description', content: description });
      createMeta({ name: 'keywords', content: keywords });
      createMeta({ name: 'author', content: 'DFW Business Communications' });

      // Canonical link tag
      const canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      canonicalLink.setAttribute('data-seo', 'true');
      document.head.appendChild(canonicalLink);

      // Geo tags
      createMeta({ name: 'geo.region', content: 'US-TX' });
      createMeta({ name: 'geo.placename', content: 'Fort Worth, Dallas' });
      createMeta({ name: 'geo.position', content: '32.7555;-97.3308' });
      createMeta({ name: 'ICBM', content: '32.7555, -97.3308' });

      // Robots directives
      const isNoIndexPage = 
        normalized === '/seo-dashboard' || 
        normalized === '/admin/search-console' || 
        normalized === '/citation-health' || 
        normalized === '/admin/citations' ||
        normalized.startsWith('/admin/');

      if (isNoIndexPage) {
        createMeta({ name: 'robots', content: 'noindex, nofollow, noarchive' });
        createMeta({ name: 'googlebot', content: 'noindex, nofollow' });
      } else {
        createMeta({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
        createMeta({ name: 'googlebot', content: 'index, follow' });
      }

      // Open Graph Tags
      createMeta({ property: 'og:type', content: 'website' });
      createMeta({ property: 'og:title', content: title });
      createMeta({ property: 'og:description', content: description });
      createMeta({ property: 'og:url', content: canonicalUrl });
      createMeta({ property: 'og:site_name', content: 'DFW Business Communications' });
      createMeta({ property: 'og:image', content: 'https://dallasfortworthzultys.com/og-image.jpg' });
      createMeta({ property: 'og:locale', content: 'en_US' });
      createMeta({ property: 'og:image:width', content: '1200' });
      createMeta({ property: 'og:image:height', content: '630' });

      // Twitter Tags
      createMeta({ name: 'twitter:card', content: 'summary_large_image' });
      createMeta({ name: 'twitter:title', content: title });
      createMeta({ name: 'twitter:description', content: description });
      createMeta({ name: 'twitter:image', content: 'https://dallasfortworthzultys.com/og-image.jpg' });
    };

    // Apply immediate injection
    applySEO();

    // Setup an safe de-duplication timeout to override any potential page mount race conditions
    const timer = setTimeout(applySEO, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPath]);
}
