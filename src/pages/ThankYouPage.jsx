import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PartyPopper, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThankYouPage = () => {
    return (
        <>
            <Helmet>
                <title>Thank You! | Seattle Christmas Lights</title>
                <meta name="description" content="Thank you for your submission." />
                <meta name="robots" content="noindex" />
                <link rel="canonical" href="https://lightseattle.com/thank-you" />
            </Helmet>
            <div className="min-h-[60vh] flex items-center justify-center bg-background">
                <div className="container-content text-center py-16">
                    <div className="inline-block bg-primary/10 p-4 rounded-full mb-6">
                        <PartyPopper className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="h1 text-foreground mb-4">Thank you!</h1>
                    <p className="p-lead text-muted-foreground max-w-xl mx-auto mb-8">
                        We'll contact you within 2 hours to discuss your custom lighting design.
                        <br />
                        Need to talk sooner? Call us: <a href="tel:4254484998" className="font-bold text-primary hover:underline">(425) 448-4998</a>
                    </p>
                    <Button as={Link} to="/" size="lg" className="btn-primary">
                        Back to Home
                    </Button>

                    <div className="mt-16 pt-8 border-t border-border max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Star className="w-5 h-5 text-accent fill-accent" />
                            <Star className="w-5 h-5 text-accent fill-accent" />
                            <Star className="w-5 h-5 text-accent fill-accent" />
                            <Star className="w-5 h-5 text-accent fill-accent" />
                            <Star className="w-5 h-5 text-accent fill-accent" />
                        </div>
                        <p className="p-body text-muted-foreground mb-4">
                            Already a customer? We'd love to hear about your experience!
                        </p>
                        <a
                            href="https://g.page/r/CU8wR9N1y110EBM/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                        >
                            <Star className="w-4 h-4" />
                            Leave us a Google Review
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThankYouPage;
