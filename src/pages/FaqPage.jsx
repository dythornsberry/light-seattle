import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import useScrollToTop from '@/hooks/useScrollToTop';

const faqCategories = [
  {
    title: "Booking & Timing",
    items: [
      {
        q: "How far in advance should I book?",
        a: "We recommend booking by mid-October to secure your preferred installation date. Our schedule fills quickly as we approach the holiday season, and early booking ensures we have adequate time for your custom design consultation and installation."
      },
      {
        q: "When do you install and remove lights?",
        a: "Installations typically begin in mid-November and continue through early December. Removal occurs in early January after the holiday season. We'll coordinate specific dates during your consultation based on your preferences and our schedule."
      }
    ]
  },
  {
    title: "Custom Design & Safety",
    items: [
      {
        q: "Do you offer custom designs for every home?",
        a: "Absolutely. Every home receives a free design consultation where we assess your architecture, landscape, and preferences. We custom-measure and cut all lighting to fit your specific features, no pre-packaged solutions. Your design is created specifically for your property."
      },
      {
        q: "Are your products and installation methods safe for my home?",
        a: "Yes. We use commercial-grade LED lighting and professional installation techniques that protect your home's exterior. Our team is fully insured, and we never use staples, nails, or methods that damage gutters, shingles, or siding. All electrical connections are weatherproofed and tested for safety."
      }
    ]
  },
  {
    title: "Service & Maintenance",
    items: [
       {
        q: "What’s included in your service?",
        a: "Everything from start to finish: free design consultation, commercial-grade materials, professional installation, smart timer programming, climate-controlled off-season storage, post-holiday removal, and our 48-hour service response guarantee. You also receive 20% off your next season when you store with us."
      },
      {
        q: "What happens if a light goes out?",
        a: "Contact us and we'll have a technician at your property within 48 hours to resolve any issues. Our service guarantee covers the entire holiday season; if something needs attention, we handle it promptly at no additional charge."
      }
    ]
  },
  {
    title: "Pricing",
    items: [
       {
        q: "How is pricing determined?",
        a: "Your investment reflects your home's unique characteristics: roofline complexity, property size, desired coverage, and special features like trees or architectural elements. Most homes fall between $1,500-$3,500 for our Signature Display package. We provide transparent, detailed quotes after your free consultation. No pressure, no surprises."
      }
    ]
  }
];

const FaqPage = () => {
  useScrollToTop();
  
  return (
    <>
      <Helmet>
        <title>FAQ | Seattle Christmas Lights</title>
        <meta name="description" content="Everything you need to know about our premium holiday lighting service, from our service model to installation, maintenance, and investment." />
      </Helmet>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our premium holiday lighting service"
      />
      <div className="section-padding bg-background">
        <div className="container-content space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="h2 text-foreground mb-8 text-center">{category.title}</h2>
              <Accordion.Root type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                {category.items.map((item, itemIndex) => (
                  <Accordion.Item key={itemIndex} value={`item-${catIndex}-${itemIndex}`} className="border rounded-lg bg-background-alt shadow-sm">
                    <Accordion.Header>
                      <Accordion.Trigger className="flex justify-between items-center w-full p-5 text-left font-semibold text-lg text-foreground group">
                        <span>{item.q}</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-180 text-muted-foreground flex-shrink-0" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                      <div className="px-5 pb-5 p-body text-muted-foreground">
                        {item.a}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          ))}
        </div>
      </div>
      <section className="section-padding bg-background-alt border-t">
        <div className="container-content text-center">
          <h2 className="h2 text-foreground mb-4">Ready to get started?</h2>
          <p className="p-body text-muted-foreground mb-8">Let's discuss your custom design, by phone or in-person.</p>
          <Button as={Link} to="/contact" size="lg" className="btn-primary text-lg">
            Get Your Custom Design
          </Button>
        </div>
      </section>
    </>
  );
};

export default FaqPage;