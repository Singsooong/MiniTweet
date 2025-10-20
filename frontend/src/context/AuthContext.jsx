// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/authServices";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.loginUser(credentials);
      console.log(response.data);
      setUser(response.data.user);
      setToken(response.data.token);
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
        setUser(response.data.user);
        setToken(response.data.token);
        return response.data; // proceed
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
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken(null);
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
