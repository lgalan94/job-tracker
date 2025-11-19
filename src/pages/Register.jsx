import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/register", formData);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>

        {error && (
          <div className="mb-4 bg-red-500/20 text-red-300 py-2 px-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-indigo-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
