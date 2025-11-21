import React, { createContext, useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "sonner";

const AuthContext = createContext();

// auto logout after 30mins of inactivity
const INACTIVITY_LIMIT = 30* 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⏱ Display countdown in UI
  const [timeLeft, setTimeLeft] = useState(INACTIVITY_LIMIT / 1000);

  // Store latest user activity time in localStorage
  const updateActivity = () => {
    localStorage.setItem("lastActivity", Date.now());
  };

  const logout = (reason = "") => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("lastActivity");

    if (reason) {
      toast.error(reason);
    }
  };

  // Check if JWT is expired
  const checkTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp < now;
    } catch {
      return true;
    }
  };

  // Load auth and verify expiry/inactivity on app load
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    const lastActivity = localStorage.getItem("lastActivity");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();

        // 1️⃣ Token expired?
        if (parsed.token && checkTokenExpired(parsed.token)) {
          logout("Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        // 2️⃣ Inactivity check
        if (lastActivity && now - Number(lastActivity) > INACTIVITY_LIMIT) {
          logout("You have been logged out due to inactivity.");
          setLoading(false);
          return;
        }

        // Valid session
        setUser(parsed);
        updateActivity();
      } catch {
        localStorage.removeItem("auth");
      }
    }

    setLoading(false);
  }, []);

  // 🔁 Every second, check token + inactivity + update timeLeft
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("auth");
      const lastActivity = localStorage.getItem("lastActivity");

      if (!stored || !lastActivity) return;

      const parsed = JSON.parse(stored);

      // 1️⃣ Token expired?
      if (parsed.token && checkTokenExpired(parsed.token)) {
        logout("Session expired. Please log in again.");
        return;
      }

      // 2️⃣ Compute remaining time
      const now = Date.now();
      const elapsed = now - Number(lastActivity);
      const remainingMs = INACTIVITY_LIMIT - elapsed;
      const remainingSec = Math.max(Math.floor(remainingMs / 1000), 0);

      setTimeLeft(remainingSec);

      // 3️⃣ If time ran out
      if (remainingMs <= 0) {
        logout("You have been logged out due to inactivity.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🖱 Reset activity timer on user interaction
  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((evt) => window.addEventListener(evt, updateActivity));

    return () =>
      events.forEach((evt) =>
        window.removeEventListener(evt, updateActivity)
      );
  }, []);

  const login = (token, userObj) => {
    const userWithToken = { ...userObj, token };
    setUser(userWithToken);
    localStorage.setItem("auth", JSON.stringify(userWithToken));
    updateActivity();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token || null,
        isAuthenticated: !!user?.token,
        login,
        logout,
        loading,
        timeLeft, // ⏱ Expose timer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
