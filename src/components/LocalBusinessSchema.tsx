import React from 'react';

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dallas Fort Worth Zultys",
    "image": "https://dallasfortworthzultys.com/zultys-logo.png",
    "@id": "https://dallasfortworthzultys.com",
    "url": "https://dallasfortworthzultys.com",
    "telephone": "817-231-2962",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving Dallas-Fort Worth Metroplex",
      "addressLocality": "Fort Worth",
      "addressRegion": "TX",
      "postalCode": "76102",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.7555,
      "longitude": -97.3308
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/zultys",
      "https://www.linkedin.com/company/zultys-inc-"
    ],
    "priceRange": "$$"
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}
