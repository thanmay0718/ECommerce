import axios from 'axios';

const baseURL = import.meta.env.VITE_BACK_END_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${baseURL}/api`,
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth');
  
  if (authData) {
    try {
      const user = JSON.parse(authData);
      if (user?.jwtToken) {
        config.headers.Authorization = `Bearer ${user.jwtToken}`;
        console.log('✅ JWT Token attached to request:', config.url);
      } else {
        console.warn('⚠️ No jwtToken found in auth data');
      }
    } catch (error) {
      console.error('❌ Error parsing auth from localStorage:', error);
    }
  } else {
    console.warn('⚠️ No auth data in localStorage');
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;