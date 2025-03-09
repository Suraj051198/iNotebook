import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const host = "http://localhost:5001";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user data if token exists
  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token]);

  // Load user data
  const loadUser = async () => {
    if (!localStorage.getItem("token")) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        setError(data.error || "Failed to authenticate");
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.authToken);
        setToken(data.authToken);
        setIsAuthenticated(true);
        await loadUser();
        return { success: true };
      } else {
        setError(data.error || "Registration failed");
        return { success: false, error: data.error || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Server error");
      return { success: false, error: "Server error" };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.authToken);
        setToken(data.authToken);
        setIsAuthenticated(true);
        await loadUser();
        return { success: true };
      } else {
        setError(data.error || "Login failed");
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error");
      return { success: false, error: "Server error" };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState; 