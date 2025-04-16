import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, logout } from "../services/AuthService";
import { decodeToken, isTokenExpired, hasPermission } from "../utils/jwtUtils";

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (token && !isTokenExpired(token)) {
        const userData = decodeToken(token);
        setUser(userData);
      } else {
        setUser(null);
        if (token) logout(); // Eliminar token expirado
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = (token) => {
    localStorage.setItem("token", token);
    const userData = decodeToken(token);
    setUser(userData);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return hasPermission(role);
  };

  // Valores a proveer
  const value = {
    user,
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
