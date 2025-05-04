import axios from "axios";
import { isTokenExpired } from "../utils/jwtUtils";
import { redirectToLogin } from "../utils/navigateHelper";

// Crear una instancia de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar token a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirigir al login si el token expira o no está autorizado
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      localStorage.setItem(
        "sessionExpiredMessage",
        "Your session has expired. Please log in again."
      );
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      redirectToLogin();
    }
    return Promise.reject(err);
  }
);

export default api;
