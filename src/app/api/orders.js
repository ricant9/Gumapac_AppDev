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

// Get all orders
export async function fetchOrders() {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/customer/orders`, {
      method: 'GET',
      headers,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.orders || data;
    } else {
      throw new Error(data.message || 'Failed to fetch orders');
    }
  } catch (error) {
    console.log('Fetch orders error:', error);
    throw error;
  }
}

// Get order details
export async function fetchOrderDetails(orderId) {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/customer/orders/${orderId}`, {
      method: 'GET',
      headers,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.order || data;
    } else {
      throw new Error(data.message || 'Failed to fetch order details');
    }
  } catch (error) {
    console.log('Fetch order details error:', error);
    throw error;
  }
}

// Create new order
export async function createOrder(orderData) {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/customer/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.order || data;
    } else {
      throw new Error(data.message || 'Failed to create order');
    }
  } catch (error) {
    console.log('Create order error:', error);
    throw error;
  }
}
