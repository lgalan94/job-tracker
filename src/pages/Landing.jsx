// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold">JobTracker</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg shadow">
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
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Track Your Job Applications <br />
          <span className="text-blue-600">Like a Pro.</span>
        </h2>
        <p className="mt-5 text-lg max-w-2xl mx-auto text-gray-600">
          Organize your job hunt, monitor statuses, store details, and stay motivated.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row items-center">
          {!user && (
            <Link
              to="/register"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 font-semibold"
            >
              Get Started for Free
            </Link>
          )}

          <a
            href={`${import.meta.env.VITE_API_URL}/auth/google`}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-lg text-lg hover:bg-gray-100 font-semibold shadow"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold mb-2">Track Every Application</h4>
            <p className="text-gray-600">
              Keep job details, dates, statuses, follow-ups, and notes in one place.
            </p>
          </div>
          <div className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold mb-2">Visual Progress</h4>
            <p className="text-gray-600">
              See how far you’ve come with progress charts and milestones.
            </p>
          </div>
          <div className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h4 className="text-xl font-semibold mb-2">Email & Link Storage</h4>
            <p className="text-gray-600">
              Keep portals, interview links, and recruiter contacts easily accessible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center bg-blue-600 text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Improve Your Job Search?</h3>
        <p className="text-lg mb-8">
          Start tracking your applications today — stay organized, stay confident.
        </p>
        {!user && (
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100"
          >
            Create Your Free Account
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-gray-500 text-sm mt-auto">
        © 2025 JobTracker. All rights reserved.
      </footer>

    </div>
  );
};

export default Landing;
