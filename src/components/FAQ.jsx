import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';
import useFadeInUpAnimation from '@/hooks/useFadeInUpAnimation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';

const AccordionItem = ({ value, trigger, children }) => {
  return (
    <Accordion.Item value={value} className="border-b border-border last:border-b-0">
      <Accordion.Header>
        <Accordion.Trigger className="flex justify-between items-center w-full py-5 text-left font-semibold text-lg text-foreground group">
          <span className="flex items-center">
            <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
            {trigger}
          </span>
          <ChevronDown className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-180 text-muted-foreground flex-shrink-0" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="pl-8 pb-5 p-body text-muted-foreground">
          {children}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

function FAQ() {
  const fadeInUp = useFadeInUpAnimation();

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking by mid-October to secure your preferred installation date. Our schedule fills quickly as we approach the holiday season."
    },
    {
      question: "What’s included in your service?",
      answer: "Everything from start to finish: free design consultation, commercial-grade materials, professional installation, smart timer programming, off-season storage, post-holiday removal, and our 48-hour service response guarantee."
    },
    {
      question: "Are your products and installation methods safe?",
      answer: "Yes. We use commercial-grade LED lighting and professional installation techniques that protect your home's exterior. Our team is fully insured, and we never use staples, nails, or methods that damage gutters, shingles, or siding."
    },
    {
      question: "What happens if a light goes out?",
      answer: "Contact us and we'll have a technician at your property within 48 hours to resolve any issues. Our service guarantee covers the entire holiday season."
    }
  ];

  return (
    <section className="section-padding bg-background-alt border-y">
      <div className="container-content">
        <motion.div 
          className="text-center mb-12"
          {...fadeInUp}
        >
          <h2 className="h2 text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="p-body text-muted-foreground max-w-2xl mx-auto">
            Your most common questions, answered. For more details, visit our full FAQ page.
          </p>
        </motion.div>

        <motion.div 
          className="bg-background rounded-2xl shadow-lg p-4 border border-border"
          {...fadeInUp}
        >
          <Accordion.Root type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} trigger={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion.Root>
        </motion.div>

        <motion.div className="text-center mt-12" {...fadeInUp}>
          <Button as={Link} to="/faq" variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All FAQs
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;