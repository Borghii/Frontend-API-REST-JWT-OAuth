import api from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/apiUrls";

export const createUser = async (userData) => {
  const response = await api.post(`${API_ENDPOINTS.USERS}`, userData);
  return response.data;
};

export const updateUserById = async (userId, userData) => {
  const response = await api.put(`${API_ENDPOINTS.USERS}/${userId}`, userData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(`${API_ENDPOINTS.USERS}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`${API_ENDPOINTS.USERS}/${userId}`);
  return response.data;
};

export const deleteUserById = async (userId) => {
  const response = await api.delete(`${API_ENDPOINTS.USERS}/${userId}`);
  return response.data;
};
