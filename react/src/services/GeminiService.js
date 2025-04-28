import axios from "axios";

// Instancia de axios con configuración base
const API_URL_GEMINI = "http://localhost:8080/api/v1/gemini/nickname/";

// Crear una instancia de axios
const api = axios.create({
  baseURL: API_URL_GEMINI,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Servicio para obtener el nickname de un usuario
export const getNickname = async (name) => {
  const response = await api.get(name);
  return response.data;
};
