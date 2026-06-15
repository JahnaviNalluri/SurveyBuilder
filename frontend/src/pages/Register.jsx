import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/Register.css";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] =
  useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
  <div className="register-container">
    <div className="register-card">
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

         <div className="password-container">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }

    placeholder="Password"

    value={password}

    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <img

    src={
      showPassword

      ? "https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png"

      : 
      "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png"
    }

    alt="eye"

    className="password-eye"

    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }

  />

</div>


        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  </div>
);
}

export default Register;