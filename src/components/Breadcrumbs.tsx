import React, { useState, useEffect } from 'react';
import { HashLink as Link } from './HashLink';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
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
  
  let name = slug.replace(/^\//, '').toLowerCase(); // remove leading slash & lower
  
  // Keep stripping suffixes in any order until no more matches are found
  let stripped = true;
  while (stripped) {
    stripped = false;
    for (const suffix of suffixes) {
      if (name.endsWith(suffix)) {
        name = name.slice(0, -suffix.length);
        stripped = true;
        break;
      }
    }
  }

  // Replace hyphens with spaces
  name = name.replace(/-/g, ' ');

  // Title-case words
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}

// Format titles beautifully with proper uppercase for business abbreviations
function formatTitle(slug: string): string {
  const UPPERCASE_WORDS = new Set(['voip', 'ip', 'pbx', 'dfw', 'hipaa', 'zac', 'mx', 'mxmobile', 'mxconference', 'att', 'crm', 'faq', 'gsc', 'seo', 'api']);
  const CUSTOM_MAP: Record<string, string> = {
    'att-business': 'AT&T Business',
    'microsoft-teams': 'Teams',
    'gotoconnect': 'GoToConnect',
    'mx-se': 'MX-SE',
    'mxmobile': 'MXmobile',
    'mxconference': 'MXconference',
    'zac': 'ZAC',
    'zip': 'ZIP',
    'healthcare-zultys-migration-dallas': 'Healthcare Migration',
    'why-zultys-is-the-best-choice-for-dfw-small-businesses': 'Best Choice for DFW Small Businesses',
    'on-premise-vs-cloud-which-zultys-deployment-is-right-for-you': 'On-Premise vs Cloud',
    'how-to-optimize-your-office-network-for-voip-performance': 'Optimize Office Network'
  };

  const cleanSlug = slug.replace(/^\//, '');
  if (CUSTOM_MAP[cleanSlug]) return CUSTOM_MAP[cleanSlug];

  return cleanSlug
    .split('-')
    .map(word => {
      const lower = word.toLowerCase();
      if (UPPERCASE_WORDS.has(lower)) {
        if (lower === 'att') return 'AT&T';
        return lower.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const competitorNames: Record<string, string> = {
  'competitors': 'Competitors',
  'competition': 'Competitors',
  'ringcentral': 'RingCentral',
  '8x8': '8x8',
  'microsoft-teams': 'Teams',
  'vonage': 'Vonage',
  'avaya': 'Avaya',
  'cisco-webex': 'Cisco Webex',
  'mitel': 'Mitel',
  'zoom-phone': 'Zoom Phone',
  'gotoconnect': 'GoToConnect',
  'nextiva': 'Nextiva',
  'dialpad': 'Dialpad',
  'intermedia': 'Intermedia',
  'comcast-business': 'Comcast Business',
  'spectrum-business': 'Spectrum Business',
  'att-business': 'AT&T Business',
  'ooma-office': 'Ooma Office',
  'dfw-local-telecoms': 'DFW Local Telecoms'
};

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
  '/zultys-migration-guide-dfw': [{ label: 'Support', href: '/zultys-support' }, { label: 'Migration Guide' }],
  '/zultys-crm-integration-guide': [{ label: 'Support', href: '/zultys-support' }, { label: 'CRM Integration Guide' }],
  '/zultys-support': [{ label: 'Support' }],
  '/dallas-zultys-phones': [{ label: 'Products', href: '/products' }, { label: 'Hardware' }],
  '/zultys-pricing': [{ label: 'Pricing' }],
  '/free-voip-site-audit': [{ label: 'Free VoIP Site Audit' }],
  '/case-studies': [{ label: 'Case Studies' }],
  '/case-studies/healthcare-zultys-migration-dallas': [{ label: 'Case Studies', href: '/case-studies' }, { label: 'Healthcare Migration' }],
  '/collin-county-voip-systems': [{ label: 'Service Areas', href: '/sitemap' }, { label: 'Collin County' }],
  '/voip-glossary': [{ label: 'VoIP Glossary' }],
  '/our-team': [{ label: 'About Us', href: '/about' }, { label: 'Our Team' }],
  '/certifications-awards': [{ label: 'About Us', href: '/about' }, { label: 'Certifications & Awards' }],
  '/privacy': [{ label: 'Privacy Policy' }],
  '/terms': [{ label: 'Terms of Service' }],
  
  // Comparative pages
  '/zultys-vs-competitors': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Competitors' }],
  '/zultys-vs-competition': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs Competitors' }],
  '/zultys-vs-dfw-local-telecoms': [{ label: 'Comparisons', href: '/zultys-vs-competitors' }, { label: 'Zultys vs DFW Local Telecoms' }],
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

const KNOWN_CITIES = new Set([
  'Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Garland', 'Irving', 
  'Grand Prairie', 'McKinney', 'Frisco', 'Carrollton', 'Denton', 'Richardson', 
  'Lewisville', 'Allen', 'Flower Mound', 'North Richland Hills', 'Mansfield', 
  'Rowlett', 'Euless', 'Southlake', 'Grapevine', 'Bedford', 'Keller', 
  'Hurst', 'Coppell', 'Waxahachie', 'Cleburne', 'Weatherford', 'Burleson', 
  'Terrell', 'Prosper', 'The Colony', 'Little Elm', 'Wylie', 'Rockwall', 
  'Forney', 'Midlothian', 'Ennis', 'Mesquite', 'Cedar Hill', 'DeSoto', 
  'Duncanville', 'Lancaster', 'Addison', 'Aledo', 'Springtown', 'Granbury', 
  'Glen Rose', 'Godley', 'Grandview', 'Venus', 'Maypearl', 'Italy', 
  'Milford', 'Palmer', 'Murphy', 'Sachse', 'Seagoville', 'Balch Springs', 
  'Celina', 'Princeton', 'Anna', 'Melissa', 'Royse City', 'Fate', 'Heath', 
  'Sunnyvale', 'Crandall', 'Lavon', 'Red Oak', 'Ovilla', 'Glenn Heights', 
  'Hutchins', 'Wilmer', 'Kaufman', 'Pilot Point', 'Sanger', 'Aubrey', 
  'Alvarado', 'Decatur', 'Bridgeport', 'Justin', 'Krum', 'Ponder', 
  'Trophy Club', 'Roanoke', 'Argyle', 'Kennedale', 'Forest Hill', 'Blue Mound', 
  'Azle', 'Bartonville', 'Bowie', 'Boyd', 'Brock', 'Crowley', 'Haslet', 
  'Joshua', 'Lake Worth', 'Lakeside', 'Colleyville', 'Saginaw', 'Haltom City', 
  'Watauga', 'Benbrook', 'Westworth Village', 'White Settlement', 'River Oaks', 
  'Hudson Oaks', 'Willow Park', 'Everman', 'Pantego', 'Dalworthington Gardens', 
  'Westover Hills', 'Edgecliff Village', 'Richland Hills', 'Sansom Park', 'Reno', 
  'Van Alstyne', 'Leonard', 'Farmersville', 'Howe', 'Whitewright', 'Gunter', 
  'Collinsville', 'Tioga', 'Tom Bean', 'Trenton', 'Savoy', 'Bells', 
  'Blue Ridge', 'Ector', 'Ravenna', 'Bonham', 'Honey Grove', 'Ladonia', 
  'Windom', 'Dodd City', 'Merit', 'Celeste', 'Wolfe City', 'Caddo Mills', 
  'Nevada', 'Josephine', 'Bailey', 'Randolph', 'Telephone', 'Ivanhoe', 'Gober'
]);

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const cleanPathname = pathname.toLowerCase().replace(/\/$/, '');

  // Home page or empty path -> No breadcrumbs
  if (!cleanPathname || cleanPathname === '' || cleanPathname === '/index.html') {
    return [];
  }

  // Exact Match config check
  if (exactMatches[cleanPathname]) {
    return exactMatches[cleanPathname];
  }

  // Dynamic Comparison Pages
  if (cleanPathname.startsWith('/zultys-vs-')) {
    const compSlug = cleanPathname.substring('/zultys-vs-'.length);
    const displayLabel = competitorNames[compSlug] || formatTitle(compSlug);
    return [
      { label: 'Comparisons', href: '/zultys-vs-competitors' },
      { label: `Zultys vs ${displayLabel}` }
    ];
  }

  // Handle blog posts dynamically (e.g. /blog/post-slug)
  if (cleanPathname.startsWith('/blog/')) {
    const postSlug = cleanPathname.substring('/blog/'.length);
    return [
      { label: 'Blog', href: '/blog' },
      { label: formatTitle(postSlug) }
    ];
  }

  // Handle case studies dynamically
  if (cleanPathname.startsWith('/case-studies/')) {
    const caseSlug = cleanPathname.substring('/case-studies/'.length);
    return [
      { label: 'Case Studies', href: '/case-studies' },
      { label: formatTitle(caseSlug) }
    ];
  }

  // Check if it's a city page using the known cities set and suffixes
  const formattedCity = formatCityName(cleanPathname);
  if (formattedCity && KNOWN_CITIES.has(formattedCity)) {
    return [
      { label: 'Service Areas', href: '/sitemap.html' },
      { label: formattedCity }
    ];
  }

  // Dynamic Products check
  if (cleanPathname.includes('-zip-') || cleanPathname.includes('-z-') || cleanPathname.includes('-z23') || cleanPathname.includes('mx-series') || cleanPathname.includes('mx-se') || cleanPathname.includes('gateways')) {
    let title = '';
    if (cleanPathname.includes('49g')) title = 'ZIP 49G';
    else if (cleanPathname.includes('47g')) title = 'ZIP 47G';
    else if (cleanPathname.includes('45g')) title = 'ZIP 45G';
    else if (cleanPathname.includes('43g')) title = 'ZIP 43G';
    else if (cleanPathname.includes('23ge') || cleanPathname.includes('23g')) title = 'Z 23GE';
    else if (cleanPathname.includes('22g')) title = 'Z 22G';
    else if (cleanPathname.includes('21i')) title = 'Z 21i';
    else if (cleanPathname.includes('gateways')) title = 'Gateways';
    else if (cleanPathname.includes('mx-series')) title = 'MX Series';
    else if (cleanPathname.includes('mx-se')) title = 'MX-SE';
    else title = formatTitle(cleanPathname.split('-').pop() || '');

    return [
      { label: 'Products', href: '/products' },
      { label: 'Hardware', href: '/dallas-zultys-phones' },
      { label: title }
    ];
  }

  // Dynamic Software check
  if (cleanPathname.includes('-zac') || cleanPathname.includes('-mxmobile') || cleanPathname.includes('-mxconference') || cleanPathname.includes('-mobile-zac')) {
    let title = 'Software';
    if (cleanPathname.includes('zac')) title = 'ZAC';
    if (cleanPathname.includes('mxmobile')) title = 'MXmobile';
    if (cleanPathname.includes('mxconference')) title = 'MXconference';
    if (cleanPathname.includes('mobile-zac')) title = 'Mobile ZAC';

    return [
      { label: 'Products', href: '/products' },
      { label: 'Software' },
      { label: title }
    ];
  }

  // Dynamic Solutions / Industries check
  if (cleanPathname.includes('healthcare')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Healthcare' }];
  }
  if (cleanPathname.includes('education')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Education' }];
  }
  if (cleanPathname.includes('professional-services')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Professional Services' }];
  }
  if (cleanPathname.includes('real-estate')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Real Estate' }];
  }
  if (cleanPathname.includes('retail')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Retail & Automotive' }];
  }
  if (cleanPathname.includes('legal-firms')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Legal Firms' }];
  }
  if (cleanPathname.includes('financial-services')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Financial Services' }];
  }
  if (cleanPathname.includes('manufacturing-logistics')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Manufacturing & Logistics' }];
  }
  if (cleanPathname.includes('hospitality')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Hospitality' }];
  }
  if (cleanPathname.includes('non-profit')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Industry', href: '/solutions' }, { label: 'Non-Profits' }];
  }
  if (cleanPathname.includes('small-business')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Business Solutions', href: '/solutions' }, { label: 'Small Business' }];
  }
  if (cleanPathname.includes('enterprise')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Business Solutions', href: '/solutions' }, { label: 'Enterprise' }];
  }
  if (cleanPathname.includes('multi-location')) {
    return [{ label: 'Solutions', href: '/solutions' }, { label: 'Business Solutions', href: '/solutions' }, { label: 'Multi-Location' }];
  }

  // General multi-segment path fallback (e.g. /solutions/industry)
  const segments = cleanPathname.split('/').filter(Boolean);
  if (segments.length > 1) {
    const breadcrumbItems: BreadcrumbItem[] = [];
    let currentHref = '';
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentHref += `/${segment}`;
      breadcrumbItems.push({
        label: formatTitle(segment),
        href: i === segments.length - 1 ? undefined : currentHref
      });
    }
    return breadcrumbItems;
  }

  // Default fallback if we can't figure it out perfectly
  return [{ label: formatTitle(cleanPathname) }];
}

export function Breadcrumbs() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const segments = getBreadcrumbs(pathname);

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
      const url = item.href ? `${domain}${item.href}` : `${domain}${pathname}`;
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
        id="breadcrumb-jsonld"
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
