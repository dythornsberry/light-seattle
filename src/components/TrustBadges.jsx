import React from 'react';
import { ShieldCheck, Star, Wrench, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    { icon: <ShieldCheck className="w-10 h-10 text-primary" />, text: 'Licensed & Insured' },
    { icon: <Star className="w-10 h-10 text-primary" />, text: '5-Star Local Reviews' },
    { icon: <Wrench className="w-10 h-10 text-primary" />, text: 'Professional Installation' },
    { icon: <Lightbulb className="w-10 h-10 text-primary" />, text: 'Holiday Lighting Experts' },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="section-padding bg-background-alt border-t border-border">
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h2 className="h2 text-center mb-12">
            Trusted by Homeowners Across the North Seattle Area
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {badges.map((badge, index) => (
              <motion.div key={index} className="flex flex-col items-center gap-4" variants={itemVariants}>
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background border border-border shadow-lg">
                  {badge.icon}
                </div>
                <p className="font-medium text-foreground text-center">{badge.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;