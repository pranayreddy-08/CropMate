import { useState } from 'react';
import { Loader2, Droplets, Cloud, TrendingUp, Award } from 'lucide-react';
import NavBar from '../components/NavBar';
import UploadBox from '../components/UploadBox';
import LocationPicker from '../components/LocationPicker';
import ToggleGroup from '../components/ToggleGroup';
import SelectField from '../components/SelectField';
import ScoreCard from '../components/ScoreCard';
import ChartPanel from '../components/ChartPanel';
import DataTable from '../components/DataTable';
import Alert from '../components/Alert';
import {
  classifySoil,
  getWeather,
  getDemandSummary,
  getRecommendation,
} from '../services/api';
import {
  mockSoilClassification,
  mockWeather,
  mockDemandSummary,
  mockRecommendation,
  mockPriceTrends,
  mockBuyerPostings,
} from '../services/mockData';

const Farmer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usesMock, setUsesMock] = useState(false);
  
  // Form state
  const [soilImage, setSoilImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [waterSources, setWaterSources] = useState([]);
  const [landType, setLandType] = useState('');
  
  // Results state
  const [results, setResults] = useState(null);

  const waterOptions = [
    { value: 'canal', label: 'Canal' },
    { value: 'well', label: 'Well' },
    { value: 'river', label: 'River' },
    { value: 'rainfed', label: 'Rainfed' },
  ];

  const landOptions = [
    { value: 'plain', label: 'Plain' },
    { value: 'plateau', label: 'Plateau' },
    { value: 'hillstation', label: 'Hill Station' },
  ];

  const validateForm = () => {
    if (!soilImage) return 'Please upload a soil image';
    if (!location || !location.placeName) return 'Please select a location';
    if (waterSources.length === 0) return 'Please select at least one water source';
    if (!landType) return 'Please select a land type';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      let soilData, weatherData, demandData, recommendationData;
      let usedMock = false;

      // Step 1: Classify soil
      try {
        soilData = await classifySoil(soilImage);
      } catch (err) {
        console.warn('Soil classification failed, using mock:', err);
        soilData = mockSoilClassification(soilImage.name);
        usedMock = true;
      }

      // Step 2: Get weather
      const lat = location.lat || 12.9716;
      const lon = location.lon || 77.5946;
      
      try {
        weatherData = await getWeather(lat, lon);
      } catch (err) {
        console.warn('Weather fetch failed, using mock:', err);
        weatherData = mockWeather();
        usedMock = true;
      }

      // Step 3: Get demand summary
      try {
        demandData = await getDemandSummary(location.placeName);
      } catch (err) {
        console.warn('Demand fetch failed, using mock:', err);
        demandData = mockDemandSummary();
        usedMock = true;
      }

      // Step 4: Get recommendation
      const recommendationPayload = {
        soilType: soilData.soilType,
        location: location.placeName,
        waterSources,
        landType,
        weather: weatherData,
        demandSnapshot: demandData,
      };

      try {
        recommendationData = await getRecommendation(recommendationPayload);
      } catch (err) {
        console.warn('Recommendation failed, using mock:', err);
        recommendationData = mockRecommendation();
        usedMock = true;
      }

      setUsesMock(usedMock);
      setResults({
        soil: soilData,
        weather: weatherData,
        demand: demandData,
        recommendation: recommendationData,
        priceTrends: mockPriceTrends(demandData.topCrops.map(c => c.name)),
        buyerOffers: mockBuyerPostings,
      });
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const buyerColumns = [
    { key: 'cropName', label: 'Crop', sortable: true },
    {
      key: 'priceOffer',
      label: 'Price',
      sortable: true,
      render: (val, row) => `₹${val}/${row.priceUnit === 'per_kg' ? 'kg' : 'ton'}`,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      render: (val, row) => `${val} ${row.quantityUnit}`,
    },
    {
      key: 'purchaseWindow',
      label: 'Window',
      render: (val) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[val.month - 1]} ${val.year}`;
      },
    },
    { key: 'location', label: 'Location', sortable: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Farmer Portal</h1>
            <p className="text-muted-foreground">
              Get AI-powered crop recommendations based on your soil and location
            </p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {usesMock && results && (
            <Alert
              type="info"
              message="Using mock data because backend is offline. Results are for demonstration only."
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-6">Farm Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Soil Image <span className="text-destructive">*</span>
                  </label>
                  <UploadBox onFileSelect={setSoilImage} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <LocationPicker onLocationSelect={setLocation} />
                </div>

                <div className="md:col-span-2">
                  <ToggleGroup
                    label="Water Availability"
                    options={waterOptions}
                    selected={waterSources}
                    onChange={setWaterSources}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <SelectField
                    label="Land Type"
                    value={landType}
                    onChange={setLandType}
                    options={landOptions}
                    placeholder="Select land type"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Recommendation'
                )}
              </button>
            </div>
          </form>

          {results && (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <ScoreCard
                  title="Soil Type"
                  value={results.soil.soilType}
                  subtitle={`${(results.soil.confidence * 100).toFixed(1)}% confidence`}
                />
                <ScoreCard
                  title="Avg Rainfall"
                  value={`${results.weather.rainfall}mm`}
                  icon={Cloud}
                />
                <ScoreCard
                  title="Temperature"
                  value={`${results.weather.temperature}°C`}
                  subtitle={`Humidity: ${results.weather.humidity}%`}
                />
                <ScoreCard
                  title="Top Demand"
                  value={results.demand.topCrops[0]?.name || 'N/A'}
                  subtitle={`₹${results.demand.topCrops[0]?.avgPrice || 0}/ton`}
                  icon={TrendingUp}
                />
              </div>

              {/* Price Trends Chart */}
              <ChartPanel
                title="Price Trends (Last 6 Months)"
                data={results.priceTrends}
                type="line"
                dataKeys={results.demand.topCrops.slice(0, 3).map(c => c.name)}
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
                  <div className="inline-block px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                    {(results.recommendation.confidence * 100).toFixed(1)}% Confidence
                  </div>
                </div>

                <p className="text-foreground mb-6">{results.recommendation.reasoning}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <ScoreCard
                    title="Water Efficiency"
                    value={`${results.recommendation.sustainability.water_efficiency}/100`}
                  />
                  <ScoreCard
                    title="Fertilizer Need"
                    value={`${results.recommendation.sustainability.fertilizer_need_score}/100`}
                  />
                  <ScoreCard
                    title="Carbon Impact"
                    value={`${results.recommendation.sustainability.carbon_impact_score}/100`}
                  />
                </div>

                <div className="bg-card/50 rounded-lg p-4">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Market Rank</div>
                      <div className="text-2xl font-bold text-foreground">#{results.recommendation.demand.rank}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Expected Price</div>
                      <div className="text-2xl font-bold text-foreground">₹{results.recommendation.demand.expectedPricePerTon}/ton</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Active Buyers</div>
                      <div className="text-2xl font-bold text-foreground">{results.recommendation.demand.activeBuyers}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer Offers */}
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
};

export default Farmer;
