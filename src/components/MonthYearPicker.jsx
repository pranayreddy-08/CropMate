import { Calendar } from 'lucide-react';

const MonthYearPicker = ({ label, value, onChange, required }) => {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const handleChange = (field, val) => {
    onChange({
      ...value,
      [field]: parseInt(val),
    });
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
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <select
            value={value?.month || ''}
            onChange={(e) => handleChange('month', e.target.value)}
            required={required}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
            aria-label="Month"
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <select
          value={value?.year || ''}
          onChange={(e) => handleChange('year', e.target.value)}
          required={required}
          className="w-32 px-4 py-2.5 border border-input rounded-lg bg-background text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
          aria-label="Year"
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearPicker;
