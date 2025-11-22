import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGitHub, setLoadingGitHub] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const picture = params.get("picture");

    if (token && name && email) {
      const provider = window.location.href.includes("github") ? "GitHub" : "Google";

      if (provider === "Google") setLoadingGoogle(true);
      if (provider === "GitHub") setLoadingGitHub(true);

      login(token, { name, email, picture });

      toast.success(`Logging in with ${provider}... Redirecting!`, { duration: 1500 });

      const timer = setTimeout(() => {
        setLoadingGoogle(false);
        setLoadingGitHub(false);
        navigate("/dashboard");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-gray-900 to-black px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-10 border border-gray-700 text-center backdrop-blur-sm transform transition-transform duration-300">
        {/* LOGO */}
        <img
          src="/logo.png"
          alt="App Logo"
          className="mx-auto w-32 h-32 object-contain"
        />

        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
          <span className="sm:hidden">Job Tracker</span>
          <span className="hidden sm:inline">Job Application Tracker</span>
        </h2>
        <span className="text-gray-400 mb-6 block">Login to your account</span>

        {/* GOOGLE LOGIN */}
        <a
          href={`${import.meta.env.VITE_API_URL}/auth/google`}
          onClick={() => setLoadingGoogle(true)}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all text-white font-semibold shadow-lg ${
            loadingGoogle ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loadingGoogle ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
          ) : (
            <>
              <span className="flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-md">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
              </span>
             Google
            </>
          )}
        </a>

        {/* GITHUB LOGIN */}
        <a
          href={`${import.meta.env.VITE_API_URL}/auth/github`}
          onClick={() => setLoadingGitHub(true)}
          className={`mt-4 w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all text-white font-semibold shadow-lg ${
            loadingGitHub ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loadingGitHub ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6" />
          ) : (
            <>
              <span className="flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-md">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                  alt="GitHub"
                  className="w-4 h-4"
                />
              </span>
               GitHub
            </>
          )}
        </a>


        {/* TERMS & PRIVACY */}
        <p className="mt-6 text-gray-400 text-sm">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </a>.
        </p>

        {/* FOOTER */}
        <p className="mt-6 text-gray-500 text-xs tracking-wide">
          © Lito Galan Jr
        </p>
      </div>
    </div>
  );
}
