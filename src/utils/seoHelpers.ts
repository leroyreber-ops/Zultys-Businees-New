export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  schemaType?: string;
  productSchema?: {
    name: string;
    description: string;
    brand: string;
    model?: string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
    sku?: string;
    image?: string;
  };
  serviceSchema?: {
    name: string;
    description: string;
    provider: string;
    areaServed: string[];
    serviceType: string;
  };
  faqSchema?: {
    question: string;
    answer: string;
  }[];
  reviewSchema?: {
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  howToSchema?: {
    name: string;
    description: string;
    steps: {
      name: string;
      text: string;
      image?: string;
    }[];
  };
  additionalSchema?: object;
}

export function applySEO(props: SEOProps) {
  // Update Title
  document.title = props.title;

  // Update Meta Tags
  updateMetaTag('name', 'description', props.description);
  updateMetaTag('name', 'keywords', props.keywords);
  updateCanonicalLink(props.canonicalUrl);

  // Technical SEO
  updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  updateMetaTag('name', 'googlebot', 'index, follow');
  updateMetaTag('name', 'author', 'DFW Business Communications');
  updateMetaTag('name', 'geo.region', 'US-TX');
  updateMetaTag('name', 'geo.placename', 'Fort Worth, Dallas');
  updateMetaTag('name', 'geo.position', '32.7555;-97.3308');
  updateMetaTag('name', 'ICBM', '32.7555, -97.3308');

  // Open Graph
  const ogTitle = props.ogTitle || props.title;
  const ogDescription = props.ogDescription || props.description;
  updateMetaTag('property', 'og:title', ogTitle);
  updateMetaTag('property', 'og:description', ogDescription);
  updateMetaTag('property', 'og:url', props.canonicalUrl);
  updateMetaTag('property', 'og:type', 'website');
  updateMetaTag('property', 'og:locale', 'en_US');
  updateMetaTag('property', 'og:site_name', 'DFW Business Communications');
  
  if (props.ogImage) {
    updateMetaTag('property', 'og:image', props.ogImage);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
  }

  // Twitter
  const twitterTitle = props.twitterTitle || props.title;
  const twitterDescription = props.twitterDescription || props.description;
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', twitterTitle);
  updateMetaTag('name', 'twitter:description', twitterDescription);
  if (props.ogImage) {
    updateMetaTag('name', 'twitter:image', props.ogImage);
  }

  // Schema.org JSON-LD
  updateSchema(props);
}

function updateMetaTag(attr: string, value: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonicalLink(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function updateSchema(props: SEOProps) {
  // Remove existing dynamic schemas
  document.querySelectorAll('script[type="application/ld+json"][data-page-schema="true"]').forEach(el => el.remove());

  const schemas: any[] = [];

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": props.schemaType || "WebPage",
    "@id": `${props.canonicalUrl}#webpage`,
    "url": props.canonicalUrl,
    "name": props.title,
    "description": props.description,
    "isPartOf": { "@id": "https://dallasfortworthzultys.com/#website" },
    "about": { "@id": "https://dallasfortworthzultys.com/#organization" },
    "inLanguage": "en-US"
  };
  schemas.push(webPageSchema);

  // Product Schema
  if (props.productSchema) {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": props.productSchema.name,
      "description": props.productSchema.description,
      "brand": { "@type": "Brand", "name": props.productSchema.brand },
      ...(props.productSchema.model && { "model": props.productSchema.model }),
      ...(props.productSchema.sku && { "sku": props.productSchema.sku }),
      ...(props.productSchema.image && { "image": props.productSchema.image }),
      "offers": {
        "@type": "Offer",
        "url": props.canonicalUrl,
        "priceCurrency": props.productSchema.priceCurrency || "USD",
        ...(props.productSchema.price && { "price": props.productSchema.price }),
        "availability": props.productSchema.availability || "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "DFW Business Communications",
          "url": "https://dallasfortworthzultys.com"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "127"
      }
    };
    schemas.push(productSchema);
  }

  // Service Schema
  if (props.serviceSchema) {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": props.serviceSchema.name,
      "description": props.serviceSchema.description,
      "serviceType": props.serviceSchema.serviceType,
      "provider": { "@id": "https://dallasfortworthzultys.com/#organization" },
      "areaServed": props.serviceSchema.areaServed.map(city => ({ "@type": "City", "name": city }))
    };
    schemas.push(serviceSchema);
  }

  // FAQ Schema
  if (props.faqSchema) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": props.faqSchema.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  // Review Schema
  if (props.reviewSchema) {
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "ratingValue": props.reviewSchema.ratingValue,
      "reviewCount": props.reviewSchema.reviewCount,
      ...(props.reviewSchema.bestRating && { "bestRating": props.reviewSchema.bestRating }),
      ...(props.reviewSchema.worstRating && { "worstRating": props.reviewSchema.worstRating })
    };
    schemas.push(reviewSchema);
  }

  // HowTo Schema
  if (props.howToSchema) {
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": props.howToSchema.name,
      "description": props.howToSchema.description,
      "step": props.howToSchema.steps.map(step => ({
        "@type": "HowToStep",
        "name": step.name,
        "text": step.text,
        ...(step.image && { "image": step.image })
      }))
    };
    schemas.push(howToSchema);
  }

  // Additional Schema
  if (props.additionalSchema) {
    schemas.push(props.additionalSchema);
  }

  // Inject schemas
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-schema', 'true');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function applyProductSEO(name: string, description: string, url: string, keywords: string, extra?: any) {
  applySEO({
    title: `${name} Fort Worth | ${name} Dallas | DFW Business Communications`,
    description,
    keywords,
    canonicalUrl: url,
    schemaType: 'Product',
    productSchema: {
      name,
      description,
      brand: extra?.brand || 'Zultys',
      model: extra?.model,
      price: extra?.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      sku: extra?.sku
    }
  });
}

export function applyServiceSEO(name: string, description: string, url: string, keywords: string, serviceType?: string) {
  applySEO({
    title: `${name} | Fort Worth Dallas DFW | DFW Business Communications`,
    description,
    keywords,
    canonicalUrl: url,
    schemaType: 'Service',
    serviceSchema: {
      name,
      description,
      provider: 'DFW Business Communications',
      areaServed: ['Fort Worth', 'Dallas', 'Arlington', 'Irving', 'Plano', 'Frisco', 'DFW Metroplex'],
      serviceType: serviceType || 'Telecommunications'
    }
  });
}

/**
 * Extracts and capitalizes the city name from a given URL path slug.
 */
export function getCityNameFromPath(path: string): string {
  const cleanPath = path.toLowerCase().replace(/^\//, '').replace(/\.html$/, '');
  if (!cleanPath || cleanPath === 'index' || cleanPath === 'home') return 'Dallas-Fort Worth';
  
  // Custom suffixes to strip from city pages
  const suffixes = [
    '-tx-zultys-phone-systems',
    '-tx-zultys-voip',
    '-tx-zultys-dealer',
    '-zultys-phone-systems',
    '-zultys-systems',
    '-zultys-phones',
    '-zultys-dealer',
    '-ip-pbx',
    '-voip-solutions',
    '-business-phone-systems',
    '-business-voip',
    '-zultys-solutions',
    '-zultys',
    '-phone-systems',
    '-phone-system',
    '-voip',
    '-business-phones',
    '-ip-phones',
    '-business-communications'
  ];
  
  let citySlug = cleanPath;
  for (const suffix of suffixes) {
    if (citySlug.endsWith(suffix)) {
      citySlug = citySlug.slice(0, -suffix.length);
      break;
    }
  }
  
  // Hardcoded mappings for clean multi-word cities or abbreviations
  const cityMappings: Record<string, string> = {
    'fort-worth': 'Fort Worth',
    'dallas': 'Dallas',
    'grand-prairie': 'Grand Prairie',
    'north-richland-hills': 'North Richland Hills',
    'flower-mound': 'Flower Mound',
    'lake-worth': 'Lake Worth',
    'westworth-village': 'Westworth Village',
    'white-settlement': 'White Settlement',
    'hudson-oaks': 'Hudson Oaks',
    'willow-park': 'Willow Park',
    'dalworthington-gardens': 'Dalworthington Gardens',
    'westover-hills': 'Westover Hills',
    'edgecliff-village': 'Edgecliff Village',
    'richland-hills': 'Richland Hills',
    'sansom-park': 'Sansom Park',
    'van-alstyne': 'Van Alstyne',
    'farmersville': 'Farmersville',
    'blue-ridge': 'Blue Ridge',
    'honey-grove': 'Honey Grove',
    'dodd-city': 'Dodd City',
    'wolfe-city': 'Wolfe City',
    'caddo-mills': 'Caddo Mills',
    'royse-city': 'Royse City',
    'glenn-heights': 'Glenn Heights',
    'balch-springs': 'Balch Springs',
    'pilot-point': 'Pilot Point',
    'trophy-club': 'Trophy Club',
    'forest-hill': 'Forest Hill',
    'blue-mound': 'Blue Mound',
    'bartonville': 'Bartonville',
    'the-colony': 'The Colony',
    'little-elm': 'Little Elm',
    'cedar-hill': 'Cedar Hill',
    'red-oak': 'Red Oak',
    'haltom-city': 'Haltom City',
    'glen-rose': 'Glen Rose',
    'grandview': 'Grandview',
    'maypearl': 'Maypearl'
  };
  
  if (cityMappings[citySlug]) {
    return cityMappings[citySlug];
  }
  
  // Fallback split & capitalize
  return citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Dynamically generates unique, elite, SEO-optimized title, description, and keywords
 * for any given page path, prioritizing search ranking for Zultys phone systems,
 * cloud systems, business connectivity, and VoIP solutions.
 */
export function generateEliteMetadata(path: string): { title: string; description: string; keywords: string } {
  const normalized = path.toLowerCase().endsWith('/') && path.length > 1
    ? path.toLowerCase().slice(0, -1)
    : path.toLowerCase();

  // 1. Home / Root Page
  if (normalized === '' || normalized === '/' || normalized === '/index.html') {
    return {
      title: 'Zultys Phone Systems Dallas-Fort Worth | Cloud VoIP & IP-PBX Dealer',
      description: 'Maximize business productivity with Zultys cloud phone systems, IP-PBX, and unified communications in Dallas-Fort Worth. Authorized dealer providing on-site installation, zero-downtime porting, and 24/7 local engineering support.',
      keywords: 'Zultys phone systems DFW, cloud phone system Dallas, VoIP solutions Fort Worth, Zultys DFW dealer, DFW business communications, business VoIP Texas'
    };
  }

  // 2. Comparison Pages (Zultys vs competitors)
  if (normalized.includes('-vs-') || normalized.includes('compare')) {
    let competitor = 'Competitors';
    if (normalized.includes('ringcentral')) competitor = 'RingCentral';
    else if (normalized.includes('8x8')) competitor = '8x8';
    else if (normalized.includes('teams')) competitor = 'Microsoft Teams';
    else if (normalized.includes('vonage')) competitor = 'Vonage';
    else if (normalized.includes('avaya')) competitor = 'Avaya';
    else if (normalized.includes('cisco')) competitor = 'Cisco';
    else if (normalized.includes('mitel')) competitor = 'Mitel';
    else if (normalized.includes('zoom')) competitor = 'Zoom Phone';
    else if (normalized.includes('goto')) competitor = 'GoToConnect';
    else if (normalized.includes('nextiva')) competitor = 'Nextiva';
    else if (normalized.includes('dialpad')) competitor = 'Dialpad';
    else if (normalized.includes('intermedia')) competitor = 'Intermedia';
    else if (normalized.includes('comcast')) competitor = 'Comcast Business';
    else if (normalized.includes('spectrum')) competitor = 'Spectrum Business';
    else if (normalized.includes('att')) competitor = 'AT&T Business';
    else if (normalized.includes('ooma')) competitor = 'Ooma';

    return {
      title: `Zultys vs ${competitor} | DFW Business Phone System Comparison`,
      description: `Comparing Zultys vs ${competitor} for Dallas-Fort Worth offices. Discover why Zultys provides superior voice quality, lower TCO, local professional setup, and custom hybrid features that national competitors lack.`,
      keywords: `Zultys vs ${competitor}, DFW business phone comparison, Zultys advantages, cloud VoIP comparison Dallas, ${competitor} alternatives Texas`
    };
  }

  // 3. Products & Hardware Pages
  if (
    normalized.includes('phone') || 
    normalized.includes('product') || 
    normalized.includes('zip-') || 
    normalized.includes('z-2') || 
    normalized.includes('gateways') || 
    normalized.includes('mx-series') || 
    normalized.includes('mxse') || 
    normalized.includes('zac') || 
    normalized.includes('mxmobile') || 
    normalized.includes('mxconference')
  ) {
    let productName = 'Zultys IP Phones';
    if (normalized.includes('zip-49g')) productName = 'Zultys ZIP 49G Executive Smart Media IP Phone';
    else if (normalized.includes('zip-47g')) productName = 'Zultys ZIP 47G Business Gigabit IP Phone';
    else if (normalized.includes('zip-45g')) productName = 'Zultys ZIP 45G High-Performance IP Phone';
    else if (normalized.includes('zip-43g')) productName = 'Zultys ZIP 43G Entry-Level Gigabit IP Phone';
    else if (normalized.includes('z-23ge') || normalized.includes('z23g')) productName = 'Zultys Z-23GE Enterprise IP Phone';
    else if (normalized.includes('z-22g')) productName = 'Zultys Z-22G Business IP Phone';
    else if (normalized.includes('z-21i')) productName = 'Zultys Z-21i Wall-Mountable IP Phone';
    else if (normalized.includes('gateways')) productName = 'Zultys MXvirtual & Enterprise VoIP Gateways';
    else if (normalized.includes('mx-series') || normalized.includes('mx-series')) productName = 'Zultys MX Series Unified Communications Systems';
    else if (normalized.includes('mx-se') || normalized.includes('mxse')) productName = 'Zultys MXSE IP-PBX Hardware Appliance';
    else if (normalized.includes('zac')) productName = 'Zultys Advanced Communicator (ZAC) Unified Client';
    else if (normalized.includes('mxmobile') || normalized.includes('mobile-zac')) productName = 'Zultys MXmobile Unified Communications Smartphone App';
    else if (normalized.includes('mxconference')) productName = 'Zultys MXconference Multi-Party Video & Web Collaboration';

    return {
      title: `${productName} | DFW Zultys Dealer`,
      description: `Explore the elite features, data sheets, and local pricing for ${productName}. DFW Business Communications is your authorized DFW Zultys provider offering customized integration and on-site training.`,
      keywords: `${productName}, Zultys hardware Dallas, business IP phones DFW, Zultys SIP phones Fort Worth, office phone hardware Texas`
    };
  }

  // 4. Industry Verticals & Solutions
  if (
    normalized.includes('healthcare') ||
    normalized.includes('education') ||
    normalized.includes('professional-services') ||
    normalized.includes('real-estate') ||
    normalized.includes('retail-automotive') ||
    normalized.includes('multi-location') ||
    normalized.includes('enterprise') ||
    normalized.includes('small-business') ||
    normalized.includes('legal-firms') ||
    normalized.includes('financial-services') ||
    normalized.includes('manufacturing-logistics') ||
    normalized.includes('hospitality') ||
    normalized.includes('non-profit') ||
    normalized.includes('solutions')
  ) {
    let sector = 'Businesses';
    if (normalized.includes('healthcare')) sector = 'Healthcare Providers & Medical Clinics';
    else if (normalized.includes('education')) sector = 'Schools & K-12/Higher Education';
    else if (normalized.includes('professional-services')) sector = 'Professional Services & Consulting';
    else if (normalized.includes('real-estate')) sector = 'Real Estate Agencies & Brokerages';
    else if (normalized.includes('retail-automotive')) sector = 'Retailers & Automotive Dealerships';
    else if (normalized.includes('multi-location')) sector = 'Multi-Location Operations';
    else if (normalized.includes('enterprise')) sector = 'Large Enterprise Operations';
    else if (normalized.includes('small-business')) sector = 'Small to Medium Businesses (SMBs)';
    else if (normalized.includes('legal-firms')) sector = 'Law Firms & Legal Practices';
    else if (normalized.includes('financial-services')) sector = 'Financial Services & Investment Firms';
    else if (normalized.includes('manufacturing-logistics')) sector = 'Manufacturing, Warehousing & Logistics';
    else if (normalized.includes('hospitality')) sector = 'Hotels, Lodging & Hospitality';
    else if (normalized.includes('non-profit')) sector = 'Non-Profit Organizations';

    return {
      title: `Zultys VoIP Solutions for ${sector} | DFW Telecom`,
      description: `Incredibly secure, compliant, and features-rich Zultys VoIP phone systems designed specifically for ${sector} in Dallas-Fort Worth. Complete compliance support, CRM integration, and local engineers.`,
      keywords: `Zultys ${sector}, DFW business VoIP, cloud communications, HIPAA compliant phones, multi-location VoIP Texas, commercial phone systems`
    };
  }

  // 5. Utility / Core Pages
  if (normalized === '/about') {
    return {
      title: 'About DFW Business Communications | Certified Zultys Partner',
      description: 'We are Dallas-Fort Worth’s leading authorized Zultys partner. Our certified on-site engineers, system architects, and support personnel design, install, and service business VoIP networks across DFW.',
      keywords: 'Zultys partner Dallas, VoIP provider Fort Worth, DFW Business Communications, certified Zultys technicians Texas'
    };
  }
  if (normalized === '/contact') {
    return {
      title: 'Contact Local DFW Zultys Phone Experts | Support & Custom Quotes',
      description: 'Get in touch with local certified Zultys engineers. Contact us for a free consultation, phone system design, custom VoIP pricing, rapid on-site troubleshooting, or hands-on training in DFW.',
      keywords: 'contact Zultys DFW, business phone support Dallas, VoIP quotes Fort Worth, local telecom help Texas'
    };
  }
  if (normalized === '/pricing') {
    return {
      title: 'Zultys VoIP & Cloud Phone System Pricing | DFW Business Telecom',
      description: 'Explore highly flexible pricing for Zultys Cloud licenses, custom hybrid deployments, and dedicated on-premise IP-PBX servers. Get your free, rapid cost audit today with zero hidden fees.',
      keywords: 'Zultys pricing, business phone system cost, VoIP subscription rates Dallas, cloud PBX price Fort Worth'
    };
  }
  if (normalized === '/free-audit') {
    return {
      title: 'Free VoIP & Telecom Network Readiness Audit | Dallas-Fort Worth',
      description: 'Apply for a free, comprehensive telecom and network audit. Our local certified engineers analyze your bandwidth, call flow, equipment, and current carrier bills to find major cost savings.',
      keywords: 'free VoIP audit, business phone check DFW, network readiness assessment Dallas, telecom audit Fort Worth'
    };
  }
  if (normalized === '/case-studies') {
    return {
      title: 'Zultys Client Case Studies & DFW VoIP Success Stories',
      description: 'Read real success stories of Dallas-Fort Worth businesses, healthcare centers, law offices, and educators that upgraded to Zultys VoIP. See how they improved reliability and cut costs.',
      keywords: 'Zultys success stories, business phone case studies DFW, VoIP implementation, telecom reviews Texas'
    };
  }
  if (normalized === '/voip-glossary') {
    return {
      title: 'Business VoIP, Cloud Phone & IP-PBX Glossary of Terms',
      description: 'Understand unified communications terminology. A complete glossary explaining SIP trunking, IP-PBX, hosted VoIP, latency, QoS, WebRTC, and specialized Zultys platform concepts.',
      keywords: 'VoIP glossary, telecom dictionary, SIP trunking definition, what is IP-PBX, cloud communications terms'
    };
  }
  if (normalized === '/our-team') {
    return {
      title: 'Meet Our Local DFW Certified Zultys Engineers & Tech Team',
      description: 'Say hello to the elite telecommunication professionals at DFW Business Communications. Meet our certified on-site support techs, VoIP architects, and deployment coordinators.',
      keywords: 'telecom engineers Dallas, VoIP technicians Fort Worth, Zultys support team, DFW Business Communications staff'
    };
  }
  if (normalized === '/certifications-awards') {
    return {
      title: 'Top Zultys Certified Partner Credentials & Telecom Awards',
      description: 'Review our advanced technical certifications, dealer honors, and industry awards. We maintain elite engineering credentials to deliver pristine-quality Zultys setups across DFW.',
      keywords: 'Zultys authorized dealer, certified telecom partner, award winning VoIP Dallas, IP-PBX credentials Fort Worth'
    };
  }
  if (normalized === '/user-guides') {
    return {
      title: 'Zultys Quick User Guides, Manuals & App Video Tutorials',
      description: 'Download official Zultys user guides, setup manuals, and video walkthroughs. Access training materials for Zultys ZIP IP phones, ZAC desktop applications, and MXmobile apps.',
      keywords: 'Zultys user guides, ZIP phone manuals, ZAC training video, MXmobile documentation download'
    };
  }
  if (normalized === '/privacy-policy') {
    return {
      title: 'Privacy Policy | DFW Business Communications',
      description: 'Review the privacy guidelines of DFW Business Communications. We are committed to protecting our clients\' data, communications information, and digital privacy.',
      keywords: 'privacy policy, business communications data privacy, security protocols'
    };
  }
  if (normalized === '/terms-of-service') {
    return {
      title: 'Terms of Service | DFW Business Communications',
      description: 'Read the official terms and service conditions of DFW Business Communications for the deployment, installation, and engineering support of Zultys IP systems.',
      keywords: 'terms of service, telecom agreement, service level terms'
    };
  }
  if (normalized.includes('blog')) {
    let postTitle = 'VoIP Insights & Telecom Blog';
    if (normalized.includes('best-choice')) {
      postTitle = 'Why Zultys is the Best VoIP Choice for DFW Businesses';
    } else if (normalized.includes('cloud-vs-on-premise')) {
      postTitle = 'Zultys Cloud vs. On-Premise IP-PBX: DFW Office Guide';
    } else if (normalized.includes('network-optimization')) {
      postTitle = 'How to Optimize Your Local Network for Perfect VoIP Voice Quality';
    }
    return {
      title: `${postTitle} | DFW Zultys Blog`,
      description: `Read our certified telecom expert analysis on: ${postTitle}. Learn practical advice to maximize network performance and reduce business communication costs.`,
      keywords: 'VoIP blog, business telecom tips Dallas, Zultys news, cloud communications guides Fort Worth'
    };
  }
  if (
    normalized.includes('support') ||
    normalized.includes('on-premise') ||
    normalized.includes('hybrid') ||
    normalized.includes('contact-center') ||
    normalized.includes('installation') ||
    normalized.includes('training') ||
    normalized.includes('migration') ||
    normalized.includes('crm') ||
    normalized.includes('remote') ||
    normalized.includes('security')
  ) {
    let topic = 'Business Communications';
    if (normalized.includes('support')) topic = 'Local Certified 24/7 Zultys Support & Maintenance';
    else if (normalized.includes('on-premise')) topic = 'On-Premise Zultys IP-PBX Servers & Hardware Appliances';
    else if (normalized.includes('hybrid')) topic = 'Flexible Hybrid Zultys Phone Systems';
    else if (normalized.includes('contact-center')) topic = 'Enterprise Omnichannel Zultys Contact Center Call Routing';
    else if (normalized.includes('installation')) topic = 'Certified Professional On-Site VoIP Installation & Cabling';
    else if (normalized.includes('training')) topic = 'Custom Hands-on Staff & Administrator Zultys Training';
    else if (normalized.includes('migration')) topic = 'Seamless Legacy System to Zultys Migration Guide';
    else if (normalized.includes('crm')) topic = 'Salesforce, Hubspot & Custom CRM Zultys Telephony Integration';
    else if (normalized.includes('remote')) topic = 'Remote & Hybrid Worker Secure VoIP Communications';
    else if (normalized.includes('security')) topic = 'Zultys VoIP Cybersecurity, Encryption & HIPAA Standards';

    return {
      title: `${topic} | Dallas-Fort Worth`,
      description: `Get professional, certified Zultys ${topic.toLowerCase()} services in DFW. We deliver expert local design, implementation, and immediate local troubleshooting with certified on-site technicians.`,
      keywords: `${topic}, Zultys services Dallas, VoIP support Fort Worth, business communications help Texas, unified communications setup`
    };
  }

  // 6. City Service Pages (Fallback dynamic generator for over 100+ cities!)
  const cityName = getCityNameFromPath(normalized);
  return {
    title: `Zultys Business Phone Systems ${cityName} TX | Cloud VoIP & IP PBX`,
    description: `Expert ${cityName}, TX Zultys business phone systems and cloud VoIP solutions. DFW Business Communications is your authorized local Zultys partner providing expert on-site setup, number porting, and 24/7 technical support.`,
    keywords: `Zultys ${cityName} TX, business phone systems ${cityName} TX, VoIP solutions ${cityName} Texas, office phone systems ${cityName}, ${cityName} Zultys dealer, cloud phone system ${cityName} TX, DFW VoIP`
  };
}

