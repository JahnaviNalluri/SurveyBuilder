import { useState } from "react";
import api from "../api/axios";
import { useNavigate,Link } from "react-router-dom";
import "../styles/Login.css";
function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = async (
    e
  ) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {
      alert("Login failed");
    }
  };
  const [showPassword, setShowPassword] =
  useState(false);

 return (
  <div className="login-container">
    <div className="login-card">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default Login;