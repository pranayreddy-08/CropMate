// Mock data for when backend is offline

export const mockSoilClassification = (filename) => {
  const soilTypes = ['red', 'black', 'alluvial', 'laterite', 'sandy', 'clay'];
  const randomType = soilTypes[Math.floor(Math.random() * soilTypes.length)];
  
  return {
    soilType: randomType,
    confidence: 0.75 + Math.random() * 0.2,
  };
};

export const mockWeather = () => {
  return {
    rainfall: Math.floor(Math.random() * 1500) + 500,
    temperature: Math.floor(Math.random() * 15) + 20,
    humidity: Math.floor(Math.random() * 40) + 50,
    season: ['Monsoon', 'Summer', 'Winter'][Math.floor(Math.random() * 3)],
    stationName: 'Mock Weather Station',
  };
};

export const mockDemandSummary = () => {
  const crops = ['Paddy', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Pulses'];
  const topCrops = crops.slice(0, 3).map(name => ({
    name,
    avgPrice: Math.floor(Math.random() * 20000) + 10000,
    requests: Math.floor(Math.random() * 50) + 10,
  }));
  
  return {
    topCrops,
    lastUpdated: new Date().toISOString(),
  };
};

export const mockRecommendation = () => {
  const crops = ['Paddy', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Pulses'];
  const crop = crops[Math.floor(Math.random() * crops.length)];
  
  return {
    recommendedCrop: crop,
    reasoning: `${crop} is well-suited for your soil type and climate conditions. High water availability and favorable weather patterns support optimal growth.`,
    confidence: 0.80 + Math.random() * 0.15,
    sustainability: {
      water_efficiency: Math.floor(Math.random() * 30) + 65,
      fertilizer_need_score: Math.floor(Math.random() * 35) + 50,
      carbon_impact_score: Math.floor(Math.random() * 30) + 55,
    },
    demand: {
      rank: Math.floor(Math.random() * 3) + 1,
      expectedPricePerTon: Math.floor(Math.random() * 10000) + 15000,
      activeBuyers: Math.floor(Math.random() * 15) + 3,
    },
  };
};

export const mockBuyerPostings = [
  {
    id: 1,
    cropName: 'Paddy',
    priceOffer: 18500,
    priceUnit: 'per_ton',
    quantity: 50,
    quantityUnit: 'ton',
    purchaseWindow: { month: 10, year: 2025 },
    location: 'Karnataka',
    postedOn: '2025-01-15',
  },
  {
    id: 2,
    cropName: 'Wheat',
    priceOffer: 22,
    priceUnit: 'per_kg',
    quantity: 30000,
    quantityUnit: 'kg',
    purchaseWindow: { month: 3, year: 2025 },
    location: 'Punjab',
    postedOn: '2025-01-20',
  },
  {
    id: 3,
    cropName: 'Cotton',
    priceOffer: 55000,
    priceUnit: 'per_ton',
    quantity: 20,
    quantityUnit: 'ton',
    purchaseWindow: { month: 11, year: 2025 },
    location: 'Gujarat',
    postedOn: '2025-01-18',
  },
];

export const mockPriceTrends = (crops) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => {
    const dataPoint = { month };
    crops.forEach(crop => {
      dataPoint[crop] = Math.floor(Math.random() * 5000) + 15000;
    });
    return dataPoint;
  });
};
