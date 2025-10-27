import { useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationPicker = ({ onLocationSelect }) => {
  const [placeName, setPlaceName] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handlePlaceNameChange = (e) => {
    const value = e.target.value;
    setPlaceName(value);
    
    // Simulate geocoding - in production, use Google Maps API
    if (value) {
      onLocationSelect({
        placeName: value,
        lat: lat || null,
        lon: lon || null,
      });
    }
  };

  const handleCoordChange = () => {
    if (lat && lon) {
      onLocationSelect({
        placeName: placeName || `${lat}, ${lon}`,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={placeName}
          onChange={handlePlaceNameChange}
          placeholder="Enter city or village name..."
          className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          aria-label="Location name"
        />
      </div>

      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground transition-colors">
          Or enter coordinates manually
        </summary>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            onBlur={handleCoordChange}
            placeholder="Latitude"
            className="px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            aria-label="Latitude"
          />
          <input
            type="number"
            step="any"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            onBlur={handleCoordChange}
            placeholder="Longitude"
            className="px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            aria-label="Longitude"
          />
        </div>
      </details>
    </div>
  );
};

export default LocationPicker;
