import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { MapPin, CheckCircle, Home, Building, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const primaryAreas = [
  {
    name: 'Seattle',
    description: 'Including Capitol Hill, Queen Anne, Laurelhurst, Magnolia, Wallingford, and more.',
  },
  {
    name: 'Eastside Communities',
    description: 'Bellevue, Kirkland, Redmond, Mercer Island, Sammamish.',
  },
  {
    name: 'North Communities',
    description: 'Bothell, Kenmore, Woodinville, Lake Forest Park.',
  },
  {
    name: 'Snohomish County',
    description: 'Lynnwood, Everett, Shoreline, Edmonds.',
  },
];

const whatWeService = [
    { name: "Single-family homes", icon: Home },
    { name: "Townhomes and condos", icon: Building },
    { name: "Business properties", icon: Briefcase },
    { name: "HOA entrances", icon: Users },
    { name: "Community spaces", icon: MapPin },
];

const ServiceAreasPage = () => {
  return (
    <>
      <Helmet>
        <title>Service Areas | Seattle Christmas Lights</title>
        <meta name="description" content="Proudly serving King and Snohomish counties with professional Christmas light installation." />
      </Helmet>
      <PageHeader
        title="Service Areas"
        subtitle="Proudly serving King and Snohomish counties"
      />

      <section className="section-padding bg-background">
        <div className="container-content">
          <h2 className="h2 text-center mb-12">Primary Service Areas</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {primaryAreas.map((area) => (
              <div key={area.name} className="card bg-background-alt border p-6 flex items-start gap-4">
                <MapPin className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="h3 text-xl text-foreground mb-2">{area.name}</h3>
                  <p className="p-body text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-alt border-y">
        <div className="container-content text-center max-w-3xl mx-auto">
            <h2 className="h2 text-foreground mb-4">Serving the Greater Seattle Area</h2>
            <p className="p-body text-lg text-muted-foreground">From Everett to Renton, we serve the entire greater Seattle area. Whether you're in a cozy rambler or a larger estate, we create custom displays that fit your home and budget.</p>
        </div>
      </section>
      
      <section className="section-padding bg-background">
        <div className="container-content">
            <h2 className="h2 text-center text-foreground mb-12">What We Service</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                {whatWeService.map(item => (
                    <div key={item.name} className="flex flex-col items-center gap-3">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <item.icon className="w-8 h-8 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="section-padding bg-background-alt border-t">
        <div className="container-content text-center">
          <h2 className="h2 text-foreground mb-2">Not sure if we serve your area?</h2>
          <p className="p-body text-muted-foreground mb-6">Give us a call! We're happy to help.</p>
          <Button as={Link} to="/contact" size="lg" className="btn-primary text-lg">
            Book a Consultation
          </Button>
        </div>
      </section>
    </>
  );
};

export default ServiceAreasPage;