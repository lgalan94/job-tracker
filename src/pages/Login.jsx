import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loadingGoogle, setLoadingGoogle] = useState(false);

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

      toast.success("Logging in... Redirecting!", { duration: 1500 });

      const timer = setTimeout(() => {
        setLoadingGoogle(false);
        navigate("/dashboard");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700 text-center">

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="App Logo"
          className="mx-auto w-38 h-38 -m-7 object-contain"
        />

        <h2 className="text-2xl font-bold text-white mb-6">
          Job Application Tracker
        </h2>

        {/* GOOGLE LOGIN ONLY */}
        <a
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_FRONTEND_URL}/auth/callback&response_type=token&scope=email profile`}
          onClick={() => setLoadingGoogle(true)}
          className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white py-3 rounded-lg font-semibold ${
            loadingGoogle ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loadingGoogle ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
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

        {/* TERMS & PRIVACY */}
        <div className="mt-4 text-gray-400 text-xs flex flex-col gap-1">
          <p>
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-white">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>.
          </p>
        </div>

        {/* FOOTER CREDITS */}
        <p className="mt-6 text-gray-500 text-xs tracking-wide">
          © Lito Galan Jr
        </p>
      </div>
    </div>
  );
}
