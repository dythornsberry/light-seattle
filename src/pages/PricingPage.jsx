import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { CheckCircle } from 'lucide-react';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Button } from '@/components/ui/button';
import { useLightbox } from '@/context/LightboxContext.jsx';
import { motion } from 'framer-motion';

const investmentTiers = [
  {
    name: 'Classic Elegance',
    price: '$800 - $1,500',
    description: "Foundation roofline lighting that defines your home's architecture. Perfect for creating clean, elegant curb appeal.\n\nTypically includes: Main roofline, select peaks.",
    imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/5e9ce03aef84da6932fd4d86b2cb2ce9.jpg',
    alt: 'A modern home with elegant roofline Christmas lighting.'
  },
  {
    name: 'Signature Display',
    price: '$1,500 - $3,500',
    description: "Complete the picture with entrance elements and architectural highlighting. Our most popular choice for traditional homes.\n\nTypically includes: Full roofline coverage, entrance package (wreath, door garland, columns), select dormers and peaks.",
    imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/3e3f7b83cf837cb4bbae3a82b6612455.jpg',
    alt: 'A two-story home beautifully illuminated with holiday lights along the roofline, a large wreath on the second floor, and bushes lit up on the ground level.'
  },
  {
    name: 'Estate Collection',
    price: '$3,500+',
    description: "Transform your entire property with comprehensive lighting design. Every angle, every feature, fully illuminated.\n\nTypically includes: Everything in Signature Display, plus landscape lighting, statement trees, pathways, and custom architectural features.",
    imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/e4fae65260a51a51ea19d285b79f3a99.jpg',
    alt: 'A large home with extensive holiday lighting, decorated trees, and snow on the ground.'
  },
];

const includedItems = [
    "Free design consultation",
    "Commercial-grade LED lighting",
    "Custom measurements & cutting",
    "Professional, insured installation",
    "Smart timer programming",
    "48-hour service response guarantee",
    "Post-season removal",
    "Climate-controlled storage",
    "20% discount for next season"
];

const designConsiderations = [
    "Home architecture and roofline complexity",
    "Property size and landscape features",
    "Desired coverage and impact",
    "Special features (trees, columns, pathways)"
];

const PricingPage = () => {
  const { openLightbox } = useLightbox();

  return (
    <>
      <Helmet>
        <title>Investment Guide | Seattle Christmas Lights</title>
        <meta name="description" content="Christmas light installation pricing for Seattle homes. Packages from $800 to $3,500+. Includes design, installation, maintenance, and storage." />
      </Helmet>
      <PageHeader
        title="Investment Guide"
        subtitle="Every home is unique. Your investment reflects your home's architecture, landscape, and desired impact."
      />

      <section className="section-padding bg-background">
        <div className="container-content text-center">
            <h2 className="h3 text-foreground mb-4">Our Transparent Philosophy</h2>
            <p className="p-body max-w-3xl mx-auto text-muted-foreground">
                Our transparent pricing includes everything: design consultation, commercial-grade materials, professional installation, seasonal maintenance, removal, and climate-controlled storage. No hidden fees, no surprises.
            </p>
        </div>
      </section>

      <div className="section-padding bg-background-alt border-y" data-cta-section>
        <div className="container-content">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentTiers.map((tier) => (
              <motion.div 
                key={tier.name} 
                className="card flex flex-col card-hover bg-background"
                whileHover={{ y: -5 }}
              >
                <div className="overflow-hidden rounded-t-2xl cursor-pointer" onClick={() => openLightbox(tier.imgSrc, tier.alt)}>
                    <ImageOptimizer
                        src={tier.imgSrc}
                        alt={tier.alt}
                        className="w-full h-56 object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="h3 text-2xl text-primary mb-2">{tier.name}</h3>
                   <p className="text-xl font-bold text-foreground mb-4">{tier.price}</p>
                  <p className="p-body text-muted-foreground mb-6 flex-grow whitespace-pre-line">
                    {tier.description}
                  </p>
                  <Button as={Link} to="/contact" className="btn-primary w-full mt-auto">
                    Request Custom Design
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

        <section className="section-padding bg-background">
            <div className="container-content">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="h2 text-foreground mb-4">What's Included</h2>
                        <p className="p-body text-muted-foreground mb-8">Your investment covers every detail for a brilliant, worry-free season.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-left">
                            {includedItems.map(item => (
                                <div key={item} className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                    <span className="p-body text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-background-alt p-8 rounded-2xl border">
                        <h3 className="h3 text-foreground mb-4">Design Considerations</h3>
                        <p className="p-body text-muted-foreground mb-6">Your final investment is influenced by several factors, ensuring a truly custom result:</p>
                        <ul className="space-y-3">
                            {designConsiderations.map(item => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                    <span className="p-body text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className="section-padding bg-background-alt border-t">
            <div className="container-content text-center">
                <h2 className="h2 text-foreground mb-4">Ready to Discuss Your Vision?</h2>
                <p className="p-body text-muted-foreground mb-8 max-w-xl mx-auto">Let's create a holiday display that reflects the beauty and character of your home.</p>
                <Button as={Link} to="/contact" size="lg" className="btn-primary text-lg px-8 py-4">
                    Request Custom Design
                </Button>
            </div>
        </section>
    </>
  );
};

export default PricingPage;