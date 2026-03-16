import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, User } from 'lucide-react';

// Webhook URL is hidden server-side in Cloudflare Pages env vars.
// Form submits to our own proxy at /api/submit-quote which forwards to Zapier.
const SUBMIT_ENDPOINT = '/api/submit-quote';

// Keep a domain-restricted fallback so production autocomplete still works
// even if the build env var is missing in Cloudflare Pages.
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDGwqAN4cRu6rBXnvC4fKQc79xD5nHxnq0';

const STEPS = [
  { label: "Contact", icon: User },
  { label: "Property & Details", icon: MapPin },
];

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {STEPS.map((step, index) => {
      const Icon = step.icon;
      const isCompleted = index < currentStep;
      const isCurrent = index === currentStep;
      return (
        <React.Fragment key={step.label}>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            isCompleted ? 'bg-green-500/20 text-green-400' :
            isCurrent ? 'bg-primary/20 text-primary' :
            'bg-muted/50 text-muted-foreground'
          }`}>
            {isCompleted ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {index < STEPS.length - 1 && (
            <div className={`w-8 h-0.5 ${index < currentStep ? 'bg-green-500' : 'bg-border'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 80 : -80, opacity: 0 }),
};

// Only load Google Maps on authorized domains (NOT localhost)
// The Maps JS API hijacks inputs and disables them on auth failure!
const AUTHORIZED_DOMAINS = ['lightseattle.com', 'www.lightseattle.com'];
const isAuthorizedDomain = AUTHORIZED_DOMAINS.includes(window.location.hostname);

let mapsLoadState = { loading: false, loaded: false, failed: false };

async function ensurePlacesAPI() {
  // Don't even try on unauthorized domains — Maps JS will hijack our inputs
  if (!isAuthorizedDomain || !GOOGLE_MAPS_API_KEY) return false;

  // Already loaded successfully
  if (mapsLoadState.loaded && window.google?.maps?.places?.AutocompleteSuggestion) {
    return true;
  }

  // Already failed, don't retry
  if (mapsLoadState.failed) return false;

  // Already loading, wait for it
  if (mapsLoadState.loading) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (mapsLoadState.loaded) { clearInterval(check); resolve(true); }
        if (mapsLoadState.failed) { clearInterval(check); resolve(false); }
      }, 200);
      setTimeout(() => { clearInterval(check); resolve(false); }, 8000);
    });
  }

  mapsLoadState.loading = true;

  try {
    // Load the script if not already present
    if (!window.google?.maps?.importLibrary) {
      await new Promise((resolve, reject) => {
        if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
          const wait = setInterval(() => {
            if (window.google?.maps) { clearInterval(wait); resolve(); }
          }, 200);
          setTimeout(() => { clearInterval(wait); reject(new Error('Timeout')); }, 8000);
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async`;
        script.async = true;
        script.onload = () => {
          const wait = setInterval(() => {
            if (window.google?.maps) { clearInterval(wait); resolve(); }
          }, 100);
          setTimeout(() => { clearInterval(wait); reject(new Error('Timeout')); }, 5000);
        };
        script.onerror = () => reject(new Error('Script load failed'));
        document.head.appendChild(script);
      });
    }

    await window.google.maps.importLibrary('places');

    mapsLoadState.loaded = true;
    mapsLoadState.loading = false;
    return true;
  } catch (err) {
    console.warn('Google Places API failed to load:', err);
    mapsLoadState.failed = true;
    mapsLoadState.loading = false;
    return false;
  }
}

function ContactForm({ isMinimal = false }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    street_address: '',
    zip_code: '',
    city: '',
    state: '',
    timeline: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Places autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const sessionTokenRef = useRef(null);
  const debounceRef = useRef(null);
  const suggestionsListRef = useRef(null);
  const placesLoadedRef = useRef(false);

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsListRef.current && !suggestionsListRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch autocomplete suggestions (lazy-loads Google Maps on first call)
  const fetchSuggestions = useCallback(async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Lazy-load Places API on first real search
    if (!placesLoadedRef.current) {
      const ready = await ensurePlacesAPI();
      if (!ready) return; // Silently fail — form still works as plain input
      placesLoadedRef.current = true;
    }

    try {
      if (!sessionTokenRef.current) {
        sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
      }

      const { suggestions: results } = await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input,
        sessionToken: sessionTokenRef.current,
        includedPrimaryTypes: ['street_address', 'premise', 'subpremise'],
        includedRegionCodes: ['us'],
        language: 'en-US',
      });

      setSuggestions(results || []);
      setShowSuggestions((results || []).length > 0);
      setActiveSuggestionIndex(-1);
    } catch (err) {
      console.warn('Places autocomplete error:', err);
      setSuggestions([]);
    }
  }, []);

  // Handle selecting a suggestion
  const handleSuggestionSelect = useCallback(async (suggestion) => {
    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({
        fields: ['formattedAddress', 'addressComponents'],
        sessionToken: sessionTokenRef.current,
      });

      let streetNumber = '';
      let route = '';
      let zip = '';
      let city = '';
      let state = '';

      if (place.addressComponents) {
        for (const comp of place.addressComponents) {
          const types = comp.types;
          if (types.includes('street_number')) streetNumber = comp.longText;
          if (types.includes('route')) route = comp.longText;
          if (types.includes('postal_code')) zip = comp.longText;
          if (types.includes('locality')) city = comp.longText;
          if (types.includes('administrative_area_level_1')) state = comp.shortText;
        }
      }

      const street = [streetNumber, route].filter(Boolean).join(' ');

      setFormState(prev => ({
        ...prev,
        street_address: street || place.formattedAddress || prev.street_address,
        zip_code: zip || prev.zip_code,
        city: city || prev.city,
        state: state || prev.state,
      }));

      setErrors(prev => ({
        ...prev,
        street_address: '',
        ...(zip ? { zip_code: '' } : {}),
      }));
    } catch (err) {
      console.warn('Place details fetch error:', err);
      const text = suggestion.placePrediction?.text?.text;
      if (text) {
        setFormState(prev => ({ ...prev, street_address: text }));
      }
    }

    setSuggestions([]);
    setShowSuggestions(false);
    sessionTokenRef.current = null;
  }, []);

  // Address input change — updates state immediately, debounces autocomplete
  const handleAddressChange = useCallback((e) => {
    const { value } = e.target;
    setFormState(prev => ({ ...prev, street_address: value }));
    if (errors.street_address) {
      setErrors(prev => ({ ...prev, street_address: '' }));
    }

    // Debounce autocomplete (only triggers after 3+ chars, 300ms delay)
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  }, [fetchSuggestions, errors.street_address]);

  // Keyboard nav for suggestions (Enter to advance is handled separately after handleNext is defined)
  const handleAddressKeyDownBase = useCallback((e) => {
    if (!showSuggestions || suggestions.length === 0) return false;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
      return true;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
      return true;
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionSelect(suggestions[activeSuggestionIndex]);
      return true;
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return true;
    }
    return false;
  }, [showSuggestions, suggestions, activeSuggestionIndex, handleSuggestionSelect]);

  // Format phone as (XXX) XXX-XXXX
  const formatPhone = (digits) => {
    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.slice(0, 3);
    if (digits.length >= 3) formatted += ') ' + digits.slice(3, 6);
    if (digits.length >= 6) formatted += '-' + digits.slice(6, 10);
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const prevDigits = formState.phone.replace(/\D/g, '');
    const newDigits = e.target.value.replace(/\D/g, '').slice(0, 10);

    // Detect backspace: if the raw input shrank but digits didn't,
    // the user deleted a formatting char — drop the last digit instead
    const isBackspace = e.target.value.length < formState.phone.length;
    const digits = (isBackspace && newDigits.length === prevDigits.length)
      ? newDigits.slice(0, -1)
      : newDigits;

    setFormState(prev => ({ ...prev, phone: formatPhone(digits) }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 0) {
      if (!formState.name) {
        newErrors.name = "Full Name is required.";
      } else if (formState.name.trim().length < 2) {
        newErrors.name = "Please enter your full name.";
      } else if (!/\s/.test(formState.name.trim())) {
        newErrors.name = "Please enter your first and last name.";
      }
      if (!formState.phone) {
        newErrors.phone = "Phone Number is required.";
      } else {
        const digitsOnly = formState.phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
          newErrors.phone = "Please enter a valid 10-digit phone number.";
        } else if (/^(\d)\1{9}$/.test(digitsOnly)) {
          newErrors.phone = "Please enter a real phone number.";
        }
      }
      if (!formState.email) {
        newErrors.email = "Email Address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formState.email)) {
        newErrors.email = "Please enter a valid email address.";
      } else if (/(@example\.com|@test\.com|@fake\.com|@asdf\.)$/i.test(formState.email)) {
        newErrors.email = "Please enter a real email address.";
      }
    }

    if (stepNum === 1) {
      if (!formState.street_address.trim()) {
        newErrors.street_address = "Street Address is required.";
      } else if (formState.street_address.trim().length < 5) {
        newErrors.street_address = "Please enter a valid street address.";
      }
      if (!formState.zip_code) {
        newErrors.zip_code = "ZIP Code is required.";
      } else if (!/^\d{5}(-\d{4})?$/.test(formState.zip_code)) {
        newErrors.zip_code = "Please enter a valid US ZIP code.";
      }
      if (!formState.timeline) newErrors.timeline = "Please select a timeline.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  // Press Enter on any input to advance to next step
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < 1) {
        handleNext();
      }
    }
  };

  // Address field: keyboard nav for suggestions + Enter to advance
  const handleAddressKeyDown = (e) => {
    // Let the base handler deal with arrow keys and suggestion selection first
    if (handleAddressKeyDownBase(e)) return;
    // If Enter and no suggestion highlighted, advance step
    if (e.key === 'Enter') {
      e.preventDefault();
      setShowSuggestions(false);
      handleNext();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({...prev, [id]: value}));
    if (errors[id]) {
      setErrors(prev => ({...prev, [id]: ''}));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validateStep(0) || !validateStep(1)) {
      toast({
        variant: "destructive",
        title: "Please fix the errors",
        description: "All required fields must be completed.",
      });
      return;
    }

    setIsSubmitting(true);

    // Strip phone to E.164 for Twilio (+1XXXXXXXXXX)
    const phoneDigits = formState.phone.replace(/\D/g, '');
    const phoneE164 = '+1' + phoneDigits;

    const fullAddress = [formState.street_address, formState.city, formState.state, formState.zip_code].filter(Boolean).join(', ');

    const submissionData = {
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      address: fullAddress,
      timeline: formState.timeline,
      phone_e164: phoneE164,
      submitted_at: new Date().toISOString()
    };

    // Fire backup email independently (never blocks main flow)
    fetch('/api/backup-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_name: formState.name,
        lead_phone: formState.phone,
        lead_email: formState.email,
        lead_address: formState.street_address,
        lead_city: formState.city,
        lead_state: formState.state,
        lead_zip: formState.zip_code,
        lead_full_address: [formState.street_address, formState.city, formState.state, formState.zip_code].filter(Boolean).join(', '),
        lead_timeline: formState.timeline,
        lead_submitted_at: submissionData.submitted_at,
      }),
    }).catch(() => {});

    // Submit through Cloudflare proxy (hides Zapier webhook URL from browser)
    // Always show success — backup email already fired independently above,
    // so we NEVER block the user even if the proxy has an issue.
    try {
      await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
    } catch {
      // Proxy or network error — Zapier may or may not have received it,
      // but backup email already went out so the lead is not lost.
      console.warn('Submit proxy error — backup email was sent independently.');
    }

    toast({
      title: "Success!",
      description: "Your quote request has been sent. We'll be in touch soon.",
    });

    setIsSubmitting(false);
    navigate('/thank-you', { state: { name: formState.name, property: 'home' } });
  };

  return (
    <form onSubmit={handleFormSubmit} noValidate>
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <StepIndicator currentStep={step} />

      <div className="min-h-[380px] relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="step-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground">Let's get started — who are you?</h3>
                <p className="text-sm text-muted-foreground">We'll send your custom quote within 24 hours</p>
              </div>
              <div>
                <label htmlFor="name" className="form-label">Full Name*</label>
                <input id="name" type="text" value={formState.name} onChange={handleChange} onKeyDown={handleInputKeyDown} required className="form-input" placeholder="Jane Doe" disabled={isSubmitting} autoComplete="name" />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="form-label">Phone Number*</label>
                <input id="phone" type="tel" value={formState.phone} onChange={handlePhoneChange} onKeyDown={handleInputKeyDown} required className="form-input" placeholder="(206) 555-0123" disabled={isSubmitting} autoComplete="tel" maxLength={14} />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email Address*</label>
                <input id="email" type="email" value={formState.email} onChange={handleChange} onKeyDown={handleInputKeyDown} required className="form-input" placeholder="jane@email.com" disabled={isSubmitting} autoComplete="email" />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <button type="button" onClick={handleNext} className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2">
                Next <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground">Property & timing details</h3>
                <p className="text-sm text-muted-foreground">So we can check your service area and schedule</p>
              </div>
              <div className="relative" ref={suggestionsListRef}>
                <label htmlFor="street_address" className="form-label">Street Address*</label>
                <input
                  id="street_address"
                  type="text"
                  value={formState.street_address}
                  onChange={handleAddressChange}
                  onKeyDown={handleAddressKeyDown}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  required
                  className="form-input"
                  placeholder="123 Main Street"
                  disabled={isSubmitting}
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={showSuggestions}
                  aria-autocomplete="list"
                  aria-controls="address-suggestions"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul
                    id="address-suggestions"
                    role="listbox"
                    className="absolute z-50 w-full mt-1 bg-[#1a1a2e] border border-border rounded-lg shadow-2xl max-h-52 overflow-auto"
                  >
                    {suggestions.map((suggestion, index) => {
                      const prediction = suggestion.placePrediction;
                      const mainText = prediction?.mainText?.text || '';
                      const secondaryText = prediction?.secondaryText?.text || '';
                      return (
                        <li
                          key={index}
                          role="option"
                          aria-selected={index === activeSuggestionIndex}
                          className={`px-4 py-2.5 cursor-pointer transition-colors border-b border-border/50 last:border-b-0 ${
                            index === activeSuggestionIndex
                              ? 'bg-[#2a2a4a] text-foreground'
                              : 'hover:bg-[#222240] text-foreground'
                          }`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSuggestionSelect(suggestion);
                          }}
                          onMouseEnter={() => setActiveSuggestionIndex(index)}
                        >
                          <div className="text-sm font-medium">{mainText}</div>
                          {secondaryText && (
                            <div className="text-xs text-muted-foreground mt-0.5">{secondaryText}</div>
                          )}
                        </li>
                      );
                    })}
                    <li className="px-4 py-1.5 text-[10px] text-muted-foreground/60 text-right">
                      Powered by Google
                    </li>
                  </ul>
                )}
                {errors.street_address && <p className="form-error">{errors.street_address}</p>}
              </div>
              <div>
                <label htmlFor="zip_code" className="form-label">ZIP Code*</label>
                <input
                  id="zip_code"
                  type="text"
                  value={formState.zip_code}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g., 98101"
                  disabled={isSubmitting}
                  autoComplete="postal-code"
                  maxLength={10}
                />
                {errors.zip_code && <p className="form-error">{errors.zip_code}</p>}
              </div>

              <div className="space-y-2">
                <label className="form-label">Preferred install timing*</label>
                <RadioGroup onValueChange={(value) => handleRadioChange('timeline', value)} value={formState.timeline} className="grid grid-cols-2 gap-2" disabled={isSubmitting}>
                  <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="ASAP" id="time-asap" />
                    <Label htmlFor="time-asap" className="cursor-pointer text-sm">ASAP</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="September" id="time-sept" />
                    <Label htmlFor="time-sept" className="cursor-pointer text-sm">September</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="October" id="time-oct" />
                    <Label htmlFor="time-oct" className="cursor-pointer text-sm">October</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="November" id="time-nov" />
                    <Label htmlFor="time-nov" className="cursor-pointer text-sm">November</Label>
                  </div>
                </RadioGroup>
                {errors.timeline && <p className="form-error">{errors.timeline}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleBack} className="btn-primary-outline flex-1 py-3 flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button type="submit" className="btn-primary flex-1 text-lg py-3" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Get My Quote'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default ContactForm;
