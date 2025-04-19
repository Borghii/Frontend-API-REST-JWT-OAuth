import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user, logout, hasRole } = useAuth();
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
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-blue-700 text-white">
      <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white w-full max-w-3xl">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold">Bienvenido, {user.name}</h1>
          <button
            onClick={logout}
            className="btn-logout bg-white/10 text-xl text-white rounded-lg p-2 hover:bg-white/20"
          >
            Cerrar Sesión
          </button>
        </div>

        {error && <div className="text-red-600 w-full">{error}</div>}

        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>

          {/* Mostrar datos basados en los roles del usuario */}
          {user.roles && user.roles.includes("ADMIN") && (
            <div className="bg-white/10 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold mb-2">
                Sección de Administrador
              </h3>
              {/* Contenido exclusivo para administradores */}
            </div>
          )}

          {hasRole("ROLE_ADMIN") ? (
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="mb-2">Tienes acceso a la lista de usuarios.</p>
              {data?.length > 0 ? (
                <ul className="space-y-2">
                  {data.map((item) => (
                    <li key={item.id} className="bg-white/10 p-2 rounded-lg">
                      {item.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay usuarios disponibles.</p>
              )}
            </div>
          ) : (
            <div className="bg-red-500/10 p-4 rounded-lg">
              <p>No tienes permisos para ver esta sección.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
