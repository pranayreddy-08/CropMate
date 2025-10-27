import { useState } from "react";
import { Loader2, Cloud, TrendingUp, Award, RotateCcw } from "lucide-react";
import NavBar from "../components/NavBar";
import LocationPicker from "../components/LocationPicker";
import ToggleGroup from "../components/ToggleGroup";
import SelectField from "../components/SelectField";
import ScoreCard from "../components/ScoreCard";
import ChartPanel from "../components/ChartPanel";
import DataTable from "../components/DataTable";
import Alert from "../components/Alert";
import { CROP_GUIDES } from "../data/cropguides";
import CropInfoPanel from "../components/cropinfopanel";
import soilTypesImg from "../data/Soil-Types.jpg.webp";

import { getWeather, getDemandSummary, getRecommendation } from "../services/api";
import {
  mockWeather,
  mockDemandSummary,
  mockRecommendation,
  mockPriceTrends,
  mockBuyerPostings,
} from "../services/mockData";

function Farmer() {
  // ui / flow
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usesMock, setUsesMock] = useState(false);

  // form
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState(null);
  const [waterSources, setWaterSources] = useState([]);
  const [landType, setLandType] = useState("");

  // inline field errors
  const [fieldErrs, setFieldErrs] = useState({});

  // results
  const [results, setResults] = useState(null);

  // show/hide soil reference
  const [showSoilRef, setShowSoilRef] = useState(false);

  const waterOptions = [
    { value: "canal", label: "Canal" },
    { value: "well", label: "Well" },
    { value: "river", label: "River" },
    { value: "rainfed", label: "Rainfed" },
  ];

  const landOptions = [
    { value: "plain", label: "Plain" },
    { value: "plateau", label: "Plateau" },
    { value: "hillstation", label: "Hill Station" },
  ];

  const soilOptions = [
    { value: "Sandy", label: "Sandy soil" },
    { value: "Clay", label: "Clay soil" },
    { value: "Silt", label: "Silt soil" },
    { value: "Loam", label: "Loam soil" },
    { value: "Peaty", label: "Peaty soil" },
    { value: "Chalky", label: "Chalky soil" },
    { value: "Alluvial", label: "Alluvial soil" },
    { value: "Black", label: "Black soil" },
    { value: "Red", label: "Red soil" },
    { value: "Laterite", label: "Laterite soil" },
  ];

  const validate = () => {
    const errs = {};
    if (!soilType) errs.soilType = "Please select a soil type.";
    if (!location?.placeName) errs.location = "Please select a location.";
    if (!waterSources.length) errs.water = "Pick at least one water source.";
    if (!landType) errs.land = "Select your land type.";
    setFieldErrs(errs);
    return Object.keys(errs).length ? errs : null;
  };

  const resetForm = () => {
    setSoilType("");
    setLocation(null);
    setWaterSources([]);
    setLandType("");
    setFieldErrs({});
    setResults(null);
    setError("");
    setUsesMock(false);
    setShowSoilRef(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const errs = validate();
    if (errs) return;

    setLoading(true);
    setResults(null);

    try {
      let weatherData, demandData, recommendationData;
      let usedMock = false;

      // Weather
      const lat = location?.lat ?? 12.9716;
      const lon = location?.lon ?? 77.5946;
      try {
        weatherData = await getWeather(lat, lon);
      } catch (err) {
        console.warn("Weather fetch failed, using mock:", err);
        weatherData = mockWeather();
        usedMock = true;
      }

      // Demand
      try {
        demandData = await getDemandSummary(location.placeName);
      } catch (err) {
        console.warn("Demand fetch failed, using mock:", err);
        demandData = mockDemandSummary();
        usedMock = true;
      }

      // Recommendation
      const payload = {
        soilType,
        location: location.placeName,
        waterSources,
        landType,
        weather: weatherData,
        demandSnapshot: demandData,
      };

      try {
        recommendationData = await getRecommendation(payload);
      } catch (err) {
        console.warn("Recommendation failed, using mock:", err);
        recommendationData = mockRecommendation();
        usedMock = true;
      }

      setUsesMock(usedMock);
      setResults({
        soil: { soilType, confidence: null },
        weather: weatherData,
        demand: demandData,
        recommendation: recommendationData,
        priceTrends: mockPriceTrends(demandData.topCrops.map((c) => c.name)),
        buyerOffers: mockBuyerPostings,
      });
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const buyerColumns = [
    { key: "cropName", label: "Crop", sortable: true },
    {
      key: "priceOffer",
      label: "Price",
      sortable: true,
      render: (val, row) => `₹${val}/${row.priceUnit === "per_kg" ? "kg" : "ton"}`,
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (val, row) => `${val} ${row.quantityUnit}`,
    },
    {
      key: "purchaseWindow",
      label: "Window",
      render: (val) => {
        const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return `${m[val.month - 1]} ${val.year}`;
      },
    },
    { key: "location", label: "Location", sortable: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Farmer Portal</h1>
            <p className="text-muted-foreground">
              Get AI-powered crop recommendations based on your soil and location.
            </p>
          </div>



          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-10">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Farm Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Soil Type */}
                <div>
                  <SelectField
                    label="Soil Type"
                    value={soilType}
                    onChange={setSoilType}
                    options={soilOptions}
                    placeholder="Select soil type"
                    required
                  />
                  {fieldErrs.soilType && (
                    <p className="mt-2 text-sm text-destructive">{fieldErrs.soilType}</p>
                  )}

                  {/* Compact reference link & image (hidden by default) */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setShowSoilRef((v) => !v)}
                      className="text-primary text-sm underline"
                    >
                      {showSoilRef ? "Hide reference" : "View reference"}
                    </button>

                    {showSoilRef && (
                      <div className="mt-2">
                        <img
                          src={soilTypesImg}
                          alt="Types of Soil (reference)"
                          className="rounded-md border border-border shadow-sm max-w-xs w-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <LocationPicker onLocationSelect={setLocation} />
                  {fieldErrs.location && (
                    <p className="mt-2 text-sm text-destructive">{fieldErrs.location}</p>
                  )}
                </div>

                {/* Water */}
                <div className="md:col-span-2">
                  <ToggleGroup
                    label="Water Availability"
                    options={waterOptions}
                    selected={waterSources}
                    onChange={setWaterSources}
                    required
                  />
                  {fieldErrs.water && (
                    <p className="mt-2 text-sm text-destructive">{fieldErrs.water}</p>
                  )}
                </div>

                {/* Land type */}
                <div className="md:col-span-2">
                  <SelectField
                    label="Land Type"
                    value={landType}
                    onChange={setLandType}
                    options={landOptions}
                    placeholder="Select land type"
                    required
                  />
                  {fieldErrs.land && (
                    <p className="mt-2 text-sm text-destructive">{fieldErrs.land}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing…
                    </>
                  ) : (
                    "Get Recommendation"
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="sm:w-40 bg-muted text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Reset
                </button>
              </div>
            </div>
          </form>

          {/* Results */}
          {results && (
            <div className="space-y-8">
              {/* Summary cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <ScoreCard title="Soil Type" value={results.soil.soilType} />
                <ScoreCard title="Avg Rainfall" value={`${results.weather.rainfall}mm`} icon={Cloud} />
                <ScoreCard
                  title="Temperature"
                  value={`${results.weather.temperature}°C`}
                  subtitle={`Humidity: ${results.weather.humidity}%`}
                />
                <ScoreCard
                  title="Top Demand"
                  value={results.demand.topCrops[0]?.name || "N/A"}
                  subtitle={`₹${results.demand.topCrops[0]?.avgPrice || 0}/ton`}
                  icon={TrendingUp}
                />
              </div>

              {/* Price trends */}
              <ChartPanel
                title="Price Trends (Last 6 Months)"
                data={results.priceTrends}
                type="line"
                dataKeys={results.demand.topCrops.slice(0, 3).map((c) => c.name)}
              />

              {/* Recommendation Section */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Recommended Crop</h2>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {results.recommendation.recommendedCrop}
                  </div>
                  {results.recommendation.confidence != null && (
                    <div className="inline-block px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                      {(results.recommendation.confidence * 100).toFixed(1)}% Confidence
                    </div>
                  )}
                </div>

                <p className="text-foreground mb-6">{results.recommendation.reasoning}</p>

                {/* Detailed agronomy + market panel */}
                <CropInfoPanel
                  guide={CROP_GUIDES[results.recommendation.recommendedCrop]}
                  market={results.recommendation.demand}
                />
              </div>

              {/* Matching buyers */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Matching Buyer Offers</h2>
                <DataTable columns={buyerColumns} data={results.buyerOffers} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Farmer;
