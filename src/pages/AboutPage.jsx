import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Award, Check, Wrench, Home, Star, ShieldCheck, Users } from 'lucide-react';

const PageHeader = ({ title, subtitle, intro }) => (
    <div className="bg-background-alt">
        <div className="container-content section-padding text-center">
            <h1 className="h1 text-foreground">{title}</h1>
            <p className="p-body text-muted-foreground mt-4 max-w-3xl mx-auto">{subtitle}</p>
            <p className="mt-6 text-xl md:text-2xl font-semibold text-foreground max-w-3xl mx-auto">{intro}</p>
        </div>
    </div>
);

const AboutPage = () => {
    const whatSetsUsApart = [
        {
            icon: <Sparkles className="w-8 h-8 text-primary" />,
            title: "Complete Designer Vision",
            description: "While others just hang roofline lights, we design cohesive looks: rooflines, trees, wreaths, pathways, and architectural accents that work together as one unified display."
        },
        {
            icon: <Award className="w-8 h-8 text-primary" />,
            title: "Attention to Detail",
            description: "We go beyond just hanging lights. Every display is tested at dusk, cords are hidden, and timers are programmed so your home looks perfect every night of the season."
        },
        {
            icon: <Check className="w-8 h-8 text-primary" />,
            title: "Meticulous Installation",
            description: "We custom-measure every run, use color-matched clips that disappear, hide cords, program smart timers with preset scenes, and test at dusk before we leave. No shortcuts."
        },
        {
            icon: <Wrench className="w-8 h-8 text-primary" />,
            title: "48-Hour Fix Guarantee",
            description: "If anything goes out during the season, we're there within 48 hours. Then we handle takedown and climate-controlled storage until next year."
        }
    ];

    const results = [
        { icon: <Home className="w-8 h-8 text-primary" />, stat: "300+", label: "Homes Transformed" },
        { icon: <Users className="w-8 h-8 text-primary" />, stat: "85%", label: "Client Return Rate" },
        { icon: <Star className="w-8 h-8 text-primary" />, stat: "5.0", label: "Stars on Google" },
        { icon: <ShieldCheck className="w-8 h-8 text-primary" />, stat: "Zero", label: "Property Damage in 4 Years" },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <>
            <Helmet>
                <title>About Us | Seattle Christmas Lights</title>
                <meta name="description" content="Seattle Christmas Lights designs and installs custom holiday lighting for homes across Greater Seattle. Full-service from design to storage." />
            </Helmet>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { staggerChildren: 0.1 } }}>
                <motion.div variants={fadeIn}>
                    <PageHeader
                        title="About Seattle Christmas Lights"
                        subtitle="Since 2022, we've been helping Greater Seattle homeowners make their holidays brighter. We design, install, maintain, and store Christmas lights so you can enjoy the season without the hassle."
                        intro="More than just installers. We design custom displays for every home."
                    />
                </motion.div>

                <motion.section variants={fadeIn} className="section-padding bg-background">
                    <div className="container-content">
                        <div className="text-center mb-12">
                            <h2 className="h2 text-foreground">What Sets Us Apart</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                            {whatSetsUsApart.map((item, index) => (
                                <div key={index} className="flex items-start gap-6">
                                    <div className="flex-shrink-0 mt-1">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                                        <p className="p-body text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section variants={fadeIn} className="section-padding bg-background-alt border-y">
                    <div className="container-content text-center">
                        <h2 className="h2 text-foreground mb-12">The Results That Matter</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {results.map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-background rounded-full mb-4 border">
                                        {item.icon}
                                    </div>
                                    <p className="text-4xl font-bold text-primary">{item.stat}</p>
                                    <p className="p-small text-muted-foreground mt-1">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section variants={fadeIn} className="section-padding bg-background">
                    <div className="container-content text-center max-w-3xl mx-auto">
                        <h2 className="h2 text-foreground mb-4">Why Clients Choose Us (And Stay With Us)</h2>
                        <blockquote className="text-xl text-foreground italic border-l-4 border-primary pl-6 my-8">
                            "Most companies just put up lights. Seattle Christmas Lights designs a look that makes our home feel special. That's why we've used them three years running."
                        </blockquote>
                        <p className="p-body text-muted-foreground">
                            Our 85% return rate isn't luck, it's because we deliver an experience, not just a service.
                        </p>
                    </div>
                </motion.section>

                <motion.section variants={fadeIn} className="section-padding bg-background-alt border-y">
                    <div className="container-content text-center max-w-4xl mx-auto">
                        <h2 className="h2 text-foreground">Serving Greater Seattle</h2>
                        <p className="p-body text-muted-foreground mt-4">
                            Licensed, insured (SEATTPL783M6), and trusted across King and Snohomish counties. We know Pacific Northwest weather and what it takes to build displays that last the whole season.
                        </p>
                    </div>
                </motion.section>

                <motion.section variants={fadeIn} className="section-padding bg-primary" data-cta-section>
                    <div className="container-content text-center">
                        <h2 className="text-3xl font-bold text-primary-foreground">Ready to Transform Your Home?</h2>
                        <p className="mt-2 text-primary-foreground/80 max-w-2xl mx-auto">Let's create a holiday display that reflects your home's character and your family's style.</p>
                        <div className="mt-8">
                            <Button as={Link} to="/contact" size="lg" variant="secondary" className="text-lg">
                                Get Your Custom Design
                            </Button>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </>
    );
};

export default AboutPage;