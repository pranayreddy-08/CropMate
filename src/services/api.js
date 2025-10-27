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
export const getWeather = async (lat, lon) => {
  const response = await api.get('/weather', {
    params: { lat, lon },
  });
  return response.data;
};

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
