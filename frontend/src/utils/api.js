import axios from 'axios';

// Use Vite env variable for API base. Expect VITE_API_URL like "http(s)://host[:port]"
const BASE = import.meta.env.VITE_API_URL;

if (!BASE) {
  // Developer: set VITE_API_URL in your .env files. We avoid hardcoding localhost here.
  console.warn('VITE_API_URL is not set. API calls will be relative to the current origin.');
}

// Create axios instance with no `/api` suffix — endpoints below include `/api` explicitly
const api = axios.create({
  baseURL: BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Ensure cookies (refresh token) are sent/received
api.defaults.withCredentials = true;

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API (use full path `/api/...` so calls match the required format)
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  refresh: () => api.post('/api/auth/refresh'),
  getMe: () => api.get('/api/auth/me')
};

// Resources API
export const resourceAPI = {
  getAll: (params) => api.get('/api/resources', { params }),
  getById: (id) => api.get(`/api/resources/${id}`),
  create: (data) => api.post('/api/resources', data),
  update: (id, data) => api.put(`/api/resources/${id}`, data),
  delete: (id) => api.delete(`/api/resources/${id}`),
  addFeedback: (id, feedback) => api.post(`/api/resources/${id}/feedback`, feedback),
  incrementDownload: (id) => api.put(`/api/resources/${id}/download`),
  uploadFile: (formData, onUploadProgress) => api.post('/api/resources/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  })
};

// Users API
export const userAPI = {
  getAll: () => api.get('/api/users'),
  getById: (id) => api.get(`/api/users/${id}`),
  update: (id, data) => api.put(`/api/users/${id}`, data),
  delete: (id) => api.delete(`/api/users/${id}`)
};

export default api;
