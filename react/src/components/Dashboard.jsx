import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ejemplo de petición autenticada
        const response = await axios.get("http://localhost:8080/api/v1/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data);
      } catch (err) {
        console.log(err);

        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Bienvenido, {user.name}</h1>
        <button onClick={logout} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <h2>Panel de Control</h2>

        {/* Mostrar datos basados en los roles del usuario */}
        {user.roles && user.roles.includes("ADMIN") && (
          <div className="admin-section">
            <h3>Sección de Administrador</h3>
            {/* Contenido exclusivo para administradores */}
          </div>
        )}

        {/* Mostrar datos generales */}
        <div className="data-section">
          <h3>Tus Datos</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
