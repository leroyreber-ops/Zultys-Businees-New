/**
 * LocalBusiness Schema Utility
 * Provides precise geographic coordinates and JSON-LD schema markup
 * for Dallas and Fort Worth offices to maximize local search signals.
 */

export interface SchemaCoordinates {
  lat: number;
  lng: number;
  zip: string;
  street: string;
}

export const DFW_COORDINATES: Record<'Dallas' | 'Fort Worth', SchemaCoordinates> = {
  Dallas: {
    lat: 32.7767,
    lng: -96.7970,
    zip: '75201',
    street: 'Serving Dallas Metroplex, Downtown Dallas'
  },
  'Fort Worth': {
    lat: 32.7555,
    lng: -97.3308,
    zip: '76102',
    street: 'Serving Fort Worth, Tarrant County Office'
  }
};

export function getLocalBusinessSchema(city: 'Dallas' | 'Fort Worth') {
  const coords = DFW_COORDINATES[city];

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://dallasfortworthzultys.com/#localbusiness-${city.toLowerCase().replace(' ', '-')}`,
    name: `DFW Business Communications - ${city} Office`,
    alternateName: `Zultys Business Phone Systems in ${city}`,
    description: `Authorized Zultys dealer and partner in ${city}, Texas. Providing expert business VoIP, cloud unified communications, on-site installation, and 24/7 local engineering support.`,
    url: city === 'Dallas' 
      ? 'https://dallasfortworthzultys.com/dallas-zultys-phones' 
      : 'https://dallasfortworthzultys.com/fort-worth-zultys-systems',
    telephone: '817-231-2962',
    email: 'info@dallasfortworthzultys.com',
    priceRange: '$$',
    image: 'https://dallasfortworthzultys.com/zultys-logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: coords.street,
      addressLocality: city,
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00'
    },
    areaServed: [
      {
        '@type': 'Place',
        name: `${city}, TX`
      },
      {
        '@type': 'Place',
        name: 'Dallas-Fort Worth Metroplex'
      }
    ]
  };
}
