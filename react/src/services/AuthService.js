import axios from "axios";

// Instancia de axios con configuración base
const API_URL_AUTH = "http://localhost:8080/api/v1/auth";

// Crear una instancia de axios
const api = axios.create({
  baseURL: API_URL_AUTH,
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

// Servicio de registro
export const register = async (userData) => {
  const response = await api.post("/sign-up", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    console.log("token saved");
  }

  return response.data;
};

export const signIn = async (credentials) => {
  console.log("credentials", credentials);

  // Crear el header de Basic Auth
  const base64Credentials = btoa(
    `${credentials.username}:${credentials.password}`
  );
  const authHeader = { Authorization: `Basic ${base64Credentials}` };

  // Hacer la petición con el header de autenticación
  const response = await api.post(
    "/login",
    {},
    {
      headers: authHeader,
    }
  );

  console.log("response", response.data);
  console.log("token", response.data.token);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// Servicio de logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Servicio para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export default api;
