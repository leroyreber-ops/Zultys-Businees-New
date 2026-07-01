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
