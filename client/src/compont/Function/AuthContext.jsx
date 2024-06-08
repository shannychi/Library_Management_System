import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
  const authCookie  = Cookies.get('auth');
  if(authCookie) {
    setIsAuthenticated(true)
  }
  setIsAuthenticated(false)
 }, []);

 const login = () => {
  Cookies.set('auth', 'true', {
    expires: 7
  });
  setIsAuthenticated(true);
 };
 const logout = () => {
  Cookies.set('auth');
  setIsAuthenticated(false);
 }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
