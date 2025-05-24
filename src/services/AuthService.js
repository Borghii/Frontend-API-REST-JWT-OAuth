import { API_ENDPOINTS } from "../api/apiUrls";
import api from "../api/axiosInstance";

// Servicio de registro
export const register = async (userData) => {
  const response = await api.post(`${API_ENDPOINTS.AUTH}/sign-up`, userData);
  const { token, userDTO } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userDTO));
    localStorage.setItem("nickname", "");
  }

  return response.data;
};

export const signIn = async (credentials) => {
  const base64Credentials = btoa(
    `${credentials.username}:${credentials.password}`
  );
  const authHeader = { Authorization: `Basic ${base64Credentials}` };

  const response = await api.post(
    `${API_ENDPOINTS.AUTH}/login`,
    {},
    { headers: authHeader }
  );

  const { token, userDTO } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userDTO));
  }

  return response.data;
};

// Servicio de logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
};

// Servicio para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export default api;
