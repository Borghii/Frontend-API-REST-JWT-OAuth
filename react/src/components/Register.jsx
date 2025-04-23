import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/AuthService";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    roles: ["INVITED"], // valor por defecto
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(userData);
      navigate("/login");
    } catch (err) {
      console.log(err);

      setError("Error al registrarse. Intente nuevamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-blue-700 text-white">
      <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 rounded-lg shadow-lg text-white">
        <h2 className="text-4xl font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-600">{error}</div>}

        <form
          className="text-xl space-y-4 flex justify-center flex-col w-sm"
          onSubmit={handleSubmit}
        >
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
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
              value={userData.roles[0]}
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

          <Link to="/login">Already have an account? Sign in</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
