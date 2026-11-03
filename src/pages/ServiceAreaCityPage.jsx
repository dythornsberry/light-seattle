import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Hero, Section, Included, PhotoGrid, QuoteSection, Reviews } from '@/components/Blocks';
import { cities, photos, reviews, serviceSchema, SITE_URL } from '@/data/site';

const ServiceAreaCityPage = ({ city }) => {
  const index = Math.max(0, cities.findIndex((c) => c.name === city));
  const current = cities[index];
  const others = cities.filter((c) => c.path !== current.path);
  const start = (index * 4) % photos.length;
  const cityPhotos = [0, 1, 2].map((i) => photos[(start + i) % photos.length]);
  // A different three reviews on each city page
  const cityReviews = current.reviewPicks.map((i) => reviews[i]);
  const url = `${SITE_URL}/service-areas/${current.path}`;
  const description = `Christmas light hanging service in ${city}, WA. We install commercial grade holiday lights, fix anything that goes out and handle takedown. Installs from $800.`;
  const cityServiceSchema = serviceSchema({ name: `Christmas light installation in ${city}, WA`, url, areaServed: [city] });
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: `Christmas lights in ${city}`, item: url },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: current.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Helmet>
        <title>{`Christmas Light Installation in ${city}, WA`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`Christmas Light Installation in ${city}, WA`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(cityServiceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Hero
        title={`We hang professional Christmas lights in ${city}`}
        sub={current.sub}
      />

      <Section title={`Christmas lights in ${city}`}>
        <p className="text-foreground/80 max-w-2xl">{current.intro}</p>
        <p className="mt-4 text-foreground/80 max-w-2xl">{current.local}</p>
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
        <Reviews items={cityReviews} />
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
