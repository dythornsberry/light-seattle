import React from 'react';

const PageHeader = ({ title, subtitle, className = 'bg-background-alt' }) => {
  return (
    <div
      className={`section-padding ${className} border-b`}
    >
      <div className="container-content text-center">
        <h1 
          className="h1 mb-4"
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            className="p-body text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;