import { useAuth } from "../../context/AuthContext";

export const PanelHeader = () => {
  const { logout, user } = useAuth(); // Asegúrate de importar el hook useAuth

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl font-bold">Bienvenido,</h1>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
      <h2 className="text-2xl font-bold mb-4 w-full ">
        Panel de Control (
        {user.scope.split(" ").filter((item) => item.startsWith("ROLE_"))})
      </h2>
    </>
  );
};
