import React from 'react';
import { motion } from 'framer-motion';
import { Home, Wrench, Calendar } from 'lucide-react';
import useFadeInUpAnimation from '@/hooks/useFadeInUpAnimation';
import useStaggerChildrenAnimation from '@/hooks/useStaggerChildrenAnimation';

function HowItWorks() {
  const fadeInUp = useFadeInUpAnimation();
  const staggerChildren = useStaggerChildrenAnimation();

  const steps = [
    {
      icon: <Home className="w-12 h-12" />,
      title: "Get a free quote & custom design",
      description: "We visit your property and create a custom lighting design tailored to your home's unique architecture."
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Professional installation",
      description: "Our experienced team handles all the installation with premium lights and professional-grade equipment."
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Season-long service & takedown",
      description: "Enjoy worry-free maintenance throughout the season, plus complete takedown and storage when it's over."
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-green-800 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your home into a holiday masterpiece.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg card-hover"
              variants={fadeInUp}
            >
              <div className="w-20 h-20 christmas-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;