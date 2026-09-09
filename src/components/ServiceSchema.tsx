import React, { useEffect, useState } from 'react';

interface ServiceSchemaProps {
  path?: string;
}

// Slug to human-readable City Name mapper (aligns with LocalBusinessSchema)
function getCityNameFromPath(path: string): string {
  const normalized = path.replace(/^\//, '').toLowerCase();
  
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

  // Common DFW major cities coordinates lookup mapping helper
  const majorCities = [
    'dallas', 'fort-worth', 'arlington', 'plano', 'garland', 'irving', 'grand-prairie',
    'mckinney', 'frisco', 'carrollton', 'denton', 'richardson', 'lewisville', 'allen',
    'mansfield', 'rowlett', 'euless', 'southlake', 'grapevine', 'bedford', 'keller',
    'hurst', 'coppell', 'waxahachie', 'cleburne', 'weatherford', 'burleson', 'terrell',
    'prosper', 'the-colony', 'little-elm', 'wylie', 'rockwall', 'forney', 'midlothian',
    'ennis', 'mesquite'
  ];

  for (const city of majorCities) {
    if (normalized.includes(city)) {
      return city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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

  if (cleanPath.length > 2) {
    return cleanPath.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  return 'Dallas-Fort Worth';
}

export function ServiceSchema({ path }: ServiceSchemaProps) {
  const currentPathname = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  
  // Normalize path
  const normalized = currentPathname.toLowerCase().endsWith('/') && currentPathname.length > 1
    ? currentPathname.toLowerCase().slice(0, -1)
    : currentPathname.toLowerCase();

  const canonicalUrl = `https://dallasfortworthzultys.com${normalized === '/' ? '' : normalized}`;
  const cityName = getCityNameFromPath(currentPathname);

  // Dynamic state to store scanning flags
  const [services, setServices] = useState({
    voip: true,
    cloud: true,
    install: true
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scan pathname and document content (title and body) for targeted services
    const pathLower = currentPathname.toLowerCase();
    const titleLower = document.title.toLowerCase();
    const bodyTextLower = document.body ? document.body.innerText.toLowerCase() : '';

    // Check for "VoIP Phone System" cues
    const matchesVoip = 
      pathLower.includes('phone') || 
      pathLower.includes('voip') || 
      pathLower.includes('hardware') || 
      pathLower.includes('pbx') || 
      pathLower.includes('zip') ||
      titleLower.includes('phone') || 
      titleLower.includes('voip') || 
      titleLower.includes('pbx') ||
      bodyTextLower.includes('voip phone system') ||
      bodyTextLower.includes('ip-pbx') ||
      bodyTextLower.includes('sip phone');

    // Check for "Cloud Phone Services" cues
    const matchesCloud = 
      pathLower.includes('cloud') || 
      pathLower.includes('hosted') || 
      pathLower.includes('virtual') || 
      pathLower.includes('zac') || 
      pathLower.includes('mobile') ||
      titleLower.includes('cloud') || 
      titleLower.includes('hosted') || 
      titleLower.includes('virtual') ||
      bodyTextLower.includes('cloud phone services') ||
      bodyTextLower.includes('mxvirtual') ||
      bodyTextLower.includes('ucaas');

    // Check for "Installation" cues
    const matchesInstall = 
      pathLower.includes('install') || 
      pathLower.includes('cable') || 
      pathLower.includes('cabling') || 
      pathLower.includes('support') || 
      pathLower.includes('setup') || 
      pathLower.includes('audit') ||
      pathLower.includes('about') ||
      pathLower.includes('contact') ||
      titleLower.includes('install') || 
      titleLower.includes('cabling') || 
      titleLower.includes('support') ||
      bodyTextLower.includes('installation') ||
      bodyTextLower.includes('structured cabling') ||
      bodyTextLower.includes('maintenance');

    // On specific deep links, let's refine focus. If we are on home or general landing pages, we show all.
    const isHome = pathLower === '/' || pathLower === '/index.html' || pathLower === '';

    if (isHome) {
      setServices({ voip: true, cloud: true, install: true });
    } else {
      // If we found specific matches, adjust priority. Otherwise default to highlighting all.
      setServices({
        voip: matchesVoip || (!matchesCloud && !matchesInstall),
        cloud: matchesCloud || (!matchesVoip && !matchesInstall),
        install: matchesInstall || (!matchesVoip && !matchesCloud)
      });
    }

  }, [currentPathname]);

  // Provider template for consistency
  const providerDetails = {
    '@type': 'LocalBusiness',
    'name': 'DFW Business Communications',
    'url': 'https://dallasfortworthzultys.com',
    'telephone': '817-231-2962',
    'priceRange': '$$',
    'image': 'https://dallasfortworthzultys.com/zultys-logo.png',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Fort Worth',
      'addressRegion': 'TX',
      'addressCountry': 'US'
    }
  };

  // Brand template
  const brandDetails = {
    '@type': 'Brand',
    'name': 'Zultys',
    'logo': 'https://dallasfortworthzultys.com/zultys-logo.png'
  };

  // Generate individual schemas
  const schemasToRender: any[] = [];

  // 1. VoIP Phone System Service Schema
  if (services.voip) {
    schemasToRender.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service-voip-system`,
      'name': `Zultys VoIP Phone System Installation & Sales in ${cityName}`,
      'description': `Custom-engineered Zultys VoIP phone systems, including ZIP-series HD SIP phones, SIP trunking, smart call routing, and hybrid/on-premise IP-PBX hardware integration for businesses in ${cityName === 'Dallas-Fort Worth' ? 'the DFW Metroplex' : cityName}, TX.`,
      'serviceType': 'TelecommunicationsService',
      'provider': providerDetails,
      'areaServed': {
        '@type': 'Place',
        'name': cityName === 'Dallas-Fort Worth' ? 'Dallas-Fort Worth Metroplex' : `${cityName}, TX`
      },
      'brand': brandDetails
    });
  }

  // 2. Cloud Phone Services Schema
  if (services.cloud) {
    schemasToRender.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service-cloud-phone`,
      'name': `Hosted Zultys Cloud Phone Services in ${cityName}`,
      'description': `Enterprise hosted cloud phone services and UCaaS powered by Zultys MXvirtual and ZAC. Features business-class softphones, mobile ZAC integration, instant messaging, HD video conferencing, and seamless multi-branch linking for offices in ${cityName === 'Dallas-Fort Worth' ? 'the DFW Metroplex' : cityName}, TX.`,
      'serviceType': 'CloudTelecommunicationsService',
      'provider': providerDetails,
      'areaServed': {
        '@type': 'Place',
        'name': cityName === 'Dallas-Fort Worth' ? 'Dallas-Fort Worth Metroplex' : `${cityName}, TX`
      },
      'brand': brandDetails
    });
  }

  // 3. Managed Installation, Structured Cabling, & Support Schema
  if (services.install) {
    schemasToRender.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service-installation`,
      'name': `Zultys VoIP Installation, Cabling & Support in ${cityName}`,
      'description': `Professional telecommunications installation, Cat6 structured voice/data cabling, network quality optimization, comprehensive employee training, and 24/7/365 local Tier-3 engineering support for companies in ${cityName === 'Dallas-Fort Worth' ? 'the DFW Metroplex' : cityName}, TX.`,
      'serviceType': 'InstallationService',
      'provider': providerDetails,
      'areaServed': {
        '@type': 'Place',
        'name': cityName === 'Dallas-Fort Worth' ? 'Dallas-Fort Worth Metroplex' : `${cityName}, TX`
      },
      'brand': brandDetails
    });
  }

  // Cleanup side-effect to prevent duplicate service tags in the header
  useEffect(() => {
    const scriptTags = document.querySelectorAll('head > script[data-centralized-service="true"]');
    scriptTags.forEach(tag => tag.remove());
  }, [currentPathname, services]);

  return (
    <>
      {schemasToRender.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          data-centralized-service="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
