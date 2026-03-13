import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, TreePine, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const homeStyles = [
  { value: 'single', label: 'Single Story', base: 600 },
  { value: 'twostory', label: 'Two Story', base: 900 },
  { value: 'large', label: 'Large / Multi-Level', base: 1400 },
];

const rooflineOptions = [
  { value: 'simple', label: 'Simple Roofline', multiplier: 1.0 },
  { value: 'moderate', label: 'Moderate (peaks & gables)', multiplier: 1.3 },
  { value: 'complex', label: 'Complex (multiple peaks, dormers)', multiplier: 1.6 },
];

const addOns = [
  { id: 'trees', label: 'Tree Wraps', icon: TreePine, cost: 250 },
  { id: 'bushes', label: 'Bushes & Shrubs', icon: Sparkles, cost: 200 },
  { id: 'wreaths', label: 'Wreaths & Garlands', icon: Layers, cost: 300 },
  { id: 'pathways', label: 'Pathway Lighting', icon: Sparkles, cost: 350 },
];

const QuoteCalculator = () => {
  const [homeStyle, setHomeStyle] = useState('');
  const [roofline, setRoofline] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    if (!homeStyle || !roofline) return null;

    const base = homeStyles.find(h => h.value === homeStyle)?.base || 0;
    const multiplier = rooflineOptions.find(r => r.value === roofline)?.multiplier || 1;
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find(a => a.id === id);
      return sum + (addon?.cost || 0);
    }, 0);

    const total = Math.round(base * multiplier + addOnTotal);
    const low = Math.round(total * 0.85);
    const high = Math.round(total * 1.15);

    return { low, high };
  }, [homeStyle, roofline, selectedAddOns]);

  return (
    <div className="bg-background rounded-2xl border border-border p-6 md:p-8">
      <h3 className="text-2xl font-bold text-foreground mb-2">Estimate Your Home</h3>
      <p className="p-body text-muted-foreground mb-8">
        Get a rough idea of your investment. Final pricing is based on an in-person consultation.
      </p>

      {/* Step 1: Home Style */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-3">
          <span className="inline-flex items-center gap-2"><Home className="w-4 h-4 text-primary" /> Home Style</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {homeStyles.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setHomeStyle(option.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                homeStyle === option.value
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Roofline */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-3">
          <span className="inline-flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Roofline Complexity</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {rooflineOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRoofline(option.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                roofline === option.value
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Add-ons */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-foreground mb-3">
          <span className="inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Add-ons (optional)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {addOns.map(addon => {
            const Icon = addon.icon;
            const isSelected = selectedAddOns.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddOn(addon.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium block">{addon.label}</span>
                <span className="text-xs text-muted-foreground mt-1 block">+${addon.cost}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-background-alt rounded-2xl border border-border p-6 text-center"
          >
            <p className="text-sm font-medium text-muted-foreground mb-1">Estimated Range</p>
            <p className="text-4xl font-bold text-primary mb-2">
              ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Includes design, installation, maintenance, removal, and storage.
            </p>
            <Button as={Link} to="/contact" className="btn-primary inline-flex items-center gap-2">
              Get Your Exact Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!estimate && (
        <div className="bg-background-alt rounded-2xl border border-dashed border-border p-6 text-center">
          <p className="text-muted-foreground">Select your home style and roofline to see an estimate.</p>
        </div>
      )}
    </div>
  );
};

export default QuoteCalculator;
