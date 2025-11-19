// src/pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthSuccess() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      navigate("/login");
    }
  }, [login, navigate]);

  return <p>Logging you in...</p>;
}
