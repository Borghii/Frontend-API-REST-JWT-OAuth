import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { setNavigator } from "./utils/navigateHelper";
import { useEffect } from "react";

function AppWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate); // Esto permite redirigir desde Axios
  }, [navigate]);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ruta por defecto redirige a Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas protegidas (requieren autenticación) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<div>Perfil del Usuario</div>} />
      </Route>

      {/* Rutas protegidas que requieren rol de ADMIN */}
      <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<div>Panel de Administración</div>} />
      </Route>

      {/* Página de no autorizado */}
      <Route
        path="/unauthorized"
        element={<div>No tienes permiso para acceder a esta página</div>}
      />

      {/* Página 404 */}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWrapper />{" "}
      </Router>
    </AuthProvider>
  );
}

export default App;
