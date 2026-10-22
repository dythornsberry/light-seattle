import React from 'react';
import { Helmet } from 'react-helmet';
import { Hero, Section, Included, PhotoGrid, Steps, Faq, QuoteSection, Reviews, InstallDetails, AreasList } from '@/components/Blocks';
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
      <meta name="description" content="We hang professional Christmas lights on homes across Seattle and the Eastside, then take them down and store them when the season's over. Installs start at $800." />
      <link rel="canonical" href={`${SITE_URL}/`} />
      <meta property="og:title" content="We hang professional Christmas lights" />
      <meta property="og:description" content="The best looking house on the street this Christmas." />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    <Hero
      title="We hang professional Christmas lights"
      sub="The best looking house on the street this Christmas."
    />

    <Section title="What's included" intro="One flat price for the season.">
      <Included />
    </Section>

    <Section id="photos" title="Recent installs" intro="Real homes we lit up around Seattle and the Eastside." alt>
      <PhotoGrid />
    </Section>

    <Section title="What clients say">
      <Reviews />
    </Section>

    <Section title="How it works" alt>
      <Steps />
      <h3 className="mt-12 mb-4 text-lg font-semibold text-foreground">How we hang them</h3>
      <InstallDetails />
    </Section>

    <QuoteSection />

    <Section id="faq" title="Common questions" alt>
      <Faq />
    </Section>

    <Section title="Serving Seattle and the Eastside since 2022">
      <p className="text-foreground/80 max-w-2xl mb-6">
        Seattle Christmas Lights hangs professional Christmas lights on homes across Seattle and the Eastside. Call or text 7am to 7pm, every day.
      </p>
      <AreasList />
    </Section>
  </>
);

export default HomePage;
