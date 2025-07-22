const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://wander-wise-r24s.onrender.com';

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`; 