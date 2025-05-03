import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, logout } from "../services/AuthService";
import { decodeToken, isTokenExpired, hasPermission } from "../utils/jwtUtils";

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("userInfo");

      if (token && !isTokenExpired(token)) {
        const userData = decodeToken(token);
        setUser(userData);
        setUserInfo(userInfo ? JSON.parse(userInfo) : null); // 👈 PARSE
      } else {
        setUser(null);
        if (token) logout(); // Eliminar token expirado
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = (dataUser) => {
    localStorage.setItem("token", dataUser.token);
    localStorage.setItem("userInfo", JSON.stringify(dataUser.userDTO)); // 👈 Guardar stringificado
    const userData = decodeToken(dataUser.token);
    setUser(userData);
    setUserInfo(dataUser.userDTO);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    setUser(null);
    setUserInfo(null);
    localStorage.setItem("nickname", "");
  };

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return hasPermission(role);
  };

  // Valores a proveer
  const value = {
    user,
    userInfo,
    isAuthenticated: !!user,
    loading,
    login,
    logout: handleLogout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
