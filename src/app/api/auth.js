import { API_BASE_URL } from './config';

const BASE_URL = API_BASE_URL;

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

// NOTE: AsyncStorage removed - all auth data managed exclusively in Redux Reducer

// Login API call
export async function authLogin({ email, password }) {
  try {
    console.log('Attempting login with:', { email });
    
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    
    if (response.ok) {
      if (data.token) {
        // Token returned to be managed by Redux Reducer only - NOT stored locally
        return data;
      } else {
        throw new Error('No token received');
      }
    } else {
      throw new Error(data.message || data.detail || 'Login failed');
    }
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
}

// Register API call
export async function authRegister({ email, password, name, phone }) {
  try {
    console.log('Attempting registration with:', { email, name });
    
    const response = await fetch(`${BASE_URL}/customer/register`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ email, password, name, phone }),
    });
    
    const data = await response.json();
    console.log('Register response:', data);
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.error || 'Registration failed');
    }
  } catch (error) {
    console.log('Register error:', error);
    throw error;
  }
}

// Get current user profile
// Token passed from Redux state - NOT retrieved from local storage
export async function authMe(token) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    
    console.log('Fetching user with token:', token.substring(0, 20) + '...');
    
    const response = await fetch(`${BASE_URL}/customer/profile`, {
      method: 'GET',
      headers: {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log('User response:', data);
    
    if (response.ok) {
      // Handle different response structures
      return data.user || data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to get user');
    }
  } catch (error) {
    console.log('authMe error:', error);
    throw error;
  }
}

// Logout
// Token passed from Redux state - no local storage operations
export async function authLogout(token) {
  try {
    if (token) {
      // Call logout API (optional)
      try {
        await fetch(`${BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            ...defaultOptions.headers,
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (apiError) {
        console.log('Logout API error (non-critical):', apiError);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.log('Logout error:', error);
    return { success: true }; // Still return success even if API fails
  }
}