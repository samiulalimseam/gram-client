// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser, verifyToken } from "../services/authService";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  function refreshAuth() {
    setRefetch(!refetch);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await verifyToken();
        setUser(data.user);
      } catch (err) {
        setUser(null);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [refetch]);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    setUser(data.user);
    navigate("/chat");
  };

  const signup = async (username, password) => {
    const data = await signupUser(username, password);
    setUser(data.user);
    navigate("/chat");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, refreshAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
