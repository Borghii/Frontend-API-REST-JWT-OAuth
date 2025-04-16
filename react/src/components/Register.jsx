import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Apellido</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="roles">Rol</label>
          <select
            id="roles"
            name="roles"
            value={userData.roles[0]}
            onChange={(e) =>
              setUserData({ ...userData, roles: [e.target.value] })
            }
            required
          >
            <option value="">Seleccionar rol</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="btn-register">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
