import React from 'react';
import { Helmet } from 'react-helmet';

const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": "https://lightseattle.com/#business",
    "name": "Seattle Christmas Lights",
    "url": "https://lightseattle.com",
    "description": "Professional Christmas light installation, maintenance, and storage in the Greater Seattle area. Design, install, maintain, remove, and store.",
    "image": "https://lightseattle.com/images/og-image.jpg",
    "telephone": "+14254484998",
    "email": "christmaslightsnw@gmail.com",
    "priceRange": "$$",
    "foundingDate": "2022",
    "founder": {
      "@type": "Person",
      "name": "Dylan Thornsberry",
      "jobTitle": "Owner"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kenmore",
      "addressRegion": "WA",
      "postalCode": "98028",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.756500,
      "longitude": -122.244000
    },
    "sameAs": [
      "https://g.page/r/CU8wR9N1y110EBM"
    ],
    "areaServed": [
      { "@type": "City", "name": "Seattle", "sameAs": "https://en.wikipedia.org/wiki/Seattle" },
      { "@type": "City", "name": "Bellevue", "sameAs": "https://en.wikipedia.org/wiki/Bellevue,_Washington" },
      { "@type": "City", "name": "Kirkland", "sameAs": "https://en.wikipedia.org/wiki/Kirkland,_Washington" },
      { "@type": "City", "name": "Bothell", "sameAs": "https://en.wikipedia.org/wiki/Bothell,_Washington" },
      { "@type": "City", "name": "Kenmore", "sameAs": "https://en.wikipedia.org/wiki/Kenmore,_Washington" },
      { "@type": "City", "name": "Woodinville", "sameAs": "https://en.wikipedia.org/wiki/Woodinville,_Washington" },
      { "@type": "City", "name": "Lake Forest Park", "sameAs": "https://en.wikipedia.org/wiki/Lake_Forest_Park,_Washington" },
      { "@type": "City", "name": "Everett", "sameAs": "https://en.wikipedia.org/wiki/Everett,_Washington" },
      { "@type": "City", "name": "Lynnwood", "sameAs": "https://en.wikipedia.org/wiki/Lynnwood,_Washington" },
      { "@type": "City", "name": "Shoreline", "sameAs": "https://en.wikipedia.org/wiki/Shoreline,_Washington" },
      { "@type": "City", "name": "Redmond", "sameAs": "https://en.wikipedia.org/wiki/Redmond,_Washington" },
      { "@type": "City", "name": "Sammamish", "sameAs": "https://en.wikipedia.org/wiki/Sammamish,_Washington" },
      { "@type": "City", "name": "Edmonds", "sameAs": "https://en.wikipedia.org/wiki/Edmonds,_Washington" },
      { "@type": "City", "name": "Mercer Island", "sameAs": "https://en.wikipedia.org/wiki/Mercer_Island,_Washington" },
      { "@type": "City", "name": "Clyde Hill", "sameAs": "https://en.wikipedia.org/wiki/Clyde_Hill,_Washington" },
      { "@type": "City", "name": "Hunts Point", "sameAs": "https://en.wikipedia.org/wiki/Hunts_Point,_Washington" },
      { "@type": "AdministrativeArea", "name": "King County", "sameAs": "https://en.wikipedia.org/wiki/King_County,_Washington" },
      { "@type": "AdministrativeArea", "name": "Snohomish County", "sameAs": "https://en.wikipedia.org/wiki/Snohomish_County,_Washington" }
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
      "bestRating": "5",
      "worstRating": "1"
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
            "minPrice": "800",
            "maxPrice": "3500",
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
