import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

function Footer({ serviceAreas }) {

  return (
    <footer className="bg-background-alt border-t border-border">
      <div className="container-max section-padding pb-12">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-4">
             <Link to="/" className="flex items-center">
              <span className="flex flex-col leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">Seattle</span>
                <span className="text-lg font-semibold text-foreground -mt-0.5">Christmas Lights</span>
              </span>
            </Link>
            <p className="p-body text-muted-foreground">Proudly serving Kenmore and the greater North Seattle area.</p>
          </div>
          <div className="lg:col-span-1">
            <h4 className="font-bold text-primary mb-4 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2">
                <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors p-body">Gallery</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors p-body">About Us</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors p-body">Pricing</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors p-body">FAQ</Link></li>
            </ul>
          </div>
           <div className="lg:col-span-1">
            <h4 className="font-bold text-primary mb-4 tracking-wider uppercase text-sm">Service Areas</h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {serviceAreas.slice(0, 5).map((area) => (
                <li key={area.path}>
                  <Link to={`/service-areas/${area.path}`} className="text-muted-foreground hover:text-primary transition-colors p-body">
                    {area.name}
                  </Link>
                </li>
              ))}
               <li><Link to="/service-areas" className="text-muted-foreground hover:text-primary transition-colors p-body font-medium">More areas...</Link></li>
            </ul>
          </div>
           <div className="lg:col-span-1">
            <h4 className="font-bold text-primary mb-4 tracking-wider uppercase text-sm">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:4254484998" className="flex items-center gap-x-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={16} />
                  <span>(425) 448-4998</span>
                </a>
              </li>
               <li>
                <a href="mailto:christmaslightsnw@gmail.com" className="flex items-center gap-x-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} />
                  <span>Email Us</span>
                </a>
              </li>
              <li>
                <p className="flex items-center gap-x-3 text-muted-foreground">
                  <MapPin size={16} />
                  <span>Kenmore, WA 98028</span>
                </p>
              </li>
              <li className="pt-2">
                <a
                  href="https://g.page/r/CU8wR9N1y110EBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
                >
                  ⭐ Leave a Google Review
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-16 pt-8 text-center">
          <p className="p-small text-muted-foreground">
            &copy; {new Date().getFullYear()} Seattle Christmas Lights. All Rights Reserved. License: SEATTPL783M6
            {' '}&middot;{' '}
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;