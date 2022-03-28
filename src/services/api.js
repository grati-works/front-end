import axios from 'axios';
import { getToken } from "../hooks/useAuth";

const api = axios.create({
  baseURL: 'http://10.107.144.26:3333',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
