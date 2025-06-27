import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../ToastNotification";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
        toast.info("You should Sign UP")
      
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
