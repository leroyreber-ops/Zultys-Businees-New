import { useEffect } from 'react';
import { applySEO, SEOProps } from '../utils/seoHelpers';

export interface UseSEOProps extends Omit<SEOProps, 'keywords' | 'canonicalUrl'> {
  keywords?: string;
  canonicalUrl?: string;
}

/**
 * A custom React hook to dynamically update page meta title, description, keywords,
 * canonical URL, OpenGraph tags, Twitter Card tags, and Schema.org JSON-LD scripts.
 * 
 * @param props SEO configuration properties for the current route
 */
export function useSEO(props: UseSEOProps) {
  const currentPath = window.location.pathname;
  
  // Provide smart, dynamic defaults if not specified
  const canonicalUrl = props.canonicalUrl || `https://dallasfortworthzultys.com${currentPath}`;
  const keywords = props.keywords || 'Zultys business phone systems, DFW VoIP, Dallas business phones, Fort Worth telecommunications';

  const fullProps: SEOProps = {
    ...props,
    keywords,
    canonicalUrl,
  };

  useEffect(() => {
    // Apply meta tags and schemas to the head
    applySEO(fullProps);

    // Clean up dynamic schemas injected by this hook run when the route changes or component unmounts
    return () => {
      document.querySelectorAll('script[type="application/ld+json"][data-page-schema="true"]').forEach(el => el.remove());
    };
  }, [
    props.title,
    props.description,
    keywords,
    canonicalUrl,
    props.ogTitle,
    props.ogDescription,
    props.ogImage,
    props.twitterTitle,
    props.twitterDescription,
    props.schemaType,
    JSON.stringify(props.productSchema),
    JSON.stringify(props.serviceSchema),
    JSON.stringify(props.faqSchema),
    JSON.stringify(props.howToSchema),
    JSON.stringify(props.additionalSchema),
  ]);
}
