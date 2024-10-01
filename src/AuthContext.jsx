// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername ? true : false;
  });

  const [user, setUser] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername ? { username: storedUsername } : null;
  });

  const login = (username, password) => {
    if (
      (username === 'mais@email.com' && password === '123') ||
      (username === 'ali@email.com' && password === '568')
    ) {
      setIsAuthenticated(true);
      setUser({ username });
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
