import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signIn } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signIn(credentials);
      login(response.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-black to-blue-700 text-white">
      <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white/10 transpare rounded-lg shadow-lg  text-white ">
        <h2 className="text-4xl font-bold mb-4">Sign in</h2>
        <form
          className="text-xl space-y-4 flex justify-center flex-col w-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4 justify-between">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4 justify-between">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="bg-white/10 text-xl text-white rounded-lg p-1 w-2/3"
              required
            />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>

          <Link to="/register"> Don't you have an account?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
