import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Star, ShieldCheck, Award, MessageSquare, CheckCircle, Palette, Zap, Wrench, ChevronDown, X, Layers, Smartphone, Sun, Droplets, Package, PenTool, Search } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import GoogleReviewsWidget from '@/components/GoogleReviewsWidget';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import TrustBadges from '@/components/TrustBadges';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLightbox } from '@/context/LightboxContext.jsx';

const Hero = () => {
  const handleQuoteClick = e => {
    e.preventDefault();
    const quoteSection = document.getElementById('quote-form-section');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative section-padding overflow-hidden flex items-center min-h-screen" data-cta-section>
      <div className="absolute inset-0 z-0">
          <ImageOptimizer
            alt="Home exterior beautifully lit with Christmas lights at dusk"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1664289342468-fa99588e60b8?w=1920&q=80&auto=format&fit=crop"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container-max relative z-10">
        <div className="text-white text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6">
            Seattle's Premier Holiday Lighting Designers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-body text-xl md:text-2xl mb-8 text-gray-200">
            Professional Christmas light installation, maintenance, and storage. We handle everything so you don't have to.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleQuoteClick} className="btn-primary">
              Get a Free Quote
            </Button>
            <Button as="a" href="tel:4254484998" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Call (425) 448-4998
            </Button>
          </motion.div>
        </div>
      </div>
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-white/80" />
      </motion.div>
    </section>
  );
};

const TrustBar = () => (
  <div className="bg-background-alt border-y border-border">
    <div className="container-max py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="flex items-center justify-center gap-3 p-body font-medium text-foreground">
          <Star className="w-5 h-5 text-accent" />
          <span>Rated 5.0 on Google</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-body font-medium text-foreground">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <span>Fully Licensed & Insured</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-body font-medium text-foreground">
          <Award className="w-5 h-5 text-accent" />
          <span>Trusted by Greater Seattle Homeowners</span>
        </div>
      </div>
    </div>
  </div>
);

const OurProcess = () => {
  const steps = [
    { 
      icon: <Search size={32} className="text-primary" />, 
      title: "Consultation",
      description: "We discuss your vision and assess your home's features to create a custom lighting plan tailored to your property."
    },
    { 
      icon: <PenTool size={32} className="text-primary" />, 
      title: "Design",
      description: "Custom measurements, premium material selection, and a detailed plan designed specifically for your home's architecture."
    },
    { 
      icon: <Wrench size={32} className="text-primary" />, 
      title: "Installation & Maintenance",
      description: "Professional installation, smart timer programming, and our 48-hour service guarantee throughout the season."
    },
  ];

  return (
    <section className="section-padding bg-background-alt border-y border-border">
      <div className="container-content text-center">
        <h2 className="h2 mb-16">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-12 items-start">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-background rounded-full mb-6 border border-border shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground tracking-wide mb-2">{step.title.toUpperCase()}</h3>
              <p className="p-body text-muted-foreground px-4">{step.description}</p>
              {index < steps.length - 1 && (
                 <div className="hidden sm:block absolute top-12 left-1/2 w-full translate-x-1/2">
                    <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" className="text-border">
                      <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const { openLightbox } = useLightbox();
  const galleryItems = [
    { caption: 'A modern snowy home beautifully lit with warm white Christmas lights', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/29ed3807d7952892033a68ec8781e744.jpg' },
    { caption: 'Lush bushes wrapped in warm string lights along a driveway at night', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/498c9415f87b09a9b6a366d58950d614.jpg' },
    { caption: 'A home illuminated with a vibrant display of purple, blue, and red holiday lights', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/050b4ff22b91469d9a523ee360f070cd.jpg' },
  ];
  return (
    <section id="portfolio-section" className="section-padding bg-background border-b border-border">
      <div className="container-content text-center">
        <h2 className="h2 mb-6">Our Recent Work</h2>
        <p className="p-body text-muted-foreground mb-12 max-w-2xl mx-auto">
          Every home is different. Here are a few of our recent installations around the Seattle area.
        </p>
      </div>
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map(image => (
            <div key={image.caption} className="card group card-hover overflow-hidden" onClick={() => openLightbox(image.imgSrc, image.caption)}>
              <div className="aspect-[4/3] overflow-hidden">
                <ImageOptimizer src={image.imgSrc} alt={image.caption} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-6">
                <p className="text-lg font-medium text-foreground">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button as={Link} to="/gallery" variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Explore Our Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};


const HomePageFAQ = () => {
  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "Our calendar fills up fast, so we recommend reaching out in late summer or early fall. That gives us time to design your layout, source materials, and get everything installed before the season starts."
    },
    {
      question: "What's included in your service?",
      answer: "We handle everything: consultation, professional installation, maintenance throughout the season, removal after the holidays, and off-season storage. You don't have to lift a finger."
    },
    {
      question: "What happens if a light goes out?",
      answer: "If any part of your display malfunctions, contact us and we'll schedule a service visit as quickly as possible, usually within 24 hours. Reliability is part of our guarantee; your display should look perfect throughout the season."
    },
  ];

  return (
    <section className="section-padding bg-background-alt">
      <div className="container-content">
        <h2 className="h2 text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="p-body text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
          <Button as={Link} to="/faq" variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All FAQs
          </Button>
        </div>
      </div>
    </section>
  );
};


const QuoteSection = () => (
  <section id="quote-form-section" className="section-padding bg-background-alt border-t border-border" data-cta-section>
    <div className="container-content">
      <div className="text-center mb-12">
        <h2 className="h2">Get a Free Quote</h2>
        <p className="p-body mt-4 text-muted-foreground">Tell us about your home and we'll put together a custom lighting plan.</p>
      </div>
      <div className="bg-background p-8 rounded-2xl shadow-lg border border-border">
        <ContactForm />
      </div>
    </div>
  </section>
);

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('home');
    return () => {
      document.body.classList.remove('home');
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>Seattle's Premier Holiday Lighting Designers | Seattle Christmas Lights</title>
        <meta name="description" content="Professional Christmas light installation in Seattle. We handle design, installation, maintenance, and storage so you don't have to." />
        <link rel="canonical" href="https://lightseattle.com/" />
        <meta property="og:title" content="Seattle's Premier Holiday Lighting Designers | Seattle Christmas Lights" />
        <meta property="og:description" content="Professional Christmas light installation, maintenance, and storage in Seattle. Get a free quote today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lightseattle.com/" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1541127066115-5500b56287ac" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seattle's Premier Holiday Lighting Designers | Seattle Christmas Lights" />
        <meta name="twitter:description" content="Professional Christmas light installation, maintenance, and storage in Seattle. Get a free quote today." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://horizons-cdn.hostinger.com" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How far in advance should I book?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our calendar fills up fast, so we recommend reaching out in late summer or early fall. That gives us time to design your layout, source materials, and get everything installed before the season starts."
              }
            },
            {
              "@type": "Question",
              "name": "What's included in your service?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We handle everything: consultation, professional installation, maintenance throughout the season, removal after the holidays, and off-season storage. You don't have to lift a finger."
              }
            },
            {
              "@type": "Question",
              "name": "What happens if a light goes out?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If any part of your display malfunctions, contact us and we'll schedule a service visit as quickly as possible, usually within 24 hours. Reliability is part of our guarantee; your display should look perfect throughout the season."
              }
            }
          ]
        })}</script>
      </Helmet>
      <LocalBusinessSchema />
      
      <Hero />
      <TrustBar />
      <OurProcess />
      <WhyChooseUs /> 
      <GoogleReviewsWidget />
      <Portfolio />
      <Testimonials />
      <HomePageFAQ /> 
      <QuoteSection />
      <ServiceAreaMap />
      <TrustBadges />
    </>
  );
}