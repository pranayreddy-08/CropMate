import { useState } from 'react';
import { IndianRupee } from 'lucide-react';

const CurrencyField = ({ label, value, onChange, onUnitChange, required }) => {
  const [unit, setUnit] = useState('per_kg');

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    onUnitChange?.(newUnit);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter price"
            required={required}
            className="w-full pl-9 pr-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            aria-label={label || 'Price'}
          />
        </div>
        <div className="flex border border-input rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => handleUnitChange('per_kg')}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              unit === 'per_kg'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground hover:bg-muted'
            }`}
            aria-pressed={unit === 'per_kg'}
          >
            /kg
          </button>
          <button
            type="button"
            onClick={() => handleUnitChange('per_ton')}
            className={`px-3 py-2 text-sm font-medium transition-colors border-l border-input ${
              unit === 'per_ton'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground hover:bg-muted'
            }`}
            aria-pressed={unit === 'per_ton'}
          >
            /ton
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyField;
