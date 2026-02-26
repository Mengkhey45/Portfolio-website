import React, { createContext, useState, useEffect } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('mengkheykhorn8@gmail.com');
  const [currentEmail, setCurrentEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = sessionStorage.getItem('adminSession');
    if (savedSession) {
      const { email } = JSON.parse(savedSession);
      setCurrentEmail(email);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    if (email === adminEmail) {
      setCurrentEmail(email);
      setIsLoggedIn(true);
      sessionStorage.setItem('adminSession', JSON.stringify({ email }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentEmail(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminSession');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isLoggedIn,
        currentEmail,
        adminEmail,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = React.useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
