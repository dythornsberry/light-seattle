import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast';

const GOOGLE_MAPS_API_KEY = "AIzaSyDGwqAN4cRu6rBXnvC4fKQc79xD5nHxnq0";
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/24075201/udrmfac/";

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

function ContactForm({ isMinimal = false }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    street_address: '',
    zip_code: '',
    timeline: '',
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
  }, []);
  
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

  const validate = () => {
    const newErrors = {};
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
    if (!formState.street_address) newErrors.street_address = "Street Address is required.";
    if (!formState.zip_code) {
        newErrors.zip_code = "ZIP Code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(formState.zip_code)) {
        newErrors.zip_code = "Please enter a valid US ZIP code.";
    }
    if (!formState.timeline) newErrors.timeline = "Please select a timeline.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
  
  const handleZipFocus = () => {
    if(isZipReadOnly) {
        setIsZipReadOnly(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) {
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
                submitted_at: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        toast({
            title: "Success! ✨",
            description: "Your design request has been sent.",
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

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
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
      <div>
        <label htmlFor="street_address" className="form-label">Street Address*</label>
        <input id="street_address" type="text" ref={addressInputRef} value={formState.street_address} onChange={handleChange} required className="form-input" placeholder="123 Main St" disabled={isSubmitting} autoComplete="street-address" />
        {errors.street_address && <p className="form-error">{errors.street_address}</p>}
      </div>
      <div>
        <label htmlFor="zip_code" className="form-label">ZIP Code*</label>
        <input id="zip_code" type="text" value={formState.zip_code} onChange={handleChange} required className="form-input" placeholder="e.g., 98101" disabled={isSubmitting} readOnly={isZipReadOnly} onFocus={handleZipFocus} autoComplete="postal-code" />
        {errors.zip_code && <p className="form-error">{errors.zip_code}</p>}
      </div>

      <div className="space-y-2">
        <label className="form-label">Preferred installation timing*</label>
        <RadioGroup onValueChange={(value) => handleRadioChange('timeline', value)} value={formState.timeline} className="flex flex-wrap gap-4" disabled={isSubmitting}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="ASAP (1-2 weeks)" id="time-asap" />
                <Label htmlFor="time-asap">ASAP (1-2 weeks)</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Early December" id="time-early-dec" />
                <Label htmlFor="time-early-dec">Early December</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Mid-December" id="time-mid-dec" />
                <Label htmlFor="time-mid-dec">Mid-December</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Planning ahead" id="time-planning" />
                <Label htmlFor="time-planning">Planning ahead</Label>
            </div>
        </RadioGroup>
        {errors.timeline && <p className="form-error">{errors.timeline}</p>}
      </div>
      
      <div className="pt-2">
        <button type="submit" className="btn-primary w-full text-lg py-3" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'GET MY CUSTOM DESIGN'}
        </button>
      </div>

    </form>
  );
}

export default ContactForm;