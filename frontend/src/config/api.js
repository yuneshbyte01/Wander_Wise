// This will automatically use the correct environment variable based on the build environment
const API_BASE_URL = process.env.REACT_APP_API_URL;

// For debugging in development
if (process.env.NODE_ENV === 'development') {
    console.log('Current API URL:', API_BASE_URL);
}

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`; 