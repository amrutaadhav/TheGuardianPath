import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('guardian_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('guardian_token', token);
      // We don't verify token on load for simplicity in this demo, but we will attach it to axios
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      localStorage.removeItem('guardian_token');
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  const register = async (username, password) => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/register`, { username, password });
      setToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Server error' };
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      setToken(res.data.token);
      setUser(res.data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Server error' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
