import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Seattle Christmas Lights</title>
        <meta name="description" content="Privacy policy for Seattle Christmas Lights. How we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://lightseattle.com/privacy" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lightseattle.com/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://lightseattle.com/privacy" }
          ]
        })}</script>
      </Helmet>

      <div className="bg-background-alt border-b">
        <div className="container-content text-center py-12">
          <h1 className="h1 text-foreground mb-4">Privacy Policy</h1>
          <p className="p-body text-muted-foreground">Last updated: April 1, 2026</p>
        </div>
      </div>

      <div className="section-padding bg-background">
        <div className="container-content max-w-3xl mx-auto prose prose-invert">
          <h2 className="h2 text-foreground mb-4">Who We Are</h2>
          <p className="p-body text-muted-foreground mb-8">
            Seattle Christmas Lights is a holiday and permanent lighting installation business based in Kenmore, WA, serving the Greater Seattle area. This website is operated at lightseattle.com.
          </p>

          <h2 className="h2 text-foreground mb-4">Information We Collect</h2>
          <p className="p-body text-muted-foreground mb-4">
            When you fill out our contact form, we collect the following information:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
            <li className="p-body">Full name</li>
            <li className="p-body">Phone number</li>
            <li className="p-body">Email address</li>
            <li className="p-body">Street address and ZIP code</li>
            <li className="p-body">Preferred timeline for service</li>
          </ul>

          <h2 className="h2 text-foreground mb-4">How We Use Your Information</h2>
          <p className="p-body text-muted-foreground mb-4">
            We use the information you provide solely for the purpose of:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
            <li className="p-body">Contacting you to discuss your lighting project</li>
            <li className="p-body">Preparing a custom quote based on your property</li>
            <li className="p-body">Scheduling installation and service visits</li>
            <li className="p-body">Sending follow-up communications about your project</li>
          </ul>

          <h2 className="h2 text-foreground mb-4">Third-Party Services</h2>
          <p className="p-body text-muted-foreground mb-8">
            Form submissions are processed through Zapier for workflow automation and may be stored in our CRM system. We use Google Maps API for address autocomplete on the contact form. We do not sell, rent, or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="h2 text-foreground mb-4">Data Retention</h2>
          <p className="p-body text-muted-foreground mb-8">
            We retain your contact information for as long as necessary to provide our services and maintain our business relationship. You may request deletion of your data at any time by contacting us.
          </p>

          <h2 className="h2 text-foreground mb-4">Cookies and Analytics</h2>
          <p className="p-body text-muted-foreground mb-8">
            This site may use cookies for basic functionality and analytics purposes. We use standard web analytics to understand how visitors use our site and improve our services.
          </p>

          <h2 className="h2 text-foreground mb-4">Contact Us</h2>
          <p className="p-body text-muted-foreground mb-4">
            If you have questions about this privacy policy or wish to request deletion of your data, contact us:
          </p>
          <ul className="list-none mb-8 space-y-2 text-muted-foreground">
            <li className="p-body">Phone: <a href="tel:4254484998" className="text-primary hover:underline">(425) 448-4998</a></li>
            <li className="p-body">Email: <a href="mailto:christmaslightsnw@gmail.com" className="text-primary hover:underline">christmaslightsnw@gmail.com</a></li>
          </ul>

          <p className="p-body text-muted-foreground">
            <Link to="/contact" className="text-primary hover:underline">Back to Contact</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
