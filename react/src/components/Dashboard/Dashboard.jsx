import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { PanelHeader } from "./PanelHeader";
import { CreateUser } from "./CreateUser";
import { DeleteUser } from "./DeleteUser";
import { SearchUser } from "./SearchUser";
import { UpdateUser } from "./UpdateUser";
import { UserTableModal } from "./UserTableModal";

const Dashboard = () => {
  const { hasRole } = useAuth();
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleSearch = (data) => {
    setData(data);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-blue-700 text-white">
      <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white w-fit  ">
        <PanelHeader />

        <div className="flex flex-row gap-2">
          {hasRole("CREATE") && <CreateUser onSearch={handleSearch} />}
          {hasRole("UPDATE") && <UpdateUser onSearch={handleSearch} />}

          <div className="flex flex-col gap-2">
            {hasRole("DELETE") && <DeleteUser onSearch={handleSearch} />}
            {hasRole("READ") && <SearchUser onSearch={handleSearch} />}
            {showModal && (
              <UserTableModal data={data} onClose={() => setShowModal(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
