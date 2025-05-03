import { useState } from "react";
import { createUser } from "../../services/UserService";

export const CreateUser = ({ onSearch }) => {
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

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await createUser(userData);
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
    } catch (err) {
      setSuccess(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-4">Create user</h2>

      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">User created successfully</div>
      )}

      <form
        className="text-xl space-y-4 flex justify-center flex-col w-sm"
        onSubmit={handleCreate}
      >
        <div className="flex gap-4 justify-between">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
            value={userData.surname}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
            required
            value={userData.email}
            onChange={handleChange}
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
          <label htmlFor="roles">Rol</label>
          <select
            id="roles"
            name="roles"
            className="bg-white/10 text-xl font-medium text-black rounded-lg p-1 w-2/3"
            required
            value={userData.roles[0]}
            onChange={(e) =>
              setUserData({ ...userData, roles: [e.target.value] })
            }
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
