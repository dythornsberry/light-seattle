import React from 'react';
import { Helmet } from 'react-helmet';
import { Hero, Section, Included, PhotoGrid, Steps, Faq, QuoteSection } from '@/components/Blocks';
import { businessSchema, faqs, SITE_URL } from '@/data/site';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const HomePage = () => (
  <>
    <Helmet>
      <title>Christmas Light Installation in Seattle | Seattle Christmas Lights</title>
      <meta name="description" content="Christmas and holiday light installation for Seattle area homes and businesses. Install, free fixes all season, takedown in January and storage included. Free quotes." />
      <link rel="canonical" href={`${SITE_URL}/`} />
      <meta property="og:title" content="Christmas Light Installation in Seattle" />
      <meta property="og:description" content="Lights, install, free fixes all season, takedown and storage included." />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    <Hero
      title="Christmas light installation in Seattle"
      sub="We bring the lights, hang them, keep them working all season, then take them down in January and store them for next year."
    />

    <Section title="What's included" intro="One flat price covers everything below.">
      <Included />
    </Section>

    <Section id="photos" title="Recent installs" intro="Real homes we lit up around Seattle and the Eastside." alt>
      <PhotoGrid />
    </Section>

    <Section title="How it works">
      <Steps />
    </Section>

    <QuoteSection />

    <Section id="faq" title="Common questions">
      <Faq />
    </Section>
  </>
);

export default HomePage;
