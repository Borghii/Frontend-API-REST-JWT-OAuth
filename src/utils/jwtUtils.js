import { jwtDecode } from "jwt-decode";

// Decodificar token
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);

    // Verifica estructura mínima del token
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

export const getUserPermissions = (token) => {
  if (!token) return [];

  try {
    const decoded = decodeToken(token);

    if (decoded.scope) {
      return decoded.scope.split(" ");
    }

    return [];
  } catch (error) {
    console.error("Error al obtener permisos del token:", error);
    return [];
  }
};

const VALID_PERMISSIONS = ["CREATE", "DELETE", "READ", "UPDATE"];

// Verificar si el usuario tiene el permiso requerido
export const hasPermission = (requiredPermission) => {
  if (!VALID_PERMISSIONS.includes(requiredPermission)) {
    console.warn(`Permiso no reconocido: ${requiredPermission}`);
    return false;
  }
  const permissions = getUserPermissions(localStorage.getItem("token"));
  return permissions.includes(requiredPermission);
};
