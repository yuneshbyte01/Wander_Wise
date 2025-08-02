// src/services/api.js
import axios from 'axios';

// Automatically select the correct API base URL from .env
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Log API base URL in development
if (process.env.NODE_ENV === 'development') {
    console.log('API Base URL:', API_BASE_URL);
}

// Helper function to create full endpoint URLs
export const getApiUrl = (endpoint = '') =>
    `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

// Create a reusable axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Authorization header if token is present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
