import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/authServices";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  // Store token & user in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Fetch current user if token exists but no user yet (after refresh)
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.loginUser(credentials);
      const { user, token } = response.data;

      // Set immediately so components update instantly
      setUser(user);
      setToken(token);

      // Persist to localStorage immediately
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.registerUser(credentials);
      if (response.data.success) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        return response.data;
      } else {
        throw {
          response: {
            data: {
              message: response.data.message || "Registration failed",
              errors: response.data.errors || {},
            },
          },
        };
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setLoading(false);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, registerUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
