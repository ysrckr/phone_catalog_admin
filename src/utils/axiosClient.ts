import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export const axiosAdminClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_ADMIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAdminClient.interceptors.request.use(
  config => {
    const userId = useAuthStore().getUserId;
    if (userId) {
      config.headers.Authorization = userId;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
