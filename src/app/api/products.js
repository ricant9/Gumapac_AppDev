import { getToken } from './auth';
import { API_BASE_URL } from './config';

const BASE_URL = API_BASE_URL;

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

async function getAuthHeaders() {
  const token = await getToken();
  return {
    ...defaultOptions.headers,
    'Authorization': `Bearer ${token}`,
  };
}

// Get all products
export async function fetchProducts() {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/customer/products`, {
      method: 'GET',
      headers,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.products || data;
    } else {
      throw new Error(data.message || 'Failed to fetch products');
    }
  } catch (error) {
    console.log('Fetch products error:', error);
    throw error;
  }
}

// Get product details
export async function fetchProductDetails(productId) {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/customer/products/${productId}`, {
      method: 'GET',
      headers,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.product || data;
    } else {
      throw new Error(data.message || 'Failed to fetch product details');
    }
  } catch (error) {
    console.log('Fetch product details error:', error);
    throw error;
  }
}
