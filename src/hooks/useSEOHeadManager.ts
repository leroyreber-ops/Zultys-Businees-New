import { useEffect } from 'react';
import { generateEliteMetadata } from '../utils/seoHelpers';

// Advanced Canonical Normalization Lookup
export const canonicalMap: Record<string, string> = {
  '/': '/',
  '/index.html': '/',
  '/mesquite': '/mesquite-zultys-phone-systems',
  '/garland': '/garland-business-voip',
  '/mckinney': '/mckinney-zultys-dealer',
  '/denton': '/denton-business-phone-systems',
  '/lewisville': '/lewisville-voip-solutions',
  '/allen': '/allen-tx-zultys-voip',
  '/mansfield': '/mansfield-tx-zultys-phone-systems',
  '/rowlett': '/rowlett-tx-zultys-dealer',
  '/cedar-hill': '/cedar-hill-tx-zultys-voip',
  '/desoto': '/desoto-tx-zultys-phone-systems',
  '/coppell': '/coppell-tx-zultys-phone-systems',
  '/duncanville': '/duncanville-tx-zultys-voip',
  '/lancaster': '/lancaster-tx-zultys-dealer',
  '/the-colony': '/the-colony-tx-zultys-voip',
  '/little-elm': '/little-elm-tx-zultys-phone-systems',
  '/wylie': '/wylie-tx-zultys-phone-systems',
  '/rockwall': '/rockwall-tx-zultys-phone-systems',
  '/forney': '/forney-tx-zultys-phone-systems',
  '/midlothian': '/midlothian-tx-zultys-phone-systems',
  '/waxahachie': '/waxahachie-tx-zultys-phone-systems',
  '/ennis': '/ennis-tx-zultys-phone-systems',
  '/cleburne': '/cleburne-tx-zultys-phone-systems',
  '/weatherford': '/weatherford-tx-zultys-phone-systems',
  '/burleson': '/burleson-tx-zultys-phone-systems',
  '/terrell': '/terrell-tx-zultys-phone-systems',
  '/prosper': '/prosper-tx-zultys-phone-systems',
  '/murphy': '/murphy-tx-zultys-voip',
  '/sachse': '/sachse-tx-zultys-dealer',
  '/seagoville': '/seagoville-tx-zultys-phone-systems',
  '/balch-springs': '/balch-springs-tx-zultys-voip',
  '/celina': '/celina-tx-zultys-phone-systems',
  '/princeton': '/princeton-tx-zultys-phone-systems',
  '/anna': '/anna-tx-zultys-phone-systems',
  '/melissa': '/melissa-tx-zultys-phone-systems',
  '/royse-city': '/royse-city-tx-zultys-phone-systems',
  '/fate': '/fate-tx-zultys-phone-systems',
  '/heath': '/heath-tx-zultys-phone-systems',
  '/sunnyvale': '/sunnyvale-tx-zultys-phone-systems',
  '/crandall': '/crandall-tx-zultys-phone-systems',
  '/lavon': '/lavon-tx-zultys-phone-systems',
  '/red-oak': '/red-oak-tx-zultys-phone-systems',
  '/ovilla': '/ovilla-tx-zultys-phone-systems',
  '/glenn-heights': '/glenn-heights-tx-zultys-phone-systems',
  '/hutchins': '/hutchins-tx-zultys-phone-systems',
  '/wilmer': '/wilmer-tx-zultys-phone-systems',
  '/kaufman': '/kaufman-tx-zultys-phone-systems',
  '/pilot-point': '/pilot-point-tx-zultys-phone-systems',
  '/sanger': '/sanger-tx-zultys-phone-systems',
  '/aubrey': '/aubrey-tx-zultys-phone-systems',
  '/alvarado': '/alvarado-tx-zultys-phone-systems',
  '/decatur': '/decatur-tx-zultys-phone-systems',
  '/bridgeport': '/bridgeport-tx-zultys-phone-systems',
  '/justin': '/justin-tx-zultys-phone-systems',
  '/krum': '/krum-tx-zultys-phone-systems',
  '/ponder': '/ponder-tx-zultys-phone-systems',
  '/trophy-club': '/trophy-club-tx-zultys-phone-systems',
  '/roanoke': '/roanoke-tx-zultys-phone-systems',
  '/argyle': '/argyle-tx-zultys-phone-systems',
  '/kennedale': '/kennedale-tx-zultys-phone-systems',
  '/forest-hill': '/forest-hill-tx-zultys-phone-systems',
  '/azle': '/azle-tx-zultys-phone-systems',
  '/bartonville': '/bartonville-tx-zultys-phone-systems',
  '/bowie': '/bowie-tx-zultys-phone-systems',
  '/boyd': '/boyd-tx-zultys-phone-systems',
  '/brock': '/brock-tx-zultys-phone-systems',
  '/crowley': '/crowley-tx-zultys-phone-systems',
  '/haslet': '/haslet-tx-zultys-phone-systems',
  '/joshua': '/joshua-tx-zultys-phone-systems',
  '/lake-worth': '/lake-worth-tx-zultys-phone-systems',
  '/lakeside': '/lakeside-tx-zultys-phone-systems',
  '/arlington': '/arlington-ip-pbx',
  '/plano': '/plano-zultys-dealer',
  '/irving': '/irving-business-phone-systems',
  '/frisco': '/frisco-voip-solutions',
  '/grand-prairie': '/grand-prairie-zultys',
  '/southlake': '/southlake-ip-phones',
  '/grapevine': '/grapevine-business-voip',
  '/carrollton': '/carrollton-zultys',
  '/richardson': '/richardson-phone-systems',
  '/hurst': '/hurst-ip-pbx',
  '/bedford': '/bedford-zultys-solutions',
  '/euless': '/euless-business-phones',
  '/north-richland-hills': '/north-richland-hills-zultys',
  '/flower-mound': '/flower-mound-business-phones',
  '/colleyville': '/colleyville-voip',
  '/keller': '/keller-zultys-dealer',
  '/saginaw': '/saginaw-business-communications',
  '/haltom-city': '/haltom-city-zultys',
  '/springtown': '/springtown-tx-zultys-phone-systems',
  '/granbury': '/granbury-tx-zultys-phone-systems',
  '/glen-rose': '/glen-rose-tx-zultys-phone-systems',
  '/godley': '/godley-tx-zultys-phone-systems',
  '/grandview': '/grandview-tx-zultys-phone-systems',
  '/venus': '/venus-tx-zultys-phone-systems',
  '/maypearl': '/maypearl-tx-zultys-phone-systems',
  '/italy': '/italy-tx-zultys-phone-systems',
  '/milford': '/milford-tx-zultys-phone-systems',
  '/palmer': '/palmer-tx-zultys-phone-systems',
  '/watauga': '/watauga-voip-solutions',
  '/benbrook': '/benbrook-phone-systems',
  '/westworth-village': '/westworth-village-zultys',
  '/white-settlement': '/white-settlement-business-phones',
  '/river-oaks': '/river-oaks-zultys',
  '/hudson-oaks': '/hudson-oaks-tx-zultys-phone-systems',
  '/willow-park': '/willow-park-tx-zultys-phone-systems',
  '/everman': '/everman-tx-zultys-phone-systems',
  '/pantego': '/pantego-tx-zultys-phone-systems',
  '/dalworthington-gardens': '/dalworthington-gardens-tx-zultys-phone-systems',
  '/westover-hills': '/westover-hills-tx-zultys-phone-systems',
  '/edgecliff-village': '/edgecliff-village-tx-zultys-phone-systems',
  '/richland-hills': '/richland-hills-tx-zultys-phone-systems',
  '/sansom-park': '/sansom-park-tx-zultys-phone-systems',
  '/reno': '/reno-tx-zultys-phone-systems',
  '/van-alstyne': '/van-alstyne-tx-zultys-phone-systems',
  '/leonard': '/leonard-tx-zultys-phone-systems',
  '/farmersville': '/farmersville-tx-zultys-phone-systems',
  '/howe': '/howe-tx-zultys-phone-systems',
  '/whitewright': '/whitewright-tx-zultys-phone-systems',
  '/gunter': '/gunter-tx-zultys-phone-systems',
  '/collinsville': '/collinsville-tx-zultys-phone-systems',
  '/tioga': '/tioga-tx-zultys-phone-systems',
  '/tom-bean': '/tom-bean-tx-zultys-phone-systems',
  '/trenton': '/trenton-tx-zultys-phone-systems',
  '/savoy': '/savoy-tx-zultys-phone-systems',
  '/bells': '/bells-tx-zultys-phone-systems',
  '/blue-ridge': '/blue-ridge-tx-zultys-phone-systems',
  '/ector': '/ector-tx-zultys-phone-systems',
  '/ravenna': '/ravenna-tx-zultys-phone-systems',
  '/bonham': '/bonham-tx-zultys-phone-systems',
  '/honey-grove': '/honey-grove-tx-zultys-phone-systems',
  '/ladonia': '/ladonia-tx-zultys-phone-systems',
  '/windom': '/windom-tx-zultys-phone-systems',
  '/dodd-city': '/dodd-city-tx-zultys-phone-systems',
  '/merit': '/merit-tx-zultys-phone-systems',
  '/celeste': '/celeste-tx-zultys-phone-systems',
  '/wolfe-city': '/wolfe-city-tx-zultys-phone-systems',
  '/caddo-mills': '/caddo-mills-tx-zultys-phone-systems',
  '/nevada': '/nevada-tx-zultys-phone-systems',
  '/josephine': '/josephine-tx-zultys-phone-systems',
  '/bailey': '/bailey-tx-zultys-phone-systems',
  '/randolph': '/randolph-tx-zultys-phone-systems',
  '/telephone': '/telephone-tx-zultys-phone-systems',
  '/ivanhoe': '/ivanhoe-tx-zultys-phone-systems',
  '/gober': '/gober-tx-zultys-phone-systems',
  '/dallas': '/dallas-zultys-phones',
  '/fort-worth': '/fort-worth-zultys-systems',
  '/addison': '/addison-tx-zultys-phone-systems',
  '/aledo': '/aledo-tx-zultys-phone-systems',
  '/blue-mound': '/blue-mound-tx-zultys-phone-systems',
  '/north-richland-hills-voip': '/north-richland-hills-zultys',
  '/colleyville-ip-phones': '/colleyville-voip',
  '/zultys-vs-competition': '/zultys-vs-competitors',
  '/sitemap': '/sitemap.html',
};

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
