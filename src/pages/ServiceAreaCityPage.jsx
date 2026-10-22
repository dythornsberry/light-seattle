import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Hero, Section, Included, PhotoGrid, QuoteSection, Reviews } from '@/components/Blocks';
import { businessSchema, cities, photos, SITE_URL } from '@/data/site';

const ServiceAreaCityPage = ({ city }) => {
  const index = Math.max(0, cities.findIndex((c) => c.name === city));
  const current = cities[index];
  const others = cities.filter((c) => c.path !== current.path);
  const start = (index * 4) % photos.length;
  const cityPhotos = [0, 1, 2].map((i) => photos[(start + i) % photos.length]);
  const url = `${SITE_URL}/service-areas/${current.path}`;
  const description = `Christmas light installation in ${city}, WA. We hang professional Christmas lights, then take them down and store them when the season's over. Installs start at $800.`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: current.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

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
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero
        title={`We hang professional Christmas lights in ${city}`}
        sub="The best looking house on the street this Christmas."
      />

      <Section title={`Christmas lights in ${city}`}>
        <p className="text-foreground/80 max-w-2xl">{current.intro}</p>
        <h3 className="mt-8 mb-3 font-semibold text-foreground">Neighborhoods we cover</h3>
        <p className="text-foreground/75 max-w-2xl">{current.areas.join(', ')} and the rest of {city}.</p>
      </Section>

      <Section title="What's included" intro="One flat price for the season." alt>
        <Included />
      </Section>

      <Section title="Recent installs">
        <PhotoGrid items={cityPhotos} />
        <p className="mt-6">
          <Link to="/#photos" className="text-primary hover:underline">See more photos</Link>
        </p>
      </Section>

      <Section title="What clients say" alt>
        <Reviews />
      </Section>

      <QuoteSection title={`Get a free quote in ${city}`} />

      <Section title={`${city} questions`} alt>
        <div className="divide-y divide-border rounded-lg border border-border max-w-3xl">
          {current.faqs.map((f) => (
            <div key={f.q} className="p-5">
              <h3 className="font-medium text-foreground">{f.q}</h3>
              <p className="mt-2 text-foreground/75">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6">
          <Link to="/#faq" className="text-primary hover:underline">More common questions</Link>
        </p>
      </Section>

      <Section title="We also hang lights in">
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.path}>
              <Link to={`/service-areas/${c.path}`} className="inline-block rounded-full border border-border px-4 py-1.5 text-sm text-foreground/85 hover:border-primary hover:text-foreground">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};

export default ServiceAreaCityPage;
