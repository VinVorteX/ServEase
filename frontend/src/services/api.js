import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const services = {
  getAll: () => api.get('/services'),
  create: (data) => api.post('/services', data),
};

export const auth = {
  login: (data) => api.post('/login', data),
  register: (data) => api.post('/register', data),
};

export const bookings = {
  create: (data) => api.post('/bookings', data),
  getUserBookings: () => api.get('/bookings'),
};

export const providers = {
  getAll: () => api.get('/providers'),
  getProfile: (id) => api.get(`/providers/${id}`),
};

export default api; 