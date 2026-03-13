import React from 'react';
import { Phone, Edit } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const StickyMobileActions = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleQuoteClick = () => {
        if (location.pathname === '/') {
            document.getElementById('quote-form-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/contact');
        }
    };
  
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3 border-t z-50 grid grid-cols-2 gap-3 sticky-mobile-cta">
      <a href="tel:4254484998" className="btn-secondary w-full text-base">
        <Phone size={16} className="mr-2" />
        Call
      </a>
      <button onClick={handleQuoteClick} className="btn-primary w-full text-base">
        <Edit size={16} className="mr-2" />
        Get my quote
      </button>
    </div>
  );
};

export default StickyMobileActions;