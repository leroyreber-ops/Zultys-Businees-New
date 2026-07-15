import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { VALID_PATHS } from "../src/routes";
import { generateEliteMetadata, canonicalMap } from "../src/utils/seoHelpers";

console.log("\n==================================================");
console.log("🚀 STARTING STATIC SEO PRE-RENDERING ENGINE");
console.log("==================================================");

const currentFilename = typeof import.meta !== "undefined" && import.meta.url
  ? fileURLToPath(import.meta.url)
  : (typeof __filename !== "undefined" ? __filename : "");

const currentDirname = typeof import.meta !== "undefined" && import.meta.url
  ? path.dirname(currentFilename)
  : (typeof __dirname !== "undefined" ? __dirname : "");

const distPath = path.join(process.cwd(), "dist");
const templatePath = path.join(distPath, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("❌ ERROR: dist/index.html not found! Please run 'vite build' before running pre-renderer.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");

// City helper coordinate definitions copied from server.ts to ensure no dependency on booting the Express server
const serverCityCoordinates: Record<string, { lat: number; lng: number; zip: string }> = {
  'Dallas': { lat: 32.7767, lng: -96.7970, zip: '75201' },
  'Fort Worth': { lat: 32.7555, lng: -97.3308, zip: '76102' },
  'Arlington': { lat: 32.7357, lng: -97.1081, zip: '76010' },
  'Plano': { lat: 33.0198, lng: -96.6989, zip: '75074' },
  'Garland': { lat: 32.9126, lng: -96.6389, zip: '75040' },
  'Irving': { lat: 32.8140, lng: -96.9489, zip: '75060' },
  'Grand Prairie': { lat: 32.7460, lng: -96.9978, zip: '75050' },
  'McKinney': { lat: 33.1972, lng: -96.6398, zip: '75069' },
  'Frisco': { lat: 33.1507, lng: -96.8236, zip: '75034' },
  'Carrollton': { lat: 32.9746, lng: -96.8903, zip: '75006' },
  'Denton': { lat: 33.2148, lng: -97.1331, zip: '76201' },
  'Richardson': { lat: 32.9483, lng: -96.7299, zip: '75080' }
};

function getServerCityName(pathStr: string): string {
  const normalized = pathStr.replace(/^\//, '').toLowerCase();
  if (!normalized || normalized === 'index.html' || normalized === '') {
    return 'Dallas-Fort Worth';
  }
  
  const customCities: Record<string, string> = {
    'balch-springs': 'Balch Springs',
    'blue-mound': 'Blue Mound',
    'blue-ridge': 'Blue Ridge',
    'caddo-mills': 'Caddo Mills',
    'cedar-hill': 'Cedar Hill',
    'dalworthington-gardens': 'Dalworthington Gardens',
    'dodd-city': 'Dodd City',
    'edgecliff-village': 'Edgecliff Village',
    'flower-mound': 'Flower Mound',
    'forest-hill': 'Forest Hill',
    'glen-rose': 'Glen Rose',
    'glenn-heights': 'Glenn Heights',
    'grand-prairie': 'Grand Prairie',
    'haltom-city': 'Haltom City',
    'honey-grove': 'Honey Grove',
    'hudson-oaks': 'Hudson Oaks',
    'lake-worth': 'Lake Worth',
    'little-elm': 'Little Elm',
    'north-richland-hills': 'North Richland Hills',
    'pilot-point': 'Pilot Point',
    'red-oak': 'Red Oak',
    'richland-hills': 'Richland Hills',
    'river-oaks': 'River Oaks',
    'royse-city': 'Royse City',
    'sansom-park': 'Sansom Park',
    'the-colony': 'The Colony',
    'tom-bean': 'Tom Bean',
    'trophy-club': 'Trophy Club',
    'van-alstyne': 'Van Alstyne',
    'westover-hills': 'Westover Hills',
    'westworth-village': 'Westworth Village',
    'white-settlement': 'White Settlement',
    'willow-park': 'Willow Park',
    'wolfe-city': 'Wolfe City'
  };

  for (const [key, value] of Object.entries(customCities)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  const cleanPath = normalized
    .replace(/-tx-zultys-phone-systems.*/, '')
    .replace(/-zultys-phone-systems.*/, '')
    .replace(/-business-voip.*/, '')
    .replace(/-voip-solutions.*/, '')
    .replace(/-tx-zultys-voip.*/, '')
    .replace(/-tx-zultys-dealer.*/, '')
    .replace(/-zultys-dealer.*/, '')
    .replace(/-ip-pbx.*/, '')
    .replace(/-ip-phones.*/, '')
    .replace(/-zultys-systems.*/, '')
    .replace(/-zultys.*/, '')
    .replace(/-voip.*/, '')
    .replace(/-phone-systems.*/, '')
    .replace(/-phones.*/, '')
    .replace(/-systems.*/, '')
    .replace(/-dealer.*/, '')
    .replace(/-solutions.*/, '')
    .replace(/-business-phones.*/, '')
    .replace(/-business-communications.*/, '')
    .replace(/-voip-provider.*/, '');

  return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
}

function injectSEOMetadata(html: string, urlPath: string): string {
  // Normalize to look up metadata correctly
  let normPath = urlPath.split('?')[0].split('#')[0];
  if (normPath === '/index.html') {
    normPath = '/';
  } else if (normPath.endsWith('/') && normPath.length > 1) {
    normPath = normPath.slice(0, -1);
  }

  // 1. Get the elite metadata for this path
  const { title, description, keywords } = generateEliteMetadata(normPath);
  
  // 2. Build the canonical URL
  const siteUrl = "https://dallasfortworthzultys.com";
  const canonicalPath = canonicalMap[normPath] || normPath;
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;

  // 3. Determine if this page should be noindexed (admin, dashboards, etc.)
  const isNoIndex = 
    normPath === '/seo-dashboard' || 
    normPath === '/admin/search-console' || 
    normPath === '/citation-health' || 
    normPath === '/admin/citations' ||
    normPath.startsWith('/admin/');

  const robotsDirective = isNoIndex 
    ? "noindex, nofollow, noarchive" 
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const googlebotDirective = isNoIndex 
    ? "noindex, nofollow" 
    : "index, follow";

  const ogImage = `${siteUrl}/og-image.jpg`; // default high-impact banner

  // 4. Generate dynamic JSON-LD structured schemas
  const schemas: any[] = [];

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://dallasfortworthzultys.com/#organization',
    name: 'DFW Business Communications',
    url: 'https://dallasfortworthzultys.com',
    logo: 'https://dallasfortworthzultys.com/zultys-logo.png',
    description: 'Authorized Zultys dealer, partner, and VoIP service provider serving Dallas, Fort Worth, and the entire DFW Metroplex.',
    email: 'info@dallasfortworthzultys.com',
    telephone: '817-231-2962',
    sameAs: [
      'https://www.facebook.com/zultys',
      'https://www.linkedin.com/company/zultys-inc-'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-817-231-2962',
      contactType: 'sales and support',
      areaServed: 'US',
      availableLanguage: 'en'
    }
  };
  schemas.push(organizationSchema);

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://dallasfortworthzultys.com/#website',
    url: 'https://dallasfortworthzultys.com',
    name: 'DFW Business Communications - Zultys VoIP DFW',
    publisher: {
      '@id': 'https://dallasfortworthzultys.com/#organization'
    }
  };
  schemas.push(websiteSchema);

  // BreadcrumbList Schema
  const isHome = normPath === '/' || normPath === '';
  const cityName = getServerCityName(normPath);
  const breadcrumbElements = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://dallasfortworthzultys.com/'
    }
  ];

  if (!isHome) {
    let pageName = cityName;
    if (normPath.includes('/products')) pageName = 'Zultys Products';
    else if (normPath.includes('/solutions')) pageName = 'VoIP Solutions';
    else if (normPath.includes('/about')) pageName = 'About Us';
    else if (normPath.includes('/contact')) pageName = 'Contact';
    else if (normPath.includes('/blog')) pageName = 'Expert VoIP Blog';
    else if (normPath.includes('/zultys-faq')) pageName = 'Zultys FAQ';
    else if (normPath.includes('/hipaa-compliant-voip')) pageName = 'HIPAA VoIP';
    else if (normPath.includes('/zultys-pricing')) pageName = 'Pricing Plans';
    else if (normPath.includes('/free-voip-site-audit')) pageName = 'Free Audit';
    else if (normPath.includes('/case-studies')) pageName = 'Case Studies';
    else if (normPath.includes('/voip-glossary')) pageName = 'VoIP Glossary';
    
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 2,
      name: pageName,
      item: canonicalUrl
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbElements
  };
  schemas.push(breadcrumbSchema);

  // LocalBusiness Schema (Homepage or City Page)
  const isCityPage = cityName !== 'Dallas-Fort Worth' || isHome;
  if (isCityPage) {
    const coords = serverCityCoordinates[cityName] || { lat: 32.7555, lng: -97.3308, zip: '76102' };
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${canonicalUrl}#localbusiness`,
      name: `Zultys DFW - DFW Business Communications - ${cityName}`,
      url: canonicalUrl,
      logo: 'https://dallasfortworthzultys.com/zultys-logo.png',
      image: ogImage,
      telephone: '817-231-2962',
      email: 'info@dallasfortworthzultys.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Local DFW Mobile Dispatch',
        addressLocality: cityName === 'Dallas-Fort Worth' ? 'Fort Worth' : cityName,
        addressRegion: 'TX',
        postalCode: coords.zip,
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '17:00'
      },
      sameAs: [
        'https://www.facebook.com/zultys',
        'https://www.linkedin.com/company/zultys-inc-'
      ],
      areaServed: [
        {
          '@type': 'City',
          name: cityName,
          sameAs: `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, '_')},_Texas`
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '48'
      },
      provider: {
        '@type': 'Organization',
        name: 'DFW Business Communications',
        url: 'https://dallasfortworthzultys.com'
      }
    };
    schemas.push(localBusinessSchema);

    // Service Schema for City Pages
    if (cityName !== 'Dallas-Fort Worth') {
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: `Business VoIP & Zultys Phone Systems in ${cityName}`,
        description: `Enterprise-grade Zultys business phone systems, cloud hosted VoIP, IP-PBX installation, and 24/7 certified engineering support for companies in ${cityName}, Texas.`,
        serviceType: 'TelecommunicationsService',
        provider: {
          '@id': 'https://dallasfortworthzultys.com/#organization'
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          sameAs: `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, '_')},_Texas`
        }
      };
      schemas.push(serviceSchema);
    }

    // FAQPage Schema
    const isFinancialServices = normPath.toLowerCase().includes('financial-services');
    const hasPageFAQ = cityName !== 'Dallas-Fort Worth' || isFinancialServices;
    if (hasPageFAQ) {
      const subjectName = cityName !== 'Dallas-Fort Worth' ? cityName : 'Financial Services';
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Can we keep our existing ${subjectName} phone numbers when migrating to Zultys?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Absolutely! We manage the entire number porting process, coordinating with your current carrier to ensure a seamless transition of all your direct dials, main lines, and toll-free numbers with zero downtime on migration day.`
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Zultys Cloud and Zultys On-Premise?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Zultys Cloud is hosted in our secure, redundant data centers, offering low upfront costs, automatic software updates, and simple scalability. Zultys On-Premise utilizes a dedicated hardware appliance at your ${subjectName} office, providing maximum control and local network survivability independent of internet connectivity.`
            }
          },
          {
            '@type': 'Question',
            name: `Does Zultys support remote and mobile workers in ${subjectName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, remote work is a core feature of the Zultys platform. Through the MXmobile app and secure softphone technology, employees can access their full office extensions, chat, and video tools from home or while traveling, with no complex VPN configuration required.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does DFW Business Communications provide local support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Unlike nationwide providers who rely on remote call centers, we are based locally in the DFW Metroplex. We provide on-site installation, face-to-face staff training, and rapid on-site dispatch of certified technicians if physical support is ever needed at your ${subjectName} facility.`
            }
          }
        ]
      };
      schemas.push(faqSchema);
    }
  }

  // BlogPosting Schema
  const isBlog = normPath.startsWith('/blog') || normPath.includes('blog-') || normPath.includes('-blog');
  if (isBlog) {
    const blogPostSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#blogpost`,
      "headline": title,
      "description": description,
      "image": ogImage,
      "author": {
        "@type": "Organization",
        "name": "DFW Business Communications",
        "url": "https://dallasfortworthzultys.com"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://dallasfortworthzultys.com/#organization",
        "name": "DFW Business Communications",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dallasfortworthzultys.com/zultys-logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "inLanguage": "en-US"
    };
    schemas.push(blogPostSchema);
  }

  // Generate the formatted JSON-LD tags
  const jsonLdScripts = schemas.map(schema => {
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  }).join('\n    ');

  // 5. Build our clean, single set of SEO head tags
  const seoHeadTags = [
    `<!-- Dynamic SEO Injection -->`,
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="keywords" content="${keywords}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta name="robots" content="${robotsDirective}" />`,
    `<meta name="googlebot" content="${googlebotDirective}" />`,
    `<meta name="author" content="DFW Business Communications" />`,
    `<meta name="geo.region" content="US-TX" />`,
    `<meta name="geo.placename" content="Fort Worth, Dallas" />`,
    `<meta name="geo.position" content="32.7555;-97.3308" />`,
    `<meta name="ICBM" content="32.7555, -97.3308" />`,
    `<!-- Open Graph -->`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:site_name" content="DFW Business Communications" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<!-- Twitter -->`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<!-- Dynamic Server JSON-LD Schemas -->`,
    jsonLdScripts,
    `<!-- End Dynamic SEO Injection -->`
  ].join('\n    ');

  // 6. Clean up the existing template by removing existing title, description, canonical, robots, og, twitter, and ld+json tags
  let cleanedHtml = html;
  
  // Remove existing <title>...</title>
  cleanedHtml = cleanedHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');
  
  // Remove existing description, keywords, and canonical tags
  cleanedHtml = cleanedHtml.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+content="[^"]*"\s+name="description"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+content="[^"]*"\s+name="keywords"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<link\s+href="[^"]*"\s+rel="canonical"\s*\/?>/gi, '');

  // Remove other duplicates that might exist
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="robots"[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="googlebot"[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="og:[\s\S]*?\/?>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<meta\s+(name|property)="twitter:[\s\S]*?\/?>/gi, '');

  // Clean any pre-existing ld+json blocks to prevent validation errors or duplicate data
  cleanedHtml = cleanedHtml.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');

  // 7. Inject our clean set right after <head>
  cleanedHtml = cleanedHtml.replace(/<head>/i, `<head>\n    ${seoHeadTags}`);

  return cleanedHtml;
}

// Perform Pre-rendering for each valid route
let successCount = 0;
let errorCount = 0;

VALID_PATHS.forEach((route) => {
  try {
    const injectedHtml = injectSEOMetadata(template, route);
    
    if (route === "/" || route === "") {
      // Overwrite the main dist/index.html with homepage pre-rendered meta tags
      fs.writeFileSync(templatePath, injectedHtml, "utf8");
      successCount++;
    } else {
      // Create subfolder and place index.html inside (or write directly if it has an extension like .html)
      const relativeDirPath = route.startsWith("/") ? route.slice(1) : route;
      const targetPath = path.join(distPath, relativeDirPath);

      if (relativeDirPath.endsWith(".html") || relativeDirPath.includes(".")) {
        // Ensure parent directory exists and write file directly
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, injectedHtml, "utf8");
      } else {
        // Create directory and write index.html inside
        fs.mkdirSync(targetPath, { recursive: true });
        fs.writeFileSync(path.join(targetPath, "index.html"), injectedHtml, "utf8");
      }
      successCount++;
    }
  } catch (err) {
    console.error(`❌ FAILED to pre-render route: ${route}`, err);
    errorCount++;
  }
});

console.log(`\n🎉 STATIC PRE-RENDERING COMPLETED SUCCESSFULLY!`);
console.log(`✅ Pre-rendered ${successCount} pages in 'dist/' with page-specific SEO head tags.`);
if (errorCount > 0) {
  console.warn(`⚠️ Encountered errors on ${errorCount} pages.`);
}
console.log("==================================================\n");
