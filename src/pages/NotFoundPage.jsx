import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Seattle Christmas Lights</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHeader
        title="404 - Page Not Found"
        subtitle="Oops! It looks like the page you're searching for doesn't exist."
      />
      <div className="pb-16">
        <div className="container-content text-center">
            <AlertTriangle className="w-16 h-16 text-secondary mx-auto mb-6" />
            <Button as="a" to="/" className="btn-primary">
                Return to Homepage
            </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;