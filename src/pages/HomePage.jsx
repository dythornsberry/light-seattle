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
          <img alt="Elegant home exterior with warm holiday lighting" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1614392998309-a5aecb677b9c" />
          <div className="absolute inset-0 bg-black/60" />
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
            Transform your home with designer holiday lighting, crafted with artistry and executed with white-glove service.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleQuoteClick} className="btn-primary">
              Get Your Custom Design
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
        <h2 className="h2 mb-16">Our Signature Process</h2>
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
        <h2 className="h2 mb-6">A Glimpse of Our Artistry</h2>
        <p className="p-body text-muted-foreground mb-12 max-w-2xl mx-auto">
          Every design is a unique masterpiece, meticulously crafted to complement your home's distinct architecture and character.
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
      answer: "Our calendar fills quickly, so we encourage clients to schedule their consultation as early as possible, ideally in late summer or early autumn. This ensures we have time to design, source materials, and install your bespoke display before the season begins."
    },
    {
      question: "What's included in your service?",
      answer: "Our white-glove service covers everything: consultation, professional installation, mid-season maintenance, prompt removal after the holidays, and safe off-season storage of your lights. You don't have to lift a finger."
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
        <h2 className="h2">Begin Your Design Experience</h2>
        <p className="p-body mt-4 text-muted-foreground">Custom lighting designs tailored to your home.</p>
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
        <meta name="description" content="Elevate your estate with bespoke holiday lighting. We offer white-glove service from design through storage for Seattle's premier properties." />
        <link rel="canonical" href="https://lightseattle.com/" />
        <meta property="og:title" content="Seattle's Premier Holiday Lighting Designers | Seattle Christmas Lights" />
        <meta property="og:description" content="White-glove service from design through storage. Schedule your complimentary design consultation today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lightseattle.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://horizons-cdn.hostinger.com" />
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