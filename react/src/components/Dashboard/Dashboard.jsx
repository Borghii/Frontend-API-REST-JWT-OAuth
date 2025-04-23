import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { PanelHeader } from "./PanelHeader";
import { CreateUser } from "./CreateUser";
import { DeleteUser } from "./DeleteUser";
import { SearchUser } from "./SearchUser";
import { UpdateUser } from "./UpdateUser";

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-blue-700 text-white">
      <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white w-fit  ">
        <PanelHeader />

        <div className="flex flex-row gap-2">
          {hasRole("CREATE") && <CreateUser />}
          {hasRole("UPDATE") && <UpdateUser />}

          <div className="flex flex-col gap-2">
            {hasRole("DELETE") && <DeleteUser />}
            {hasRole("READ") && <SearchUser />}
          </div>
        </div>
      </div>
    </div>
  );

  function newFunction() {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">
          Panel de Control (
          {user.scope.split(" ").filter((item) => item.startsWith("ROLE_"))})
        </h2>

        {/* Mostrar datos basados en los roles del usuario */}
        {user.roles && user.roles.includes("ADMIN") && (
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold mb-2">Sección de Administrador</h3>
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
    );
  }
};

export default Dashboard;
