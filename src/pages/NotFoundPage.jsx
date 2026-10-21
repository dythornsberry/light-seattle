import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <>
    <Helmet>
      <title>Page not found | Seattle Christmas Lights</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-foreground mb-4">That page doesn't exist</h1>
      <Link to="/" className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110">
        Go to the home page
      </Link>
    </div>
  </>
);

export default NotFoundPage;
