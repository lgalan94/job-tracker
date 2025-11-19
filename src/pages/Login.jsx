import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  // Handle Google redirect token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const picture = params.get("picture");

    if (token && name && email) {
      setLoadingGoogle(true);
      login(token, { name, email, picture });
      toast.success("Logging in with Google... Redirecting!", { duration: 2000 });

      const timer = setTimeout(() => {
        setLoadingGoogle(false);
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [login, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingForm(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Login failed");
        setLoadingForm(false);
        return;
      }

      login(data.token, data.user);
      toast.success("Logged in successfully!", { duration: 1000 });
      navigate("/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login to Your Account
        </h2>

        {error && (
          <div className="mb-4 bg-red-500/20 text-red-300 py-2 px-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* EMAIL/PASSWORD LOGIN */}
        <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loadingForm}
            className={`w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white py-2 rounded-md font-semibold ${
              loadingForm ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loadingForm && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />}
            {loadingForm ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-6">
          <span className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-700" />
        </div>

        {/* GOOGLE LOGIN */}
        <a
          href={`${import.meta.env.VITE_API_URL}/auth/google`}
          onClick={() => setLoadingGoogle(true)}
          className={`w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-center text-white py-2 rounded-md font-semibold transition-all ${
            loadingGoogle ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loadingGoogle ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
          ) : (
            <>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </a>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
