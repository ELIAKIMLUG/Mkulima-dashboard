import React, { createContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import for named export

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);

  // Logout: clears token, user, and timer
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
  }, [logoutTimer]);

  // Login: decodes token, checks expiry, stores info, and sets auto logout
  const login = useCallback((token) => {
    try {
      const decoded = jwtDecode(token); // ✅ Use named import function
      const now = Date.now();
      const exp = decoded.exp * 1000;

      if (exp <= now) {
        console.warn('Token expired');
        logout();
        return;
      }

      const remainingTime = exp - now;

      setAuthToken(token);
      setUser(decoded);
      localStorage.setItem('authToken', token);

      // Auto logout when token expires
      const timer = setTimeout(() => {
        console.log('⏰ Token expired, auto-logging out...');
        logout();
      }, remainingTime);

      setLogoutTimer(timer);
    } catch (err) {
      console.error('Invalid token:', err);
      logout();
    }
  }, [logout]);

  // On component mount, rehydrate token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      login(storedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
