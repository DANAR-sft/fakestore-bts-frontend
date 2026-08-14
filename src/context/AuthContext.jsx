import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('bts_auth_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bts_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('bts_auth_token', token);
    } else {
      localStorage.removeItem('bts_auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bts_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bts_auth_user');
    }
  }, [user]);

  const login = async (usernameOrEmail, password) => {
    setIsLoading(true);
    try {
      const result = await authService.login(usernameOrEmail, password);
      setToken(result.token);
      setUser(result.user);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('bts_auth_token');
    localStorage.removeItem('bts_auth_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
