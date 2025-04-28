import { useAuth } from "../../context/AuthContext";
import { getNickname } from "../../services/GeminiService";
import { useEffect, useState } from "react";

export const PanelHeader = () => {
  const { logout, user, userInfo } = useAuth();

  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || "";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo?.name) {
      setLoading(false);
      return;
    }
    if (nickname) {
      setLoading(false);
      return;
    }

    const fetchNickname = async () => {
      try {
        const fetchedNickname = await getNickname(userInfo.name);
        setNickname(fetchedNickname);
        localStorage.setItem("nickname", fetchedNickname); // 👈 Guarda el nickname
        console.log("Nickname:", fetchedNickname);
      } catch (error) {
        console.error("Error fetching nickname:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNickname();
  }, [userInfo?.name, nickname]);

  if (loading || !userInfo?.name) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl font-bold">
          Bienvenido, {nickname}({userInfo.name})
        </h1>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
      <h2 className="text-2xl font-bold mb-4 w-full ">
        Panel de Control (
        {user.scope.split(" ").filter((item) => item.startsWith("ROLE_"))})
      </h2>
    </>
  );
};
