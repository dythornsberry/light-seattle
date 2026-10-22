import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Hero, Section, Included, PhotoGrid, QuoteSection } from '@/components/Blocks';
import { businessSchema, cities, photos, SITE_URL } from '@/data/site';

const ServiceAreaCityPage = ({ city }) => {
  const index = Math.max(0, cities.findIndex((c) => c.name === city));
  const current = cities[index];
  const nearby = current.nearby.map((p) => cities.find((c) => c.path === p)).filter(Boolean);
  const start = (index * 3) % photos.length;
  const cityPhotos = [0, 1, 2].map((i) => photos[(start + i) % photos.length]);
  const url = `${SITE_URL}/service-areas/${current.path}`;
  const description = `Holiday and Christmas light installation in ${city}, WA. Install, free fixes all season, takedown and storage included. Free quotes.`;

  return (
    <>
      <Helmet>
        <title>{`Christmas Light Installation in ${city}, WA | Seattle Christmas Lights`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`Christmas Light Installation in ${city}, WA`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      </Helmet>

      <Hero
        title={`Christmas light installation in ${city}`}
        sub={`We hang Christmas lights for homes and businesses in ${city} and nearby. Takedown and storage are included.`}
      />

      <Section title="What's included" intro="One flat price covers everything below.">
        <Included />
      </Section>

      <Section title="Recent installs" alt>
        <PhotoGrid items={cityPhotos} />
        <p className="mt-6">
          <Link to="/#photos" className="text-primary hover:underline">See more photos</Link>
        </p>
      </Section>

      <QuoteSection title={`Get a free quote in ${city}`} />

      {nearby.length > 0 && (
        <Section title="Nearby areas">
          <ul className="flex flex-wrap gap-2">
            {nearby.map((c) => (
              <li key={c.path}>
                <Link to={`/service-areas/${c.path}`} className="inline-block rounded-full border border-border px-4 py-1.5 text-sm text-foreground/85 hover:border-primary hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};

export default ServiceAreaCityPage;
