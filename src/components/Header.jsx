import React, { useState } from "react";
import { PlusIcon } from "./icons/PlusIcon";

const Header = ({ user, onAddNew, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-gray-100 px-4 sm:px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600">
          Job Application Tracker
        </h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full shadow hover:shadow-lg transition-shadow">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => (e.target.src = "/default-profile.png")}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm text-white font-medium">
                  {user.name?.[0] || "U"}
                </div>
              )}
              <span className="font-medium">{user.name}</span>
            </div>
          )}

          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transform transition-transform duration-300 hover:scale-105"
          >
            <PlusIcon />
            Add New
          </button>

          {user && (
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold shadow transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-100 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="sm:hidden mt-4 bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col gap-3
                     transform transition-all duration-300 ease-out animate-slide-fade"
        >
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 bg-gray-700 px-3 py-2 rounded-lg shadow">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => (e.target.src = "/default-profile.png")}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-sm text-white font-medium">
                  {user.name?.[0] || "U"}
                </div>
              )}
              <span className="font-medium text-white">{user.name}</span>
            </div>
          )}

          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 justify-center transition-transform duration-200 hover:scale-105"
          >
            <PlusIcon />
            Add New
          </button>

          {user && (
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold shadow transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes slideFade {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-fade {
            animation: slideFade 0.3s ease-out forwards;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
