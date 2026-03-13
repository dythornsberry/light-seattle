import React from 'react';
import { motion } from 'framer-motion';
import { Package, PenTool, ShieldCheck, Gift, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Placeholder for custom animation hooks - assuming they exist or would be implemented if needed
// For now, using direct framer-motion props
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};


function WhyChooseUs() {
  const features = [
    {
      icon: <Package className="w-10 h-10 text-primary" />,
      title: "Complete Look Packages",
      description: "Cohesive, all-inclusive designs that feature rooflines, trees, wreaths, garlands, and path lighting for a complete designer look."
    },
    {
      icon: <PenTool className="w-10 h-10 text-primary" />,
      title: "Designer Quality & Detail",
      description: "We custom-measure every run, use color-matched clips and pro-grade LEDs, hide cords, and test at dusk for a flawless finish."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "48-Hour Fix Guarantee",
      description: "We fix any issues within 48 hours during the season. Our service includes hassle-free removal and off-season storage."
    },
    {
      icon: <Gift className="w-10 h-10 text-primary" />,
      title: "First Light Kit & Pro Photo",
      description: "Each client receives a complimentary 'First Light Kit' and a professional dusk photo of their decorated home."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-content">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="h2 text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="p-body text-muted-foreground max-w-3xl mx-auto">
            We deliver more than just lights; we provide a premier, all-inclusive experience that creates lasting holiday memories.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-8 bg-background-alt rounded-2xl shadow-lg card-hover card"
              variants={fadeInUp}
            >
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 border border-border shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          className="text-center mt-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>
          <p className="p-body text-foreground text-xl md:text-2xl font-semibold mb-6">
            Rated 5.0 stars on Google!
          </p>
          <Button as={Link} to="https://g.page/r/CU8wR9N1y110EBM/review" target="_blank" rel="noopener noreferrer" className="btn-primary-outline text-lg">
            Read Our Reviews
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;