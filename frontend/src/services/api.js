import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const menuService = {
  getCategories: () => api.get('/menu/categories'),
  getMenuItems: () => api.get('/menu/items'),
  getMenuItemsByCategory: (categoryId) => api.get(`/menu/categories/${categoryId}/items`),
};

export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
};

export default api;
