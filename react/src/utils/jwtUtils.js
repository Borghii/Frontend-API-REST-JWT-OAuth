import { jwtDecode } from "jwt-decode";

// Decodificar token
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);

    // Verifica estructura mínima del token (opcional)
    if (!decoded.exp || !decoded.iat) {
      console.warn("Token inválido: falta exp/iat");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
};

// Verificar si el token ha expirado
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = decodeToken(token);

    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
    return true;
  }
};

// Obtener todos los permisos del usuario desde el token
export const getUserPermissions = () => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const decoded = decodeToken(token);
    // Extraemos todos los permisos del scope como array
    if (decoded.scope) {
      return decoded.scope.split(" ");
    }

    return [];
  } catch (error) {
    console.error("Error al obtener permisos del token:", error);
    return [];
  }
};

const VALID_PERMISSIONS = [
  "CREATE ",
  "DELETE ",
  "READ",
  "ROLE_ADMIN",
  "UPDATE",
]; // Definir según tu API

// Verificar si el usuario tiene el permiso requerido
export const hasPermission = (requiredPermission) => {
  if (!VALID_PERMISSIONS.includes(requiredPermission)) {
    console.warn(`Permiso no reconocido: ${requiredPermission}`);
    return false;
  }
  const permissions = getUserPermissions();
  return permissions.includes(requiredPermission);
};
