import React, { useEffect, useState } from 'react';

interface WebSiteSchemaProps {
  path?: string;
  siteName?: string;
}

export function WebSiteSchema({ 
  path, 
  siteName = 'Dallas Fort Worth Zultys' 
}: WebSiteSchemaProps) {
  const [siteUrl, setSiteUrl] = useState('https://dallasfortworthzultys.com');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically reflect the current environment's origin URL (e.g. preview or production)
      const currentOrigin = window.location.origin;
      if (currentOrigin && currentOrigin.startsWith('http')) {
        setSiteUrl(currentOrigin);
      }
    }
  }, []);

  const currentPathname = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  
  // Normalize pathname to prevent trailing slashes
  const normalizedPath = currentPathname.toLowerCase().endsWith('/') && currentPathname.length > 1
    ? currentPathname.toLowerCase().slice(0, -1)
    : currentPathname.toLowerCase();

  const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '' : normalizedPath}`;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    'url': siteUrl,
    'name': siteName,
    'alternateName': [
      'DFW Business Communications',
      'Zultys DFW Phone Systems',
      'Zultys DFW',
      'Zultys Dallas Fort Worth'
    ],
    'description': 'Zultys VoIP Phone Systems, Cloud Communications, and Hosted Unified Communications (UCaaS) solutions in the Dallas-Fort Worth (DFW) Metroplex.',
    'publisher': {
      '@type': 'LocalBusiness',
      'name': 'DFW Business Communications',
      'telephone': '817-231-2962',
      'priceRange': '$$',
      'image': `${siteUrl}/zultys-logo.png`,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Fort Worth',
        'addressRegion': 'TX',
        'addressCountry': 'US'
      }
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${siteUrl}/faq?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    'inLanguage': 'en-US'
  };

  // Remove existing central WebSite schema scripts to prevent duplicates on navigation/re-renders
  useEffect(() => {
    const scriptTags = document.querySelectorAll('head > script[data-centralized-website="true"]');
    scriptTags.forEach(tag => tag.remove());
  }, [siteUrl, siteName, currentPathname]);

  return (
    <script
      type="application/ld+json"
      data-centralized-website="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}
