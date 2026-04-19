import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Pointing to our local Node.js Server
});

// Request Interceptor: Attach the JWT token securely to any outgoing request
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('fitness_user');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
