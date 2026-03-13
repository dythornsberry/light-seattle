import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Star } from 'lucide-react';

const LogoWordmark = ({ className = '' }) => (
  <span className={`flex flex-col leading-none ${className}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
    <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">Seattle</span>
    <span className="text-lg font-semibold text-foreground -mt-0.5">Christmas Lights</span>
  </span>
);
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/gallery', text: 'Gallery' },
  { to: '/about', text: 'About' },
  { to: '/pricing', text: 'Pricing' },
  { to: '/faq', text: 'FAQ' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
    return () => {
      body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleQuoteClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      const quoteSection = document.getElementById('quote-form-section');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/contact');
    }
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className={`sticky top-0 transition-all duration-300 z-[50] ${isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="container-max">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center">
              <LogoWordmark />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground/80'}`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground/80 border border-border rounded-full px-3 py-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>5.0</span>
                <span className="text-muted-foreground font-normal">on Google</span>
              </div>
              <Button as="a" href="tel:4254484998" variant="ghost" className="font-medium flex items-center gap-x-2 text-foreground/80 hover:text-primary">
                  <Phone size={16} />
                  <span>(425) 448-4998</span>
              </Button>
              <Button onClick={handleQuoteClick} className="btn-primary">
                  Request Custom Design
              </Button>
            </div>

            <div className="lg:hidden">
              <button onClick={toggleMenu} aria-label="Open menu" className="text-foreground p-2 -mr-2">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 w-full h-full z-[1000] mobile-menu-overlay"
          >
            <div className="flex flex-col h-full bg-background">
               <div className="container-max flex items-center justify-between h-24 shrink-0">
                 <Link to="/" onClick={closeMenu} className="flex items-center">
                    <LogoWordmark />
                 </Link>
                 <button onClick={closeMenu} aria-label="Close menu" className="text-foreground p-2 -mr-2">
                    <X size={28} />
                  </button>
              </div>

              <div className="flex-grow flex flex-col justify-center items-center overflow-y-auto">
                <nav className="flex flex-col items-center gap-6">
                  {[...navLinks, { to: '/contact', text: 'Contact' }].map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `mobile-menu-link ${isActive ? 'active' : ''}`
                        }
                      >
                        {link.text}
                      </NavLink>
                  ))}
                </nav>
              </div>

              <div className="container-max pb-8 shrink-0">
                  <div className="pt-6 flex flex-col gap-4">
                    <Button onClick={handleQuoteClick} className="btn-primary w-full text-center">Request Custom Design</Button>
                    <Button as="a" href="tel:4254484998" variant="outline" className="w-full text-center border-primary text-primary hover:bg-primary hover:text-primary-foreground">Call (425) 448-4998</Button>
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;