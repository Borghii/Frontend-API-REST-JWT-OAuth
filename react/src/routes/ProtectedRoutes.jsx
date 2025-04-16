import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

  // Mostrar un spinner mientras verifica la autenticación
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se requieren roles específicos y el usuario no los tiene
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => hasRole(role));

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si todo está bien, mostrar los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;
