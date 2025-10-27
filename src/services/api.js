import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Health Check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return { online: true, data: response.data };
  } catch (error) {
    return { online: false, error: error.message };
  }
};

// Soil Classification
export const classifySoil = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  const response = await api.post('/classify-soil', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Weather Data
// Add or replace this function in src/services/api.js

export async function getWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m` +
    `&daily=precipitation_sum` +
    `&forecast_days=1&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error");
  const data = await res.json();

  const temperature = data?.current?.temperature_2m ?? null;        // °C
  const humidity = data?.current?.relative_humidity_2m ?? null;     // %
  const rainfall = data?.daily?.precipitation_sum?.[0] ?? 0;        // mm (today)

  return { temperature, humidity, rainfall };
}


// Demand Summary
export const getDemandSummary = async (location) => {
  const response = await api.get('/demand/summary', {
    params: { location },
  });
  return response.data;
};

// Crop Recommendation
export const getRecommendation = async (payload) => {
  const response = await api.post('/recommend', payload);
  return response.data;
};

// Buyer Operations
export const getBuyerPostings = async () => {
  const response = await api.get('/buyers');
  return response.data;
};

export const createBuyerPosting = async (posting) => {
  const response = await api.post('/buyers', posting);
  return response.data;
};

export const updateBuyerPosting = async (id, posting) => {
  const response = await api.put(`/buyers/${id}`, posting);
  return response.data;
};

export const deleteBuyerPosting = async (id) => {
  const response = await api.delete(`/buyers/${id}`);
  return response.data;
};

export default api;
