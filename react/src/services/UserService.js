import axios from "axios";

// Instancia de axios con configuración base
const API_URL_USER = "http://localhost:8080/api/v1/users";

// Crear una instancia de axios
const api = axios.create({
  baseURL: API_URL_USER,
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

// Create a new user
export const createUser = async (userData) => {
  const response = await api.post("", userData);
  console.log("response", response.data);
  return response.data;
};

// Update user by ID
export const updateUserById = async (userId, userData) => {
  const response = await api.put(`/${userId}`, userData);
  console.log("response", response.data);
  return response.data;
};

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("");
  console.log("response", response.data);
  return response.data;
};

// Get user by ID
export const getUserById = async (userId) => {
  const response = await api.get(`/${userId}`);
  console.log("response", response.data);
  return response.data;
};

// Delete user by ID
export const deleteUserById = async (userId) => {
  const response = await api.delete(`/${userId}`);
  console.log("response", response.data);
  return response.data;
};
