import { useState } from "react";
import { updateUserById } from "../../services/UserService";

export const UpdateUser = ({ onSearch }) => {
  const [userId, setUserId] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    roles: ["INVITED"], // valor por defecto
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await updateUserById(userId, userData);
      console.log(data);
      onSearch([data]);
      setSuccess(true);
      setUserData({
        name: "",
        surname: "",
        email: "",
        password: "",
        roles: ["INVITED"], // valor por defecto
      });

      setUserId("");
    } catch (err) {
      setSuccess(false);
      console.log(err.response.data);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-4">Update user</h2>

      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">User updated successfully</div>
      )}

      <form
        className="text-xl space-y-4 flex justify-center flex-col w-sm"
        onSubmit={handleUpdate}
      >
        <div className="flex gap-4 justify-between">
          <label htmlFor="name">Id</label>
          <input
            type="text"
            id="id"
            name="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="roles">Rol</label>
          <select
            id="roles"
            name="roles"
            value={userData.roles}
            onChange={(e) =>
              setUserData({ ...userData, roles: [e.target.value] })
            }
            className="bg-white/10 text-xl font-medium text-black rounded-lg p-1 w-2/3"
            required
          >
            <option value="">Select a rol</option>
            <option value="INVITED">INVITED</option>
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
    </div>
  );
};
