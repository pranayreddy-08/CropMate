import { ChevronDown } from 'lucide-react';

const SelectField = ({ label, value, onChange, options, placeholder, required }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-4 py-2.5 pr-10 border border-input rounded-lg bg-background text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
          aria-label={label || placeholder}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};

export default SelectField;
