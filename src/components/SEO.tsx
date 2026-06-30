import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: object;
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = 'website', 
  ogImage = 'https://dallasfortworthzultys.com/og-image.jpg',
  schema 
}: SEOProps) {
  const siteName = 'Dallas Fort Worth Zultys';
  const fullTitle = `${title} | ${siteName}`;
  
  // Dynamically build canonical URL pointing to the production domain with the current path
  const currentPath = window.location.pathname;
  const url = canonical 
    ? (canonical.startsWith('http') ? canonical : `https://dallasfortworthzultys.com${canonical}`)
    : `https://dallasfortworthzultys.com${currentPath}`;

  return (
    <>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
}
