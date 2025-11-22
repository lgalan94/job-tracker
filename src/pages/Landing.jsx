import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-white">JobTracker</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-lg shadow sm:flex">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => { e.target.src = '/default-profile.png'; }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm text-white font-medium">
                    {user.name?.[0] || "U"}
                  </div>
                )}
                <span className="text-gray-100 font-medium">{user.name}</span>
              </div>

              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-8 py-20 text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto rounded-lg w-36 h-36 mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Track Your Job Applications <br />
          <span className="text-blue-500">Effortlessly.</span>
        </h2>

        {/* OAuth Buttons */}
        {!user && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {/* Google */}
            <a
              href={`${import.meta.env.VITE_API_URL}/auth/google`}
              className="flex items-center gap-3 px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold shadow-md hover:bg-gray-700 transition-all"
            >
              <span className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full shadow-sm">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  alt="Google"
                  className="w-6 h-6"
                />
              </span>
              Continue with Google
            </a>

            {/* GitHub */}
            <a
              href={`${import.meta.env.VITE_API_URL}/auth/github`}
              className="flex items-center gap-3 px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold shadow-md hover:bg-gray-700 transition-all"
            >
              <span className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full shadow-sm">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                  alt="GitHub"
                  className="w-6 h-6"
                />
              </span>
              Continue with GitHub
            </a>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-gray-800">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Track Applications",
              description:
                "Keep job details, dates, statuses, follow-ups, and notes in one place.",
            },
            {
              title: "Visual Progress",
              description:
                "See how far you’ve come with progress charts and milestones.",
            },
            {
              title: "Contacts & Links",
              description:
                "Store portals, interview links, and recruiter contacts easily.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-700 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-gray-400 text-sm mt-auto">
        © 2025 JobTracker. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
