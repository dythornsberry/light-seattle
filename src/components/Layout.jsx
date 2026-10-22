import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Phone } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import { MobileBar } from '@/components/Blocks';
import { PHONE_DISPLAY, PHONE_TEL, BUSINESS_NAME, cities, serviceAreas } from '@/data/site';

const Header = () => (
  <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <Link to="/" className="font-semibold text-base sm:text-lg text-foreground tracking-tight leading-tight">
        {BUSINESS_NAME}
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <a href="/#photos" className="hidden md:inline text-foreground/80 hover:text-foreground">Photos</a>
        <a href="/#faq" className="hidden md:inline text-foreground/80 hover:text-foreground">FAQ</a>
        <a href={`tel:${PHONE_TEL}`} className="hidden sm:inline-flex items-center gap-2 text-foreground/90 hover:text-foreground">
          <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
        </a>
        <a href={`tel:${PHONE_TEL}`} aria-label="Call us" className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border">
          <Phone className="w-4 h-4" />
        </a>
        <a href="/#quote" className="inline-flex items-center whitespace-nowrap rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground hover:brightness-110">
          Free quote
        </a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t border-border mt-0 pb-16 sm:pb-0">
    <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-[1fr_2fr] text-sm">
      <div className="space-y-2 text-foreground/80">
        <p className="font-semibold text-foreground">{BUSINESS_NAME}</p>
        <p>Kenmore, WA</p>
        <p><a href={`tel:${PHONE_TEL}`} className="hover:text-foreground">{PHONE_DISPLAY}</a></p>
        <p>Call or text 24/7</p>
        <p>Licensed, bonded and insured</p>
      </div>
      <div>
        <p className="font-semibold text-foreground mb-2">Areas we serve</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-foreground/70">
          {cities.map((c) => (
            <li key={c.path}>
              <Link to={`/service-areas/${c.path}`} className="text-foreground hover:text-primary">{c.name}</Link>
            </li>
          ))}
          {serviceAreas.filter((n) => !cities.some((c) => c.name === n)).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 pb-8 flex flex-wrap gap-4 justify-between text-xs text-foreground/50">
      <p suppressHydrationWarning>&copy; {new Date().getFullYear()} {BUSINESS_NAME}</p>
      <Link to="/privacy" className="hover:text-foreground">Privacy policy</Link>
    </div>
  </footer>
);

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <ScrollToTop />
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <MobileBar />
  </div>
);

export default Layout;
