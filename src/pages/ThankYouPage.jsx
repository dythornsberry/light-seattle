import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from '@/data/site';

const ThankYouPage = () => (
  <>
    <Helmet>
      <title>Thanks | Seattle Christmas Lights</title>
      <meta name="robots" content="noindex" />
      <link rel="canonical" href={`${SITE_URL}/thank-you`} />
    </Helmet>
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Got it, thanks!</h1>
      <p className="text-foreground/80 text-lg mb-8">
        We'll reach out soon with your quote. Need us sooner? Call{' '}
        <a href={`tel:${PHONE_TEL}`} className="text-primary font-semibold hover:underline">{PHONE_DISPLAY}</a>.
      </p>
      <Link to="/" className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110">
        Back to home
      </Link>
      <p className="mt-16 text-sm text-foreground/60">
        Already a client?{' '}
        <a href="https://g.page/r/CU8wR9N1y110EBM/review" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Leave us a Google review
        </a>
      </p>
    </div>
  </>
);

export default ThankYouPage;
