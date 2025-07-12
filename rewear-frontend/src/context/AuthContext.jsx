import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if the user is logged in on app load
    getProfile().then((res) => {
      if (res.user) {
        setUser(res.user);
      }
      setChecking(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!checking && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
