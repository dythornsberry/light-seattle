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
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "07:00",
            "closes": "19:00"
        }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Christmas Light Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Christmas Light Installation",
            "description": "Professional design and installation of custom Christmas light displays for residential properties."
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "800-3500",
            "priceCurrency": "USD"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Permanent Lighting Installation",
            "description": "Year-round permanent LED lighting systems with programmable color scenes for any occasion."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Seasonal Maintenance",
            "description": "48-hour service response guarantee for any display issues throughout the holiday season."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Takedown and Storage",
            "description": "Post-season removal and climate-controlled off-season storage of all lighting materials."
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default LocalBusinessSchema;