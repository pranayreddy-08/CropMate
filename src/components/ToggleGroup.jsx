import { Check } from 'lucide-react';

const ToggleGroup = ({ label, options, selected, onChange, required }) => {
  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all flex items-center gap-2 ${
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground shadow-md'
                  : 'border-border bg-background text-foreground hover:border-primary hover:bg-muted'
              }`}
              aria-pressed={isSelected}
            >
              {isSelected && <Check className="h-4 w-4" />}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleGroup;
