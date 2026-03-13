import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, Calendar, User } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyDGwqAN4cRu6rBXnvC4fKQc79xD5nHxnq0";
const ZAPIER_WEBHOOK_URL = import.meta.env.VITE_ZAPIER_WEBHOOK_URL || "https://hooks.zapier.com/hooks/catch/24075201/udrmfac/";

let googleMapsScriptLoaded = false;
const scriptLoadCallbacks = [];

function loadGoogleMapsScript(callback) {
  if (googleMapsScriptLoaded && window.google && window.google.maps) {
    callback();
    return;
  }

  scriptLoadCallbacks.push(callback);

  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.id = 'googleMapsScript';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      googleMapsScriptLoaded = true;
      while(scriptLoadCallbacks.length > 0) {
        scriptLoadCallbacks.shift()();
      }
    };
    script.onerror = () => {
        console.error("Google Maps script failed to load.");
        toast({
          variant: "destructive",
          title: "Address Search Unavailable",
          description: "Could not load Google Maps. Please enter your address manually.",
        });
    };
  }
}

const STEPS = [
  { label: "Property", icon: MapPin },
  { label: "Details", icon: Calendar },
  { label: "Contact", icon: User },
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
    timeline: '',
    services: [],
    city: '',
    state: '',
    full_formatted_address: '',
    place_id: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isZipReadOnly, setIsZipReadOnly] = useState(false);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (addressInputRef.current && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          componentRestrictions: { country: "us" },
          fields: ["address_components", "formatted_address", "place_id"],
          types: ["address"],
        });
        autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
      }
    });
  }, [step]);

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();

    if (!place || !place.address_components) {
        setErrors(prev => ({ ...prev, street_address: 'Please select a valid address from the list.' }));
        return;
    }

    let streetNumber = '';
    let route = '';
    let city = '';
    let state = '';
    let postal_code = '';

    for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
            case 'street_number':
                streetNumber = component.long_name;
                break;
            case 'route':
                route = component.short_name;
                break;
            case 'locality':
                city = component.long_name;
                break;
            case 'administrative_area_level_1':
                state = component.short_name;
                break;
            case 'postal_code':
                postal_code = component.long_name;
                break;
            default:
                break;
        }
    }

    const street_address = `${streetNumber} ${route}`.trim();

    setFormState(prevState => ({
      ...prevState,
      street_address: street_address,
      zip_code: postal_code,
      city: city,
      state: state,
      full_formatted_address: place.formatted_address,
      place_id: place.place_id,
    }));

    setIsZipReadOnly(!!postal_code);
    setErrors(prev => ({...prev, street_address: '', zip_code: ''}));
  };

  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 0) {
      if (!formState.street_address) newErrors.street_address = "Street Address is required.";
      if (!formState.zip_code) {
        newErrors.zip_code = "ZIP Code is required.";
      } else if (!/^\d{5}(-\d{4})?$/.test(formState.zip_code)) {
        newErrors.zip_code = "Please enter a valid US ZIP code.";
      }
    }

    if (stepNum === 1) {
      if (!formState.timeline) newErrors.timeline = "Please select a timeline.";
    }

    if (stepNum === 2) {
      if (!formState.name) newErrors.name = "Full Name is required.";
      if (!formState.phone) {
        newErrors.phone = "Phone Number is required.";
      } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formState.phone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      if (!formState.email) {
        newErrors.email = "Email Address is required.";
      } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState(prevState => ({...prevState, [id]: value}));
    if (id === 'street_address' && isZipReadOnly) {
        setIsZipReadOnly(false);
        setFormState(prevState => ({...prevState, zip_code: ''}));
    }
    if (errors[id]) {
        setErrors(prev => ({...prev, [id]: ''}));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleServiceToggle = (service) => {
    setFormState(prevState => ({
      ...prevState,
      services: prevState.services.includes(service)
        ? prevState.services.filter(s => s !== service)
        : [...prevState.services, service]
    }));
  };

  const handleZipFocus = () => {
    if(isZipReadOnly) {
        setIsZipReadOnly(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validateStep(2)) {
      toast({
        variant: "destructive",
        title: "Please fix the errors",
        description: "All required fields must be completed.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({
                ...formState,
                services: formState.services.join(', '),
                submitted_at: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        toast({
            title: "Success!",
            description: "Your quote request has been sent. We'll be in touch soon.",
        });

        navigate('/thank-you', { state: { name: formState.name, property: 'home' } });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was a problem sending your request. Please try again or contact us directly.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    "Roofline Lighting",
    "Tree Wraps",
    "Bushes & Shrubs",
    "Wreaths & Garlands",
    "Pathway Lighting",
    "Full Property Design",
  ];

  return (
    <form onSubmit={handleFormSubmit} noValidate>
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <StepIndicator currentStep={step} />

      <div className="min-h-[280px] relative overflow-hidden">
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
                <h3 className="text-lg font-semibold text-foreground">Where's your property?</h3>
                <p className="text-sm text-muted-foreground">So we can check if you're in our service area</p>
              </div>
              <div>
                <label htmlFor="street_address" className="form-label">Street Address*</label>
                <input id="street_address" type="text" ref={addressInputRef} value={formState.street_address} onChange={handleChange} required className="form-input" placeholder="Start typing your address..." disabled={isSubmitting} autoComplete="street-address" />
                {errors.street_address && <p className="form-error">{errors.street_address}</p>}
              </div>
              <div>
                <label htmlFor="zip_code" className="form-label">ZIP Code*</label>
                <input id="zip_code" type="text" value={formState.zip_code} onChange={handleChange} required className="form-input" placeholder="e.g., 98101" disabled={isSubmitting} readOnly={isZipReadOnly} onFocus={handleZipFocus} autoComplete="postal-code" />
                {errors.zip_code && <p className="form-error">{errors.zip_code}</p>}
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
                <h3 className="text-lg font-semibold text-foreground">What are you looking for?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply (optional) and your preferred timing</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map(service => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left ${
                      formState.services.includes(service)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {formState.services.includes(service) ? '✓ ' : ''}{service}
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <label className="form-label">Preferred timing*</label>
                <RadioGroup onValueChange={(value) => handleRadioChange('timeline', value)} value={formState.timeline} className="grid grid-cols-2 gap-2" disabled={isSubmitting}>
                    <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="ASAP (1-2 weeks)" id="time-asap" />
                        <Label htmlFor="time-asap" className="cursor-pointer text-sm">ASAP (1-2 weeks)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="Early December" id="time-early-dec" />
                        <Label htmlFor="time-early-dec" className="cursor-pointer text-sm">Early December</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="Mid-December" id="time-mid-dec" />
                        <Label htmlFor="time-mid-dec" className="cursor-pointer text-sm">Mid-December</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border rounded-lg px-3 py-2 hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="Planning ahead" id="time-planning" />
                        <Label htmlFor="time-planning" className="cursor-pointer text-sm">Planning ahead</Label>
                    </div>
                </RadioGroup>
                {errors.timeline && <p className="form-error">{errors.timeline}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleBack} className="btn-primary-outline flex-1 py-3 flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button type="button" onClick={handleNext} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground">Almost done! How can we reach you?</h3>
                <p className="text-sm text-muted-foreground">We'll send your custom quote within 24 hours</p>
              </div>
              <div>
                <label htmlFor="name" className="form-label">Full Name*</label>
                <input id="name" type="text" value={formState.name} onChange={handleChange} required className="form-input" placeholder="Jane Doe" disabled={isSubmitting} autoComplete="name" />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="form-label">Phone Number*</label>
                <input id="phone" type="tel" value={formState.phone} onChange={handleChange} required className="form-input" placeholder="(206) 555-0123" disabled={isSubmitting} autoComplete="tel" />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email Address*</label>
                <input id="email" type="email" value={formState.email} onChange={handleChange} required className="form-input" placeholder="jane@email.com" disabled={isSubmitting} autoComplete="email" />
                {errors.email && <p className="form-error">{errors.email}</p>}
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
