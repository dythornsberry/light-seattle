import React from 'react';
import { Helmet } from 'react-helmet';

const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Seattle Christmas Lights",
    "url": "https://lightseattle.com",
    "description": "Professional Christmas light installation, maintenance, and storage in the Greater Seattle area. Design, install, maintain, remove, and store.",
    "image": "https://images.unsplash.com/photo-1541127066115-5500b56287ac",
    "telephone": "(425) 448-4998",
    "email": "christmaslightsnw@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kenmore",
      "addressRegion": "WA",
      "postalCode": "98028",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.7565,
      "longitude": -122.2440
    },
    "areaServed": [
      { "@type": "City", "name": "Seattle" },
      { "@type": "City", "name": "Bellevue" },
      { "@type": "City", "name": "Kirkland" },
      { "@type": "City", "name": "Bothell" },
      { "@type": "City", "name": "Kenmore" },
      { "@type": "City", "name": "Woodinville" },
      { "@type": "City", "name": "Lake Forest Park" },
      { "@type": "City", "name": "Everett" },
      { "@type": "City", "name": "Lynnwood" },
      { "@type": "City", "name": "Shoreline" },
      { "@type": "County", "name": "King County" },
      { "@type": "County", "name": "Snohomish County" }
    ],
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default LocalBusinessSchema;