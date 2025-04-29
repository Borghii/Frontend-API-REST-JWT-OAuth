import { API_ENDPOINTS } from "../api/apiUrls";
import api from "../api/axiosInstance";

// Servicio para obtener el nickname de un usuario
export const getNickname = async (name) => {
  const response = await api.get(`${API_ENDPOINTS.GEMINI_NICKNAME}/${name}`);
  return response.data;
};
