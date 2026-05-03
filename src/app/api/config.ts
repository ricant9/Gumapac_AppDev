// CREAM API Configuration
// Do not change the base URL - using local dev server
export const API_BASE_URL = __DEV__
  ? 'http://10.205.188.128:8000/api'
  : 'http://10.205.188.128:8000/api';

// API Response Timeout (30 seconds)
export const API_TIMEOUT = 30000;

// JWT Token Configuration
export const JWT_TTL = 3600; // 1 hour in seconds
