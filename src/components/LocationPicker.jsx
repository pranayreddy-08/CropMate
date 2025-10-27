import { useEffect, useState } from "react";

export default function LocationPicker({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch suggestions from Nominatim (free) with lightweight debounce
  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=5`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "Accept-Language": "en" },
        });
        if (!res.ok) throw new Error("Geocoding failed");
        const data = await res.json();
        setSuggestions(
          data.map((item) => ({
            placeName: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
          }))
        );
      } catch {
        // ignore errors silently for UX
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(run, 350); // debounce
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onLocationSelect?.({
          placeName: "Current location",
          lat: latitude,
          lon: longitude,
        });
        setQuery("Current location");
        setSuggestions([]);
      },
      () => {
        // You can show a toast/alert if you want here
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, village, district…"
          className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={useMyLocation}
          className="px-3 py-2 rounded-lg border border-input hover:bg-muted text-sm"
        >
          Use my location
        </button>
      </div>

      {!!suggestions.length && (
        <div className="absolute z-20 mt-2 w-full bg-card border border-border rounded-lg shadow-lg max-h-72 overflow-auto">
          {suggestions.map((s, i) => (
            <button
              key={`${s.lat}-${s.lon}-${i}`}
              type="button"
              onClick={() => {
                onLocationSelect?.(s);
                setQuery(s.placeName);
                setSuggestions([]);
              }}
              className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
            >
              {s.placeName}
            </button>
          ))}
          {loading && (
            <div className="px-3 py-2 text-xs text-muted-foreground">Searching…</div>
          )}
        </div>
      )}
    </div>
  );
}
