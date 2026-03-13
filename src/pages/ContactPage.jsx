import React from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin } from 'lucide-react';
import useStickyCta from '@/hooks/useStickyCta';

const ContactPage = () => {
  useStickyCta();

  return (
    <>
      <Helmet>
        <title>Contact Us | Seattle Christmas Lights</title>
        <meta name="description" content="Contact Seattle Christmas Lights for a free quote on professional holiday light installation. Call us or fill out our online form to get started." />
      </Helmet>
      
      <div className="bg-background-alt border-b">
        <div className="container-content text-center py-12">
            <h1 className="h1 text-foreground mb-4">Transform Your Home This Holiday Season</h1>
            <p className="p-body text-muted-foreground max-w-3xl mx-auto">
                Fill out the form below. We'll contact you within 2 hours to discuss your custom design, by phone or in-person, whatever works best for your property.
            </p>
        </div>
      </div>

      <div className="section-padding" data-cta-section>
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-background-alt p-8 rounded-2xl border shadow-lg">
              <div className="text-center mb-6">
                <h2 className="h2 mb-2" style={{'--tw-text-opacity': 1, color: 'hsl(var(--foreground))'}}>Begin Your Design Experience</h2>
                <p className="p-body" style={{color: '#666666'}}>Premium holiday lighting for your home</p>
              </div>
              <ContactForm />
            </div>
            <div className="space-y-8 mt-4">
                <h2 className="h2 text-center">Contact Information</h2>
                <div className="flex items-start gap-x-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Phone size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary">Phone</h3>
                        <a href="tel:4254484998" className="p-body text-muted-foreground hover:text-primary transition-colors">(425) 448-4998</a>
                        <p className="p-small text-muted-foreground/80">Call 7am-7pm</p>
                    </div>
                </div>
                 <div className="flex items-start gap-x-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary">Email</h3>
                        <a href="mailto:christmaslightsnw@gmail.com" className="p-body text-muted-foreground hover:text-primary transition-colors">christmaslightsnw@gmail.com</a>
                        <p className="p-small text-muted-foreground/80">We respond within 24 hours</p>
                    </div>
                </div>
                 <div className="flex items-start gap-x-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary">Service Area</h3>
                        <p className="p-body text-muted-foreground">Based in Kenmore, WA</p>
                        <p className="p-small text-muted-foreground/80">Serving the Greater Seattle Metro</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;