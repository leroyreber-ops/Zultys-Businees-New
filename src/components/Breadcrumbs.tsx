import React from 'react';
import { HashLink as Link, useLocation } from './HashLink';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Function to format city names dynamically from slug
function formatCityName(slug: string): string {
  const suffixes = [
    '-tx-zultys-phone-systems',
    '-zultys-phone-systems',
    '-business-voip',
    '-zultys-dealer',
    '-business-phone-systems',
    '-voip-solutions',
    '-zultys-voip',
    '-zultys-systems',
    '-zultys-phones',
    '-zultys-solutions',
    '-zultys',
    '-voip-solutions',
    '-voip',
    '-phone-systems',
    '-business-communications',
    '-ip-pbx',
    '-business-phones',
    '-systems',
    '-tx'
  ];
  
  let name = slug.replace(/^\//, ''); // remove leading slash
  
  for (const suffix of suffixes) {
    if (name.endsWith(suffix)) {
      name = name.slice(0, -suffix.length);
      break;
    }
  }
  
  if (name.endsWith('-tx')) {
    name = name.slice(0, -3);
  }

  // Replace hyphens with spaces
  name = name.replace(/-/g, ' ');

  // Title-case words
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const exactMatches: Record<string, BreadcrumbItem[]> = {
  '/products': [{ label: 'Products' }],
  '/solutions': [{ label: 'Solutions' }],
  '/about': [{ label: 'About Us' }],
  '/contact': [{ label: 'Contact' }],
  '/blog': [{ label: 'Blog' }],
  '/sitemap.html': [{ label: 'Sitemap' }],
  '/sitemap': [{ label: 'Sitemap' }],
  '/zultys-faq': [{ label: 'Support', href: '/zultys-support' }, { label: 'FAQ' }],
  '/zultys-user-guides': [{ label: 'Support', href: '/zultys-support' }, { label: 'User Guides' }],
  '/zultys-support': [{ label: 'Support' }],
  '/zultys-pricing': [{ label: 'Pricing' }],
  '/free-voip-site-audit': [{ label: 'Free VoIP Site Audit' }],
  '/case-studies': [{ label: 'Case Studies' }],
  '/voip-glossary': [{ label: 'VoIP Glossary' }],
  '/our-team': [{ label: 'About Us', href: '/about' }, { label: 'Our Team' }],
  '/certifications-awards': [{ label: 'About Us', href: '/about' }, { label: 'Certifications & Awards' }],
  '/privacy': [{ label: 'Privacy Policy' }],
  '/terms': [{ label: 'Terms of Service' }],
  
  // Comparative pages
  '/zultys-vs-competitors': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Competitors' }],
  '/zultys-vs-competition': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Competitors' }],
  '/zultys-vs-ringcentral': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs RingCentral' }],
  '/zultys-vs-8x8': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs 8x8' }],
  '/zultys-vs-microsoft-teams': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Teams' }],
  '/zultys-vs-vonage': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Vonage' }],
  '/zultys-vs-avaya': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Avaya' }],
  '/zultys-vs-cisco-webex': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Cisco Webex' }],
  '/zultys-vs-mitel': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Mitel' }],
  '/zultys-vs-zoom-phone': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Zoom Phone' }],
  '/zultys-vs-gotoconnect': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs GoToConnect' }],
  '/zultys-vs-nextiva': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Nextiva' }],
  '/zultys-vs-dialpad': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Dialpad' }],
  '/zultys-vs-intermedia': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Intermedia' }],
  '/zultys-vs-comcast-business': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Comcast Business' }],
  '/zultys-vs-spectrum-business': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Spectrum Business' }],
  '/zultys-vs-att-business': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs AT&T Business' }],
  '/zultys-vs-ooma-office': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Ooma Office' }],
  
  // Products pages
  '/fort-worth-zultys-zip-49g-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'ZIP 49G' }
  ],
  '/fort-worth-zultys-zip-47g-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'ZIP 47G' }
  ],
  '/fort-worth-zultys-zip-45g-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'ZIP 45G' }
  ],
  '/fort-worth-zultys-zip-43g-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'ZIP 43G' }
  ],
  '/fort-worth-zultys-z-23ge-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'Z 23GE' }
  ],
  '/fort-worth-zultys-z23g-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'Z 23GE' }
  ],
  '/fort-worth-zultys-z-22g-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'Z 22G' }
  ],
  '/fort-worth-zultys-z-21i-phone': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'Z 21i' }
  ],
  '/fort-worth-zultys-gateways': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'Gateways' }
  ],
  '/fort-worth-zultys-mx-series': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'MX Series' }
  ],
  '/fort-worth-zultys-mx-se': [
    { label: 'Products', href: '/products' },
    { label: 'Hardware', href: '/dallas-zultys-phones' },
    { label: 'MX-SE' }
  ],
  '/fort-worth-zultys-zac': [
    { label: 'Products', href: '/products' },
    { label: 'Software' },
    { label: 'ZAC' }
  ],
  '/fort-worth-zultys-mxmobile': [
    { label: 'Products', href: '/products' },
    { label: 'Software' },
    { label: 'MXmobile' }
  ],
  '/fort-worth-zultys-mobile-zac': [
    { label: 'Products', href: '/products' },
    { label: 'Software' },
    { label: 'Mobile ZAC' }
  ],
  '/fort-worth-zultys-mxconference': [
    { label: 'Products', href: '/products' },
    { label: 'Software' },
    { label: 'MXconference' }
  ],
  '/fort-worth-zultys-cloud-services': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Cloud Services' }
  ],
  '/zultys-cloud-services': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Cloud Services' }
  ],
  '/fort-worth-zultys-on-premise': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'On-Premise' }
  ],
  '/fort-worth-zultys-hybrid': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Hybrid' }
  ],
  '/fort-worth-zultys-contact-center': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Contact Center' }
  ],
  '/fort-worth-zultys-installation': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Services' },
    { label: 'Installation' }
  ],
  '/fort-worth-zultys-training': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Services' },
    { label: 'Training' }
  ],

  // Industry solutions
  '/fort-worth-zultys-healthcare': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Healthcare' }
  ],
  '/zultys-for-healthcare': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Healthcare' }
  ],
  '/fort-worth-zultys-education': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Education' }
  ],
  '/zultys-for-education': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Education' }
  ],
  '/fort-worth-zultys-professional-services': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Professional Services' }
  ],
  '/fort-worth-zultys-real-estate': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Real Estate' }
  ],
  '/zultys-for-real-estate': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Real Estate' }
  ],
  '/fort-worth-zultys-retail-automotive': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Retail & Automotive' }
  ],
  '/zultys-for-retail': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Retail & Automotive' }
  ],
  '/fort-worth-zultys-multi-location': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Business Solutions', href: '/solutions' },
    { label: 'Multi-Location' }
  ],
  '/fort-worth-zultys-enterprise': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Business Solutions', href: '/solutions' },
    { label: 'Enterprise' }
  ],
  '/fort-worth-zultys-phone-system-small-business': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Business Solutions', href: '/solutions' },
    { label: 'Small Business' }
  ],
  '/fort-worth-zultys-small-business': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Business Solutions', href: '/solutions' },
    { label: 'Small Business' }
  ],
  '/zultys-for-legal-firms': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Legal Firms' }
  ],
  '/zultys-for-financial-services': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Financial Services' }
  ],
  '/zultys-for-manufacturing-logistics': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Manufacturing & Logistics' }
  ],
  '/zultys-for-hospitality': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Hospitality' }
  ],
  '/zultys-for-non-profits': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industry', href: '/solutions' },
    { label: 'Non-Profits' }
  ],
  '/hipaa-compliant-voip': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Compliance' },
    { label: 'HIPAA Compliant VoIP' }
  ],
  '/remote-work-solutions': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Remote Work' }
  ],
  '/voip-security-encryption': [
    { label: 'Solutions', href: '/solutions' },
    { label: 'VoIP Security' }
  ],
  
  // Blog posts
  '/blog/why-zultys-is-the-best-choice-for-dfw-small-businesses': [
    { label: 'Blog', href: '/blog' },
    { label: 'Best Choice for DFW Small Businesses' }
  ],
  '/blog/on-premise-vs-cloud-which-zultys-deployment-is-right-for-you': [
    { label: 'Blog', href: '/blog' },
    { label: 'On-Premise vs Cloud' }
  ],
  '/blog/how-to-optimize-your-office-network-for-voip-performance': [
    { label: 'Blog', href: '/blog' },
    { label: 'Optimize Office Network' }
  ]
};

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const cleanPathname = pathname.toLowerCase().replace(/\/$/, '');

  // Home page or empty path -> No breadcrumbs
  if (!cleanPathname || cleanPathname === '' || cleanPathname === '/index.html') {
    return [];
  }

  // Exact Match config check
  if (exactMatches[cleanPathname]) {
    return exactMatches[cleanPathname];
  }

  // Fallback / dynamic classification for city service area pages
  const formattedCity = formatCityName(cleanPathname);
  if (formattedCity) {
    return [
      { label: 'Service Areas', href: '/sitemap.html' },
      { label: formattedCity }
    ];
  }

  // Default fallback if we can't figure it out perfectly
  const words = cleanPathname.substring(1).split('-');
  const fallbackLabel = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return [{ label: fallbackLabel }];
}

export function Breadcrumbs() {
  const location = useLocation();
  const segments = getBreadcrumbs(location.pathname);

  if (segments.length === 0) {
    return null;
  }

  // Build breadcrumb list schema object dynamically for SEO support
  const domain = 'https://dallasfortworthzultys.com';
  const fullList = [{ label: 'Home', href: '/' }, ...segments];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': fullList.map((item, index) => {
      const url = item.href ? `${domain}${item.href}` : `${domain}${location.pathname}`;
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.label,
        'item': url
      };
    })
  };

  return (
    <nav 
      aria-label="Breadcrumb"
      className="bg-gray-50/80 backdrop-blur-md border-b border-gray-100 py-3 text-sm"
      id="breadcrumbs-nav"
    >
      {/* JSON-LD Schema injection for rich search result snippets */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2.5 text-xs md:text-sm text-gray-500 font-medium">
          {fullList.map((item, index) => {
            const isLast = index === fullList.length - 1;

            return (
              <li key={index} className="flex items-center gap-2.5">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" aria-hidden="true" />
                )}

                {isLast ? (
                  <span 
                    className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-md"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href || '/'}
                    className="flex items-center gap-1.5 hover:text-zultys-green transition-colors duration-200"
                  >
                    {index === 0 && (
                      <Home className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
